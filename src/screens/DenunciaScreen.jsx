import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShieldAlert, FileWarning, Hand, AlertTriangle, Mail, Globe, 
  UserCheck, Send, Loader2, CheckCircle2, Headphones, Lock, Bell,
  Upload, FileText, X
} from "lucide-react";
import { Button } from "@/componentes/ui/button";
import { Card } from "@/componentes/ui/card";
import { Input } from "@/componentes/ui/input";
import { Textarea } from "@/componentes/ui/textarea";
import { Label } from "@/componentes/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/componentes/ui/select";
import { Checkbox } from "@/componentes/ui/checkbox";
import { toast } from "sonner";
import { submitDenuncia } from "@/services/database";

const denunciaTipos = [
  { id: "acoso", icon: Hand, title: "Acoso o violencia", desc: "Física, verbal, psicológica o sexual" },
  { id: "fraude", icon: FileWarning, title: "Faltas o fraudes", desc: "Académicos, laborales o administrativos" },
  { id: "discriminacion", icon: ShieldAlert, title: "Discriminación", desc: "Por género, raza, religión, orientación, etc." },
  { id: "seguridad", icon: AlertTriangle, title: "Riesgos a la seguridad", desc: "Situaciones que pongan en peligro a otros" },
];

const DenunciaScreen = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    tipo: "",
    area: "",
    severidad: "",
    fecha: "",
    descripcion: "",
    testigos: "",
    legal: "",
    previas: false,
    anonimo: false
  });

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.tipo || !formData.descripcion) {
      return toast.error("Por favor, completa los campos obligatorios (*)");
    }

    if (formData.anonimo && files.length === 0) {
      return toast.error("Las denuncias anónimas requieren adjuntar evidencia verificable.");
    }

    setLoading(true);
    try {
      // Pasamos los datos y los archivos al servicio de base de datos
      await submitDenuncia({
        ...formData,
        userId: formData.anonimo ? null : user?.uid,
        adjuntos: files 
      });

      toast.success("Denuncia enviada. Su folio de seguimiento será enviado por correo.");
      // Reset form
      setFormData({ tipo: "", area: "", severidad: "", fecha: "", descripcion: "", testigos: "", legal: "", previas: false, anonimo: false });
      setFiles([]);
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al enviar el reporte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* HEADER INSTITUCIONAL */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#EE121A] to-[#b90e14] text-white rounded-2xl p-8 mb-8 shadow-xl relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-full backdrop-blur-md">
              <ShieldAlert size={40} />
            </div>
            <h1 className="font-black text-3xl md:text-4xl tracking-tight">APARTADO DE DENUNCIA</h1>
          </div>
          <p className="text-lg opacity-95 max-w-2xl leading-relaxed">
            Este espacio está habilitado para que <b>cualquier persona</b> pueda reportar de manera 
            <b> confidencial, segura y responsable</b> situaciones que constituyan una falta o conducta indebida.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
      </motion.div>

      <div className="grid grid-cols-1 gap-8">
        
        {/* SECCIÓN 1: ¿QUÉ SE PUEDE DENUNCIAR? */}
        <Card className="p-6 border-t-4 border-t-[#EE121A]">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="text-[#EE121A]" />
            <h3 className="font-bold text-xl uppercase tracking-wider">1. ¿Qué se puede denunciar?</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {denunciaTipos.map((t) => (
              <button
                key={t.id}
                onClick={() => setFormData({...formData, tipo: t.id})}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center text-center gap-2 ${
                  formData.tipo === t.id ? "border-[#EE121A] bg-[#EE121A]/5" : "border-slate-100 hover:border-red-200"
                }`}
              >
                <div className={`p-3 rounded-full ${formData.tipo === t.id ? "bg-[#EE121A] text-white" : "bg-red-50 text-[#EE121A]"}`}>
                  <t.icon size={24} />
                </div>
                <span className="font-bold text-xs leading-tight">{t.title}</span>
                <span className="text-[10px] text-slate-500 leading-tight">{t.desc}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* SECCIÓN 2: FORMULARIO DETALLADO */}
        <Card className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="text-[#EE121A]" />
            <h3 className="font-bold text-xl uppercase tracking-wider">2. Formulario de Reporte</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Área o Departamento involucrado *</Label>
                <Input 
                  required
                  placeholder="Ej. Operaciones, RRHH..." 
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Fecha del Incidente *</Label>
                <Input 
                  required
                  type="date" 
                  value={formData.fecha}
                  onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Severidad percibida</Label>
                <Select onValueChange={(v) => setFormData({...formData, severidad: v})}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baja">Baja (Infracción menor)</SelectItem>
                    <SelectItem value="media">Media (Conducta recurrente)</SelectItem>
                    <SelectItem value="alta">Alta (Acoso o Fraude)</SelectItem>
                    <SelectItem value="critica">Crítica (Peligro inmediato)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Marco Legal / Normativa</Label>
                <Select onValueChange={(v) => setFormData({...formData, legal: v})}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lft">LFT Art. 3 Bis (Hostigamiento)</SelectItem>
                    <SelectItem value="nom035">NOM-035 (Riesgo Psicosocial)</SelectItem>
                    <SelectItem value="etica">Código de Ética Interno</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Descripción detallada de los hechos *</Label>
              <Textarea 
                required
                placeholder="Sea lo más específico posible (quién, qué, cómo)..." 
                className="min-h-[120px]"
                value={formData.descripcion}
                onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label>Testigos (Nombres o iniciales)</Label>
              <Input 
                placeholder="Opcional" 
                value={formData.testigos}
                onChange={(e) => setFormData({...formData, testigos: e.target.value})}
              />
            </div>

            {/* CARGA DE ARCHIVOS / PDF / IMÁGENES */}
            <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <div className="flex flex-col items-center gap-2">
                <Upload className="text-slate-400" size={32} />
                <Label className="text-center">Adjuntar Evidencia (PDF, JPG, PNG)</Label>
                <p className="text-xs text-slate-400">Capturas de pantalla, correos o documentos</p>
                <Input 
                  type="file" 
                  multiple 
                  className="hidden" 
                  id="file-upload" 
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  Seleccionar archivos
                </Button>
              </div>

              {files.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-white p-2 rounded-lg border text-sm">
                      <span className="truncate max-w-[200px]">{file.name}</span>
                      <button type="button" onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700">
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="anonimo" 
                  checked={formData.anonimo} 
                  onCheckedChange={(v) => setFormData({...formData, anonimo: v})}
                />
                <Label htmlFor="anonimo" className="font-bold text-red-600">Enviar de forma ANÓNIMA</Label>
              </div>
              <p className="text-[10px] text-slate-400 italic ml-6">
                * Nota: Si elige ser anónimo, es indispensable adjuntar evidencia clara para poder procesar la investigación.
              </p>
            </div>

            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-[#EE121A] hover:bg-[#b90e14] h-14 text-lg font-black"
            >
              {loading ? <Loader2 className="animate-spin mr-2" /> : <Send className="mr-2" size={20} />}
              PRESENTAR DENUNCIA AHORA
            </Button>
          </form>
        </Card>

        {/* FOOTER: GARANTÍAS Y PROCESO */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-blue-50 border-none">
            <div className="flex items-center gap-2 mb-3 text-blue-700 font-bold">
              <Lock size={20} />
              <h4>CONFIDENCIALIDAD</h4>
            </div>
            <ul className="text-sm text-blue-900/70 space-y-2">
              <li className="flex gap-2"><CheckCircle2 size={16} className="shrink-0" /> Tu identidad será protegida en todo momento.</li>
              <li className="flex gap-2"><CheckCircle2 size={16} className="shrink-0" /> Acceso limitado solo a personal autorizado.</li>
            </ul>
          </Card>
          
          <Card className="p-6 bg-slate-900 text-white border-none">
             <h4 className="font-bold mb-4 text-center text-xs tracking-widest uppercase">Proceso de Atención</h4>
             <div className="flex justify-between items-center px-2">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-full bg-[#EE121A] flex items-center justify-center font-bold text-sm">
                      {step}
                    </div>
                  </div>
                ))}
             </div>
             <div className="grid grid-cols-4 mt-2 text-[8px] text-center uppercase font-bold opacity-70">
                <span>Recepción</span>
                <span>Evaluación</span>
                <span>Investigación</span>
                <span>Resolución</span>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DenunciaScreen;
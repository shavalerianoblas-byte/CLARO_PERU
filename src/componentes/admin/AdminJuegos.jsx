import React, { useState, useEffect } from "react";
import { 
  Save, Plus, Trash2, LayoutDashboard, BarChart3, 
  Settings2, Lock, Users, ChevronRight, 
  CheckCircle2, XCircle, Lightbulb, MessageSquare, 
  Search, HelpCircle, Eye, EyeOff
} from "lucide-react";
import { Card } from "@/componentes/ui/card";
import { Button } from "@/componentes/ui/button";
import { Input } from "@/componentes/ui/input";
import { Textarea } from "@/componentes/ui/textarea";
import { Switch } from "@/componentes/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/componentes/ui/tabs";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, collection, query, getDocs, orderBy } from "firebase/firestore";
import { toast } from "sonner";

// ==========================================
// SUB-COMPONENTES DE EDICIÓN
// ==========================================

const TriviaEditor = ({ data, setData }) => (
  <div className="space-y-6">
    <Button onClick={() => setData([...data, { titulo: "", opciones: ["","","",""], correcta: 0, textoCorrecto: "", consejoIncorrecto: "" }])} className="w-full border-dashed border-2 py-8 bg-white text-slate-500 hover:bg-slate-50">
      <Plus size={20} className="mr-2"/> Añadir Pregunta de Trivia
    </Button>
    {data.map((p, i) => (
      <Card key={i} className="p-6 relative border-l-4 border-red-500">
        <Button variant="ghost" className="absolute top-2 right-2 text-slate-300 hover:text-red-500" onClick={() => setData(data.filter((_, idx) => idx !== i))}><Trash2 size={18}/></Button>
        <div className="space-y-4">
          <Input value={p.titulo} onChange={e => {const n = [...data]; n[i].titulo = e.target.value; setData(n);}} placeholder="La pregunta..." className="font-bold border-none bg-slate-50"/>
          <div className="grid grid-cols-2 gap-2">
            {p.opciones.map((opt, oi) => (
              <div key={oi} className="flex gap-2 items-center">
                <input type="radio" checked={p.correcta === oi} onChange={() => {const n = [...data]; n[i].correcta = oi; setData(n);}} />
                <Input value={opt} onChange={e => {const n = [...data]; n[i].opciones[oi] = e.target.value; setData(n);}} placeholder={`Opción ${oi+1}`}/>
              </div>
            ))}
          </div>
        </div>
      </Card>
    ))}
  </div>
);

const MemoramaEditor = ({ data, setData }) => (
  <div className="space-y-4">
    <Button onClick={() => setData([...data, { texto: "", par: "" }])} className="w-full border-dashed border-2 py-8 bg-white text-slate-500 hover:bg-slate-50">
      <Plus size={20} className="mr-2"/> Añadir Pareja de Cartas
    </Button>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map((p, i) => (
        <Card key={i} className="p-4 flex items-center gap-3">
          <Input value={p.texto} onChange={e => {const n = [...data]; n[i].texto = e.target.value; setData(n);}} placeholder="Palabra A"/>
          <ChevronRight className="text-slate-300"/>
          <Input value={p.par} onChange={e => {const n = [...data]; n[i].par = e.target.value; setData(n);}} placeholder="Pareja B"/>
          <Button variant="ghost" onClick={() => setData(data.filter((_, idx) => idx !== i))} className="text-red-500"><Trash2 size={16}/></Button>
        </Card>
      ))}
    </div>
  </div>
);

const EscenariosEditor = ({ data, setData }) => (
  <div className="space-y-8">
    <Button onClick={() => setData([...data, { titulo: "", contexto: "", opciones: ["","",""], opcionCorrecta: 0, feedbacks: ["","",""], consejoFinal: "" }])} className="w-full border-dashed border-2 py-8 bg-white text-slate-500 hover:bg-slate-50">
      <Plus size={20} className="mr-2"/> Añadir Caso de Análisis
    </Button>
    {data.map((c, i) => (
      <Card key={i} className="p-6 border-l-4 border-slate-900 shadow-xl">
        <div className="flex justify-between mb-4">
          <h4 className="font-black text-slate-400">ESCENARIO #{i+1}</h4>
          <Button variant="ghost" onClick={() => setData(data.filter((_, idx) => idx !== i))} className="text-red-500"><Trash2 size={18}/></Button>
        </div>
        <div className="space-y-4">
          <Input value={c.titulo} onChange={e => {const n = [...data]; n[i].titulo = e.target.value; setData(n);}} placeholder="Título del caso..." className="font-black"/>
          <Textarea value={c.contexto} onChange={e => {const n = [...data]; n[i].contexto = e.target.value; setData(n);}} placeholder="Contexto o narrativa del problema..."/>
          <div className="grid md:grid-cols-3 gap-4">
            {[0,1,2].map(oi => (
              <div key={oi} className="p-3 bg-slate-50 rounded-xl space-y-2">
                <div className="flex justify-between items-center"><span className="text-[10px] font-bold">OPCIÓN {oi+1}</span> <input type="radio" checked={c.opcionCorrecta === oi} onChange={() => {const n = [...data]; n[i].opcionCorrecta = oi; setData(n);}} /></div>
                <Input value={c.opciones[oi]} onChange={e => {const n = [...data]; n[i].opciones[oi] = e.target.value; setData(n);}} className="text-xs bg-white"/>
                <Textarea value={c.feedbacks[oi]} onChange={e => {const n = [...data]; n[i].feedbacks[oi] = e.target.value; setData(n);}} placeholder="Consecuencia..." className="text-[10px] h-20 bg-white"/>
              </div>
            ))}
          </div>
        </div>
      </Card>
    ))}
  </div>
);

const SopaEditor = ({ data, setData }) => {
  const [w, setW] = useState("");
  return (
    <Card className="p-6">
      <div className="flex gap-2 mb-6">
        <Input value={w} onChange={e => setW(e.target.value)} placeholder="Nueva palabra..." onKeyDown={e => e.key === 'Enter' && (setData([...data, w.toUpperCase()]), setW(""))} />
        <Button onClick={() => {setData([...data, w.toUpperCase()]); setW("");}} className="bg-slate-900 text-white font-bold">AÑADIR</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {data.map((word, i) => (
          <div key={i} className="bg-red-50 text-red-600 px-4 py-2 rounded-full font-bold text-xs flex gap-2 items-center">
            {word} <Trash2 size={14} className="cursor-pointer" onClick={() => setData(data.filter((_, idx) => idx !== i))} />
          </div>
        ))}
      </div>
    </Card>
  );
};

const VerdaderoFalsoEditor = ({ data, setData }) => (
  <div className="space-y-4">
    <Button onClick={() => setData([...data, { afirmacion: "", esVerdadero: true, explicacion: "" }])} className="w-full border-dashed border-2 py-8 bg-white text-slate-500 hover:bg-slate-50">
      <Plus size={20} className="mr-2"/> Añadir Afirmación
    </Button>
    {data.map((p, i) => (
      <Card key={i} className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div className="md:col-span-2"><Input value={p.afirmacion} onChange={e => {const n = [...data]; n[i].afirmacion = e.target.value; setData(n);}} placeholder="La afirmación..."/></div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button onClick={() => {const n = [...data]; n[i].esVerdadero = true; setData(n);}} className={`flex-1 text-[10px] font-bold py-2 rounded-md ${p.esVerdadero ? 'bg-green-500 text-white' : ''}`}>VERDADERO</button>
          <button onClick={() => {const n = [...data]; n[i].esVerdadero = false; setData(n);}} className={`flex-1 text-[10px] font-bold py-2 rounded-md ${!p.esVerdadero ? 'bg-red-500 text-white' : ''}`}>FALSO</button>
        </div>
        <Button variant="ghost" onClick={() => setData(data.filter((_, idx) => idx !== i))} className="text-red-500"><Trash2 size={18}/></Button>
        <div className="md:col-span-4"><Textarea value={p.explicacion} onChange={e => {const n = [...data]; n[i].explicacion = e.target.value; setData(n);}} placeholder="Explicación o dato curioso..." className="text-xs"/></div>
      </Card>
    ))}
  </div>
);

// ==========================================
// COMPONENTE PRINCIPAL: ADMIN JUEGOS
// ==========================================

const AdminJuegos = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState("editor");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [juegosData, setJuegosData] = useState({
    trivia: [], memorama: [], sopa: [], escenarios: [], vf: []
  });
  const [visibilidad, setVisibilidad] = useState({
    trivia: true, memorama: true, sopa: true, escenarios: true, vf: true
  });
  const [logs, setLogs] = useState([]);

  // Protección de Rol
  if (userRole !== 'propietario' && userRole !== 'editor') {
    return <div className="p-20 text-center font-black text-red-500">ACCESO DENEGADO</div>;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const refs = ["trivia_dei", "memorama_dei", "sopa_dei", "escenarios_dei", "vf_dei"];
        const keys = ["trivia", "memorama", "sopa", "escenarios", "vf"];
        const dataMap = {};
        const visMap = {};

        for (let i = 0; i < refs.length; i++) {
          const snap = await getDoc(doc(db, "config_juegos", refs[i]));
          if (snap.exists()) {
            dataMap[keys[i]] = snap.data().preguntas || snap.data().parejas || snap.data().palabras || snap.data().casos || [];
            visMap[keys[i]] = snap.data().visible ?? true;
          }
        }
        setJuegosData(dataMap);
        setVisibilidad(visMap);

        const qLogs = query(collection(db, "game_scores"), orderBy("created_at", "desc"));
        const snapLogs = await getDocs(qLogs);
        setLogs(snapLogs.docs.map(d => ({id: d.id, ...d.data()})));
      } catch (e) { toast.error("Error cargando base de datos"); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const handleGlobalSave = async () => {
    setIsSaving(true);
    try {
      await setDoc(doc(db, "config_juegos", "trivia_dei"), { preguntas: juegosData.trivia, visible: visibilidad.trivia });
      await setDoc(doc(db, "config_juegos", "memorama_dei"), { parejas: juegosData.memorama, visible: visibilidad.memorama });
      await setDoc(doc(db, "config_juegos", "sopa_dei"), { palabras: juegosData.sopa, visible: visibilidad.sopa });
      await setDoc(doc(db, "config_juegos", "escenarios_dei"), { casos: juegosData.escenarios, visible: visibilidad.escenarios });
      await setDoc(doc(db, "config_juegos", "vf_dei"), { preguntas: juegosData.vf, visible: visibilidad.vf });
      toast.success("¡Todo actualizado correctamente!");
    } catch (e) { toast.error("Error al guardar cambios"); }
    finally { setIsSaving(false); }
  };

  if (loading) return <div className="p-20 text-center font-black animate-pulse">SINCRONIZANDO PANEL...</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Intranet Gamer Admin</h1>
        <Button onClick={handleGlobalSave} disabled={isSaving} className="bg-red-600 hover:bg-red-700 text-white px-10 h-14 rounded-2xl font-black shadow-lg">
          {isSaving ? "GUARDANDO..." : "ACTUALIZAR TODO"}
        </Button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* SIDEBAR NAVIGATION */}
        <div className="lg:col-span-3 space-y-2">
          <button onClick={() => setActiveTab("editor")} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-black transition-all ${activeTab === "editor" ? "bg-slate-900 text-white" : "bg-white text-slate-400"}`}>
            <LayoutDashboard size={18}/> EDITAR JUEGOS
          </button>
          <button onClick={() => setActiveTab("stats")} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-black transition-all ${activeTab === "stats" ? "bg-slate-900 text-white" : "bg-white text-slate-400"}`}>
            <BarChart3 size={18}/> MÉTRICAS Y LOGS
          </button>
        </div>

        {/* MAIN AREA */}
        <div className="lg:col-span-9">
          {activeTab === "editor" ? (
            <Tabs defaultValue="trivia" className="w-full">
              <TabsList className="bg-white p-1 rounded-2xl border mb-6 flex h-auto overflow-x-auto">
                {["trivia", "memorama", "escenarios", "sopa", "vf"].map(t => (
                  <TabsTrigger key={t} value={t} className="rounded-xl font-bold px-6 py-3 uppercase text-[10px] tracking-widest">{t}</TabsTrigger>
                ))}
              </TabsList>

              {["trivia", "memorama", "escenarios", "sopa", "vf"].map(t => (
                <TabsContent key={t} value={t} className="space-y-6">
                  <Card className="p-4 flex justify-between items-center">
                    <span className="font-bold text-sm">¿Juego visible para colaboradores?</span>
                    <Switch checked={visibilidad[t]} onCheckedChange={v => setVisibilidad({...visibilidad, [t]: v})} />
                  </Card>
                  {t === "trivia" && <TriviaEditor data={juegosData.trivia} setData={d => setJuegosData({...juegosData, trivia: d})} />}
                  {t === "memorama" && <MemoramaEditor data={juegosData.memorama} setData={d => setJuegosData({...juegosData, memorama: d})} />}
                  {t === "escenarios" && <EscenariosEditor data={juegosData.escenarios} setData={d => setJuegosData({...juegosData, escenarios: d})} />}
                  {t === "sopa" && <SopaEditor data={juegosData.sopa} setData={d => setJuegosData({...juegosData, sopa: d})} />}
                  {t === "vf" && <VerdaderoFalsoEditor data={juegosData.vf} setData={d => setJuegosData({...juegosData, vf: d})} />}
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            /* PANEL DE ESTADÍSTICAS DETALLADAS */
            <div className="space-y-6">
              <Card className="overflow-hidden border-none shadow-xl">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase">
                    <tr>
                      <th className="p-4">Colaborador</th>
                      <th className="p-4">Juego</th>
                      <th className="p-4 text-center">Puntos</th>
                      <th className="p-4">Desempeño</th>
                      <th className="p-4 text-right">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-sm">
                    {logs.map((s, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-bold text-slate-700">{s.display_name}</td>
                        <td className="p-4 text-[10px] font-black uppercase text-slate-400">{s.game_type}</td>
                        <td className="p-4 text-center font-black text-red-600">{s.score}</td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {s.detalleRespuestas?.map((r, ri) => (
                              <div key={ri} className={`px-2 py-0.5 rounded text-[8px] font-bold ${r.fueCorrecto ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {r.fueCorrecto ? '✓' : '✗'} P{ri+1}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 text-right text-slate-400 text-xs">{s.created_at?.toDate().toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminJuegos;
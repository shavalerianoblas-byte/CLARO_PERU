import React, { useState } from 'react';
import { ShieldAlert, Send, CheckCircle2, Lock, EyeOff, FileText, User, Calendar, MapPin, AlertCircle } from 'lucide-react';

const SeccionDenuncia = () => {
  const [submitted, setSubmitted] = useState(false);
  const [anonimo, setAnonimo] = useState(true);
  const [tipoIncidencia, setTipoIncidencia] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const tiposIncidencia = [
    { id: 'acoso', label: 'Acoso o Discriminación', icon: <AlertCircle size={18} />, desc: 'Comportamientos que atentan contra la dignidad' },
    { id: 'recursos', label: 'Uso indebido de recursos', icon: <FileText size={18} />, desc: 'Mal uso de herramientas o presupuesto' },
    { id: 'Incumplimiento', label: 'Incumplimiento', icon: <Calendar size={18} />, desc: 'Violación de reglas de ética' },
    { id: 'otros', label: 'Otras incidencias', icon: <ShieldAlert size={18} />, desc: 'Cualquier otra situación de riesgo ético' }
  ];

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-500">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#EE121A] via-[#FF6B6B] to-[#EE121A] p-12 text-center shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
          
          <div className="relative z-10 space-y-6">
            <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 size={40} className="text-[#EE121A]" />
            </div>
            
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-[0.9]">
              Denuncia<br/>Recibida
            </h2>
            
            <p className="text-white/90 text-lg font-medium">
              Tu reporte ha sido enviado de forma segura y confidencial al Comité de Ética.
            </p>
            
            <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm border border-white/30">
              <p className="text-white/80 text-sm font-bold uppercase tracking-widest">
                Código de seguimiento: <span className="text-white font-black text-lg">#ET-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </p>
            </div>

            <Button 
              variant="secondary" 
              size="md"
              onClick={() => setSubmitted(false)}
              className="bg-white text-[#EE121A] border-white hover:bg-white/90"
            >
              Enviar otra denuncia
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header con estética del primer documento */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#EE121A]/10 rounded-full text-[#EE121A] text-[10px] font-black uppercase tracking-[0.3em] italic">
          <Lock size={14} /> Confidencialidad Garantizada
        </div>
        <h2 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter leading-[0.85] text-gray-900">
          Canal de Ética<br/><span className="text-[#EE121A]">Y Denuncias</span>
        </h2>
        <p className="text-gray-500 text-lg font-medium max-w-xl mx-auto">
          Este espacio es <span className="text-[#EE121A] font-bold">100% confidencial</span>. Úsalo para reportar conductas que afecten la integridad de nuestra comunidad Claro.
        </p>
      </div>

      {/* Card principal con estética premium */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
        
        {/* Barra superior roja */}
        <div className="h-2 bg-gradient-to-r from-[#EE121A] via-[#FF6B6B] to-[#EE121A]" />
        
        <div className="p-8 lg:p-12 space-y-8">
          
          {/* Selector de tipo de incidencia - Cards interactivas */}
          <div className="space-y-4">
            <label className="block text-sm font-black text-gray-400 uppercase tracking-widest">
              Tipo de Incidencia
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tiposIncidencia.map((tipo) => (
                <button
                  key={tipo.id}
                  type="button"
                  onClick={() => setTipoIncidencia(tipo.id)}
                  className={`p-5 rounded-[2rem] border-2 transition-all duration-300 text-left group ${
                    tipoIncidencia === tipo.id
                      ? 'border-[#EE121A] bg-red-50 shadow-lg shadow-red-100'
                      : 'border-gray-100 hover:border-[#EE121A]/30 hover:shadow-md'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-all ${
                    tipoIncidencia === tipo.id 
                      ? 'bg-[#EE121A] text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-400 group-hover:bg-red-50 group-hover:text-[#EE121A]'
                  }`}>
                    {tipo.icon}
                  </div>
                  <h4 className={`font-black italic uppercase text-sm mb-1 ${
                    tipoIncidencia === tipo.id ? 'text-[#EE121A]' : 'text-gray-900'
                  }`}>
                    {tipo.label}
                  </h4>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-tight">
                    {tipo.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Anónimo/Identificado */}
          <div className="bg-gray-50 rounded-[2rem] p-6 flex items-center justify-between border border-gray-100">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                anonimo ? 'bg-[#EE121A] text-white shadow-lg' : 'bg-gray-200 text-gray-400'
              }`}>
                {anonimo ? <EyeOff size={28} /> : <User size={28} />}
              </div>
              <div>
                <p className="font-black italic uppercase text-gray-900">Denuncia {anonimo ? 'Anónima' : 'Identificada'}</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {anonimo ? 'Tu identidad está protegida' : 'Se requiere tu nombre para seguimiento'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAnonimo(!anonimo)}
              className={`w-14 h-8 rounded-full transition-all duration-300 relative ${
                anonimo ? 'bg-[#EE121A]' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                anonimo ? 'left-7' : 'left-1'
              }`} />
            </button>
          </div>

          {/* Campos condicionales si no es anónimo */}
          {!anonimo && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-2">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Nombre</label>
                <input 
                  type="text" 
                  className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#EE121A] focus:ring-4 focus:ring-[#EE121A]/10 outline-none font-bold text-gray-900 transition-all"
                  placeholder="Tu nombre completo"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Correo institucional</label>
                <input 
                  type="email" 
                  className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#EE121A] focus:ring-4 focus:ring-[#EE121A]/10 outline-none font-bold text-gray-900 transition-all"
                  placeholder="nombre@claro.com"
                />
              </div>
            </div>
          )}

          {/* Descripción detallada */}
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Descripción detallada
            </label>
            <textarea 
              rows="5" 
              className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-[2rem] focus:border-[#EE121A] focus:ring-4 focus:ring-[#EE121A]/10 outline-none font-medium text-gray-700 placeholder:text-gray-400 resize-none transition-all"
              placeholder="Describe lo ocurrido con la mayor cantidad de detalles posible (fechas, lugares, personas involucradas, testigos, etc.)..."
            />
          </div>

          {/* Evidencias adjuntas */}
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Evidencias adjuntas (opcional)
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-[2rem] p-8 text-center hover:border-[#EE121A]/30 hover:bg-red-50/30 transition-all cursor-pointer group">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-[#EE121A] group-hover:text-white transition-all text-gray-400">
                <FileText size={28} />
              </div>
              <p className="text-sm font-bold text-gray-600 group-hover:text-[#EE121A] transition-colors">
                Arrastra archivos aquí o haz clic para seleccionar
              </p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">
                PDF, imágenes o documentos (máx. 10MB)
              </p>
            </div>
          </div>

          {/* Checkbox de veracidad */}
          <div className="flex items-start gap-4 p-4 bg-red-50 rounded-2xl border border-red-100">
            <input 
              type="checkbox" 
              id="veracidad"
              className="w-6 h-6 rounded-lg border-2 border-[#EE121A] text-[#EE121A] focus:ring-[#EE121A] mt-1"
            />
            <label htmlFor="veracidad" className="text-sm font-medium text-gray-700 leading-relaxed cursor-pointer">
              Declaro que la información proporcionada es <span className="text-[#EE121A] font-bold">verídica</span> y entiendo que las denuncias falsas pueden conllevar sanciones según el código de ética de Claro.
            </label>
          </div>

          {/* Botón de envío */}
          <button 
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-[#EE121A] text-white font-black uppercase text-sm tracking-widest py-5 rounded-[2rem] hover:bg-[#C40F15] hover:shadow-xl hover:shadow-red-200 hover:-translate-y-1 transition-all duration-300 flex justify-center items-center gap-3 group"
          >
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Send size={20} />
            </div>
            Enviar Denuncia de Forma Segura
          </button>

          {/* Footer de confianza */}
          <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              <Lock size={14} className="text-[#EE121A]" />
              Encriptado SSL
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              <ShieldAlert size={14} className="text-[#EE121A]" />
              Comité de Ética
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              <EyeOff size={14} className="text-[#EE121A]" />
              Sin represalias
            </div>
          </div>

        </div>
      </div>

      {/* Info adicional */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all text-center">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-[#EE121A]">
            <Lock size={24} />
          </div>
          <p className="font-black italic uppercase text-gray-900 text-sm mb-1">Confidencialidad</p>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tu identidad está protegida por ley</p>
        </div>
        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all text-center">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-[#EE121A]">
            <ShieldAlert size={24} />
          </div>
          <p className="font-black italic uppercase text-gray-900 text-sm mb-1">Protección</p>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Sin represalias garantizado</p>
        </div>
        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all text-center">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-[#EE121A]">
            <Calendar size={24} />
          </div>
          <p className="font-black italic uppercase text-gray-900 text-sm mb-1">Seguimiento</p>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Respuesta en 48-72 horas</p>
        </div>
      </div>

    </div>
  );
};

// Componente Button local para consistencia
const Button = ({ children, variant = 'primary', size = 'md', icon: Icon, onClick, className = '' }) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-black uppercase tracking-wider transition-all duration-300 ease-out rounded-xl active:scale-95";
  
  const variants = {
    primary: 'bg-[#EE121A] text-white hover:bg-[#C40F15]',
    secondary: 'bg-white text-[#EE121A] border-2 border-[#EE121A] hover:bg-[#EE121A] hover:text-white'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-[10px]',
    md: 'px-6 py-3 text-xs',
    lg: 'px-8 py-4 text-sm'
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {Icon && <Icon size={size === 'sm' ? 14 : size === 'md' ? 18 : 22} strokeWidth={2.5} />}
      {children}
    </button>
  );
};

export default SeccionDenuncia;
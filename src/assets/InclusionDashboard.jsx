import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, CheckCircle2, MessageSquare, 
  Calendar, Trophy, ArrowUpRight, 
  Send, Zap, Smartphone, Download, X
} from 'lucide-react';

// --- COMPONENTES AUXILIARES ---

const Badge = ({ children, variant = 'red' }) => {
  const styles = {
    red: 'bg-[#EE121A] text-white',
    orange: 'bg-[#FF8200] text-white',
    white: 'bg-white text-[#EE121A] border border-[#EE121A]'
  };
  return (
    <span className={`${styles[variant]} px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm inline-block`}>
      {children}
    </span>
  );
};

const CourseCard = ({ course }) => (
  <div className="group bg-white rounded-[1.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col">
    <div className="relative h-48 overflow-hidden">
      <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute top-4 left-4 flex gap-2">
        {course.isNew && <Badge variant="orange">¡NUEVO!</Badge>}
        <Badge>{course.category}</Badge>
      </div>
      {course.progress === 100 && (
        <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full shadow-lg">
          <CheckCircle2 size={16} />
        </div>
      )}
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h4 className="text-[15px] font-bold text-slate-800 mb-4 line-clamp-2 leading-tight group-hover:text-[#EE121A] transition-colors uppercase italic tracking-tight">
        {course.title}
      </h4>
      <div className="mt-auto space-y-4">
        <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase">
          <span>{course.hours} Horas Realizadas</span>
          <span className="text-[#EE121A] font-black">{course.progress}%</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#EE121A] transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(238,18,26,0.3)]" 
            style={{ width: `${course.progress}%` }} 
          />
        </div>
        <button className="w-full py-3 bg-white border-2 border-[#EE121A] text-[#EE121A] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#EE121A] hover:text-white transition-all shadow-sm">
          {course.progress === 100 ? 'Ver Certificado' : 'Continuar'}
        </button>
      </div>
    </div>
  </div>
);

export default function App() {
  const [filter, setFilter] = useState('todos');
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    { id: 1, text: "El nuevo curso de Accesibilidad está increíble. ¡Muy recomendado!", user: "Luis M.", isMe: false },
    { id: 2, text: "¡Gracias por el tip! Ya lo estoy comenzando.", user: "Tú", isMe: true },
  ]);
  
  const chatEndRef = useRef(null);

  const stats = {
    puntos: 4850,
    ranking: 12,
    completados: 12,
    totales: 15,
    horasTotales: 124
  };

  const courses = [
    { id: 1, title: "Liderazgo Inclusivo en la Era Digital", category: "Estrategia", progress: 100, hours: 20, isNew: false, image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800" },
    { id: 2, title: "Comunicación No Sexista Corporativa", category: "Cultura", progress: 45, hours: 8, isNew: true, image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800" },
    { id: 3, title: "Accesibilidad Web para Devs", category: "Técnico", progress: 12, hours: 2, isNew: false, image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=800" },
    { id: 4, title: "Diversidad Generacional Claro", category: "RRHH", progress: 0, hours: 0, isNew: true, image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800" }
  ];

  const filteredCourses = courses.filter(c => {
    if (filter === 'pendientes') return c.progress < 100;
    if (filter === 'completados') return c.progress === 100;
    return true;
  });

  // Función para descargar Excel (CSV)
  const downloadReport = () => {
    const headers = ["ID,Titulo,Categoria,Progreso,Horas,Estado\n"];
    const rows = courses.map(c => `${c.id},"${c.title}",${c.category},${c.progress}%,${c.hours},${c.progress === 100 ? 'Completado' : 'Pendiente'}`);
    
    // Añadir stats al final del CSV
    const footer = `\n\nResumen de Usuario\nRanking,${stats.ranking}\nPuntos Totales,${stats.puntos}\nHoras Totales,${stats.horasTotales}\nCursos Completados,${stats.completados}/${stats.totales}`;
    
    const blob = new Blob([headers, ...rows.join("\n"), footer], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "Reporte_Capacitacion_Claro.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Función para enviar mensaje
  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const newMessage = {
      id: Date.now(),
      text: message,
      user: "Tú",
      isMe: true
    };
    setChat([...chat, newMessage]);
    setMessage('');
  };

  // Función para Google Calendar
  const addToCalendar = () => {
    const baseUrl = "https://www.google.com/calendar/render?action=TEMPLATE";
    const title = encodeURIComponent("Taller de Sensibilización Inclusiva - Claro");
    const dates = "20261220T160000Z/20261220T180000Z";
    const details = encodeURIComponent("Taller virtual obligatorio para el equipo Claro Inclusión Hub.");
    const location = encodeURIComponent("Microsoft Teams / Virtual");
    window.open(`${baseUrl}&text=${title}&dates=${dates}&details=${details}&location=${location}`, '_blank');
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (    
    <div className="min-h-screen bg-[#FDFDFD] pb-20">
      <main className="max-w-7xl mx-auto px-6 py-12 md:px-12 space-y-12">
   {/* BANNER PRINCIPAL */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-[#EE121A] min-h-[400px] flex items-center group shadow-2xl shadow-red-100 border-4 border-white">
          <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full opacity-40 lg:opacity-60 group-hover:scale-110 transition-transform duration-1000">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200" className="w-full h-full object-cover" alt="Banner" />
          </div>
          <div className="relative z-10 p-8 lg:p-20 space-y-6 w-full lg:w-3/5">
            <Badge variant="orange">NUEVA EXPERIENCIA</Badge>
            <h1 className="text-4xl lg:text-7xl font-black text-white leading-tight lg:leading-[0.85] tracking-tighter italic uppercase">
              TRANSFORMA <br className="hidden lg:block"/> EL FUTURO.
            </h1>
            <p className="text-white/80 text-lg font-medium max-w-md">
              Aprende, conecta y crece en el hub de inclusión más innovador de Claro.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button onClick={() => setIsVideoOpen(true)} className="px-8 py-4 bg-white text-[#EE121A] rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                Comenzar Ahora
              </button>
       <button 
          onClick={downloadReport}
          className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#EE121A] transition-all shadow-lg"
        >
          <Download size={16} /> Descargar Reporte Excel
        </button>
            </div>
          </div>
        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6 group hover:border-[#EE121A] transition-all">
            <div className="w-16 h-16 bg-red-50 text-[#EE121A] rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#EE121A] group-hover:text-white transition-all">
              <Trophy size={30} />
            </div>
            <div>
              <p className="text-3xl font-black text-slate-800 tracking-tighter italic leading-none">4,850</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Puntos Acumulados</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6 group hover:border-[#EE121A] transition-all">
            <div className="w-16 h-16 bg-orange-50 text-[#FF8200] rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#FF8200] group-hover:text-white transition-all">
              <Zap size={30} />
            </div>
            <div>
              <p className="text-3xl font-black text-slate-800 tracking-tighter italic leading-none">#12</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Ranking Nacional</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6 group hover:border-[#EE121A] transition-all">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <CheckCircle2 size={30} />
            </div>
            <div>
              <p className="text-3xl font-black text-slate-800 tracking-tighter italic leading-none">12/15</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Cursos Listos</p>
            </div>
          </div>
        </div>

        {/* SECCIÓN DE CURSOS */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-1">
              <p className="text-[#EE121A] font-black text-xs uppercase tracking-[0.3em]">Tu Formación</p>
              <h2 className="text-4xl font-black tracking-tighter uppercase italic text-slate-900">Módulos Sugeridos</h2>
            </div>
            <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm flex-wrap">
              {['todos', 'pendientes', 'completados'].map(t => (
                <button 
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-6 md:px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === t ? 'bg-[#EE121A] text-white' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredCourses.map(course => <CourseCard key={course.id} course={course} />)}
          </div>
        </section>

     {/* PANEL SECUNDARIO REESTRUCTURADO */}
<section className="space-y-8">
  
  {/* 1. CHAT INTERACTIVO (HORIZONTAL FULL WIDTH) */}
  <div className="w-full bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden flex flex-col h-[450px]">
      <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-red-50 text-[#EE121A] rounded-2xl flex items-center justify-center border border-red-100">
            <MessageSquare size={24} />
          </div>
          <h3 className="text-xl font-black italic tracking-tighter uppercase text-slate-800 leading-none">Comunidad Claro</h3>
        </div>
        <div className="text-[9px] font-black uppercase text-slate-400 bg-slate-50 px-3 py-1 rounded-full text-center">Chat en Vivo</div>
      </div>

      <div className="flex-1 p-8 overflow-y-auto space-y-6 bg-slate-50/30">
        {chat.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
            <div className={`w-10 h-10 rounded-full shrink-0 shadow-sm border-2 border-white flex items-center justify-center text-[10px] font-bold ${msg.isMe ? 'bg-[#EE121A] text-white' : 'bg-white text-slate-400'}`}>
              {msg.user[0]}
            </div>
            <div className={`max-w-[70%] p-4 rounded-2xl shadow-sm text-sm font-medium ${
              msg.isMe 
              ? 'bg-[#EE121A] text-white rounded-tr-none' 
              : 'bg-white text-slate-600 rounded-tl-none border border-slate-100'
            }`}>
              <p className="text-[10px] font-black uppercase opacity-60 mb-1">{msg.user}</p>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={sendMessage} className="p-6 bg-white border-t border-slate-100">
        <div className="relative max-w-4xl mx-auto"> {/* Centrado el input para mejor ergonomía en ancho completo */}
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe un mensaje a la comunidad..." 
            className="w-full bg-slate-50 rounded-2xl py-4 px-6 pr-16 text-sm font-bold outline-none focus:border-[#EE121A] border-2 border-transparent transition-all shadow-inner" 
          />
          <button 
            type="submit"
            className="absolute right-3 top-2 w-12 h-12 bg-[#EE121A] text-white rounded-xl flex items-center justify-center shadow-lg shadow-red-100 active:scale-90 transition-all hover:rotate-12"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
  </div>

  {/* 2. CONTENEDOR INFERIOR (UNO AL LADO DEL OTRO) */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      
      {/* CALENDARIO */}
      <div className="bg-white p-10 rounded-[2.5rem] border-2 border-[#EE121A] shadow-xl relative overflow-hidden group">
        <div className="relative z-10 space-y-6">
           <div className="flex justify-between items-start">
              <div className="w-14 h-14 bg-[#EE121A] rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform">
                <Calendar size={28} />
              </div>
              <Badge variant="orange">PRÓXIMO</Badge>
           </div>
           <div>
              <h4 className="text-3xl font-black italic tracking-tighter uppercase leading-none text-slate-800">Taller de Sensibilización</h4>
              <p className="text-[#EE121A] font-black text-sm uppercase mt-2">20 Dic • 16:00 hrs</p>
           </div>
           <button 
            onClick={addToCalendar}
            className="w-full flex items-center justify-center gap-3 py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-[#EE121A] transition-all shadow-xl"
          >
              Agendar en Google Calendar <ArrowUpRight size={16} />
           </button>
        </div>
        <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
           <Calendar size={200} />
        </div>
      </div>

      {/* RENDIMIENTO */}
      <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white relative overflow-hidden flex flex-col justify-between shadow-2xl min-h-[280px]">
        <div className="relative z-10 flex justify-between items-center">
           <h4 className="text-xl font-black italic tracking-tighter uppercase">Rendimiento de Usuario</h4>
           <Zap size={24} className="text-[#EE121A]" />
        </div>
        <div className="relative z-10 space-y-6">
           <div className="space-y-2">
             <div className="flex justify-between text-[10px] font-black uppercase">
                <span className="text-white/50">Meta de Horas Mensuales</span>
                <span className="text-[#EE121A]">124 / 150 Horas</span>
             </div>
             <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-[#EE121A] shadow-[0_0_15px_rgba(238,18,26,0.6)]" style={{ width: '82%' }} />
             </div>
           </div>
           <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-[11px] text-white font-bold italic">
                ✨ ¡Estás a solo 26 horas de tu próxima insignia de oro!
              </p>
           </div>
        </div>
      </div>

  </div>
</section>
{/* SECCIÓN DE NOTICIAS E INSIGHTS */}
<section className="max-w-7xl mx-auto p-6 md:p-12 space-y-12">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
    
    {/* COLUMNA DE NOTICIAS (2/3 de ancho) */}
    <div className="lg:col-span-2 space-y-8">
      <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
        <h2 className="text-3xl font-black tracking-tighter uppercase italic text-slate-900">
          Últimas Noticias <span className="text-[#EE121A]">Hub</span>
        </h2>
        <button className="text-[10px] font-black uppercase text-[#EE121A] hover:underline flex items-center gap-1">
          Ver todas <ArrowUpRight size={14} />
        </button>
      </div>

      <div className="space-y-6">
        {[
          {
            tag: "Evento",
            title: "Claro premiada como la empresa más inclusiva de la región 2026",
            date: "Hace 2 horas",
            desc: "Nuestro compromiso con la diversidad nos ha llevado a obtener el primer puesto en el ranking de Equidad Corporativa."
          },
          {
            tag: "Tecnología",
            title: "Nueva actualización: Lectores de pantalla optimizados en el Hub",
            date: "Ayer",
            desc: "Hemos implementado mejoras de IA para que los contenidos sean 100% accesibles para personas con discapacidad visual."
          }
        ].map((news, i) => (
          <div key={i} className="group flex flex-col md:flex-row gap-6 p-6 rounded-[2rem] bg-white border border-slate-100 hover:border-[#EE121A] transition-all cursor-pointer">
            <div className="md:w-1/3 h-40 rounded-2xl bg-slate-200 overflow-hidden">
              <img src={`https://images.unsplash.com/photo-${1550000000000 + (i*1000)}?q=80&w=400`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="News" />
            </div>
            <div className="md:w-2/3 space-y-3">
              <div className="flex items-center gap-3">
                <Badge variant="orange">{news.tag}</Badge>
                <span className="text-[10px] font-black text-slate-400 uppercase">{news.date}</span>
              </div>
              <h3 className="text-xl font-black italic uppercase leading-tight group-hover:text-[#EE121A] transition-colors">
                {news.title}
              </h3>
              <p className="text-slate-500 text-sm font-medium line-clamp-2">{news.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* COLUMNA DE INSIGHTS / TENDENCIAS (1/3 de ancho) */}
    <div className="space-y-8">
      <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 space-y-6">
        <h3 className="text-xl font-black italic uppercase tracking-tighter">Inclusion Insights</h3>
        
        <div className="space-y-4">
          {[
            { label: "Talento Diverso", value: "+24%", color: "bg-green-500" },
            { label: "Accesibilidad Web", value: "98%", color: "bg-[#EE121A]" },
            { label: "Cursos Finalizados", value: "1.2k", color: "bg-[#FF8200]" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-black uppercase text-slate-400">{stat.label}</span>
                <span className="text-lg font-black italic text-slate-800">{stat.value}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full">
                <div className={`h-full ${stat.color} rounded-full`} style={{ width: i === 0 ? '70%' : i === 1 ? '98%' : '85%' }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4">
          <div className="p-4 bg-[#EE121A] rounded-2xl text-white">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-2 opacity-80">Tip del día</p>
            <p className="text-sm font-bold italic leading-tight">
              "La inclusión no es un proyecto, es nuestra cultura. Revisa el nuevo manual de lenguaje inclusivo."
            </p>
          </div>
        </div>
      </div>

      {/* MINI BANNER SMARTPHONE */}
      <div className="bg-black p-8 rounded-[2.5rem] relative overflow-hidden group">
        <div className="relative z-10">
          <Smartphone className="text-[#EE121A] mb-4" size={32} />
          <h4 className="text-white text-xl font-black italic uppercase leading-none">Lleva el Hub <br/> en tu mano</h4>
          <p className="text-white/50 text-[10px] font-black uppercase mt-4 mb-6 tracking-widest">Disponible en Claro Apps</p>
          <button className="bg-white text-black text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-tighter hover:bg-[#EE121A] hover:text-white transition-all">
            Descargar App
          </button>
        </div>
        <Globe className="absolute -right-10 -bottom-10 text-white/5 group-hover:text-[#EE121A]/10 transition-colors" size={200} />
      </div>
    </div>

  </div>
</section>

      </main>
 
      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-100 py-16 px-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
           <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#EE121A] rounded-full flex items-center justify-center text-white">
                 <Globe size={20} strokeWidth={3} />
              </div>
              <span className="text-2xl font-black italic tracking-tighter text-[#EE121A] uppercase">Claro</span>
           </div>
           <p className="text-xs font-black text-slate-300 uppercase tracking-[0.4em]">Claro Inclusión Hub © 2026 • Todos los derechos reservados</p>
        </div>
      </footer>

      {/* MODAL VIDEO */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white p-2 rounded-[2rem] w-full max-w-4xl shadow-2xl relative">
            <button onClick={() => setIsVideoOpen(false)} className="absolute -top-12 right-0 text-white hover:text-[#EE121A] transition-all">
              <X size={32} />
            </button>
            <div className="aspect-video rounded-[1.5rem] overflow-hidden border-4 border-[#EE121A]">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/HWL4lpvsnXk?autoplay=1" frameBorder="0" allowFullScreen title="Video"></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
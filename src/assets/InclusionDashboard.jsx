import React, { useState, useEffect } from 'react';
import { 
  Home, Heart, LayoutGrid, Users2, Settings, 
  ChevronRight, Bell, Search, Star, Sparkles,
  Target, Zap, ShieldCheck, Globe, Info, Play, 
  Trophy, ArrowRight, Share2, Layers, BookOpen,
  Pause, Volume2, MessageSquare, CheckCircle2, 
  ChevronLeft, Send, Hash, ZapIcon, Bookmark, 
  MoreVertical, ThumbsUp, Eye, Clock, Filter,
  UserPlus, ExternalLink, Calendar
} from 'lucide-react';

/**
 * COMPONENTE: TRIVIA INTERACTIVA (MODAL)
 */
const InclusionTrivia = ({ onBack }) => {
  const [step, setStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      q: "¿Cuál es el objetivo de Claro para la inclusión laboral en 2026?",
      options: ["Aumentar un 5%", "Liderar el sector con 20%+", "Mantener cifras actuales", "Solo cumplir la ley"],
      correct: 1,
      feedback: "Apuntamos a ser referentes regionales en empleabilidad diversa."
    },
    {
      q: "¿Qué pilar fomenta el respeto a la identidad de género en Claro?",
      options: ["Pilar de Tecnología", "Pilar de Cultura de Respeto", "Pilar Comercial", "Pilar Legal"],
      correct: 1,
      feedback: "La cultura de respeto es la base de nuestra convivencia."
    }
  ];

  const handleNext = () => {
    if (selectedOption === questions[step].correct) setScore(score + 1);
    if (step + 1 < questions.length) {
      setStep(step + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white border border-gray-100 rounded-[3rem] shadow-2xl overflow-hidden p-12">
        {!showResult ? (
          <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
            <div className="flex justify-between items-center">
              <span className="text-[#ee121a] font-black text-xs uppercase tracking-widest">Pregunta {step + 1}/{questions.length}</span>
              <button onClick={onBack} className="text-gray-300 hover:text-black transition-colors"><ChevronLeft size={24}/></button>
            </div>
            <h3 className="text-3xl font-black italic text-gray-900 uppercase tracking-tighter leading-none">{questions[step].q}</h3>
            <div className="space-y-4">
              {questions[step].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedOption(i)}
                  className={`w-full p-6 rounded-2xl text-left font-bold transition-all border-2 ${
                    selectedOption === i ? 'border-[#ee121a] bg-red-50 text-[#ee121a]' : 'border-gray-50 bg-gray-50 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <button
              disabled={selectedOption === null}
              onClick={handleNext}
              className="w-full py-5 bg-[#ee121a] text-white rounded-full font-black uppercase tracking-widest text-xs disabled:opacity-30 shadow-lg shadow-red-200"
            >
              Siguiente Desafío
            </button>
          </div>
        ) : (
          <div className="text-center space-y-6 py-10">
            <Trophy size={80} className="mx-auto text-[#ee121a]" />
            <h3 className="text-4xl font-black italic uppercase tracking-tighter">¡Nivel Completado!</h3>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em]">Has sumado +50 Puntos de Inclusión</p>
            <button onClick={onBack} className="px-10 py-4 bg-black text-white rounded-full font-black uppercase text-xs">Volver al Dashboard</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [showTrivia, setShowTrivia] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [message, setMessage] = useState("");

  // Datos de los cursos
  const cursosData = [
    { id: 1, name: "Empatía Digital 2.0", prog: 100, cat: "Básico", img: "💻", color: "bg-blue-500" },
    { id: 2, name: "Lenguaje Inclusivo", prog: 45, cat: "Comunicación", img: "📢", color: "bg-purple-500" },
    { id: 3, name: "Liderazgo Diverso", prog: 12, cat: "Gerencia", img: "⚡", color: "bg-orange-500" },
    { id: 4, name: "Sesgos Inconscientes", prog: 0, cat: "Psicología", img: "🧠", color: "bg-green-500" }
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#1A1A1A] font-sans antialiased overflow-hidden">
      
      {showTrivia && <InclusionTrivia onBack={() => setShowTrivia(false)} />}

      {/* SIDEBAR NAVEGACIÓN */}
      <aside className="fixed left-0 top-0 h-screen w-24 bg-white border-r border-gray-100 z-50 flex flex-col items-center py-10 shadow-sm">
        <div className="mb-12">
          <div className="w-14 h-14 bg-[#ee121a] rounded-[1.5rem] flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-red-100">C</div>
        </div>
        <nav className="flex flex-col gap-8 flex-1">
          {[
            { id: 'inicio', icon: Home, label: 'Inicio' },
            { id: 'cursos', icon: BookOpen, label: 'Cursos' },
            { id: 'comunidad', icon: Users2, label: 'Comunidad' },
            { id: 'noticias', icon: Globe, label: 'Noticias' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`group relative p-4 rounded-2xl transition-all ${activeTab === item.id ? 'bg-red-50 text-[#ee121a]' : 'text-gray-300 hover:text-gray-900'}`}
            >
              <item.icon size={24} strokeWidth={activeTab === item.id ? 2.5 : 2} />
              <span className="absolute left-20 bg-black text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">{item.label}</span>
            </button>
          ))}
        </nav>
        <button className="p-4 text-gray-300 hover:text-gray-900 transition-colors"><Settings size={24}/></button>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 ml-24 flex flex-col h-screen overflow-y-auto">
        
        {/* HEADER & PERFIL EXPANDIDO */}
        <header className="px-10 py-6 bg-white/80 backdrop-blur-xl sticky top-0 z-40 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <h1 className="font-black italic text-[#ee121a] text-3xl uppercase tracking-tighter">Hub-Inclusión</h1>
            <div className="hidden lg:flex items-center gap-3 bg-gray-50 px-5 py-2.5 rounded-2xl border border-gray-100">
              <Search size={16} className="text-gray-400" />
              <input type="text" placeholder="Buscar cursos, noticias o colegas..." className="bg-transparent text-xs font-bold outline-none w-64" />
            </div>
          </div>

          {/* PERFIL DETALLADO */}
          <div className="flex items-center gap-8">
            <div className="hidden sm:flex flex-col items-end">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-red-100 text-[#ee121a] text-[8px] font-black uppercase rounded-md tracking-widest italic">Líder Nivel 4</span>
                <p className="text-sm font-black text-gray-900 uppercase italic tracking-tight leading-none">Shantall Gerencia</p>
              </div>
              <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">Próximo rango: Embajador DEI</p>
            </div>
            <div className="relative cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-50 to-white border-2 border-white shadow-lg overflow-hidden ring-4 ring-red-50/50 hover:scale-105 transition-transform">
                <img src="https://api.dicebear.com/8.x/avataaars/svg?seed=Shantall" alt="Profile" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-white"></div>
            </div>
          </div>
        </header>

        <main className="p-10 max-w-[1600px] mx-auto w-full space-y-12">
          
          {/* SECCIÓN 1: HERO & TRIVIA */}
          <div className="grid grid-cols-12 gap-10">
            
            {/* VIDEO DE IMPACTO */}
            <div className="col-span-12 lg:col-span-8 relative h-[500px] bg-black rounded-[3.5rem] overflow-hidden shadow-2xl group">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[3s]" alt="Teamwork" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-12 flex flex-col justify-end">
                <div className="flex gap-2 mb-8 w-64">
                   <div className="h-1.5 flex-1 bg-white rounded-full"></div>
                   <div className="h-1.5 flex-1 bg-white/30 rounded-full"></div>
                   <div className="h-1.5 flex-1 bg-white/30 rounded-full"></div>
                </div>
                <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter leading-[0.9] mb-6">Redefiniendo el<br/>futuro juntos</h2>
                <div className="flex items-center gap-6">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-black shadow-2xl hover:bg-[#ee121a] hover:text-white transition-all transform hover:scale-110 active:scale-95">
                    {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                  </button>
                  <div>
                    <p className="text-white font-black uppercase text-xs tracking-widest italic">Video Destacado</p>
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Inclusión 360 • Duración: 2:45</p>
                  </div>
                </div>
              </div>
            </div>

            {/* PANEL DE PROGRESO & TRIVIA */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
              <div onClick={() => setShowTrivia(true)} className="flex-1 bg-[#ee121a] p-10 rounded-[3.5rem] text-white shadow-2xl shadow-red-200 cursor-pointer group hover:rotate-1 transition-all">
                <div className="flex justify-between items-start mb-10">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform"><ZapIcon size={28} fill="white" /></div>
                  <Sparkles size={24} className="text-white/30" />
                </div>
                <h3 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-3">Trivia del<br/>Día</h3>
                <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-8">Ponte a prueba y gana +100pts</p>
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white text-[#ee121a] rounded-2xl font-black uppercase text-[10px] tracking-widest group-hover:gap-5 transition-all">
                  Jugar Ahora <ArrowRight size={14} />
                </div>
              </div>

              <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-xl flex flex-col justify-center">
                <div className="flex justify-between items-end mb-6">
                   <div>
                      <p className="text-5xl font-black italic text-gray-900 tracking-tighter leading-none">82%</p>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Nivel de Impacto Social</p>
                   </div>
                   <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                      <Star size={24} className="text-[#ee121a]" fill="#ee121a" />
                   </div>
                </div>
                <div className="w-full h-3 bg-gray-50 rounded-full overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-red-400 to-[#ee121a]" style={{ width: '82%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: CURSOS (CATÁLOGO COMPLETO) */}
          <section className="space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-xs font-black text-[#ee121a] uppercase tracking-[0.4em] mb-2">Mi Aprendizaje</h3>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-gray-900">Cursos de Formación</h2>
              </div>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-gray-100 text-gray-500 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-gray-200 transition-colors">Categorías</button>
                <button className="px-6 py-3 bg-black text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-gray-800 transition-colors">Ver Todo</button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {cursosData.map((curso) => (
                <div key={curso.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-red-100 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50/50 rounded-bl-[5rem] -mr-10 -mt-10 group-hover:bg-red-50 transition-colors"></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`w-14 h-14 ${curso.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-gray-100 group-hover:scale-110 transition-transform`}>
                        {curso.img}
                      </div>
                      {curso.prog === 100 && (
                        <div className="bg-green-100 text-green-600 p-1.5 rounded-full">
                          <CheckCircle2 size={16} />
                        </div>
                      )}
                    </div>
                    
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">{curso.cat}</span>
                    <h4 className="text-lg font-black text-gray-900 uppercase italic leading-tight mb-6 group-hover:text-[#ee121a] transition-colors">{curso.name}</h4>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-gray-400 uppercase">Progreso</span>
                        <span className="text-gray-900">{curso.prog}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                        <div className={`h-full ${curso.prog === 100 ? 'bg-green-500' : 'bg-[#ee121a]'}`} style={{ width: `${curso.prog}%` }}></div>
                      </div>
                    </div>
                    
                    <button className="mt-8 w-full py-4 rounded-2xl border-2 border-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:border-[#ee121a] group-hover:text-[#ee121a] group-hover:bg-red-50 transition-all">
                      {curso.prog === 0 ? 'Empezar ahora' : curso.prog === 100 ? 'Repasar contenido' : 'Continuar'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECCIÓN 3: COMUNIDAD & CHAT (NETWORKING) */}
          <div className="grid grid-cols-12 gap-10">
            
            {/* ESPACIO PARA CONVERSAR (CHAT) */}
            <div className="col-span-12 lg:col-span-7 bg-white rounded-[3.5rem] border border-gray-100 shadow-xl overflow-hidden flex flex-col h-[600px]">
              <div className="px-10 py-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-[#ee121a] rounded-[1.2rem] flex items-center justify-center text-white shadow-lg"><MessageSquare size={24} /></div>
                  <div>
                    <h3 className="text-lg font-black italic uppercase tracking-tight text-gray-900 leading-none">Canal de Networking</h3>
                    <p className="text-[10px] font-bold text-green-500 uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
                       <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> 42 Colegas Conectados
                    </p>
                  </div>
                </div>
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-4 border-white overflow-hidden shadow-sm">
                       <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt="user" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-gray-100 border-4 border-white flex items-center justify-center text-[10px] font-black text-gray-400">+38</div>
                </div>
              </div>

              {/* AREA DE MENSAJES */}
              <div className="flex-1 p-10 overflow-y-auto space-y-8 bg-[url('https://www.transparenttextures.com/patterns/pinstripe-light.png')]">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-gray-200 overflow-hidden shrink-0 shadow-md"><img src="https://i.pravatar.cc/150?img=32" alt="u" /></div>
                  <div className="space-y-2 max-w-[80%]">
                    <p className="text-[10px] font-black text-[#ee121a] uppercase tracking-widest ml-1">Ricardo Mendoza <span className="text-gray-300 font-bold ml-2">10:24 AM</span></p>
                    <div className="bg-white border border-gray-100 p-5 rounded-3xl rounded-tl-none shadow-sm">
                      <p className="text-xs font-medium text-gray-600 leading-relaxed">¿Alguien tiene el enlace para el taller de "Accesibilidad Digital" de mañana? ¡Me interesa participar! 🚀</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 justify-end">
                  <div className="space-y-2 max-w-[80%] flex flex-col items-end">
                    <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest mr-1">Tú <span className="text-gray-300 font-bold ml-2">10:26 AM</span></p>
                    <div className="bg-[#ee121a] p-5 rounded-3xl rounded-tr-none shadow-lg shadow-red-100">
                      <p className="text-xs font-medium text-white leading-relaxed">¡Claro Ricardo! Está en la sección de Noticias, bajo "Eventos del Mes". Nos vemos ahí.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* INPUT DE CHAT */}
              <div className="p-8 bg-white border-t border-gray-50">
                <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-[2rem] border border-gray-100 focus-within:border-red-200 transition-colors">
                  <div className="flex gap-2 ml-2">
                    <button className="text-gray-400 hover:text-gray-600"><Sparkles size={18}/></button>
                  </div>
                  <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Comparte algo con la comunidad..." 
                    className="flex-1 bg-transparent px-2 text-xs font-bold outline-none text-gray-700" 
                  />
                  <button className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center hover:bg-[#ee121a] transition-all transform hover:scale-105 active:scale-95">
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* TENDENCIAS & NEWS */}
            <div className="col-span-12 lg:col-span-5 space-y-8">
               <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.4em]">Tendencias Claro</h3>
                  <button className="text-[10px] font-black text-[#ee121a] border-b border-[#ee121a]">Ver Blog</button>
               </div>

               <div className="space-y-6">
                  {[
                    { title: "Claro premiado por Inclusión 2025", tags: ["Premio", "Orgullo"], date: "Hoy", views: "1.2k" },
                    { title: "Entrevista: Diversidad en Ingeniería", tags: ["Talento", "Tech"], date: "Ayer", views: "850" },
                    { title: "Nuevas herramientas de lectura", tags: ["Herramientas"], date: "2 días", views: "2.4k" }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-gray-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex gap-6">
                        <div className="w-24 h-24 rounded-3xl bg-gray-100 overflow-hidden shrink-0">
                           <img src={`https://picsum.photos/seed/${i+40}/300/300`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" alt="news" />
                        </div>
                        <div className="flex flex-col justify-center">
                           <div className="flex gap-2 mb-2">
                              {item.tags.map(t => <span key={t} className="text-[8px] font-black text-[#ee121a] uppercase bg-red-50 px-2 py-0.5 rounded">{t}</span>)}
                           </div>
                           <h4 className="text-sm font-black text-gray-900 uppercase italic leading-tight mb-2">{item.title}</h4>
                           <div className="flex items-center gap-4 text-[9px] font-bold text-gray-300 uppercase">
                              <span className="flex items-center gap-1"><Clock size={10}/> {item.date}</span>
                              <span className="flex items-center gap-1"><Eye size={10}/> {item.views}</span>
                           </div>
                        </div>
                    </div>
                  ))}
               </div>

               {/* EVENTOS PRÓXIMOS */}
               <div className="bg-black rounded-[3rem] p-10 text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
                  <Calendar size={32} className="text-[#ee121a] mb-6" />
                  <h4 className="text-2xl font-black italic uppercase tracking-tight mb-2">Masterclass: Sesgos</h4>
                  <p className="text-white/50 text-xs font-medium mb-6">Mañana a las 4:00 PM • Teams Corporativo</p>
                  <button className="px-8 py-3 bg-[#ee121a] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-red-900/40 hover:bg-white hover:text-black transition-all">Recordarme</button>
               </div>
            </div>

          </div>
        </main>

        <footer className="p-16 text-center border-t border-gray-50 mt-20">
          <div className="flex flex-col items-center gap-6">
            <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 font-black">C</div>
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.6em]">Inclusión • Diversidad • Equidad • Claro 2026</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
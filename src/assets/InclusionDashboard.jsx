import React, { useState, useEffect } from 'react';
import { 
  Home, Users, BookOpen, Globe, Settings, 
  Search, Bell, Star, Play, Pause, 
  CheckCircle2, ChevronRight, MessageSquare, 
  Calendar, Trophy, Heart, Share2, Filter,
  MoreHorizontal, ArrowUpRight, GraduationCap,
  Briefcase, ShieldCheck, LayoutDashboard
} from 'lucide-react';

// --- COMPONENTES AUXILIARES ---

const StatCard = ({ label, value, icon: Icon, trend }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-slate-50 rounded-2xl text-slate-600">
        <Icon size={20} />
      </div>
      {trend && (
        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
          {trend}
        </span>
      )}
    </div>
    <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-1">{label}</p>
  </div>
);

const CourseCard = ({ course }) => (
  <div className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
    <div className="relative h-48 overflow-hidden">
      <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold rounded-full uppercase tracking-widest border border-white/30">
          {course.category}
        </span>
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <Clock size={12} />
          <span className="text-[10px] font-bold">{course.duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star size={12} className="text-yellow-400 fill-yellow-400" />
          <span className="text-[10px] font-bold">{course.rating}</span>
        </div>
      </div>
    </div>
    <div className="p-8">
      <h4 className="text-lg font-bold text-slate-900 leading-tight mb-4 group-hover:text-[#EE121A] transition-colors line-clamp-2">
        {course.title}
      </h4>
      <div className="space-y-4">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <span>Progreso</span>
          <span className="text-slate-900">{course.progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${course.progress === 100 ? 'bg-green-500' : 'bg-[#EE121A]'}`} 
            style={{ width: `${course.progress}%` }}
          />
        </div>
        <button className="w-full py-4 bg-slate-50 hover:bg-[#EE121A] hover:text-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group/btn">
          {course.progress === 100 ? 'Ver Certificado' : 'Continuar Módulo'}
          <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  </div>
);

// --- COMPONENTE PRINCIPAL ---

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const courses = [
    {
      id: 1,
      title: "Liderazgo Inclusivo en la Era Digital",
      category: "Estrategia",
      progress: 100,
      duration: "4.5 Horas",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800"
    },
    {
      id: 2,
      title: "Comunicación No Sexista y Corporativa",
      category: "Cultura",
      progress: 45,
      duration: "2.0 Horas",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800"
    },
    {
      id: 3,
      title: "Accesibilidad Web para Desarrolladores",
      category: "Técnico",
      progress: 12,
      duration: "8.0 Horas",
      rating: "5.0",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=800"
    },
    {
      id: 4,
      title: "Diversidad Generacional en Equipos",
      category: "RRHH",
      progress: 0,
      duration: "3.5 Horas",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800"
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-red-100 selection:text-[#EE121A]">
      
      {/* SIDEBAR CORPORATIVO */}
      <aside className="fixed left-0 top-0 h-screen w-20 xl:w-72 bg-white border-r border-slate-100 z-50 flex flex-col py-8 px-4 xl:px-6 shadow-sm">
        <div className="flex items-center gap-4 px-2 mb-12">
          <div className="w-12 h-12 bg-[#EE121A] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-200">
            <Globe size={24} strokeWidth={2.5} />
          </div>
          <div className="hidden xl:block">
            <p className="font-black text-xl tracking-tighter text-[#EE121A]">CLARO</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest -mt-1">Inclusión Portal</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'cursos', icon: BookOpen, label: 'Mis Cursos' },
            { id: 'comunidad', icon: Users, label: 'Comunidad' },
            { id: 'noticias', icon: Globe, label: 'Noticias DEI' },
            { id: 'eventos', icon: Calendar, label: 'Eventos' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group ${
                activeTab === item.id 
                ? 'bg-[#EE121A] text-white shadow-xl shadow-red-100' 
                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon size={22} />
              <span className="hidden xl:block text-sm font-bold tracking-tight">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-slate-50">
          <button className="w-full flex items-center gap-4 p-4 text-slate-400 hover:text-slate-900 transition-all">
            <Settings size={22} />
            <span className="hidden xl:block text-sm font-bold">Configuración</span>
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 ml-20 xl:ml-72 min-h-screen">
        
        {/* TOP NAVBAR */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-50 px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4 bg-slate-50 px-6 py-2.5 rounded-2xl border border-slate-100 w-full max-w-md">
            <Search size={18} className="text-slate-400" />
            <input type="text" placeholder="Buscar recursos, cursos o noticias..." className="bg-transparent w-full text-sm outline-none font-medium text-slate-600" />
          </div>

          <div className="flex items-center gap-6">
            <div className="relative p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-slate-900 transition-all cursor-pointer">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#EE121A] rounded-full border-2 border-white"></span>
            </div>
            <div className="flex items-center gap-4 pl-6 border-l border-slate-100">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">Shantall Gerencia</p>
                <p className="text-[10px] font-black text-[#EE121A] uppercase tracking-widest">Nivel Pro 4</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-slate-100 border-2 border-white shadow-sm overflow-hidden">
                <img src="https://api.dicebear.com/8.x/avataaars/svg?seed=Shantall" alt="Profile" />
              </div>
            </div>
          </div>
        </header>

        {/* DASHBOARD AREA */}
        <div className={`p-8 xl:p-12 space-y-12 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          
          {/* WELCOME SECTION */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
            <div>
              <h2 className="text-4xl font-black tracking-tighter text-slate-900">Hola, Shantall 👋</h2>
              <p className="text-slate-400 font-medium mt-1">Bienvenido de nuevo a tu Hub de Impacto Social en Claro.</p>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-all">Reporte Anual</button>
              <button className="px-6 py-3 bg-[#EE121A] text-white rounded-2xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-red-200 hover:scale-105 transition-all">Nuevo Desafío</button>
            </div>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard label="Cursos Completados" value="12" icon={CheckCircle2} trend="+2 este mes" />
            <StatCard label="Puntos Acumulados" value="4,850" icon={Trophy} trend="+120" />
            <StatCard label="Horas de Formación" value="38.5" icon={BookOpen} />
            <StatCard label="Impacto Social" value="82%" icon={Heart} trend="Top 5%" />
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-12 gap-10">
            
            {/* HERO VIDEO / REEL */}
            <div className="col-span-12 lg:col-span-8">
              <div className="relative group rounded-[3.5rem] overflow-hidden shadow-2xl shadow-slate-200 h-[500px]">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  alt="Corporate Inclusion"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent p-12 flex flex-col justify-between">
                  <div className="flex gap-2">
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-widest border border-white/20 flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      Destacado del Mes
                    </span>
                  </div>
                  <div className="max-w-xl">
                    <h3 className="text-5xl font-black text-white leading-tight tracking-tighter uppercase italic">
                      Liderando con <br/>Diversidad
                    </h3>
                    <p className="text-slate-200 mt-4 text-lg font-medium">Conoce la visión de Claro para el 2026 en inclusión y equidad laboral.</p>
                    <div className="mt-8 flex items-center gap-6">
                      <button className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#EE121A] hover:bg-[#EE121A] hover:text-white transition-all transform active:scale-95 shadow-xl">
                        <Play fill="currentColor" size={24} className="ml-1" />
                      </button>
                      <div>
                        <p className="text-white font-bold text-sm">Cultura Corporativa</p>
                        <p className="text-white/60 text-xs uppercase tracking-widest font-bold">Duración: 3:45 min</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SIDE PANEL: TRIVIA / EVENTS */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              <div className="bg-[#EE121A] p-8 rounded-[2.5rem] text-white shadow-xl shadow-red-100 group cursor-pointer relative overflow-hidden">
                <div className="relative z-10">
                  <div className="p-3 bg-white/20 w-fit rounded-xl mb-6">
                    <ShieldCheck size={24} />
                  </div>
                  <h4 className="text-2xl font-black uppercase tracking-tight italic mb-2">Quiz Semanal</h4>
                  <p className="text-white/70 text-sm font-medium mb-6">Valida tus conocimientos sobre sesgos inconscientes y suma puntos.</p>
                  <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-white text-[#EE121A] px-6 py-3 rounded-xl group-hover:gap-4 transition-all">
                    Iniciar Ahora <ChevronRight size={16} />
                  </button>
                </div>
                <Globe size={180} className="absolute -bottom-12 -right-12 text-white/5 rotate-12" />
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex-1">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">Próximo Evento</h4>
                  <Calendar size={18} className="text-[#EE121A]" />
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-[#EE121A] uppercase tracking-widest mb-1">Mañana • 16:00</p>
                    <p className="text-sm font-bold text-slate-900 line-clamp-1">Taller de Sensibilización DEI</p>
                  </div>
                  <button className="w-full py-4 border-2 border-slate-50 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-[#EE121A] hover:text-[#EE121A] transition-all">
                    Añadir al Calendario
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CURSOS SECTION */}
          <section className="space-y-8 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="flex items-center gap-4">
                <div className="w-2 h-10 bg-[#EE121A] rounded-full"></div>
                <div>
                  <h3 className="text-xs font-black text-[#EE121A] uppercase tracking-[0.4em] mb-1">Formación Continua</h3>
                  <h2 className="text-3xl font-black tracking-tighter text-slate-900">Programas de Aprendizaje</h2>
                </div>
              </div>
              <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shrink-0">
                  <Filter size={14} /> Todos los Cursos
                </button>
                <button className="px-6 py-2.5 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all shrink-0">Pendientes</button>
                <button className="px-6 py-2.5 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all shrink-0">Completados</button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>

          {/* COMMUNITY & NEWS */}
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 lg:col-span-7 space-y-6">
               <div className="flex items-center gap-3">
                 <h3 className="text-lg font-black tracking-tight text-slate-900">Comunidad y Feedback</h3>
                 <div className="h-[1px] flex-1 bg-slate-100"></div>
               </div>
               <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                 <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                   <div className="flex items-center gap-4">
                     <div className="flex -space-x-3">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-10 h-10 rounded-full border-4 border-white overflow-hidden shadow-sm">
                            <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt="user" />
                          </div>
                        ))}
                     </div>
                     <p className="text-xs font-bold text-slate-400"><span className="text-slate-900">148 colegas</span> están activos ahora</p>
                   </div>
                   <button className="p-2.5 hover:bg-slate-100 rounded-xl transition-all">
                     <MoreHorizontal size={20} className="text-slate-400" />
                   </button>
                 </div>
                 <div className="p-8 h-64 flex flex-col items-center justify-center text-center">
                   <MessageSquare size={48} className="text-slate-100 mb-4" />
                   <p className="text-slate-400 font-medium max-w-xs">Únete a la conversación sobre diversidad e inclusión con tu equipo.</p>
                   <button className="mt-6 text-[#EE121A] text-xs font-black uppercase tracking-widest hover:gap-4 transition-all flex items-center gap-2">Abrir Chat Grupal <ChevronRight size={16}/></button>
                 </div>
               </div>
            </div>

            <div className="col-span-12 lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-black tracking-tight text-slate-900">Últimas Noticias</h3>
                <div className="h-[1px] flex-1 bg-slate-100"></div>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Claro premiado por Inclusión 2024", tag: "Logro", time: "Hoy" },
                  { title: "Nuevas políticas de flexibilidad", tag: "Cultura", time: "2h" },
                  { title: "Reporte: Brecha de Género 0%", tag: "Estrategia", time: "Ayer" }
                ].map((news, i) => (
                  <div key={i} className="group flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:border-[#EE121A]/20 hover:shadow-lg hover:shadow-slate-100 transition-all cursor-pointer">
                    <div className="w-16 h-16 rounded-xl bg-slate-50 overflow-hidden shrink-0">
                      <img src={`https://picsum.photos/seed/${i+100}/200/200`} alt="news" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[8px] font-black text-[#EE121A] uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded">{news.tag}</span>
                        <span className="text-[10px] font-bold text-slate-300">{news.time}</span>
                      </div>
                      <h5 className="text-sm font-bold text-slate-900 group-hover:text-[#EE121A] transition-colors line-clamp-1">{news.title}</h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <footer className="px-12 py-12 border-t border-slate-100 bg-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xl">C</div>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Claro • Inclusión • 2026</p>
            </div>
            <div className="flex gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <a href="#" className="hover:text-[#EE121A] transition-colors">Privacidad</a>
              <a href="#" className="hover:text-[#EE121A] transition-colors">Términos</a>
              <a href="#" className="hover:text-[#EE121A] transition-colors">Ayuda</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

// Estilos de ayuda para iconos de reloj (que no estaban en lucide-react directos en mi set mental previo)
const Clock = ({ size, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
import React from 'react';
import { 
  Award, 
  Trophy, 
  Star, 
  Zap, 
  ShieldCheck, 
  Target, 
  Share2, 
  Download, 
  Medal,
  ChevronRight,
  Sparkles
} from 'lucide-react';

/**
 * Componente Achievements - Muro de Honor y Reconocimientos
 * Diseñado con una estética premium, tipografía impactante y centrado perfecto.
 */
export default function Achievements() {
  const badges = [
    { id: 1, name: 'Pionera', desc: 'Primer curso completado con éxito', icon: '🚀', category: 'Inicio', date: '12 Oct 2023', active: true, rarity: 'Común' },
    { id: 2, name: 'Aliada DEI', desc: 'Ganadora de 10 trivias de inclusión', icon: '🤝', category: 'Social', date: '05 Nov 2023', active: true, rarity: 'Raro' },
    { id: 3, name: 'Comunicadora', desc: 'Taller de Lenguaje Inclusivo Pro', icon: '📢', category: 'Habilidad', date: '20 Dic 2023', active: true, rarity: 'Épico' },
    { id: 4, name: 'Mentora', desc: 'Ayudó a 5 colegas en su ruta', icon: '🌟', category: 'Liderazgo', date: '--', active: false, rarity: 'Legendario' },
    { id: 5, name: 'Líder Pro', desc: 'Ruta gerencial completada al 100%', icon: '👑', category: 'Carrera', date: '--', active: false, rarity: 'Épico' },
    { id: 6, name: 'Global', desc: 'Participación en evento internacional', icon: '🌍', category: 'Social', date: '--', active: false, rarity: 'Raro' },
  ];

  const stats = [
    { label: 'Puntos de Impacto', value: '2,450', icon: <Zap size={20} className="text-yellow-500" /> },
    { label: 'Ranking Global', value: '#12', icon: <Target size={20} className="text-blue-500" /> },
    { label: 'Cursos Master', value: '08', icon: <Trophy size={20} className="text-red-500" /> },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-16 py-10 animate-in fade-in zoom-in-95 duration-700">
      
      {/* Header Centrado y Profesional */}
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-red-50 rounded-full text-[#ee121a] text-[10px] font-black uppercase tracking-[0.3em] italic">
          <Sparkles size={14} /> Tu Progreso de Impacto
        </div>
        <h2 className="text-7xl font-black italic uppercase tracking-tighter leading-[0.85] text-gray-900">
          Muro de Honor<br/><span className="text-[#ee121a]">Reconocimientos</span>
        </h2>
        <p className="text-gray-400 text-lg font-medium max-w-2xl mx-auto">
          Cada insignia representa un paso hacia una cultura más inclusiva. Has desbloqueado el <span className="text-gray-900 font-bold">50% de tus metas</span> anuales.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all flex items-center gap-6 group">
            <div className="w-16 h-16 bg-gray-50 rounded-[1.8rem] flex items-center justify-center group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black italic text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sección de Insignias */}
      <section className="space-y-10">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter">Colección de Insignias</h3>
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Insignias digitales verificadas por Claro</p>
          </div>
          <button className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform shadow-2xl shadow-black/20">
            <Share2 size={16} /> Compartir Perfil
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {badges.map((badge) => (
            <div 
              key={badge.id}
              className={`relative group p-10 rounded-[3.5rem] border-2 transition-all duration-500 overflow-hidden ${
                badge.active 
                  ? 'bg-white border-red-50 hover:border-red-200 shadow-sm hover:shadow-2xl' 
                  : 'bg-gray-50/50 border-transparent grayscale opacity-60'
              }`}
            >
              {/* Decoración de fondo para activas */}
              {badge.active && (
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              )}

              <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                <div className={`text-6xl mb-2 transition-transform duration-500 ${badge.active ? 'group-hover:scale-125 group-hover:rotate-12' : ''}`}>
                  {badge.icon}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <span className={`px-3 py-1 rounded-md text-[8px] font-black uppercase tracking-widest ${
                      badge.rarity === 'Legendario' ? 'bg-yellow-100 text-yellow-600' :
                      badge.rarity === 'Épico' ? 'bg-purple-100 text-purple-600' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {badge.rarity}
                    </span>
                    <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">{badge.category}</span>
                  </div>
                  <h4 className="text-2xl font-black italic uppercase text-gray-900">{badge.name}</h4>
                  <p className="text-[11px] font-bold text-gray-400 leading-relaxed max-w-[200px]">{badge.desc}</p>
                </div>

                {badge.active ? (
                  <div className="pt-4 w-full border-t border-gray-50 flex flex-col items-center gap-4">
                    <p className="text-[9px] font-black text-green-500 uppercase tracking-[0.2em] flex items-center gap-1.5">
                      <ShieldCheck size={12} /> Verificado: {badge.date}
                    </p>
                    <button className="text-[10px] font-black text-[#ee121a] uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform">
                      Descargar Certificado <Download size={12} />
                    </button>
                  </div>
                ) : (
                  <div className="pt-4 w-full border-t border-gray-100">
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">Bloqueado</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Banner de Próximo Gran Logro */}
      <section className="bg-black rounded-[4rem] p-16 relative overflow-hidden text-center group">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-600 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#ee121a] rounded-full blur-[120px]"></div>
        </div>
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
          <Medal size={64} className="text-white mx-auto mb-4 animate-bounce" />
          <h3 className="text-4xl font-black italic text-white uppercase tracking-tighter">Siguiente Hito:<br/>Embajadora de Impacto</h3>
          <p className="text-white/50 text-sm font-medium">Completa la ruta de Mentoría para desbloquear esta insignia legendaria y obtener el acceso al Círculo de Líderes Globales.</p>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-[#ee121a] w-3/4 shadow-[0_0_20px_rgba(238,18,26,0.5)]"></div>
          </div>
          <button className="bg-white text-black px-12 py-5 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:scale-105 transition-all">Ver Requisitos</button>
        </div>
      </section>

    </div>
  );
}
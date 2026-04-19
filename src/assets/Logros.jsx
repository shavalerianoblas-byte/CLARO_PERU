import React, { useState, useEffect } from 'react';

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
  Sparkles,
  Flame,
  Gift,
  Users,
  CheckCircle2,
  Lock,
  Crown,
  TrendingUp,
  Heart,
  Globe,
  MessageCircle,
  BookOpen,
  Clock,
  ArrowRight,
  Gem,
  ShoppingBag,
  Coffee,
  Ticket,
  Calendar,
  Briefcase,
  Handshake
} from 'lucide-react';

// ==========================================
// SISTEMA DE DISEÑO - COLORES CORPORATIVOS (ROJO Y BLANCO PREDOMINANTES)
// ==========================================
const THEME = {
  colors: {
    primary: '#EE121A',
    primaryLight: '#FF6B6B',
    primaryDark: '#C40F15',
    secondary: '#FF6B6B',
    white: '#FFFFFF',
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    success: '#10B981',
    warning: '#F59E0B'
  }
};

// ==========================================
// COMPONENTES ATÓMICOS (ESTÉTICA ROJO/BLANCO)
// ==========================================

const Badge = ({ children, variant = 'primary', size = 'md', animated = false }) => {
  const variants = {
    primary: 'bg-[#EE121A] text-white',
    secondary: 'bg-white text-[#EE121A] border-2 border-[#EE121A]',
    success: 'bg-emerald-500 text-white',
    warning: 'bg-amber-500 text-white',
    info: 'bg-[#EE121A] text-white',
    ghost: 'bg-red-50 text-[#EE121A]',
    light: 'bg-red-50 text-[#EE121A]'
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-[9px]',
    md: 'px-3 py-1 text-[10px]',
    lg: 'px-4 py-1.5 text-xs'
  };

  return (
    <span className={`
      ${variants[variant]} ${sizes[size]}
      rounded-full font-black uppercase tracking-wider inline-flex items-center gap-1
      ${animated ? 'animate-pulse' : ''}
      shadow-sm
    `}>
      {children}
    </span>
  );
};

const Button = ({ children, variant = 'primary', size = 'md', icon: Icon, onClick, className = '', loading = false }) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2 font-black uppercase tracking-wider
    transition-all duration-300 ease-out rounded-xl
    active:scale-95 disabled:opacity-50
    hover:shadow-lg hover:-translate-y-0.5
  `;
  
  const variants = {
    primary: 'bg-[#EE121A] text-white hover:bg-[#C40F15]',
    secondary: 'bg-white text-[#EE121A] border-2 border-[#EE121A] hover:bg-[#EE121A] hover:text-white',
    outline: 'bg-white text-[#EE121A] border-2 border-[#EE121A] hover:bg-[#EE121A] hover:text-white',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-[#EE121A]',
    light: 'bg-white text-gray-900 border border-gray-200 hover:border-[#EE121A] hover:text-[#EE121A]',
    gray: 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-[10px]',
    md: 'px-5 py-2.5 text-[11px]',
    lg: 'px-6 py-3 text-xs'
  };

  return (
    <button onClick={onClick} disabled={loading} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (
        <>{Icon && <Icon size={size === 'sm' ? 14 : size === 'md' ? 18 : 22} strokeWidth={2.5} />}{children}</>
      )}
    </button>
  );
};

const ProgressBar = ({ progress, size = 'md', color = 'primary', showLabel = true }) => {
  const colors = {
    primary: 'from-[#EE121A] to-[#FF6B6B]',
    success: 'from-emerald-400 to-emerald-600',
    blue: 'from-blue-400 to-blue-600',
    purple: 'from-purple-400 to-purple-600'
  };
  
  const sizes = { sm: 'h-2', md: 'h-2.5', lg: 'h-4' };

  return (
    <div className="space-y-2">
      {showLabel && (
        <div className="flex justify-between text-[10px] font-black uppercase tracking-wider">
          <span className="text-gray-500">Progreso</span>
          <span className="text-[#EE121A]">{progress}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${sizes[size]}`}>
        <div className={`h-full bg-gradient-to-r ${colors[color]} rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(238,18,26,0.3)]`} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

const Avatar = ({ name, src, size = 'md', status, ring = false }) => {
  const sizes = { sm: 'w-8 h-8 text-[10px]', md: 'w-10 h-10 text-xs', lg: 'w-14 h-14 text-sm', xl: 'w-20 h-20 text-base' };
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div className={`relative ${sizes[size]} ${ring ? 'ring-2 ring-[#EE121A] ring-offset-2' : ''} rounded-full overflow-hidden bg-gradient-to-br from-[#EE121A] to-[#FF6B6B] flex items-center justify-center text-white font-black shadow-md`}>
      {src ? <img src={src} alt={name} className="w-full h-full object-cover" /> : <span>{initials}</span>}
      {status && (
        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${status === 'online' ? 'bg-emerald-500' : status === 'busy' ? 'bg-amber-500' : 'bg-gray-400'}`} />
      )}
    </div>
  );
};

export default function Achievements() {
  const [showCelebration, setShowCelebration] = useState(true);
  const [activeTab, setActiveTab] = useState('logros');
  const [selectedReward, setSelectedReward] = useState(null);
  const [streakDays, setStreakDays] = useState(12);
  const [userPoints, setUserPoints] = useState(2450);

  const rankingData = [
    { position: 1, name: 'María G.', points: 3200, avatar: '👩‍💼', isUser: false },
    { position: 2, name: 'Carlos R.', points: 2890, avatar: '👨‍💻', isUser: false },
    { position: 3, name: 'Ana L.', points: 2750, avatar: '👩‍🎨', isUser: false },
    { position: 4, name: 'TÚ', points: 2450, avatar: '🚀', isUser: true, highlight: true },
    { position: 5, name: 'Pedro M.', points: 2300, avatar: '👨‍💼', isUser: false },
    { position: 6, name: 'Laura S.', points: 2150, avatar: '👩‍🔬', isUser: false },
  ];

  const badges = [
    { id: 1, name: 'Pionera', desc: 'Primer curso completado con éxito', icon: '🚀', category: 'Inicio', date: '12 Oct 2023', active: true, rarity: 'Común', progress: 100 },
    { id: 2, name: 'Aliada DEI', desc: 'Ganadora de 10 trivias de inclusión', icon: '🤝', category: 'Social', date: '05 Nov 2023', active: true, rarity: 'Raro', progress: 100 },
    { id: 3, name: 'Comunicadora', desc: 'Taller de Lenguaje Inclusivo Pro', icon: '📢', category: 'Habilidad', date: '20 Dic 2023', active: true, rarity: 'Épico', progress: 100 },
    { id: 4, name: 'Mentora', desc: 'Ayudó a 5 colegas en su ruta', icon: '🌟', category: 'Liderazgo', date: '--', active: false, rarity: 'Legendario', progress: 60, target: 5, current: 3 },
    { id: 5, name: 'Líder Pro', desc: 'Ruta gerencial completada al 100%', icon: '👑', category: 'Carrera', date: '--', active: false, rarity: 'Épico', progress: 75, target: 100, current: 75 },
    { id: 6, name: 'Global', desc: 'Participación en evento internacional', icon: '🌍', category: 'Social', date: '--', active: false, rarity: 'Raro', progress: 0 },
    { id: 7, name: 'Embajadora', desc: 'Referir a 3 colegas al programa', icon: '💎', category: 'Liderazgo', date: '--', active: false, rarity: 'Legendario', progress: 33, target: 3, current: 1 },
    { id: 8, name: 'Escucha Activa', desc: 'Completar 5 talleres de empatía', icon: '👂', category: 'Habilidad', date: '--', active: false, rarity: 'Épico', progress: 40, target: 5, current: 2 },
  ];

  const redeemableRewards = [
    { id: 1, name: 'Día de Home Office DEI', desc: 'Trabaja desde casa dedicado a aprendizaje de diversidad', cost: 500, icon: <Coffee size={24} />, available: true, category: 'Bienestar', stock: 15 },
    { id: 2, name: 'Mentoría VIP', desc: 'Sesión 1:1 con líder de inclusión corporativa', cost: 1200, icon: <Crown size={24} />, available: true, category: 'Carrera', stock: 5 },
    { id: 3, name: 'Evento Networking Global', desc: 'Acceso exclusivo a evento internacional DEI', cost: 2000, icon: <Globe size={24} />, available: true, category: 'Experiencia', stock: 3 },
    { id: 4, name: 'Curso Especializado', desc: 'Certificación en Liderazgo Inclusivo', cost: 1500, icon: <BookOpen size={24} />, available: true, category: 'Educación', stock: 8 },
    { id: 5, name: 'Almuerzo con CEO', desc: 'Conversación sobre diversidad con la alta dirección', cost: 3000, icon: <Handshake size={24} />, available: false, category: 'Experiencia', stock: 0 },
    { id: 6, name: 'Kit DEI Premium', desc: 'Material exclusivo de inclusión y diversidad', cost: 800, icon: <Gift size={24} />, available: true, category: 'Merchandising', stock: 25 },
  ];

  const streakData = {
    current: 12,
    longest: 28,
    weeklyProgress: [true, true, true, true, true, false, false],
    multiplier: 1.5,
    nextMilestone: 15,
    shieldActive: true
  };

  const missions = [
    { id: 1, title: 'Equipo Unido', desc: 'Completa 3 actividades DEI con tu equipo esta semana', progress: 2, target: 3, reward: 300, deadline: '3 días', type: 'team', icon: <Users size={20} />, active: true },
    { id: 2, title: 'Embajador de Inclusión', desc: 'Comparte un recurso DEI con 5 colegas', progress: 3, target: 5, reward: 200, deadline: '5 días', type: 'individual', icon: <Share2 size={20} />, active: true },
    { id: 3, title: 'Feedback Constructivo', desc: 'Dale feedback positivo a 2 compañeros de diferentes áreas', progress: 1, target: 2, reward: 150, deadline: '2 días', type: 'social', icon: <MessageCircle size={20} />, active: true },
    { id: 4, title: 'Maratón DEI', desc: 'Completa 5 cursos de diversidad en 7 días', progress: 2, target: 5, reward: 500, deadline: '5 días', type: 'challenge', icon: <Zap size={20} />, active: true },
    { id: 5, title: 'Líder de Cambio', desc: 'Propón una idea para mejorar la inclusión en tu área', progress: 0, target: 1, reward: 400, deadline: '7 días', type: 'innovation', icon: <TrendingUp size={20} />, active: false }
  ];

  const stats = [
    { label: 'Puntos de Impacto', value: '2,450', icon: <Zap size={20} className="text-[#EE121A]" />, trend: '+12%' },
    { label: 'Ranking Global', value: '#12', icon: <Target size={20} className="text-gray-600" />, trend: '↑ 3 puestos' },
    { label: 'Racha Actual', value: '12 días', icon: <Flame size={20} className="text-orange-500" />, trend: 'Record: 28' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowCelebration(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'Legendario': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Épico': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Raro': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getMissionTypeColor = (type) => {
    switch(type) {
      case 'team': return 'bg-[#EE121A]/10 text-[#EE121A]';
      case 'social': return 'bg-blue-50 text-blue-600';
      case 'challenge': return 'bg-orange-50 text-orange-600';
      case 'innovation': return 'bg-purple-50 text-purple-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">

      {/* POP-UP DE CELEBRACIÓN - LUMINOSO, SIN NEGROS */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#EE121A]/90 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] p-12 max-w-2xl w-full mx-4 text-center relative overflow-hidden shadow-2xl border-4 border-white">
            {/* Decoración roja suave */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#EE121A]/10 to-transparent"></div>
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#EE121A]/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#FF6B6B]/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#EE121A] text-white rounded-full text-sm font-black uppercase tracking-widest animate-bounce shadow-lg">
                <Trophy size={18} /> ¡FELICIDADES!
              </div>

              <h2 className="text-5xl font-black italic uppercase tracking-tighter text-gray-900 leading-[0.9]">
                Estás en el <span className="text-[#EE121A]">Puesto #4</span>
              </h2>

              <div className="flex items-center justify-center gap-4 py-4">
                <div className="text-6xl animate-pulse">🎉</div>
                <div className="text-6xl animate-pulse delay-100">🏆</div>
                <div className="text-6xl animate-pulse delay-200">🎊</div>
              </div>

              <p className="text-xl text-gray-600 font-medium">
                Tienes <span className="text-[#EE121A] font-black text-2xl">2,450 puntos</span> de impacto DEI
              </p>

              <p className="text-sm text-gray-400 font-medium">
                ¡Sigue así para llegar al podio! Solo 300 puntos más para el top 3
              </p>

              <Button 
                size="lg"
                onClick={() => setShowCelebration(false)}
                className="mt-6"
              >
                Continuar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header Premium - Estilo del primer documento */}
      <header className="text-center space-y-6 pt-8">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#EE121A]/10 rounded-full text-[#EE121A] text-[10px] font-black uppercase tracking-[0.3em] italic">
          <Sparkles size={14} /> Tu Progreso de Impacto
        </div>
        <h2 className="text-6xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.85] text-gray-900">
          Muro de Honor<br/><span className="text-[#EE121A]">Reconocimientos</span>
        </h2>
        <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto">
          Cada insignia representa un paso hacia una cultura más inclusiva. Has desbloqueado el <span className="text-gray-900 font-bold">50% de tus metas</span> anuales.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-12 space-y-12">

        {/* Stats Grid Premium - ROJO Y BLANCO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all flex items-center gap-6 group hover:border-[#EE121A]/30">
              <div className="w-16 h-16 bg-red-50 rounded-[1.5rem] flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-[#EE121A] group-hover:text-white text-[#EE121A]">
                {stat.icon}
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-3xl font-black italic text-gray-900">{stat.value}</p>
                <p className="text-[10px] font-bold text-emerald-500 mt-1">{stat.trend}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navegación por Tabs - ROJO Y BLANCO */}
        <div className="flex justify-center">
          <div className="inline-flex bg-gray-100 p-2 rounded-full gap-1">
            {[
              { id: 'logros', label: 'Logros', icon: <Award size={16} /> },
              { id: 'ranking', label: 'Ranking', icon: <Trophy size={16} /> },
              { id: 'racha', label: 'Racha', icon: <Flame size={16} /> },
              { id: 'misiones', label: 'Misiones', icon: <Target size={16} /> },
              { id: 'premios', label: 'Premios', icon: <Gift size={16} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-black uppercase text-[10px] tracking-widest transition-all ${
                  activeTab === tab.id 
                    ? 'bg-[#EE121A] text-white shadow-lg' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contenido según Tab seleccionado */}
        <div className="min-h-[600px]">

          {/* TAB: LOGROS - ROJO Y BLANCO */}
          {activeTab === 'logros' && (
            <section className="space-y-10 animate-in fade-in duration-500">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter text-gray-900">Colección de Insignias</h3>
                  <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Insignias digitales verificadas por Claro</p>
                </div>
                <Button 
                  variant="secondary" 
                  size="md" 
                  icon={Share2}
                  className="shadow-lg"
                >
                  Compartir Perfil
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {badges.map((badge) => (
                  <div 
                    key={badge.id}
                    className={`relative group p-8 rounded-[2.5rem] border-2 transition-all duration-500 overflow-hidden ${
                      badge.active 
                        ? 'bg-white border-gray-100 hover:border-[#EE121A]/30 shadow-sm hover:shadow-2xl hover:shadow-red-100/50' 
                        : 'bg-gray-50/50 border-transparent grayscale opacity-60'
                    }`}
                  >
                    {badge.active && (
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#EE121A]/10 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    )}

                    <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                      <div className={`text-5xl mb-2 transition-transform duration-500 ${badge.active ? 'group-hover:scale-125 group-hover:rotate-12' : ''}`}>
                        {badge.icon}
                      </div>

                      <div className="space-y-2 w-full">
                        <div className="flex items-center justify-center gap-2">
                          <span className={`px-3 py-1 rounded-md text-[8px] font-black uppercase tracking-widest border ${getRarityColor(badge.rarity)}`}>
                            {badge.rarity}
                          </span>
                        </div>
                        <h4 className="text-xl font-black italic uppercase text-gray-900">{badge.name}</h4>
                        <p className="text-[11px] font-bold text-gray-400 leading-relaxed">{badge.desc}</p>

                        {!badge.active && badge.progress > 0 && (
                          <div className="mt-3">
                            <ProgressBar progress={badge.progress} size="sm" showLabel={false} />
                            <p className="text-[9px] font-bold text-gray-400 mt-1 text-center">
                              {badge.current || 0}/{badge.target || 100} completado
                            </p>
                          </div>
                        )}
                      </div>

                      {badge.active ? (
                        <div className="pt-4 w-full border-t border-gray-100 flex flex-col items-center gap-3">
                          <p className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em] flex items-center gap-1.5">
                            <ShieldCheck size={12} /> Verificado: {badge.date}
                          </p>
                          <button className="text-[10px] font-black text-[#EE121A] uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform">
                            Descargar <Download size={12} />
                          </button>
                        </div>
                      ) : (
                        <div className="pt-4 w-full border-t border-gray-200">
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center justify-center gap-1">
                            <Lock size={10} /> Bloqueado
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Banner Próximo Hito - GRADIENTE ROJO, SIN NEGRO */}
              <section className="relative rounded-[2.5rem] overflow-hidden min-h-[300px] flex items-center justify-center shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#EE121A] via-[#FF6B6B] to-[#EE121A]" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                
                <div className="relative z-10 max-w-2xl mx-auto space-y-6 text-center p-8">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#EE121A] mx-auto shadow-lg">
                    <Medal size={32} />
                  </div>
                  <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter">Siguiente Hito:<br/>Embajadora de Impacto</h3>
                  <p className="text-white/80 text-sm font-medium">Completa la ruta de Mentoría para desbloquear esta insignia legendaria</p>
                  <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white w-3/4 shadow-[0_0_20px_rgba(255,255,255,0.3)]"></div>
                  </div>
                  <Button 
                    variant="secondary" 
                    size="md"
                    className="bg-white text-[#EE121A] border-white hover:bg-white/90"
                  >
                    Ver Requisitos
                  </Button>
                </div>
              </section>
            </section>
          )}

          {/* TAB: RANKING - SIN NEGROS */}
          {activeTab === 'ranking' && (
            <section className="space-y-8 animate-in fade-in duration-500">
              <div className="text-center space-y-2">
                <h3 className="text-4xl font-black italic uppercase tracking-tighter text-gray-900">Tabla de Líderes</h3>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Compite y sube en el ranking global DEI</p>
              </div>

              {/* Podio Top 3 - COLORES CÁLIDOS, NO NEGROS */}
              <div className="flex justify-center items-end gap-4 mb-8">
                {/* Segundo lugar - GRIS CÁLIDO */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-3xl mb-2 border-4 border-gray-300 shadow-lg">
                    {rankingData[1].avatar}
                  </div>
                  <div className="bg-gray-200 px-4 py-2 rounded-t-lg text-center shadow-md">
                    <p className="text-xs font-black text-gray-600">#2</p>
                    <p className="text-[10px] font-bold text-gray-500 truncate w-20">{rankingData[1].name}</p>
                    <p className="text-xs font-black text-gray-700">{rankingData[1].points.toLocaleString()}</p>
                  </div>
                </div>

                {/* Primer lugar - ÁMBAR/DORADO */}
                <div className="flex flex-col items-center -mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full flex items-center justify-center text-4xl mb-2 border-4 border-amber-400 shadow-xl shadow-amber-200">
                    {rankingData[0].avatar}
                  </div>
                  <div className="bg-gradient-to-b from-amber-400 to-amber-500 px-6 py-3 rounded-t-xl text-center shadow-lg">
                    <Crown size={20} className="text-amber-100 mx-auto mb-1" />
                    <p className="text-xs font-black text-amber-100">#1</p>
                    <p className="text-[10px] font-bold text-amber-50 truncate w-24">{rankingData[0].name}</p>
                    <p className="text-sm font-black text-white">{rankingData[0].points.toLocaleString()}</p>
                  </div>
                </div>

                {/* Tercer lugar - BRONCE/NARANJA */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full flex items-center justify-center text-3xl mb-2 border-4 border-orange-400 shadow-lg">
                    {rankingData[2].avatar}
                  </div>
                  <div className="bg-gradient-to-b from-orange-300 to-orange-400 px-4 py-2 rounded-t-lg text-center shadow-md">
                    <p className="text-xs font-black text-orange-900">#3</p>
                    <p className="text-[10px] font-bold text-orange-800 truncate w-20">{rankingData[2].name}</p>
                    <p className="text-xs font-black text-orange-900">{rankingData[2].points.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Lista de ranking - SIN NEGROS */}
              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
                {rankingData.slice(3).map((player, index) => (
                  <div 
                    key={player.position}
                    className={`flex items-center gap-4 p-6 ${
                      player.isUser 
                        ? 'bg-gradient-to-r from-[#EE121A]/5 to-transparent border-l-4 border-[#EE121A]' 
                        : 'border-b border-gray-50 last:border-b-0 hover:bg-gray-50'
                    }`}
                  >
                    <span className={`text-2xl font-black italic w-12 text-center ${
                      player.isUser ? 'text-[#EE121A]' : 'text-gray-400'
                    }`}>
                      #{player.position}
                    </span>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                      player.isUser ? 'bg-[#EE121A] text-white shadow-lg' : 'bg-gray-100'
                    }`}>
                      {player.avatar}
                    </div>
                    <div className="flex-1">
                      <p className={`font-black italic uppercase ${
                        player.isUser ? 'text-gray-900' : 'text-gray-600'
                      }`}>
                        {player.name} {player.isUser && <Badge variant="primary" size="sm">TÚ</Badge>}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-black italic ${
                        player.isUser ? 'text-[#EE121A]' : 'text-gray-900'
                      }`}>
                        {player.points.toLocaleString()}
                      </p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">puntos</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mensaje motivacional - ROJO Y BLANCO */}
              <div className="bg-gradient-to-r from-[#EE121A]/10 to-transparent rounded-[2rem] p-6 flex items-center gap-4 border border-[#EE121A]/20">
                <div className="w-14 h-14 bg-[#EE121A] rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <TrendingUp size={28} />
                </div>
                <div>
                  <p className="font-black text-gray-900 uppercase tracking-tight">¡Estás cerca del podio!</p>
                  <p className="text-sm text-gray-500">Necesitas 300 puntos más para llegar al top 3. ¡Completa una misión hoy!</p>
                </div>
              </div>
            </section>
          )}

          {/* TAB: RACHA - GRADIENTE ROJO, SIN NEGROS */}
          {activeTab === 'racha' && (
            <section className="space-y-8 animate-in fade-in duration-500">
              <div className="text-center space-y-2">
                <h3 className="text-4xl font-black italic uppercase tracking-tighter text-gray-900">Racha de Aprendizaje</h3>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Mantén tu compromiso con la diversidad</p>
              </div>

              {/* Racha Principal - GRADIENTE ROJO CORPORATIVO */}
              <div className="relative rounded-[2.5rem] overflow-hidden min-h-[300px] flex items-center justify-center shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#EE121A] via-[#FF6B6B] to-[#EE121A]" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                
                <div className="relative z-10 space-y-6 text-center p-8">
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                        <Flame size={48} className="text-white animate-pulse" />
                      </div>
                      {streakData.shieldActive && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                          <ShieldCheck size={16} className="text-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-7xl font-black italic text-white drop-shadow-lg">{streakData.current}</p>
                    <p className="text-xl font-black uppercase tracking-widest text-white/90">Días de Racha</p>
                  </div>

                  <div className="flex justify-center gap-8 text-sm">
                    <div className="bg-white/20 rounded-2xl px-6 py-3 backdrop-blur-sm border border-white/30">
                      <p className="font-black text-2xl text-white">{streakData.longest}</p>
                      <p className="text-[10px] uppercase tracking-widest text-white/80">Record</p>
                    </div>
                    <div className="bg-white/20 rounded-2xl px-6 py-3 backdrop-blur-sm border border-white/30">
                      <p className="font-black text-2xl text-white">x{streakData.multiplier}</p>
                      <p className="text-[10px] uppercase tracking-widest text-white/80">Multiplicador</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendario Semanal - ROJO Y BLANCO */}
              <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-xl">
                <p className="text-center text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Esta Semana</p>
                <div className="flex justify-between gap-2">
                  {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, index) => (
                    <div key={day} className="flex flex-col items-center gap-2">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
                        streakData.weeklyProgress[index] 
                          ? 'bg-[#EE121A] text-white shadow-lg shadow-red-200' 
                          : index === 5 || index === 6
                            ? 'bg-gray-100 text-gray-300'
                            : 'bg-gray-100 text-gray-400 border-2 border-dashed border-gray-300'
                      }`}>
                        {streakData.weeklyProgress[index] ? (
                          <Flame size={20} />
                        ) : (
                          <span className="text-xs font-bold">{day[0]}</span>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">{day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Escudo de protección - AZUL SUAVE, NO NEGRO */}
              <div className="bg-blue-50 rounded-[2rem] p-6 flex items-center gap-4 border border-blue-100 shadow-sm">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <ShieldCheck size={28} />
                </div>
                <div className="flex-1">
                  <p className="font-black text-gray-900">Escudo de Racha Activo</p>
                  <p className="text-sm text-gray-500">Si pierdes un día, tu racha se mantendrá. Vence en 2 días.</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-blue-600 uppercase">Protección</p>
                  <p className="text-lg font-black text-blue-700">2 días</p>
                </div>
              </div>

              {/* Próximo hito - GRIS OSCURO (NO NEGRO PURO) */}
              <div className="bg-gray-800 rounded-[2rem] p-6 flex items-center gap-4 text-white shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-br from-[#EE121A] to-[#FF6B6B] rounded-2xl flex items-center justify-center shadow-lg">
                  <Target size={28} />
                </div>
                <div className="flex-1">
                  <p className="font-black uppercase tracking-tight">Próximo Hito: 15 días</p>
                  <p className="text-sm text-gray-400">Desbloquea insignia "Compromiso Inquebrantable"</p>
                </div>
                <ChevronRight size={24} className="text-gray-500" />
              </div>
            </section>
          )}

          {/* TAB: MISIONES - ROJO Y BLANCO */}
          {activeTab === 'misiones' && (
            <section className="space-y-8 animate-in fade-in duration-500">
              <div className="text-center space-y-2">
                <h3 className="text-4xl font-black italic uppercase tracking-tighter text-gray-900">Misiones Activas</h3>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Completa desafíos y gana puntos extra</p>
              </div>

              {/* Resumen de misiones - ROJO Y BLANCO */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-[2.5rem] p-6 text-center border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                  <p className="text-3xl font-black text-[#EE121A]">{missions.filter(m => m.active).length}</p>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Activas</p>
                </div>
                <div className="bg-white rounded-[2.5rem] p-6 text-center border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                  <p className="text-3xl font-black text-emerald-500">
                    {missions.filter(m => m.progress === m.target).length}
                  </p>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Completadas</p>
                </div>
                <div className="bg-white rounded-[2.5rem] p-6 text-center border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                  <p className="text-3xl font-black text-purple-600">
                    {missions.reduce((acc, m) => acc + (m.active ? m.reward : 0), 0)}
                  </p>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Pts. Disponibles</p>
                </div>
              </div>

              {/* Lista de misiones - ROJO Y BLANCO */}
              <div className="space-y-4">
                {missions.map((mission) => (
                  <div 
                    key={mission.id}
                    className={`bg-white rounded-[2.5rem] border-2 p-6 transition-all hover:shadow-xl ${
                      mission.active ? 'border-gray-100 hover:border-[#EE121A]/30' : 'border-gray-100 opacity-50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${getMissionTypeColor(mission.type)}`}>
                        {mission.icon}
                      </div>

                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-widest bg-gray-100 text-gray-600">
                                {mission.type}
                              </span>
                              <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                                <Clock size={10} /> {mission.deadline}
                              </span>
                            </div>
                            <h4 className="text-lg font-black italic uppercase text-gray-900">{mission.title}</h4>
                            <p className="text-sm text-gray-500">{mission.desc}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-black text-[#EE121A]">+{mission.reward}</p>
                            <p className="text-[9px] font-bold text-gray-400 uppercase">puntos</p>
                          </div>
                        </div>

                        {/* Barra de progreso - ROJO */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                            <span className="text-gray-500">Progreso</span>
                            <span className="text-gray-900">{mission.progress}/{mission.target}</span>
                          </div>
                          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#EE121A] to-[#FF6B6B] rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(238,18,26,0.3)]"
                              style={{ width: `${(mission.progress / mission.target) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        {mission.progress === mission.target ? (
                          <Button variant="success" size="md" className="w-full" icon={CheckCircle2}>
                            Reclamar Recompensa
                          </Button>
                        ) : (
                          <Button variant="outline" size="md" className="w-full" icon={ArrowRight}>
                            Continuar
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* TAB: PREMIOS - ROJO Y BLANCO */}
          {activeTab === 'premios' && (
            <section className="space-y-8 animate-in fade-in duration-500">

              {/* Header */}
              <div className="text-center space-y-2">
                <h3 className="text-4xl font-black italic uppercase tracking-tighter text-gray-900">
                  Centro de Recompensas
                </h3>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">
                  Canjea tus puntos por beneficios exclusivos DEI
                </p>
              </div>

              {/* Balance Card - GRADIENTE ROJO */}
              <div className="relative rounded-[2.5rem] overflow-hidden min-h-[200px] flex items-center shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-[#EE121A] to-[#FF6B6B]" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10 w-full p-8 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center shadow-lg">
                      <Zap size={40} className="text-[#EE121A]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white/70 uppercase tracking-[0.3em]">Puntos Disponibles</p>
                      <p className="text-5xl font-black italic text-white">2,450</p>
                      <p className="text-xs font-bold text-white/80 mt-1">+350 esta semana</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] font-black text-white/70 uppercase tracking-widest">Nivel</p>
                    <p className="text-2xl font-black italic text-white">Aliada DEI</p>
                    <p className="text-[10px] font-bold text-white/60">3,000 pts para el siguiente</p>
                  </div>
                </div>
              </div>

              {/* Categorías - ROJO Y BLANCO */}
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {[
                  { id: 'todos', label: 'Todos', count: 8 },
                  { id: 'experiencias', label: 'Experiencias', count: 3 },
                  { id: 'bienestar', label: 'Bienestar', count: 2 },
                  { id: 'educacion', label: 'Educación', count: 2 },
                  { id: 'merch', label: 'Merchandising', count: 1 },
                ].map((cat, idx) => (
                  <button 
                    key={cat.id}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-black uppercase text-[10px] tracking-widest whitespace-nowrap transition-all ${
                      idx === 0 
                        ? 'bg-[#EE121A] text-white shadow-lg' 
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-[#EE121A] hover:text-[#EE121A]'
                    }`}
                  >
                    {cat.label}
                    <span className={`px-2 py-0.5 rounded-full text-[8px] ${idx === 0 ? 'bg-white/20' : 'bg-gray-100'}`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Grid de Premios - ROJO Y BLANCO */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Premio 1: Día Home Office DEI */}
                <div className="group bg-white rounded-[2.5rem] border-2 border-gray-100 p-6 hover:border-[#EE121A]/30 hover:shadow-2xl hover:shadow-red-100/50 transition-all duration-500">
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-16 h-16 bg-blue-50 rounded-[1.5rem] flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform shadow-sm">
                      <Coffee size={28} />
                    </div>
                    <span className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-blue-50 text-blue-600">
                      Bienestar
                    </span>
                  </div>

                  <h4 className="text-xl font-black italic uppercase text-gray-900 mb-2">Día Home Office DEI</h4>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                    Trabaja desde casa dedicado a aprendizaje de diversidad e inclusión
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>
                      <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400">+124 canjeados</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-3xl font-black italic text-[#EE121A]">500</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">puntos</p>
                    </div>
                    <Button variant="outline" size="md" icon={ShoppingBag}>
                      Canjear
                    </Button>
                  </div>
                </div>

                {/* Premio 2: Mentoría VIP */}
                <div className="group bg-white rounded-[2.5rem] border-2 border-gray-100 p-6 hover:border-[#EE121A]/30 hover:shadow-2xl hover:shadow-red-100/50 transition-all duration-500">
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-16 h-16 bg-purple-50 rounded-[1.5rem] flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform shadow-sm">
                      <Crown size={28} />
                    </div>
                    <span className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-purple-50 text-purple-600">
                      Experiencia
                    </span>
                  </div>

                  <h4 className="text-xl font-black italic uppercase text-gray-900 mb-2">Mentoría VIP</h4>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                    Sesión 1:1 con líder de inclusión corporativa de 45 minutos
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>
                      <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div>
                      <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white"></div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400">+89 canjeados</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-3xl font-black italic text-[#EE121A]">1,200</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">puntos</p>
                    </div>
                    <Button variant="outline" size="md" icon={ShoppingBag}>
                      Canjear
                    </Button>
                  </div>
                </div>

                {/* Premio 3: Evento Networking Global */}
                <div className="group bg-white rounded-[2.5rem] border-2 border-gray-100 p-6 hover:border-[#EE121A]/30 hover:shadow-2xl hover:shadow-red-100/50 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-4 right-4 bg-[#EE121A] text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg">
                    Solo 3 left
                  </div>

                  <div className="flex justify-between items-start mb-5">
                    <div className="w-16 h-16 bg-green-50 rounded-[1.5rem] flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform shadow-sm">
                      <Globe size={28} />
                    </div>
                    <span className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-green-50 text-green-600">
                      Experiencia
                    </span>
                  </div>

                  <h4 className="text-xl font-black italic uppercase text-gray-900 mb-2">Evento Networking Global</h4>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                    Acceso exclusivo a evento internacional DEI con líderes globales
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-[10px] font-bold text-gray-400">Más popular</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-3xl font-black italic text-[#EE121A]">2,000</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">puntos</p>
                    </div>
                    <Button variant="outline" size="md" icon={ShoppingBag}>
                      Canjear
                    </Button>
                  </div>
                </div>

                {/* Premio 4: Certificación Liderazgo Inclusivo */}
                <div className="group bg-white rounded-[2.5rem] border-2 border-gray-100 p-6 hover:border-[#EE121A]/30 hover:shadow-2xl hover:shadow-red-100/50 transition-all duration-500">
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-16 h-16 bg-amber-50 rounded-[1.5rem] flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform shadow-sm">
                      <BookOpen size={28} />
                    </div>
                    <span className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-amber-50 text-amber-600">
                      Educación
                    </span>
                  </div>

                  <h4 className="text-xl font-black italic uppercase text-gray-900 mb-2">Certificación Liderazgo Inclusivo</h4>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                    Curso especializado con certificación reconocida internacionalmente
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <Award size={14} className="text-[#EE121A]" />
                    <span className="text-[10px] font-bold text-gray-400">Certificado incluido</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-3xl font-black italic text-[#EE121A]">1,500</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">puntos</p>
                    </div>
                    <Button variant="outline" size="md" icon={ShoppingBag}>
                      Canjear
                    </Button>
                  </div>
                </div>

                {/* Premio 5: Almuerzo con CEO - AGOTADO (GRIS, NO NEGRO) */}
                <div className="group bg-gray-50 rounded-[2.5rem] border-2 border-gray-100 p-6 opacity-60 grayscale">
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-16 h-16 bg-gray-200 rounded-[1.5rem] flex items-center justify-center text-gray-400">
                      <Handshake size={28} />
                    </div>
                    <span className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-gray-200 text-gray-500">
                      Experiencia
                    </span>
                  </div>

                  <h4 className="text-xl font-black italic uppercase text-gray-500 mb-2">Almuerzo con CEO</h4>
                  <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                    Conversación exclusiva sobre diversidad con la alta dirección
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <Lock size={14} className="text-gray-400" />
                    <span className="text-[10px] font-bold text-gray-400">Agotado</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-3xl font-black italic text-gray-400">3,000</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">puntos</p>
                    </div>
                    <button disabled className="flex items-center gap-2 bg-gray-300 text-gray-500 px-6 py-3 rounded-full font-black uppercase text-[10px] tracking-widest cursor-not-allowed">
                      <Lock size={14} /> Agotado
                    </button>
                  </div>
                </div>

                {/* Premio 6: Kit DEI Premium */}
                <div className="group bg-white rounded-[2.5rem] border-2 border-gray-100 p-6 hover:border-[#EE121A]/30 hover:shadow-2xl hover:shadow-red-100/50 transition-all duration-500">
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-16 h-16 bg-pink-50 rounded-[1.5rem] flex items-center justify-center text-pink-600 group-hover:scale-110 transition-transform shadow-sm">
                      <Gift size={28} />
                    </div>
                    <span className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-pink-50 text-pink-600">
                      Merchandising
                    </span>
                  </div>

                  <h4 className="text-xl font-black italic uppercase text-gray-900 mb-2">Kit DEI Premium</h4>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                    Material exclusivo: libreta, stickers, pin y camiseta de inclusión
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>
                      <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div>
                      <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white"></div>
                      <div className="w-6 h-6 rounded-full bg-gray-500 border-2 border-white"></div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400">+256 canjeados</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-3xl font-black italic text-[#EE121A]">800</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">puntos</p>
                    </div>
                    <Button variant="outline" size="md" icon={ShoppingBag}>
                      Canjear
                    </Button>
                  </div>
                </div>

                {/* Premio 7: Workshop Equipo */}
                <div className="group bg-white rounded-[2.5rem] border-2 border-gray-100 p-6 hover:border-[#EE121A]/30 hover:shadow-2xl hover:shadow-red-100/50 transition-all duration-500">
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-16 h-16 bg-teal-50 rounded-[1.5rem] flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform shadow-sm">
                      <Users size={28} />
                    </div>
                    <span className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-teal-50 text-teal-600">
                      Equipo
                    </span>
                  </div>

                  <h4 className="text-xl font-black italic uppercase text-gray-900 mb-2">Workshop para tu Equipo</h4>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                    Taller personalizado de diversidad para tu área (hasta 10 personas)
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <Calendar size={14} className="text-teal-500" />
                    <span className="text-[10px] font-bold text-gray-400">Agendamiento flexible</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-3xl font-black italic text-[#EE121A]">2,500</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">puntos</p>
                    </div>
                    <Button variant="outline" size="md" icon={ShoppingBag}>
                      Canjear
                    </Button>
                  </div>
                </div>

                {/* Premio 8: Donación a ONG */}
                <div className="group bg-white rounded-[2.5rem] border-2 border-gray-100 p-6 hover:border-[#EE121A]/30 hover:shadow-2xl hover:shadow-red-100/50 transition-all duration-500">
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-16 h-16 bg-red-50 rounded-[1.5rem] flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform shadow-sm">
                      <Heart size={28} />
                    </div>
                    <span className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-red-50 text-red-600">
                      Impacto Social
                    </span>
                  </div>

                  <h4 className="text-xl font-black italic uppercase text-gray-900 mb-2">Donación a ONG DEI</h4>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                    Convertimos tus puntos en donación real a organizaciones de inclusión
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp size={14} className="text-emerald-500" />
                    <span className="text-[10px] font-bold text-gray-400">$1 = 100 puntos</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-3xl font-black italic text-[#EE121A]">Desde 500</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">puntos</p>
                    </div>
                    <Button variant="outline" size="md" icon={ShoppingBag}>
                      Canjear
                    </Button>
                  </div>
                </div>

              </div>

              {/* Info Footer - ROJO Y BLANCO */}
              <div className="bg-white rounded-[2rem] p-6 flex items-start gap-4 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles size={24} className="text-[#EE121A]" />
                </div>
                <div>
                  <p className="font-black text-gray-900 text-sm mb-1">¿Cómo ganar más puntos?</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Completa misiones diarias (+50 pts), mantén tu racha (+100 pts/día), 
                    participa en eventos DEI (+200 pts) y ayuda a colegas (+25 pts por ayuda).
                  </p>
                </div>
              </div>

            </section>
          )}
        </div>

        {/* Footer - ROJO Y BLANCO */}
        <footer className="bg-white border-t border-gray-200 py-12 mt-12 rounded-t-[2.5rem]">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#EE121A] rounded-lg flex items-center justify-center text-white shadow-md">
                <Globe size={18} strokeWidth={3} />
              </div>
              <span className="text-lg font-black italic tracking-tighter text-[#EE121A] uppercase">Claro</span>
            </div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">
              Equipo Innovación DEI • Temporada 2026
            </p>
            <div className="flex gap-4">
              <button className="text-gray-400 hover:text-[#EE121A] transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </footer>

      </main>

      {/* Estilos Custom */}
      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
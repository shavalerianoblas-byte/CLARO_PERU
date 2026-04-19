import React, { useState, useEffect, useRef } from 'react';
import DEIAssistant from '../componentes/DEIAssistant';
import { 
  Play, Trophy, Clock, CheckCircle2, Flame, 
  ChevronRight, Send, Calendar, Users, TrendingUp,
  X, Download, Heart, Target, Award, Star,
  Globe, Sparkles, BookOpen, ArrowUpRight, Zap,
  Newspaper, TrendingUp as TrendIcon, Lightbulb,
  Share2, Bookmark, MoreHorizontal
} from 'lucide-react';

// ==========================================
// SISTEMA DE DISEÑO - COLORES CORPORATIVOS
// ==========================================
const THEME = {
  colors: {
    primary: '#EE121A',
    primaryLight: '#FF4D54',
    primaryDark: '#C40F15',
    secondary: '#FF6B6B',
    white: '#FFFFFF',
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    success: '#10B981',
    warning: '#F59E0B'
  }
};

// ==========================================
// COMPONENTES ATÓMICOS
// ==========================================

const Badge = ({ children, variant = 'primary', size = 'md', animated = false }) => {
  const variants = {
    primary: 'bg-[#EE121A] text-white',
    secondary: 'bg-white text-[#EE121A] border-2 border-[#EE121A]',
    success: 'bg-emerald-500 text-white',
    light: 'bg-red-50 text-[#EE121A]',
    outline: 'bg-transparent text-[#EE121A] border-2 border-[#EE121A]'
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

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon,
  onClick,
  className = '',
  loading = false
}) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2 font-black uppercase tracking-wider
    transition-all duration-300 ease-out rounded-xl
    active:scale-95 disabled:opacity-50
    hover:shadow-lg hover:-translate-y-0.5
  `;
  
  const variants = {
    primary: 'bg-[#EE121A] text-white hover:bg-[#C40F15]',
    secondary: 'bg-white text-[#EE121A] border-2 border-[#EE121A] hover:bg-[#EE121A] hover:text-white',
    ghost: 'bg-transparent text-[#EE121A] hover:bg-red-50',
    outline: 'bg-white text-[#EE121A] border-2 border-[#EE121A] hover:bg-[#EE121A] hover:text-white',
    gray: 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-[10px]',
    md: 'px-5 py-2.5 text-[11px]',
    lg: 'px-6 py-3 text-xs'
  };

  return (
    <button 
      onClick={onClick}
      disabled={loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <>
          {Icon && <Icon size={size === 'sm' ? 14 : size === 'md' ? 18 : 22} strokeWidth={2.5} />}
          {children}
        </>
      )}
    </button>
  );
};

const ProgressBar = ({ progress, size = 'md', showLabel = true }) => {
  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  return (
    <div className="space-y-2">
      {showLabel && (
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider">
          <span className="text-gray-500">Progreso</span>
          <span className="text-[#EE121A]">{progress}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${sizes[size]}`}>
        <div 
          className="h-full bg-gradient-to-r from-[#EE121A] to-[#FF6B6B] rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(238,18,26,0.3)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const Avatar = ({ name, src, size = 'md', status }) => {
  const sizes = {
    sm: 'w-8 h-8 text-[10px]',
    md: 'w-10 h-10 text-xs',
    lg: 'w-14 h-14 text-sm'
  };

  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div className={`relative ${sizes[size]} rounded-full overflow-hidden bg-gradient-to-br from-[#EE121A] to-[#FF6B6B] flex items-center justify-center text-white font-black shadow-md`}>
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
      {status && (
        <div className={`
          absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
          ${status === 'online' ? 'bg-emerald-500' : status === 'busy' ? 'bg-amber-500' : 'bg-gray-400'}
        `} />
      )}
    </div>
  );
};

// ==========================================
// SECCIONES DEL DASHBOARD
// ==========================================
const HeroSection = ({ user, stats, onPlayVideo, onDownloadStats }) => {
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Buenos días');
    else if (hour < 18) setGreeting('Buenas tardes');
    else setGreeting('Buenas noches');
  }, []);

  return (
    <div className="relative rounded-[2.5rem] overflow-hidden min-h-[480px] flex items-center shadow-xl">
      {/* IMAGEN DE FONDO + DEGRADADO ROJO */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000" 
          alt="Learning background" 
          className="w-full h-full object-cover"
        />
        {/* DEGRADADO ROJO SOLO */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#EE121A]/90 via-[#FF6B6B]/80 to-[#EE121A]/70" />
        {/* Overlay oscuro lateral para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      </div>

      <div className="relative z-10 w-full p-8 lg:p-16 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Personal Greeting - TEXTO BLANCO PARA CONTRASTAR */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" animated className="bg-white text-[#EE121A]">
              <Sparkles size={12} /> {greeting.toUpperCase()} {user.name.split(' ')[0].toUpperCase()}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter italic uppercase drop-shadow-lg">
              TRANSFORMA<br/>
              <span className="text-white/90">
                EL FUTURO
              </span>
            </h1>
          </div>

          <p className="text-white/90 text-lg max-w-md font-medium leading-relaxed drop-shadow-md">
            Has completado <span className="text-white font-bold text-xl">{stats.hoursThisWeek} horas</span> esta semana. 
            Estás a <span className="text-white font-bold text-xl">{stats.nextMilestone} horas</span> de tu siguiente insignia.
          </p>

          {/* BOTONES MEJORADOS - MÁS LLAMATIVOS Y CON MEJOR CONTRASTE */}
          <div className="flex flex-wrap gap-4 pt-4">
            {/* Botón primario: Gradiente rojo con borde brillante */}
            <Button 
              size="lg" 
              icon={Play} 
              onClick={onPlayVideo} 
              className="bg-gradient-to-r from-[#EE121A] to-[#FF4444] text-white border-2 border-white/80 hover:from-[#FF4444] hover:to-[#EE121A] hover:border-white hover:scale-105 hover:shadow-[0_0_20px_rgba(238,18,26,0.4)] transition-all duration-300 shadow-lg font-black uppercase tracking-wider px-8"
            >
              Ver video de formación
            </Button>
            
<Button 
  size="lg" 
  icon={Download} 
  onClick={onDownloadStats}
  className="bg-white/10 text-white border-2 border-white/50 hover:bg-white hover:text-[#EE121A] hover:border-white transition-all duration-300 backdrop-blur-sm"
>
  Descargar estadísticas
</Button>
          </div>
        </div>

        {/* Right: Quick Stats Cards - INDICADORES MEJORADOS */}
        <div className="grid grid-cols-2 gap-4">
          {/* Tarjeta de Puntos */}
          <div className="bg-white rounded-3xl p-6 border-l-4 border-[#EE121A] shadow-[0_8px_30px_rgba(238,18,26,0.15)] hover:shadow-[0_12px_40px_rgba(238,18,26,0.25)] hover:scale-105 hover:border-l-[6px] transition-all group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#EE121A] to-[#FF6B6B] rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform">
                <Trophy size={24} className="drop-shadow-md" />
              </div>
              <span className="text-[10px] font-black text-[#EE121A] uppercase bg-red-50 px-2 py-1 rounded-full">Este mes</span>
            </div>
            <p className="text-4xl font-black text-[#EE121A] italic tracking-tighter drop-shadow-sm">{stats.puntos.toLocaleString()}</p>
            <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mt-1">Puntos DEI</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#EE121A] font-bold bg-red-50 px-2 py-1 rounded-full w-fit">
              <TrendingUp size={14} className="animate-pulse" />
              +12% vs mes anterior
            </div>
          </div>

          {/* Tarjeta de Horas */}
          <div className="bg-white rounded-3xl p-6 border-l-4 border-[#FF6B6B] shadow-[0_8px_30px_rgba(238,18,26,0.15)] hover:shadow-[0_12px_40px_rgba(238,18,26,0.25)] hover:scale-105 hover:border-l-[6px] transition-all group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B6B] to-[#EE121A] rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform">
                <Clock size={24} className="drop-shadow-md" />
              </div>
              <span className="text-[10px] font-black text-[#EE121A] uppercase bg-red-50 px-2 py-1 rounded-full">Total</span>
            </div>
            <p className="text-4xl font-black text-[#EE121A] italic tracking-tighter drop-shadow-sm">{stats.hoursTotal}h</p>
            <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mt-1">Horas formación</p>
            {/* Progress bar mejorado */}
            <div className="mt-4 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#EE121A] to-[#FF6B6B] rounded-full transition-all duration-500"
                style={{ width: `${(stats.hoursTotal / 200) * 100}%` }}
              />
            </div>
          </div>

          {/* Tarjeta de Racha - Destacada con borde completo */}
          <div className="bg-gradient-to-r from-white to-red-50 rounded-3xl p-6 border-2 border-[#EE121A]/20 shadow-[0_8px_30px_rgba(238,18,26,0.15)] hover:shadow-[0_12px_40px_rgba(238,18,26,0.3)] hover:border-[#EE121A]/40 hover:scale-[1.02] transition-all group cursor-pointer col-span-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#EE121A] to-[#FF4444] rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <Flame size={28} className="drop-shadow-md animate-pulse" />
                </div>
                <div>
                  <p className="text-2xl font-black text-[#EE121A] italic drop-shadow-sm">Racha de {stats.streak} días</p>
                  <p className="text-xs font-bold text-[#EE121A]/70 uppercase tracking-wider">¡Sigue aprendiendo!</p>
                </div>
              </div>
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className={`
                    w-10 h-10 rounded-full border-3 border-white flex items-center justify-center text-xs font-bold shadow-md transition-all duration-300
                    ${i <= stats.streak 
                      ? 'bg-gradient-to-br from-[#EE121A] to-[#FF4444] text-white scale-110 shadow-[0_4px_15px_rgba(238,18,26,0.4)]' 
                      : 'bg-gray-200 text-gray-400 border-gray-100'
                    }
                    ${i === stats.streak ? 'animate-pulse ring-2 ring-[#EE121A] ring-offset-2' : ''}
                  `}>
                    {i <= 3 ? <CheckCircle2 size={16} /> : i}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const DailyMotivation = ({ quote, author }) => {
  return (
    <div className="relative bg-gradient-to-r from-[#EE121A] to-[#FF6B6B] rounded-[2.5rem] p-8 md:p-12 shadow-xl overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-white shrink-0">
          <Lightbulb size={40} />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <Badge variant="secondary" size="sm" className="mb-4 bg-white/20 text-white border-white/30">
            <Star size={10} /> FRASE DEL DÍA
          </Badge>
          <blockquote className="text-2xl md:text-3xl font-black text-white italic leading-tight mb-4">
            "{quote}"
          </blockquote>
          <cite className="text-white/80 text-sm font-bold not-italic">— {author}</cite>
        </div>

        <div className="flex gap-2 shrink-0">
          <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <Share2 size={18} />
          </button>
          <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <Bookmark size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const PersonalStats = ({ stats }) => {
  const [hoveredStat, setHoveredStat] = useState(null);

  const personalMetrics = [
    { 
      id: 'courses',
      label: 'Cursos Completados', 
      value: stats.coursesCompleted, 
      total: stats.totalCourses,
      icon: BookOpen,
      color: 'from-[#EE121A] to-[#FF6B6B]'
    },
    { 
      id: 'medals',
      label: 'Medallas Obtenidas', 
      value: stats.medals, 
      total: stats.totalMedals,
      icon: Award,
      color: 'from-amber-400 to-orange-500'
    },
    { 
      id: 'impact',
      label: 'Impacto DEI', 
      value: stats.impactScore, 
      total: 100,
      icon: Heart,
      color: 'from-emerald-400 to-emerald-600'
    },
    { 
      id: 'streak',
      label: 'Días Consecutivos', 
      value: stats.streak, 
      total: 30,
      icon: Zap,
      color: 'from-blue-400 to-blue-600'
    }
  ];

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="light" size="md">
            <Target size={12} /> MI RENDIMIENTO
          </Badge>
          <h2 className="text-3xl font-black tracking-tighter uppercase italic text-gray-800 mt-2">
            Tus <span className="text-[#EE121A]">Estadísticas</span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {personalMetrics.map((metric) => {
          const percentage = (metric.value / metric.total) * 100;
          const isHovered = hoveredStat === metric.id;
          
          return (
            <div 
              key={metric.id}
              className={`
                group relative bg-white rounded-[2rem] p-6 border-2 transition-all duration-300 cursor-pointer
                ${isHovered ? 'border-[#EE121A] shadow-xl shadow-red-100' : 'border-gray-100 hover:border-[#EE121A]/30 hover:shadow-lg'}
              `}
              onMouseEnter={() => setHoveredStat(metric.id)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${metric.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  <metric.icon size={24} />
                </div>
                <span className="text-3xl font-black text-gray-800 italic">{metric.value}</span>
              </div>
              
              <h4 className="text-sm font-black text-gray-600 uppercase tracking-wider mb-3">{metric.label}</h4>
              
              <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${metric.color} transition-all duration-1000`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              
              <p className="text-[10px] font-bold text-gray-400 uppercase mt-2">
                {Math.round(percentage)}% del objetivo mensual
              </p>

              {isHovered && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#EE121A] rotate-45" />
              )}
            </div>
          );
        })}
      </div>

      {/* Radial Progress Summary */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-48 h-48 shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="8" />
              <circle 
                cx="50" cy="50" r="45" fill="none" 
                stroke="#EE121A" strokeWidth="8" 
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - stats.overallProgress / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-[#EE121A] italic">{stats.overallProgress}%</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Progreso Total</span>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <h3 className="text-xl font-black text-gray-800 uppercase italic">Tu Camino DEI</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Estás en el <span className="font-bold text-[#EE121A]">nivel {stats.level}</span> de tu desarrollo en diversidad, equidad e inclusión. 
              Completa {stats.nextLevelPoints} puntos más para alcanzar el siguiente nivel.
            </p>
            
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-3 bg-red-50 rounded-2xl">
                <p className="text-2xl font-black text-[#EE121A]">{stats.weeklyRank}</p>
                <p className="text-[9px] font-bold text-gray-500 uppercase">Ranking Semanal</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-2xl">
                <p className="text-2xl font-black text-[#EE121A]">{stats.monthlyRank}</p>
                <p className="text-[9px] font-bold text-gray-500 uppercase">Ranking Mensual</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-2xl">
                <p className="text-2xl font-black text-[#EE121A]">{stats.globalRank}</p>
                <p className="text-[9px] font-bold text-gray-500 uppercase">Ranking Global</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ActiveCourses = ({ courses, onCourseClick, onDownloadCertificate }) => {
  const [hoveredCourse, setHoveredCourse] = useState(null);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="light" size="md">
            <BookOpen size={12} /> MI APRENDIZAJE
          </Badge>
          <h2 className="text-3xl font-black tracking-tighter uppercase italic text-gray-800 mt-2">
            Continúa donde lo dejaste
          </h2>
        </div>
        <Button variant="ghost" icon={ChevronRight}>
          Ver todo mi progreso
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div 
            key={course.id}
            className={`
              group relative bg-white rounded-[2rem] overflow-hidden border-2 transition-all duration-500
              ${course.progress === 100 
                ? 'border-emerald-200 bg-emerald-50/30' 
                : 'border-gray-100 hover:border-[#EE121A]/30 hover:shadow-xl'}
            `}
            onMouseEnter={() => setHoveredCourse(course.id)}
            onMouseLeave={() => setHoveredCourse(null)}
          >
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Status Badge */}
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant={course.progress === 100 ? 'success' : 'primary'}>
                  {course.progress === 100 ? 'COMPLETADO' : course.category}
                </Badge>
                {course.isNew && <Badge variant="secondary">NUEVO</Badge>}
              </div>

              {/* Completed Overlay */}
              {course.progress === 100 && (
                <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-emerald-500 shadow-2xl">
                    <CheckCircle2 size={40} strokeWidth={3} />
                  </div>
                </div>
              )}

              {/* Play Button for incomplete */}
              {course.progress < 100 && (
                <div className={`
                  absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300
                  ${hoveredCourse === course.id ? 'opacity-100' : 'opacity-0'}
                `}>
                  <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#EE121A] shadow-2xl hover:scale-110 transition-transform">
                    <Play size={28} fill="currentColor" />
                  </button>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-black text-gray-800 leading-tight group-hover:text-[#EE121A] transition-colors uppercase italic">
                  {course.title}
                </h3>
              </div>

              {/* Progress or Certificate */}
              {course.progress < 100 ? (
                <>
                  <ProgressBar progress={course.progress} size="md" />
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-gray-400">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 size={12} className={course.progress > 50 ? 'text-emerald-500' : 'text-gray-300'} />
                      {course.completedModules}/{course.totalModules} módulos
                    </span>
                    <span>Última vez: {course.lastAccess}</span>
                  </div>
                  <button 
                    onClick={() => onCourseClick(course)}
                    className="w-full py-3 bg-[#EE121A] text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-[#C40F15] transition-all flex items-center justify-center gap-2"
                  >
                    Continuar módulo {course.currentModule}
                    <ChevronRight size={16} />
                  </button>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold">
                    <CheckCircle2 size={16} />
                    <span>Curso finalizado el {course.completedDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Award size={14} />
                    <span>Certificado disponible</span>
                  </div>
                  <button 
                    onClick={() => onDownloadCertificate(course)}
                    className="w-full py-3 bg-emerald-500 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    Descargar certificado
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Add New Course Card */}
        <div className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-[2rem] border-2 border-dashed border-gray-300 hover:border-[#EE121A] hover:bg-white transition-all p-6 flex flex-col items-center justify-center gap-4 cursor-pointer min-h-[380px]">
          <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center text-[#EE121A] group-hover:scale-110 transition-transform">
            <Target size={32} />
          </div>
          <div className="text-center">
            <p className="text-lg font-black text-gray-800 uppercase italic">Explorar más cursos</p>
            <p className="text-xs text-gray-500 font-medium mt-1">+24 disponibles en tu plan</p>
          </div>
          <Button variant="outline" size="sm">Ver catálogo</Button>
        </div>
      </div>
    </section>
  );
};

const PersonalCalendar = ({ events, onAddToCalendar }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-6 h-[600px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#EE121A]/10 rounded-2xl flex items-center justify-center text-[#EE121A]">
            <Calendar size={24} />
          </div>
          <div>
            <h3 className="text-lg font-black italic tracking-tighter uppercase text-gray-800">Mi Calendario</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Próximos eventos DEI</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" icon={ChevronRight}>Ver todo</Button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {events.map((event) => (
          <div 
            key={event.id}
            onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
            className={`
              group p-4 rounded-2xl border-2 transition-all cursor-pointer
              ${selectedEvent === event.id 
                ? 'border-[#EE121A] bg-red-50 shadow-md' 
                : 'border-gray-100 hover:border-[#EE121A]/30 hover:shadow-sm'}
            `}
          >
            <div className="flex items-start gap-4">
              <div className={`
                w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black shrink-0
                ${event.isMandatory ? 'bg-[#EE121A] text-white' : 'bg-gray-100 text-gray-600'}
              `}>
                <span className="text-[10px] uppercase">{event.month}</span>
                <span className="text-xl italic">{event.day}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-black text-gray-800 uppercase italic leading-tight line-clamp-2">
                    {event.title}
                  </h4>
                  {event.isMandatory && (
                    <Badge variant="primary" size="sm">Obligatorio</Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-3 mt-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {event.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} /> {event.attendees} inscritos
                  </span>
                </div>

                {selectedEvent === event.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 animate-in slide-in-from-top-2">
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                    <div className="flex gap-2">
                      <Button size="sm" icon={Calendar} onClick={(e) => {
                        e.stopPropagation();
                        onAddToCalendar(event);
                      }}>
                        Agendar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="w-full py-3 bg-[#EE121A] text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-[#C40F15] transition-all flex items-center justify-center gap-2">
          Ver calendario completo
        </button>
      </div>
    </div>
  );
};

const QuickChat = ({ messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    onSendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden flex flex-col h-[600px]">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-[#EE121A] to-[#FF6B6B] rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Users size={28} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-3 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-black italic tracking-tighter uppercase text-gray-800">
              Mi Equipo DEI
            </h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              {messages.length} mensajes • 5 en línea
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30">
        <div className="flex items-center justify-center">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider bg-white px-4 py-1 rounded-full shadow-sm">
            Hoy
          </span>
        </div>

        {messages.map((msg, idx) => (
          <div 
            key={msg.id} 
            className={`flex gap-3 ${msg.isMe ? 'flex-row-reverse' : ''} animate-in slide-in-from-bottom-2 duration-300`}
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <Avatar name={msg.user} size="sm" status={msg.isMe ? 'online' : 'away'} />
            
            <div className={`max-w-[75%] space-y-1`}>
              <div className={`
                p-4 rounded-2xl shadow-sm text-sm font-medium leading-relaxed
                ${msg.isMe 
                  ? 'bg-[#EE121A] text-white rounded-tr-sm' 
                  : 'bg-white text-gray-700 rounded-tl-sm border border-gray-100'}
              `}>
                {!msg.isMe && (
                  <p className="text-[10px] font-black uppercase opacity-60 mb-1">{msg.user}</p>
                )}
                {msg.text}
              </div>
              <p className={`text-[9px] font-bold text-gray-400 uppercase ${msg.isMe ? 'text-right' : ''}`}>
                {msg.time} {msg.isMe && <CheckCircle2 size={10} className="inline ml-1 text-emerald-500" />}
              </p>
            </div>
          </div>
        ))}
        
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:border-[#EE121A] focus-within:ring-4 focus-within:ring-[#EE121A]/10 transition-all">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje a tu equipo..."
            className="flex-1 bg-transparent outline-none text-sm font-bold text-gray-700 placeholder:text-gray-400"
          />
          <button 
            type="submit"
            disabled={!newMessage.trim()}
            className={`
              p-3 rounded-xl transition-all duration-300
              ${newMessage.trim() 
                ? 'bg-[#EE121A] text-white shadow-lg hover:shadow-xl hover:scale-105' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
            `}
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

const BadgesSection = () => {
  const badges = [
    { icon: Trophy, label: "Campeón DEI", desc: "Top 10 del mes", color: "from-amber-300 to-amber-500", earned: true },
    { icon: Heart, label: "Aliado", desc: "5 cursos de empatía", color: "from-rose-300 to-rose-500", earned: true },
    { icon: Target, label: "Velocista", desc: "3 cursos en 1 semana", color: "from-[#EE121A] to-[#FF6B6B]", earned: true },
    { icon: Users, label: "Mentor", desc: "Ayuda a 3 compañeros", color: "from-blue-300 to-blue-500", earned: false }
  ];

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="light" size="md">
            <Award size={12} /> GAMIFICACIÓN
          </Badge>
          <h2 className="text-3xl font-black tracking-tighter uppercase italic text-gray-800 mt-2">
            Mis Insignias Recientes
          </h2>
        </div>
        <Button variant="ghost">Ver todas las recompensas</Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((badge, idx) => (
          <div key={idx} className={`
            group relative p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer
            ${badge.earned 
              ? 'bg-white border-gray-100 hover:border-[#EE121A] hover:shadow-xl' 
              : 'bg-gray-50 border-gray-200 opacity-60 grayscale'}
          `}>
            <div className={`
              w-16 h-16 rounded-2xl bg-gradient-to-br ${badge.color} 
              flex items-center justify-center text-white shadow-lg mb-4
              group-hover:scale-110 transition-transform
            `}>
              <badge.icon size={32} />
            </div>
            <h4 className="text-lg font-black text-gray-800 uppercase italic">{badge.label}</h4>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">{badge.desc}</p>
            {badge.earned && (
              <div className="absolute top-4 right-4">
                <CheckCircle2 size={20} className="text-emerald-500" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// ==========================================
// NOTICIAS Y CONTENIDO GENERAL (NUEVO)
// ==========================================

const NewsSection = ({ news }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Todas' },
    { id: 'corporate', label: 'Corporativas' },
    { id: 'dei', label: 'DEI' },
    { id: 'learning', label: 'Aprendizaje' }
  ];

  const filteredNews = activeCategory === 'all' 
    ? news 
    : news.filter(item => item.category === activeCategory);

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Badge variant="light" size="md">
            <Newspaper size={12} /> ACTUALIDAD
          </Badge>
          <h2 className="text-3xl font-black tracking-tighter uppercase italic text-gray-800 mt-2">
            Noticias y <span className="text-[#EE121A]">Novedades</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">Mantente al día con lo que sucede en la organización</p>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider whitespace-nowrap transition-all
                ${activeCategory === cat.id 
                  ? 'bg-[#EE121A] text-white shadow-md' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#EE121A] hover:text-[#EE121A]'}
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((item) => (
          <article 
            key={item.id}
            className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:border-[#EE121A]/30 hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              <div className="absolute top-4 left-4">
                <Badge variant={item.category === 'dei' ? 'primary' : item.category === 'corporate' ? 'secondary' : 'light'} size="sm">
                  {item.category === 'dei' ? 'DEI' : item.category === 'corporate' ? 'CORPORATIVO' : 'APRENDIZAJE'}
                </Badge>
              </div>
              
              <div className="absolute bottom-4 right-4 flex items-center gap-1 text-white/80 text-xs font-bold">
                <Clock size={12} />
                {item.readTime}
              </div>
            </div>

            <div className="p-6 space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <span>{item.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <TrendIcon size={10} />
                  {item.trending ? 'Tendencia' : 'Nuevo'}
                </span>
              </div>

              <h3 className="text-lg font-black text-gray-800 leading-tight group-hover:text-[#EE121A] transition-colors uppercase italic">
                {item.title}
              </h3>
              
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {item.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Avatar name={item.author} size="sm" />
                  <span className="text-xs font-bold text-gray-600">{item.author}</span>
                </div>
                <button className="text-[#EE121A] text-xs font-black uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                  Leer más <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="text-center pt-4">
        <Button variant="outline" icon={ChevronRight}>
          Ver todas las noticias
        </Button>
      </div>
    </section>
  );
};

// ==========================================
// VIDEO MODAL (CORREGIDO)
// ==========================================

const VideoModal = ({ isOpen, onClose, videoUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[50] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] w-full max-w-5xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 relative">
        {/* BOTÓN X PARA CERRAR - CORREGIDO */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-800 hover:bg-[#EE121A] hover:text-white transition-all shadow-lg border border-gray-200"
        >
          <X size={24} strokeWidth={3} />
        </button>

        <div className="flex items-center justify-between p-6 border-b border-gray-100 pr-20">
          <h3 className="text-xl font-black italic tracking-tighter uppercase text-gray-800">
            Video de Formación DEI
          </h3>
        </div>
        
        <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
          <iframe
            width="50%"
            height="50%"
            src={videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
            title="Video de Formación"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0"
          />
        </div>

        <div className="p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-black text-gray-800 uppercase tracking-wider text-sm">
                Bienvenida a la Cultura DEI
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                Duración: 5:30 min • Obligatorio para todos los colaboradores
              </p>
            </div>
            <Button variant="outline" icon={Download}>
              Descargar material
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// DATOS MOCK AMPLIADOS
// ==========================================

const MOCK_USER = {
  name: "Shantall López",
  role: "Administradora",
  department: "Administración",
  level: "Gold",
  joinDate: "2023-03-15"
};

const MOCK_STATS = {
  puntos: 10450,
  hoursTotal: 124,
  hoursThisWeek: 8.5,
  nextMilestone: 12,
  streak: 5,
  ranking: 12,
  // Nuevos datos para PersonalStats
  coursesCompleted: 8,
  totalCourses: 12,
  medals: 3,
  totalMedals: 5,
  impactScore: 78,
  overallProgress: 68,
  level: "Avanzado",
  nextLevelPoints: 2200,
  weeklyRank: 12,
  monthlyRank: 8,
  globalRank: 45
};

const MOCK_COURSES = [
  {
    id: 1,
    title: "Liderazgo Inclusivo en la Era Digital",
    category: "Estrategia",
    progress: 65,
    completedModules: 4,
    totalModules: 6,
    currentModule: 5,
    timeLeft: 45,
    lastAccess: "Hace 2 horas",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800",
    isNew: false,
    completedDate: null
  },
  {
    id: 2,
    title: "Comunicación No Sexista Corporativa",
    category: "Cultura",
    progress: 30,
    completedModules: 2,
    totalModules: 8,
    currentModule: 3,
    timeLeft: 120,
    lastAccess: "Ayer",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800",
    isNew: true,
    completedDate: null
  },
  {
    id: 3,
    title: "Fundamentos de Accesibilidad Web",
    category: "Técnico",
    progress: 100,
    completedModules: 10,
    totalModules: 10,
    currentModule: 10,
    timeLeft: 0,
    lastAccess: "Hace 3 días",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=800",
    isNew: false,
    completedDate: "18 Dic 2026"
  }
];

const MOCK_CHAT_MESSAGES = [
  { id: 1, text: "¿Alguien ya tomó el curso nuevo de Neurodiversidad? Está excelente 🧠", user: "Carlos R.", isMe: false, time: "09:30" },
  { id: 2, text: "¡Sí! Lo terminé ayer. Muy recomendado para el equipo de UX.", user: "Ana M.", isMe: false, time: "09:32" },
  { id: 3, text: "Perfecto, lo agendo para esta semana entonces. Gracias por el tip 💡", user: "Tú", isMe: true, time: "09:35" },
  { id: 4, text: "Recordatorio: Taller de Sensibilización mañana a las 16:00 hrs. ¡No falten!", user: "Sistema", isMe: false, time: "10:00" },
];

const MOCK_EVENTS = [
  {
    id: 1,
    title: "Taller de Sensibilización Inclusiva",
    month: "Dic",
    day: "20",
    time: "16:00 - 18:00",
    isMandatory: true,
    attendees: 45,
    description: "Sesión obligatoria para todos los líderes de equipo. Abordaremos casos prácticos de inclusión en el día a día."
  },
  {
    id: 2,
    title: "Webinar: Diversidad Generacional",
    month: "Dic",
    day: "22",
    time: "11:00 - 12:00",
    isMandatory: false,
    attendees: 128,
    description: "Cómo gestionar equipos multigeneracionales efectivamente."
  },
  {
    id: 3,
    title: "Cierre de Año DEI 2026",
    month: "Dic",
    day: "28",
    time: "15:00 - 17:00",
    isMandatory: false,
    attendees: 89,
    description: "Celebración de logros y anuncio de metas 2027."
  }
];

const MOCK_NEWS = [
  {
    id: 1,
    title: "Claro es reconocida como Top Employer 2026 en inclusión laboral",
    excerpt: "La organización ha sido destacada por sus políticas de diversidad y equidad, posicionándose entre las mejores empresas para trabajar en Latinoamérica.",
    category: "corporate",
    date: "18 Dic 2026",
    readTime: "3 min",
    author: "Comunicaciones",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800",
    trending: true
  },
  {
    id: 2,
    title: "Nuevo programa de mentoría entre generaciones",
    excerpt: "Lanzamos el programa 'Puentes' que conecta colaboradores senior con talento junior para intercambio de conocimientos y perspectivas diversas.",
    category: "dei",
    date: "15 Dic 2026",
    readTime: "4 min",
    author: "RRHH",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
    trending: true
  },
  {
    id: 3,
    title: "Guía práctica: Lenguaje inclusivo en comunicaciones",
    excerpt: "Descarga la nueva guía con ejemplos y alternativas para comunicaciones corporativas más inclusivas y respetuosas.",
    category: "learning",
    date: "12 Dic 2026",
    readTime: "5 min",
    author: "Equipo DEI",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800",
    trending: false
  },
  {
    id: 4,
    title: "Resultados de la encuesta anual de clima laboral",
    excerpt: "Conoce los resultados destacados de nuestra encuesta 2026 y las acciones que implementaremos el próximo año.",
    category: "corporate",
    date: "10 Dic 2026",
    readTime: "6 min",
    author: "Bienestar",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800",
    trending: false
  },
  {
    id: 5,
    title: "Curso nuevo: Neurodiversidad en el workplace",
    excerpt: "Aprende sobre TDAH, autismo y dislexia en el entorno laboral. Estrategias prácticas para equipos inclusivos.",
    category: "learning",
    date: "8 Dic 2026",
    readTime: "2 min",
    author: "Capacitación",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800",
    trending: true
  },
  {
    id: 6,
    title: "Mes de la Diversidad Cultural: Actividades programadas",
    excerpt: "Calendario completo de actividades, talleres y eventos para celebrar y reconocer la diversidad cultural de nuestro equipo.",
    category: "dei",
    date: "5 Dic 2026",
    readTime: "4 min",
    author: "Cultura",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800",
    trending: false
  }
];

const DAILY_QUOTE = {
  text: "La diversidad no es sobre cómo nos diferenciamos. La diversidad es sobre abrazar las singularidades de cada uno.",
  author: "Cesar Chavez"
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function InclusionDashboard() {
  const [chatMessages, setChatMessages] = useState(MOCK_CHAT_MESSAGES);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const handleSendMessage = (text) => {
    const newMsg = {
      id: Date.now(),
      text,
      user: "Tú",
      isMe: true,
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages([...chatMessages, newMsg]);
  };

  const handleAddToCalendar = (event) => {
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=20261220T160000Z/20261220T180000Z`;
    window.open(url, '_blank');
  };

  const handleCourseClick = (course) => {
    console.log('Abriendo curso:', course);
  };

  const handleDownloadCertificate = (course) => {
    const canvaLink = "https://www.canva.com/templates/certificados/";
    window.open(canvaLink, '_blank');
  };

  const handlePlayVideo = () => {
    setVideoUrl("https://www.youtube.com/embed/dQw4w9WgXcQ");
    setShowVideoModal(true);
  };

  const handleDownloadStats = () => {
    // Crear contenido del reporte
    const reportContent = `
REPORTE DE ESTADÍSTICAS DEI - ${MOCK_USER.name}
========================================
Fecha: ${new Date().toLocaleDateString('es-ES')}

RESUMEN PERSONAL
----------------
• Nivel: ${MOCK_STATS.level}
• Puntos totales: ${MOCK_STATS.puntos.toLocaleString()}
• Horas de formación: ${MOCK_STATS.hoursTotal}h
• Racha actual: ${MOCK_STATS.streak} días
• Progreso general: ${MOCK_STATS.overallProgress}%

RENDIMIENTO
-----------
• Cursos completados: ${MOCK_STATS.coursesCompleted}/${MOCK_STATS.totalCourses}
• Medallas obtenidas: ${MOCK_STATS.medals}/${MOCK_STATS.totalMedals}
• Impacto DEI: ${MOCK_STATS.impactScore}%
• Ranking semanal: #${MOCK_STATS.weeklyRank}
• Ranking mensual: #${MOCK_STATS.monthlyRank}

CURSOS EN PROGRESO
------------------
${MOCK_COURSES.filter(c => c.progress < 100).map(c => `• ${c.title}: ${c.progress}%`).join('\n')}

CURSOS COMPLETADOS
------------------
${MOCK_COURSES.filter(c => c.progress === 100).map(c => `• ${c.title}: ${c.completedDate}`).join('\n')}

Generado por Claro Inclusión Hub © 2026
    `;

    // Crear blob y descargar
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Estadisticas_DEI_${MOCK_USER.name.replace(' ', '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleCloseVideo = () => {
    setShowVideoModal(false);
    setVideoUrl('');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-20 space-y-16">
        
        {/* 1. HERO PERSONALIZADO - DEGRADADO SUAVE */}
        <HeroSection 
          user={MOCK_USER} 
          stats={MOCK_STATS}
          onPlayVideo={handlePlayVideo}
          onDownloadStats={handleDownloadStats}
        />

        {/* 2. FRASE DEL DÍA + ESTADÍSTICAS PERSONALES */}
        <DailyMotivation quote={DAILY_QUOTE.text} author={DAILY_QUOTE.author} />
        
        <PersonalStats stats={MOCK_STATS} />

        {/* 3. MIS CURSOS ACTIVOS */}
        <ActiveCourses 
          courses={MOCK_COURSES}
          onCourseClick={handleCourseClick}
          onDownloadCertificate={handleDownloadCertificate}
        />

        {/* 4. GRID: CHAT + CALENDARIO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <QuickChat 
            messages={chatMessages}
            onSendMessage={handleSendMessage}
          />
          <PersonalCalendar 
            events={MOCK_EVENTS}
            onAddToCalendar={handleAddToCalendar}
          />
        </div>

        {/* 5. MIS INSIGNIAS */}
        <BadgesSection />

        {/* 6. NOTICIAS Y CONTENIDO GENERAL (NUEVO) */}
        <NewsSection news={MOCK_NEWS} />

      </main>

      {/* VIDEO MODAL - CORREGIDO CON X FUNCIONAL */}
      <VideoModal 
        isOpen={showVideoModal}
        onClose={handleCloseVideo}
        videoUrl={videoUrl}
      />

      {/* DEI ASSISTANT */}
      <DEIAssistant currentView="personal" />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#EE121A] rounded-lg flex items-center justify-center text-white">
              <Globe size={18} strokeWidth={3} />
            </div>
            <span className="text-lg font-black italic tracking-tighter text-[#EE121A] uppercase">Claro</span>
          </div>
          <p className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">
            Claro Inclusión Hub © 2026 • Todos los derechos reservados
          </p>
          <div className="flex gap-4">
            <button className="text-gray-400 hover:text-[#EE121A] transition-colors">
              <Globe size={20} />
            </button>
          </div>
        </div>
      </footer>

      {/* ESTILOS CUSTOM */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
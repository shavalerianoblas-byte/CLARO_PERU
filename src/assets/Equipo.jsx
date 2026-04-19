import React, { useState, useEffect, useRef } from 'react';
import DEIAssistant from '../componentes/DEIAssistant';
import { 
  Users, Trophy, Target, TrendingUp, MessageSquare, 
  Award, Zap, Heart, Share2, Crown, Star,
  ChevronRight, MoreHorizontal, Send, Bell,
  Flame, Calendar, Clock, CheckCircle2, X,
  Plus, Filter, Search, LayoutGrid, List,
  Play, Pause, RotateCcw, Sparkles, Flag,
  BarChart3, PieChart, Activity, Globe,
  HandHeart, Lightbulb, Megaphone, Gift,
  Camera, Mic, Paperclip, Smile,
  ChevronDown, ChevronUp, Lock, Unlock,
  Eye, EyeOff, Settings, Download
} from 'lucide-react';

// ==========================================
// SISTEMA DE DISEÑO - COLORES CORPORATIVOS (ACTUALIZADO)
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
    success: '#ff003c',
    warning: '#790101'
  }
};

// ==========================================
// COMPONENTES ATÓMICOS PREMIUM (ACTUALIZADOS)
// ==========================================

const Badge = ({ children, variant = 'primary', size = 'md', animated = false }) => {
  const variants = {
    primary: 'bg-[#EE121A] text-white',
    secondary: 'bg-white text-[#EE121A] border-2 border-[#EE121A]',
    success: 'bg-emerald-500 text-white',
    warning: 'bg-amber-500 text-white',
    info: 'bg-red-500 text-white',
    purple: 'bg-red-500 text-white',
    dark: 'bg-gray-900 text-white',
    outline: 'bg-white text-[#EE121A] border-2 border-[#EE121A]',
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
    success: 'bg-emerald-500 text-white hover:bg-emerald-600',
    outline: 'bg-white text-[#EE121A] border-2 border-[#EE121A] hover:bg-[#EE121A] hover:text-white',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-[#EE121A]',
    dark: 'bg-gray-900 text-white hover:bg-gray-800',
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

// ==========================================
// SECCIONES ESPECIALIZADAS DE EQUIPO DEI (ACTUALIZADAS)
// ==========================================

const TeamImpactHeader = ({ teamStats }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(teamStats.collectiveImpact), 500);
    return () => clearTimeout(timer);
  }, [teamStats.collectiveImpact]);

  return (
    <div className="relative rounded-[2.5rem] overflow-hidden min-h-[450px] flex items-center shadow-xl">
      {/* IMAGEN DE FONDO */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000" 
          alt="Team background" 
          className="w-full h-full object-cover"
        />
        {/* DEGRADADO ROJO SOLO */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#EE121A]/90 via-[#FF6B6B]/80 to-[#EE121A]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </div>

      <div className="relative z-10 w-full p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          
          {/* Left: Team Identity */}
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" animated>
                <Crown size={12} /> EQUIPO DEI 2026
              </Badge>
              <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Temporada Activa</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-black text-white leading-[0.9] tracking-tighter italic uppercase drop-shadow-lg">
              Innovación<br/>
              <span className="text-white/90">Sin Límites</span>
            </h1>
            
            <p className="text-white/90 text-lg font-medium leading-relaxed drop-shadow-md">
              Tu equipo ha generado <span className="text-white font-bold text-2xl">{animatedValue.toLocaleString()}</span> <span className="text-white font-bold">puntos de impacto DEI</span> este mes. 
              Están en el <span className="text-white font-bold">top 5% de equipos inclusivos</span> de la organización.
            </p>

            {/* BOTONES CORREGIDOS - ROJO SÓLIDO CON HOVER BLANCO */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button 
                size="md" 
                icon={Target} 
                className="bg-[#EE121A] text-white border-2 border-[#EE121A] hover:bg-white hover:text-[#EE121A] hover:border-white transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Misión del Mes
              </Button>
              <Button 
                size="md" 
                icon={Share2} 
                className="bg-white/10 text-white border-2 border-white/50 hover:bg-white hover:text-[#EE121A] hover:border-white transition-all duration-300 backdrop-blur-sm"
              >
                Invitar Colaboradores
              </Button>
            </div>
          </div>

          {/* Right: Live Team Pulse - TARJETA BLANCA */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-white w-full lg:w-auto min-w-[320px] shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-800 font-black uppercase tracking-wider text-sm">Pulso del Equipo</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-emerald-500 text-[10px] font-black uppercase">En Vivo</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs font-bold uppercase">Miembros Activos</span>
                <span className="text-[#EE121A] font-black text-lg">{teamStats.activeMembers}/{teamStats.totalMembers}</span>
              </div>
              <ProgressBar progress={(teamStats.activeMembers/teamStats.totalMembers)*100} size="sm" color="success" showLabel={false} />
              
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs font-bold uppercase">Meta Grupal</span>
                <span className="text-[#EE121A] font-black text-lg">{teamStats.weeklyProgress}%</span>
              </div>
              <ProgressBar progress={teamStats.weeklyProgress} size="sm" color="primary" showLabel={false} />
              
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-gray-500 text-xs font-bold uppercase">Racha de Equipo</span>
                <div className="flex items-center gap-1 text-[#EE121A]">
                  <Flame size={16} />
                  <span className="font-black">{teamStats.teamStreak} días</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TARJETAS INFERIORES CORREGIDAS - FONDO BLANCO MÁS OPACO Y ELEVADAS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { label: 'Cursos Grupales', value: teamStats.groupCourses, icon: Target },
            { label: 'Acciones DEI', value: teamStats.deiActions, icon: HandHeart },
            { label: 'Reconocimientos', value: teamStats.recognitions, icon: Award },
            { label: 'Nuevos Aliados', value: teamStats.newAllies, icon: Users }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-100 hover:bg-white hover:scale-105 transition-all cursor-pointer group shadow-xl hover:shadow-2xl">
              <div className="text-[#EE121A] mb-3 group-hover:scale-110 transition-transform">
                <stat.icon size={28} strokeWidth={2} />
              </div>
              <p className="text-3xl font-black text-[#EE121A] italic mb-1">{stat.value}</p>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const TeamMissions = ({ missions, onJoinMission, userJoinedMissions }) => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="warning" size="sm" animated>
            <Zap size={10} /> DINÁMICAS ACTIVAS
          </Badge>
          <h2 className="text-3xl font-black tracking-tighter uppercase italic text-gray-800 mt-2">
            Misiones de Equipo
          </h2>
          <p className="text-gray-500 text-sm mt-1">Completa objetivos grupales y desbloquea recompensas exclusivas</p>
        </div>
        <Button variant="ghost" size="sm" icon={ChevronRight}>Ver historial</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {missions.map((mission) => {
          const isJoined = userJoinedMissions.includes(mission.id);
          const progressPercent = (mission.current / mission.target) * 100;
          
          return (
            <div key={mission.id} className={`
              group relative bg-white rounded-[2rem] overflow-hidden border-2 transition-all duration-300
              ${isJoined ? 'border-[#EE121A] shadow-xl shadow-red-100' : 'border-gray-100 hover:border-[#EE121A]/30 hover:shadow-xl'}
            `}>
              {/* Mission Header Image */}
              <div className="relative h-40 overflow-hidden">
                <img src={mission.image} alt={mission.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <Badge variant={mission.difficulty === 'Alta' ? 'primary' : mission.difficulty === 'Media' ? 'warning' : 'success'} size="sm">
                    Dificultad: {mission.difficulty}
                  </Badge>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-black text-white uppercase italic leading-tight">{mission.title}</h3>
                  <p className="text-white/80 text-xs font-medium mt-1">{mission.description}</p>
                </div>

                {mission.isUrgent && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-[#EE121A] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase animate-pulse">
                      ¡URGENTE!
                    </div>
                  </div>
                )}
              </div>

              {/* Mission Progress */}
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-gray-600">{mission.current} de {mission.target} {mission.unit}</span>
                  <span className="font-black text-[#EE121A]">{Math.round(progressPercent)}%</span>
                </div>
                <ProgressBar progress={progressPercent} size="md" showLabel={false} />
                
                {/* Contributors Avatars */}
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {mission.topContributors.map((contributor, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-[10px] font-bold" title={contributor}>
                        {contributor[0]}
                      </div>
                    ))}
                    {mission.contributorCount > 3 && (
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-gray-600 text-[10px] font-black">
                        +{mission.contributorCount - 3}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{mission.contributorCount} participando</span>
                </div>

                {/* Reward Preview */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-3 border border-amber-100 flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center text-white shadow-md">
                    <Trophy size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-amber-600 uppercase tracking-wider">Recompensa</p>
                    <p className="text-sm font-bold text-gray-800">{mission.reward}</p>
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  variant={isJoined ? 'outline' : 'primary'} 
                  size="md" 
                  className="w-full"
                  onClick={() => onJoinMission(mission.id)}
                  icon={isJoined ? CheckCircle2 : Flag}
                >
                  {isJoined ? 'Participando' : 'Unirme a la Misión'}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const TeamChatCollaborative = ({ messages, onSendMessage, teamChannels, activeChannel, setActiveChannel }) => {
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    onSendMessage(newMessage, activeChannel);
    setNewMessage('');
  };

  const emojis = ['👍', '❤️', '🎉', '💡', '👏', '🔥', '✅', '🙌'];

  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden flex flex-col h-[700px]">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-[#EE121A] to-[#FF6B6B] rounded-2xl flex items-center justify-center text-white shadow-lg">
              <MessageSquare size={28} />
            </div>
            <div>
              <h3 className="text-xl font-black italic tracking-tighter uppercase text-gray-800">
                Sala de Colaboración
              </h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                {teamChannels.find(c => c.id === activeChannel)?.name} • {teamChannels.find(c => c.id === activeChannel)?.online} en línea
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-[#EE121A]">
              <Bell size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-[#EE121A]">
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Channel Tabs */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
          {teamChannels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => setActiveChannel(channel.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider whitespace-nowrap transition-all
                ${activeChannel === channel.id 
                  ? 'bg-[#EE121A] text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
              `}
            >
              {channel.type === 'general' && <MessageSquare size={14} />}
              {channel.type === 'mission' && <Target size={14} />}
              {channel.type === 'recognition' && <Award size={14} />}
              {channel.name}
              {channel.unread > 0 && (
                <span className="ml-1 w-5 h-5 bg-[#EE121A] text-white rounded-full flex items-center justify-center text-[9px]">
                  {channel.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30">
        {/* Date Divider */}
        <div className="flex items-center justify-center">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider bg-white px-4 py-1 rounded-full shadow-sm">
            Hoy - Conversaciones de Impacto
          </span>
        </div>

        {messages.filter(m => m.channel === activeChannel).map((msg, idx) => (
          <div key={msg.id} className={`flex gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
            <div className="flex flex-col items-center gap-1">
              <Avatar name={msg.user} size="sm" status={msg.isMe ? 'online' : 'away'} />
              {msg.impactPoints && (
                <div className="bg-[#EE121A] text-white text-[8px] font-black px-1.5 py-0.5 rounded-full">
                  +{msg.impactPoints}
                </div>
              )}
            </div>
            
            <div className={`max-w-[75%] space-y-1`}>
              <div className={`
                p-4 rounded-2xl shadow-sm text-sm font-medium leading-relaxed
                ${msg.isMe 
                  ? 'bg-[#EE121A] text-white rounded-tr-sm' 
                  : 'bg-white text-gray-700 rounded-tl-sm border border-gray-100'}
              `}>
                {!msg.isMe && <p className="text-[10px] font-black uppercase opacity-60 mb-1">{msg.user} • {msg.role}</p>}
                {msg.text}
                {msg.attachment && (
                  <div className={`mt-2 p-2 rounded-lg ${msg.isMe ? 'bg-white/20' : 'bg-gray-100'}`}>
                    <div className="flex items-center gap-2">
                      {msg.attachment.type === 'image' ? <Camera size={14} /> : <Paperclip size={14} />}
                      <span className="text-xs font-bold">{msg.attachment.name}</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className={`flex items-center gap-2 ${msg.isMe ? 'justify-end' : ''}`}>
                <p className="text-[9px] font-bold text-gray-400 uppercase">{msg.time}</p>
                {msg.reactions?.map((reaction, i) => (
                  <span key={i} className="text-xs bg-white border border-gray-200 rounded-full px-1.5 py-0.5 shadow-sm">
                    {reaction.emoji} {reaction.count}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        
        <div ref={chatEndRef} />
      </div>

      {/* Quick Actions Bar */}
      <div className="px-4 py-2 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto">
        <button className="flex items-center gap-1 px-3 py-1.5 bg-purple-50 text-purple-600 rounded-full text-[10px] font-black uppercase hover:bg-purple-100 transition-colors">
          <Lightbulb size={12} /> Idea DEI
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase hover:bg-amber-100 transition-colors">
          <Award size={12} /> Reconocer
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase hover:bg-emerald-100 transition-colors">
          <HandHeart size={12} /> Ofrecer Ayuda
        </button>
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 relative">
        {showEmojiPicker && (
          <div className="absolute bottom-full left-4 mb-2 bg-white rounded-2xl shadow-xl border border-gray-200 p-3 flex gap-2 z-10">
            {emojis.map((emoji, i) => (
              <button 
                key={i} 
                type="button"
                onClick={() => { setNewMessage(prev => prev + emoji); setShowEmojiPicker(false); }}
                className="text-xl hover:scale-125 transition-transform"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
        
        <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:border-[#EE121A] focus-within:ring-4 focus-within:ring-[#EE121A]/10 transition-all">
          <button type="button" className="p-2 text-gray-400 hover:text-[#EE121A] transition-colors rounded-xl">
            <Paperclip size={20} />
          </button>
          <button 
            type="button" 
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 text-gray-400 hover:text-[#EE121A] transition-colors rounded-xl"
          >
            <Smile size={20} />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Mensaje en #${teamChannels.find(c => c.id === activeChannel)?.name}...`}
            className="flex-1 bg-transparent outline-none text-sm font-bold text-gray-700 placeholder:text-gray-400"
          />
          <button 
            type="button"
            className="p-2 text-gray-400 hover:text-[#EE121A] transition-colors rounded-xl"
          >
            <Mic size={20} />
          </button>
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

const TeamLeaderboardLive = ({ leaders, currentUserId, timeFrame, setTimeFrame }) => {
  const [expandedUser, setExpandedUser] = useState(null);

  return (
    <section className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Badge variant="secondary" size="md">COMPETENCIA AMISTOSA</Badge>
          <h3 className="text-2xl font-black italic tracking-tighter uppercase text-gray-800 mt-2">
            Ranking del Equipo
          </h3>
          <p className="text-sm text-gray-500">Reconoce el esfuerzo de tus compañeros</p>
        </div>
        
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
          {['Semana', 'Mes', 'Temporada'].map((frame) => (
            <button
              key={frame}
              onClick={() => setTimeFrame(frame)}
              className={`
                px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all
                ${timeFrame === frame ? 'bg-white text-[#EE121A] shadow-sm' : 'text-gray-500 hover:text-gray-700'}
              `}
            >
              {frame}
            </button>
          ))}
        </div>
      </div>

      {/* Podium Top 3 */}
      <div className="flex items-end justify-center gap-4 mb-8 pb-8 border-b border-gray-100">
        {leaders.slice(0, 3).map((leader, index) => {
          const positions = [
            { height: 'h-32', medal: '🥈', color: 'from-gray-300 to-gray-400' },
            { height: 'h-40', medal: '🥇', color: 'from-amber-300 to-amber-500', ring: true },
            { height: 'h-28', medal: '🥉', color: 'from-orange-300 to-orange-400' }
          ];
          const pos = positions[index];
          
          return (
            <div key={leader.id} className="flex flex-col items-center gap-3">
              <div className="relative">
                <Avatar name={leader.name} size="lg" ring={pos.ring} />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-2xl shadow-md border border-gray-100">
                  {pos.medal}
                </div>
              </div>
              <div className={`w-20 ${pos.height} bg-gradient-to-t ${pos.color} rounded-t-2xl shadow-lg flex items-end justify-center pb-2`}>
                <span className="text-white font-black text-lg italic">{leader.points > 999 ? (leader.points/1000).toFixed(1) + 'k' : leader.points}</span>
              </div>
              <p className="font-black text-gray-800 text-sm uppercase italic text-center">{leader.name.split(' ')[0]}</p>
            </div>
          );
        })}
      </div>

      {/* List */}
      <div className="space-y-2">
        {leaders.map((leader, index) => {
          const isCurrentUser = leader.id === currentUserId;
          const isExpanded = expandedUser === leader.id;
          
          return (
            <div 
              key={leader.id}
              className={`
                rounded-2xl transition-all cursor-pointer overflow-hidden
                ${isCurrentUser ? 'bg-gradient-to-r from-[#EE121A]/5 to-[#FF6B6B]/5 border-2 border-[#EE121A]' : 'bg-gray-50 hover:bg-white hover:shadow-md border-2 border-transparent'}
              `}
            >
              <div 
                className="flex items-center gap-4 p-4"
                onClick={() => setExpandedUser(isExpanded ? null : leader.id)}
              >
                <div className="w-8 h-8 flex items-center justify-center font-black text-gray-400 italic">
                  #{index + 1}
                </div>
                
                <Avatar name={leader.name} size="md" status={index < 3 ? 'online' : 'away'} />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className={`font-black truncate ${isCurrentUser ? 'text-[#EE121A]' : 'text-gray-800'}`}>
                      {leader.name}
                    </h4>
                    {isCurrentUser && <Badge variant="primary" size="sm">TÚ</Badge>}
                    {leader.isRisingStar && <Badge variant="warning" size="sm" animated>⭐ Rising Star</Badge>}
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{leader.dept} • {leader.specialty}</p>
                </div>

                <div className="text-right">
                  <p className="text-xl font-black italic text-gray-800">{leader.points.toLocaleString()}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">puntos impacto</p>
                </div>

                <div className="flex items-center gap-2">
                  {leader.trend === 'up' && <TrendingUp size={20} className="text-emerald-500" />}
                  <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-400">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-0 animate-in slide-in-from-top-2">
                  <div className="bg-white rounded-xl p-4 border border-gray-100 space-y-3">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-lg font-black text-[#EE121A]">{leader.stats.courses}</p>
                        <p className="text-[9px] font-bold text-gray-400 uppercase">Cursos</p>
                      </div>
                      <div>
                        <p className="text-lg font-black text-[#EE121A]">{leader.stats.recognitions}</p>
                        <p className="text-[9px] font-bold text-gray-400 uppercase">Reconocimientos</p>
                      </div>
                      <div>
                        <p className="text-lg font-black text-[#EE121A]">{leader.stats.mentoring}</p>
                        <p className="text-[9px] font-bold text-gray-400 uppercase">Mentorías</p>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1" icon={Award}>
                        Reconocer
                      </Button>
                      <Button size="sm" className="flex-1" icon={MessageSquare}>
                        Mensaje
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-500 mb-3">¿Sabías que reconocer a un compañero genera puntos de impacto para ambos?</p>
        <Button variant="ghost" size="sm" icon={ChevronRight}>
          Ver ranking completo de la organización
        </Button>
      </div>
    </section>
  );
};

const DEIImpactDashboard = ({ impactData }) => {
  const [selectedMetric, setSelectedMetric] = useState('inclusion');

  const metrics = {
    inclusion: { label: 'Índice de Inclusión', value: impactData.inclusionIndex, color: 'from-[#EE121A] to-[#FF6B6B]', icon: Heart },
    representation: { label: 'Representación Diversa', value: impactData.representation, color: 'from-blue-400 to-blue-600', icon: Users },
    accessibility: { label: 'Accesibilidad', value: impactData.accessibility, color: 'from-emerald-400 to-emerald-600', icon: CheckCircle2 },
    wellbeing: { label: 'Bienestar Psicológico', value: impactData.wellbeing, color: 'from-purple-400 to-purple-600', icon: Activity }
  };

  const currentMetric = metrics[selectedMetric];

  return (
    <section className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Badge variant="light" size="md">IMPACTO MEDIBLE</Badge>
          <h3 className="text-2xl font-black italic tracking-tighter uppercase text-gray-800 mt-2">
            Dashboard DEI del Equipo
          </h3>
        </div>
        <Button variant="outline" size="sm" icon={Download}>
          Exportar Reporte
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Metric Selector */}
        <div className="space-y-3">
          {Object.entries(metrics).map(([key, metric]) => (
            <button
              key={key}
              onClick={() => setSelectedMetric(key)}
              className={`
                w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left
                ${selectedMetric === key 
                  ? 'border-[#EE121A] bg-red-50 shadow-md' 
                  : 'border-gray-100 hover:border-gray-200 bg-white'}
              `}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center text-white shadow-md`}>
                <metric.icon size={24} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{metric.label}</p>
                <p className="text-2xl font-black text-gray-800">{metric.value}%</p>
              </div>
              {selectedMetric === key && <ChevronRight size={20} className="text-[#EE121A]" />}
            </button>
          ))}
        </div>

        {/* Main Visualization */}
        <div className="lg:col-span-2 bg-gray-50 rounded-3xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-black text-gray-800 uppercase tracking-wider text-sm">
              {currentMetric.label} - Evolución Mensual
            </h4>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#EE121A]" />
              <span className="text-xs font-bold text-gray-500 uppercase">Tu Equipo</span>
              <span className="w-3 h-3 rounded-full bg-gray-300 ml-2" />
              <span className="text-xs font-bold text-gray-500 uppercase">Promedio Org.</span>
            </div>
          </div>

          {/* Chart Simulation */}
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {impactData.monthlyData.map((month, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div className="relative w-full flex items-end justify-center gap-1 h-48">
                  {/* Team bar */}
                  <div 
                    className={`w-full max-w-[20px] bg-gradient-to-t ${currentMetric.color} rounded-t-lg transition-all duration-500 group-hover:opacity-80`}
                    style={{ height: `${month.team}%` }}
                  />
                  {/* Org average line */}
                  <div 
                    className="absolute w-full border-t-2 border-dashed border-gray-400"
                    style={{ bottom: `${month.org}%` }}
                  />
                </div>
                <span className="text-[10px] font-black text-gray-400 uppercase">{month.month}</span>
              </div>
            ))}
          </div>

          {/* Insight Card */}
          <div className="mt-6 bg-white rounded-2xl p-4 border border-gray-200 flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
              <Lightbulb size={24} />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Insight de Impacto</p>
              <p className="text-gray-600 text-sm mt-1">
                Tu equipo ha mejorado un <span className="font-bold text-[#EE121A]">23%</span> en {currentMetric.label.toLowerCase()} respecto al trimestre anterior. 
                Esto se correlaciona con las <span className="font-bold">3 misiones de equipo</span> completadas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PeerRecognitionWall = ({ recognitions, onSendRecognition }) => {
  const [newRecognition, setNewRecognition] = useState({ to: '', message: '', category: 'gratitude' });
  const [showComposer, setShowComposer] = useState(false);

  const categories = [
    { id: 'gratitude', label: 'Gratitud', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
    { id: 'excellence', label: 'Excelencia', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 'allyship', label: 'Aliadez', icon: HandHeart, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 'innovation', label: 'Innovación', icon: Lightbulb, color: 'text-purple-500', bg: 'bg-purple-50' }
  ];

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="success" size="sm" animated>
            <Sparkles size={10} /> RECONOCIMIENTO ENTRE PARES
          </Badge>
          <h2 className="text-3xl font-black tracking-tighter uppercase italic text-gray-800 mt-2">
            Muro de Apreciación
          </h2>
          <p className="text-gray-500 text-sm mt-1">Celebramos las acciones que hacen de nuestro equipo un lugar más inclusivo</p>
        </div>
        <Button 
          variant="primary" 
          size="md" 
          icon={Plus}
          onClick={() => setShowComposer(!showComposer)}
        >
          {showComposer ? 'Cancelar' : 'Reconocer a Alguien'}
        </Button>
      </div>

      {/* Recognition Composer */}
      {showComposer && (
        <div className="bg-gradient-to-br from-[#EE121A]/5 to-[#FF6B6B]/5 rounded-[2rem] p-6 border-2 border-[#EE121A]/20 animate-in slide-in-from-top-4">
          <h4 className="font-black text-gray-800 uppercase tracking-wider text-sm mb-4">Nuevo Reconocimiento</h4>
          
          <div className="space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setNewRecognition({...newRecognition, category: cat.id})}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider whitespace-nowrap transition-all
                    ${newRecognition.category === cat.id 
                      ? `${cat.bg} ${cat.color} ring-2 ring-offset-2 ring-current` 
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-[#EE121A]'}
                  `}
                >
                  <cat.icon size={14} />
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="¿A quién reconoces? (@nombre)"
                value={newRecognition.to}
                onChange={(e) => setNewRecognition({...newRecognition, to: e.target.value})}
                className="w-full px-4 py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-[#EE121A] outline-none font-bold text-gray-700"
              />
              <input
                type="text"
                placeholder="¿Qué hizo especialmente valioso?"
                value={newRecognition.message}
                onChange={(e) => setNewRecognition({...newRecognition, message: e.target.value})}
                className="w-full px-4 py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-[#EE121A] outline-none font-bold text-gray-700"
              />
            </div>

            <div className="flex justify-end">
              <Button 
                size="md" 
                icon={Send}
                onClick={() => {
                  onSendRecognition(newRecognition);
                  setShowComposer(false);
                  setNewRecognition({ to: '', message: '', category: 'gratitude' });
                }}
              >
                Publicar Reconocimiento
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Recognition Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recognitions.map((rec) => {
          const cat = categories.find(c => c.id === rec.category);
          
          return (
            <div key={rec.id} className="group bg-white rounded-[2rem] p-6 border border-gray-100 hover:border-[#EE121A]/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              {/* Decorative background */}
              <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full ${cat.bg} opacity-30 blur-2xl group-hover:opacity-50 transition-opacity`} />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${cat.bg} ${cat.color} flex items-center justify-center shadow-sm`}>
                    <cat.icon size={24} />
                  </div>
                  <Badge variant="ghost" size="sm">+{rec.points} pts</Badge>
                </div>

                <blockquote className="text-gray-700 font-medium leading-relaxed mb-4 italic">
                  "{rec.message}"
                </blockquote>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <Avatar name={rec.from} size="sm" />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-800">{rec.from} reconoce a</p>
                    <p className="text-sm font-black text-[#EE121A]">{rec.to}</p>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{rec.time}</span>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <button className="flex-1 py-2 bg-gray-50 rounded-xl text-[10px] font-black uppercase text-gray-600 hover:bg-[#EE121A] hover:text-white transition-all flex items-center justify-center gap-1">
                    <Heart size={14} /> {rec.likes}
                  </button>
                  <button className="flex-1 py-2 bg-gray-50 rounded-xl text-[10px] font-black uppercase text-gray-600 hover:bg-[#EE121A] hover:text-white transition-all flex items-center justify-center gap-1">
                    <Share2 size={14} /> Compartir
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const TeamVideoHub = ({ videos, onPlayVideo }) => {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="bg-gray-900 rounded-[2.5rem] p-8 border border-gray-800 shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Badge variant="secondary" size="md">APRENDIZAJE COLABORATIVO</Badge>
          <h3 className="text-2xl font-black italic tracking-tighter uppercase text-white mt-2">
            Video Hub del Equipo
          </h3>
          <p className="text-gray-400 text-sm mt-1">Contenido exclusivo creado por y para el equipo</p>
        </div>
        <Button variant="outline" size="sm" icon={Camera}>
          Subir Video
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div 
            key={video.id} 
            className="group relative bg-gray-800 rounded-2xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#EE121A] transition-all"
            onClick={() => setActiveVideo(video)}
          >
            <div className="relative h-48">
              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-[#EE121A] rounded-full flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform">
                  <Play size={28} fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded-lg text-xs font-black">
                {video.duration}
              </div>
            </div>
            
            <div className="p-4">
              <h4 className="font-bold text-white text-sm leading-tight mb-2 line-clamp-2">{video.title}</h4>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{video.author}</span>
                <span className="flex items-center gap-1">
                  <Eye size={12} /> {video.views}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-5xl bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h4 className="font-bold text-white">{activeVideo.title}</h4>
              <button 
                onClick={() => setActiveVideo(null)}
                className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="aspect-video bg-black flex items-center justify-center">
              <p className="text-gray-500 font-bold">Reproductor de Video • {activeVideo.duration}</p>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar name={activeVideo.author} size="md" />
                <div>
                  <p className="font-bold text-white">{activeVideo.author}</p>
                  <p className="text-xs text-gray-400">{activeVideo.uploadDate}</p>
                </div>
                <Button size="sm" variant="outline" className="ml-auto">
                  Seguir
                </Button>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{activeVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// ==========================================
// DATOS MOCK ESPECÍFICOS DE EQUIPO
// ==========================================

const MOCK_TEAM_STATS = {
  collectiveImpact: 24580,
  activeMembers: 8,
  totalMembers: 12,
  weeklyProgress: 78,
  teamStreak: 12,
  groupCourses: 24,
  deiActions: 156,
  recognitions: 89,
  newAllies: 5
};

const MOCK_MISSIONS = [
  {
    id: 1,
    title: "Maratón de Accesibilidad",
    description: "Completa 5 módulos de accesibilidad web como equipo esta semana",
    difficulty: "Media",
    target: 5,
    current: 3,
    unit: "módulos",
    reward: "Badge 'Campeones de la Inclusión Digital' + 500 pts c/u",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=800",
    topContributors: ["Ana M.", "Carlos R.", "Luis T."],
    contributorCount: 7,
    isUrgent: true
  },
  {
    id: 2,
    title: "Círculo de Mentoría",
    description: "Cada miembro senior mentoriza a un nuevo colaborador en DEI",
    difficulty: "Alta",
    target: 6,
    current: 4,
    unit: "parejas",
    reward: "Experiencia VIP con líderes de diversidad + 1000 pts",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
    topContributors: ["María G.", "Sofia C."],
    contributorCount: 4,
    isUrgent: false
  },
  {
    id: 3,
    title: "Detección de Microagresiones",
    description: "Identifica y reporta constructivamente 3 situaciones esta semana",
    difficulty: "Baja",
    target: 3,
    current: 1,
    unit: "reportes",
    reward: "Certificado de 'Aliado Activo' + 300 pts",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800",
    topContributors: ["Ana M."],
    contributorCount: 2,
    isUrgent: false
  }
];

const MOCK_TEAM_CHANNELS = [
  { id: 'general', name: 'General', type: 'general', online: 5, unread: 0 },
  { id: 'missions', name: 'Misiones', type: 'mission', online: 3, unread: 2 },
  { id: 'recognition', name: 'Reconocimientos', type: 'recognition', online: 4, unread: 5 },
  { id: 'random', name: 'Café Virtual', type: 'general', online: 2, unread: 0 }
];

const MOCK_TEAM_MESSAGES = [
  { 
    id: 1, 
    text: "¡Acabo de terminar el módulo 3 de accesibilidad! El contraste de colores es más importante de lo que pensaba 🎨", 
    user: "Ana M.", 
    role: "UX Designer",
    isMe: false, 
    time: "10:30",
    channel: 'missions',
    impactPoints: 50,
    reactions: [{ emoji: '🎉', count: 3 }, { emoji: '💡', count: 2 }]
  },
  { 
    id: 2, 
    text: "Gran observación Ana. ¿Alguien quiere hacer una sesión de pair review este viernes?", 
    user: "Carlos R.", 
    role: "Tech Lead",
    isMe: false, 
    time: "10:35",
    channel: 'missions',
    reactions: [{ emoji: '👍', count: 4 }]
  },
  { 
    id: 3, 
    text: "Yo me apunto. Además puedo compartir el checklist que preparé para la auditoría.", 
    user: "Tú", 
    role: "Líder de Innovación",
    isMe: true, 
    time: "10:38",
    channel: 'missions',
    attachment: { type: 'doc', name: 'Checklist_WCAG_2.1.pdf' }
  },
  { 
    id: 4, 
    text: "Quiero reconocer públicamente a @Luis Torres por su paciencia explicándome los lectores de pantalla ayer. ¡Eres un crack! 👏", 
    user: "Sofia Chen", 
    role: "Frontend Dev",
    isMe: false, 
    time: "09:15",
    channel: 'recognition',
    impactPoints: 100,
    reactions: [{ emoji: '❤️', count: 8 }, { emoji: '👏', count: 5 }]
  }
];

const MOCK_LEADERS = [
  { id: 1, name: "María González", dept: "Innovación", specialty: "Estrategia DEI", points: 4850, trend: 'up', isRisingStar: false, stats: { courses: 12, recognitions: 8, mentoring: 5 } },
  { id: 2, name: "Carlos Rivera", dept: "Tecnología", specialty: "Accesibilidad", points: 4720, trend: 'same', isRisingStar: true, stats: { courses: 10, recognitions: 12, mentoring: 3 } },
  { id: 3, name: "Ana Martínez", dept: "Diseño", specialty: "UX Inclusivo", points: 4650, trend: 'up', isRisingStar: true, stats: { courses: 11, recognitions: 15, mentoring: 4 } },
  { id: 4, name: "Luis Torres", dept: "Tecnología", specialty: "Frontend A11y", points: 3890, trend: 'down', isRisingStar: false, stats: { courses: 9, recognitions: 6, mentoring: 2 } },
  { id: 5, name: "Sofia Chen", dept: "Producto", specialty: "Research Diversidad", points: 3540, trend: 'up', isRisingStar: true, stats: { courses: 8, recognitions: 10, mentoring: 3 } },
  { id: 6, name: "Diego Ramírez", dept: "RRHH", specialty: "Cultura Inclusiva", points: 3210, trend: 'same', isRisingStar: false, stats: { courses: 7, recognitions: 9, mentoring: 6 } }
];

const MOCK_IMPACT_DATA = {
  inclusionIndex: 87,
  representation: 92,
  accessibility: 78,
  wellbeing: 85,
  monthlyData: [
    { month: 'Jun', team: 65, org: 60 },
    { month: 'Jul', team: 72, org: 62 },
    { month: 'Ago', team: 78, org: 65 },
    { month: 'Sep', team: 82, org: 68 },
    { month: 'Oct', team: 85, org: 70 },
    { month: 'Nov', team: 87, org: 72 }
  ]
};

const MOCK_RECOGNITIONS = [
  {
    id: 1,
    from: "Carlos Rivera",
    to: "Ana Martínez",
    message: "Por tu dedicación en hacer que nuestros diseños sean verdaderamente inclusivos. El workshop de ayer cambió mi perspectiva.",
    category: "excellence",
    points: 100,
    time: "Hace 2 horas",
    likes: 12
  },
  {
    id: 2,
    from: "María González",
    to: "Todo el Equipo",
    message: "Por completar la maratón de accesibilidad con una semana de anticipación. ¡Son un ejemplo para toda la organización!",
    category: "gratitude",
    points: 250,
    time: "Ayer",
    likes: 24
  },
  {
    id: 3,
    from: "Sofia Chen",
    to: "Luis Torres",
    message: "Gracias por ser mi aliado cuando propuse el nuevo proceso de entrevistas diversas. Tu apoyo significó todo.",
    category: "allyship",
    points: 150,
    time: "Hace 3 días",
    likes: 8
  }
];

const MOCK_VIDEOS = [
  {
    id: 1,
    title: "Mi Experiencia como Persona Neurodivergente en Tech",
    author: "Ana Martínez",
    duration: "8:45",
    views: 234,
    thumbnail: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800",
    uploadDate: "Hace 1 semana",
    description: "Comparto mi viaje de diagnóstico de TDAH y cómo mi equipo adaptó nuestros procesos para potenciar mis fortalezas."
  },
  {
    id: 2,
    title: "Tutorial: Testing con Lectores de Pantalla (NVDA)",
    author: "Luis Torres",
    duration: "12:30",
    views: 567,
    thumbnail: "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=800",
    uploadDate: "Hace 2 semanas",
    description: "Guía práctica para QA engineers y developers. Incluye atajos de teclado y casos de uso reales."
  },
  {
    id: 3,
    title: "Panel: Diversidad Generacional en Nuestro Equipo",
    author: "María González",
    duration: "24:15",
    views: 189,
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800",
    uploadDate: "Hace 3 semanas",
    description: "Conversación entre Baby Boomers, Gen X, Millennials y Gen Z sobre colaboración efectiva."
  }
];

// ==========================================
// COMPONENTE PRINCIPAL: EQUIPO
// ==========================================

export default function Equipo() {
  const [joinedMissions, setJoinedMissions] = useState([1]);
  const [activeChannel, setActiveChannel] = useState('general');
  const [timeFrame, setTimeFrame] = useState('Mes');
  const [teamMessages, setTeamMessages] = useState(MOCK_TEAM_MESSAGES);
  const [recognitions, setRecognitions] = useState(MOCK_RECOGNITIONS);

  const handleJoinMission = (missionId) => {
    if (joinedMissions.includes(missionId)) {
      setJoinedMissions(joinedMissions.filter(id => id !== missionId));
    } else {
      setJoinedMissions([...joinedMissions, missionId]);
    }
  };

  const handleSendTeamMessage = (text, channel) => {
    const newMsg = {
      id: Date.now(),
      text,
      user: "Tú",
      role: "Líder de Innovación",
      isMe: true,
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      channel,
      reactions: []
    };
    setTeamMessages([...teamMessages, newMsg]);
  };

  const handleSendRecognition = (recognition) => {
    const newRec = {
      id: Date.now(),
      from: "Tú",
      ...recognition,
      points: recognition.category === 'excellence' ? 100 : recognition.category === 'allyship' ? 150 : 75,
      time: "Justo ahora",
      likes: 0
    };
    setRecognitions([newRec, ...recognitions]);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      
      <main className="max-w-7xl mx-auto px-6 pt-28 space-y-12">
        
        {/* HEADER DE IMPACTO */}
        <TeamImpactHeader teamStats={MOCK_TEAM_STATS} />

        {/* MISIONES COLABORATIVAS */}
        <TeamMissions 
          missions={MOCK_MISSIONS} 
          onJoinMission={handleJoinMission}
          userJoinedMissions={joinedMissions}
        />

        {/* GRID PRINCIPAL: CHAT + RANKING */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <TeamChatCollaborative 
              messages={teamMessages}
              onSendMessage={handleSendTeamMessage}
              teamChannels={MOCK_TEAM_CHANNELS}
              activeChannel={activeChannel}
              setActiveChannel={setActiveChannel}
            />
          </div>
          <div className="lg:col-span-2">
            <TeamLeaderboardLive 
              leaders={MOCK_LEADERS} 
              currentUserId={1}
              timeFrame={timeFrame}
              setTimeFrame={setTimeFrame}
            />
          </div>
        </div>

        {/* DASHBOARD DE IMPACTO DEI */}
        <DEIImpactDashboard impactData={MOCK_IMPACT_DATA} />

        {/* MURO DE RECONOCIMIENTO */}
        <PeerRecognitionWall 
          recognitions={recognitions}
          onSendRecognition={handleSendRecognition}
        />

        {/* VIDEO HUB */}
        <TeamVideoHub videos={MOCK_VIDEOS} />

      </main>

      {/* DEI ASSISTANT - SOLO UNA VEZ Y AL FINAL */}
      <DEIAssistant currentView="equipo" />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#EE121A] rounded-lg flex items-center justify-center text-white">
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
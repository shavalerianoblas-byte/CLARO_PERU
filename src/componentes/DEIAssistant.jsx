import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, X, ChevronRight, Sparkles, 
  Trophy, Clock, Target, Zap, Users, 
  ArrowRight, Bot, Send, ChevronUp, ChevronDown
} from 'lucide-react';


// ==========================================
// COMPONENTE: CHATBOT DEI ASSISTANT
// ==========================================
const DEIAssistant = ({ 
  currentView, // 'personal' | 'equipo'
  onNavigate,  // función para cambiar de vista
  userStats,
  userCourses,
  teamMissions,
  availableActivities
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef(null);

  // Mensaje de bienvenida al abrir
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage({
        text: `¡Hola! Soy tu asistente DEI 🤖\nEstás en modo **${currentView === 'personal' ? 'Mi Espacio' : 'Equipo'}**.\n¿En qué puedo ayudarte hoy?`,
        actions: [
          { id: 'puntaje', label: 'Ver mi puntaje', icon: Trophy },
          { id: 'vencer', label: 'Cursos por vencer', icon: Clock },
          { id: 'actividades', label: 'Actividades disponibles', icon: Target },
          { id: 'retos', label: 'Retos activos', icon: Zap },
          { id: 'navegar', label: currentView === 'personal' ? 'Ir a Equipo →' : '← Ir a Mi Espacio', icon: ArrowRight, highlight: true }
        ]
      });
    }
  }, [isOpen]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const addBotMessage = (content) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'bot',
        ...content,
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 600);
  };

  const handleQuickAction = (actionId) => {
    setShowQuickActions(false);
    
    // Agregar mensaje del usuario
    const actionLabels = {
      puntaje: '¿Cuál es mi puntaje?',
      vencer: '¿Qué cursos están por vencer?',
      actividades: '¿Cuáles son las actividades disponibles?',
      retos: '¿Qué retos hay?',
      navegar: currentView === 'personal' ? 'Ir a Equipo' : 'Ir a Mi Espacio'
    };

    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      text: actionLabels[actionId],
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    }]);

    // Respuesta según acción
    switch(actionId) {
      case 'puntaje':
        addBotMessage({
          text: `**Tu Puntaje DEI** 🏆\n\n**Total acumulado:** ${userStats?.puntos?.toLocaleString() || '10,450'} pts\n**Este mes:** +${userStats?.monthlyPoints || '1,240'} pts\n**Ranking:** #${userStats?.ranking || '12'} en tu departamento\n**Nivel:** ${userStats?.level || 'Gold Member'}\n\n¡Estás a ${userStats?.nextMilestone || '550'} pts de Platinum!`,
          actions: [
            { id: 'ver_ranking', label: 'Ver ranking completo', icon: Trophy },
            { id: 'como_ganar', label: '¿Cómo ganar más puntos?', icon: Zap }
          ]
        });
        break;

      case 'vencer':
        const urgentCourses = userCourses?.filter(c => c.daysLeft <= 3) || [];
        const upcomingCourses = userCourses?.filter(c => c.daysLeft > 3 && c.daysLeft <= 7) || [];
        
        let vencerText = '**Cursos por Vencer** ⏰\n\n';
        
        if (urgentCourses.length > 0) {
          vencerText += `**🔴 URGENTES (≤3 días):**\n`;
          urgentCourses.forEach(c => {
            vencerText += `• ${c.title} — **${c.daysLeft} días**\n`;
          });
          vencerText += '\n';
        }
        
        if (upcomingCourses.length > 0) {
          vencerText += `**🟡 PRÓXIMOS (4-7 días):**\n`;
          upcomingCourses.forEach(c => {
            vencerText += `• ${c.title} — ${c.daysLeft} días\n`;
          });
        }

        if (urgentCourses.length === 0 && upcomingCourses.length === 0) {
          vencerText += '✅ ¡No tienes cursos urgentes! Todos están al día.';
        }

        addBotMessage({
          text: vencerText,
          actions: urgentCourses.length > 0 ? [
            { id: 'continuar_urgente', label: 'Continuar curso urgente', icon: ChevronRight, highlight: true }
          ] : [
            { id: 'explorar', label: 'Explorar más cursos', icon: Target }
          ]
        });
        break;

      case 'actividades':
        addBotMessage({
          text: `**Actividades Disponibles** 📋\n\n**Hoy:**\n• Taller de Sensibilización (16:00 hrs)\n• Office Hours de Accesibilidad\n\n**Esta semana:**\n• ${availableActivities?.length || '3'} misiones de equipo activas\n• Webinar: Neurodiversidad (Viernes)\n• Círculo de mentoría (Jueves)\n\n**Próximas:**\n• Hackatón de Inclusión (20 Dic)\n• Cierre de Temporada DEI`,
          actions: [
            { id: 'agendar', label: 'Agendar en calendario', icon: Clock },
            { id: 'misiones', label: 'Ver misiones de equipo', icon: Users }
          ]
        });
        break;

      case 'retos':
        const activeMissions = teamMissions?.filter(m => m.status === 'active') || MOCK_MISSIONS;
        
        let retosText = `**Retos Activos** 🎯\n\n`;
        activeMissions.slice(0, 3).forEach((m, i) => {
          const progress = Math.round((m.current / m.target) * 100);
          retosText += `${i + 1}. **${m.title}**\n   Progreso: ${progress}% (${m.current}/${m.target})\n   Recompensa: ${m.reward}\n\n`;
        });

        addBotMessage({
          text: retosText,
          actions: [
            { id: 'unirme_reto', label: 'Unirme a un reto', icon: Zap, highlight: true },
            { id: 'crear_reto', label: 'Proponer nuevo reto', icon: Sparkles }
          ]
        });
        break;

      case 'navegar':
        const destino = currentView === 'personal' ? 'equipo' : 'personal';
        const destinoLabel = currentView === 'personal' ? 'Equipo' : 'Mi Espacio';
        
        addBotMessage({
          text: `**Navegando a ${destinoLabel}** 🚀\n\nCambiando de vista... Serás redirigido en un momento.`,
          actions: []
        });
        
        setTimeout(() => {
          onNavigate(destino);
          setIsOpen(false);
          setMessages([]);
        }, 1500);
        break;

      default:
        addBotMessage({
          text: 'Entiendo. Déjame buscar esa información para ti...',
          actions: []
        });
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Agregar mensaje del usuario
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    }]);

    // Simular respuesta inteligente
    const lowerInput = inputValue.toLowerCase();
    let responseText = 'Entiendo tu consulta. ';
    
    if (lowerInput.includes('punta') || lowerInput.includes('score')) {
      responseText += `Tienes **${userStats?.puntos?.toLocaleString() || '10,450'} puntos** acumulados. ¿Quieres ver cómo ganar más?`;
    } else if (lowerInput.includes('curso') || lowerInput.includes('vencer')) {
      responseText += `Tienes **${userCourses?.filter(c => c.daysLeft <= 7).length || '2'} cursos** próximos a vencer. ¿Quieres que te muestre cuáles?`;
    } else if (lowerInput.includes('equipo') || lowerInput.includes('team')) {
      responseText += `Tu equipo **Innovación** está en el lugar **#3** este mes. ¿Quieres ver las misiones grupales?`;
    } else if (lowerInput.includes('hola') || lowerInput.includes('hey')) {
      responseText += '¡Hola de nuevo! 👋 ¿En qué puedo ayudarte?';
    } else {
      responseText += 'Puedo ayudarte con:\n• Tu puntaje y ranking\n• Cursos por vencer\n• Actividades y retos\n• Navegar entre vistas\n\nSelecciona una opción rápida o escríbeme tu pregunta.';
    }

    setInputValue('');
    
    setTimeout(() => {
      addBotMessage({
        text: responseText,
        actions: [
          { id: 'puntaje', label: 'Ver puntaje', icon: Trophy },
          { id: 'vencer', label: 'Cursos por vencer', icon: Clock },
          { id: 'navegar', label: currentView === 'personal' ? 'Ir a Equipo →' : '← Ir a Mi Espacio', icon: ArrowRight, highlight: true }
        ]
      });
    }, 800);
  };

  // Render del avatar robótico flotante
  const renderAvatar = () => (
    <div className="relative group">
      {/* Halo efecto */}
      <div className="absolute inset-0 bg-[#EE121A] rounded-full blur-xl opacity-30 group-hover:opacity-50 animate-pulse transition-opacity" />
      
      {/* Botón principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative w-16 h-16 rounded-full flex items-center justify-center
          bg-gradient-to-br from-[#EE121A] to-[#C40F15]
          shadow-2xl shadow-red-500/40
          border-4 border-white
          hover:scale-110 hover:shadow-red-500/60
          transition-all duration-300 z-50
          ${isOpen ? 'rotate-12 scale-110' : ''}
        `}
      >
        {isOpen ? (
          <X size={28} className="text-white" strokeWidth={3} />
        ) : (
          <div className="flex flex-col items-center">
            <Bot size={28} className="text-white" strokeWidth={2.5} />
            {/* Indicador de notificación */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF8200] rounded-full border-2 border-white flex items-center justify-center">
              <Sparkles size={10} className="text-white" />
            </div>
          </div>
        )}
      </button>

      {/* Tooltip cuando está cerrado */}
      {!isOpen && (
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
          ¿Necesitas ayuda?
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-slate-900 rotate-45" />
        </div>
      )}
    </div>
  );

  // Render del chat
  const renderChat = () => {
    if (!isOpen) return null;

    return (
      <div className={`
        fixed bottom-24 right-6 z-50
        w-[380px] max-w-[calc(100vw-2rem)]
        bg-white rounded-[2rem] shadow-2xl shadow-slate-900/20
        border border-slate-200
        overflow-hidden
        animate-in slide-in-from-bottom-4 fade-in duration-300
        ${isMinimized ? 'h-16' : 'h-[600px] max-h-[calc(100vh-8rem)]'}
        flex flex-col
      `}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#EE121A] to-[#C40F15] p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Bot size={24} className="text-white" />
            </div>
            <div>
              <h4 className="font-black text-white text-sm uppercase tracking-wider">DEI Assistant</h4>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-white/80 text-[10px] font-bold uppercase">En línea</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
            >
              {isMinimized ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            <button 
              onClick={() => { setIsOpen(false); setMessages([]); }}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`
                    max-w-[85%] rounded-2xl p-4 shadow-sm
                    ${msg.type === 'user' 
                      ? 'bg-[#EE121A] text-white rounded-br-sm' 
                      : 'bg-white text-slate-700 rounded-bl-sm border border-slate-100'
                    }
                  `}>
                    {msg.type === 'bot' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Bot size={14} className="text-[#EE121A]" />
                        <span className="text-[10px] font-black text-[#EE121A] uppercase tracking-wider">Assistant</span>
                      </div>
                    )}
                    
                    <div className={`
                      text-sm font-medium leading-relaxed whitespace-pre-line
                      ${msg.type === 'user' ? 'text-white' : 'text-slate-700'}
                    `}>
                      {msg.text.split('**').map((part, i) => 
                        i % 2 === 1 ? (
                          <span key={i} className={msg.type === 'user' ? 'text-white font-black' : 'text-[#EE121A] font-black'}>
                            {part}
                          </span>
                        ) : part
                      )}
                    </div>

                    {/* Acciones rápidas */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-current border-opacity-20">
                        {msg.actions.map((action) => (
                          <button
                            key={action.id}
                            onClick={() => handleQuickAction(action.id)}
                            className={`
                              flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all
                              ${action.highlight 
                                ? 'bg-[#EE121A] text-white hover:bg-[#C40F15] shadow-md' 
                                : msg.type === 'user'
                                  ? 'bg-white/20 text-white hover:bg-white/30'
                                  : 'bg-slate-100 text-slate-600 hover:bg-[#EE121A] hover:text-white'
                              }
                            `}
                          >
                            <action.icon size={12} />
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}

                    <p className={`text-[9px] mt-2 ${msg.type === 'user' ? 'text-white/60' : 'text-slate-400'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-bl-sm p-4 border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Bot size={16} className="text-[#EE121A]" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-[#EE121A] rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-[#EE121A] rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-[#EE121A] rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100 shrink-0">
              <div className="flex items-center gap-2 bg-slate-100 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-[#EE121A]/20 transition-all">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 bg-transparent outline-none text-sm font-bold text-slate-700 placeholder:text-slate-400 px-2"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim()}
                  className={`
                    p-2.5 rounded-xl transition-all
                    ${inputValue.trim() 
                      ? 'bg-[#EE121A] text-white hover:bg-[#C40F15] shadow-md' 
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    }
                  `}
                >
                  <Send size={18} />
                </button>
              </div>
              
              {/* Sugerencias */}
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
                {['¿Mi puntaje?', 'Cursos urgentes', 'Ir a Equipo'].map((suggestion, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setInputValue(suggestion);
                      setTimeout(() => handleSendMessage({ preventDefault: () => {} }), 100);
                    }}
                    className="flex-shrink-0 px-3 py-1.5 bg-slate-50 text-slate-600 rounded-full text-[10px] font-bold hover:bg-[#EE121A] hover:text-white transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </form>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Avatar flotante */}
      <div className="fixed bottom-6 right-6 z-50">
        {renderAvatar()}
      </div>

      {/* Chat */}
      {renderChat()}
    </>
  );
};

// ==========================================
// DATOS MOCK PARA DEMOSTRACIÓN
// ==========================================

const MOCK_MISSIONS = [
  { id: 1, title: 'Maratón de Accesibilidad', current: 3, target: 5, reward: '500 pts', status: 'active' },
  { id: 2, title: 'Círculo de Mentoría', current: 4, target: 6, reward: '1000 pts', status: 'active' },
  { id: 3, title: 'Detección de Microagresiones', current: 1, target: 3, reward: '300 pts', status: 'active' }
];

export default DEIAssistant;
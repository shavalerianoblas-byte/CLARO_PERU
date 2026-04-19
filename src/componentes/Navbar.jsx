import React, { useState } from 'react';
import { 
  Globe, LayoutDashboard, Gift, Gamepad2, Megaphone, 
  Star, Menu, X, Bell, ChevronDown, Trophy, Zap
} from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab, dashboardView, setDashboardView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // ESTRUCTURA: Dashboard, Rewards, Juegos, Ética
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'premios', icon: Gift, label: 'Rewards Elite' },
    { id: 'juegos', icon: Gamepad2, label: 'Zona Gamer' },
    { id: 'denuncia', icon: Megaphone, label: 'Línea Ética' },
  ];


  const isDashboard = activeTab === 'dashboard';

  return (
    <>
      {/* NAVBAR PRINCIPAL */}
      <nav className="fixed top-0 left-0 right-0 h-20 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-100 px-4 md:px-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
        <div className="max-w-[1600px] mx-auto h-full flex items-center justify-between">
          
          {/* LOGO */}
          <div 
            className="flex items-center gap-3 group cursor-pointer shrink-0"
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="w-10 h-10 bg-[#EE121A] rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-200 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-red-300">
              <Globe size={20} strokeWidth={3} />
            </div>
            <div className="flex flex-col">
              <p className="font-black text-xl tracking-tighter leading-none text-slate-900 italic">CLARO</p>
              <p className="text-[8px] font-black text-[#EE121A] uppercase tracking-[0.25em]">Inclusión Hub</p>
            </div>
          </div>

          {/* NAVEGACIÓN CENTRAL */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-50/80 p-1.5 rounded-2xl border border-slate-100">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 text-[11px] font-black uppercase tracking-wider
                  ${activeTab === item.id 
                    ? 'bg-[#EE121A] text-white shadow-lg shadow-red-200 transform scale-105' 
                    : 'text-slate-500 hover:text-[#EE121A] hover:bg-white hover:shadow-sm'
                  }
                `}
              >
                <item.icon size={16} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                {item.label}
              </button>
            ))}
          </div>

          {/* SECCIÓN DERECHA */}
          <div className="flex items-center gap-4">
            
            {/* Badge de Puntos */}
            <div 
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 py-2 px-4 rounded-xl border border-amber-100 cursor-pointer hover:shadow-md transition-all duration-300 group"
              onClick={() => setActiveTab('premios')}
            >
              <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center shadow-sm">
                <Star size={12} className="text-white" fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-amber-600 uppercase tracking-wider">Tus Puntos</span>
                <span className="text-sm font-black text-slate-900 leading-none">
                  10,450 <span className="text-[#EE121A] text-xs">PTS</span>
                </span>
              </div>
            </div>

            {/* Notificaciones */}
            <button className="relative p-2.5 text-slate-400 hover:text-[#EE121A] hover:bg-red-50 rounded-xl transition-all duration-300">
              <Bell size={22} strokeWidth={2} />
              <span className="absolute top-1 right-1 w-5 h-5 bg-[#EE121A] text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                3
              </span>
            </button>

            <div className="h-8 w-[1px] bg-slate-200" />

            {/* Perfil */}
            <div className="relative">
              <div 
                className="flex items-center gap-3 pl-1 cursor-pointer group"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="text-right hidden sm:block">
                  <p className="font-black text-sm text-slate-900 leading-none">Shantall L.</p>
                  <p className="text-[9px] font-bold text-[#EE121A] uppercase tracking-wider">Gold Member</p>
                </div>
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#EE121A] to-[#FF8200] p-[2px] shadow-lg shadow-red-100 group-hover:shadow-xl transition-all duration-300">
                    <div className="w-full h-full rounded-full bg-white overflow-hidden">
                      <img 
                        src="https://api.dicebear.com/8.x/avataaars/svg?seed=Shantall" 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  </div>
                </div>
                <ChevronDown size={16} className={`text-slate-400 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
              </div>

              {/* Dropdown de usuario */}
              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-4 border-b border-slate-100">
                    <p className="font-black text-slate-900">Shantall López</p>
                    <p className="text-xs text-slate-500 font-medium">Administradora</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <button className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-red-50 hover:text-[#EE121A] transition-colors">
                      Mi Perfil
                    </button>
                    <button className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-red-50 hover:text-[#EE121A] transition-colors">
                      Configuración
                    </button>
                    <button className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors">
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <button 
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>


      {/* SPACER: Compensa la altura fija */}
      <div className={isDashboard ? 'h-34' : 'h-20'} />

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-20 left-0 w-full bg-white border-b border-slate-200 p-4 shadow-2xl animate-in fade-in slide-in-from-top-4 z-50">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center gap-4 p-4 rounded-xl text-sm font-black uppercase transition-all
                  ${activeTab === item.id 
                    ? 'bg-[#EE121A] text-white shadow-lg' 
                    : 'text-slate-600 hover:bg-slate-50'
                  }
                `}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Dashboard tabs en mobile */}
          {isDashboard && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-3 px-2">Vista Dashboard</p>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setDashboardView('personal')}
                  className={`p-3 rounded-xl text-xs font-black uppercase text-center transition-all ${dashboardView === 'personal' ? 'bg-[#EE121A] text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  Mi Espacio
                </button>
                <button 
                  onClick={() => setDashboardView('explorar')}
                  className={`p-3 rounded-xl text-xs font-black uppercase text-center transition-all ${dashboardView === 'explorar' ? 'bg-[#EE121A] text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  Explorar & Equipo
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
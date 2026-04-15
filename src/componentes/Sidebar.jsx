import React, { useState } from 'react';
import { 
  Globe, LayoutDashboard, Gift, Gamepad2, Megaphone, 
  Settings, Star, Menu, X 
} from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'premios', icon: Gift, label: 'Rewards Elite' },
    { id: 'juegos', icon: Gamepad2, label: 'Zona Gamer' },
    { id: 'denuncia', icon: Megaphone, label: 'Línea Ética' },
  ];

  return (
    // Se agregó 'h-16' para forzar una altura fija y no crezca infinito
    <nav className="fixed top-0 left-0 right-0 h-16 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 md:px-6 shadow-sm">
      <div className="max-w-[1600px] mx-auto h-full flex items-center justify-between">
        
        {/* LOGO SECTION */}
        <div className="flex items-center gap-2 group cursor-pointer shrink-0">
          <div className="w-8 h-8 bg-[#EE121A] rounded-lg flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105">
            <Globe size={16} strokeWidth={3} />
          </div>
          <div className="flex flex-col">
            <p className="font-black text-lg tracking-tighter leading-none text-slate-900">CLARO</p>
            <p className="text-[7px] font-black text-[#EE121A] uppercase tracking-[0.2em]">Inclusión Portal</p>
          </div>
        </div>

        {/* NAVEGACIÓN CENTRAL (DESKTOP) */}
        <div className="hidden lg:flex items-center gap-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-xl transition-all duration-200 text-[10px] font-bold uppercase tracking-wider ${
                activeTab === item.id 
                ? 'bg-slate-900 text-white shadow-md' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon size={14} strokeWidth={activeTab === item.id ? 2.5 : 2} />
              {item.label}
            </button>
          ))}
        </div>

        {/* SECCIÓN DERECHA */}
        <div className="flex items-center gap-3">
          {/* Badge de Puntos */}
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 py-1.5 px-3 rounded-xl border border-slate-100">
            <Star size={12} className="text-amber-500" fill="currentColor" />
            <span className="text-[10px] font-black text-slate-900">
              10,450 <span className="text-[#EE121A]">PTS</span>
            </span>
          </div>

          <div className="h-6 w-[1px] bg-slate-200 hidden md:block" />

          {/* Perfil Compacto */}
          <div className="flex items-center gap-2 pl-1">
            <div className="text-right hidden sm:block">
              <p className="font-bold text-xs text-slate-900 leading-none">Shantall</p>
              <p className="text-[8px] font-medium text-slate-400 uppercase">Gerente</p>
            </div>
            <div className="relative w-8 h-8 rounded-xl bg-slate-100 overflow-hidden ring-2 ring-slate-50 group cursor-pointer">
              <img 
                src="https://api.dicebear.com/8.x/avataaars/svg?seed=Shantall" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-1.5 text-slate-600 hover:bg-slate-50 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN (FLOTANTE) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[65px] left-0 w-full bg-white border-b border-slate-200 p-2 shadow-xl animate-in fade-in slide-in-from-top-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-[11px] font-bold uppercase ${
                activeTab === item.id ? 'bg-red-50 text-[#EE121A]' : 'text-slate-600'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, LayoutDashboard, Gift, Gamepad2, 
  Star, Menu, X, Home, BookOpen, Shield, 
  LogIn, LogOut, Lock 
} from 'lucide-react';

const Navbar = ({ currentScreen, onNavigate, isLoggedIn, displayName, role, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lógica de permisos para mostrar la Intranet (dueños, co-dueños o editores)
  const isOwnerOrEditor = role === "owner" || role === "coowner" || role === "editor";

  // Ítems de navegación dinámica
  const navItems = [
    { id: "inicio", label: "Inicio", icon: Home },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "premios", label: "Rewards Elite", icon: Gift },
    { id: "games", label: "Zona Gamer", icon: Gamepad2 },
    { id: "guia", label: "Guía", icon: BookOpen },
    { id: "denuncia", label: "Línea Ética", icon: Shield },
    ...(isOwnerOrEditor ? [{ id: "intranet", label: "Intranet", icon: Lock }] : []),
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 md:px-6 shadow-sm">
      <div className="max-w-[1600px] mx-auto h-full flex items-center justify-between">
        
        {/* SECCIÓN LOGO */}
        <motion.div 
          className="flex items-center gap-2 group cursor-pointer shrink-0"
          whileHover={{ scale: 1.02 }}
          onClick={() => onNavigate("inicio")}
        >
          <div className="w-8 h-8 bg-[#EE121A] rounded-lg flex items-center justify-center text-white shadow-md transition-transform">
            <Globe size={16} strokeWidth={3} />
          </div>
          <div className="flex flex-col">
            <p className="font-black text-lg tracking-tighter leading-none text-slate-900">CLARO</p>
            <p className="text-[7px] font-black text-[#EE121A] uppercase tracking-[0.2em]">Inclusión Portal</p>
          </div>
        </motion.div>

        {/* NAVEGACIÓN CENTRAL (SOLO DESKTOP) */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-xl transition-all duration-200 text-[10px] font-bold uppercase tracking-wider ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon size={14} strokeWidth={isActive ? 2.5 : 2} />
                {item.label}
              </motion.button>
            );
          })}
        </div>

        {/* SECCIÓN DERECHA: Puntos + Usuario */}
        <div className="flex items-center gap-3">
          
          {/* Badge de Puntos (Solo si hay sesión activa) */}
          {isLoggedIn && (
            <div 
              className="hidden sm:flex items-center gap-1.5 bg-slate-50 py-1.5 px-3 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors"
              onClick={() => onNavigate('premios')}
            >
              <Star size={12} className="text-amber-500" fill="currentColor" />
              <span className="text-[10px] font-black text-slate-900">
                10,450 <span className="text-[#EE121A]">PTS</span>
              </span>
            </div>
          )}

          <div className="h-6 w-[1px] bg-slate-200 hidden md:block" />

          {/* Autenticación / Perfil de Usuario */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2 pl-1">
              <div className="text-right hidden sm:block">
                <p className="font-bold text-xs text-slate-900 leading-none">{displayName || 'Usuario'}</p>
                <p className="text-[8px] font-medium text-[#EE121A] uppercase">{role || 'Miembro'}</p>
              </div>
              <div className="relative w-8 h-8 rounded-xl bg-slate-100 overflow-hidden ring-2 ring-slate-50 group cursor-pointer shadow-sm">
                <img 
                  src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${displayName || 'Claro'}`} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button 
                onClick={onLogout}
                className="ml-1 p-2 text-slate-400 hover:text-[#EE121A] transition-colors"
                title="Cerrar Sesión"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate("login")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-[#EE121A] text-[10px] font-black uppercase tracking-wider hover:bg-[#EE121A] hover:text-white transition-all"
            >
              <LogIn size={14} strokeWidth={3} />
              Ingresar
            </motion.button>
          )}

          {/* Botón Menú Móvil */}
          <button 
            className="lg:hidden p-1.5 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MENÚ DESPLEGABLE PARA MÓVILES */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-[64px] left-0 w-full bg-white border-b border-slate-200 p-2 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-[11px] font-bold uppercase transition-colors ${
                    currentScreen === item.id 
                      ? 'bg-red-50 text-[#EE121A]' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
              
              {!isLoggedIn && (
                <button
                  onClick={() => { 
                    onNavigate("login"); 
                    setIsMobileMenuOpen(false); 
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-[11px] font-bold uppercase text-[#EE121A] bg-red-50 mt-2"
                >
                  <LogIn size={18} /> Ingresar al Portal
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
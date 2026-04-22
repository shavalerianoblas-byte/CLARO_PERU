import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  LayoutDashboard, 
  Gift, 
  Gamepad2, 
  Star, 
  Menu, 
  X, 
  BookOpen, 
  Shield, 
  LogIn, 
  LogOut, 
  Lock 
} from 'lucide-react';

const Navbar = ({ 
  currentScreen, 
  onNavigate, 
  isLoggedIn, 
  displayName, 
  role, 
  onLogout 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lógica de permisos para ver la Intranet
  const isOwnerOrEditor = role === "owner" || role === "coowner" || role === "editor";

  // Definición de ítems de navegación
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "premios", label: "Rewards Elite", icon: Gift },
    { id: "games", label: "Zona Gamer", icon: Gamepad2 },
    { id: "academia", label: "Academia", icon: BookOpen },
    { id: "denuncia", label: "Línea Ética", icon: Shield },
    // Solo se inyecta este ítem si tiene el rol adecuado
    ...(isOwnerOrEditor ? [{ id: "intranet", label: "Intranet / Editar", icon: Lock }] : []),
  ];

  const handleNavClick = (id) => {
    if (typeof onNavigate === 'function') {
      onNavigate(id);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 md:px-6 shadow-sm">
      <div className="max-w-[1600px] mx-auto h-full flex items-center justify-between">
        
        {/* LOGO CORPORATIVO */}
        <motion.div 
          className="flex items-center gap-2 group cursor-pointer shrink-0"
          whileHover={{ scale: 1.02 }}
          onClick={() => handleNavClick("dashboard")}
        >
          <div className="w-8 h-8 bg-[#EE121A] rounded-lg flex items-center justify-center text-white shadow-md transition-transform group-hover:rotate-6">
            <Globe size={16} strokeWidth={3} />
          </div>
          <div className="flex flex-col">
            <p className="font-black tracking-tighter leading-none text-[#EE121A]">CLARO</p>
            <p className="text-[7px] font-black text-[#EE121A] uppercase tracking-[0.2em]">Inclusión Portal</p>
          </div>
        </motion.div>

        {/* NAVEGACIÓN DESKTOP */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-xl transition-all duration-200 text-[10px] font-bold uppercase tracking-wider ${
                  isActive 
                    ? 'bg-[#EE121A] text-white shadow-md' 
                    : 'text-slate-500 hover:bg-red-50 hover:text-[#EE121A]'
                }`}
              >
                <Icon size={14} strokeWidth={isActive ? 2.5 : 2} />
                {item.label}
              </motion.button>
            );
          })}
        </div>

        {/* SECCIÓN DERECHA: PUNTOS Y PERFIL */}
        <div className="flex items-center gap-3">
          
          {isLoggedIn && (
            <div 
              className="hidden sm:flex items-center gap-1.5 bg-red-50 py-1.5 px-3 rounded-xl border border-red-100 cursor-pointer hover:bg-red-100 transition-colors"
              onClick={() => handleNavClick('premios')}
            >
              <Star size={12} className="text-[#EE121A]" fill="currentColor" />
              <span className="text-[10px] font-black text-slate-900">
                10,450 <span className="text-[#EE121A]">PTS</span>
              </span>
            </div>
          )}

          <div className="h-6 w-[1px] bg-slate-200 hidden md:block" />

          {isLoggedIn ? (
            <div className="flex items-center gap-2 pl-1">
              {/* Info del Usuario */}
              <div className="text-right hidden sm:block">
                <p className="font-bold text-xs text-slate-900 leading-none">
                  {displayName || 'Usuario'}
                </p>
                <p className="text-[8px] font-black text-[#EE121A] uppercase mt-1 tracking-wider">
                  {role || 'Cliente'}
                </p>
              </div>

              {/* Avatar dinámico */}
              <div className="relative w-9 h-9 rounded-xl bg-red-50 overflow-hidden ring-2 ring-red-100 shadow-sm group">
                <img 
                  src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${displayName || 'Claro'}`} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Botón Logout */}
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
              onClick={() => handleNavClick("login")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#EE121A] text-white text-[10px] font-black uppercase tracking-wider hover:bg-red-700 transition-all shadow-lg shadow-red-500/20"
            >
              <LogIn size={14} strokeWidth={3} />
              Ingresar
            </motion.button>
          )}

          {/* Menú hamburguesa (Móvil) */}
          <button 
            className="lg:hidden p-1.5 text-slate-600 hover:bg-red-50 hover:text-[#EE121A] rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-[64px] left-0 w-full bg-white border-b border-slate-200 p-2 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-1 p-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-[11px] font-bold uppercase transition-colors ${
                    currentScreen === item.id 
                      ? 'bg-[#EE121A] text-white' 
                      : 'text-slate-600 hover:bg-red-50 hover:text-[#EE121A]'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
              
              {isLoggedIn && (
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-[11px] font-bold uppercase text-red-600 hover:bg-red-50 mt-2 border-t border-slate-100"
                >
                  <LogOut size={18} /> Cerrar Sesión
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
import React from 'react';
import { 
  Home, BookOpen, Users2, Globe, Settings 
} from 'lucide-react';

/**
 * Componente Sidebar reutilizable para todas las páginas.
 * @param {string} activeTab - El ID de la pestaña actualmente activa.
 * @param {function} setActiveTab - Función para cambiar la pestaña activa.
 */
const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'inicio', icon: Home, label: 'Inicio' },
    { id: 'cursos', icon: BookOpen, label: 'Cursos' },
    { id: 'comunidad', icon: Users2, label: 'Comunidad' },
    { id: 'noticias', icon: Globe, label: 'Noticias' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-24 bg-white border-r border-gray-100 z-50 flex flex-col items-center py-10 shadow-sm">
      {/* Logo de Claro */}
      <div className="mb-12">
        <div className="w-14 h-14 bg-[#ee121a] rounded-[1.5rem] flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-red-100">
          <img src="/claro.png" alt="CLARO LOGO" />
        </div>
      </div>

      {/* Navegación Principal */}
      <nav className="flex flex-col gap-8 flex-1">
        {menuItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`group relative p-4 rounded-2xl transition-all ${
              activeTab === item.id 
                ? 'bg-red-50 text-[#ee121a]' 
                : 'text-gray-300 hover:text-gray-900'
            }`}
          >
            <item.icon 
              size={24} 
              strokeWidth={activeTab === item.id ? 2.5 : 2} 
            />
            
            {/* Tooltip al hacer hover */}
            <span className="absolute left-20 bg-black text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Botón de Configuración al final */}
      <button className="p-4 text-gray-300 hover:text-gray-900 transition-colors">
        <Settings size={24}/>
      </button>
    </aside>
  );
};

export default Sidebar;
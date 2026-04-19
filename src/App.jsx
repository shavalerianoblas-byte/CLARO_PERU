import React, { useState } from 'react';
import Navbar from './componentes/Navbar'; 
import NotFound from "./pages/NotFound";

// Secciones del Dashboard
import InclusionDashboard from './assets/InclusionDashboard';
import Logros from './assets/Logros';
import ZonaGamer from './componentes/ZonaGamer'; 
import SeccionDenuncia from './componentes/SeccionDenuncia';
import Equipo from './assets/Equipo';
import DEIAssistant from './componentes/DEIAssistant';
import Academia from './assets/Academia';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
      case 'inicio': // Ambos muestran el dashboard principal
        return <InclusionDashboard />;
      case 'premios':
        return <Logros />;
      case 'games': // Cambié 'juegos' por 'games' para que coincida con el ID del Navbar
        return <ZonaGamer />;
      case 'denuncia':
        return <SeccionDenuncia />;
      case 'equipo':
        return <Equipo />;
      case 'academia':
      case 'guia': // Añadí guía por si acaso
        return <Academia />;
    }
  };

  const handleNavigate = (destination) => {
    const tabMap = {
      'personal': 'dashboard',
      'equipo': 'equipo',
      'premios': 'premios',
      'games': 'games',
      'denuncia': 'denuncia',
      'academia': 'academia',
    };
    
    const targetTab = tabMap[destination] || 'dashboard';
    setActiveTab(targetTab);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      {/* 1. Ajuste de Props: Navbar ahora usa 'currentScreen' y 'onNavigate' */}
      <Navbar 
        currentScreen={activeTab} 
        onNavigate={setActiveTab} 
        isLoggedIn={true} // O el estado que manejes
        displayName="Shantall" 
      />
      
      <main className="flex-1 mt-16 p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
          {/* 2. EL CAMBIO CLAVE: Aquí es donde se inyecta el contenido */}
          {renderContent()}
        </div>
      </main>

      <DEIAssistant 
        currentView={activeTab === 'equipo' ? 'equipo' : 'personal'}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
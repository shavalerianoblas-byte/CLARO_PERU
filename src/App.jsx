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
        return <InclusionDashboard />;
      case 'premios':
        return <Logros />;
      case 'juegos':
        return <ZonaGamer />;
      case 'denuncia':
        return <SeccionDenuncia />;
      case 'equipo':
        return <Equipo />;
      case 'academia':
        return <Academia />;
      case 'inicio':
        return <InclusionDashboard />;
    }
  };

  // Función de navegación para el chatbot
  const handleNavigate = (destination) => {
    const tabMap = {
      'personal': 'dashboard',
      'equipo': 'equipo',
      'premios': 'premios',
      'juegos': 'juegos',
      'denuncia': 'denuncia',
      'academia': 'academia'
    };
    
    const targetTab = tabMap[destination] || 'dashboard';
    setActiveTab(targetTab);
  };

  return (
    <div className="flex min-h-screen bg-[#FDFDFD]">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 mt-16 p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
        </div>
      </main>

      {/* DEIAssistant a nivel de App para que persista entre vistas */}
      <DEIAssistant 
        currentView={activeTab === 'equipo' ? 'equipo' : 'personal'}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

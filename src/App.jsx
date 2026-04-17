import React, { useState } from 'react';
// IMPORTANTE: En tu imagen la carpeta se llama 'componentes' y 'assets'
import Navbar from './componentes/Navbar'; 
import InclusionDashboard from './assets/InclusionDashboard';
import Logros from './assets/Logros';
import ZonaGamer from './componentes/ZonaGamer'; 
import SeccionDenuncia from './componentes/SeccionDenuncia';

// Si quieres usar Academia.jsx que aparece en tu imagen:
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
      case 'academia': // Por si decides añadir la sección Academia
        return <Academia />;
      default:
        return <InclusionDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FDFDFD]">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* mt-16 es para que el contenido no quede debajo del Navbar fijo */}
      <main className="flex-1 mt-16 p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
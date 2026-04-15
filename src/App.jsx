import React, { useState } from 'react'; // <--- ESTA LÍNEA ES LA QUE FALTA
import Navbar from './componentes/Sidebar';
 import InclusionDashboard from './assets/InclusionDashboard';
 import Logros from './assets/Logros';

export default function App() {
  const [activeTab, setActiveTab] = useState('InclusionDashboard');

  return (
    <div className="flex min-h-screen bg-[#FDFDFD]">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 ml-20 xl:ml-72 min-h-screen">
        {activeTab === 'InclusionDashboard' ? (
          <InclusionDashboard /> 
        ) : (
          <Logros />
        )}
      </main>
    </div>
  );
}
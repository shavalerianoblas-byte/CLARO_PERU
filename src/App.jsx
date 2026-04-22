import React, { useState } from 'react';
import Navbar from './componentes/Navbar'; 
import LoginScreen from './screens/LoginScreen';

// Importación de tus Secciones
import InclusionDashboard from './assets/InclusionDashboard';
import Logros from './assets/Logros';
import ZonaGamer from './componentes/ZonaGamer'; 
import SeccionDenuncia from './componentes/SeccionDenuncia';
import IntranetScreen from './screens/IntranetScreen'; // Ajusta la ruta si es necesario
import Equipo from './assets/Equipo';
import DEIAssistant from './componentes/DEIAssistant';
import Academia from './assets/Academia';
import MiProgreso from './assets/MiProgreso';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Estado del usuario con nombre, email y rol
  const [user, setUser] = useState({
    nombre: "",
    email: "",
    role: "cliente" 
  });

  // --- LÓGICA DE ROLES ---
  const determineRole = (email) => {
    const OWNER_EMAIL = "shavalerianoblas@crackthecode.la";
    if (email.toLowerCase() === OWNER_EMAIL.toLowerCase()) {
      return "owner"; // Propietario con permisos de edición
    }
    return "cliente"; // Rol automático para todos los demás
  };

  const handleLogin = async (email, password, name) => {
    // Validamos el acceso
    setIsLoggedIn(true);
    setUser({
      nombre: name, // Nombre completo extraído del formulario
      email: email,
      role: determineRole(email) 
    });
    return null;
  };

  const handleSignUp = async (email, password, name) => {
    setIsLoggedIn(true);
    setUser({
      nombre: name,
      email: email,
      role: "cliente" // Nuevos registros siempre son clientes
    });
    return null;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({ nombre: "", email: "", role: "cliente" });
    setActiveTab('dashboard');
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
    setActiveTab(tabMap[destination] || 'dashboard');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <InclusionDashboard />;
      case 'premios': return <Logros />;
      case 'games': return <ZonaGamer user={user} />;
      case 'denuncia': return <SeccionDenuncia />;
      case 'equipo': return <Equipo />;
      case 'mi-progreso': return <MiProgreso onNavigate={handleNavigate} />;
      case 'academia': return <Academia />;
// En App.jsx, dentro de renderContent()
      case 'intranet': return <IntranetScreen user={user} role={user.role} />;
        default: return <InclusionDashboard />;
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} onSignUp={handleSignUp} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <Navbar 
        currentScreen={activeTab} 
        onNavigate={setActiveTab} 
        isLoggedIn={isLoggedIn} 
        displayName={user.nombre} 
        role={user.role} 
        onLogout={handleLogout}
      />
      
      <main className="flex-1 mt-16 p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
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
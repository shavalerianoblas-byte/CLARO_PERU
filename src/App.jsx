import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// UI Providers
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Componentes de Estructura
import Navbar from './componentes/Navbar'; 
import NotFound from "./pages/NotFound";

// Secciones del Dashboard
import InclusionDashboard from './assets/InclusionDashboard';
import Logros from './assets/Logros';
import ZonaGamer from './componentes/ZonaGamer'; 
import SeccionDenuncia from './componentes/SeccionDenuncia';
import Academia from './assets/Academia';

// Hooks / Auth (Ajusta la ruta según tu proyecto)
import { useAuth } from "@/hooks/useAuth"; 

const queryClient = new QueryClient();

/**
 * Layout Principal: Envuelve las rutas para mantener el Navbar 
 * siempre visible y el contenido centrado.
 */
const MainLayout = ({ children, currentScreen }) => {
  const { user, role, logout, isAuthenticated } = useAuth(); // Hook de tu sistema de auth

  return (
    <div className="flex min-h-screen bg-[#FDFDFD]">
      <Navbar 
        currentScreen={currentScreen} 
        onNavigate={(screen) => window.location.href = `/${screen}`} // O usa useNavigate de react-router
        isLoggedIn={isAuthenticated}
        displayName={user?.displayName || "Usuario"}
        role={role}
        onLogout={logout}
      />
      
      <main className="flex-1 mt-16 p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        <BrowserRouter>
          <Routes>
            {/* Redirección inicial */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Rutas del Dashboard envueltas en el Layout */}
            <Route path="/dashboard" element={
              <MainLayout currentScreen="dashboard">
                <InclusionDashboard />
              </MainLayout>
            } />

            <Route path="/premios" element={
              <MainLayout currentScreen="premios">
                <Logros />
              </MainLayout>
            } />

            <Route path="/games" element={
              <MainLayout currentScreen="games">
                <ZonaGamer />
              </MainLayout>
            } />

            <Route path="/denuncia" element={
              <MainLayout currentScreen="denuncia">
                <SeccionDenuncia />
              </MainLayout>
            } />

            <Route path="/guia" element={
              <MainLayout currentScreen="guia">
                <Academia />
              </MainLayout>
            } />

            {/* Ruta 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
import React, { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// --- IMPORTACIONES BASADAS EN TU ESTRUCTURA REAL ---
import Navbar from "../componentes/Navbar";
import InicioScreen from "../screens/InicioScreen";
import DashboardScreen from "../screens/DashboardScreen";
import GuiaScreen from "../screens/GuiaScreen";
import IntranetScreen from "../screens/IntranetScreen";
import LoginScreen from "../screens/LoginScreen";

// Componentes del archivo combinado (según tu código previo)
import { GamesHub, GameRunner, DenunciaForm } from "../screens/GamesAndDenuncia";

// Hooks (Carpeta 'hook' en singular según tu imagen)
import { useAuth } from "../hook/useAuth";

const Index = () => {
  // Estado de navegación
  const [screen, setScreen] = useState("inicio");
  
  // Estados para la lógica de juegos
  const [activeGame, setActiveGame] = useState(null);
  const [lastScore, setLastScore] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  
  const auth = useAuth();

  // Función de navegación con limpieza de scroll
  const navigate = useCallback((target) => {
    setScreen(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Manejadores de la Zona Gamer
  const handleSelectGame = useCallback((gameId) => {
    setActiveGame(gameId);
    setScreen("playing");
  }, []);

  const handleGameDone = useCallback((points) => {
    if (points === null) {
      setScreen("games");
      return;
    }
    setLastScore(points);
    setRefreshKey((k) => k + 1);
    setScreen("results");
  }, []);

  // Lógica de seguridad para Intranet
  const isOwnerOrEditor = auth.role === "propietario" || auth.role === "editor";

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-red-100 selection:text-red-600">
      {/* NAVBAR GLOBAL 
          Recibe los puntos del hook auth para el AnimatedCounter 
      */}
      <Navbar
        currentScreen={screen}
        onNavigate={navigate}
        isLoggedIn={!!auth.user}
        displayName={auth.displayName}
        role={auth.role}
        onLogout={auth.signOut}
        userPoints={auth.points || 0}
      />

      {/* ÁREA DE CONTENIDO PRINCIPAL */}
      <main className="pt-16 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen + (activeGame || "")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* RENDERIZADO CONDICIONAL DE PANTALLAS */}
            
            {screen === "inicio" && (
              <InicioScreen onStart={() => navigate("games")} user={auth.user} />
            )}

            {screen === "login" && (
              <LoginScreen
                onLogin={async (email, password) => {
                  const err = await auth.signIn(email, password);
                  if (!err) navigate("dashboard");
                  return err;
                }}
                onSignUp={async (email, password, name) => {
                  return await auth.signUp(email, password, name);
                }}
              />
            )}

            {screen === "games" && (
              <GamesHub 
                user={auth.user} 
                onSelectGame={handleSelectGame} 
                refreshKey={refreshKey} 
              />
            )}

            {screen === "playing" && activeGame && (
              <div className="container mx-auto px-4 py-8">
                <GameRunner 
                  gameId={activeGame} 
                  user={auth.user} 
                  onDone={handleGameDone} 
                />
              </div>
            )}

            {screen === "results" && (
              <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
                <motion.div 
                  initial={{ scale: 0.8 }} 
                  animate={{ scale: 1 }}
                  className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 max-w-md w-full"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Star size={40} fill="currentColor" />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 mb-2">¡EXCELENTE TRABAJO!</h2>
                  <p className="text-slate-500 mb-6">Has completado el desafío con éxito.</p>
                  
                  <div className="bg-slate-50 rounded-2xl py-6 mb-8">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Puntaje Obtenido</p>
                    <p className="text-5xl font-black text-red-600">{lastScore} <span className="text-sm">pts</span></p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <button 
                      onClick={() => navigate("games")}
                      className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-slate-800 transition-all shadow-lg"
                    >
                      JUGAR OTRA VEZ
                    </button>
                    <button 
                      onClick={() => navigate("dashboard")}
                      className="w-full bg-white text-slate-400 py-4 rounded-2xl font-bold hover:text-slate-900 transition-all"
                    >
                      Ir a mi Perfil
                    </button>
                  </div>
                </motion.div>
              </div>
            )}

            {screen === "dashboard" && (
              <DashboardScreen user={auth.user} />
            )}

            {screen === "guia" && (
              <GuiaScreen />
            )}

            {screen === "denuncia" && (
              <DenunciaForm user={auth.user} />
            )}

            {/* PROTECCIÓN DE RUTA PARA INTRANET */}
            {screen === "intranet" && (
              isOwnerOrEditor ? (
                <IntranetScreen userRole={auth.role} />
              ) : (
                <div className="p-20 text-center">
                   <p className="font-black text-red-600">No tienes permisos para acceder aquí.</p>
                   <button onClick={() => navigate("inicio")} className="mt-4 underline">Volver al inicio</button>
                </div>
              )
            )}

            {/* PANTALLA DE RECOMPENSAS */}
            {screen === "premios" && (
              <div className="min-h-[70vh] flex items-center justify-center">
                <div className="text-center">
                  <Gift size={60} className="mx-auto text-slate-200 mb-4" />
                  <h3 className="text-2xl font-black text-slate-300 italic uppercase">Próximamente: Rewards Elite</h3>
                  <p className="text-slate-400 text-sm mt-2">Canjea tus puntos por beneficios exclusivos de Claro.</p>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* FOOTER OPCIONAL */}
      <footer className="py-10 border-t bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            © 2026 Claro Perú - Inclusión y Diversidad
          </p>
          <div className="flex gap-6">
            <button onClick={() => navigate("guia")} className="text-[10px] font-black text-slate-400 hover:text-red-600 transition-colors uppercase">Ayuda</button>
            <button onClick={() => navigate("denuncia")} className="text-[10px] font-black text-slate-400 hover:text-red-600 transition-colors uppercase">Línea Ética</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
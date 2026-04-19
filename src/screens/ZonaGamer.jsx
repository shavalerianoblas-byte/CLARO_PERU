import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, Crown, Medal, Award, Star, 
  Gamepad2, Brain, Search, CheckSquare, 
  ArrowLeft, Info, TrendingUp, Users,
  ChevronRight
} from "lucide-react";
import { Card } from "@/componentes/ui/card";
import { Button } from "@/componentes/ui/button";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";

// Importación de los componentes de juegos (los crearemos en la nueva carpeta)
import TriviaGame from "@/componentes/juegos/TriviaGame";
import MemoramaGame from "@/componentes/juegos/MemoramaGame";
import SopaLetrasGame from "@/componentes/juegos/SopaLetrasGame";
import VerdaderoFalsoGame from "@/componentes/juegos/VerdaderoFalsoGame";

const ZonaGamer = ({ user }) => {
  const [activeGame, setActiveGame] = useState(null);
  const [ranking, setRanking] = useState([]);

  // Cargar Ranking en tiempo real
  useEffect(() => {
    const q = query(collection(db, "game_scores"), orderBy("score", "desc"), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRanking(data);
    });
    return () => unsubscribe();
  }, []);

  const gameList = [
    {
      id: "trivia",
      title: "Trivia DEI",
      desc: "Pon a prueba tus conocimientos sobre diversidad.",
      icon: <Brain className="text-blue-500" size={32} />,
      color: "border-blue-500",
      criterios: "100 pts por acierto + bono de rapidez (hasta 50 pts)."
    },
    {
      id: "memo",
      title: "Memorama",
      desc: "Encuentra los pares de conceptos clave.",
      icon: <Gamepad2 className="text-purple-500" size={32} />,
      color: "border-purple-500",
      criterios: "200 pts base - 10 pts por cada intento fallido."
    },
    {
      id: "sopa",
      title: "Sopa de Letras",
      desc: "Busca palabras sobre inclusión.",
      icon: <Search className="text-green-500" size={32} />,
      color: "border-green-500",
      criterios: "50 pts por palabra encontrada."
    },
    {
      id: "vf",
      title: "Verdadero o Falso",
      desc: "Decisiones rápidas sobre ética laboral.",
      icon: <CheckSquare className="text-orange-500" size={32} />,
      color: "border-orange-500",
      criterios: "80 pts por respuesta correcta."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* NAVBAR INTERNO ZONA GAMER */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#EE121A] p-1.5 rounded-lg">
              <Gamepad2 className="text-white" size={20} />
            </div>
            <span className="font-black text-xl tracking-tighter text-slate-900">CLARO GAMING <span className="text-[#EE121A]">DEI</span></span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Jugador</span>
              <span className="text-sm font-bold text-slate-700">{user?.displayName || user?.email?.split('@')[0] || "Invitado"}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center">
               <Users size={18} className="text-slate-400" />
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* COLUMNA IZQUIERDA: MENÚ DE JUEGOS O JUEGO ACTIVO */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {!activeGame ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="mb-8">
                    <h2 className="text-3xl font-black text-slate-900">¿LISTO PARA DESAFÍARTE?</h2>
                    <p className="text-slate-500 font-medium">Selecciona un módulo para comenzar a acumular puntos.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {gameList.map((game) => (
                      <Card 
                        key={game.id} 
                        className={`p-6 hover:shadow-xl transition-all cursor-pointer border-l-8 ${game.color} group relative overflow-hidden`}
                        onClick={() => setActiveGame(game.id)}
                      >
                        <div className="relative z-10">
                          <div className="mb-4">{game.icon}</div>
                          <h3 className="text-xl font-bold text-slate-800 mb-2">{game.title}</h3>
                          <p className="text-sm text-slate-500 mb-4">{game.desc}</p>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-[#EE121A] bg-red-50 w-fit px-2 py-1 rounded">
                            <Info size={12} /> {game.criterios}
                          </div>
                        </div>
                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-200 group-hover:text-[#EE121A] group-hover:translate-x-2 transition-all" size={40} />
                      </Card>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 min-h-[500px]"
                >
                  <Button 
                    variant="ghost" 
                    onClick={() => setActiveGame(null)}
                    className="mb-6 group text-slate-500 hover:text-[#EE121A]"
                  >
                    <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> Volver a la selección
                  </Button>
                  
                  {/* Renderizado de juegos individuales */}
                  {activeGame === "trivia" && <TriviaGame user={user} onFinish={() => setActiveGame(null)} />}
                  {activeGame === "memo" && <MemoramaGame user={user} onFinish={() => setActiveGame(null)} />}
                  {activeGame === "sopa" && <SopaLetrasGame user={user} onFinish={() => setActiveGame(null)} />}
                  {activeGame === "vf" && <VerdaderoFalsoGame user={user} onFinish={() => setActiveGame(null)} />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* COLUMNA DERECHA: RANKING GENERAL */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              
              {/* PANEL DE RANKING */}
              <Card className="overflow-hidden border-none shadow-xl bg-slate-900 text-white">
                <div className="bg-[#EE121A] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy size={20} />
                    <h3 className="font-black tracking-widest text-sm uppercase">Hall of Fame</h3>
                  </div>
                  <TrendingUp size={16} className="opacity-50" />
                </div>
                
                <div className="p-6 space-y-4">
                  {ranking.length > 0 ? (
                    ranking.map((player, index) => (
                      <div key={player.id} className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${
                            index === 0 ? "bg-yellow-400 text-slate-900" : 
                            index === 1 ? "bg-slate-300 text-slate-900" :
                            index === 2 ? "bg-orange-400 text-slate-900" : "bg-slate-800 text-slate-400"
                          }`}>
                            {index === 0 ? <Crown size={14} /> : index + 1}
                          </div>
                          <div>
                            <p className="text-sm font-bold truncate max-w-[120px]">{player.user_id?.substring(0, 8) || "Jugador"}</p>
                            <p className="text-[10px] text-slate-400 uppercase tracking-tighter">{player.game_type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-[#EE121A]">{player.score} pts</p>
                          <p className="text-[10px] text-slate-500">Acumulados</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-slate-500 text-xs py-10 italic">Aún no hay récords hoy...</p>
                  )}
                </div>
                
                <div className="bg-slate-800 p-4 text-center">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tus puntos ayudan a tu área</p>
                </div>
              </Card>

              {/* INFO DE EVALUACIÓN */}
              <Card className="p-6 border-slate-100 shadow-sm bg-blue-50/50">
                <h4 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                  <Star className="text-yellow-500 fill-yellow-500" size={16} /> Sistema de Evaluación
                </h4>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-xs text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 shrink-0" />
                    <span><b>Velocidad:</b> Los juegos de trivia y V/F bonifican si respondes en menos de 5 segundos.</span>
                  </li>
                  <li className="flex gap-3 text-xs text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1 shrink-0" />
                    <span><b>Precisión:</b> En el memorama, cada error resta puntos de la base máxima de 200.</span>
                  </li>
                  <li className="flex gap-3 text-xs text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1 shrink-0" />
                    <span><b>Persistencia:</b> Completar la sopa de letras al 100% otorga un multiplicador de x1.2.</span>
                  </li>
                </ul>
              </Card>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ZonaGamer;
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, Crown, Star, Gamepad2, Brain, Search, 
  CheckSquare, ArrowLeft, Info, TrendingUp, Users,
  ChevronRight
} from "lucide-react";

// --- CONFIGURACIÓN DE FIREBASE (Asegúrate de que la ruta sea correcta) ---
// Si no tienes el archivo firebase.js aún, comenta las líneas de Firebase
// import { db } from "../lib/firebase";
// import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";

// --- COMPONENTES UI LOCALES (Reemplazan a @/components/ui) ---
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, className = "", variant = "default" }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-bold transition-all duration-200 flex items-center justify-center disabled:opacity-50";
  const variants = {
    default: "bg-[#EE121A] text-white hover:bg-red-700 shadow-md",
    outline: "border border-slate-200 text-slate-700 hover:bg-slate-50",
    ghost: "text-slate-500 hover:bg-slate-100",
    secondary: "bg-slate-900 text-white hover:bg-slate-800"
  };
  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

// --- COMPONENTES DE JUEGOS (Placeholders para que no de error) ---
const TriviaGame = ({ onFinish }) => (
  <div className="text-center py-10">
    <Brain size={48} className="mx-auto mb-4 text-blue-500" />
    <h3 className="text-xl font-bold mb-4">Módulo Trivia DEI</h3>
    <p className="mb-6">Carga aquí la lógica de tus preguntas...</p>
    <Button onClick={onFinish}>Simular Finalización</Button>
  </div>
);

const MemoramaGame = ({ onFinish }) => (
  <div className="text-center py-10">
    <Gamepad2 size={48} className="mx-auto mb-4 text-purple-500" />
    <h3 className="text-xl font-bold mb-4">Módulo Memorama</h3>
    <Button onClick={onFinish}>Simular Finalización</Button>
  </div>
);

// --- COMPONENTE PRINCIPAL ---
const ZonaGamer = ({ user }) => {
  const [activeGame, setActiveGame] = useState(null);
  const [ranking, setRanking] = useState([
    { id: 1, user_id: "User_452", score: 1250, game_type: "trivia" },
    { id: 2, user_id: "Dev_Girl", score: 1100, game_type: "memo" },
    { id: 3, user_id: "Claro_Admin", score: 950, game_type: "sopa" },
  ]);

  // Efecto para Firebase (Comentado hasta que tengas tu db configurada)
  /*
  useEffect(() => {
    const q = query(collection(db, "game_scores"), orderBy("score", "desc"), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRanking(data);
    });
    return () => unsubscribe();
  }, []);
  */

  const gameList = [
    {
      id: "trivia",
      title: "Trivia DEI",
      desc: "Pon a prueba tus conocimientos sobre diversidad.",
      icon: <Brain className="text-blue-500" size={32} />,
      color: "border-blue-500",
      criterios: "100 pts por acierto + bono"
    },
    {
      id: "memo",
      title: "Memorama",
      desc: "Encuentra los pares de conceptos clave.",
      icon: <Gamepad2 className="text-purple-500" size={32} />,
      color: "border-purple-500",
      criterios: "200 pts base - errores"
    },
    {
      id: "sopa",
      title: "Sopa de Letras",
      desc: "Busca palabras sobre inclusión.",
      icon: <Search className="text-green-500" size={32} />,
      color: "border-green-500",
      criterios: "50 pts por palabra"
    },
    {
      id: "vf",
      title: "Verdadero o Falso",
      desc: "Decisiones rápidas sobre ética.",
      icon: <CheckSquare className="text-orange-500" size={32} />,
      color: "border-orange-500",
      criterios: "80 pts por acierto"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* NAVBAR */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#EE121A] p-1.5 rounded-lg">
              <Gamepad2 className="text-white" size={20} />
            </div>
            <span className="font-black text-xl tracking-tighter text-slate-900">
              CLARO GAMING <span className="text-[#EE121A]">DEI</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Jugador</span>
              <span className="text-sm font-bold text-slate-700">{user?.displayName || "Invitado"}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
               <Users size={18} className="text-slate-400" />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* COLUMNA IZQUIERDA */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {!activeGame ? (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="mb-8">
                    <h2 className="text-3xl font-black text-slate-900">¿LISTO PARA DESAFÍARTE?</h2>
                    <p className="text-slate-500 font-medium">Selecciona un módulo para comenzar a acumular puntos.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {gameList.map((game) => (
                      <Card key={game.id} className={`p-6 border-l-8 ${game.color} hover:shadow-lg transition-all cursor-pointer group relative`}>
                        <div onClick={() => setActiveGame(game.id)}>
                          <div className="mb-4">{game.icon}</div>
                          <h3 className="text-xl font-bold text-slate-800 mb-2">{game.title}</h3>
                          <p className="text-sm text-slate-500 mb-4">{game.desc}</p>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-[#EE121A] bg-red-50 w-fit px-2 py-1 rounded">
                            <Info size={12} /> {game.criterios}
                          </div>
                        </div>
                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-200 group-hover:text-[#EE121A] transition-all" size={30} />
                      </Card>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="game"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 min-h-[500px]"
                >
                  <Button variant="ghost" onClick={() => setActiveGame(null)} className="mb-6 group">
                    <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> Volver
                  </Button>
                  
                  {activeGame === "trivia" && <TriviaGame onFinish={() => setActiveGame(null)} />}
                  {activeGame === "memo" && <MemoramaGame onFinish={() => setActiveGame(null)} />}
                  {/* Resto de juegos aquí */}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* COLUMNA DERECHA: RANKING */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <Card className="bg-slate-900 text-white border-none shadow-2xl">
                <div className="bg-[#EE121A] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy size={18} />
                    <h3 className="font-black tracking-widest text-xs uppercase">Hall of Fame</h3>
                  </div>
                  <TrendingUp size={16} className="opacity-50" />
                </div>
                
                <div className="p-6 space-y-4">
                  {ranking.map((player, index) => (
                    <div key={player.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-md flex items-center justify-center font-black text-xs ${
                          index === 0 ? "bg-yellow-400 text-slate-900" : "bg-slate-800 text-slate-400"
                        }`}>
                          {index === 0 ? <Crown size={14} /> : index + 1}
                        </div>
                        <div>
                          <p className="text-sm font-bold truncate w-24">{player.user_id}</p>
                          <p className="text-[9px] text-slate-500 uppercase">{player.game_type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-[#EE121A]">{player.score} pts</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-slate-800/50 p-4 text-center">
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Live Stats</p>
                </div>
              </Card>

              <Card className="p-6 bg-blue-50 border-blue-100 shadow-none">
                <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                  <Star className="text-yellow-500 fill-yellow-500" size={16} /> Evaluación
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Los puntos se calculan basados en precisión y velocidad. ¡Mantente atento a los bonos por racha!
                </p>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ZonaGamer;
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, RefreshCcw, Brain, CheckCircle2, Zap, HelpCircle } from "lucide-react";
import { Card } from "@/componentes/ui/card";
import { Button } from "@/componentes/ui/button";
import { db } from "@/lib/firebase";
import { doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import confetti from "canvas-confetti";
import { toast } from "sonner";

const MemoramaGame = ({ user, onFinish }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // 1. Cargar Configuración del Editor
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const docRef = doc(db, "config_juegos", "memorama_dei");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const { parejas } = docSnap.data(); // Parejas es un array de { texto: "A", par: "B" }
          prepareGame(parejas);
        }
      } catch (error) {
        toast.error("Error al cargar el memorama");
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  // 2. Preparar y Mezclar las Cartas
  const prepareGame = (parejas) => {
    const allCards = [];
    parejas.forEach((p, index) => {
      // Creamos dos cartas por cada pareja con el mismo matchId
      allCards.push({ id: `a-${index}`, content: p.texto, matchId: index });
      allCards.push({ id: `b-${index}`, content: p.par, matchId: index });
    });
    
    // Algoritmo de barajado aleatorio
    setCards(allCards.sort(() => Math.random() - 0.5));
  };

  // 3. Lógica de Volteo
  const handleFlip = (id) => {
    if (disabled || flipped.includes(id) || solved.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      setMoves(m => m + 1);
      checkMatch(newFlipped);
    }
  };

  const checkMatch = (currentFlipped) => {
    const [id1, id2] = currentFlipped;
    const card1 = cards.find(c => c.id === id1);
    const card2 = cards.find(c => c.id === id2);

    if (card1.matchId === card2.matchId) {
      // ¡ES CORRECTO!
      setSolved(prev => [...prev, id1, id2]);
      setScore(s => s + 200);
      toast.success("¡Pareja encontrada!", { icon: "🔥" });
      resetTurn();
    } else {
      // ES INCORRECTO
      setTimeout(() => {
        setScore(s => Math.max(0, s - 10)); // Penalización por error
        resetTurn();
      }, 1000);
    }
  };

  const resetTurn = () => {
    setFlipped([]);
    setDisabled(false);
  };

  // 4. Finalizar Juego
  useEffect(() => {
    if (cards.length > 0 && solved.length === cards.length) {
      finalizarJuego();
    }
  }, [solved, cards]);

  const finalizarJuego = async () => {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    try {
      await addDoc(collection(db, "game_scores"), {
        user_id: user?.uid || "invitado",
        game_type: "memorama",
        score: score,
        movimientos: moves,
        created_at: serverTimestamp()
      });
    } catch (e) { console.error(e); }
  };

  if (loading) return <div className="p-20 text-center font-black">Cargando tablero...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-800">MEMORAMA DEI</h2>
          <p className="text-slate-500 font-bold">Encuentra los pares de conceptos</p>
        </div>
        <div className="text-right">
          <div className="bg-slate-900 text-white px-6 py-2 rounded-2xl">
            <p className="text-[10px] text-slate-400 uppercase font-black">Puntos</p>
            <p className="text-2xl font-black text-yellow-400">{score}</p>
          </div>
        </div>
      </div>

      {/* Grid Dinámico: Se ajusta según la cantidad de cartas */}
      <div className={`grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`}>
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id) || solved.includes(card.id);
          const isSolved = solved.includes(card.id);

          return (
            <motion.div
              key={card.id}
              whileHover={{ scale: isFlipped ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFlip(card.id)}
              className="perspective-1000 cursor-pointer h-32"
            >
              <div className={`relative w-full h-full transition-all duration-500 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}>
                {/* Cara Frontal (Oculta) */}
                <div className="absolute inset-0 bg-white border-4 border-slate-100 rounded-2xl flex items-center justify-center backface-hidden shadow-sm">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center">
                    <HelpCircle className="text-slate-200" size={30} />
                  </div>
                </div>

                {/* Cara Trasera (Revelada) */}
                <div className={`absolute inset-0 rotate-y-180 backface-hidden rounded-2xl flex items-center justify-center p-4 text-center shadow-xl border-b-8 ${
                  isSolved ? "bg-green-500 border-green-700 text-white" : "bg-white border-[#EE121A] text-slate-800"
                }`}>
                  <span className="text-xs md:text-sm font-black leading-tight">
                    {card.content}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {solved.length === cards.length && cards.length > 0 && (
        <div className="mt-12 text-center">
          <Button onClick={onFinish} className="bg-slate-900 text-white px-10 h-14 rounded-2xl font-black">
            CONTINUAR
          </Button>
        </div>
      )}
    </div>
  );
};

export default MemoramaGame;
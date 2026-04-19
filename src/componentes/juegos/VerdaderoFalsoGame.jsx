import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, X, HelpCircle, Trophy, 
  AlertCircle, Sparkles, Loader2, Lightbulb 
} from "lucide-react";
import { Card } from "@/componentes/ui/card";
import { Button } from "@/componentes/ui/button";
import { db } from "@/lib/firebase";
import { doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import confetti from "canvas-confetti";

const VerdaderoFalsoGame = ({ user, onFinish }) => {
  const [preguntas, setPreguntas] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null); // null | boolean
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // 1. Cargar desde Firebase
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const docRef = doc(db, "config_juegos", "vf_dei");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPreguntas(docSnap.data().preguntas || []);
        }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchConfig();
  }, []);

  const handleAnswer = (answer) => {
    if (selected !== null) return;
    setSelected(answer);

    const esCorrecto = answer === preguntas[currentIdx].esVerdadero;
    if (esCorrecto) {
      setScore(s => s + 100);
    }
  };

  const nextQuestion = () => {
    if (currentIdx + 1 < preguntas.length) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
    } else {
      finalizar();
    }
  };

  const finalizar = async () => {
    setIsFinished(true);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    await addDoc(collection(db, "game_scores"), {
      user_id: user?.uid || "invitado",
      game_type: "verdadero_falso",
      score: score,
      created_at: serverTimestamp()
    });
  };

  if (loading) return <div className="p-20 text-center animate-spin"><Loader2 size={40} className="mx-auto text-red-500" /></div>;
  if (preguntas.length === 0) return <div className="p-20 text-center">No hay preguntas configuradas.</div>;

  const actual = preguntas[currentIdx];

  return (
    <div className="max-w-xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center px-4">
        <div className="text-sm font-black text-slate-400 uppercase tracking-widest">
          Desafío {currentIdx + 1} / {preguntas.length}
        </div>
        <div className="bg-slate-900 text-yellow-400 px-4 py-1 rounded-full font-black flex items-center gap-2">
          <Trophy size={14} /> {score} PTS
        </div>
      </div>

      {/* AFIRMACIÓN */}
      <Card className="p-10 border-none shadow-2xl rounded-[3rem] bg-white text-center relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <HelpCircle size={40} />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight">
            {actual.afirmacion}
          </h2>
        </div>
        <Sparkles className="absolute -top-10 -left-10 text-slate-50" size={200} />
      </Card>

      {/* BOTONES DE RESPUESTA */}
      <div className="grid grid-cols-2 gap-6">
        <AnimatePresence mode="wait">
          {selected === null ? (
            <>
              <motion.button
                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                onClick={() => handleAnswer(true)}
                className="group relative h-32 bg-white border-2 border-slate-100 hover:border-green-500 rounded-[2rem] flex flex-col items-center justify-center transition-all hover:shadow-xl hover:shadow-green-100"
              >
                <div className="bg-green-100 text-green-600 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <Check size={30} strokeWidth={3} />
                </div>
                <span className="mt-2 font-black text-slate-700 uppercase tracking-tighter">Verdadero</span>
              </motion.button>

              <motion.button
                initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                onClick={() => handleAnswer(false)}
                className="group relative h-32 bg-white border-2 border-slate-100 hover:border-red-500 rounded-[2rem] flex flex-col items-center justify-center transition-all hover:shadow-xl hover:shadow-red-100"
              >
                <div className="bg-red-100 text-red-600 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <X size={30} strokeWidth={3} />
                </div>
                <span className="mt-2 font-black text-slate-700 uppercase tracking-tighter">Falso</span>
              </motion.button>
            </>
          ) : (
            /* FEEDBACK EXPLICATIVO */
            <motion.div 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="col-span-2"
            >
              <Card className={`p-8 border-none rounded-[2.5rem] shadow-2xl ${
                selected === actual.esVerdadero ? "bg-green-500 text-white" : "bg-red-500 text-white"
              }`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-white/20 p-3 rounded-2xl">
                    {selected === actual.esVerdadero ? <Sparkles /> : <AlertCircle />}
                  </div>
                  <h3 className="text-2xl font-black uppercase">
                    {selected === actual.esVerdadero ? "¡Correcto!" : "¡Oh, no!"}
                  </h3>
                </div>
                
                <div className="bg-black/10 p-6 rounded-2xl mb-6 backdrop-blur-sm">
                  <p className="font-bold text-lg leading-relaxed">
                    {actual.explicacion}
                  </p>
                </div>

                <Button 
                  onClick={nextQuestion}
                  className="w-full bg-white text-slate-900 hover:bg-slate-100 h-14 rounded-2xl font-black shadow-lg"
                >
                  {currentIdx + 1 === preguntas.length ? "FINALIZAR" : "SIGUIENTE PREGUNTA"}
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VerdaderoFalsoGame;
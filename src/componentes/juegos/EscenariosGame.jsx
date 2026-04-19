import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserCircle2, MessageSquare, ShieldCheck, 
  AlertTriangle, ArrowRight, Lightbulb, Trophy 
} from "lucide-react";
import { Card } from "@/componentes/ui/card";
import { Button } from "@/componentes/ui/button";
import { db } from "@/lib/firebase";
import { doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";

const EscenariosGame = ({ user, onFinish }) => {
  const [escenarios, setEscenarios] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedPath, setSelectedPath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchEscenarios = async () => {
      const docRef = doc(db, "config_juegos", "escenarios_dei");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setEscenarios(docSnap.data().casos || []);
      }
      setLoading(false);
    };
    fetchEscenarios();
  }, []);

  const handleDecision = (pathIndex) => {
    setSelectedPath(pathIndex);
    if (pathIndex === escenarios[currentIdx].opcionCorrecta) {
      setScore(s => s + 300); // Los escenarios dan más puntos por ser análisis
    }
  };

  const nextStep = () => {
    if (currentIdx + 1 < escenarios.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedPath(null);
    } else {
      finalizar();
    }
  };

  const finalizar = async () => {
    await addDoc(collection(db, "game_scores"), {
      user_id: user?.uid || "invitado",
      game_type: "escenarios",
      score: score,
      created_at: serverTimestamp()
    });
    onFinish();
  };

  if (loading) return <div className="p-20 text-center font-black animate-pulse">Cargando Escenarios...</div>;
  if (escenarios.length === 0) return <div className="p-20 text-center font-bold text-slate-400">No hay escenarios configurados.</div>;

  const actual = escenarios[currentIdx];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* CABECERA DEL ESCENARIO */}
      <div className="flex justify-between items-end mb-4 px-2">
        <span className="text-[10px] font-black bg-slate-100 px-3 py-1 rounded-full text-slate-500 uppercase tracking-[0.2em]">
          Caso Práctico {currentIdx + 1} de {escenarios.length}
        </span>
        <div className="flex items-center gap-2 text-[#EE121A] font-black">
          <Trophy size={18} />
          <span>{score} pts</span>
        </div>
      </div>

      {/* NARRATIVA / CONTEXTO */}
      <Card className="p-8 border-none bg-slate-900 text-white rounded-[2rem] shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex gap-6 items-start">
          <div className="bg-[#EE121A] p-4 rounded-2xl shrink-0 shadow-lg">
            <MessageSquare size={32} />
          </div>
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold leading-tight">
              {actual.titulo}
            </h2>
            <p className="text-slate-300 text-lg italic">
              "{actual.contexto}"
            </p>
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 opacity-10">
          <UserCircle2 size={250} />
        </div>
      </Card>

      {/* OPCIONES DE DECISIÓN */}
      <div className="grid gap-4">
        <AnimatePresence mode="wait">
          {selectedPath === null ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid gap-3"
            >
              {actual.opciones.map((opt, idx) => (
                <Button
                  key={idx}
                  onClick={() => handleDecision(idx)}
                  variant="outline"
                  className="h-auto p-5 text-left flex justify-between group hover:border-[#EE121A] border-2 rounded-2xl"
                >
                  <span className="font-bold text-slate-700">{opt}</span>
                  <ArrowRight size={20} className="text-slate-200 group-hover:text-[#EE121A] transition-colors" />
                </Button>
              ))}
            </motion.div>
          ) : (
            /* FEEDBACK DETALLADO */
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <Card className={`p-8 border-none shadow-xl rounded-[2rem] ${
                selectedPath === actual.opcionCorrecta ? "bg-green-50" : "bg-red-50"
              }`}>
                <div className="flex gap-4 mb-4">
                  {selectedPath === actual.opcionCorrecta ? (
                    <ShieldCheck className="text-green-600" size={40} />
                  ) : (
                    <AlertTriangle className="text-red-600" size={40} />
                  )}
                  <div>
                    <h3 className={`text-xl font-black ${
                      selectedPath === actual.opcionCorrecta ? "text-green-700" : "text-red-700"
                    }`}>
                      {selectedPath === actual.opcionCorrecta ? "¡Decisión Correcta!" : "Resultado No Deseado"}
                    </h3>
                    <p className="font-bold text-slate-600">Has elegido: {actual.opciones[selectedPath]}</p>
                  </div>
                </div>
                
                <div className="bg-white/50 p-6 rounded-2xl border border-white mb-6">
                  <p className="text-slate-700 leading-relaxed">
                    {actual.feedbacks[selectedPath]}
                  </p>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl text-white flex gap-4 items-center">
                  <Lightbulb className="text-yellow-400 shrink-0" size={24} />
                  <p className="text-sm font-medium">
                    <span className="font-black text-yellow-400 uppercase text-[10px] block mb-1">Consejo DEI</span>
                    {actual.consejoFinal}
                  </p>
                </div>

                <Button 
                  onClick={nextStep}
                  className="w-full mt-8 bg-[#EE121A] hover:bg-red-700 text-white h-14 rounded-2xl font-black shadow-lg"
                >
                  {currentIdx + 1 === escenarios.length ? "VER RESULTADOS FINALES" : "SIGUIENTE ESCENARIO"}
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EscenariosGame;
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Timer, CheckCircle2, XCircle, Sparkles, 
  Lightbulb, Trophy, Zap, Loader2 
} from "lucide-react";
import { Card } from "@/componentes/ui/card";
import { Button } from "@/componentes/ui/button";
import { db } from "@/lib/firebase";
import { doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import confetti from "canvas-confetti";
import { toast } from "sonner";

const TriviaGame = ({ user, onFinish }) => {
  // Estados de carga y datos de Firebase
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);

  // Estados del juego
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isFinished, setIsFinished] = useState(false);
  const [respuestasLog, setRespuestasLog] = useState([]); // Para las estadísticas del admin

  // 1. Cargar la configuración dinámica desde la Intranet (Firebase)
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const docRef = doc(db, "config_juegos", "trivia_dei");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPreguntas(data.preguntas || []);
          setVisible(data.visible ?? true);
        }
      } catch (error) {
        toast.error("Error al conectar con el servidor de juegos");
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  // 2. Temporizador
  useEffect(() => {
    if (isFinished || selectedOption !== null || loading || !visible) return;
    if (timeLeft <= 0) {
      handleSelect(null); // Tiempo agotado
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isFinished, selectedOption, loading, visible]);

  // 3. Manejar la selección de respuesta
  const handleSelect = (index) => {
    if (selectedOption !== null) return;

    const preguntaActual = preguntas[currentIdx];
    const esCorrecto = index === preguntaActual.correcta;
    
    setSelectedOption(index);
    setShowFeedback(true);

    // Guardar log de esta pregunta para el admin
    setRespuestasLog([...respuestasLog, {
      pregunta: preguntaActual.titulo,
      contestó: index !== null ? preguntaActual.opciones[index] : "Tiempo agotado",
      fueCorrecto: esCorrecto,
      tiempoRespuesta: 20 - timeLeft
    }]);

    if (esCorrecto) {
      // Puntos: 100 base + bono de tiempo
      const bono = Math.round(timeLeft * 2.5);
      setScore(s => s + 100 + bono);
    }
  };

  const nextQuestion = async () => {
    if (currentIdx + 1 < preguntas.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      setTimeLeft(20);
    } else {
      await finalizarJuego();
    }
  };

  const finalizarJuego = async () => {
    setIsFinished(true);
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#EE121A', '#000000'] });

    try {
      // Guardamos el puntaje y el detalle para que el Admin lo vea
      await addDoc(collection(db, "game_scores"), {
        user_id: user?.uid || "invitado",
        display_name: user?.displayName || user?.email?.split('@')[0] || "Colaborador",
        game_type: "trivia",
        score: score,
        detalleRespuestas: respuestasLog,
        created_at: serverTimestamp()
      });
    } catch (e) {
      console.error("Error al guardar record:", e);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 space-y-4">
      <Loader2 className="animate-spin text-[#EE121A]" size={40} />
      <p className="font-bold text-slate-400">Preparando desafío...</p>
    </div>
  );

  if (!visible || preguntas.length === 0) return (
    <div className="text-center p-20">
      <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Zap className="text-slate-400" />
      </div>
      <h3 className="font-black text-slate-800">MÓDULO EN MANTENIMIENTO</h3>
      <p className="text-slate-500 text-sm">El editor está actualizando las preguntas. Vuelve pronto.</p>
      <Button onClick={onFinish} variant="ghost" className="mt-6 text-[#EE121A]">Volver</Button>
    </div>
  );

  if (isFinished) return (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-10">
      <div className="w-24 h-24 bg-yellow-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl rotate-3">
        <Trophy size={48} className="text-white" />
      </div>
      <h2 className="text-4xl font-black text-slate-900 mb-2">¡EXCELENTE TRABAJO!</h2>
      <p className="text-slate-500 mb-8 font-medium">Has completado el módulo de Trivia DEI</p>
      <div className="bg-slate-900 inline-block px-10 py-4 rounded-3xl text-white mb-10">
        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Puntaje Total</span>
        <span className="text-5xl font-black text-yellow-400">{score}</span>
      </div>
      <br />
      <Button onClick={onFinish} className="bg-[#EE121A] hover:bg-red-700 text-white h-14 px-12 rounded-2xl font-black shadow-lg shadow-red-200">
        FINALIZAR JUEGO
      </Button>
    </motion.div>
  );

  const preguntaActual = preguntas[currentIdx];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header con Progreso y Tiempo */}
      <div className="flex items-center justify-between px-2">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pregunta {currentIdx + 1} de {preguntas.length}</p>
          <div className="flex gap-1">
            {preguntas.map((_, i) => (
              <div key={i} className={`h-1.5 w-6 rounded-full transition-all ${i <= currentIdx ? "bg-[#EE121A]" : "bg-slate-200"}`} />
            ))}
          </div>
        </div>
        <div className={`flex items-center gap-2 font-black text-xl ${timeLeft < 5 ? "text-red-500 animate-pulse" : "text-slate-700"}`}>
          <Timer size={20} />
          {timeLeft}s
        </div>
      </div>

      {/* Cuadro de la Pregunta */}
      <Card className="p-8 border-none bg-white shadow-xl rounded-[2.5rem] relative overflow-hidden border-b-8 border-slate-100">
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight relative z-10">
          {preguntaActual.titulo}
        </h2>
        <Sparkles className="absolute -bottom-10 -right-10 text-slate-50" size={180} />
      </Card>

      {/* Alternativas */}
      <div className="grid gap-3">
        {preguntaActual.opciones.map((opcion, index) => {
          const isSelected = selectedOption === index;
          const isCorrect = index === preguntaActual.correcta;
          
          let style = "bg-white border-slate-100 text-slate-600 hover:border-red-200";
          if (selectedOption !== null) {
            if (isCorrect) style = "bg-green-500 border-green-600 text-white shadow-lg shadow-green-200";
            else if (isSelected) style = "bg-red-500 border-red-600 text-white shadow-lg shadow-red-200";
            else style = "opacity-40 border-slate-50 bg-white";
          }

          return (
            <motion.button
              key={index}
              disabled={selectedOption !== null}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(index)}
              className={`p-5 rounded-2xl border-2 text-left font-bold transition-all flex justify-between items-center ${style}`}
            >
              <span>{opcion}</span>
              {selectedOption !== null && isCorrect && <CheckCircle2 size={20} />}
              {selectedOption !== null && isSelected && !isCorrect && <XCircle size={20} />}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback (Consejos) */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className={`p-6 border-none shadow-2xl rounded-3xl ${
              selectedOption === preguntaActual.correcta ? "bg-green-50" : "bg-amber-50"
            }`}>
              <div className="flex gap-4">
                <div className={`p-3 rounded-2xl shrink-0 h-fit ${
                  selectedOption === preguntaActual.correcta ? "bg-green-500" : "bg-amber-500"
                }`}>
                  {selectedOption === preguntaActual.correcta ? <Sparkles className="text-white" /> : <Lightbulb className="text-white" />}
                </div>
                <div>
                  <h4 className={`font-black uppercase text-xs tracking-widest ${
                    selectedOption === preguntaActual.correcta ? "text-green-600" : "text-amber-600"
                  }`}>
                    {selectedOption === preguntaActual.correcta ? "¡Acierto Total!" : "Dato de Aprendizaje"}
                  </h4>
                  <p className="text-slate-700 text-sm mt-2 leading-relaxed font-medium">
                    {selectedOption === preguntaActual.correcta 
                      ? preguntaActual.textoCorrecto 
                      : preguntaActual.consejoIncorrecto}
                  </p>
                  <Button onClick={nextQuestion} className="mt-4 bg-slate-900 text-white w-full h-10 rounded-xl font-bold">
                    Siguiente Pregunta
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TriviaGame;
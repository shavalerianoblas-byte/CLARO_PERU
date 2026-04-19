import { motion } from "framer-motion";
import { useState } from "react";
import Particles from "@/componentes/Particles"; 
import { ArrowRight, Sparkles, Heart, Users } from "lucide-react";
import CommentsSection from "../componentes/CommentsSection";
import { db, auth } from "../lib/firebase"; 

const hoverPhrases = [
  "Esto pasa más de lo que crees",
  "¿Qué harías tú?",
  "Tu voz importa",
  "El cambio empieza aquí",
];

const InicioScreen = ({ onStart, user }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [showPhrase, setShowPhrase] = useState(false);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-slate-50">
      {/* Fondo con gradiente sutil estilo Claro */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent animate-gradient" />
      <Particles />

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-[#EE121A]/10 text-[#EE121A] px-4 py-2 rounded-full text-sm font-bold mb-6 border border-[#EE121A]/20"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles size={16} />
            Experiencia Interactiva DEI
          </motion.div>

          <h1 className="font-black text-4xl sm:text-5xl md:text-7xl leading-tight mb-6 text-slate-900">
            CRACK THE CODE{" "}
            <span className="text-[#EE121A]">DE LA INCLUSIÓN</span>
          </h1>

          <p className="text-slate-500 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Pon a prueba tu empatía con situaciones reales. Descubre cómo tus acciones
            impactan la diversidad e inclusión en nuestra cultura.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStart}
              onMouseEnter={() => {
                setShowPhrase(true);
                setPhraseIndex((prev) => (prev + 1) % hoverPhrases.length);
              }}
              onMouseLeave={() => setShowPhrase(false)}
              className="relative bg-[#EE121A] text-white font-black text-lg px-10 py-4 rounded-2xl shadow-xl shadow-red-500/30 hover:shadow-red-500/40 transition-all flex items-center gap-3"
            >
              Comenzar Juegos
              <ArrowRight size={20} />
            </motion.button>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: showPhrase ? 1 : 0, y: showPhrase ? 0 : 10 }}
            className="mt-6 text-[#EE121A] font-bold italic text-sm"
          >
            "{hoverPhrases[phraseIndex]}"
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 gap-4 md:gap-8 mt-16 max-w-md mx-auto"
          >
            {[
              { icon: Users, label: "Situaciones", value: "5+" },
              { icon: Heart, label: "Juegos", value: "5" },
              { icon: Sparkles, label: "Impacto", value: "Real" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="text-center p-4 rounded-2xl bg-white shadow-sm border border-slate-100"
              >
                <stat.icon className="mx-auto mb-2 text-[#EE121A]" size={24} />
                <div className="font-black text-lg text-slate-900">{stat.value}</div>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Sección de Comentarios */}
        <div className="max-w-2xl mx-auto mt-20">
          <CommentsSection user={user} />
        </div>
      </div>
    </div>
  );
};

export default InicioScreen;
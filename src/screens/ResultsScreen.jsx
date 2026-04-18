import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { triviaQuestions, getLevel } from "@/data/triviaData";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Trophy, RotateCcw, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

interface Props {
  score: number;
  onRestart: () => void;
  onGoToDashboard: () => void;
}

const ResultsScreen = ({ score, onRestart, onGoToDashboard }: Props) => {
  const total = triviaQuestions.length;
  const pct = Math.round((score / total) * 100);
  const level = getLevel(score, total);
  const confettiFired = useRef(false);

  useEffect(() => {
    if (pct >= 70 && !confettiFired.current) {
      confettiFired.current = true;
      setTimeout(() => {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }, 800);
    }
  }, [pct]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <div className="bg-card rounded-2xl shadow-card p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <Trophy className="mx-auto text-warning mb-4" size={56} />
          </motion.div>

          <h2 className="font-display font-black text-3xl mb-2 text-foreground">¡Resultados!</h2>

          <div className="my-8">
            <div className="text-6xl font-display font-black text-primary">
              <AnimatedCounter target={score} /> <span className="text-2xl text-muted-foreground">/ {total}</span>
            </div>

            {/* Progress bar */}
            <div className="mt-6 h-4 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-warm rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">{pct}% de acierto</p>
          </div>

          {/* Level */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-muted rounded-xl p-4 mb-8"
          >
            <p className="text-sm text-muted-foreground mb-1">Tu nivel</p>
            <p className="text-2xl font-display font-bold">
              {level.emoji} <span className={level.color}>{level.label}</span>
            </p>
          </motion.div>

          <div className="flex flex-col gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onGoToDashboard}
              className="bg-primary text-primary-foreground font-display font-bold py-3 rounded-xl flex items-center justify-center gap-2"
            >
              Ver Mi Perfil <ArrowRight size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onRestart}
              className="bg-muted text-foreground font-display font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} /> Intentar de nuevo
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultsScreen;

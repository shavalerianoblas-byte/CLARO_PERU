import { motion } from "framer-motion";
import AnimatedCounter from "@/components/AnimatedCounter";
import { getLevel, triviaQuestions } from "@/data/triviaData";
import { Trophy, Flame, Target, Star, Lightbulb, TrendingUp, Award } from "lucide-react";

interface Props {
  score: number;
}

const tips = [
  "Hoy, escucha activamente a un colega que piense diferente a ti.",
  "Revisa tus correos: ¿usas lenguaje inclusivo?",
  "Invita a alguien nuevo del equipo a tomar un café virtual.",
  "Cuestiona un estereotipo que hayas escuchado hoy.",
];

const badges = [
  { icon: "🌱", label: "Primer Paso", unlocked: true },
  { icon: "💬", label: "Comunicador", unlocked: true },
  { icon: "🤝", label: "Aliado Activo", unlocked: true },
  { icon: "🔥", label: "Promotor", unlocked: false },
  { icon: "⭐", label: "Campeón", unlocked: false },
];

const DashboardScreen = ({ score }: Props) => {
  const total = triviaQuestions.length;
  const pct = Math.round((score / total) * 100);
  const level = getLevel(score, total);
  const xp = score * 24;
  const tip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl min-h-[calc(100vh-4rem)]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-display font-black text-3xl md:text-4xl mb-8 text-foreground">Tu Perfil DEI</h2>

        {/* Main stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Trophy, label: "Puntaje", value: xp, suffix: " XP", color: "text-warning" },
            { icon: Target, label: "Aciertos", value: pct, suffix: "%", color: "text-success" },
            { icon: Flame, label: "Racha", value: 1, suffix: " día", color: "text-primary" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: "var(--shadow-card-hover)" }}
              className="bg-card rounded-2xl shadow-card p-6 transition-all"
            >
              <stat.icon className={`${stat.color} mb-2`} size={28} />
              <div className="font-display font-black text-3xl text-foreground">
                <AnimatedCounter target={stat.value} />
                <span className="text-base text-muted-foreground">{stat.suffix}</span>
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Level + Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl shadow-card p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Nivel actual</p>
              <p className="font-display font-bold text-xl">
                {level.emoji} <span className={level.color}>{level.label}</span>
              </p>
            </div>
            <TrendingUp className="text-primary" size={24} />
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-warm rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">{pct}% hacia el siguiente nivel</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-2xl shadow-card p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Award className="text-primary" size={20} />
              <h3 className="font-display font-bold text-foreground">Insignias</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {badges.map((b, i) => (
                <motion.div
                  key={i}
                  whileHover={b.unlocked ? { scale: 1.1, rotate: 5 } : {}}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl border ${
                    b.unlocked ? "bg-warning/5 border-warning/30" : "bg-muted/50 border-border opacity-40"
                  }`}
                >
                  <span className="text-2xl">{b.icon}</span>
                  <span className="text-xs font-medium text-foreground">{b.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Daily tip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-2xl shadow-card p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="text-warning" size={20} />
              <h3 className="font-display font-bold text-foreground">Sugerencia del Día</h3>
            </div>
            <motion.div
              className="bg-warning/5 border border-warning/20 rounded-xl p-4"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <p className="text-sm text-foreground italic">"{tip}"</p>
            </motion.div>

            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="text-primary" size={16} />
                <span className="text-sm font-medium text-foreground">Rango: {level.label}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Sigue participando para desbloquear más insignias y subir de nivel.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardScreen;

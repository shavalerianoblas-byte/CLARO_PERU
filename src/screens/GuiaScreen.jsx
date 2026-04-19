import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { UserCheck, Eye, CheckSquare, Square, ArrowRight, ShieldCheck, MessageCircle, Phone } from "lucide-react";

const roles = {
  victima: {
    title: "Soy Víctima",
    icon: UserCheck,
    color: "bg-primary",
    steps: [
      { text: "Documenta los hechos con fechas y detalles", icon: "📝" },
      { text: "Busca a alguien de confianza para hablar", icon: "💬" },
      { text: "Conoce tus derechos y políticas internas", icon: "📋" },
      { text: "Reporta formalmente por los canales disponibles", icon: "📢" },
      { text: "Busca apoyo psicológico si lo necesitas", icon: "🧠" },
    ],
  },
  testigo: {
    title: "Soy Testigo",
    icon: Eye,
    color: "bg-info",
    steps: [
      { text: "No ignores la situación, tu silencio es complicidad", icon: "👀" },
      { text: "Ofrece apoyo a la persona afectada", icon: "🤝" },
      { text: "Documenta lo que presenciaste", icon: "📝" },
      { text: "Reporta a través de los canales seguros", icon: "🔒" },
      { text: "Da seguimiento al caso", icon: "📊" },
    ],
  },
};

const GuiaScreen = () => {
  const [activeRole, setActiveRole] = useState<"victima" | "testigo" | null>(null);
  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (idx: number) => {
    setCheckedSteps((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl min-h-[calc(100vh-4rem)]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-display font-black text-3xl md:text-4xl text-center mb-3 text-foreground">
          Guía de Acción
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          Selecciona tu situación para recibir orientación personalizada
        </p>

        {/* Role buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {(Object.keys(roles) as Array<"victima" | "testigo">).map((key) => {
            const role = roles[key];
            const Icon = role.icon;
            const active = activeRole === key;
            return (
              <motion.button
                key={key}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setActiveRole(key);
                  setCheckedSteps(new Set());
                }}
                className={`p-6 rounded-2xl border-2 text-center transition-all ${
                  active
                    ? "border-primary bg-primary/5 shadow-card-hover"
                    : "border-border bg-card hover:border-primary/30 shadow-card"
                }`}
              >
                <div
                  className={`w-16 h-16 mx-auto rounded-xl flex items-center justify-center mb-3 ${
                    active ? role.color : "bg-muted"
                  }`}
                >
                  <Icon size={28} className={active ? "text-primary-foreground" : "text-muted-foreground"} />
                </div>
                <span className="font-display font-bold text-foreground">{role.title}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {activeRole && (
            <motion.div
              key={activeRole}
              initial={{ opacity: 0, x: activeRole === "victima" ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeRole === "victima" ? 50 : -50 }}
              className="space-y-3"
            >
              <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2 text-foreground">
                <ArrowRight className="text-primary" size={20} />
                Pasos a seguir
              </h3>
              {roles[activeRole].steps.map((step, i) => {
                const checked = checkedSteps.has(i);
                return (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 4 }}
                    onClick={() => toggleStep(i)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                      checked
                        ? "bg-success/5 border-success/30"
                        : "bg-card border-border hover:border-primary/30"
                    }`}
                  >
                    <span className="text-2xl">{step.icon}</span>
                    <span className={`flex-1 text-sm md:text-base ${checked ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {step.text}
                    </span>
                    {checked ? (
                      <CheckSquare className="text-success shrink-0" size={20} />
                    ) : (
                      <Square className="text-muted-foreground shrink-0" size={20} />
                    )}
                  </motion.button>
                );
              })}

              {/* Contacts */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                <div className="flex items-center gap-3 bg-card p-4 rounded-xl shadow-card">
                  <Phone className="text-primary" size={20} />
                  <div>
                    <p className="text-xs text-muted-foreground">Línea de ayuda</p>
                    <p className="font-display font-bold text-sm text-foreground">018000-XXXXXX</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-card p-4 rounded-xl shadow-card">
                  <MessageCircle className="text-primary" size={20} />
                  <div>
                    <p className="text-xs text-muted-foreground">Chat confidencial</p>
                    <p className="font-display font-bold text-sm text-foreground">Disponible 24/7</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default GuiaScreen;

import { motion } from "framer-motion";
import { useState } from "react";
import { Lock, Mail, User, ArrowRight, Eye, EyeOff } from "lucide-react";

interface Props {
  onLogin: (email: string, password: string) => Promise<{ message: string } | null>;
  onSignUp: (email: string, password: string, name: string) => Promise<{ message: string } | null>;
}

const LoginScreen = ({ onLogin, onSignUp }: Props) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isSignUp) {
        const err = await onSignUp(email, password, name);
        if (err) setError(err.message);
        else setSuccess("Cuenta creada. Revisa tu correo para confirmar.");
      } else {
        const err = await onLogin(email, password);
        if (err) setError(err.message);
      }
    } catch {
      setError("Error inesperado. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-2xl shadow-card p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <Lock className="text-primary" size={28} />
            </div>
            <h2 className="font-display font-black text-2xl text-foreground">
              {isSignUp ? "Crear Cuenta" : "Iniciar Sesion"}
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
              {isSignUp
                ? "Registrate para acceder a todas las funcionalidades"
                : "Ingresa con tu cuenta para continuar"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                <label className="block text-sm font-medium text-foreground mb-1">Nombre</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    required={isSignUp}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                  />
                </div>
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Correo electronico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Contrasena</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimo 6 caracteres"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-destructive text-sm bg-destructive/10 p-3 rounded-lg">
                {error}
              </motion.p>
            )}
            {success && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-success text-sm bg-success/10 p-3 rounded-lg">
                {success}
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-display font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-glow disabled:opacity-50"
            >
              {loading ? "Procesando..." : isSignUp ? "Registrarse" : "Ingresar"}
              {!loading && <ArrowRight size={18} />}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsSignUp(!isSignUp); setError(""); setSuccess(""); }}
              className="text-sm text-primary hover:underline font-medium"
            >
              {isSignUp ? "Ya tengo cuenta, iniciar sesion" : "No tengo cuenta, registrarme"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginScreen;

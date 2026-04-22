import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, User, ArrowRight, Eye, EyeOff } from "lucide-react";

const LoginScreen = ({ onLogin, onSignUp }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // Captura el nombre escrito a mano
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        // Registro enviando el nombre completo escrito
        const err = await onSignUp(email, password, fullName);
        if (err) setError(err.message);
      } else {
        // Login enviando el nombre completo escrito
        const err = await onLogin(email, password, fullName);
        if (err) setError(err.message);
      }
    } catch (err) {
      setError("Error al intentar ingresar. Revisa los datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-slate-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 flex items-center justify-center mb-4">
              <User className="text-[#EE121A]" size={28} />
            </div>
            <h2 className="font-black text-2xl text-slate-900 uppercase">
              {isSignUp ? "Registro de Usuario" : "Acceso Personalizado"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* CAMPO OBLIGATORIO DE NOMBRE COMPLETO */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Nombre Completo</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Escribe tu nombre y apellido"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500/20 focus:border-[#EE121A] outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Correo Corporativo</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@claro.com.pe"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500/20 focus:border-[#EE121A] outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500/20 focus:border-[#EE121A] outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-600 text-xs text-center bg-red-50 p-2 rounded">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#EE121A] text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 transition-all uppercase tracking-widest"
            >
              {loading ? "Entrando..." : "Confirmar Acceso"}
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-6 text-center border-t pt-4">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs font-bold text-slate-500 hover:text-[#EE121A]"
            >
              {isSignUp ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate aquí"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginScreen;
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../lib/firebase"; 
import { 
  collection, query, orderBy, onSnapshot, doc, 
  updateDoc, deleteDoc 
} from "firebase/firestore";
import { 
  Users, FileText, Shield, Lock, Gamepad2, 
  X, Search, Trash2, Mail, ShieldCheck, ExternalLink
} from "lucide-react";
import { toast } from "sonner";
import AdminJuegos from "../componentes/admin/AdminJuegos";

const IntranetScreen = ({ user, role }) => {
  const [activeTab, setActiveTab] = useState("users");
  const [showGameAdmin, setShowGameAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Estados para datos
  const [users, setUsers] = useState([]);
  const [denuncias, setDenuncias] = useState([]);
  const [loading, setLoading] = useState(true);

  // Verificación de Roles (Seguridad)
  const currentRole = role?.toLowerCase() || user?.role?.toLowerCase() || "cliente";
  const hasAccess = ["owner", "propietario", "editor", "coowner", "admin"].includes(currentRole);

  useEffect(() => {
    if (!hasAccess) return;

    // Suscripción en tiempo real a Usuarios
    const unsubUsers = onSnapshot(collection(db, "profiles"), (snap) => {
      setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });

    // Suscripción en tiempo real a Denuncias
    const unsubDenuncias = onSnapshot(
      query(collection(db, "denuncias"), orderBy("created_at", "desc")), 
      (snap) => {
        setDenuncias(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      }
    );

    return () => {
      unsubUsers();
      unsubDenuncias();
    };
  }, [hasAccess]);

  // Acciones Rápidas
  const cambiarRol = async (userId, nuevoRol) => {
    try {
      await updateDoc(doc(db, "profiles", userId), { role: nuevoRol });
      toast.success("Rol actualizado con éxito");
    } catch (e) {
      toast.error("Error al cambiar rol");
    }
  };

  const eliminarDenuncia = async (id) => {
    if(!window.confirm("¿Archivar esta denuncia definitivamente?")) return;
    try {
      await deleteDoc(doc(db, "denuncias", id));
      toast.success("Denuncia archivada");
    } catch (e) {
      toast.error("Error al eliminar");
    }
  };

  // Filtrado de usuarios
  const filteredUsers = users.filter(u => 
    u.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 text-center">
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 max-w-sm">
          <Lock size={60} className="text-red-500 mx-auto mb-6 opacity-20" />
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Acceso Denegado</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-4 leading-relaxed">
            Esta zona está reservada para administración de alto nivel.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* --- HEADER PRINCIPAL --- */}
      <div className="bg-white border-b border-slate-100 p-6 md:px-12 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-slate-900 p-4 rounded-2xl text-white">
              <ShieldCheck size={28}/>
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Intranet Master</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Gestión Centralizada de Plataforma</p>
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={() => setShowGameAdmin(true)}
              className="flex-1 md:flex-none bg-red-600 text-white px-8 h-14 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-red-700 transition-all shadow-lg shadow-red-100"
            >
              <Gamepad2 size={20} />
              Configurar Juegos
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-12">
        {/* --- NAVEGACIÓN Y BÚSQUEDA --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm w-full md:w-auto">
            <button 
              onClick={() => setActiveTab("users")}
              className={`flex items-center gap-3 px-8 py-3 rounded-xl font-black text-[10px] uppercase transition-all ${activeTab === "users" ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:bg-slate-50"}`}
            >
              <Users size={16}/> Colaboradores
            </button>
            <button 
              onClick={() => setActiveTab("denuncias")}
              className={`flex items-center gap-3 px-8 py-3 rounded-xl font-black text-[10px] uppercase transition-all ${activeTab === "denuncias" ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:bg-slate-50"}`}
            >
              <FileText size={16}/> Línea Ética
            </button>
          </div>

          {activeTab === "users" && (
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text"
                placeholder="Buscar por nombre o correo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-slate-100 shadow-sm transition-all"
              />
            </div>
          )}
        </div>

        {/* --- TABLA DE USUARIOS --- */}
        {activeTab === "users" && (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                  <tr>
                    <th className="p-8">Colaborador</th>
                    <th className="p-8 text-center">Rol Actual</th>
                    <th className="p-8 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="p-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400 group-hover:bg-red-50 group-hover:text-red-500 transition-colors uppercase">
                            {u.display_name?.substring(0,2)}
                          </div>
                          <div>
                            <p className="font-black text-slate-900 text-sm uppercase tracking-tight">{u.display_name}</p>
                            <p className="text-xs text-slate-400 font-medium flex items-center gap-1"><Mail size={12}/> {u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-8 text-center">
                        <select 
                          value={u.role || "cliente"}
                          onChange={(e) => cambiarRol(u.id, e.target.value)}
                          className="bg-slate-100 border-none text-[10px] font-black uppercase px-4 py-2 rounded-xl focus:ring-2 ring-red-100 outline-none cursor-pointer"
                        >
                          <option value="cliente">Colaborador</option>
                          <option value="editor">Editor Contenido</option>
                          <option value="owner">Propietario / Owner</option>
                        </select>
                      </td>
                      <td className="p-8 text-right">
                         <button className="p-3 text-slate-300 hover:text-red-500 transition-colors">
                            <Trash2 size={18}/>
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- LÍNEA ÉTICA (DENUNCIAS) --- */}
        {activeTab === "denuncias" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
            {denuncias.map((d) => (
              <div key={d.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative group hover:shadow-xl transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${d.anonimo ? 'bg-slate-900 text-white' : 'bg-red-100 text-red-600'}`}>
                    {d.anonimo ? "Reporte Anónimo" : "Identificado"}
                  </div>
                  <button onClick={() => eliminarDenuncia(d.id)} className="text-slate-200 hover:text-red-500 transition-colors">
                    <Trash2 size={18}/>
                  </button>
                </div>
                <h3 className="font-black text-slate-900 text-lg mb-2 uppercase tracking-tight">{d.type}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 italic">"{d.description}"</p>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase">
                  <ExternalLink size={12}/>
                  Enviado el {d.created_at?.toDate().toLocaleString()}
                </div>
              </div>
            ))}
            {denuncias.length === 0 && (
              <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-200">
                <p className="text-slate-300 font-black uppercase text-xs tracking-widest">No hay reportes de ética pendientes</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- MODAL PANTALLA COMPLETA: ADMIN JUEGOS --- */}
      <AnimatePresence>
        {showGameAdmin && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[100] bg-white overflow-y-auto"
          >
            <div className="relative">
              <button 
                onClick={() => setShowGameAdmin(false)}
                className="fixed top-8 right-8 z-[110] bg-slate-900 text-white p-4 rounded-2xl hover:bg-red-600 transition-all shadow-2xl"
              >
                <X size={24}/>
              </button>
              {/* Aquí invocamos el componente AdminJuegos que ya creamos */}
              <AdminJuegos userRole={currentRole} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntranetScreen;
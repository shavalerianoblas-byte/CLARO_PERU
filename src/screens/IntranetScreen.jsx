import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { db } from "../lib/firebase"; 
import { useAuth } from "../hook/useAuth";
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc, 
  getDocs 
} from "firebase/firestore";
import { 
  Users, FileText, BarChart3, MessageCircle, 
  Shield, ChevronDown, Clock, AlertTriangle 
} from "lucide-react";

const IntranetScreen = () => {
  const { user, role } = useAuth();
  const [activeTab, setActiveTab] = useState("users");
  
  // Estados para los datos de Firebase
  const [users, setUsers] = useState([]);
  const [denuncias, setDenuncias] = useState([]);
  const [scores, setScores] = useState([]);
  const [comments, setComments] = useState([]);
  const [changingRole, setChangingRole] = useState(null);

  const isOwner = role === "owner";

  // Efecto para cargar TODO en tiempo real
  useEffect(() => {
    if (!["owner", "coowner", "editor"].includes(role)) return;

    // 1. Escuchar Usuarios (Profiles)
    const qUsers = query(collection(db, "profiles"), orderBy("email", "asc"));
    const unsubUsers = onSnapshot(qUsers, (snap) => {
      setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    // 2. Escuchar Denuncias
    const qDen = query(collection(db, "denuncias"), orderBy("created_at", "desc"));
    const unsubDen = onSnapshot(qDen, (snap) => {
      setDenuncias(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    // 3. Escuchar Puntajes
    const qScores = query(collection(db, "game_scores"), orderBy("created_at", "desc"));
    const unsubScores = onSnapshot(qScores, (snap) => {
      setScores(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    // 4. Escuchar Comentarios
    const qCom = query(collection(db, "comments"), orderBy("createdAt", "desc"));
    const unsubCom = onSnapshot(qCom, (snap) => {
      setComments(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => {
      unsubUsers();
      unsubDen();
      unsubScores();
      unsubCom();
    };
  }, [role]);

  const handleRoleChange = async (userId, newRole) => {
    if (!isOwner) return;
    setChangingRole(userId);
    try {
      const userRef = doc(db, "profiles", userId);
      await updateDoc(userRef, { role: newRole });
    } catch (error) {
      console.error("Error cambiando rol:", error);
    }
    setChangingRole(null);
  };

  const tabs = [
    { id: "users", label: "Usuarios", icon: Users, count: users.length },
    { id: "denuncias", label: "Denuncias", icon: FileText, count: denuncias.length },
    { id: "scores", label: "Puntajes", icon: BarChart3, count: scores.length },
    { id: "comments", label: "Comentarios", icon: MessageCircle, count: comments.length },
  ];

  const roleLabels = {
    owner: "Propietario",
    coowner: "Copropietario",
    editor: "Editor",
    client: "Cliente",
  };

  const roleColors = {
    owner: "bg-red-100 text-red-600",
    coowner: "bg-amber-100 text-amber-600",
    editor: "bg-blue-100 text-blue-600",
    client: "bg-slate-100 text-slate-500",
  };

  const formatDate = (ts) => {
    if (!ts) return "---";
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    return date.toLocaleDateString("es-PE");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl min-h-screen bg-slate-50/50">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        
        {/* Encabezado */}
        <div className="flex items-center gap-3 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="p-3 bg-red-600 rounded-xl text-white shadow-lg shadow-red-200">
            <Shield size={24} />
          </div>
          <div>
            <h2 className="font-black text-2xl text-slate-900 tracking-tight">Panel Administrativo</h2>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
              Acceso: <span className="text-red-600 font-bold">{roleLabels[role] || "Cargando..."}</span>
            </p>
          </div>
        </div>

        {/* Tabs de Navegación */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  active
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                    : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
                }`}
              >
                <Icon size={16} />
                {tab.label}
                <span className={`ml-1 px-2 py-0.5 rounded-full text-[10px] ${active ? "bg-white/20" : "bg-slate-100"}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* CONTENIDO DE TABS */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          
          {/* TAB: USUARIOS */}
          {activeTab === "users" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50/50">
                  <tr className="border-b border-slate-100 text-slate-400">
                    <th className="text-left px-6 py-4 font-bold uppercase text-[10px] tracking-widest">Usuario</th>
                    <th className="text-left px-6 py-4 font-bold uppercase text-[10px] tracking-widest">Correo</th>
                    <th className="text-left px-6 py-4 font-bold uppercase text-[10px] tracking-widest">Rol</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">{u.display_name || "Sin nombre"}</td>
                      <td className="px-6 py-4 text-slate-500">{u.email}</td>
                      <td className="px-6 py-4">
                        {isOwner && u.id !== user?.uid ? (
                          <div className="relative inline-block">
                            <select
                              value={u.role}
                              onChange={(e) => handleRoleChange(u.id, e.target.value)}
                              disabled={changingRole === u.id}
                              className="appearance-none pr-8 pl-3 py-1.5 rounded-lg text-xs font-black border border-slate-200 bg-white text-slate-700 cursor-pointer focus:ring-2 focus:ring-red-500/20"
                            >
                              <option value="client">Cliente</option>
                              <option value="editor">Editor</option>
                              <option value="coowner">Copropietario</option>
                              <option value="owner">Dueño</option>
                            </select>
                            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          </div>
                        ) : (
                          <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${roleColors[u.role || "client"]}`}>
                            {roleLabels[u.role || "client"]}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB: DENUNCIAS */}
          {activeTab === "denuncias" && (
            <div className="p-6 grid gap-4">
              {denuncias.length === 0 ? (
                <div className="text-center py-20 text-slate-400 italic">No hay denuncias activas</div>
              ) : (
                denuncias.map((d) => (
                  <div key={d.id} className="p-5 border border-slate-100 rounded-2xl hover:border-red-100 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-2">
                        <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg ${
                          d.severity === "alta" ? "bg-red-50 text-red-600 border border-red-100" : "bg-slate-50 text-slate-500"
                        }`}>
                          Nivel: {d.severity || "normal"}
                        </span>
                        <span className="text-[10px] font-black uppercase px-3 py-1 rounded-lg bg-slate-900 text-white">
                          {d.type}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <Clock size={12} /> {formatDate(d.created_at)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 mb-4 leading-relaxed">{d.description}</p>
                    <div className="bg-slate-50 p-3 rounded-xl flex flex-wrap gap-4 text-[10px] text-slate-500 font-bold uppercase">
                      <p>Área: <span className="text-slate-900">{d.area || "N/A"}</span></p>
                      <p>Reportado por: <span className="text-slate-900">{d.anonymous ? "Anónimo" : "Identificado"}</span></p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB: PUNTAJES */}
          {activeTab === "scores" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50/50">
                  <tr className="border-b border-slate-100 text-slate-400">
                    <th className="text-left px-6 py-4 font-bold uppercase text-[10px]">Usuario ID</th>
                    <th className="text-left px-6 py-4 font-bold uppercase text-[10px]">Juego</th>
                    <th className="text-left px-6 py-4 font-bold uppercase text-[10px]">Puntaje</th>
                    <th className="text-left px-6 py-4 font-bold uppercase text-[10px]">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {scores.map((s) => (
                    <tr key={s.id}>
                      <td className="px-6 py-4 text-xs font-mono text-slate-500">{s.user_id}</td>
                      <td className="px-6 py-4 font-bold text-slate-900 capitalize">{s.game_type}</td>
                      <td className="px-6 py-4">
                        <span className="bg-green-50 text-green-600 px-3 py-1 rounded-lg font-black">{s.score} pts</span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-xs">{formatDate(s.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB: COMENTARIOS (VISTA MODERACIÓN) */}
          {activeTab === "comments" && (
            <div className="p-6 space-y-3">
              {comments.map((c) => (
                <div key={c.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <img src={c.userPhoto} className="w-8 h-8 rounded-full border border-white" alt="" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">{c.userName}</p>
                      <p className="text-xs text-slate-600 line-clamp-1 italic">"{c.text}"</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold">{formatDate(c.createdAt)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default IntranetScreen;
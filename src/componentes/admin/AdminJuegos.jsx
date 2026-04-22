import React, { useState, useEffect } from "react";
import { Save, Gamepad2, LayoutDashboard, BarChart3, Loader2 } from "lucide-react";
import { db } from "../../lib/firebase"; 
import { doc, getDoc, setDoc, collection, query, getDocs, orderBy } from "firebase/firestore";

// Importamos la lógica visual del archivo anterior
import { 
  TriviaEditor, 
  MemoramaEditor, 
  SopaEditor, 
  EstadisticasDetalladas 
} from "./EditorJuegosView";

const AdminJuegos = () => {
  const [activeTab, setActiveTab] = useState("editor");
  const [subTab, setSubTab] = useState("trivia");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [logs, setLogs] = useState([]);
  const [juegosData, setJuegosData] = useState({ trivia: [], memorama: [], sopa: [] });

  // Cargar datos de Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const refs = ["trivia_dei", "memorama_dei", "sopa_dei"];
        const keys = ["trivia", "memorama", "sopa"];
        let tempData = {};

        for (let i = 0; i < refs.length; i++) {
          const snap = await getDoc(doc(db, "config_juegos", refs[i]));
          if (snap.exists()) {
            const d = snap.data();
            tempData[keys[i]] = d.preguntas || d.parejas || d.palabras || [];
          }
        }
        setJuegosData(tempData);

        const snapLogs = await getDocs(query(collection(db, "game_scores"), orderBy("created_at", "desc")));
        setLogs(snapLogs.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  // Guardar datos en Firebase
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await setDoc(doc(db, "config_juegos", "trivia_dei"), { preguntas: juegosData.trivia });
      await setDoc(doc(db, "config_juegos", "memorama_dei"), { parejas: juegosData.memorama });
      await setDoc(doc(db, "config_juegos", "sopa_dei"), { palabras: juegosData.sopa });
      alert("¡Cambios guardados con éxito!");
    } catch (e) { alert("Error al guardar"); }
    finally { setIsSaving(false); }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <Loader2 className="animate-spin text-red-600" size={40} />
    </div>
  );

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* HEADER */}
      <header className="bg-white border-b p-6 sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-red-600 p-3 rounded-2xl text-white shadow-lg"><Gamepad2 size={24} /></div>
          <h2 className="text-2xl font-black text-slate-900 uppercase">Panel de Control</h2>
        </div>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all flex items-center gap-2"
        >
          {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
          {isSaving ? "GUARDANDO..." : "GUARDAR CAMBIOS"}
        </button>
      </header>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* MENÚ IZQUIERDO */}
        <div className="lg:col-span-3 space-y-2">
          <button onClick={() => setActiveTab("editor")} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'editor' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:bg-white'}`}>
            <LayoutDashboard size={18} /> Editor de Juegos
          </button>
          <button onClick={() => setActiveTab("stats")} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'stats' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:bg-white'}`}>
            <BarChart3 size={18} /> Estadísticas
          </button>
        </div>

        {/* CONTENIDO CENTRAL */}
        <div className="lg:col-span-9 space-y-8">
          {activeTab === "editor" ? (
            <>
              <div className="flex gap-2">
                {["trivia", "memorama", "sopa"].map(t => (
                  <button key={t} onClick={() => setSubTab(t)} className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase transition-all ${subTab === t ? 'bg-red-600 text-white' : 'bg-white text-slate-400 border'}`}>
                    {t}
                  </button>
                ))}
              </div>
              {subTab === "trivia" && <TriviaEditor data={juegosData.trivia} setData={d => setJuegosData({...juegosData, trivia: d})} />}
              {subTab === "memorama" && <MemoramaEditor data={juegosData.memorama} setData={d => setJuegosData({...juegosData, memorama: d})} />}
              {subTab === "sopa" && <SopaEditor data={juegosData.sopa} setData={d => setJuegosData({...juegosData, sopa: d})} />}
            </>
          ) : (
            <EstadisticasDetalladas data={logs} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminJuegos;
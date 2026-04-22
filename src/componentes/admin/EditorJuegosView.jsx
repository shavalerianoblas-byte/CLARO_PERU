import React from "react";
import { 
  Plus, Trash2, ChevronRight, 
  CheckCircle2, AlertCircle 
} from "lucide-react";

// ==========================================
// 0. COMPONENTES UI LOCALES (Sustituyen a la carpeta ui)
// ==========================================
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, className = "", variant = "primary" }) => {
  const styles = {
    primary: "bg-slate-900 text-white hover:bg-red-600 active:scale-95",
    ghost: "bg-transparent text-slate-300 hover:text-red-500 hover:bg-red-50",
    dashed: "border-2 border-dashed border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-400 bg-white"
  };
  return (
    <button 
      onClick={onClick} 
      className={`flex items-center justify-center transition-all rounded-xl font-bold text-[10px] uppercase tracking-widest px-4 py-3 ${styles[variant] || ""} ${className}`}
    >
      {children}
    </button>
  );
};

const Input = (props) => (
  <input 
    {...props} 
    className={`w-full p-3 bg-slate-50 rounded-xl border border-transparent focus:border-red-500 focus:bg-white outline-none transition-all text-sm ${props.className || ""}`} 
  />
);

const Textarea = (props) => (
  <textarea 
    {...props} 
    className={`w-full p-3 bg-slate-50 rounded-xl border border-transparent focus:border-red-500 focus:bg-white outline-none transition-all text-sm min-h-[80px] resize-none ${props.className || ""}`} 
  />
);

// ==========================================
// 1. EDITOR DE TRIVIA
// ==========================================
export const TriviaEditor = ({ data, setData }) => {
  const add = () => setData([...data, { titulo: "", opciones: ["", "", "", ""], correcta: 0, textoCorrecto: "", consejoIncorrecto: "" }]);
  const update = (i, f, v) => { const n = [...data]; n[i][f] = v; setData(n); };
  
  return (
    <div className="space-y-6">
      <Button onClick={add} variant="dashed" className="w-full py-8">
        <Plus size={20} className="mr-2"/> Añadir Nueva Pregunta
      </Button>
      {data.map((p, i) => (
        <Card key={i} className="p-6 relative border-l-4 border-red-500">
          <Button variant="ghost" className="absolute top-2 right-2 p-2" onClick={() => setData(data.filter((_, idx) => idx !== i))}>
            <Trash2 size={18}/>
          </Button>
          <div className="space-y-4">
            <Input value={p.titulo} onChange={e => update(i, 'titulo', e.target.value)} placeholder="Escribe la pregunta aquí..." className="font-bold text-lg"/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {p.opciones.map((opt, oi) => (
                <div key={oi} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl">
                  <input type="radio" checked={p.correcta === oi} onChange={() => update(i, 'correcta', oi)} className="accent-red-500 w-4 h-4 cursor-pointer" />
                  <Input value={opt} onChange={e => { const no = [...p.opciones]; no[oi] = e.target.value; update(i, 'opciones', no); }} placeholder={`Opción ${oi+1}`} className="bg-white"/>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <Textarea value={p.textoCorrecto} onChange={e => update(i, 'textoCorrecto', e.target.value)} placeholder="Mensaje de felicitación si acierta..." className="text-xs bg-green-50 border-green-100" />
              <Textarea value={p.consejoIncorrecto} onChange={e => update(i, 'consejoIncorrecto', e.target.value)} placeholder="Consejo educativo si falla..." className="text-xs bg-amber-50 border-amber-100" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

// ==========================================
// 2. EDITOR DE MEMORAMA
// ==========================================
export const MemoramaEditor = ({ data, setData }) => {
  const add = () => setData([...data, { texto: "", par: "" }]);
  const update = (i, f, v) => { const n = [...data]; n[i][f] = v; setData(n); };
  
  return (
    <div className="space-y-4">
      <Button onClick={add} variant="dashed" className="w-full py-8">
        <Plus size={20} className="mr-2"/> Añadir Nueva Pareja de Cartas
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((p, i) => (
          <Card key={i} className="p-4 flex items-center gap-3">
            <Input value={p.texto} onChange={e => update(i, 'texto', e.target.value)} placeholder="Concepto A" className="font-bold text-center uppercase text-xs"/>
            <ChevronRight className="text-slate-300 shrink-0" />
            <Input value={p.par} onChange={e => update(i, 'par', e.target.value)} placeholder="Definición B" className="font-bold text-center uppercase text-xs"/>
            <Button variant="ghost" onClick={() => setData(data.filter((_, idx) => idx !== i))} className="text-red-400 p-2 shrink-0"><Trash2 size={16}/></Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 3. EDITOR DE ESCENARIOS (Casos de Estudio)
// ==========================================
export const EscenariosEditor = ({ data, setData }) => {
  const add = () => setData([...data, { titulo: "", contexto: "", opciones: ["", "", ""], opcionCorrecta: 0, feedbacks: ["", "", ""], consejoFinal: "" }]);
  const update = (i, f, v) => { const n = [...data]; n[i][f] = v; setData(n); };

  return (
    <div className="space-y-8">
      <Button onClick={add} variant="dashed" className="w-full py-8">
        <Plus size={20} className="mr-2"/> Añadir Nuevo Escenario
      </Button>
      {data.map((c, i) => (
        <Card key={i} className="p-8 border-l-8 border-slate-900 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-black text-slate-900 uppercase text-xs tracking-[0.2em]">ESCENARIO #{i+1}</h4>
            <Button variant="ghost" onClick={() => setData(data.filter((_, idx) => idx !== i))} className="text-red-500"><Trash2 size={18}/></Button>
          </div>
          <Input value={c.titulo} onChange={e => update(i, 'titulo', e.target.value)} placeholder="Título del escenario..." className="font-bold"/>
          <Textarea value={c.contexto} onChange={e => update(i, 'contexto', e.target.value)} placeholder="Describe la situación..." className="h-24"/>
          <div className="grid md:grid-cols-3 gap-4">
            {[0, 1, 2].map(oi => (
              <div key={oi} className="p-4 bg-slate-50 rounded-2xl space-y-2 border border-slate-100">
                <div className="flex justify-between items-center text-[10px] font-black uppercase">
                  <span>Opción {oi+1}</span> 
                  <input type="radio" checked={c.opcionCorrecta === oi} onChange={() => update(i, 'opcionCorrecta', oi)} className="accent-red-600" />
                </div>
                <Input value={c.opciones[oi]} onChange={e => { const no = [...c.opciones]; no[oi] = e.target.value; update(i, 'opciones', no); }} placeholder="Acción..." className="text-xs bg-white font-bold"/>
                <Textarea value={c.feedbacks[oi]} onChange={e => { const nf = [...c.feedbacks]; nf[oi] = e.target.value; update(i, 'feedbacks', nf); }} placeholder="Consecuencia..." className="text-[10px] bg-white h-20"/>
              </div>
            ))}
          </div>
          <Textarea value={c.consejoFinal} onChange={e => update(i, 'consejoFinal', e.target.value)} placeholder="Refuerzo educativo final (moraleja)..." className="bg-yellow-50 border-yellow-100 text-xs italic" />
        </Card>
      ))}
    </div>
  );
};

// ==========================================
// 4. EDITOR DE SOPA DE LETRAS
// ==========================================
export const SopaEditor = ({ data, setData }) => {
  const [w, setW] = React.useState("");
  const add = () => { if(w.trim()) { setData([...data, w.toUpperCase().trim()]); setW(""); } };
  
  return (
    <Card className="p-6">
      <h3 className="font-black text-sm uppercase mb-4 text-slate-400 tracking-widest">Palabras de la Sopa</h3>
      <div className="flex gap-2 mb-6">
        <Input value={w} onChange={e => setW(e.target.value)} placeholder="Nueva palabra..." onKeyDown={e => e.key === 'Enter' && add()} />
        <Button onClick={add} className="px-8 bg-slate-900">AÑADIR</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {data.map((word, i) => (
          <div key={i} className="bg-red-50 text-red-600 px-4 py-2 rounded-full font-black text-[10px] flex gap-2 items-center border border-red-100 uppercase tracking-tight">
            {word} <Trash2 size={12} className="cursor-pointer opacity-60 hover:opacity-100" onClick={() => setData(data.filter((_, idx) => idx !== i))} />
          </div>
        ))}
      </div>
    </Card>
  );
};

// ==========================================
// 5. EDITOR VERDADERO / FALSO
// ==========================================
export const VFEditor = ({ data, setData }) => {
  const add = () => setData([...data, { afirmacion: "", esVerdadero: true, explicacion: "" }]);
  const update = (i, f, v) => { const n = [...data]; n[i][f] = v; setData(n); };

  return (
    <div className="space-y-4">
      <Button onClick={add} variant="dashed" className="w-full py-8">
        <Plus size={20} className="mr-2"/> Añadir Nueva Afirmación
      </Button>
      {data.map((p, i) => (
        <Card key={i} className="p-6 relative border-l-4 border-blue-500 space-y-4">
          <Button variant="ghost" className="absolute top-2 right-2 text-slate-300" onClick={() => setData(data.filter((_, idx) => idx !== i))}><Trash2 size={18}/></Button>
          <Input value={p.afirmacion} onChange={e => update(i, 'afirmacion', e.target.value)} placeholder="Escribe la afirmación..." className="font-bold"/>
          <div className="flex bg-slate-100 p-1 rounded-xl w-64 shadow-inner">
            <button 
              onClick={() => update(i, 'esVerdadero', true)} 
              className={`flex-1 py-2 rounded-lg text-[10px] font-black transition-all ${p.esVerdadero ? 'bg-green-500 text-white shadow-lg' : 'text-slate-400'}`}
            >
              VERDADERO
            </button>
            <button 
              onClick={() => update(i, 'esVerdadero', false)} 
              className={`flex-1 py-2 rounded-lg text-[10px] font-black transition-all ${!p.esVerdadero ? 'bg-red-500 text-white shadow-lg' : 'text-slate-400'}`}
            >
              FALSO
            </button>
          </div>
          <Textarea value={p.explicacion} onChange={e => update(i, 'explicacion', e.target.value)} placeholder="Explica por qué es verdadero o falso..." className="text-xs italic bg-slate-50" />
        </Card>
      ))}
    </div>
  );
};

// ==========================================
// 6. ESTADÍSTICAS DE PARTICIPACIÓN
// ==========================================
export const EstadisticasDetalladas = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-slate-900 text-white">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Participaciones</p>
          <p className="text-4xl font-black">{data.length}</p>
        </Card>
      </div>

      <Card className="rounded-[2rem]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                <th className="p-6">Colaborador</th>
                <th className="p-6 text-center">Juego</th>
                <th className="p-6 text-center">Puntos</th>
                <th className="p-6 text-right">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {data.map((log, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-3 font-bold text-slate-800 uppercase tracking-tight">
                      <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-black">
                        {log.display_name?.charAt(0)}
                      </div>
                      {log.display_name}
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter">
                      {log.game_type}
                    </span>
                  </td>
                  <td className="p-6 text-center font-black text-red-600 text-lg">
                    {log.score}
                  </td>
                  <td className="p-6 text-right text-slate-400 font-bold text-[10px] uppercase">
                    {log.created_at?.toDate().toLocaleString() || "Sin fecha"}
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-10 text-center text-slate-400 italic">No hay registros de participación todavía.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
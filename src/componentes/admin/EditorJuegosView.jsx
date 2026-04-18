import React from "react";
import { 
  Plus, Trash2, ChevronRight, User, 
  Clock, Target, AlertCircle, CheckCircle2 
} from "lucide-react";
import { Card } from "@/componentes/ui/card";
import { Button } from "@/componentes/ui/button";
import { Input } from "@/componentes/ui/input";
import { Textarea } from "@/componentes/ui/textarea";

// ==========================================
// 1. EDITOR DE TRIVIA
// ==========================================
export const TriviaEditor = ({ data, setData }) => {
  const add = () => setData([...data, { titulo: "", opciones: ["", "", "", ""], correcta: 0, textoCorrecto: "", consejoIncorrecto: "" }]);
  const update = (i, f, v) => { const n = [...data]; n[i][f] = v; setData(n); };
  
  return (
    <div className="space-y-6">
      <Button onClick={add} className="w-full border-dashed border-2 py-8 bg-white text-slate-500 hover:bg-slate-50 border-slate-200">
        <Plus size={20} className="mr-2"/> Añadir Nueva Pregunta
      </Button>
      {data.map((p, i) => (
        <Card key={i} className="p-6 relative border-l-4 border-red-500 shadow-md">
          <Button variant="ghost" className="absolute top-2 right-2 text-slate-300 hover:text-red-500" onClick={() => setData(data.filter((_, idx) => idx !== i))}>
            <Trash2 size={18}/>
          </Button>
          <div className="space-y-4">
            <Input value={p.titulo} onChange={e => update(i, 'titulo', e.target.value)} placeholder="Pregunta..." className="font-bold text-lg"/>
            <div className="grid grid-cols-2 gap-4">
              {p.opciones.map((opt, oi) => (
                <div key={oi} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl">
                  <input type="radio" checked={p.correcta === oi} onChange={() => update(i, 'correcta', oi)} className="accent-red-500" />
                  <Input value={opt} onChange={e => { const no = [...p.opciones]; no[oi] = e.target.value; update(i, 'opciones', no); }} placeholder={`Opción ${oi+1}`} className="bg-white"/>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <Textarea value={p.textoCorrecto} onChange={e => update(i, 'textoCorrecto', e.target.value)} placeholder="Mensaje si acierta..." className="text-xs bg-green-50 border-green-100" />
              <Textarea value={p.consejoIncorrecto} onChange={e => update(i, 'consejoIncorrecto', e.target.value)} placeholder="Mensaje si falla..." className="text-xs bg-amber-50 border-amber-100" />
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
      <Button onClick={add} className="w-full border-dashed border-2 py-8 bg-white text-slate-500 hover:bg-slate-50 border-slate-200">
        <Plus size={20} className="mr-2"/> Añadir Nueva Pareja
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((p, i) => (
          <Card key={i} className="p-4 flex items-center gap-3 shadow-sm border-slate-100">
            <Input value={p.texto} onChange={e => update(i, 'texto', e.target.value)} placeholder="Texto A" className="font-bold text-center uppercase text-xs"/>
            <ChevronRight className="text-slate-300 shrink-0" />
            <Input value={p.par} onChange={e => update(i, 'par', e.target.value)} placeholder="Texto B" className="font-bold text-center uppercase text-xs"/>
            <Button variant="ghost" onClick={() => setData(data.filter((_, idx) => idx !== i))} className="text-red-400 p-2 shrink-0"><Trash2 size={16}/></Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 3. EDITOR DE ESCENARIOS
// ==========================================
export const EscenariosEditor = ({ data, setData }) => {
  const add = () => setData([...data, { titulo: "", contexto: "", opciones: ["", "", ""], opcionCorrecta: 0, feedbacks: ["", "", ""], consejoFinal: "" }]);
  const update = (i, f, v) => { const n = [...data]; n[i][f] = v; setData(n); };

  return (
    <div className="space-y-8">
      <Button onClick={add} className="w-full border-dashed border-2 py-8 bg-white text-slate-500 hover:bg-slate-50 border-slate-200">
        <Plus size={20} className="mr-2"/> Añadir Nuevo Escenario
      </Button>
      {data.map((c, i) => (
        <Card key={i} className="p-8 border-l-8 border-slate-900 shadow-xl space-y-4">
          <div className="flex justify-between">
            <h4 className="font-black text-slate-900">CASO DE ESTUDIO #{i+1}</h4>
            <Button variant="ghost" onClick={() => setData(data.filter((_, idx) => idx !== i))} className="text-red-500"><Trash2 size={18}/></Button>
          </div>
          <Input value={c.titulo} onChange={e => update(i, 'titulo', e.target.value)} placeholder="Título del escenario..." className="font-bold"/>
          <Textarea value={c.contexto} onChange={e => update(i, 'contexto', e.target.value)} placeholder="Contexto narrativo..." className="h-24"/>
          <div className="grid md:grid-cols-3 gap-4">
            {[0, 1, 2].map(oi => (
              <div key={oi} className="p-4 bg-slate-50 rounded-2xl space-y-2 border border-slate-100">
                <div className="flex justify-between items-center"><span className="text-[10px] font-black">OPCIÓN {oi+1}</span> <input type="radio" checked={c.opcionCorrecta === oi} onChange={() => update(i, 'opcionCorrecta', oi)} /></div>
                <Input value={c.opciones[oi]} onChange={e => { const no = [...c.opciones]; no[oi] = e.target.value; update(i, 'opciones', no); }} placeholder="Acción..." className="text-xs bg-white"/>
                <Textarea value={c.feedbacks[oi]} onChange={e => { const nf = [...c.feedbacks]; nf[oi] = e.target.value; update(i, 'feedbacks', nf); }} placeholder="Consecuencia..." className="text-[10px] bg-white h-20"/>
              </div>
            ))}
          </div>
          <Textarea value={c.consejoFinal} onChange={e => update(i, 'consejoFinal', e.target.value)} placeholder="Refuerzo educativo final..." className="bg-yellow-50 border-yellow-100 text-xs italic" />
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
  const add = () => { if(w) { setData([...data, w.toUpperCase().trim()]); setW(""); } };
  
  return (
    <Card className="p-6 shadow-sm border-slate-100">
      <h3 className="font-black text-sm uppercase mb-4 text-slate-400">Diccionario de la Sopa</h3>
      <div className="flex gap-2 mb-6">
        <Input value={w} onChange={e => setW(e.target.value)} placeholder="Nueva palabra..." onKeyDown={e => e.key === 'Enter' && add()} />
        <Button onClick={add} className="bg-slate-900 text-white font-bold px-8">AÑADIR</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {data.map((word, i) => (
          <div key={i} className="bg-red-50 text-red-600 px-4 py-2 rounded-full font-black text-[10px] flex gap-2 items-center border border-red-100">
            {word} <Trash2 size={12} className="cursor-pointer" onClick={() => setData(data.filter((_, idx) => idx !== i))} />
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
      <Button onClick={add} className="w-full border-dashed border-2 py-8 bg-white text-slate-500 hover:bg-slate-50 border-slate-200">
        <Plus size={20} className="mr-2"/> Añadir Afirmación
      </Button>
      {data.map((p, i) => (
        <Card key={i} className="p-6 relative border-l-4 border-blue-500 shadow-md space-y-4">
          <Button variant="ghost" className="absolute top-2 right-2 text-slate-300 hover:text-red-500" onClick={() => setData(data.filter((_, idx) => idx !== i))}><Trash2 size={18}/></Button>
          <Input value={p.afirmacion} onChange={e => update(i, 'afirmacion', e.target.value)} placeholder="Afirmación..." className="font-bold"/>
          <div className="flex bg-slate-100 p-1 rounded-xl w-60">
            <button onClick={() => update(i, 'esVerdadero', true)} className={`flex-1 py-2 rounded-lg text-xs font-black transition-all ${p.esVerdadero ? 'bg-green-500 text-white shadow-lg' : 'text-slate-400'}`}>VERDADERO</button>
            <button onClick={() => update(i, 'esVerdadero', false)} className={`flex-1 py-2 rounded-lg text-xs font-black transition-all ${!p.esVerdadero ? 'bg-red-500 text-white shadow-lg' : 'text-slate-400'}`}>FALSO</button>
          </div>
          <Textarea value={p.explicacion} onChange={e => update(i, 'explicacion', e.target.value)} placeholder="Explicación del porqué..." className="text-xs italic bg-slate-50" />
        </Card>
      ))}
    </div>
  );
};

// ==========================================
// 6. ANALÍTICAS Y LOGS DE PARTICIPACIÓN
// ==========================================
export const EstadisticasDetalladas = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-slate-900 text-white">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Participaciones</p>
          <p className="text-4xl font-black">{data.length}</p>
        </Card>
        <Card className="p-6 bg-white border">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Rendimiento Promedio</p>
          <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
             <div className="h-full bg-red-500" style={{width: '75%'}}></div>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden border-none shadow-2xl bg-white rounded-[2rem]">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <th className="p-6">Colaborador</th>
              <th className="p-6 text-center">Tipo Juego</th>
              <th className="p-6 text-center">Puntos</th>
              <th className="p-6">Análisis de Desempeño</th>
              <th className="p-6 text-right">Fecha</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {data.map((log, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-6">
                  <div className="flex items-center gap-3 font-bold text-slate-800 uppercase">
                    <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">{log.display_name?.charAt(0)}</div>
                    {log.display_name}
                  </div>
                </td>
                <td className="p-6 text-center">
                  <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-[9px] font-black">{log.game_type}</span>
                </td>
                <td className="p-6 text-center font-black text-red-600 text-lg">
                  {log.score}
                </td>
                <td className="p-6">
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {log.detalleRespuestas ? log.detalleRespuestas.map((res, ri) => (
                      <div key={ri} className={`w-5 h-5 rounded flex items-center justify-center text-[8px] font-black ${res.fueCorrecto ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {ri + 1}
                      </div>
                    )) : (
                      <span className="text-[10px] text-slate-400 italic font-medium">Log de respuestas no disponible</span>
                    )}
                  </div>
                </td>
                <td className="p-6 text-right text-slate-400 font-medium text-xs">
                  {log.created_at?.toDate().toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};
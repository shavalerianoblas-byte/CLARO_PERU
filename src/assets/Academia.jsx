import React, { useState } from 'react';
import { 
  MonitorPlay, LayoutGrid, Play, Star, Clock, 
  BarChart3, ChevronRight, ArrowRight 
} from 'lucide-react';

export default function Academy() {
  const categories = ["Todos", "Liderazgo", "Discapacidad", "Diversidad", "Comunicación", "Tecnología"];
  const [activeCat, setActiveCat] = useState("Todos");

  const courses = [
    { id: 1, title: "Liderazgo en Tiempos de Cambio", level: "Intermedio", duration: "4h 20m", instructor: "Ana Belén", rating: 4.9, students: "1.2k", category: "Liderazgo", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop" },
    { id: 2, title: "Lengua de Señas: Nivel Básico", level: "Principiante", duration: "10h 00m", instructor: "Carlos Ruiz", rating: 5.0, students: "3.5k", category: "Discapacidad", img: "https://images.unsplash.com/photo-1460518451285-cd7afdf135ee?q=80&w=800&auto=format&fit=crop" },
    { id: 3, title: "Inteligencia Artificial Ética", level: "Avanzado", duration: "6h 15m", instructor: "David Soto", rating: 4.8, students: "800", category: "Tecnología", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop" },
    { id: 4, title: "Sesgos Inconscientes en Reclutamiento", level: "Intermedio", duration: "2h 45m", instructor: "Elena Paz", rating: 4.7, students: "2.1k", category: "Diversidad", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop" },
    { id: 5, title: "Comunicación Asertiva Global", level: "Principiante", duration: "3h 30m", instructor: "Sonia Mar", rating: 4.9, students: "1.9k", category: "Comunicación", img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop" },
    { id: 6, title: "Cultura Organizacional Claro", level: "Todos", duration: "1h 20m", instructor: "RRHH Claro", rating: 4.6, students: "12k", category: "Liderazgo", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop" },
  ];

  const filtered = activeCat === "Todos" ? courses : courses.filter(c => c.category === activeCat);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Hero de Cursos */}
      <section className="relative h-[400px] rounded-[4rem] overflow-hidden bg-black flex items-center px-16">
        <img 
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000" 
          alt="Learning" 
        />
        <div className="relative z-10 max-w-2xl space-y-6">
          <span className="px-5 py-2 bg-[#ee121a] text-white rounded-full text-[10px] font-black uppercase tracking-widest italic shadow-xl shadow-red-500/30">
            Nuevo Contenido
          </span>
          <h2 className="text-6xl font-black italic text-white uppercase tracking-tighter leading-none">
            Domina el Futuro<br/>de la Inclusión
          </h2>
          <p className="text-white/60 text-lg font-medium">
            Explora más de 250 horas de contenido diseñado por expertos globales en diversidad y liderazgo.
          </p>
          <button className="flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform group">
            Explorar Catálogo <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
          </button>
        </div>
      </section>

      {/* Filtros de Categoría */}
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter">Tu Academia</h3>
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Filtrar por categoría de aprendizaje</p>
          </div>
          <div className="flex gap-4">
            <div className="p-3 bg-white rounded-2xl border border-gray-100 shadow-sm cursor-pointer">
              <LayoutGrid size={20} className="text-gray-400 hover:text-[#ee121a] transition-colors" />
            </div>
            <div className="p-3 bg-gray-50 rounded-2xl border border-transparent cursor-pointer">
              <MonitorPlay size={20} className="text-gray-300" />
            </div>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-8 py-4 rounded-3xl font-black uppercase text-[10px] tracking-widest transition-all whitespace-nowrap ${
                activeCat === cat 
                  ? 'bg-[#ee121a] text-white shadow-xl shadow-red-100' 
                  : 'bg-white text-gray-400 border border-gray-100 hover:border-red-100 hover:text-[#ee121a]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Cursos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filtered.map((course) => (
          <div 
            key={course.id} 
            className="group bg-white rounded-[3.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            {/* Imagen y Badge */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={course.img} 
                alt={course.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[8px] font-black uppercase tracking-widest text-[#1a1a1a]">
                  {course.category}
                </span>
              </div>
              <button className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
                  <Play size={24} fill="currentColor" className="ml-1" />
                </div>
              </button>
            </div>

            {/* Contenido del Curso */}
            <div className="p-10 space-y-6">
              <div className="flex justify-between items-center text-[10px] font-black text-gray-300 uppercase tracking-widest">
                <span className="flex items-center gap-1.5 text-[#ee121a]">
                  <BarChart3 size={12} /> {course.level}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={12} /> {course.duration}
                </span>
              </div>
              
              <h4 className="text-2xl font-black italic uppercase leading-[1.1] text-gray-900 group-hover:text-[#ee121a] transition-colors">
                {course.title}
              </h4>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white overflow-hidden shadow-sm">
                  <img src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${course.instructor}`} alt={course.instructor} />
                </div>
                <span className="text-xs font-bold text-gray-500">{course.instructor}</span>
                <div className="ml-auto flex items-center gap-1">
                  <Star size={12} fill="#ee121a" stroke="none" />
                  <span className="text-xs font-black">{course.rating}</span>
                </div>
              </div>

              {/* Footer de la Card */}
              <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                      <img src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${i + 10}`} alt="Estudiante" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-black flex items-center justify-center text-[8px] font-bold text-white shadow-sm">
                    +{course.students}
                  </div>
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-gray-400 hover:text-[#ee121a] transition-colors">
                  Ver Detalles <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
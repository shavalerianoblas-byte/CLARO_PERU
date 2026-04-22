import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, ChevronRight, Clock, CheckCircle2, 
  Play, FileText, Video, Headphones, Download,
  Filter, Search, X, ArrowLeft, Star, Trophy,
  Flame, Award, TrendingUp, Lock, Unlock, Gift,
  Target, Zap, Crown, Medal, Sparkles, Check,
  ArrowRight, Pause, Volume2, BookMarked,
  Lightbulb, MessageCircle, Users, Calendar,
  BarChart3, Circle, RotateCcw, ExternalLink
} from 'lucide-react';

// ==========================================
// SISTEMA DE DISEÑO - COLORES CORPORATIVOS
// ==========================================
const THEME = {
  primary: '#EE121A',
  primaryLight: '#FF4D54',
  primaryDark: '#C40F15',
  primaryGhost: '#FFF0F0',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6'
};

// ==========================================
// DATOS COMPLETOS DE CURSOS CON MÓDULOS
// ==========================================

const ALL_COURSES = [
  // ========== EN PROGRESO ==========
  {
    id: 1,
    title: "Liderazgo Inclusivo en la Era Digital",
    category: "Estrategia",
    type: "video",
    progress: 65,
    completedModules: 4,
    totalModules: 6,
    currentModule: 5,
    timeLeft: 45,
    lastAccess: "Hace 2 horas",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800",
    isNew: false,
    completedDate: null,
    status: "in_progress",
    duration: "6h 30min",
    instructor: "Dra. María González",
    rating: 4.8,
    description: "Aprende a liderar equipos diversos en entornos digitales con herramientas prácticas de inclusión.",
    reward: {
      points: 1500,
      badge: "Líder Inclusivo",
      certificate: true
    },
    modules: [
      { 
        id: 1, 
        title: "Introducción al Liderazgo Inclusivo", 
        type: "video", 
        duration: "15 min", 
        completed: true,
        description: "Fundamentos del liderazgo inclusivo y su impacto en la organización.",
        videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk",
        materials: [
          { name: "Guía del módulo 1", type: "pdf", size: "2.4 MB" },
          { name: "Diagnóstico inicial", type: "doc", size: "1.1 MB" }
        ]
      },
      { 
        id: 2, 
        title: "Sesgos Inconscientes en el Liderazgo", 
        type: "video", 
        duration: "22 min", 
        completed: true,
        description: "Identifica y mitiga sesgos cognitivos que afectan la toma de decisiones.",
        videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk",
        materials: [
          { name: "Test de sesgos Harvard", type: "pdf", size: "3.2 MB" },
          { name: "Casos prácticos", type: "ppt", size: "5.8 MB" }
        ]
      },
      { 
        id: 3, 
        title: "Comunicación Inclusiva", 
        type: "video", 
        duration: "18 min", 
        completed: true,
        description: "Técnicas de comunicación que fomentan la participación de todos.",
        videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk",
        materials: [
          { name: "Plantillas de comunicación", type: "doc", size: "1.5 MB" }
        ]
      },
      { 
        id: 4, 
        title: "Toma de Decisiones Diversas", 
        type: "video", 
        duration: "25 min", 
        completed: true,
        description: "Metodologías para decisiones grupales que valoran la diversidad de opiniones.",
        videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk",
        materials: [
          { name: "Framework DECIDE", type: "pdf", size: "2.1 MB" },
          { name: "Ejercicio grupal", type: "xls", size: "890 KB" }
        ]
      },
      { 
        id: 5, 
        title: "Mentoría y Desarrollo de Talento", 
        type: "video", 
        duration: "30 min", 
        completed: false,
        current: true,
        description: "Estrategias de mentoría para talento diverso y plan de carrera inclusivo.",
        videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk",
        materials: [
          { name: "Plantilla de mentoría", type: "doc", size: "2.3 MB" },
          { name: "Plan de desarrollo", type: "pdf", size: "1.8 MB" }
        ]
      },
      { 
        id: 6, 
        title: "Evaluación y Métricas DEI", 
        type: "document", 
        duration: "20 min", 
        completed: false,
        description: "KPIs y métricas para medir el impacto de la inclusión en tu equipo.",
        materials: [
          { name: "Dashboard de métricas", type: "xls", size: "3.5 MB" },
          { name: "Guía de evaluación", type: "pdf", size: "2.7 MB" }
        ]
      }
    ]
  },
  
  {
    id: 2,
    title: "Comunicación No Sexista Corporativa",
    category: "Cultura",
    type: "video",
    progress: 30,
    completedModules: 2,
    totalModules: 8,
    currentModule: 3,
    timeLeft: 120,
    lastAccess: "Ayer",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800",
    isNew: true,
    completedDate: null,
    status: "in_progress",
    duration: "8h 15min",
    instructor: "Lic. Carlos Mendoza",
    rating: 4.9,
    description: "Reconoce y elimina el lenguaje sexista en comunicaciones corporativas con ejemplos reales.",
    reward: {
      points: 2000,
      badge: "Comunicador Inclusivo",
      certificate: true
    },
    modules: [
      { 
        id: 1, 
        title: "Identificando el Lenguaje Sexista", 
        type: "video", 
        duration: "20 min", 
        completed: true,
        description: "Análisis de términos y frases sexistas en el entorno laboral.",
        videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk",
        materials: [
          { name: "Glosario de términos", type: "pdf", size: "1.9 MB" }
        ]
      },
      { 
        id: 2, 
        title: "Alternativas Inclusivas", 
        type: "video", 
        duration: "18 min", 
        completed: true,
        description: "Sustituciones linguísticas para un lenguaje corporativo inclusivo.",
        videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk",
        materials: [
          { name: "Diccionario inclusivo", type: "pdf", size: "4.2 MB" }
        ]
      },
      { 
        id: 3, 
        title: "Comunicación Corporativa Neutral", 
        type: "video", 
        duration: "25 min", 
        completed: false,
        current: true,
        description: "Redacción de comunicaciones oficiales con lenguaje de género neutro.",
        videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk",
        materials: [
          { name: "Manual de redacción", type: "doc", size: "3.1 MB" }
        ]
      },
      { 
        id: 4, 
        title: "Redacción de Correos Inclusivos", 
        type: "document", 
        duration: "15 min", 
        completed: false,
        description: "Buenas prácticas para emails y mensajes internos inclusivos.",
        materials: [
          { name: "Plantillas de correos", type: "doc", size: "2.5 MB" }
        ]
      },
      { 
        id: 5, 
        title: "Presentaciones sin Sesgos", 
        type: "video", 
        duration: "30 min", 
        completed: false,
        description: "Diseño de presentaciones que evitan estereotipos de género.",
        videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk",
        materials: [
          { name: "Plantillas PowerPoint", type: "ppt", size: "12.4 MB" }
        ]
      },
      { 
        id: 6, 
        title: "Guía de Estilo Inclusivo", 
        type: "document", 
        duration: "10 min", 
        completed: false,
        description: "Creación de una guía de estilo corporativa inclusiva.",
        materials: [
          { name: "Template guía de estilo", type: "doc", size: "1.7 MB" }
        ]
      },
      { 
        id: 7, 
        title: "Evaluación Final", 
        type: "video", 
        duration: "45 min", 
        completed: false,
        description: "Evaluación práctica de conocimientos adquiridos.",
        videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk",
        materials: [
          { name: "Cuestionario", type: "pdf", size: "890 KB" }
        ]
      },
      { 
        id: 8, 
        title: "Certificación", 
        type: "document", 
        duration: "5 min", 
        completed: false,
        description: "Generación de certificado de competencia.",
        materials: [
          { name: "Certificado", type: "pdf", size: "1.2 MB" }
        ]
      }
    ]
  },
  
  {
    id: 7,
    title: "Neurodiversidad en el Workplace",
    category: "Cultura",
    type: "video",
    progress: 15,
    completedModules: 1,
    totalModules: 10,
    currentModule: 2,
    timeLeft: 180,
    lastAccess: "Hace 3 días",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800",
    isNew: true,
    completedDate: null,
    status: "in_progress",
    duration: "10h 00min",
    instructor: "Psic. Ana Torres",
    rating: 4.7,
    description: "Estrategias prácticas para integrar talento neurodivergente en equipos de trabajo.",
    reward: {
      points: 2500,
      badge: "Aliado Neurodiverso",
      certificate: true
    },
    modules: [
      { 
        id: 1, 
        title: "Fundamentos de Neurodiversidad", 
        type: "video", 
        duration: "30 min", 
        completed: true,
        description: "Conceptos básicos: TDAH, autismo, dislexia y dispraxia.",
        videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk",
        materials: [
          { name: "Infografía neurodiversidad", type: "pdf", size: "3.8 MB" }
        ]
      },
      { 
        id: 2, 
        title: "Ambientes Sensibles", 
        type: "video", 
        duration: "25 min", 
        completed: false,
        current: true,
        description: "Adaptación de espacios físicos para personas neurodivergentes.",
        videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk",
        materials: [
          { name: "Checklist de ambiente", type: "pdf", size: "2.1 MB" }
        ]
      },
      { id: 3, title: "Comunicación Efectiva", type: "video", duration: "20 min", completed: false, description: "Técnicas de comunicación adaptadas.", videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk", materials: [{ name: "Guía comunicación", type: "pdf", size: "1.5 MB" }] },
      { id: 4, title: "Gestión del Tiempo", type: "document", duration: "15 min", completed: false, description: "Herramientas de organización temporal.", materials: [{ name: "Template agenda", type: "xls", size: "1.2 MB" }] },
      { id: 5, title: "Trabajo en Equipo", type: "video", duration: "35 min", completed: false, description: "Dinámicas inclusivas para equipos mixtos.", videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk", materials: [{ name: "Dinámicas grupales", type: "pdf", size: "4.5 MB" }] },
      { id: 6, title: "Tecnología Asistiva", type: "video", duration: "40 min", completed: false, description: "Software y hardware para apoyo neurodivergente.", videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk", materials: [{ name: "Catálogo de apps", type: "pdf", size: "5.2 MB" }] },
      { id: 7, title: "Entrevistas Inclusivas", type: "video", duration: "30 min", completed: false, description: "Procesos de selección adaptados.", videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk", materials: [{ name: "Guía de entrevistas", type: "doc", size: "2.8 MB" }] },
      { id: 8, title: "Plan de Ajustes Razonables", type: "document", duration: "25 min", completed: false, description: "Documentación de ajustes laborales.", materials: [{ name: "Template plan ajustes", type: "doc", size: "1.9 MB" }] },
      { id: 9, title: "Casos de Éxito", type: "video", duration: "45 min", completed: false, description: "Empresas líderes en neuroinclusión.", videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk", materials: [{ name: "Casos estudio", type: "pdf", size: "6.1 MB" }] },
      { id: 10, title: "Certificación", type: "document", duration: "10 min", completed: false, description: "Evaluación y certificación final.", materials: [{ name: "Certificado", type: "pdf", size: "1.2 MB" }] }
    ]
  },

  // ========== COMPLETADOS ==========
  {
    id: 3,
    title: "Fundamentos de Accesibilidad Web",
    category: "Técnico",
    type: "video",
    progress: 100,
    completedModules: 10,
    totalModules: 10,
    currentModule: 10,
    timeLeft: 0,
    lastAccess: "Hace 3 días",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=800",
    isNew: false,
    completedDate: "18 Dic 2026",
    status: "completed",
    duration: "5h 45min",
    instructor: "Ing. Pedro Sánchez",
    rating: 4.6,
    description: "Principios de accesibilidad WCAG 2.1 para desarrolladores y diseñadores.",
    reward: {
      points: 1800,
      badge: "Especialista Accesibilidad",
      certificate: true,
      bonus: "Bonus: 500 pts por completar en tiempo récord"
    },
    modules: [
      { id: 1, title: "Principios WCAG 2.1", type: "video", duration: "20 min", completed: true, description: "Los 4 principios fundamentales.", videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk", materials: [{ name: "Resumen WCAG", type: "pdf", size: "2.3 MB" }] },
      { id: 2, title: "Perceptible", type: "video", duration: "25 min", completed: true, description: "Información presentada de forma perceptible.", videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk", materials: [{ name: "Checklist perceptible", type: "pdf", size: "1.8 MB" }] },
      { id: 3, title: "Operable", type: "video", duration: "22 min", completed: true, description: "Componentes de interfaz operables.", videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk", materials: [{ name: "Test de operabilidad", type: "xls", size: "2.1 MB" }] },
      { id: 4, title: "Comprensible", type: "video", duration: "18 min", completed: true, description: "Información comprensible y predecible.", videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk", materials: [{ name: "Guía legibilidad", type: "pdf", size: "3.2 MB" }] },
      { id: 5, title: "Robusto", type: "video", duration: "20 min", completed: true, description: "Compatibilidad con tecnologías asistivas.", videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk", materials: [{ name: "Testing con lectores", type: "pdf", size: "4.1 MB" }] },
      { id: 6, title: "Herramientas de Testing", type: "document", duration: "30 min", completed: true, description: "Lighthouse, axe, WAVE y otras herramientas.", materials: [{ name: "Guía de herramientas", type: "pdf", size: "5.6 MB" }] },
      { id: 7, title: "Casos Prácticos", type: "video", duration: "35 min", completed: true, description: "Auditoría en vivo de sitios reales.", videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk", materials: [{ name: "Casos prácticos", type: "ppt", size: "8.9 MB" }] },
      { id: 8, title: "Implementación", type: "document", duration: "25 min", completed: true, description: "Roadmap de implementación en proyectos.", materials: [{ name: "Roadmap template", type: "xls", size: "2.4 MB" }] },
      { id: 9, title: "Auditoría de Accesibilidad", type: "video", duration: "40 min", completed: true, description: "Metodología completa de auditoría.", videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk", materials: [{ name: "Template auditoría", type: "doc", size: "3.7 MB" }] },
      { id: 10, title: "Certificación Final", type: "document", duration: "10 min", completed: true, description: "Evaluación y emisión de certificado.", materials: [{ name: "Certificado", type: "pdf", size: "1.2 MB" }] }
    ]
  },

  {
    id: 4,
    title: "Empatía y Escucha Activa",
    category: "Cultura",
    type: "audio",
    progress: 100,
    completedModules: 5,
    totalModules: 5,
    currentModule: 5,
    timeLeft: 0,
    lastAccess: "Hace 1 semana",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800",
    isNew: false,
    completedDate: "10 Dic 2026",
    status: "completed",
    duration: "3h 20min",
    instructor: "Lic. Rosa Díaz",
    rating: 4.9,
    description: "Desarrolla habilidades de escucha activa y empatía para ambientes inclusivos.",
    reward: {
      points: 1200,
      badge: "Escucha Activa",
      certificate: true
    },
    modules: [
      { id: 1, title: "Fundamentos de la Empatía", type: "audio", duration: "25 min", completed: true, description: "Bases neurocientíficas de la empatía.", materials: [{ name: "Transcripción", type: "pdf", size: "1.2 MB" }] },
      { id: 2, title: "Técnicas de Escucha", type: "audio", duration: "30 min", completed: true, description: "Escucha activa, reflexiva y empática.", materials: [{ name: "Ejercicios prácticos", type: "pdf", size: "2.1 MB" }] },
      { id: 3, title: "Comunicación No Violenta", type: "audio", duration: "35 min", completed: true, description: "Modelo CNV de Marshall Rosenberg.", materials: [{ name: "Carta CNV", type: "pdf", size: "1.8 MB" }] },
      { id: 4, title: "Manejo de Conflictos", type: "audio", duration: "40 min", completed: true, description: "Resolución de conflictos con empatía.", materials: [{ name: "Guía conflictos", type: "pdf", size: "3.4 MB" }] },
      { id: 5, title: "Práctica y Evaluación", type: "document", duration: "20 min", completed: true, description: "Ejercicios prácticos y autoevaluación.", materials: [{ name: "Certificado", type: "pdf", size: "1.2 MB" }] }
    ]
  },

  {
    id: 5,
    title: "Diversidad Generacional",
    category: "Estrategia",
    type: "document",
    progress: 100,
    completedModules: 4,
    totalModules: 4,
    currentModule: 4,
    timeLeft: 0,
    lastAccess: "Hace 2 semanas",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800",
    isNew: false,
    completedDate: "1 Dic 2026",
    status: "completed",
    duration: "4h 00min",
    instructor: "Dr. Juan Pérez",
    rating: 4.5,
    description: "Gestiona equipos multigeneracionales: Baby Boomers, Gen X, Millennials y Gen Z.",
    reward: {
      points: 1600,
      badge: "Bridge Builder",
      certificate: true
    },
    modules: [
      { id: 1, title: "Baby Boomers en la Empresa", type: "document", duration: "45 min", completed: true, description: "Valores, fortalezas y motivaciones.", materials: [{ name: "Perfil generacional", type: "pdf", size: "2.8 MB" }] },
      { id: 2, title: "Generación X", type: "document", duration: "40 min", completed: true, description: "Independencia y balance trabajo-vida.", materials: [{ name: "Estrategias Gen X", type: "pdf", size: "2.3 MB" }] },
      { id: 3, title: "Millennials y Gen Z", type: "document", duration: "50 min", completed: true, description: "Propósito, tecnología y flexibilidad.", materials: [{ name: "Guía Millennials-Z", type: "pdf", size: "3.1 MB" }] },
      { id: 4, title: "Integración Multigeneracional", type: "document", duration: "45 min", completed: true, description: "Estrategias de equipo mixto.", materials: [{ name: "Certificado", type: "pdf", size: "1.2 MB" }] }
    ]
  },

  // ========== DISPONIBLES ==========
  {
    id: 8,
    title: "Manual de Lenguaje Inclusivo",
    category: "Cultura",
    type: "document",
    progress: 0,
    completedModules: 0,
    totalModules: 3,
    currentModule: 1,
    timeLeft: 90,
    lastAccess: "Nunca",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800",
    isNew: true,
    completedDate: null,
    status: "available",
    duration: "2h 30min",
    instructor: "Equipo DEI Claro",
    rating: 4.4,
    description: "Guía completa de términos y frases inclusivas para comunicación corporativa.",
    reward: {
      points: 800,
      badge: "Comunicador Inclusivo",
      certificate: true
    },
    modules: [
      { id: 1, title: "Términos Inclusivos", type: "document", duration: "45 min", completed: false, current: true, description: "Sustitución de términos excluyentes.", materials: [{ name: "Diccionario inclusivo", type: "pdf", size: "4.5 MB" }] },
      { id: 2, title: "Redacción Inclusiva", type: "document", duration: "50 min", completed: false, description: "Técnicas de redacción corporativa.", materials: [{ name: "Manual redacción", type: "pdf", size: "3.2 MB" }] },
      { id: 3, title: "Evaluación y Certificación", type: "document", duration: "25 min", completed: false, description: "Prueba práctica y certificado.", materials: [{ name: "Certificado", type: "pdf", size: "1.2 MB" }] }
    ]
  },

  {
    id: 9,
    title: "Podcast: Historias de Inclusión",
    category: "Cultura",
    type: "audio",
    progress: 0,
    completedModules: 0,
    totalModules: 12,
    currentModule: 1,
    timeLeft: 360,
    lastAccess: "Nunca",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?q=80&w=800",
    isNew: true,
    completedDate: null,
    status: "available",
    duration: "12 episodios",
    instructor: "Varios invitados",
    rating: 4.7,
    description: "Testimonios reales de colaboradores sobre su experiencia de inclusión en Claro.",
    reward: {
      points: 1000,
      badge: "Storyteller",
      certificate: false
    },
    modules: [
      { id: 1, title: "Ep.1: Mi historia en Claro", type: "audio", duration: "30 min", completed: false, current: true, description: "Testimonio de María, 15 años en la empresa.", materials: [{ name: "Transcripción", type: "pdf", size: "1.5 MB" }] },
      { id: 2, title: "Ep.2: Superando barreras", type: "audio", duration: "35 min", completed: false, description: "Carlos y su experiencia con discapacidad visual.", materials: [{ name: "Transcripción", type: "pdf", size: "1.8 MB" }] },
      { id: 3, title: "Ep.3: Liderazgo femenino", type: "audio", duration: "40 min", completed: false, description: "Ana, directora de operaciones.", materials: [{ name: "Transcripción", type: "pdf", size: "2.1 MB" }] },
      { id: 4, title: "Ep.4: Diversidad cultural", type: "audio", duration: "32 min", completed: false, description: "Equipo multicultural en acción.", materials: [{ name: "Transcripción", type: "pdf", size: "1.6 MB" }] },
      { id: 5, title: "Ep.5: Neurodiversidad", type: "audio", duration: "38 min", completed: false, description: "Diego, programador con TDAH.", materials: [{ name: "Transcripción", type: "pdf", size: "1.9 MB" }] },
      { id: 6, title: "Ep.6: Inclusión LGBTQ+", type: "audio", duration: "45 min", completed: false, description: "Historia de Laura y su red de apoyo.", materials: [{ name: "Transcripción", type: "pdf", size: "2.3 MB" }] },
      { id: 7, title: "Ep.7: Accesibilidad", type: "audio", duration: "30 min", completed: false, description: "Pedro, experto en accesibilidad web.", materials: [{ name: "Transcripción", type: "pdf", size: "1.4 MB" }] },
      { id: 8, title: "Ep.8: Mentoría", type: "audio", duration: "35 min", completed: false, description: "Programa de mentoría intergeneracional.", materials: [{ name: "Transcripción", type: "pdf", size: "1.7 MB" }] },
      { id: 9, title: "Ep.9: Equidad salarial", type: "audio", duration: "40 min", completed: false, description: "Lucha por la paridad de remuneraciones.", materials: [{ name: "Transcripción", type: "pdf", size: "2.0 MB" }] },
      { id: 10, title: "Ep.10: Eventos inclusivos", type: "audio", duration: "25 min", completed: false, description: "Organización de eventos accesibles.", materials: [{ name: "Transcripción", type: "pdf", size: "1.2 MB" }] },
      { id: 11, title: "Ep.11: Futuro del DEI", type: "audio", duration: "42 min", completed: false, description: "Tendencias 2027 en diversidad.", materials: [{ name: "Transcripción", type: "pdf", size: "2.2 MB" }] },
      { id: 12, title: "Ep.12: Mensaje del CEO", type: "audio", duration: "20 min", completed: false, description: "Compromiso de la alta dirección.", materials: [{ name: "Transcripción", type: "pdf", size: "1.0 MB" }] }
    ]
  },

  // ========== BLOQUEADOS ==========
  {
    id: 6,
    title: "Alianzas Estratégicas para la Inclusión",
    category: "Estrategia",
    type: "video",
    progress: 0,
    completedModules: 0,
    totalModules: 7,
    currentModule: 1,
    timeLeft: 210,
    lastAccess: "Nunca",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800",
    isNew: false,
    completedDate: null,
    status: "locked",
    duration: "7h 30min",
    instructor: "Dra. Laura Vargas",
    rating: 4.8,
    description: "Construye alianzas con organizaciones externas para fortalecer programas DEI.",
    requiredLevel: "Avanzado",
    requiredPoints: 5000,
    reward: {
      points: 3000,
      badge: "Estratega DEI",
      certificate: true
    },
    modules: [
      { id: 1, title: "Mapeo de Stakeholders", type: "video", duration: "45 min", completed: false, description: "Identificación de aliados estratégicos.", videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk", materials: [{ name: "Template stakeholder", type: "xls", size: "2.1 MB" }] },
      { id: 2, title: "Propuesta de Valor", type: "video", duration: "50 min", completed: false, description: "Creación de propuestas conjuntas.", videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk", materials: [{ name: "Template propuesta", type: "ppt", size: "4.3 MB" }] },
      { id: 3, title: "Negociación Inclusiva", type: "video", duration: "40 min", completed: false, description: "Técnicas de negociación con perspectiva DEI.", videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk", materials: [{ name: "Guía negociación", type: "pdf", size: "3.2 MB" }] },
      { id: 4, title: "Gestión de Alianzas", type: "document", duration: "35 min", completed: false, description: "KPIs y seguimiento de alianzas.", materials: [{ name: "Dashboard alianzas", type: "xls", size: "2.8 MB" }] },
      { id: 5, title: "Eventos Conjuntos", type: "video", duration: "55 min", completed: false, description: "Organización de eventos con aliados.", videoUrl: "https://www.youtube.com/embed/HWL4lpvsnXk", materials: [{ name: "Plan eventos", type: "pdf", size: "4.1 MB" }] },
      { id: 6, title: "Medición de Impacto", type: "document", duration: "30 min", completed: false, description: "Evaluación del impacto de alianzas.", materials: [{ name: "Framework impacto", type: "pdf", size: "2.9 MB" }] },
      { id: 7, title: "Certificación", type: "document", duration: "15 min", completed: false, description: "Evaluación final y certificado.", materials: [{ name: "Certificado", type: "pdf", size: "1.2 MB" }] }
    ]
  }
];

// ==========================================
// COMPONENTES AUXILIARES
// ==========================================

const Badge = ({ children, variant = 'primary', size = 'md', animated = false }) => {
  const variants = {
    primary: 'bg-[#EE121A] text-white',
    success: 'bg-emerald-500 text-white',
    warning: 'bg-amber-500 text-white',
    light: 'bg-red-50 text-[#EE121A]',
    gray: 'bg-gray-100 text-gray-600',
    outline: 'bg-white text-[#EE121A] border-2 border-[#EE121A]',
    gold: 'bg-gradient-to-r from-amber-400 to-amber-600 text-white'
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-[9px]',
    md: 'px-3 py-1 text-[10px]',
    lg: 'px-4 py-1.5 text-xs'
  };

  return (
    <span className={`
      ${variants[variant]} ${sizes[size]}
      rounded-full font-black uppercase tracking-wider inline-flex items-center gap-1
      ${animated ? 'animate-pulse' : ''}
      shadow-sm
    `}>
      {children}
    </span>
  );
};

const TypeIcon = ({ type, size = 16 }) => {
  const icons = {
    video: Video,
    document: FileText,
    audio: Headphones
  };
  const Icon = icons[type] || BookOpen;
  const colors = {
    video: 'bg-red-100 text-[#EE121A]',
    document: 'bg-blue-100 text-blue-600',
    audio: 'bg-purple-100 text-purple-600'
  };
  
  return (
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colors[type] || 'bg-gray-100 text-gray-600'}`}>
      <Icon size={size} strokeWidth={2.5} />
    </div>
  );
};

const ProgressBar = ({ progress, size = 'md', showLabel = true, color = 'red' }) => {
  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  const colors = {
    red: 'from-[#EE121A] to-[#FF6B6B]',
    emerald: 'from-emerald-500 to-emerald-400',
    blue: 'from-blue-500 to-blue-400'
  };

  return (
    <div className="space-y-2">
      {showLabel && (
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider">
          <span className="text-gray-500">Progreso</span>
          <span className="text-[#EE121A]">{progress}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${sizes[size]}`}>
        <div 
          className={`h-full bg-gradient-to-r ${colors[color]} rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(238,18,26,0.3)]`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// ==========================================
// VISTA DE CURSO DETALLE (PÁGINA INDEPENDIENTE)
// ==========================================

const CourseDetailView = ({ course, onBack }) => {
  const [activeModule, setActiveModule] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [completedModules, setCompletedModules] = useState(
    course.modules.filter(m => m.completed).map(m => m.id)
  );

  const modules = course.modules;
  const currentModule = modules.find(m => m.id === course.currentModule) || modules[0];
  const progress = Math.round((completedModules.length / modules.length) * 100);
  const isCompleted = progress === 100;

  const handlePlayModule = (module) => {
    setActiveModule(module);
    if (module.type === 'video') {
      setShowVideoModal(true);
    }
  };

  const handleCompleteModule = (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
      if (completedModules.length + 1 === modules.length) {
        setTimeout(() => setShowRewardModal(true), 500);
      }
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'video': return <Video size={16} />;
      case 'document': return <FileText size={16} />;
      case 'audio': return <Headphones size={16} />;
      default: return <BookOpen size={16} />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'video': return 'text-[#EE121A] bg-red-50 border-red-200';
      case 'document': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'audio': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf': return <FileText size={14} className="text-red-500" />;
      case 'doc': return <FileText size={14} className="text-blue-500" />;
      case 'ppt': return <FileText size={14} className="text-orange-500" />;
      case 'xls': return <FileText size={14} className="text-green-500" />;
      default: return <Download size={14} className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      
      {/* HEADER DEL CURSO */}
      <div className="relative bg-[#EE121A] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EE121A] via-[#FF4D54] to-[#EE121A]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider mb-6"
          >
            <ArrowLeft size={18} />
            Volver a Mi Progreso
          </button>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {course.category}
                </Badge>
                {course.isNew && <Badge variant="outline" className="bg-white/10 text-white border-white/50">NUEVO</Badge>}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase italic text-white leading-tight">
                {course.title}
              </h1>
              
              <p className="text-white/80 mt-4 max-w-2xl leading-relaxed text-sm">
                {course.description}
              </p>

              <div className="flex items-center gap-6 mt-6 text-sm text-white/70">
                <span className="flex items-center gap-1 font-bold">
                  <Clock size={14} /> {course.duration}
                </span>
                <span className="flex items-center gap-1 font-bold">
                  <BookOpen size={14} /> {modules.length} módulos
                </span>
                <span className="flex items-center gap-1 font-bold text-amber-300">
                  <Star size={14} fill="currentColor" /> {course.rating}
                </span>
                <span className="font-bold">{course.instructor}</span>
              </div>
            </div>

            {/* BOTÓN PRINCIPAL */}
            <div className="flex flex-col items-end gap-3">
              {isCompleted ? (
                <>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-bold">
                    <CheckCircle2 size={16} />
                    Completado el {course.completedDate}
                  </div>
                  <button className="px-8 py-4 bg-white text-[#EE121A] rounded-xl text-sm font-black uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center gap-2 shadow-xl">
                    <Download size={18} />
                    Descargar Certificado
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => handlePlayModule(currentModule)}
                  className="px-8 py-4 bg-white text-[#EE121A] rounded-xl text-sm font-black uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center gap-2 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Play size={18} fill="currentColor" />
                  {completedModules.length > 0 ? `Continuar Módulo ${currentModule.id}` : 'Comenzar Curso'}
                </button>
              )}
            </div>
          </div>

          {/* PROGRESO */}
          <div className="mt-8">
            <div className="flex justify-between items-center text-xs font-black uppercase tracking-wider mb-2 text-white/80">
              <span>Tu progreso</span>
              <span className="text-white">{progress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full bg-white rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* RECOMPENSA (VISIBLE SI ESTÁ COMPLETADO O CERCA) */}
      <div className="max-w-7xl mx-auto px-6 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Gift size={28} />
            </div>
            <div>
              <p className="text-sm font-black text-gray-800 uppercase italic">Recompensa al completar</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs font-bold text-[#EE121A] bg-red-50 px-2 py-1 rounded-full">
                  <Trophy size={12} className="inline mr-1" />
                  {course.reward.points.toLocaleString()} pts
                </span>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                  <Medal size={12} className="inline mr-1" />
                  {course.reward.badge}
                </span>
                {course.reward.certificate && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    <Award size={12} className="inline mr-1" />
                    Certificado
                  </span>
                )}
              </div>
            </div>
          </div>
          {course.reward.bonus && (
            <div className="hidden md:block text-xs font-bold text-amber-600 bg-amber-50 px-3 py-2 rounded-xl">
              <Zap size={14} className="inline mr-1" />
              {course.reward.bonus}
            </div>
          )}
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUMNA IZQUIERDA: MÓDULOS */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-gray-800 uppercase italic tracking-tighter">
                Contenido del <span className="text-[#EE121A]">Curso</span>
              </h2>
              <span className="text-sm font-bold text-gray-500">
                {completedModules.length}/{modules.length} completados
              </span>
            </div>

            <div className="space-y-3">
              {modules.map((module, index) => {
                const isCompleted = completedModules.includes(module.id);
                const isCurrent = module.id === currentModule.id && !isCompleted;
                
                return (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`
                      group relative bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300
                      ${isCompleted 
                        ? 'border-emerald-200 bg-emerald-50/30' 
                        : isCurrent
                          ? 'border-[#EE121A] shadow-lg shadow-red-100 ring-4 ring-[#EE121A]/10'
                          : 'border-gray-100 hover:border-[#EE121A]/30 hover:shadow-md'
                      }
                    `}
                  >
                    {/* Header del módulo */}
                    <div 
                      className="p-5 cursor-pointer"
                      onClick={() => handlePlayModule(module)}
                    >
                      <div className="flex items-start gap-4">
                        {/* Número/Estado */}
                        <div className={`
                          w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all
                          ${isCompleted 
                            ? 'bg-emerald-500 text-white' 
                            : isCurrent
                              ? 'bg-[#EE121A] text-white shadow-lg animate-pulse'
                              : 'bg-gray-100 text-gray-400'
                          }
                        `}>
                          {isCompleted ? (
                            <CheckCircle2 size={24} />
                          ) : (
                            <span className="font-black text-lg">{module.id}</span>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase flex items-center gap-1 border ${getTypeColor(module.type)}`}>
                              {getTypeIcon(module.type)}
                              {module.type === 'video' ? 'Video' : module.type === 'document' ? 'Material' : 'Audio'}
                            </span>
                            {isCurrent && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-[#EE121A] text-white animate-pulse">
                                EN PROGRESO
                              </span>
                            )}
                            {isCompleted && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-500 text-white">
                                COMPLETADO
                              </span>
                            )}
                          </div>
                          
                          <h4 className={`font-bold text-base ${isCurrent ? 'text-[#EE121A]' : 'text-gray-800'}`}>
                            {module.title}
                          </h4>
                          
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                            {module.description}
                          </p>
                        </div>

                        {/* Duración + Botón */}
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                            <Clock size={10} /> {module.duration}
                          </span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlayModule(module);
                            }}
                            className={`
                              w-10 h-10 rounded-full flex items-center justify-center transition-all
                              ${isCompleted 
                                ? 'bg-emerald-100 text-emerald-600' 
                                : 'bg-[#EE121A] text-white shadow-md hover:scale-110'
                              }
                            `}
                          >
                            {isCompleted ? <CheckCircle2 size={18} /> : <Play size={16} fill="currentColor" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* MATERIALES (expandible) */}
                    {module.materials && module.materials.length > 0 && (
                      <div className="px-5 pb-4 pt-0">
                        <div className="border-t border-gray-100 pt-3">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">Materiales de trabajo</p>
                          <div className="flex flex-wrap gap-2">
                            {module.materials.map((mat, idx) => (
                              <button 
                                key={idx}
                                className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-red-50 rounded-xl text-xs font-bold text-gray-600 hover:text-[#EE121A] transition-all border border-gray-200 hover:border-[#EE121A]/30"
                              >
                                {getFileIcon(mat.type)}
                                <span className="truncate max-w-[120px]">{mat.name}</span>
                                <span className="text-[9px] text-gray-400">{mat.size}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* BOTÓN COMPLETAR (solo para el actual) */}
                    {isCurrent && !isCompleted && (
                      <div className="px-5 pb-4">
                        <button 
                          onClick={() => handleCompleteModule(module.id)}
                          className="w-full py-3 bg-[#EE121A] text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-[#C40F15] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                        >
                          <CheckCircle2 size={16} />
                          Marcar como completado
                        </button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* COLUMNA DERECHA: RESUMEN Y STATS */}
          <div className="space-y-6">
            
            {/* PROGRESO CIRCULAR */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
              <h3 className="text-sm font-black text-gray-800 uppercase italic mb-4">Tu Avance</h3>
              
              <div className="relative w-40 h-40 mx-auto mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#f3f4f6" strokeWidth="8" />
                  <circle 
                    cx="50" cy="50" r="42" fill="none" 
                    stroke="#EE121A" strokeWidth="8" 
                    strokeDasharray={`${2 * Math.PI * 42}`}
                    strokeDashoffset={`${2 * Math.PI * 42 * (1 - progress / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-[#EE121A] italic">{progress}%</span>
                  <span className="text-[9px] font-bold text-gray-400 uppercase">Completado</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-red-50 rounded-xl border border-red-100">
                  <p className="text-2xl font-black text-[#EE121A]">{completedModules.length}</p>
                  <p className="text-[9px] font-bold text-gray-500 uppercase">Hechos</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-2xl font-black text-gray-700">{modules.length - completedModules.length}</p>
                  <p className="text-[9px] font-bold text-gray-500 uppercase">Pendientes</p>
                </div>
              </div>
            </div>

            {/* RECOMPENSA DETALLADA */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <Trophy size={24} />
                </div>
                <div>
                  <p className="text-sm font-black text-gray-800 uppercase italic">Recompensa</p>
                  <p className="text-[10px] font-bold text-gray-500 uppercase">Al finalizar el curso</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                  <span className="text-xs font-bold text-gray-600 flex items-center gap-2">
                    <Zap size={14} className="text-[#EE121A]" />
                    Puntos
                  </span>
                  <span className="text-lg font-black text-[#EE121A]">{course.reward.points.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                  <span className="text-xs font-bold text-gray-600 flex items-center gap-2">
                    <Medal size={14} className="text-amber-500" />
                    Insignia
                  </span>
                  <span className="text-sm font-black text-amber-600">{course.reward.badge}</span>
                </div>
                {course.reward.certificate && (
                  <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                    <span className="text-xs font-bold text-gray-600 flex items-center gap-2">
                      <Award size={14} className="text-emerald-500" />
                      Certificado
                    </span>
                    <CheckCircle2 size={16} className="text-emerald-500" />
                  </div>
                )}
              </div>
            </div>

            {/* INSTRUCTOR */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
              <h3 className="text-sm font-black text-gray-800 uppercase italic mb-4">Instructor</h3>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#EE121A] to-[#FF6B6B] flex items-center justify-center text-white font-black text-lg shadow-lg">
                  {course.instructor.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-gray-800">{course.instructor}</p>
                  <p className="text-xs text-gray-500">Especialista DEI • {course.rating} ★</p>
                </div>
              </div>
            </div>

            {/* PRÓXIMOS LOGROS */}
            {!isCompleted && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
                <h3 className="text-sm font-black text-gray-800 uppercase italic mb-4">Próximo logro</h3>
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                  <div className="w-10 h-10 bg-[#EE121A] rounded-lg flex items-center justify-center text-white">
                    <Target size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">Completa el módulo {currentModule.id}</p>
                    <p className="text-[10px] text-gray-500">+{Math.round(course.reward.points / modules.length)} pts</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* MODAL DE VIDEO */}
      <AnimatePresence>
        {showVideoModal && activeModule && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#EE121A] rounded-[2rem] w-full max-w-5xl overflow-hidden shadow-2xl relative"
            >
              <button 
                onClick={() => setShowVideoModal(false)}
                className="absolute top-4 right-4 z-50 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#EE121A] transition-all shadow-lg border border-white/30"
              >
                <X size={24} strokeWidth={3} />
              </button>

              <div className="p-6 border-b border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-white/20 text-white">
                    Módulo {activeModule.id}
                  </span>
                </div>
                <h3 className="text-xl font-black italic tracking-tighter uppercase text-white">
                  {activeModule.title}
                </h3>
              </div>
              
              <div className="p-8 flex items-center justify-center bg-black">
                <div className="w-full max-w-3xl aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-lg relative">
                  {activeModule.videoUrl ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={activeModule.videoUrl}
                      title={activeModule.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <div className="text-center">
                        <Play size={64} className="mx-auto mb-4 opacity-50" />
                        <p className="font-bold text-lg">{activeModule.title}</p>
                        <p className="text-sm opacity-70">{activeModule.duration}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 bg-white">
                <p className="text-sm text-gray-600 mb-4">{activeModule.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {activeModule.materials?.map((mat, idx) => (
                      <button key={idx} className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-red-50 rounded-xl text-xs font-bold text-gray-600 hover:text-[#EE121A] transition-all border border-gray-200">
                        {getFileIcon(mat.type)}
                        {mat.name}
                      </button>
                    ))}
                  </div>
                  {!completedModules.includes(activeModule.id) && (
                    <button 
                      onClick={() => {
                        handleCompleteModule(activeModule.id);
                        setShowVideoModal(false);
                      }}
                      className="px-6 py-3 bg-[#EE121A] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#C40F15] transition-all flex items-center gap-2"
                    >
                      <CheckCircle2 size={16} />
                      Completar módulo
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL DE RECOMPENSA (CUANDO TERMINA) */}
      <AnimatePresence>
        {showRewardModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.5, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 100 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-12 max-w-lg w-full text-center shadow-2xl relative overflow-hidden"
            >
              {/* Confeti animado */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -20, x: Math.random() * 400 - 200, opacity: 1 }}
                    animate={{ y: 400, rotate: 360 }}
                    transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                    className="absolute w-3 h-3 rounded-full"
                    style={{ 
                      backgroundColor: ['#EE121A', '#FFD700', '#FF6B6B', '#FFA500'][Math.floor(Math.random() * 4)],
                      left: `${Math.random() * 100}%`
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-xl"
                >
                  <Crown size={48} />
                </motion.div>

                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-3xl font-black text-gray-800 uppercase italic mb-2"
                >
                  ¡Felicitaciones!
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-gray-600 mb-6"
                >
                  Has completado <span className="font-bold text-[#EE121A]">{course.title}</span>
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl p-6 mb-6 border-2 border-amber-200"
                >
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-black text-[#EE121A]">+{course.reward.points.toLocaleString()}</p>
                      <p className="text-[9px] font-bold text-gray-500 uppercase">Puntos</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-black text-amber-600">{course.reward.badge}</p>
                      <p className="text-[9px] font-bold text-gray-500 uppercase">Insignia</p>
                    </div>
                    <div className="text-center">
                      <Award size={24} className="mx-auto text-emerald-500 mb-1" />
                      <p className="text-[9px] font-bold text-gray-500 uppercase">Certificado</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="flex gap-3"
                >
                  <button 
                    onClick={() => setShowRewardModal(false)}
                    className="flex-1 py-3 bg-[#EE121A] text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-[#C40F15] transition-all"
                  >
                    ¡Genial!
                  </button>
                  <button 
                    onClick={() => {
                      setShowRewardModal(false);
                      // Descargar certificado
                    }}
                    className="flex-1 py-3 bg-emerald-500 text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    Certificado
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// VISTA DE LISTA DE CURSOS (MI PROGRESO)
// ==========================================

const CourseListView = ({ onCourseSelect, onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const filters = [
    { id: 'all', label: 'Todos', count: ALL_COURSES.length },
    { id: 'in_progress', label: 'En Progreso', count: ALL_COURSES.filter(c => c.status === 'in_progress').length },
    { id: 'completed', label: 'Completados', count: ALL_COURSES.filter(c => c.status === 'completed').length },
    { id: 'available', label: 'Disponibles', count: ALL_COURSES.filter(c => c.status === 'available').length },
    { id: 'locked', label: 'Bloqueados', count: ALL_COURSES.filter(c => c.status === 'locked').length }
  ];

  const typeFilters = [
    { id: 'all', label: 'Todos los tipos', icon: BookOpen },
    { id: 'video', label: 'Videos', icon: Video },
    { id: 'document', label: 'Materiales', icon: FileText },
    { id: 'audio', label: 'Audios/Podcasts', icon: Headphones }
  ];

  const sortOptions = [
    { id: 'recent', label: 'Más recientes' },
        { id: 'recent', label: 'Más reciente' },
    { id: 'progress', label: 'Progreso' },
    { id: 'name', label: 'Nombre' },
    { id: 'rating', label: 'Mejor valorados' }
  ];

  // APLICAR FILTROS Y ORDENAMIENTO
  let filteredCourses = ALL_COURSES.filter(course => {
    const matchesStatus = activeFilter === 'all' || course.status === activeFilter;
    const matchesType = typeFilter === 'all' || course.type === typeFilter;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  // ORDENAR
  filteredCourses.sort((a, b) => {
    switch(sortBy) {
      case 'progress': return b.progress - a.progress;
      case 'name': return a.title.localeCompare(b.title);
      case 'rating': return b.rating - a.rating;
      case 'recent': 
      default: 
        if (a.status === 'in_progress' && b.status !== 'in_progress') return -1;
        if (b.status === 'in_progress' && a.status !== 'in_progress') return 1;
        return b.id - a.id;
    }
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-emerald-500';
      case 'in_progress': return 'bg-[#EE121A]';
      case 'available': return 'bg-blue-500';
      case 'locked': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      
      {/* HEADER FIJO */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          
          {/* BREADCRUMB */}
          <div className="flex items-center gap-3 mb-4">
            <button 
              onClick={() => onNavigate?.('dashboard')}
              className="flex items-center gap-2 text-gray-500 hover:text-[#EE121A] transition-colors text-sm font-bold uppercase tracking-wider"
            >
              <ArrowLeft size={18} />
              Volver al Dashboard
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <Badge variant="light" size="md">
                <Trophy size={12} /> MI APRENDIZAJE
              </Badge>
              <h1 className="text-4xl font-black tracking-tighter uppercase italic text-gray-800 mt-2">
                Mi <span className="text-[#EE121A]">Progreso</span>
              </h1>
              <p className="text-gray-500 text-sm mt-2 font-medium">
                {ALL_COURSES.filter(c => c.status === 'completed').length} completados • {' '}
                {ALL_COURSES.filter(c => c.status === 'in_progress').length} en progreso • {' '}
                {ALL_COURSES.filter(c => c.status === 'available').length} disponibles
              </p>
            </div>

            {/* BARRA DE BÚSQUEDA */}
            <div className="relative w-full lg:w-96">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar cursos, categorías, instructores..."
                className="w-full pl-10 pr-10 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-700 placeholder:text-gray-400 focus:border-[#EE121A] focus:ring-4 focus:ring-[#EE121A]/10 outline-none transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#EE121A]"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* FILTROS DE ESTADO */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`
                  px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2
                  ${activeFilter === filter.id 
                    ? 'bg-[#EE121A] text-white shadow-lg shadow-red-200' 
                    : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-[#EE121A] hover:text-[#EE121A]'}
                `}
              >
                <div className={`w-2 h-2 rounded-full ${getStatusColor(filter.id === 'all' ? 'in_progress' : filter.id)}`} />
                {filter.label}
                <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[9px] ${activeFilter === filter.id ? 'bg-white/20' : 'bg-gray-100'}`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>

          {/* FILTROS DE TIPO + ORDENAMIENTO */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {typeFilters.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setTypeFilter(type.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all
                    ${typeFilter === type.id 
                      ? 'bg-gray-800 text-white shadow-md' 
                      : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-400'}
                  `}
                >
                  <type.icon size={14} />
                  {type.label}
                </button>
              ))}
            </div>
            
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl text-[11px] font-black text-gray-600 uppercase tracking-wider focus:border-[#EE121A] outline-none cursor-pointer"
            >
              {sortOptions.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {filteredCourses.length === 0 ? (
          <div className="text-center py-20">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Search size={40} className="text-gray-400" />
            </motion.div>
            <p className="text-2xl font-black text-gray-800 uppercase italic">No se encontraron cursos</p>
            <p className="text-gray-500 text-sm mt-2">Intenta con otra búsqueda o ajusta los filtros</p>
            <button 
              onClick={() => {setActiveFilter('all'); setTypeFilter('all'); setSearchQuery('');}}
              className="mt-4 px-6 py-3 bg-[#EE121A] text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-[#C40F15] transition-all"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className={`
                    group relative bg-white rounded-[2rem] overflow-hidden border-2 transition-all duration-500 cursor-pointer
                    ${course.status === 'locked' ? 'opacity-60' : 'hover:border-[#EE121A]/30 hover:shadow-xl hover:-translate-y-1'}
                    ${course.status === 'completed' ? 'border-emerald-200' : course.status === 'in_progress' ? 'border-[#EE121A]/20' : 'border-gray-100'}
                  `}
                  onClick={() => course.status !== 'locked' && onCourseSelect(course)}
                >
                  {/* IMAGEN */}
                  <div className="relative h-52 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* BADGES SUPERIORES */}
                    <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                      <Badge variant={course.status === 'completed' ? 'success' : course.status === 'locked' ? 'gray' : 'primary'}>
                        {course.status === 'completed' ? 'COMPLETADO' : course.status === 'in_progress' ? 'EN PROGRESO' : course.status === 'locked' ? 'BLOQUEADO' : 'DISPONIBLE'}
                      </Badge>
                      {course.isNew && <Badge variant="outline">NUEVO</Badge>}
                    </div>

                    {/* TIPO DE CONTENIDO */}
                    <div className="absolute top-4 right-4">
                      <TypeIcon type={course.type} />
                    </div>

                    {/* OVERLAY ESTADO */}
                    {course.status === 'completed' && (
                      <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                        <motion.div 
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-emerald-500 shadow-2xl"
                        >
                          <CheckCircle2 size={40} strokeWidth={3} />
                        </motion.div>
                      </div>
                    )}
                    
                    {course.status === 'locked' && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                        <div className="text-center text-white">
                          <Lock size={40} className="mx-auto mb-2 opacity-80" />
                          <p className="text-xs font-black uppercase tracking-wider">Requiere nivel</p>
                          <p className="text-sm font-bold">{course.requiredLevel}</p>
                        </div>
                      </div>
                    )}

                    {course.status === 'in_progress' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#EE121A] shadow-2xl"
                        >
                          <Play size={28} fill="currentColor" />
                        </motion.button>
                      </div>
                    )}

                    {/* PROGRESO EN LA IMAGEN (solo en progreso) */}
                    {course.status === 'in_progress' && (
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex justify-between items-center text-white text-xs font-black uppercase tracking-wider mb-1">
                          <span>Progreso</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                          <div 
                            className="h-full bg-white rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CONTENIDO */}
                  <div className="p-6 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-[10px] font-black text-[#EE121A] uppercase tracking-wider bg-red-50 px-2 py-1 rounded-full">
                          {course.category}
                        </span>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1">
                          <Clock size={10} /> {course.duration}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-black text-gray-800 leading-tight uppercase italic group-hover:text-[#EE121A] transition-colors">
                        {course.title}
                      </h3>
                      
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    {/* INSTRUCTOR + RATING */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#EE121A] to-[#FF6B6B] flex items-center justify-center text-white text-[10px] font-black">
                          {course.instructor.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                        </div>
                        <span className="text-[11px] font-bold text-gray-600">{course.instructor}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-black">
                        <Star size={14} fill="currentColor" />
                        {course.rating}
                      </div>
                    </div>

                    {/* RECOMPENSA PREVIEW */}
                    <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-red-50 to-amber-50 rounded-xl border border-red-100">
                      <Gift size={16} className="text-[#EE121A]" />
                      <span className="text-[10px] font-bold text-gray-700">
                        {course.reward.points.toLocaleString()} pts • {course.reward.badge}
                      </span>
                    </div>

                    {/* BOTÓN DE ACCIÓN */}
                    {course.status === 'in_progress' && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onCourseSelect(course);
                        }}
                        className="w-full py-3 bg-[#EE121A] text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-[#C40F15] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                      >
                        Continuar Módulo {course.currentModule}
                        <ChevronRight size={16} />
                      </button>
                    )}

                    {course.status === 'completed' && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold">
                          <CheckCircle2 size={16} />
                          <span>Finalizado el {course.completedDate}</span>
                        </div>
                        <button 
                          onClick={(e) => e.stopPropagation()}
                          className="w-full py-3 bg-emerald-500 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-lg"
                        >
                          <Download size={16} />
                          Descargar Certificado
                        </button>
                      </div>
                    )}

                    {course.status === 'available' && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onCourseSelect(course);
                        }}
                        className="w-full py-3 bg-[#EE121A] text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-[#C40F15] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <Play size={16} fill="currentColor" />
                        Comenzar Curso
                      </button>
                    )}

                    {course.status === 'locked' && (
                      <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase justify-center py-3 bg-gray-50 rounded-xl border border-gray-200">
                        <Lock size={14} />
                        Requiere {course.requiredPoints?.toLocaleString()} pts
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* RESUMEN INFERIOR */}
      <div className="bg-white border-t border-gray-200 py-8 mt-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="text-center p-5 bg-gradient-to-br from-red-50 to-white rounded-2xl border border-red-100 shadow-sm"
            >
              <p className="text-3xl font-black text-[#EE121A] italic">{ALL_COURSES.filter(c => c.status === 'completed').length}</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase mt-1">Completados</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="text-center p-5 bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-100 shadow-sm"
            >
              <p className="text-3xl font-black text-amber-600 italic">{ALL_COURSES.filter(c => c.status === 'in_progress').length}</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase mt-1">En Progreso</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="text-center p-5 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 shadow-sm"
            >
              <p className="text-3xl font-black text-blue-600 italic">
                {Math.round(ALL_COURSES.filter(c => c.status === 'completed').reduce((acc, c) => acc + c.progress, 0) / (ALL_COURSES.filter(c => c.status === 'completed').length || 1))}%
              </p>
              <p className="text-[10px] font-bold text-gray-500 uppercase mt-1">Promedio</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="text-center p-5 bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-100 shadow-sm"
            >
              <p className="text-3xl font-black text-emerald-600 italic">
                {ALL_COURSES.reduce((acc, c) => acc + c.completedModules, 0)}
              </p>
              <p className="text-[10px] font-bold text-gray-500 uppercase mt-1">Módulos Totales</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL EXPORTADO
// ==========================================

export default function MiProgreso({ onNavigate }) {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedCourse(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">
      {selectedCourse ? (
        <motion.div
          key="detail"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          <CourseDetailView 
            course={selectedCourse} 
            onBack={handleBackToList}
          />
        </motion.div>
      ) : (
        <motion.div
          key="list"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
        >
          <CourseListView 
            onCourseSelect={handleCourseSelect}
            onNavigate={onNavigate}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
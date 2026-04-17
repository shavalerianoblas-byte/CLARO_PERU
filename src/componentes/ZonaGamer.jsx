import React, { useState } from 'react';
import { Gamepad2, Trophy, Star, ArrowRight, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const PREGUNTAS_JUEGO = [
  {
    pregunta: "¿Quién fue la primera programadora de la historia?",
    opciones: ["Ada Lovelace", "Grace Hopper", "Marie Curie", "Sheryl Sandberg"],
    correcta: 0,
    explicacion: "Ada Lovelace escribió el primer algoritmo para la máquina analítica de Babbage."
  },
  {
    pregunta: "¿Qué porcentaje de mujeres lideran startups tecnológicas en Latam?",
    opciones: ["5%", "15%", "35%", "50%"],
    correcta: 1,
    explicacion: "Actualmente es cerca del 15%, ¡por eso necesitamos más iniciativas como Girls Tech!"
  }
];

export default function ZonaGamer() {
  const [paso, setPaso] = useState(0); // 0: Inicio, 1: Jugando, 2: Resultado
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);

  const manejarRespuesta = (index) => {
    if (index === PREGUNTAS_JUEGO[preguntaActual].correcta) {
      setPuntaje(puntaje + 10);
    }

    if (preguntaActual + 1 < PREGUNTAS_JUEGO.length) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      setPaso(2);
    }
  };

  const reiniciar = () => {
    setPreguntaActual(0);
    setPuntaje(0);
    setPaso(1);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex items-center justify-between bg-gradient-to-r from-red-600 to-red-500 p-6 rounded-2xl text-white shadow-lg">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Gamepad2 className="w-8 h-8" /> Zona Gamer Girls Tech
          </h2>
          <p className="opacity-90">Aprende jugando sobre inclusión y tecnología</p>
        </div>
        <div className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-md font-bold">
          Score: {puntaje} pts
        </div>
      </header>

      {paso === 0 && (
        <Card className="text-center py-12 border-2 border-dashed border-red-200">
          <CardContent className="space-y-6">
            <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-red-600">
              <Star className="w-10 h-10" fill="currentColor" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">¿Lista para el desafío?</h3>
            <p className="text-gray-500 max-w-sm mx-auto">Pon a prueba tus conocimientos sobre mujeres en tecnología y gana medallas para tu perfil.</p>
            <Button onClick={() => setPaso(1)} className="bg-red-600 hover:bg-red-700 px-8 py-6 text-lg rounded-xl">
              ¡Comenzar Juego!
            </Button>
          </CardContent>
        </Card>
      )}

      {paso === 1 && (
        <Card className="border-none shadow-xl overflow-hidden">
          <Progress value={((preguntaActual + 1) / PREGUNTAS_JUEGO.length) * 100} className="h-2 rounded-none bg-gray-100" />
          <CardHeader>
            <span className="text-red-600 font-bold text-sm uppercase tracking-wider">Pregunta {preguntaActual + 1} de {PREGUNTAS_JUEGO.length}</span>
            <CardTitle className="text-2xl">{PREGUNTAS_JUEGO[preguntaActual].pregunta}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PREGUNTAS_JUEGO[preguntaActual].opciones.map((opcion, i) => (
              <Button 
                key={i} 
                variant="outline" 
                className="h-16 text-lg justify-start px-6 hover:border-red-600 hover:bg-red-50 transition-all"
                onClick={() => manejarRespuesta(i)}
              >
                <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-sm">{i + 1}</span>
                {opcion}
              </Button>
            ))}
          </CardContent>
        </Card>
      )}

      {paso === 2 && (
        <Card className="bg-gray-900 text-white overflow-hidden">
          <CardContent className="py-12 text-center space-y-6">
            <Trophy className="w-20 h-20 text-yellow-400 mx-auto animate-bounce" />
            <h3 className="text-3xl font-bold">¡Hackathon Completada!</h3>
            <p className="text-gray-400 text-xl">Tu puntaje final: <span className="text-white font-bold">{puntaje} puntos</span></p>
            <div className="flex justify-center gap-4">
              <Button onClick={reiniciar} variant="outline" className="text-white border-white/20 hover:bg-white/10">
                <RotateCcw className="mr-2 w-4 h-4" /> Reintentar
              </Button>
              <Button className="bg-red-600 hover:bg-red-700">
                Compartir Logro <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Search, Trophy, CheckCircle2, Star, Sparkles, Loader2 } from "lucide-react";
import { Card } from "@/componentes/ui/card";
import { Button } from "@/componentes/ui/button";
import { db } from "@/lib/firebase";
import { doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import confetti from "canvas-confetti";
import { toast } from "sonner";

const SopaLetrasGame = ({ user, onFinish }) => {
  const [grid, setGrid] = useState([]);
  const [words, setWords] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [selection, setSelection] = useState([]); // [{r, c}]
  const [isSelecting, setIsSelecting] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  const gridSize = 12; // Tamaño fijo de la cuadrícula

  // 1. Cargar palabras desde la Intranet
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const docRef = doc(db, "config_juegos", "sopa_dei");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const { palabras } = docSnap.data();
          generatePuzzle(palabras.map(w => w.toUpperCase()));
          setWords(palabras.map(w => w.toUpperCase()));
        }
      } catch (e) { toast.error("Error al cargar la sopa"); }
      finally { setLoading(false); }
    };
    fetchConfig();
  }, []);

  // 2. Generador del Puzzle
  const generatePuzzle = (wordList) => {
    let newGrid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(""));
    
    wordList.forEach(word => {
      let placed = false;
      while (!placed) {
        const isVertical = Math.random() > 0.5;
        const row = Math.floor(Math.random() * (isVertical ? gridSize - word.length : gridSize));
        const col = Math.floor(Math.random() * (isVertical ? gridSize : gridSize - word.length));

        // Verificar si cabe
        let canPlace = true;
        for (let i = 0; i < word.length; i++) {
          const r = isVertical ? row + i : row;
          const c = isVertical ? col : col + i;
          if (newGrid[r][c] !== "" && newGrid[r][c] !== word[i]) {
            canPlace = false;
            break;
          }
        }

        if (canPlace) {
          for (let i = 0; i < word.length; i++) {
            newGrid[isVertical ? row + i : row][isVertical ? col : col + i] = word[i];
          }
          placed = true;
        }
      }
    });

    // Rellenar con letras aleatorias
    const alphabet = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (newGrid[r][c] === "") {
          newGrid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
      }
    }
    setGrid(newGrid);
  };

  // 3. Lógica de selección
  const handleMouseDown = (r, c) => {
    setIsSelecting(true);
    setSelection([{ r, c }]);
  };

  const handleMouseEnter = (r, c) => {
    if (!isSelecting) return;
    setSelection(prev => [...prev, { r, c }]);
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    const selectedWord = selection.map(s => grid[s.r][s.c]).join("");
    const reversedWord = selectedWord.split("").reverse().join("");

    if (words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
      setFoundWords([...foundWords, selectedWord]);
      setScore(s => s + 50);
      toast.success(`¡Encontraste: ${selectedWord}!`);
    } else if (words.includes(reversedWord) && !foundWords.includes(reversedWord)) {
      setFoundWords([...foundWords, reversedWord]);
      setScore(s => s + 50);
      toast.success(`¡Encontraste: ${reversedWord}!`);
    }
    setSelection([]);
  };

  // 4. Finalizar
  useEffect(() => {
    if (words.length > 0 && foundWords.length === words.length) {
      confetti({ particleCount: 150, spread: 60 });
      finalizarJuego();
    }
  }, [foundWords]);

  const finalizarJuego = async () => {
    await addDoc(collection(db, "game_scores"), {
      user_id: user?.uid || "invitado",
      game_type: "sopa",
      score: score,
      created_at: serverTimestamp()
    });
  };

  if (loading) return <div className="p-20 text-center animate-pulse font-black">Generando Sopa de Letras...</div>;

  return (
    <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* CUADRÍCULA */}
      <div className="flex-1 select-none">
        <div 
          className="grid gap-1 bg-slate-200 p-2 rounded-2xl shadow-inner cursor-crosshair"
          style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
          onMouseLeave={() => setIsSelecting(false)}
        >
          {grid.map((row, rIdx) => 
            row.map((letter, cIdx) => {
              const isSelected = selection.some(s => s.r === rIdx && s.c === cIdx);
              return (
                <div
                  key={`${rIdx}-${cIdx}`}
                  onMouseDown={() => handleMouseDown(rIdx, cIdx)}
                  onMouseEnter={() => handleMouseEnter(rIdx, cIdx)}
                  onMouseUp={handleMouseUp}
                  className={`
                    h-8 w-8 md:h-10 md:w-10 flex items-center justify-center rounded-lg text-sm md:text-base font-black transition-all
                    ${isSelected ? "bg-[#EE121A] text-white scale-110 shadow-lg" : "bg-white text-slate-700 hover:bg-red-50"}
                  `}
                >
                  {letter}
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* LISTA DE PALABRAS Y PUNTAJE */}
      <Card className="w-full lg:w-80 p-6 border-t-8 border-[#EE121A]">
        <div className="mb-6 text-center">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Puntos Acumulados</p>
          <h3 className="text-4xl font-black text-[#EE121A]">{score}</h3>
        </div>

        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Search size={18} /> BUSCAR PALABRAS:
        </h4>
        
        <div className="space-y-2">
          {words.map((word, i) => (
            <div 
              key={i} 
              className={`flex items-center gap-2 text-sm font-bold p-2 rounded-xl transition-all ${
                foundWords.includes(word) ? "bg-green-100 text-green-600 line-through opacity-60" : "bg-slate-50 text-slate-600"
              }`}
            >
              {foundWords.includes(word) ? <CheckCircle2 size={16} /> : <div className="w-4 h-4 rounded-full border-2 border-slate-200" />}
              {word}
            </div>
          ))}
        </div>

        {foundWords.length === words.length && (
          <Button onClick={onFinish} className="w-full mt-6 bg-slate-900 text-white font-bold h-12 rounded-xl">
            ¡COMPLETADO! VOLVER
          </Button>
        )}
      </Card>
    </div>
  );
};

export default SopaLetrasGame;
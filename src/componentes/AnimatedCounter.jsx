import { useState, useEffect } from "react";

interface Props {
  target: number;
  duration?: number;
  className?: string;
  // Añadimos un prefijo opcional (ej: para poner "+" o "pts")
  prefix?: string; 
  suffix?: string;
}

const AnimatedCounter = ({ target, duration = 1500, className = "", prefix = "", suffix = "" }: Props) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Si el target es 0, no iniciamos animación para evitar saltos
    if (target === 0) {
      setCount(0);
      return;
    }

    let start = 0;
    const startTime = Date.now();
    
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Función de suavizado (Out-Cubic)
      const eased = 1 - Math.pow(1 - progress, 3);
      
      start = Math.round(eased * target);
      setCount(start);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [target, duration]);

  // Usamos Intl.NumberFormat para que los puntajes grandes tengan separador de miles
  const formattedCount = new Intl.NumberFormat().format(count);

  return (
    <span className={className}>
      {prefix}{formattedCount}{suffix}
    </span>
  );
};

export default AnimatedCounter;
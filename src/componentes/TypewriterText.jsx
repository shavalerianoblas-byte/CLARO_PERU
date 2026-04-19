import { useState, useEffect } from "react";

interface Props {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

const TypewriterText = ({ text, speed = 30, onComplete, className = "" }: Props) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypewriterText;

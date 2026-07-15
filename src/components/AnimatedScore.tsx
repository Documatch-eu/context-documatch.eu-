import { useState, useEffect } from 'react';

interface AnimatedScoreProps {
  value: number;
  duration?: number;
}

export default function AnimatedScore({ value, duration = 600 }: AnimatedScoreProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;

    const range = end - start;
    let current = start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));

    const timer = setInterval(() => {
      current += increment;
      setDisplayValue(current);
      if (current === end) {
        clearInterval(timer);
      }
    }, Math.max(stepTime, 8)); // Cap minimum step time for smooth performance

    return () => clearInterval(timer);
  }, [value]);

  // Handle initialization on mount
  useEffect(() => {
    setDisplayValue(value);
  }, []);

  return (
    <span className="font-mono font-bold text-2xl tracking-tight">
      {displayValue}%
    </span>
  );
}

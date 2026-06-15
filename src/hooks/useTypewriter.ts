import { useState, useEffect, useRef } from 'react';

interface UseTypewriterOptions {
  speed?: number;       // ms per character
  delay?: number;       // ms before starting
  cursor?: boolean;     // show blinking cursor while typing
}

export function useTypewriter(
  text: string,
  options: UseTypewriterOptions = {}
) {
  const { speed = 45, delay = 200, cursor = true } = options;
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        indexRef.current += 1;
        setDisplayed(text.slice(0, indexRef.current));
        if (indexRef.current >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay]);

  // Blinking cursor character — visible while typing, stays after done
  const cursorChar = cursor ? (done ? '▊' : '▊') : '';

  return { displayed, done, cursorChar };
}
import { useState, useEffect, useRef } from 'react';

interface UseTypewriterOptions {
  speed?: number;
  delay?: number;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export function useTypewriter(
  text: string,
  options: UseTypewriterOptions = {}
) {
  const { speed = 45, delay = 200, triggerRef } = options;
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const started = useRef(false);

  function startTyping() {
    if (started.current) return;
    started.current = true;

    let index = 0;
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, delay);

    return () => clearTimeout(startTimeout);
  }

  useEffect(() => {
    // If no triggerRef provided, start immediately
    if (!triggerRef) {
      startTyping();
      return;
    }

    // Otherwise wait until element is visible
    const el = triggerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startTyping();
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { displayed, done };
}
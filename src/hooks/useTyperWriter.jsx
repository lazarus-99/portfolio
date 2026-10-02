import { useState, useEffect } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export function useTypewriter(fullText, { speed = 60, loop = false, restartDelay = 3000 } = {}) {
  const reduceMotion = usePrefersReducedMotion();
  const [typed, setTyped] = useState({ text: fullText, count: 0 });

  // Restart from zero when the text changes (e.g. switching language), during render rather than in the effect.
  if (typed.text !== fullText) {
    setTyped({ text: fullText, count: 0 });
  }

  useEffect(() => {
    if (reduceMotion) return;
    let typingInterval;
    let restartTimeout;

    const startTyping = () => {
      let i = 0;
      typingInterval = setInterval(() => {
        i++;
        setTyped({ text: fullText, count: i });
        if (i >= fullText.length) {
          clearInterval(typingInterval);
          if (loop) {
            restartTimeout = setTimeout(() => {
              setTyped({ text: fullText, count: 0 });
              startTyping();
            }, restartDelay);
          }
        }
      }, speed);
    };

    startTyping();

    return () => {
      clearInterval(typingInterval);
      clearTimeout(restartTimeout);
    };
  }, [fullText, speed, loop, restartDelay, reduceMotion]);

  if (reduceMotion) return fullText.length;
  return typed.text === fullText ? typed.count : 0;
}

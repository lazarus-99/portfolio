import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

// Types each word, holds it, deletes it, then moves to the next one, forever.
export function useTypewriterCycle(words, { typeSpeed = 90, deleteSpeed = 45, hold = 2200 } = {}) {
  const reduceMotion = usePrefersReducedMotion();
  const [typed, setTyped] = useState({ words, index: 0, count: 0 });

  // Restart when the word list changes (e.g. switching language), during render rather than in the effect.
  if (typed.words !== words) {
    setTyped({ words, index: 0, count: 0 });
  }

  useEffect(() => {
    if (reduceMotion) return;
    let timer;
    let index = 0;
    let count = 0;
    let deleting = false;

    const tick = () => {
      const word = words[index];
      if (!deleting && count < word.length) {
        count++;
        timer = setTimeout(tick, typeSpeed);
      } else if (!deleting) {
        if (words.length < 2) return;
        deleting = true;
        timer = setTimeout(tick, hold);
        return;
      } else if (count > 0) {
        count--;
        timer = setTimeout(tick, deleteSpeed);
      } else {
        deleting = false;
        index = (index + 1) % words.length;
        timer = setTimeout(tick, typeSpeed * 3);
        return;
      }
      setTyped({ words, index, count });
    };

    timer = setTimeout(tick, typeSpeed);
    return () => clearTimeout(timer);
  }, [words, typeSpeed, deleteSpeed, hold, reduceMotion]);

  if (reduceMotion) return words[0];
  if (typed.words !== words) return '';
  return words[typed.index].slice(0, typed.count);
}

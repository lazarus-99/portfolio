import { useState, useEffect } from 'react';

export function useTypewriter(fullText, { speed = 60, loop = false, restartDelay = 3000 } = {}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    let i = 0;
    let typingInterval;
    let restartTimeout;

    const startTyping = () => {
      i = 0;
      setCount(0);
      typingInterval = setInterval(() => {
        i++;
        setCount(i);
        if (i >= fullText.length) {
          clearInterval(typingInterval);
          if (loop) {
            restartTimeout = setTimeout(startTyping, restartDelay);
          }
        }
      }, speed);
    };

    startTyping();

    return () => {
      clearInterval(typingInterval);
      clearTimeout(restartTimeout);
    };
  }, [fullText, speed, loop, restartDelay]);

  return count;
}

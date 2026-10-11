import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { ThemeContext } from './theme';

const REVEAL_DURATION = 600;

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // `origin` is the viewport point the new theme grows out from (the toggle button's center).
  const toggleTheme = (origin) => {
    // The view transition snapshots the DOM right after this runs, so the theme must be applied synchronously.
    // Read the current theme at apply time: with rapid clicks, an earlier transition may have just switched it.
    const apply = () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      flushSync(() => setTheme(next));
      document.documentElement.setAttribute('data-theme', next);
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduceMotion || !origin) {
      apply();
      return;
    }

    const { x, y } = origin;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const transition = document.startViewTransition(apply);
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: REVEAL_DURATION, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
      );
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

import { lazy, Suspense, useEffect, useState } from 'react';
import { useLanguage } from '../../context/language';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import SelectedWork from './SelectedWork';
import './index.css';

// Both versions load separately: the reveal pulls in the motion library, and both pull in the skill icons.
const TileReveal = lazy(() => import('./TileReveal'));
const StaticIntro = lazy(() => import('./StaticIntro'));

// The reveal pulls in the motion library. Fetching it during the first load competed with the
// hero's own rendering and made slow devices stutter, so it waits until the browser is idle.
function useIdle() {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    const done = () => setIdle(true);
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(done, { timeout: 2500 });
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(done, 1500);
    return () => clearTimeout(id);
  }, []);
  return idle;
}

export default function Developer() {
  const { t } = useLanguage();
  const reduceMotion = usePrefersReducedMotion();
  const idle = useIdle();
  const intro = {
    eyebrow: t('developer.title'),
    title: t('developer.summaryTitle'),
    summary: t('developer.summary'),
    stackLabel: t('developer.stackLabel'),
  };

  return (
    <section id="developer" className="developer-work" aria-labelledby="developer-title">
      {reduceMotion ? (
        <Suspense fallback={null}>
          <StaticIntro {...intro} />
        </Suspense>
      ) : (
        // Full width so the tiles can fly in from the screen edges; the cards below stay in the content column.
        <Suspense fallback={<div className="tile-reveal" aria-hidden="true" />}>
          {idle ? <TileReveal {...intro} /> : <div className="tile-reveal" aria-hidden="true" />}
        </Suspense>
      )}
      <div className="selected-work-section">
        <SelectedWork />
      </div>
    </section>
  );
}

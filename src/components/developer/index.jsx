import { lazy, Suspense } from 'react';
import { useLanguage } from '../../context/language';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import SelectedWork from './SelectedWork';
import './index.css';

// Both versions load separately: the reveal pulls in the motion library, and both pull in the skill icons.
const TileReveal = lazy(() => import('./TileReveal'));
const StaticIntro = lazy(() => import('./StaticIntro'));

export default function Developer() {
  const { t } = useLanguage();
  const reduceMotion = usePrefersReducedMotion();
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
          <TileReveal {...intro} />
        </Suspense>
      )}
      <div className="selected-work-section">
        <SelectedWork />
      </div>
    </section>
  );
}

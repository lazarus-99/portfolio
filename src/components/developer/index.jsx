import { lazy, Suspense } from 'react';
import { useLanguage } from '../../context/language';
import SelectedWork from './SelectedWork';
import './index.css';

// The dock pulls in the motion library; loading it separately keeps it out of the first-paint bundle.
const SkillsDock = lazy(() => import('./SkillsDock'));

// Same classes as the real dock, empty, so the section keeps its height while the dock loads.
function SkillsDockPlaceholder() {
  return (
    <div className="skills-dock" aria-hidden="true">
      <div className="dock-viewport">
        <div className="dock-track" />
      </div>
    </div>
  );
}

export default function Developer() {
  const { t } = useLanguage();

  return (
    <section id="developer" className="developer-section">
      <h2 className="section-eyebrow">{t('developer.title')}</h2>

      <div className="developer-summary">
        <h3 className="developer-summary-title">{t('developer.summaryTitle')}</h3>
        <p>{t('developer.summary')}</p>
      </div>

      <div className="developer-skills">
        <h3 className="skills-title">{t('developer.skillsTitle')}</h3>
        <Suspense fallback={<SkillsDockPlaceholder />}>
          <SkillsDock />
        </Suspense>
      </div>

      <SelectedWork />
    </section>
  );
}

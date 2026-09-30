import { useLanguage } from '../../context/languageContext';
import SkillsDock from './SkillsDock';
import './index.css';

export default function Developer() {
  const { t } = useLanguage();

  return (
    <section id="developer" className="developer-section">
      <h2 className="section-eyebrow">{t('developer.title')}</h2>

      <div className="developer-summary">
        <h2 className="developer-summary-title">{t('developer.summaryTitle')}</h2>
        <p>{t('developer.summary')}</p>
      </div>

      <div className="developer-skills">
        <h2 className="skills-title">{t('developer.skillsTitle')}</h2>
        <SkillsDock />
      </div>

      <div className="personal-projects-card">
        <h3>{t('developer.personalProjectsTitle')}</h3>
        <p>{t('developer.personalProjectsNote')}</p>
      </div>
    </section>
  );
}

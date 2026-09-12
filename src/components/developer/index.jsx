import { useLanguage } from '../../context/languageContext';
import { skillGroups } from '../../data/skills';
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
        <div className="skills-groups">
          {skillGroups.map((group) => (
            <div key={group.key} className="skills-group">
              <h3>{t(`developer.skills.${group.key}`)}</h3>
              <div className="skills-tags">
                {group.items.map((item) => (
                  <span key={item} className="skill-tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="personal-projects-card">
        <h3>{t('developer.personalProjectsTitle')}</h3>
        <p>{t('developer.personalProjectsNote')}</p>
      </div>
    </section>
  );
}

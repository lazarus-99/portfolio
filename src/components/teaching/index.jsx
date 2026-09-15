import { useLanguage } from '../../context/languageContext';
import EducationEntry from './EducationEntry';
import './index.css';

export default function Teaching() {
  const { t } = useLanguage();
  const entries = t('teaching.entries');

  return (
    <section id="teaching" className="teaching-section">
      <span className="section-eyebrow">{t('teaching.title')}</span>
      {Array.isArray(entries) && entries.map((entry) => (
        <EducationEntry key={`${entry.school}-${entry.title}`} {...entry} />
      ))}
    </section>
  );
}

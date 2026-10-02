import { useLanguage } from '../../context/language';
import EducationEntry from './EducationEntry';
import './index.css';

export default function Teaching() {
  const { t } = useLanguage();
  const entries = t('teaching.entries');

  return (
    <section id="teaching" className="teaching-section">
      <h2 className="section-eyebrow">{t('teaching.title')}</h2>
      {Array.isArray(entries) && entries.map((entry) => (
        <EducationEntry key={`${entry.school}-${entry.title}`} {...entry} />
      ))}
    </section>
  );
}

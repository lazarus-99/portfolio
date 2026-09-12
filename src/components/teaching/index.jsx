import { useLanguage } from '../../context/languageContext';
import './index.css';

export default function Teaching() {
  const { t } = useLanguage();
  const courses = t('teaching.courses');

  return (
    <section id="teaching" className="teaching-section">
      <h2 className="section-eyebrow">{t('teaching.title')}</h2>
      <h2 className="teaching-role">{t('teaching.role')}</h2>
      <p className="teaching-institution">{t('teaching.institution')}</p>

      <div className="teaching-courses">
        <h3>{t('teaching.coursesTitle')}</h3>
        <ul>
          {Array.isArray(courses) && courses.map((course) => (
            <li key={course}>{course}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

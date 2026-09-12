import { useLanguage } from '../../context/languageContext';
import './index.css';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="about-section">
      <h2 className="section-eyebrow">{t('about.title')}</h2>
      <h2 className="about-name">Lazaro Toconas</h2>
      <p className="about-role">{t('about.role')}</p>
      <p className="about-experience">{t('about.experience')}</p>
      <p className="about-bio">{t('about.bio')}</p>
    </section>
  );
}

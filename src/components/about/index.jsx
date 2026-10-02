import { useLanguage } from '../../context/language';
import './index.css';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="about-section">
      <h2 className="section-eyebrow">{t('about.title')}</h2>
      <h3 className="about-name">Lazaro Toconas</h3>
      <p className="about-role">{t('about.role')}</p>
      <p className="about-experience">{t('about.experience')}</p>
      <p className="about-bio">{t('about.bio')}</p>
    </section>
  );
}

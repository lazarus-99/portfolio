import { useLanguage } from '../../context/language';
import { socialLinks } from '../../data/socials';
import ProfileCard from './ProfileCard';
import './index.css';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="about-section">
      <div className="about-text">
        <h2 className="section-eyebrow">{t('about.title')}</h2>
        <h3 className="about-name">Lazaro Toconas</h3>
        <p className="about-role">{t('about.role')}</p>
        <p className="about-experience">{t('about.experience')}</p>
        <p className="about-bio">{t('about.bio')}</p>
      </div>
      <ProfileCard
        alt={t('about.portraitAlt')}
        handle="@lazarus-99"
        status={t('about.cardStatus')}
        contactLabel={t('about.cardContact')}
        contactHref={`mailto:${socialLinks.email}`}
      />
    </section>
  );
}

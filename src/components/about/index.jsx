import { useLanguage } from '../../context/language';
import { socialLinks } from '../../data/socials';
import ProfileCard from './ProfileCard';
import './index.css';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="about-section">
      <div className="about-text">
        <h2 className="section-eyebrow" data-reveal>{t('about.title')}</h2>
        <h3 className="about-name" data-reveal style={{ '--i': 1 }}>Lazaro Toconas</h3>
        <p className="about-role" data-reveal style={{ '--i': 2 }}>{t('about.role')}</p>
        <p className="about-experience" data-reveal style={{ '--i': 3 }}>{t('about.experience')}</p>
        <p className="about-bio" data-reveal style={{ '--i': 4 }}>{t('about.bio')}</p>
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

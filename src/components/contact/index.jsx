import { IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react';
import { useLanguage } from '../../context/languageContext';
import { socialLinks } from '../../data/socials';
import './index.css';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="contact-section">
      <div className="contact-inner">
        <span className="section-eyebrow">{t('contact.title')}</span>
        <h2 className="contact-headline">{t('contact.headline')}</h2>
        <div className="contact-links">
          <a className="contact-pill" href={`mailto:${socialLinks.email}`}>
            {socialLinks.email}
          </a>
          <a
            className="contact-pill"
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandLinkedin size={18} stroke={1.75} />
            {t('contact.linkedinLabel')}
          </a>
          <a
            className="contact-pill"
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandGithub size={18} stroke={1.75} />
            {t('contact.githubLabel')}
          </a>
        </div>
      </div>
    </section>
  );
}

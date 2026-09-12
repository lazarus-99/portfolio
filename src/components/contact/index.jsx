import { IconMail, IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react';
import { useLanguage } from '../../context/languageContext';
import { socialLinks } from '../../data/socials';
import './index.css';

export default function Contact() {
  const { t } = useLanguage();

  const links = [
    { icon: IconMail, label: t('contact.emailLabel'), value: socialLinks.email, href: `mailto:${socialLinks.email}`, external: false },
    { icon: IconBrandLinkedin, label: t('contact.linkedinLabel'), value: 'LinkedIn', href: socialLinks.linkedin, external: true },
    { icon: IconBrandGithub, label: t('contact.githubLabel'), value: 'GitHub', href: socialLinks.github, external: true },
  ];

  return (
    <section id="contact" className="contact-section">
      <h2 className="section-eyebrow">{t('contact.title')}</h2>
      <p className="contact-subtitle">{t('contact.subtitle')}</p>

      <div className="contact-links">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            className="contact-card"
          >
            <link.icon size={22} stroke={1.75} />
            <div>
              <span className="contact-card-label">{link.label}</span>
              <span className="contact-card-value">{link.value}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

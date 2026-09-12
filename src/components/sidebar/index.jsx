import { useState } from 'react';
import { IconUser, IconCode, IconSchool, IconAddressBook, IconBrandGithub, IconBrandLinkedin, IconMail } from '@tabler/icons-react';
import { useLanguage } from '../../context/languageContext';
import { socialLinks } from '../../data/socials';
import './index.css';

const socialIcons = {
  github: IconBrandGithub,
  linkedin: IconBrandLinkedin,
  mail: IconMail,
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const closeMenu = () => setIsOpen(false);

  const navItems = [
    { label: t('nav.about'), href: '#about', icon: IconUser },
    { label: t('nav.developer'), href: '#developer', icon: IconCode },
    { label: t('nav.teaching'), href: '#teaching', icon: IconSchool },
    { label: t('nav.contact'), href: '#contact', icon: IconAddressBook },
  ];

  const socials = [
    { icon: 'github', href: socialLinks.github, label: t('a11y.github') },
    { icon: 'linkedin', href: socialLinks.linkedin, label: t('a11y.linkedin') },
    { icon: 'mail', href: `mailto:${socialLinks.email}`, label: t('a11y.email') },
  ];

  return (
    <>
      <button
        className="hamburger-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span className={`hamburger-icon ${isOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu} className="sidebar-link">
              <item.icon size={18} stroke={1.75} />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="sidebar-socials">
          {socials.map((social) => {
            const Icon = socialIcons[social.icon];
            return (
              <a
                key={social.icon}
                href={social.href}
                target={social.icon === 'mail' ? undefined : '_blank'}
                rel={social.icon === 'mail' ? undefined : 'noopener noreferrer'}
                aria-label={social.label}
                className="social-icon"
              >
                <Icon size={18} stroke={1.75} />
              </a>
            );
          })}
        </div>
      </aside>
    </>
  );
}

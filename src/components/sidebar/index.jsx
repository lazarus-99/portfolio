import { useState, useEffect } from 'react';
import { IconUser, IconCode, IconSchool, IconBrandGithub, IconBrandLinkedin, IconMail } from '@tabler/icons-react';
import { useLanguage } from '../../context/language';
import { useTheme } from '../../context/theme';
import { socialLinks } from '../../data/socials';
import logoDark from '../../assets/logo-dark-glass.svg';
import logoLight from '../../assets/logo-light-glass.svg';
import './index.css';

const socialIcons = {
  github: IconBrandGithub,
  linkedin: IconBrandLinkedin,
  mail: IconMail,
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const { theme } = useTheme();
  const logoSrc = theme === 'light' ? logoLight : logoDark;

  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id === 'center' ? null : entry.target.id);
          }
        });
      },
      // Only the section crossing the vertical middle of the viewport counts as active.
      { rootMargin: '-50% 0px -50% 0px' }
    );

    ['center', 'about', 'developer', 'teaching'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setIsOpen(false);

  const navItems = [
    { label: t('nav.about'), href: '#about', icon: IconUser },
    { label: t('nav.developer'), href: '#developer', icon: IconCode },
    { label: t('nav.teaching'), href: '#teaching', icon: IconSchool },
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
        aria-label={t('a11y.menu')}
        aria-expanded={isOpen}
        aria-controls="site-menu"
      >
        <span className={`hamburger-icon ${isOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <aside id="site-menu" className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-top">
          <a href="#center" onClick={closeMenu} className="sidebar-logo" aria-label={t('a11y.home')}>
            <img src={logoSrc} alt="" />
          </a>

          <nav className="sidebar-nav">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                  aria-current={isActive ? 'location' : undefined}
                >
                  <item.icon size={18} stroke={1.75} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

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

import { useState } from 'react';
import './index.css';

const navItems = [
  { label: 'Sobre mí', href: '#about' },
  { label: 'Developer', href: '#developer' },
  { label: 'Docencia', href: '#teaching' },
  { label: 'Contacto', href: '#contact' },
];

const socials = [
  { icon: 'github', href: 'https://github.com/tu-usuario' },
  { icon: 'linkedin', href: 'https://linkedin.com/in/tu-usuario' },
  { icon: 'mail', href: 'mailto:tu@email.com' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

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
              {item.label}
            </a>
          ))}
        </nav>

        <div className="sidebar-socials">
          {socials.map((social) => (
            <a
              key={social.icon}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.icon}
              className="social-icon"
            >
              <i className={`ti ti-brand-${social.icon}`}></i>
            </a>
          ))}
        </div>
      </aside>
    </>
  );
}
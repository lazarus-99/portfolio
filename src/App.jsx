import './App.css'
import Background from './components/background';
import TypewriterText from './components/writer';
import Sidebar from './components/sidebar';
import ThemeToggle from './components/themeToggle';
import LanguageToggle from './components/languageToggle';
import About from './components/about';
import Developer from './components/developer';
import Teaching from './components/teaching';
import Contact from './components/contact';
import BoliviaFlag from './components/boliviaFlag';
import { useLanguage } from './context/language';
import { socialLinks } from './data/socials';

function App() {
  const { t } = useLanguage();
  const meta = t('hero.meta');
  const lastSpace = meta.lastIndexOf(' ');

  return (
    <>
      <Background />
      <div className="utility-toggles">
        <LanguageToggle />
        <ThemeToggle />
      </div>
      <Sidebar />
      <main className="page-content">
        <section id="center" className="hero">
          <p className="hero-meta">
            {meta.slice(0, lastSpace + 1)}
            <span className="hero-meta-country">
              {meta.slice(lastSpace + 1)}
              <BoliviaFlag className="hero-flag" />
            </span>
          </p>
          <h1 className="hero-headline">
            {t('hero.headlineLine1')}
            <br />
            {t('hero.headlineLine2Prefix')}
            <TypewriterText
              segments={[{ text: t('hero.headlineTyped') }]}
              speed={90}
            />
          </h1>
          <p className="hero-bio">{t('hero.bio')}</p>
          <div className="hero-actions">
            <a className="hero-cta" href={`mailto:${socialLinks.email}`}>
              {t('hero.cta')}
            </a>
            <span className="hero-email">{socialLinks.email}</span>
          </div>
        </section>
        <About />
        <Developer />
        <Teaching />
        <Contact />
      </main>
    </>
  )
}

export default App

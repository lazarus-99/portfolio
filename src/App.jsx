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
import { useLanguage } from './context/languageContext';

function App() {
  const { t } = useLanguage();

  return (
    <>
      <Background />
      <div className="utility-toggles">
        <LanguageToggle />
        <ThemeToggle />
      </div>
      <Sidebar />
      <main className="page-content">
        <section id="center">
          <h1>
            <TypewriterText
              segments={[
                { text: t('hero.greeting') },
                { text: 'Lazaro Toconas', className: 'highlight' },
              ]}
              speed={50}
              loop={true}
              restartDelay={4000}
            />
          </h1>
          <TypewriterText
              segments={[
                { text: t('hero.role'), className: 'highlight-alt' },
              ]}
              speed={50}
              loop={true}
              restartDelay={4000}
            />
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

import { createContext, useContext, useState, useEffect } from 'react';
import translations from '../i18n/translations';

const LanguageContext = createContext();

const SUPPORTED = ['en', 'es'];
const DEFAULT_LANGUAGE = 'en';
const STORAGE_KEY = 'preferredLanguage';

function detectBrowserLanguage() {
  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of preferred) {
    const base = tag?.toLowerCase().split('-')[0];
    if (SUPPORTED.includes(base)) return base;
  }
  return DEFAULT_LANGUAGE;
}

function getInitialLanguage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return SUPPORTED.includes(saved) ? saved : detectBrowserLanguage();
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const toggleLanguage = () => {
    const next = language === 'es' ? 'en' : 'es';
    localStorage.setItem(STORAGE_KEY, next);
    setLanguage(next);
  };

  const t = (path) =>
    path.split('.').reduce((acc, key) => acc?.[key], translations[language]) ?? path;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);

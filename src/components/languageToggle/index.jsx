import { IconLanguage } from '@tabler/icons-react';
import { useLanguage } from '../../context/languageContext';
import './index.css';

export default function LanguageToggle() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button className="toggle-btn lang-toggle" onClick={toggleLanguage} aria-label={t('a11y.toggleLanguage')}>
      <IconLanguage size={18} stroke={1.75} />
      <span>{language === 'es' ? 'EN' : 'ES'}</span>
    </button>
  );
}

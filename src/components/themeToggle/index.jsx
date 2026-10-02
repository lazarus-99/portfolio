import { IconSun, IconMoon } from '@tabler/icons-react';
import { useTheme } from '../../context/theme';
import { useLanguage } from '../../context/language';
import './index.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <button className="toggle-btn" onClick={toggleTheme} aria-label={t('a11y.toggleTheme')}>
      {theme === 'dark' ? <IconSun size={18} stroke={1.75} /> : <IconMoon size={18} stroke={1.75} />}
    </button>
  );
}

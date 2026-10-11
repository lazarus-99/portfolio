import { IconSun, IconMoon } from '@tabler/icons-react';
import { useTheme } from '../../context/theme';
import { useLanguage } from '../../context/language';
import './index.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  // The button's center (not the pointer) so keyboard activation reveals from the same spot.
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <button className="toggle-btn" onClick={handleClick} aria-label={t('a11y.toggleTheme')}>
      {theme === 'dark' ? <IconSun size={18} stroke={1.75} /> : <IconMoon size={18} stroke={1.75} />}
    </button>
  );
}

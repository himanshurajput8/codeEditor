import React, { useContext } from 'react';
import { ToggleUiThemeContext } from '../../ContextAPI/ToggleUITheme';
import { Sun, Moon, TreePine, Cpu, PaintBucket, Flower } from 'lucide-react';

const themeIconMap = {
  default: { icon: PaintBucket, color: '#60b54b' },
  cyberpunk: { icon: Cpu, color: '#ff007f' },
  forest: { icon: TreePine, color: '#228B22' },
  'solar-light': { icon: Sun, color: '#FFA500' },
  lavender: { icon: Flower, color: '#DDA0DD' },
  'contrast-dark': { icon: Moon, color: '#FFFFFF' },
};

export default function ThemeToggleButton() {
  const { activeTheme, setActiveTheme, themes } = useContext(ToggleUiThemeContext);

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(activeTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];

    setActiveTheme(nextTheme);

    if (nextTheme === 'default') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.removeItem('theme');
    } else {
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
    }
  };

  const { icon: Icon, color } = themeIconMap[activeTheme] || {};

  return (
    <button
      onClick={toggleTheme}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'transparent',
        border: '1px solid #ccc',
        padding: '6px 12px',
        borderRadius: '8px',
        cursor: 'pointer',
        color,
      }}
    >
      {Icon && <Icon size={20} color={color} />}
      {activeTheme}
    </button>
  );
}
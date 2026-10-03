import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  themeLabel: string;
  toggleTheme: () => void;
  setThemeMode: (mode: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('trupaintz_theme_mode');
      if (saved === 'dark' || saved === 'light') return saved;
      return 'light';
    } catch {
      // Fallback
    }
    return 'light';
  });

  useEffect(() => {
    try {
      localStorage.setItem('trupaintz_theme_mode', theme);
      localStorage.setItem('trupaintz_theme', theme);
    } catch {
      // Ignore localStorage exceptions in restrictive environments
    }

    const root = document.documentElement;
    root.setAttribute('data-theme', theme);

    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.style.colorScheme = 'dark';
      document.body.classList.remove('bg-[#F8F5EE]', 'text-neutral-900');
      document.body.classList.add('bg-[#0B0D11]', 'text-neutral-100');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.style.colorScheme = 'light';
      document.body.classList.remove('bg-[#0B0D11]', 'text-neutral-100');
      document.body.classList.add('bg-[#F8F5EE]', 'text-neutral-900');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setThemeMode = (mode: Theme) => {
    setTheme(mode);
  };

  const themeLabel = theme === 'dark' ? 'Dark Obsidian Stucco' : 'Warm Travertine Plaster';

  return (
    <ThemeContext.Provider value={{ theme, themeLabel, toggleTheme, setThemeMode, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};


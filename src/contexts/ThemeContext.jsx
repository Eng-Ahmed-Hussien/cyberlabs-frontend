/* ========================================
   Theme Context - Dark/Light Mode
   ======================================== */

import { createContext, useState, useEffect } from 'react';
import { storage } from '@/utils/storage';
import { THEMES } from '@/utils/constants';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => storage.getTheme());

  useEffect(() => {
    storage.setTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK));
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === THEMES.DARK,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

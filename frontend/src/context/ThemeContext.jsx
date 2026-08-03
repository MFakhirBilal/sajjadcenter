'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = {
  WHITE_LUXURY: 'white_luxury',
  SAPPHIRE: 'sapphire',
  EMERALD: 'emerald',
  DARK: 'dark'
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(THEMES.WHITE_LUXURY);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('sajjad_theme');
    if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('sajjad_theme', newTheme);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, isDarkMode, toggleDarkMode, THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

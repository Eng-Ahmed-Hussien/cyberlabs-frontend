import React, { useState, useEffect } from 'react';
import './style.css';
import { Moon, Sun } from 'lucide-react';

const darkTheme = {
  '--primary-bg': '#191B21',
  '--secondary-bg': '#23272F',
  '--tertiary-bg': '#16181D',
  '--primary-text': '#ffffff',
  '--secondary-text': '#EBECF0',
  '--main-color': '#0d6efd',
  '--faq-body-bg': '#282626',
  '--faq-header': '#3a3c40',
  '--faq-header-hover': '#3a3c40',
};

const lightTheme = {
  '--primary-bg': '#fcf9f9',
  '--secondary-bg': '#EFF0F3',
  '--primary-text': '#191B21',
  '--secondary-text': '#3a3c40',
  '--main-color': '#0c65ebff',
  '--faq-body-bg': '#bebebe',
  '--faq-header': '#3a3c40',
  '--faq-header-hover': '#505358',
};

const ThemeSwitcher = () => {
  const [isDark, setIsDark] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? storedTheme === 'dark' : false;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    const theme = isDark ? darkTheme : lightTheme;
    Object.keys(theme).forEach((variable) => {
      document.documentElement.style.setProperty(variable, theme[variable]);
    });
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <button
      className='theme-floating-btn'
      onClick={toggleTheme}
      title='Toggle Theme'>
      {isDark ? <Sun className='fs-4' /> : <Moon className='fs-4' />}
    </button>
  );
};

export default ThemeSwitcher;

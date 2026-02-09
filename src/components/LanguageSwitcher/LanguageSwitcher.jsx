import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import './style.css';

const LanguageSwitcher = () => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('lang') || 'en';
  });

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'ar' : 'en';
    if (newLang === lang) return;
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    window.dispatchEvent(
      new CustomEvent('languageChanged', { detail: newLang }),
    );
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== 'lang') return;
      const newLang = e.newValue === 'ar' ? 'ar' : 'en';
      setLang((prev) => (prev === newLang ? prev : newLang));
    };

    const onLanguageChanged = (e) => {
      const newLang = e?.detail === 'ar' ? 'ar' : 'en';
      setLang((prev) => (prev === newLang ? prev : newLang));
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener('languageChanged', onLanguageChanged);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('languageChanged', onLanguageChanged);
    };
  }, []);

  return (
    <button
      className='btn border-0 p-0 ms-3 lang-toggler'
      onClick={toggleLang}
      title='Toggle Language'>
      <FontAwesomeIcon icon={faGlobe} className='fs-4' />
    </button>
  );
};

export default LanguageSwitcher;

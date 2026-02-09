/* ========================================
   Language Context - i18n (EN/AR)
   ======================================== */

import { createContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { storage } from '@/utils/storage';
import { LANGUAGES } from '@/utils/constants';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(() => storage.getLanguage());

  useEffect(() => {
    i18n.changeLanguage(language);
    storage.setLanguage(language);
  }, [language, i18n]);

  const toggleLanguage = () => {
    setLanguage((prev) =>
      prev === LANGUAGES.EN ? LANGUAGES.AR : LANGUAGES.EN,
    );
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    isArabic: language === LANGUAGES.AR,
    isEnglish: language === LANGUAGES.EN,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

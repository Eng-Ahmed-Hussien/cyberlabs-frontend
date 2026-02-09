// src/components/LanguageSwitcher/LanguageHandler.jsx
import { useEffect } from 'react';

const LanguageHandler = () => {
  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'en';
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';

    const applyTexts = () => {
      const isAr = document.documentElement.lang === 'ar';

      document.querySelectorAll('[ar-data],[en-data]').forEach((el) => {
        const arText = el.getAttribute('ar-data');
        const enText = el.getAttribute('en-data') || el.textContent.trim();

        el.textContent = isAr && arText ? arText : enText;
      });
    };

    applyTexts();

    const observer = new MutationObserver(applyTexts);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang', 'dir'],
    });

    return () => observer.disconnect();
  }, []);

  return null;
};

export default LanguageHandler;

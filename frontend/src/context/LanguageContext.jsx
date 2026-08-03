'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('sajjad_lang');
    if (saved && (saved === 'en' || saved === 'ur')) {
      setLang(saved);
    }
  }, []);

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('sajjad_lang', newLang);
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t, isUrdu: lang === 'ur' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

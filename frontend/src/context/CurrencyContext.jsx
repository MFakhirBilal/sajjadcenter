'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { currencies, formatPrice } from '../data/currencies';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('PKR');

  useEffect(() => {
    const saved = localStorage.getItem('sajjad_currency');
    if (saved && currencies[saved]) {
      setCurrency(saved);
    }
  }, []);

  const changeCurrency = (code) => {
    if (currencies[code]) {
      setCurrency(code);
      localStorage.setItem('sajjad_currency', code);
    }
  };

  const format = (priceInPKR) => formatPrice(priceInPKR, currency);

  return (
    <CurrencyContext.Provider value={{ currency, changeCurrency, format, currencies }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);

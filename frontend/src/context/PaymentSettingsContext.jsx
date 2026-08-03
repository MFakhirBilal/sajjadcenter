'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const PaymentSettingsContext = createContext();

const DEFAULT_SETTINGS = {
  adminPin: 'sajjad786',
  jazzcashNumber: '0300-1234567',
  jazzcashName: 'SajjadCenter / Sajjad Ahmad',
  easypaisaNumber: '0312-9876543',
  easypaisaName: 'SajjadCenter / Sajjad Ahmad',
  bankName: 'Meezan Bank Ltd',
  bankTitle: 'SajjadCenter',
  bankAccount: '01020304050607',
  bankIban: 'PK36MEZN0001020304050607',
  whatsappNumber: '+92 300 1234567',
  storeAddress: 'Main Commercial Plaza, Garh More, Punjab, Pakistan'
};


export function PaymentSettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    const saved = localStorage.getItem('sajjad_payment_settings');
    if (saved) {
      try {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(saved) });
      } catch (e) {
        console.error('Failed to parse payment settings', e);
      }
    }
  }, []);

  const updateSettings = (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('sajjad_payment_settings', JSON.stringify(updated));
  };

  return (
    <PaymentSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </PaymentSettingsContext.Provider>
  );
}

export function usePaymentSettings() {
  const context = useContext(PaymentSettingsContext);
  if (!context) {
    throw new Error('usePaymentSettings must be used within PaymentSettingsProvider');
  }
  return context;
}

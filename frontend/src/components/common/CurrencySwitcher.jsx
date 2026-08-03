'use client';

import React from 'react';
import { useCurrency } from '../../context/CurrencyContext';

export default function CurrencySwitcher() {
  const { currency, changeCurrency, currencies } = useCurrency();

  return (
    <select
      value={currency}
      onChange={(e) => changeCurrency(e.target.value)}
      className="bg-transparent text-xs text-gray-200 focus:outline-none cursor-pointer font-medium"
    >
      {Object.keys(currencies).map((code) => (
        <option key={code} value={code} className="bg-emerald-900 text-white">
          {currencies[code].label}
        </option>
      ))}
    </select>
  );
}

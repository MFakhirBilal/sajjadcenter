'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { lang, changeLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1">
      <Globe className="w-3.5 h-3.5 text-gold-400" />
      <select
        value={lang}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-transparent text-xs text-gray-200 focus:outline-none cursor-pointer font-medium"
      >
        <option value="en" className="bg-emerald-900 text-white">English</option>
        <option value="ur" className="bg-emerald-900 text-white">اردو (Urdu)</option>
      </select>
    </div>
  );
}

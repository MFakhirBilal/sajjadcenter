'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useTheme } from '../../context/ThemeContext';
import { Globe, Sun, Moon, Sparkles } from 'lucide-react';

export default function HeaderNotificationBar() {
  const { language, changeLanguage } = useLanguage();
  const { currency, changeCurrency } = useCurrency();
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="bg-slate-900 text-slate-200 text-[11px] py-1.5 px-3 sm:px-6 border-b border-slate-800 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-2">
        {/* Left Side Announcement */}
        <div className="flex items-center gap-2 font-medium truncate">
          <span className="bg-amber-500 text-slate-950 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1 shrink-0">
            <Sparkles className="w-2.5 h-2.5 text-slate-950" />
            FREE SHIPPING
          </span>
          <span className="text-slate-300 text-[10px] sm:text-xs truncate">
            Free Nationwide Delivery over <strong className="text-amber-400 font-bold">Rs. 4,999</strong>
          </span>
        </div>

        {/* Right Side Currency & Language Selectors */}
        <div className="flex items-center gap-2 text-slate-300 shrink-0">
          {/* Language Picker */}
          <div className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700 text-[10px]">
            <Globe className="w-3 h-3 text-amber-400" />
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="bg-transparent text-white font-medium text-[10px] focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-slate-900 text-white">English</option>
              <option value="ur" className="bg-slate-900 text-white">اردو</option>
            </select>
          </div>

          {/* Currency Picker */}
          <div className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700 text-[10px]">
            <select
              value={currency}
              onChange={(e) => changeCurrency(e.target.value)}
              className="bg-transparent text-white font-medium text-[10px] focus:outline-none cursor-pointer"
            >
              <option value="PKR" className="bg-slate-900 text-white">PKR (Rs.)</option>
              <option value="USD" className="bg-slate-900 text-white">USD ($)</option>
              <option value="AED" className="bg-slate-900 text-white">AED (د.إ)</option>
              <option value="GBP" className="bg-slate-900 text-white">GBP (£)</option>
            </select>
          </div>

          {/* Theme Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 transition-colors"
            title="Toggle Light/Dark Theme"
          >
            {isDarkMode ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Palette, ChevronDown } from 'lucide-react';

export default function ThemeSwitcher() {
  const { theme, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeList = [
    { id: 'white_luxury', name: 'Royal Sapphire & Gold', primary: '#f59e0b' },
    { id: 'emerald', name: 'Emerald Boutique', primary: '#059669' },
    { id: 'sapphire', name: 'Deep Sapphire', primary: '#2563eb' }
  ];

  const activeThemeObj = themeList.find((t) => t.id === theme) || themeList[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-xs font-bold text-gold-400 hover:text-white transition-colors py-1 px-2 rounded-lg bg-slate-800/80 border border-slate-700"
        title="Change Boutique Color Theme"
      >
        <Palette className="w-3.5 h-3.5 text-gold-400" />
        <span className="hidden md:inline">{activeThemeObj.name}</span>
        <ChevronDown className="w-3 h-3 text-gold-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-800 p-2 z-50 text-xs space-y-1">
          <p className="text-[10px] font-extrabold text-gold-600 uppercase tracking-widest px-2 py-1 border-b">
            Boutique Color Palette
          </p>
          {themeList.map((th) => (
            <button
              key={th.id}
              onClick={() => {
                changeTheme && changeTheme(th.id);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                theme === th.id
                  ? 'bg-gold-500/20 text-gold-600 font-extrabold border border-gold-500/30'
                  : 'hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full border shadow-xs inline-block"
                  style={{ backgroundColor: th.primary }}
                />
                <span>{th.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

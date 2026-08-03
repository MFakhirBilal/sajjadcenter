'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('sajjad_theme') === 'dark') {
      setDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggle = () => {
    if (dark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('sajjad_theme', 'light');
      setDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('sajjad_theme', 'dark');
      setDark(true);
    }
  };

  return (
    <button
      onClick={toggle}
      title="Toggle Dark Mode"
      className="p-1 rounded-full text-gold-400 hover:text-white transition-colors"
    >
      {dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
    </button>
  );
}

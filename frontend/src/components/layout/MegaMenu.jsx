'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

export default function MegaMenu({ isOpen, onClose }) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const categories = [
    {
      title: 'Women Collection',
      slug: 'Women',
      items: ['Unstitched Lawn 3-Pc', 'Embroidered Chiffon', 'Ready to Wear Kurtis', 'Abayas & Hijabs', 'Silk Suits']
    },
    {
      title: 'Men Collection',
      slug: 'Men',
      items: ['Egyptian Cotton Kurta', 'Wash & Wear Suits', 'Waistcoats', 'Sherwani & Festive', 'Casual Shalwar Kameez']
    },
    {
      title: 'Kids & Festive',
      slug: 'Kids',
      items: ['Boys Kurta Pajama', 'Girls Lawn Suits', 'Prince Coats', 'Newborn Accessories']
    },
    {
      title: 'Shawls & Accessories',
      slug: 'Accessories',
      items: ['Pashmina Shawls', 'Woolen Shawls', 'Embroidered Dupattas', 'Cufflinks & Buttons']
    }
  ];

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-gold-500/20 shadow-2xl z-40 transition-all duration-300 py-8 px-6"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {categories.map((cat, idx) => (
          <div key={idx} className="space-y-3">
            <h4 className="font-serif font-bold text-emerald-950 dark:text-gold-400 text-lg border-b border-gold-500/30 pb-2">
              {cat.title}
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              {cat.items.map((sub, i) => (
                <li key={i}>
                  <Link
                    href={`/shop?category=${encodeURIComponent(cat.slug)}`}
                    onClick={onClose}
                    className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-gold-500 text-xs">•</span> {sub}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

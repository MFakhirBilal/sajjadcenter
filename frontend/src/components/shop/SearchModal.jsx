'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProducts } from '../../context/ProductContext';
import { useCurrency } from '../../context/CurrencyContext';
import { Search, X, ChevronRight } from 'lucide-react';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const { products } = useProducts();
  const { format } = useCurrency();

  if (!isOpen) return null;

  const results = query.trim().length >= 2
    ? products.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(query.toLowerCase())) ||
          (p.category && p.category.toLowerCase().includes(query.toLowerCase())) ||
          (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onClose} />

      {/* Search Container */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden z-10 border border-amber-500/30">
        {/* Search Header Input */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search unstitched lawn, kurta, velvet suits, waistcoats..."
            autoFocus
            className="w-full bg-transparent text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {query.trim().length < 2 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              Type at least 2 characters to search SajjadCenter collections...
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest px-2">
                Auto-Suggested Products ({results.length})
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {results.map((item) => (
                  <Link
                    key={item._id}
                    href={`/product/${item.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-2 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-amber-500/50 hover:bg-amber-50/50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <img
                      src={item.images && item.images.length > 0 ? item.images[0] : 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800'}
                      alt={item.name}
                      className="w-14 h-16 object-cover rounded-lg shrink-0"
                    />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold">
                        {item.category}
                      </p>
                      <p className="text-xs font-extrabold text-slate-950 dark:text-amber-400 mt-1">
                        {format(item.salePrice && item.salePrice > 0 ? item.salePrice : item.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="pt-2 text-center">
                <Link
                  href={`/shop?search=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:underline"
                >
                  <span>View all results for "{query}"</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-500">
              No matching products found for "{query}". Try checking category or fabric keywords.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

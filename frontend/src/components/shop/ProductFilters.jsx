'use client';

import React from 'react';
import { Filter, X, RefreshCw } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export default function ProductFilters({
  selectedCategory,
  setSelectedCategory,
  selectedSize,
  setSelectedSize,
  priceRange,
  setPriceRange,
  inStockOnly,
  setInStockOnly,
  resetFilters,
  isOpenMobile,
  onCloseMobile
}) {
  const { format } = useCurrency();

  const categories = ['All', 'Women', 'Men', 'Kids', 'Unstitched', 'Ready to Wear', 'Accessories'];
  const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL', 'Unstitched'];

  const content = (
    <div className="space-y-6">
      {/* Categories Filter */}
      <div>
        <h4 className="font-serif font-bold text-gray-900 dark:text-white text-sm mb-3 border-b border-gold-500/20 pb-2">
          Category
        </h4>
        <div className="space-y-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === 'All' ? '' : cat)}
              className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                (cat === 'All' && !selectedCategory) || selectedCategory === cat
                  ? 'bg-emerald-950 text-gold-400 font-bold'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <div className="flex items-center justify-between mb-3 border-b border-gold-500/20 pb-2">
          <h4 className="font-serif font-bold text-gray-900 dark:text-white text-sm">Max Price</h4>
          <span className="text-xs font-extrabold text-emerald-950 dark:text-gold-400">
            {format(priceRange)}
          </span>
        </div>
        <input
          type="range"
          min="1000"
          max="20000"
          step="500"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-gold-600 cursor-pointer"
        />
      </div>

      {/* Size Filter */}
      <div>
        <h4 className="font-serif font-bold text-gray-900 dark:text-white text-sm mb-3 border-b border-gold-500/20 pb-2">
          Size
        </h4>
        <div className="flex flex-wrap gap-2">
          {sizes.map((sz) => (
            <button
              key={sz}
              onClick={() => setSelectedSize(sz === 'All' ? '' : sz)}
              className={`text-xs px-3 py-1.5 rounded-md font-medium border transition-colors ${
                (sz === 'All' && !selectedSize) || selectedSize === sz
                  ? 'bg-emerald-950 border-emerald-950 text-gold-400 font-bold'
                  : 'border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:border-gold-500'
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Stock Availability Filter */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-800 dark:text-gray-200">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="accent-gold-600 w-4 h-4 rounded"
          />
          <span>Show In-Stock Only</span>
        </label>
      </div>

      {/* Reset Filters */}
      <button
        onClick={resetFilters}
        className="w-full text-xs font-bold text-emerald-900 dark:text-gold-400 bg-emerald-50 dark:bg-slate-800 hover:bg-emerald-100 py-2.5 rounded-xl border border-emerald-200 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Reset All Filters</span>
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Filter */}
      <div className="hidden lg:block w-64 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm h-fit sticky top-28">
        <div className="flex items-center gap-2 mb-6 text-emerald-950 dark:text-white font-serif font-bold text-base">
          <Filter className="w-4 h-4 text-gold-500" />
          <span>Refine Selection</span>
        </div>
        {content}
      </div>

      {/* Mobile Off-canvas Drawer Filter */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onCloseMobile} />
          <div className="relative w-4/5 max-w-xs bg-white dark:bg-slate-900 p-6 shadow-2xl flex flex-col h-full z-10 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-2 font-serif font-bold text-gray-900 dark:text-white">
                <Filter className="w-4 h-4 text-gold-500" />
                <span>Filter Catalog</span>
              </div>
              <button onClick={onCloseMobile} className="p-1 text-gray-500 hover:text-gray-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
}

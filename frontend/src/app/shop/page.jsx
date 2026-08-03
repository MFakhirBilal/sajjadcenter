'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProducts } from '../../context/ProductContext';
import ProductCard from '../../components/shop/ProductCard';
import ProductFilters from '../../components/shop/ProductFilters';
import { useLanguage } from '../../context/LanguageContext';
import { Filter, ArrowUpDown } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const { products } = useProducts();

  const categoryParam = searchParams.get('category') || '';
  const saleParam = searchParams.get('sale') === 'true';
  const sortParam = searchParams.get('sort') || 'newest';
  const searchParam = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedSize, setSelectedSize] = useState('');
  const [priceRange, setPriceRange] = useState(25000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState(sortParam);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedSize('');
    setPriceRange(25000);
    setInStockOnly(false);
    setSortBy('newest');
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory && selectedCategory !== 'All') {
        if (p.category && p.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
      }
      // Sale filter
      if (saleParam && (!p.salePrice || p.salePrice === 0)) return false;
      // Search term filter
      if (searchParam) {
        const q = searchParam.toLowerCase();
        const nameMatch = p.name && p.name.toLowerCase().includes(q);
        const descMatch = p.description && p.description.toLowerCase().includes(q);
        if (!nameMatch && !descMatch) return false;
      }
      // Size filter
      if (selectedSize && selectedSize !== 'All') {
        if (!p.sizes || !p.sizes.includes(selectedSize)) return false;
      }
      // Price filter
      const effectivePrice = p.salePrice && p.salePrice > 0 ? p.salePrice : p.price;
      if (effectivePrice > priceRange) return false;
      // Stock filter
      if (inStockOnly && p.stock <= 0) return false;

      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice && a.salePrice > 0 ? a.salePrice : a.price;
      const priceB = b.salePrice && b.salePrice > 0 ? b.salePrice : b.price;

      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
      return 0; // default newest
    });
  }, [products, selectedCategory, selectedSize, priceRange, inStockOnly, sortBy, saleParam, searchParam]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="mb-8 p-8 rounded-3xl bg-slate-900 text-white border-2 border-amber-500/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black text-amber-400 uppercase tracking-widest">BOUTIQUE CATALOG</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-black mt-1 text-white">
            {selectedCategory ? `${selectedCategory} Collection` : saleParam ? 'Special Sale Collection' : 'All Suits & Garments'}
          </h1>
          <p className="text-xs text-gray-300 mt-1">
            Discover {filteredProducts.length} luxury clothing items crafted with premium fabrics.
          </p>
        </div>

        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg"
        >
          <Filter className="w-4 h-4" />
          <span>Filters ({filteredProducts.length})</span>
        </button>
      </div>

      {/* Main Layout Container */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop & Mobile Filters */}
        <ProductFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          inStockOnly={inStockOnly}
          setInStockOnly={setInStockOnly}
          resetFilters={resetFilters}
          isOpenMobile={isMobileFilterOpen}
          onCloseMobile={() => setIsMobileFilterOpen(false)}
        />

        {/* Product Grid Area */}
        <div className="flex-1 space-y-6">
          {/* Top Sort & Toolbar */}
          <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xs text-xs">
            <span className="font-semibold text-slate-600 dark:text-gray-400">
              Showing <strong className="text-slate-950 dark:text-amber-400 font-black">{filteredProducts.length}</strong> items
            </span>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-bold text-slate-700 dark:text-gray-300 hidden sm:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-gray-100 border border-slate-200 dark:border-slate-700 text-xs font-bold rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-3 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
              <p className="font-serif font-bold text-lg text-slate-700 dark:text-gray-300">
                No matching clothing items found
              </p>
              <p className="text-xs text-slate-400">Try adjusting your filters or price range slider.</p>
              <button
                onClick={resetFilters}
                className="bg-slate-900 text-amber-400 text-xs font-bold px-6 py-2.5 rounded-full shadow-md hover:bg-slate-800"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500">Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}

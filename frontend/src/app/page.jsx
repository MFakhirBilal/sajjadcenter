'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { sampleBanners } from '../data/sampleBanners';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/shop/ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Flame } from 'lucide-react';

export default function HomePage() {
  const { t } = useLanguage();
  const { products } = useProducts();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sampleBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const safeProducts = Array.isArray(products) ? products.filter((p) => p && typeof p === 'object') : [];

  const featured = safeProducts
    .filter((p) => p.isFeatured || String(p._id || '').startsWith('prod-'))
    .slice(0, 8);

  const newArrivals = safeProducts
    .filter((p) => p.isNewArrival || String(p._id || '').startsWith('prod-'))
    .slice(0, 8);

  const categories = [
    { title: 'Women Unstitched', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600', link: '/shop?category=Women' },
    { title: 'Men Kurta & Suit', img: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=600', link: '/shop?category=Men' },
    { title: 'Ready to Wear', img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600', link: '/shop?category=Ready+to+Wear' },
    { title: 'Kids Collection', img: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600', link: '/shop?category=Kids' },
    { title: 'Pashmina & Shawls', img: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600', link: '/shop?category=Accessories' }
  ];

  return (
    <div className="space-y-8 sm:space-y-12 pb-12 overflow-hidden">
      {/* Sleek Compact Hero Slider */}
      <section className="relative w-full h-[280px] xs:h-[340px] sm:h-[400px] lg:h-[440px] max-h-[500px] overflow-hidden bg-slate-950">
        {sampleBanners.map((slide, idx) => (
          <div
            key={slide.id || idx}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full h-full object-cover object-top opacity-85 scale-105 transform animate-film-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent flex items-center justify-center sm:justify-start p-4 sm:p-8 lg:p-12">
              <div className="max-w-7xl mx-auto w-full">
                <div className="max-w-lg space-y-2 sm:space-y-3 text-white text-center sm:text-left mx-auto sm:mx-0">
                  <div>
                    <span className="inline-flex items-center gap-1 bg-amber-500 text-slate-950 text-[9px] sm:text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                      <Sparkles className="w-3 h-3" />
                      SAJJAD BOUTIQUE EXCLUSIVE
                    </span>
                  </div>
                  <h1 className="font-serif text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-white">
                    {slide.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed max-w-md mx-auto sm:mx-0 line-clamp-2">
                    {slide.subtitle}
                  </p>
                  <div className="pt-1">
                    <Link
                      href={slide.linkUrl || '/shop'}
                      className="inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs px-5 py-2.5 sm:px-6 sm:py-3 rounded-full shadow-lg transition-all transform hover:scale-105 border border-amber-500/40"
                    >
                      <span>{slide.buttonText || 'Shop Now'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Controls */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? sampleBanners.length - 1 : prev - 1))}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-slate-900/60 hover:bg-amber-500 text-white hover:text-slate-950 p-2 rounded-full backdrop-blur-md transition-all shadow-md"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % sampleBanners.length)}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-slate-900/60 hover:bg-amber-500 text-white hover:text-slate-950 p-2 rounded-full backdrop-blur-md transition-all shadow-md"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Carousel Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {sampleBanners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === currentSlide ? 'w-6 bg-amber-500' : 'w-1.5 bg-white/60 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Compact Categories Showcase */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center space-y-1 mb-6 sm:mb-8">
          <p className="text-[9px] sm:text-[10px] font-extrabold text-amber-600 uppercase tracking-widest">CURATED COLLECTION</p>
          <h2 className="font-serif text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t('shopByCategory')}
          </h2>
          <div className="w-12 h-0.5 bg-amber-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-4">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.link}
              className="group relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xs hover:shadow-md aspect-[4/4.5] block bg-slate-900 border border-slate-200 dark:border-slate-800 cinematic-card"
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent p-2.5 sm:p-3 flex flex-col justify-end text-center">
                <h3 className="font-serif font-bold text-white text-xs sm:text-sm group-hover:text-amber-400 transition-colors leading-tight">
                  {cat.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Collection Grid */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-row items-end justify-between gap-2 mb-4 sm:mb-6">
          <div>
            <span className="text-[9px] sm:text-[10px] font-extrabold text-amber-600 uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> HANDPICKED SELECTION
            </span>
            <h2 className="font-serif text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t('featuredCollection')}
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold text-slate-900 dark:text-amber-400 hover:text-amber-600 flex items-center gap-1 shrink-0"
          >
            <span>View Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Universal Compact Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2.5 sm:gap-4">
          {featured.map((product, idx) => (
            <ProductCard key={product._id || product.slug || idx} product={product} />
          ))}
        </div>
      </section>

      {/* Compact Festive Promo Banner */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-amber-500/40 p-4 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-2 max-w-lg text-center sm:text-left">
            <span className="bg-amber-500 text-slate-950 text-[9px] sm:text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
              LIMITED TIME FESTIVE OFFER
            </span>
            <h3 className="font-serif text-xl sm:text-3xl font-extrabold leading-tight text-white">
              Flat <span className="text-amber-400">20% Discount</span> On Luxury Suits
            </h3>
            <p className="text-xs text-gray-300">
              Use Coupon Code <strong className="text-amber-400 bg-slate-800 px-1.5 py-0.5 rounded border border-amber-500/40 font-mono">SAJJAD10</strong> for instant discount!
            </p>
            <div className="pt-1">
              <Link
                href="/shop?sale=true"
                className="inline-flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-full shadow-md transition-all"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Shop Festive Sale</span>
              </Link>
            </div>
          </div>

          <div className="relative w-28 sm:w-44 aspect-square rounded-xl overflow-hidden shadow-lg border-2 border-amber-500/30 shrink-0 hidden xs:block">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800"
              alt="Festive Sale"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center space-y-1 mb-6 sm:mb-8">
          <p className="text-[9px] sm:text-[10px] font-extrabold text-amber-600 uppercase tracking-widest">FRESH OFF THE LOOM</p>
          <h2 className="font-serif text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t('latestArrivals')}
          </h2>
          <div className="w-12 h-0.5 bg-amber-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2.5 sm:gap-4">
          {newArrivals.map((product, idx) => (
            <ProductCard key={product._id || product.slug || idx} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

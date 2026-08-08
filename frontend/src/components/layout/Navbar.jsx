'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import MegaMenu from './MegaMenu';
import MobileDrawer from './MobileDrawer';
import SearchModal from '../shop/SearchModal';
import { Search, ShoppingBag, Heart, User, Menu, ChevronDown, Sparkles, Home, Grid } from 'lucide-react';

export default function Navbar() {
  const { t } = useLanguage();
  const { totalItemsCount } = useCart();
  const { wishlist } = useWishlist();
  const { user } = useAuth();

  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/98 dark:bg-slate-950/98 backdrop-blur-2xl border-b border-slate-200/90 dark:border-slate-800 shadow-sm transition-colors">
        {/* Main Sleek Spacious Header Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24 gap-4">
            {/* Mobile Drawer Trigger Button (Mobile Only) */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileDrawerOpen(true)}
                className="p-2.5 rounded-xl text-slate-900 dark:text-gray-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Open Mobile Menu"
              >
                <Menu className="w-7 h-7 text-slate-900 dark:text-white" />
              </button>
            </div>

            {/* Premium Brand Logo with Tagline */}
            <div className="flex-1 md:flex-none text-center md:text-left">
              <Link href="/" className="inline-block group">
                <div className="flex items-center gap-3">
                  <img
                    src="/sajjad_logo.jpg"
                    alt="Sajjad Center Luxury Logo"
                    className="w-12 h-12 md:w-15 md:h-15 rounded-full object-cover border-2 border-amber-500 shadow-md group-hover:scale-105 transition-transform"
                  />
                  <div className="text-left">
                    <span className="font-serif text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-slate-950 dark:text-white block group-hover:text-amber-600 transition-colors leading-none">
                      SAJJAD<span className="text-amber-500 font-light">CENTER</span>
                    </span>
                    <span className="text-[9px] sm:text-[10.5px] tracking-[0.3em] text-amber-600 dark:text-amber-400 font-black block uppercase mt-1">
                      STEP INTO STYLE
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Prominent & Bold Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-5 lg:space-x-8 text-base lg:text-lg font-black text-slate-900 dark:text-gray-100 tracking-wide uppercase">
              <Link
                href="/"
                className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-3 border-b-2 border-transparent hover:border-amber-500"
              >
                {t('home')}
              </Link>

              <div
                onMouseEnter={() => setIsMegaOpen(true)}
                className="relative py-4 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5 border-b-2 border-transparent hover:border-amber-500"
              >
                <span>{t('shop')}</span>
                <ChevronDown className="w-4 h-4 text-amber-500" />
              </div>

              <Link
                href="/shop?category=Women"
                className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-3 border-b-2 border-transparent hover:border-amber-500"
              >
                {t('women')}
              </Link>

              <Link
                href="/shop?category=Men"
                className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-3 border-b-2 border-transparent hover:border-amber-500"
              >
                {t('men')}
              </Link>

              <Link
                href="/shop?category=Kids"
                className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-3 border-b-2 border-transparent hover:border-amber-500"
              >
                {t('kids')}
              </Link>

              <Link
                href="/shop?sort=newest"
                className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-slate-950 dark:text-white font-black flex items-center gap-1.5 py-3 border-b-2 border-transparent hover:border-amber-500"
              >
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{t('newArrivals')}</span>
              </Link>

              <Link
                href="/shop?sale=true"
                className="hover:text-amber-700 dark:hover:text-red-400 transition-colors text-red-600 font-black animate-pulse py-3 border-b-2 border-transparent hover:border-red-500"
              >
                {t('sale')} 20% OFF
              </Link>
            </nav>

            {/* Action Buttons (Search, Wishlist, Cart, Profile) */}
            <div className="flex items-center space-x-1 sm:space-x-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-3 text-slate-800 dark:text-gray-200 hover:text-amber-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                title="Search Catalog"
              >
                <Search className="w-6 h-6" />
              </button>

              <Link
                href="/wishlist"
                className="p-3 text-slate-800 dark:text-gray-200 hover:text-amber-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative"
                title="Wishlist"
              >
                <Heart className="w-6 h-6" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-red-600 text-white text-[10px] font-black rounded-full w-4.5 h-4.5 flex items-center justify-center shadow-xs">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                className="p-3 text-slate-800 dark:text-gray-200 hover:text-amber-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative"
                title="Shopping Cart"
              >
                <ShoppingBag className="w-6 h-6" />
                {totalItemsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-amber-500 text-slate-950 text-[10px] font-black rounded-full w-4.5 h-4.5 flex items-center justify-center shadow-xs">
                    {totalItemsCount}
                  </span>
                )}
              </Link>

              <Link
                href="/account"
                className="p-3 text-slate-800 dark:text-gray-200 hover:text-amber-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                title={user ? user.name : 'Account'}
              >
                <User className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Strip (MOBILE ONLY: md:hidden) */}
        <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/95 dark:bg-slate-900/95 py-2.5 md:hidden">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center space-x-6 overflow-x-auto whitespace-nowrap no-scrollbar text-sm font-black text-slate-900 dark:text-gray-100">
              <Link href="/" className="hover:text-amber-600 transition-colors flex items-center gap-1 shrink-0">
                <Home className="w-4 h-4 text-amber-600" />
                <span>{t('home')}</span>
              </Link>

              <div
                onClick={() => setIsMegaOpen(!isMegaOpen)}
                className="cursor-pointer hover:text-amber-600 transition-colors flex items-center gap-1 shrink-0"
              >
                <Grid className="w-4 h-4 text-amber-600" />
                <span>{t('shop')}</span>
                <ChevronDown className="w-3.5 h-3.5 text-amber-500" />
              </div>

              <Link href="/shop?category=Women" className="hover:text-amber-600 transition-colors shrink-0">
                {t('women')}
              </Link>

              <Link href="/shop?category=Men" className="hover:text-amber-600 transition-colors shrink-0">
                {t('men')}
              </Link>

              <Link href="/shop?category=Kids" className="hover:text-amber-600 transition-colors shrink-0">
                {t('kids')}
              </Link>

              <Link href="/shop?sort=newest" className="hover:text-amber-600 text-slate-950 dark:text-white font-black flex items-center gap-1 shrink-0">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{t('newArrivals')}</span>
              </Link>

              <Link href="/shop?sale=true" className="hover:text-amber-600 text-red-600 font-black animate-pulse shrink-0">
                {t('sale')} 20% OFF
              </Link>
            </nav>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <MegaMenu isOpen={isMegaOpen} onClose={() => setIsMegaOpen(false)} />
      </header>

      {/* Mobile Drawer Off-Canvas */}
      <MobileDrawer isOpen={isMobileDrawerOpen} onClose={() => setIsMobileDrawerOpen(false)} />

      {/* Live Auto-suggest Search Modal */}
      {isSearchOpen && <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}
    </>
  );
}

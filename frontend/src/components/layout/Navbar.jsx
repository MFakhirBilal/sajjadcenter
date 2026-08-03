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
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 shadow-2xs transition-colors">
        {/* Main Sleek Compact Header Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
            {/* Mobile Drawer Trigger Button (Mobile Only) */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMobileDrawerOpen(true)}
                className="p-1.5 rounded-lg text-slate-800 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Open Mobile Menu"
              >
                <Menu className="w-5 h-5 text-slate-900 dark:text-white" />
              </button>
            </div>

            {/* Compact Brand Logo */}
            <div className="flex-1 sm:flex-none text-center sm:text-left">
              <Link href="/" className="inline-block group">
                <span className="font-serif text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white block group-hover:text-amber-600 transition-colors leading-none">
                  SAJJAD<span className="text-amber-600 font-light">CENTER</span>
                </span>
                <span className="text-[7.5px] sm:text-[8.5px] tracking-[0.2em] text-slate-500 dark:text-amber-400 font-bold block uppercase mt-0.5">
                  LUXURY CLOTHING BOUTIQUE
                </span>
              </Link>
            </div>

            {/* Sleek Compact Desktop Navigation Links */}
            <nav className="hidden sm:flex items-center space-x-4 lg:space-x-6 text-xs font-bold text-slate-700 dark:text-gray-200 tracking-wide uppercase">
              <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                {t('home')}
              </Link>

              <div
                onMouseEnter={() => setIsMegaOpen(true)}
                className="relative py-4 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1"
              >
                <span>{t('shop')}</span>
                <ChevronDown className="w-3 h-3 text-amber-500" />
              </div>

              <Link href="/shop?category=Women" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                {t('women')}
              </Link>

              <Link href="/shop?category=Men" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                {t('men')}
              </Link>

              <Link href="/shop?category=Kids" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                {t('kids')}
              </Link>

              <Link href="/shop?sort=newest" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-slate-950 dark:text-white font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>{t('newArrivals')}</span>
              </Link>

              <Link href="/shop?sale=true" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-red-600 font-extrabold animate-pulse">
                {t('sale')} 20% OFF
              </Link>
            </nav>

            {/* Action Buttons (Search, Wishlist, Cart, Profile) */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-slate-700 dark:text-gray-300 hover:text-amber-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                title="Search Catalog"
              >
                <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>

              <Link
                href="/wishlist"
                className="p-2 text-slate-700 dark:text-gray-300 hover:text-amber-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative"
                title="Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-red-600 text-white text-[8px] font-black rounded-full w-3.5 h-3.5 flex items-center justify-center shadow-2xs">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                className="p-2 text-slate-700 dark:text-gray-300 hover:text-amber-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative"
                title="Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {totalItemsCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-amber-500 text-slate-950 text-[8px] font-black rounded-full w-3.5 h-3.5 flex items-center justify-center shadow-2xs">
                    {totalItemsCount}
                  </span>
                )}
              </Link>

              <Link
                href="/account"
                className="p-2 text-slate-700 dark:text-gray-300 hover:text-amber-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                title={user ? user.name : 'Account'}
              >
                <User className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Strip (MOBILE ONLY: sm:hidden) */}
        <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/90 py-1.5 sm:hidden">
          <div className="max-w-7xl mx-auto px-3">
            <nav className="flex items-center space-x-4 overflow-x-auto whitespace-nowrap no-scrollbar text-[11px] font-bold text-slate-700 dark:text-gray-200">
              <Link href="/" className="hover:text-amber-600 transition-colors flex items-center gap-1 shrink-0">
                <Home className="w-3 h-3 text-amber-600" />
                <span>{t('home')}</span>
              </Link>

              <div
                onClick={() => setIsMegaOpen(!isMegaOpen)}
                className="cursor-pointer hover:text-amber-600 transition-colors flex items-center gap-1 shrink-0"
              >
                <Grid className="w-3 h-3 text-amber-600" />
                <span>{t('shop')}</span>
                <ChevronDown className="w-2.5 h-2.5 text-amber-500" />
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

              <Link href="/shop?sort=newest" className="hover:text-amber-600 text-slate-950 dark:text-white font-extrabold flex items-center gap-1 shrink-0">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>{t('newArrivals')}</span>
              </Link>

              <Link href="/shop?sale=true" className="hover:text-amber-600 text-red-600 font-extrabold animate-pulse shrink-0">
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

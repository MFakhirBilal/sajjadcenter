'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { X, ShieldCheck, ShoppingBag, Heart, Truck, Phone, User } from 'lucide-react';

export default function MobileDrawer({ isOpen, onClose }) {
  const { t } = useLanguage();
  const { user, isAdmin, logout } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      {/* Off-canvas panel */}
      <div className="relative w-4/5 max-w-sm bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100 shadow-2xl flex flex-col h-full z-10 transition-transform duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between bg-emerald-950 text-white">
          <div>
            <h3 className="font-serif font-bold text-lg text-gold-400">SAJJADCENTER</h3>
            <p className="text-xs text-gray-300">Premium Clothing Boutique</p>
          </div>

          <button onClick={onClose} className="p-1 rounded-full text-gold-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-bold text-gold-600 uppercase tracking-widest">Navigation</p>
            <nav className="flex flex-col space-y-3 text-sm font-semibold">
              <Link href="/" onClick={onClose} className="hover:text-gold-600 py-1">
                {t('home')}
              </Link>
              <Link href="/shop" onClick={onClose} className="hover:text-gold-600 py-1">
                {t('shop')}
              </Link>
              <Link href="/shop?category=Women" onClick={onClose} className="hover:text-gold-600 py-1">
                {t('women')}
              </Link>
              <Link href="/shop?category=Men" onClick={onClose} className="hover:text-gold-600 py-1">
                {t('men')}
              </Link>
              <Link href="/shop?category=Kids" onClick={onClose} className="hover:text-gold-600 py-1">
                {t('kids')}
              </Link>
              <Link href="/shop?sort=newest" onClick={onClose} className="text-emerald-700 dark:text-emerald-400 font-bold py-1">
                {t('newArrivals')}
              </Link>
              <Link href="/shop?sale=true" onClick={onClose} className="text-red-600 font-extrabold py-1">
                {t('sale')} (Special Offers)
              </Link>
            </nav>
          </div>

          <div className="space-y-3 border-t border-gray-200 dark:border-slate-800 pt-5">
            <p className="text-xs font-bold text-gold-600 uppercase tracking-widest">Customer Center</p>
            <nav className="flex flex-col space-y-3 text-sm">
              <Link href="/track-order" onClick={onClose} className="flex items-center gap-2 hover:text-gold-600">
                <Truck className="w-4 h-4 text-emerald-700" />
                <span>{t('trackOrder')}</span>
              </Link>
              <Link href="/wishlist" onClick={onClose} className="flex items-center gap-2 hover:text-gold-600">
                <Heart className="w-4 h-4 text-emerald-700" />
                <span>{t('wishlist')}</span>
              </Link>
              <Link href="/contact" onClick={onClose} className="flex items-center gap-2 hover:text-gold-600">
                <Phone className="w-4 h-4 text-emerald-700" />
                <span>Contact Us</span>
              </Link>
            </nav>
          </div>

        </div>

        {/* Drawer Footer Account Info */}
        <div className="p-5 border-t border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-800">
          {user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-800 dark:text-gold-400" />
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">{user.name}</p>
                  <p className="text-[10px] text-gray-500">{user.email}</p>
                </div>
              </div>
              <button onClick={() => { logout(); onClose(); }} className="text-xs text-red-600 font-bold hover:underline">
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/account"
              onClick={onClose}
              className="w-full block text-center bg-emerald-900 hover:bg-emerald-950 text-gold-400 font-bold text-sm py-2.5 rounded-lg shadow-md"
            >
              Sign In / Register
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

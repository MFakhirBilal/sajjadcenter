'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Home, Grid, ShoppingBag, Heart, User } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { totalItemsCount } = useCart();
  const { wishlist } = useWishlist();

  // Hide on admin routes
  if (pathname.startsWith('/admin')) return null;

  const navItems = [
    { label: t('home'), href: '/', icon: Home },
    { label: t('shop'), href: '/shop', icon: Grid },
    { label: t('wishlist'), href: '/wishlist', icon: Heart, badge: wishlist.length },
    { label: t('cart'), href: '/cart', icon: ShoppingBag, badge: totalItemsCount },
    { label: t('profile'), href: '/account', icon: User }
  ];

  return (
    /* Strictly Mobile Only: Hidden on sm (640px+), md, lg, xl, desktop! */
    <div className="fixed bottom-3 left-3 right-3 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-2xl rounded-full sm:hidden py-1.5 px-2 transition-all duration-300">
      <div className="flex items-center justify-around">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={index}
              href={item.href}
              className={`flex flex-col items-center py-1 px-2.5 relative transition-all duration-200 ${
                isActive
                  ? 'text-amber-600 dark:text-amber-400 font-extrabold scale-110'
                  : 'text-slate-500 dark:text-gray-400 hover:text-slate-900'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 font-semibold">{item.label}</span>
              {isActive && (
                <span className="absolute -bottom-1 w-1.5 h-1.5 bg-amber-600 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '../../context/WishlistContext';
import ProductCard from '../../components/shop/ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 bg-red-50 dark:bg-slate-800 text-red-500 rounded-full flex items-center justify-center mx-auto border-2 border-red-200">
          <Heart className="w-12 h-12" />
        </div>
        <h2 className="font-serif font-bold text-3xl text-emerald-950 dark:text-white">Your Wishlist is Empty</h2>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Save your favorite luxury clothing, unstitched suits, and waistcoats to your wishlist for later.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-emerald-950 hover:bg-emerald-900 text-gold-400 font-extrabold text-sm px-8 py-3.5 rounded-full shadow-xl"
        >
          <span>Explore Collections</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <h1 className="font-serif text-3xl font-extrabold text-emerald-950 dark:text-white border-b pb-4">
        Saved Wishlist ({wishlist.length} Items)
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

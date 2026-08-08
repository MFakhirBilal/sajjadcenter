'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCurrency } from '../../context/CurrencyContext';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { format } = useCurrency();

  if (!product || typeof product !== 'object') return null;

  const productId = product._id || product.slug || 'item';
  const isLiked = isInWishlist(productId);
  const primaryImage = product.images && Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800';

  const price = Number(product.price) || 0;
  const salePrice = Number(product.salePrice) || 0;
  const currentPrice = salePrice > 0 ? salePrice : price;
  const hasSale = salePrice > 0 && salePrice < price;
  const discountPercent = hasSale && price > 0 ? Math.round(((price - salePrice) / price) * 100) : 0;
  const slug = product.slug || 'product';

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 border border-slate-100 dark:border-slate-800 flex flex-col h-full cinematic-card">
      {/* Image Showcase Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-50 dark:bg-slate-800">
        <Link href={`/product/${slug}`} className="block w-full h-full">
          <img
            src={primaryImage}
            alt={product.name || 'Product'}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
          {hasSale && (
            <span className="bg-red-600 text-white text-[8px] sm:text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
          {product.isNewArrival && !hasSale && (
            <span className="bg-slate-900 text-amber-400 text-[8px] sm:text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-xs border border-amber-500/30">
              NEW
            </span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="bg-amber-500 text-slate-950 text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
              Low Stock
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-2 right-2 z-10 p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all duration-200 shadow-xs ${
            isLiked
              ? 'bg-red-500 text-white'
              : 'bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-gray-200 hover:bg-red-500 hover:text-white'
          }`}
          aria-label="Add to Wishlist"
        >
          <Heart className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isLiked ? 'fill-white' : ''}`} />
        </button>

        {/* Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 flex gap-1.5">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="flex-1 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-[10px] sm:text-xs py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 shadow-md border border-amber-500/40 transition-transform active:scale-95"
          >
            <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Add to Cart</span>
          </button>
          <Link
            href={`/product/${slug}`}
            className="bg-white/95 hover:bg-white text-slate-900 p-1.5 rounded-lg flex items-center justify-center shadow-xs"
            title="Quick View"
          >
            <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </Link>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between space-y-1.5">
        <div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-gray-400 mb-0.5">
            <span className="font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider text-[8.5px] sm:text-[9.5px] truncate max-w-[90px] sm:max-w-none">
              {product.category || 'Women'}
            </span>
            <div className="flex items-center gap-0.5 text-amber-500 shrink-0">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400" />
              <span className="font-bold text-[10px] sm:text-[11px] text-slate-800 dark:text-gray-200">{product.rating || 5.0}</span>
            </div>
          </div>

          <Link href={`/product/${slug}`} className="block group-hover:text-amber-600 transition-colors">
            <h3 className="font-serif font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1 leading-snug">
              {product.name || 'SajjadCenter Suit'}
            </h3>
          </Link>
        </div>

        {/* Price & Sizes */}
        <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1">
          <div className="flex items-baseline gap-1 shrink-0">
            <span className="font-extrabold text-xs sm:text-sm text-slate-950 dark:text-amber-400">
              {format(currentPrice)}
            </span>
            {hasSale && (
              <span className="text-[9px] sm:text-[10px] text-slate-400 line-through">
                {format(price)}
              </span>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-0.5">
            {product.sizes && Array.isArray(product.sizes) && product.sizes.slice(0, 3).map((sz, idx) => (
              <span key={idx} className="text-[8px] font-bold text-slate-500 dark:text-gray-400 bg-slate-100 dark:bg-slate-800 px-1 py-0.2 rounded">
                {sz}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

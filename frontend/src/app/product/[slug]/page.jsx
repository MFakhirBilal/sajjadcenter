'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useProducts } from '../../../context/ProductContext';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import { useCurrency } from '../../../context/CurrencyContext';
import SizeGuideModal from '../../../components/shop/SizeGuideModal';
import ProductCard from '../../../components/shop/ProductCard';
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, Ruler, Check, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { format } = useCurrency();

  const product = products.find((p) => p.slug === slug) || products[0];

  const primaryImg = product.images && product.images.length > 0 ? product.images[0] : 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800';
  const [selectedImage, setSelectedImage] = useState(primaryImg);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0].name : 'Standard');
  const [qty, setQty] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  const isLiked = isInWishlist(product._id);
  const currentPrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.price;

  const handleAddToCart = () => {
    addToCart(product, qty, selectedSize, selectedColor);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const related = products.filter((p) => p.category === product.category && p._id !== product._id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back Link */}
      <Link href="/shop" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-amber-600">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Catalog</span>
      </Link>

      {/* Main Product Display Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Gallery Component */}
        <div className="space-y-4">
          <div className="aspect-[3/4] w-full rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-800 relative">
            <img
              src={selectedImage || primaryImg}
              alt={product.name}
              className="w-full h-full object-cover object-top"
            />
            {product.salePrice > 0 && (
              <span className="absolute top-4 left-4 bg-red-600 text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase shadow-md">
                SPECIAL SALE
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === img ? 'border-amber-500 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Purchase Actions */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-slate-900 text-amber-400 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                {product.category}
              </span>
              <span className="text-xs text-slate-500 font-semibold">SKU: {product.sku}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
              {product.name}
            </h1>

            {/* Rating Stars */}
            <div className="flex items-center gap-2 mt-3 text-xs">
              <div className="flex items-center text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 5) ? 'fill-amber-400' : 'text-slate-300'}`} />
                ))}
              </div>
              <span className="font-bold text-slate-900 dark:text-gray-200">{product.rating || 5.0}</span>
              <span className="text-slate-400">({product.numReviews || 1} Verified Reviews)</span>
            </div>
          </div>

          {/* Price Box */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 flex items-baseline gap-4">
            <span className="font-serif text-3xl font-black text-slate-950 dark:text-amber-400">
              {format(currentPrice)}
            </span>
            {product.salePrice > 0 && (
              <span className="text-base text-slate-400 line-through">
                {format(product.price)}
              </span>
            )}
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 ml-auto">
              Inclusive of all taxes
            </span>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wider">
                Color Swatch: <span className="text-amber-600">{selectedColor}</span>
              </label>
              <div className="flex gap-3">
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform flex items-center justify-center ${
                      selectedColor === c.name ? 'border-amber-500 scale-110 shadow-md' : 'border-slate-300'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor === c.name && <Check className="w-4 h-4 text-white drop-shadow" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wider">
                  Select Size:
                </label>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Chart Guide</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`text-xs px-4 py-2.5 rounded-xl font-bold border transition-all ${
                      selectedSize === sz
                        ? 'bg-slate-900 border-slate-900 text-amber-400 shadow-md scale-105'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-gray-300 hover:border-amber-500'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector & Add to Cart Action */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-base font-bold text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                -
              </button>
              <span className="px-4 py-2 text-sm font-extrabold">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-2 text-base font-bold text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-slate-900 hover:bg-slate-800 text-amber-400 font-extrabold text-sm py-3.5 px-6 rounded-xl shadow-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] border border-amber-500/40"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`p-3.5 rounded-xl border transition-colors shadow-sm ${
                isLiked ? 'bg-red-500 border-red-500 text-white' : 'border-slate-200 dark:border-slate-700 text-slate-700 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-white' : ''}`} />
            </button>
          </div>

          {addedToast && (
            <div className="bg-slate-900 text-amber-400 text-xs font-bold p-3 rounded-xl shadow-lg border border-amber-500/40 animate-bounce">
              ✓ Added {qty}x item to cart successfully!
            </div>
          )}

          {/* Description & Fabric Specs */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-3">
            <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white">Fabric & Design Details</h4>
            <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
              <p><strong>Fabric:</strong> {product.fabric}</p>
              <p><strong>Brand:</strong> {product.brand}</p>
              <p><strong>Stock Status:</strong> <span className="text-emerald-600 font-bold">In Stock ({product.stock} left)</span></p>
              <p><strong>Delivery:</strong> 2 - 4 Business Days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Grid */}
      {related.length > 0 && (
        <div className="pt-12 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <h3 className="font-serif font-bold text-2xl text-slate-900 dark:text-white">
            You May Also Like
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {related.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </div>
      )}

      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </div>
  );
}

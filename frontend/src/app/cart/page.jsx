'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, Truck } from 'lucide-react';

export default function CartPage() {
  const {
    cartItems,
    updateQty,
    removeFromCart,
    clearCart,
    itemsPrice,
    shippingPrice,
    discountAmount,
    totalPrice,
    coupon,
    setCoupon
  } = useCart();

  const { format } = useCurrency();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const handleApplyCoupon = () => {
    setCouponError('');
    setCouponSuccess('');
    const code = couponInput.trim().toUpperCase();

    if (code === 'SAJJAD10') {
      setCoupon({ code: 'SAJJAD10', discountPercent: 10 });
      setCouponSuccess('Coupon SAJJAD10 applied (10% discount)');
    } else if (code === 'EID2026') {
      setCoupon({ code: 'EID2026', discountPercent: 20 });
      setCouponSuccess('Coupon EID2026 applied (20% discount)');
    } else {
      setCouponError('Invalid or expired coupon code. Try "SAJJAD10"');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 bg-emerald-50 dark:bg-slate-800 text-gold-500 rounded-full flex items-center justify-center mx-auto border-2 border-gold-500/30">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="font-serif font-bold text-3xl text-emerald-950 dark:text-white">Your Shopping Cart is Empty</h2>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Explore Sajjad Cloth House's luxury unstitched lawn, kurtas, waistcoats, and festive apparel to add items to your cart.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-emerald-950 hover:bg-emerald-900 text-gold-400 font-extrabold text-sm px-8 py-3.5 rounded-full shadow-xl transition-transform hover:scale-105 border border-gold-500/40"
        >
          <span>Start Shopping Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <h1 className="font-serif text-3xl font-extrabold text-emerald-950 dark:text-white border-b pb-4">
        Shopping Cart ({cartItems.length} Items)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm flex items-center gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-24 object-cover rounded-xl shrink-0 border border-gray-200"
              />

              <div className="flex-1 min-w-0 space-y-1">
                <Link href={`/product/${item.slug}`} className="font-serif font-bold text-sm text-gray-900 dark:text-white truncate block hover:text-gold-600">
                  {item.name}
                </Link>
                <div className="flex gap-3 text-xs text-gray-500">
                  <span>Size: <strong className="text-gray-800 dark:text-gray-200">{item.size}</strong></span>
                  <span>Color: <strong className="text-gray-800 dark:text-gray-200">{item.color}</strong></span>
                </div>
                <div className="font-extrabold text-sm text-emerald-950 dark:text-gold-400">
                  {format(item.price)}
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden text-xs">
                <button
                  onClick={() => updateQty(item._id, item.size, item.color, item.qty - 1)}
                  className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 dark:hover:bg-slate-800 font-bold"
                >
                  -
                </button>
                <span className="px-3 py-1 font-bold">{item.qty}</span>
                <button
                  onClick={() => updateQty(item._id, item.size, item.color, item.qty + 1)}
                  className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 dark:hover:bg-slate-800 font-bold"
                >
                  +
                </button>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => removeFromCart(item._id, item.size, item.color)}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                title="Remove item"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={clearCart}
              className="text-xs text-red-600 font-bold hover:underline"
            >
              Clear Entire Cart
            </button>
            <Link
              href="/shop"
              className="text-xs text-emerald-900 dark:text-gold-400 font-bold hover:underline"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary & Coupon */}
        <div className="space-y-6">
          {/* Coupon Box */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm space-y-3">
            <h4 className="font-serif font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
              <Tag className="w-4 h-4 text-gold-500" />
              <span>Apply Coupon Code</span>
            </h4>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="e.g. SAJJAD10"
                className="flex-1 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs px-3 py-2 rounded-xl focus:outline-none uppercase font-bold"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-emerald-950 hover:bg-emerald-900 text-gold-400 text-xs font-bold px-4 py-2 rounded-xl shadow-md"
              >
                Apply
              </button>
            </div>
            {couponError && <p className="text-[11px] text-red-500 font-medium">{couponError}</p>}
            {couponSuccess && <p className="text-[11px] text-emerald-600 font-bold">{couponSuccess}</p>}
          </div>

          {/* Totals Box */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-emerald-950 dark:text-white border-b pb-3">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal:</span>
                <span className="font-bold text-gray-900 dark:text-white">{format(itemsPrice)}</span>
              </div>

              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Estimated Shipping:</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400">
                  {shippingPrice === 0 ? 'FREE' : format(shippingPrice)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 dark:text-gold-400 font-bold">
                  <span>Discount ({coupon?.code}):</span>
                  <span>- {format(discountAmount)}</span>
                </div>
              )}

              <div className="border-t pt-3 flex justify-between items-baseline text-sm font-extrabold text-emerald-950 dark:text-white">
                <span>Grand Total:</span>
                <span className="text-lg text-gold-600">{format(totalPrice)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-emerald-950 hover:bg-emerald-900 text-gold-400 font-extrabold text-sm py-3.5 rounded-xl shadow-xl flex items-center justify-center gap-2 border border-gold-500/40"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, CheckCircle } from 'lucide-react';

export default function ToastNotification() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 lg:bottom-10 right-6 z-50 bg-emerald-950 text-white border-2 border-gold-500 p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce max-w-sm">
      <div className="p-2 rounded-full bg-gold-500 text-emerald-950">
        <CheckCircle className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-serif font-bold text-xs text-gold-400">Shopping Cart Updated</h4>
        <p className="text-xs text-gray-200">{toastMessage}</p>
      </div>
    </div>
  );
}

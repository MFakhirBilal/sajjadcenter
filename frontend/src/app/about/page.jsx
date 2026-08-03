'use client';

import React from 'react';
import { ShieldCheck, Award, HeartHandshake, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-extrabold text-gold-600 uppercase tracking-widest">OUR HERITAGE & VISION</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-emerald-950 dark:text-white">
          About SajjadCenter
        </h1>
        <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full" />
      </div>

      <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[16/7] bg-slate-900 border-2 border-gold-500/30">
        <img
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600"
          alt="SajjadCenter Boutique Heritage"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent flex items-end p-8 text-white">
          <p className="font-serif text-xl sm:text-2xl font-extrabold">Crafting Timeless Fashion Since 1995</p>
        </div>
      </div>

      <div className="prose prose-emerald dark:prose-invert max-w-none text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
        <p>
          Welcome to <strong>SajjadCenter</strong>. For over three decades, we have been standard-bearers of luxury Pakistani fashion, offering unstitched lawn, Egyptian cotton kurta sets, embroidered silk, pashmina shawls, waistcoats, and festive apparel.
        </p>

        <p>
          Our mission is to weave traditional elegance with modern sophistication. Every fabric in our boutique undergoes stringent quality checks to ensure durability, vibrant colorfastness, and exquisite tactile luxury.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm text-center space-y-2">
          <Award className="w-10 h-10 text-gold-500 mx-auto" />
          <h4 className="font-serif font-bold text-base text-gray-900 dark:text-white">Uncompromised Quality</h4>
          <p className="text-xs text-gray-500">100% genuine fine lawn, Egyptian cotton, and pure silk threads.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm text-center space-y-2">
          <HeartHandshake className="w-10 h-10 text-gold-500 mx-auto" />
          <h4 className="font-serif font-bold text-base text-gray-900 dark:text-white">Customer Satisfaction</h4>
          <p className="text-xs text-gray-500">Dedicated customer helpline and seamless 7-day exchange guarantee.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm text-center space-y-2">
          <Sparkles className="w-10 h-10 text-gold-500 mx-auto" />
          <h4 className="font-serif font-bold text-base text-gray-900 dark:text-white">Worldwide Delivery</h4>
          <p className="text-xs text-gray-500">Express nationwide delivery across Pakistan and international shipping.</p>
        </div>
      </div>
    </div>
  );
}

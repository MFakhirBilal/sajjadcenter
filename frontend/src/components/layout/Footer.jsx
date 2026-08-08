'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Truck, RefreshCw, Award, Send, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-200 border-t-2 border-amber-500/40 pt-10 pb-16 lg:pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-8">
        {/* Compact Brand Value Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-md">
          <div className="flex items-center gap-2.5 p-1">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl shrink-0 border border-amber-500/20">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-white">Free Shipping</h4>
              <p className="text-[10px] text-slate-400 font-medium">Orders over Rs. 4,999</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-1">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl shrink-0 border border-amber-500/20">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-white">100% Authentic</h4>
              <p className="text-[10px] text-slate-400 font-medium">Guaranteed original suits</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-1">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl shrink-0 border border-amber-500/20">
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-white">7 Days Return</h4>
              <p className="text-[10px] text-slate-400 font-medium">Hassle-free exchange</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-1">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl shrink-0 border border-amber-500/20">
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-white">Boutique Quality</h4>
              <p className="text-[10px] text-slate-400 font-medium">Premium embroidery</p>
            </div>
          </div>
        </div>

        {/* Compact Newsletter Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white p-5 sm:p-6 border border-amber-500/30 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center lg:text-left max-w-md">
            <span className="text-[9px] font-extrabold text-amber-400 uppercase tracking-widest bg-slate-950 px-2.5 py-0.5 rounded-full border border-amber-500/30 inline-block">
              VIP BOUTIQUE CLUB
            </span>
            <h3 className="font-serif text-base sm:text-lg font-bold text-white">
              Subscribe For Exclusive Discount Coupons
            </h3>
            <p className="text-[11px] text-slate-300">
              Get notified first on new unstitched lawn drops and festive sales!
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto min-w-[260px] sm:min-w-[340px]">
            <div className="flex items-center bg-slate-950 border border-slate-700 p-1 rounded-full">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address..."
                className="w-full bg-transparent px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-1.5 rounded-full shrink-0 transition-all flex items-center gap-1 shadow-xs"
              >
                {subscribed ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />
                    <span>Joined!</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send className="w-3 h-3" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Main Multi-Column Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 pt-2">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <Link href="/" className="inline-block group">
              <span className="font-serif text-lg sm:text-xl font-black text-white tracking-tight group-hover:text-amber-400 transition-colors">
                SAJJAD<span className="text-amber-500 font-light">CENTER</span>
              </span>
              <span className="text-[8.5px] tracking-[0.28em] text-amber-400 font-black block uppercase mt-0.5">
                STEP INTO STYLE
              </span>
            </Link>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm font-medium">
              SajjadCenter is Garh More's premier clothing boutique offering Pakistan's finest collection of luxury unstitched lawn, designer waistcoats, men kurtas, and kids eastern wear.
            </p>
            <div className="pt-0.5">
              <a
                href="https://maps.google.com/?q=Garh+More+Punjab+Pakistan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:underline bg-slate-900 px-3 py-1.5 rounded-lg border border-amber-500/30 shadow-xs"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>Visit Store: Main Commercial Plaza, Garh More</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h3 className="font-serif font-bold text-amber-400 text-xs uppercase tracking-wider">
              Collections
            </h3>
            <ul className="space-y-2 text-xs font-semibold text-slate-300">
              <li><Link href="/shop?category=Women" className="hover:text-amber-400 transition-colors">Women Unstitched</Link></li>
              <li><Link href="/shop?category=Men" className="hover:text-amber-400 transition-colors">Men Kurta & Suits</Link></li>
              <li><Link href="/shop?category=Kids" className="hover:text-amber-400 transition-colors">Kids Eastern Wear</Link></li>
              <li><Link href="/shop?category=Ready+to+Wear" className="hover:text-amber-400 transition-colors">Ready to Wear</Link></li>
              <li><Link href="/shop?sale=true" className="hover:text-amber-400 text-red-400 font-extrabold">Festive Sale (20% Off)</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-2.5">
            <h3 className="font-serif font-bold text-amber-400 text-xs uppercase tracking-wider">
              Support & Help
            </h3>
            <ul className="space-y-2 text-xs font-semibold text-slate-300">
              <li><Link href="/track-order" className="hover:text-amber-400 transition-colors">Track Order</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-amber-400 transition-colors">Store FAQs</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-amber-400 transition-colors">Shipping Info</Link></li>
              <li><Link href="/return-policy" className="hover:text-amber-400 transition-colors">Return Policy</Link></li>
            </ul>
          </div>

          {/* Store Hours & Contact */}
          <div className="space-y-2.5">
            <h3 className="font-serif font-bold text-amber-400 text-xs uppercase tracking-wider">
              Store Info
            </h3>
            <div className="space-y-2 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Mon - Sun: 9 AM - 9 PM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>support@sajjadcenter.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} SajjadCenter • Step Into Style. All rights reserved.</p>
          <div className="flex items-center space-x-2 text-slate-400 text-[10px]">
            <span className="font-bold text-white">COD Available</span>
            <span>•</span>
            <span>JazzCash / EasyPaisa</span>
            <span>•</span>
            <span>Bank Transfer</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

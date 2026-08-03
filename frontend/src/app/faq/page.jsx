'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    { q: 'How long does delivery take in Pakistan?', a: 'Nationwide delivery takes 2 to 4 working days for major cities (Lahore, Karachi, Islamabad, Faisalabad) and 3 to 5 working days for other regions.' },
    { q: 'What payment methods do you accept?', a: 'We accept Cash on Delivery (COD), Credit/Debit Card payments via Stripe, and Direct Bank Transfers.' },
    { q: 'How do I track my order status?', a: 'You can use the Track Order page by entering your unique Order ID (e.g. SCH-123456) or phone number.' },
    { q: 'What is your return & exchange policy?', a: 'We offer a 7-day hassle-free exchange policy for undamaged, unused clothing items with original tags intact.' },
    { q: 'Are your unstitched suits 100% genuine lawn?', a: 'Yes! All Sajjad Cloth House fabrics are 100% authentic, high-thread count lawn and Egyptian cotton.' }
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs font-extrabold text-gold-600 uppercase tracking-widest">HELP & SUPPORT</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-emerald-950 dark:text-white">
          Frequently Asked Questions
        </h1>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm cursor-pointer"
            onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
          >
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-gold-500" />
                <span>{faq.q}</span>
              </h4>
              <ChevronDown className={`w-4 h-4 transition-transform ${openIndex === idx ? 'rotate-180 text-gold-500' : 'text-gray-400'}`} />
            </div>
            {openIndex === idx && (
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-3 pt-3 border-t leading-relaxed">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

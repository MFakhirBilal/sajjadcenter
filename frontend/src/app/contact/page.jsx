'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="text-center space-y-2">
        <span className="text-xs font-extrabold text-gold-600 uppercase tracking-widest">GET IN TOUCH</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-emerald-950 dark:text-white">
          Contact SajjadCenter
        </h1>
        <p className="text-xs text-gray-500 max-w-md mx-auto">
          Have a question regarding custom tailoring, bulk orders, or online delivery? We are here to help!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6 bg-emerald-950 text-white p-8 rounded-3xl border-2 border-gold-500/30 shadow-xl">
          <h3 className="font-serif font-bold text-2xl text-gold-400">Visit Our Flagship Store</h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Experience our full collection of unstitched lawn, waistcoats, and festive wear in person.
          </p>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Boutique Address:</strong>
                <p className="text-gray-300">Main Commercial Plaza, Garh More, Punjab, Pakistan</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Garh+More+Punjab+Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-1 text-[11px] font-bold text-gold-400 hover:underline"
                >
                  📍 Open Store Directions on Google Maps →
                </a>
              </div>
            </div>



            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Helpline & WhatsApp:</strong>
                <p className="text-gray-300">+92 300 1234567 / +92 312 9876543</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Support Email:</strong>
                <p className="text-gray-300">support@sajjadcenter.com</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-full shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <span className="text-3xl">✓</span>
              <h4 className="font-serif font-bold text-xl text-emerald-950 dark:text-gold-400">Message Sent!</h4>
              <p className="text-xs text-gray-500">Thank you for reaching out. Our team will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Order Inquiry / Custom Suit"
                  className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Your Message</label>
                <textarea
                  rows="4"
                  required
                  placeholder="How can we assist you today?"
                  className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 rounded-xl focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-950 hover:bg-emerald-900 text-gold-400 font-extrabold text-xs py-3.5 rounded-xl shadow-xl flex items-center justify-center gap-2 border border-gold-500/40"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

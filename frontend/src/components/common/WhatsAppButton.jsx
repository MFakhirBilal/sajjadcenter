'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

import { usePaymentSettings } from '../../context/PaymentSettingsContext';

export default function WhatsAppButton() {
  const { settings } = usePaymentSettings();
  const rawNum = settings?.whatsappNumber ? settings.whatsappNumber.replace(/[^0-9]/g, '') : '923001234567';
  const phoneNumber = rawNum.startsWith('0') ? '92' + rawNum.slice(1) : rawNum;
  const defaultMessage = encodeURIComponent('Assalam-o-Alaikum SajjadCenter! I would like to inquire about products.');



  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 lg:bottom-8 right-5 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 group border-2 border-gold-400"
      title="Chat with Sajjad Cloth House on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 fill-white text-emerald-600" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
        Chat on WhatsApp
      </span>
    </a>
  );
}

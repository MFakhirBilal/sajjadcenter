'use client';

import React from 'react';

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6">
      <h1 className="font-serif text-3xl font-extrabold text-emerald-950 dark:text-white border-b pb-3">
        Shipping & Delivery Policy
      </h1>
      <div className="prose prose-emerald dark:prose-invert text-xs text-gray-600 dark:text-gray-300 space-y-4 leading-relaxed">
        <p>
          At <strong>SajjadCenter</strong>, we strive to deliver your fashion orders safely and promptly.
        </p>

        <h3 className="font-serif font-bold text-sm text-gray-900 dark:text-white">Domestic Delivery Rates & Timeline</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Orders Above Rs. 4,999:</strong> FREE Shipping Nationwide in Pakistan.</li>
          <li><strong>Orders Below Rs. 4,999:</strong> Standard Flat Shipping Fee of Rs. 250.</li>
          <li><strong>Delivery Duration:</strong> 2 - 4 working days for major cities; 3 - 5 days for remote locations.</li>
        </ul>
        <h3 className="font-serif font-bold text-sm text-gray-900 dark:text-white">Order Dispatch Notification</h3>
        <p>
          Once your order is handed to our courier partners (TCS, Leopards, M&P), an SMS and WhatsApp notification containing your courier tracking code will be sent to your phone.
        </p>
      </div>
    </div>
  );
}

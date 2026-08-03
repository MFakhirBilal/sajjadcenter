'use client';

import React from 'react';

export default function ReturnPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6">
      <h1 className="font-serif text-3xl font-extrabold text-emerald-950 dark:text-white border-b pb-3">
        Return & Exchange Policy
      </h1>
      <div className="prose prose-emerald dark:prose-invert text-xs text-gray-600 dark:text-gray-300 space-y-4 leading-relaxed">
        <p>
          We want you to love your purchase from <strong>Sajjad Cloth House</strong>. If you are not completely satisfied, we offer a hassle-free exchange within <strong>7 days</strong> of delivery.
        </p>
        <h3 className="font-serif font-bold text-sm text-gray-900 dark:text-white">Exchange Conditions</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Item must be unwashed, unworn, and unstitched in its original condition.</li>
          <li>Original brand tags and invoice slip must be returned with the product parcel.</li>
          <li>Custom tailored or altered clothing cannot be returned unless damaged upon delivery.</li>
        </ul>
        <p>
          To initiate an exchange, please contact our support team at +92 300 1234567 or email support@sajjadcenter.com.
        </p>
      </div>
    </div>
  );
}

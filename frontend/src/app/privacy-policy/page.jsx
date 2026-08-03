'use client';

import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6">
      <h1 className="font-serif text-3xl font-extrabold text-emerald-950 dark:text-white border-b pb-3">
        Privacy Policy
      </h1>
      <div className="prose prose-emerald dark:prose-invert text-xs text-gray-600 dark:text-gray-300 space-y-4 leading-relaxed">
        <p>
          At <strong>SajjadCenter</strong>, accessible from sajjadcenter.com, customer privacy is paramount.
        </p>

        <p>
          We collect essential information (name, shipping address, phone number, email) solely for fulfilling orders, managing customer support, and sending optional newsletter updates. We do not sell or rent customer data to any third party.
        </p>
      </div>
    </div>
  );
}

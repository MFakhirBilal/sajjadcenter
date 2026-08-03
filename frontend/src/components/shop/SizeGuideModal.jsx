'use client';

import React from 'react';
import { X, Ruler } from 'lucide-react';

export default function SizeGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl z-10 border border-gold-500/30">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2 font-serif font-bold text-gray-900 dark:text-white text-lg">
            <Ruler className="w-5 h-5 text-gold-500" />
            <span>Size Measurements Guide</span>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-gray-500 mb-4">
          All measurements are in inches. Standard sizing for Sajjad Cloth House Eastern ready-to-wear kurtas and waistcoats.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-emerald-950 text-gold-400">
                <th className="p-2 border border-emerald-900">Size</th>
                <th className="p-2 border border-emerald-900">Chest</th>
                <th className="p-2 border border-emerald-900">Waist</th>
                <th className="p-2 border border-emerald-900">Length</th>
                <th className="p-2 border border-emerald-900">Sleeve</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800 text-gray-700 dark:text-gray-300">
              <tr>
                <td className="p-2 font-bold border">Small (S)</td>
                <td className="p-2 border">36" - 38"</td>
                <td className="p-2 border">34"</td>
                <td className="p-2 border">38"</td>
                <td className="p-2 border">23"</td>
              </tr>
              <tr>
                <td className="p-2 font-bold border">Medium (M)</td>
                <td className="p-2 border">40" - 42"</td>
                <td className="p-2 border">38"</td>
                <td className="p-2 border">40"</td>
                <td className="p-2 border">24"</td>
              </tr>
              <tr>
                <td className="p-2 font-bold border">Large (L)</td>
                <td className="p-2 border">44" - 46"</td>
                <td className="p-2 border">42"</td>
                <td className="p-2 border">42"</td>
                <td className="p-2 border">25"</td>
              </tr>
              <tr>
                <td className="p-2 font-bold border">Extra Large (XL)</td>
                <td className="p-2 border">48" - 50"</td>
                <td className="p-2 border">46"</td>
                <td className="p-2 border">44"</td>
                <td className="p-2 border">25.5"</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

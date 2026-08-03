'use client';

import React, { useState } from 'react';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import { Tag, Plus, Trash2 } from 'lucide-react';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState([
    { _id: '1', code: 'SAJJAD10', discountPercent: 10, minSpend: 3000, expiryDate: '2027-12-31', isActive: true },
    { _id: '2', code: 'EID2026', discountPercent: 20, minSpend: 5000, expiryDate: '2027-12-31', isActive: true }
  ]);

  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState(15);

  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (!newCode) return;
    setCoupons([
      ...coupons,
      { _id: Date.now().toString(), code: newCode.toUpperCase(), discountPercent: Number(newDiscount), minSpend: 2000, expiryDate: '2027-12-31', isActive: true }
    ]);
    setNewCode('');
  };

  const handleDelete = (id) => {
    setCoupons(coupons.filter((c) => c._id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-950">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div>
          <h1 className="font-serif text-3xl font-extrabold text-emerald-950 dark:text-white">
            Coupon & Discount Management
          </h1>
          <p className="text-xs text-gray-500">Create promotional discount codes for checkout.</p>
        </div>

        {/* Add Form */}
        <form onSubmit={handleAddCoupon} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm max-w-lg space-y-4 text-xs">
          <h3 className="font-serif font-bold text-sm text-emerald-950 dark:text-gold-400">Create Promo Code</h3>
          <div className="flex gap-3">
            <input
              type="text"
              required
              placeholder="e.g. FESTIVE15"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              className="flex-1 bg-gray-50 border p-2.5 rounded-xl uppercase font-bold focus:outline-none"
            />
            <input
              type="number"
              min="1"
              max="90"
              value={newDiscount}
              onChange={(e) => setNewDiscount(Number(e.target.value))}
              placeholder="Discount %"
              className="w-28 bg-gray-50 border p-2.5 rounded-xl font-bold focus:outline-none"
            />
            <button type="submit" className="bg-emerald-950 text-gold-400 font-bold px-4 py-2.5 rounded-xl shadow-md">
              Create
            </button>
          </div>
        </form>

        {/* List */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-emerald-950 text-gold-400 font-serif uppercase">
                <th className="p-3">Coupon Code</th>
                <th className="p-3">Discount %</th>
                <th className="p-3">Min Spend</th>
                <th className="p-3">Expiry Date</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-gray-800 dark:text-gray-200">
              {coupons.map((c) => (
                <tr key={c._id}>
                  <td className="p-3 font-mono font-bold text-gold-600">{c.code}</td>
                  <td className="p-3 font-extrabold">{c.discountPercent}% OFF</td>
                  <td className="p-3 font-semibold">Rs. {c.minSpend}</td>
                  <td className="p-3">{c.expiryDate}</td>
                  <td className="p-3 text-right">
                    <button onClick={() => handleDelete(c._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

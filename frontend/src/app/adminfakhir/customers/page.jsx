'use client';

import React from 'react';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import { Users, Mail, Phone, MapPin } from 'lucide-react';

export default function AdminCustomersPage() {
  const customers = [
    { _id: '1', name: 'Fakhir Chaudhry', email: 'customer@sajjadcenter.com', phone: '+92 300 1234567', ordersCount: 4, spent: 28500, city: 'Lahore' },
    { _id: '2', name: 'Usman Ali', email: 'usman@example.com', phone: '+92 312 9876543', ordersCount: 2, spent: 12400, city: 'Lahore' },
    { _id: '3', name: 'Ayesha Khan', email: 'ayesha@example.com', phone: '+92 333 1122334', ordersCount: 5, spent: 41000, city: 'Karachi' },
    { _id: '4', name: 'Zainab Bibi', email: 'zainab@example.com', phone: '+92 321 5566778', ordersCount: 1, spent: 4900, city: 'Islamabad' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-950">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div>
          <h1 className="font-serif text-3xl font-extrabold text-emerald-950 dark:text-white">
            Customer Directory ({customers.length})
          </h1>
          <p className="text-xs text-gray-500">View registered store users and order histories.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-emerald-950 text-gold-400 font-serif uppercase">
                <th className="p-3">Customer Name</th>
                <th className="p-3">Email & Phone</th>
                <th className="p-3">City</th>
                <th className="p-3 text-center">Orders</th>
                <th className="p-3 text-right">Total Spent</th>
              </tr>
            </thead>
            <tbody className="divide-y text-gray-800 dark:text-gray-200">
              {customers.map((c) => (
                <tr key={c._id}>
                  <td className="p-3 font-bold text-gray-900 dark:text-white">{c.name}</td>
                  <td className="p-3">
                    <p>{c.email}</p>
                    <p className="text-gray-400 text-[10px]">{c.phone}</p>
                  </td>
                  <td className="p-3 font-semibold">{c.city}</td>
                  <td className="p-3 text-center font-extrabold text-gold-600">{c.ordersCount}</td>
                  <td className="p-3 text-right font-extrabold text-emerald-950 dark:text-gold-400">Rs. {c.spent.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

'use client';

import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { sampleProducts } from '../../data/sampleProducts';
import { formatPrice } from '../../data/currencies';
import { DollarSign, Package, ShoppingBag, Users, AlertTriangle, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import AdminGuard from '../../components/admin/AdminGuard';

export default function AdminDashboardPage() {
  const lowStock = sampleProducts.filter((p) => p.stock <= 8).slice(0, 5);

  const stats = [
    { title: 'Total Revenue', value: 'Rs. 1,485,000', icon: DollarSign, change: '+18.4% vs last month', color: 'bg-emerald-950 text-gold-400' },
    { title: 'Total Orders', value: '284 Orders', icon: Package, change: '+12.1% this week', color: 'bg-emerald-900 text-white' },
    { title: 'Total Clothing Items', value: `${sampleProducts.length} Items`, icon: ShoppingBag, change: '100 Active Products', color: 'bg-emerald-800 text-white' },
    { title: 'Registered Customers', value: '1,420 Users', icon: Users, change: '+45 new accounts', color: 'bg-emerald-950 text-gold-400' }
  ];

  const recentOrders = [
    { id: 'SCH-894210', customer: 'Fakhir Chaudhry', total: 12500, status: 'Delivered', items: 3, date: '2026-07-25' },
    { id: 'SCH-710294', customer: 'Usman Ali', total: 6800, status: 'Processing', items: 2, date: '2026-07-25' },
    { id: 'SCH-592019', customer: 'Ayesha Khan', total: 14200, status: 'Shipped', items: 4, date: '2026-07-24' },
    { id: 'SCH-401823', customer: 'Zainab Bibi', total: 4900, status: 'Pending', items: 1, date: '2026-07-24' }
  ];

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-gray-50 dark:bg-slate-950">

      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div>
          <h1 className="font-serif text-3xl font-extrabold text-emerald-950 dark:text-white">
            Dashboard Analytics Overview
          </h1>
          <p className="text-xs text-gray-500">Live operational overview of SajjadCenter.</p>

        </div>

        {/* Analytics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-500 uppercase">{st.title}</span>
                  <div className={`p-2.5 rounded-xl ${st.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-extrabold text-gray-900 dark:text-white">{st.value}</h3>
                <p className="text-[11px] font-bold text-emerald-700 dark:text-gold-400">{st.change}</p>
              </div>
            );
          })}
        </div>

        {/* Low Stock Alerts & Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Low Stock Alert Table */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif font-bold text-base text-red-600 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                <span>Low Stock Inventory Warnings</span>
              </h3>
              <Link href="/admin/products" className="text-xs text-gold-600 font-bold hover:underline">
                Manage Stock
              </Link>
            </div>

            <div className="space-y-3">
              {lowStock.map((item) => (
                <div key={item._id} className="flex items-center justify-between p-3 rounded-xl bg-red-50/50 dark:bg-slate-800/40 border border-red-100 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={item.images[0]} alt={item.name} className="w-10 h-12 object-cover rounded-lg" />
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white truncate max-w-[180px]">{item.name}</p>
                      <p className="text-[10px] text-gray-500">SKU: {item.sku}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="bg-red-600 text-white font-extrabold px-2 py-0.5 rounded text-[10px]">
                      {item.stock} LEFT IN STOCK
                    </span>
                    <p className="text-[10px] text-gray-500 mt-1">{formatPrice(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Customer Orders Table */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif font-bold text-base text-emerald-950 dark:text-white">
                Recent Store Orders
              </h3>
              <Link href="/admin/orders" className="text-xs text-gold-600 font-bold hover:underline">
                View All Orders
              </Link>
            </div>

            <div className="space-y-3">
              {recentOrders.map((ord, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-slate-800/40 text-xs border">
                  <div>
                    <strong className="text-gold-600 font-serif">{ord.id}</strong>
                    <p className="font-bold text-gray-800 dark:text-gray-200">{ord.customer}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      ord.status === 'Delivered' ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {ord.status}
                    </span>
                    <p className="font-extrabold text-emerald-950 dark:text-gold-400 mt-1">{formatPrice(ord.total)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
    </AdminGuard>
  );
}


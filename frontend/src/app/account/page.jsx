'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import PrintableInvoiceModal from '../../components/admin/PrintableInvoiceModal';
import { User, Package, MapPin, LogOut, Printer, ChevronRight } from 'lucide-react';
import { formatPrice } from '../../data/currencies';

export default function AccountPage() {
  const { user, logout } = useAuth();
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  const mockOrders = [
    {
      trackingId: 'SCH-894210',
      createdAt: '2026-07-20',
      orderStatus: 'Delivered',
      isPaid: true,
      totalPrice: 12500,
      paymentMethod: 'Cash on Delivery',
      orderItems: [
        { name: 'Sajjad Royal Women Collection Vol. 1', qty: 2, size: 'M', color: 'Emerald Green', price: 4200 },
        { name: 'Sajjad Royal Men Kurta Edition Vol. 3', qty: 1, size: 'L', color: 'Ivory White', price: 4100 }
      ],
      shippingAddress: {
        fullName: user?.name || 'Fakhir Chaudhry',
        phone: '+92 300 1234567',
        email: user?.email || 'customer@sajjadcenter.com',
        address: 'House 45, Commercial Plaza',
        city: 'Lahore'
      }
    },
    {
      trackingId: 'SCH-710294',
      createdAt: '2026-07-10',
      orderStatus: 'Processing',
      isPaid: true,
      totalPrice: 6800,
      paymentMethod: 'Stripe',
      orderItems: [
        { name: 'Sajjad Royal Kids Eastern Vol. 2', qty: 2, size: 'S', color: 'Royal Gold', price: 3400 }
      ],
      shippingAddress: {
        fullName: user?.name || 'Fakhir Chaudhry',
        phone: '+92 300 1234567',
        email: user?.email || 'customer@sajjadcenter.com',
        address: 'House 45, Commercial Plaza',
        city: 'Lahore'
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Account Banner */}
      <div className="p-8 rounded-3xl bg-emerald-950 text-white border-2 border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gold-500 text-emerald-950 font-extrabold text-2xl flex items-center justify-center border-2 border-white shadow-md">
            {user?.name ? user.name[0] : 'U'}
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold">{user?.name || 'User Account'}</h1>
            <p className="text-xs text-gold-400 font-medium">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 shadow-md"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Order History */}
      <div className="space-y-4">
        <h2 className="font-serif font-bold text-2xl text-emerald-950 dark:text-white flex items-center gap-2">
          <Package className="w-6 h-6 text-gold-500" />
          <span>My Order History</span>
        </h2>

        <div className="space-y-4">
          {mockOrders.map((ord, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b">
                <div>
                  <span className="text-xs font-bold text-gold-600">ORDER #{ord.trackingId}</span>
                  <p className="text-xs text-gray-400">Placed on: {ord.createdAt}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    ord.orderStatus === 'Delivered' ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
                  }`}>
                    {ord.orderStatus}
                  </span>
                  <button
                    onClick={() => setSelectedInvoiceOrder(ord)}
                    className="bg-emerald-950 text-gold-400 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm hover:bg-emerald-900"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Invoice</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {ord.orderItems.map((item, i) => (
                  <div key={i} className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300">
                    <span>{item.name} ({item.qty}x - Size {item.size})</span>
                    <span>{formatPrice(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t flex justify-between items-center text-xs">
                <span className="text-gray-500">Payment: <strong>{ord.paymentMethod}</strong></span>
                <span className="font-extrabold text-sm text-emerald-950 dark:text-gold-400">
                  Total: {formatPrice(ord.totalPrice)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invoice Modal */}
      <PrintableInvoiceModal
        order={selectedInvoiceOrder}
        isOpen={Boolean(selectedInvoiceOrder)}
        onClose={() => setSelectedInvoiceOrder(null)}
      />
    </div>
  );
}

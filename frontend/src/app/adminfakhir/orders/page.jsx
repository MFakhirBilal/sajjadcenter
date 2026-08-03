'use client';

import React, { useState } from 'react';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import PrintableInvoiceModal from '../../../components/admin/PrintableInvoiceModal';
import { formatPrice } from '../../../data/currencies';
import { Printer, CheckCircle, PackageCheck, Truck, Clock } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([
    {
      _id: 'ord-1',
      trackingId: 'SCH-894210',
      createdAt: '2026-07-25T10:30:00Z',
      orderStatus: 'Pending',
      isPaid: false,
      totalPrice: 12500,
      paymentMethod: 'Cash on Delivery',
      shippingAddress: { fullName: 'Fakhir Chaudhry', phone: '+923001234567', email: 'customer@sajjadcenter.com', address: 'House 45, Sector Commercial', city: 'Lahore' },
      orderItems: [{ name: 'Sajjad Royal Women Collection Vol. 1', qty: 2, size: 'M', color: 'Emerald Green', price: 4200 }, { name: 'Sajjad Royal Men Kurta Vol. 3', qty: 1, size: 'L', color: 'White', price: 4100 }]
    },
    {
      _id: 'ord-2',
      trackingId: 'SCH-710294',
      createdAt: '2026-07-24T14:15:00Z',
      orderStatus: 'Processing',
      isPaid: true,
      totalPrice: 6800,
      paymentMethod: 'Stripe',
      shippingAddress: { fullName: 'Usman Ali', phone: '+923129876543', email: 'usman@example.com', address: 'Plot 12, Gulberg', city: 'Lahore' },
      orderItems: [{ name: 'Sajjad Royal Kids Eastern Vol. 2', qty: 2, size: 'S', color: 'Gold', price: 3400 }]
    },
    {
      _id: 'ord-3',
      trackingId: 'SCH-592019',
      createdAt: '2026-07-23T09:00:00Z',
      orderStatus: 'Shipped',
      isPaid: true,
      totalPrice: 14200,
      paymentMethod: 'Cash on Delivery',
      shippingAddress: { fullName: 'Ayesha Khan', phone: '+923331122334', email: 'ayesha@example.com', address: 'Defense Phase 5', city: 'Karachi' },
      orderItems: [{ name: 'Sajjad Royal Velvet Edition Vol. 10', qty: 2, size: 'M', color: 'Ruby Red', price: 7100 }]
    }
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map((o) => (o._id === id ? { ...o, orderStatus: newStatus, isPaid: newStatus === 'Delivered' ? true : o.isPaid } : o)));
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-950">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div>
          <h1 className="font-serif text-3xl font-extrabold text-emerald-950 dark:text-white">
            Order Management & Invoices
          </h1>
          <p className="text-xs text-gray-500">Update shipping statuses and print customer tax invoices.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-emerald-950 text-gold-400 font-serif uppercase tracking-wider">
                <th className="p-3">Tracking ID</th>
                <th className="p-3">Customer Details</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Total</th>
                <th className="p-3">Order Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800 text-gray-800 dark:text-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-mono font-bold text-gold-600">#{order.trackingId}</td>
                  <td className="p-3">
                    <p className="font-bold">{order.shippingAddress.fullName}</p>
                    <p className="text-[10px] text-gray-400">{order.shippingAddress.phone} | {order.shippingAddress.city}</p>
                  </td>
                  <td className="p-3">
                    <span className="font-semibold">{order.paymentMethod}</span>
                    <span className={`block text-[10px] font-extrabold ${order.isPaid ? 'text-emerald-700' : 'text-amber-600'}`}>
                      {order.isPaid ? 'PAID' : 'UNPAID / COD'}
                    </span>
                  </td>
                  <td className="p-3 font-extrabold text-emerald-950 dark:text-gold-400">
                    {formatPrice(order.totalPrice)}
                  </td>
                  <td className="p-3">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="bg-gray-100 dark:bg-slate-800 border text-xs font-bold rounded-lg px-2 py-1 cursor-pointer focus:outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedInvoice(order)}
                      className="bg-emerald-950 hover:bg-emerald-900 text-gold-400 text-xs font-bold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 shadow-sm"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Invoice</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PrintableInvoiceModal
          order={selectedInvoice}
          isOpen={Boolean(selectedInvoice)}
          onClose={() => setSelectedInvoice(null)}
        />
      </main>
    </div>
  );
}

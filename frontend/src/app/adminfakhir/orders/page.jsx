'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import PrintableInvoiceModal from '../../../components/admin/PrintableInvoiceModal';
import { formatPrice } from '../../../data/currencies';
import { Printer, RefreshCw, Eye } from 'lucide-react';

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
      paymentMethod: 'JazzCash',
      transactionRef: 'TRX98124018',
      shippingAddress: { fullName: 'Usman Ali', phone: '+923129876543', email: 'usman@example.com', address: 'Plot 12, Gulberg', city: 'Lahore' },
      orderItems: [{ name: 'Sajjad Royal Kids Eastern Vol. 2', qty: 2, size: 'S', color: 'Gold', price: 3400 }]
    }
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedDetailModal, setSelectedDetailModal] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      let apiOrders = data.orders || [];

      let localOrders = [];
      try {
        localOrders = JSON.parse(localStorage.getItem('sajjad_live_orders') || '[]');
      } catch (e) {}

      const combined = [...localOrders, ...apiOrders];
      const uniqueOrders = Array.from(new Map(combined.map(o => [o.trackingId || o._id, o])).values());

      if (uniqueOrders.length > 0) {
        setOrders(uniqueOrders);
      }
    } catch (e) {
      console.error('Error fetching admin orders:', e);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const updated = orders.map((o) =>
      o._id === id || o.trackingId === id
        ? { ...o, orderStatus: newStatus, isPaid: newStatus === 'Delivered' ? true : o.isPaid }
        : o
    );
    setOrders(updated);

    try {
      await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, orderStatus: newStatus })
      });
    } catch (e) {}
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-950">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-8 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-emerald-950 dark:text-white">
              Customer Order Management & Invoices
            </h1>
            <p className="text-xs text-gray-500">Live order feeds, shipping status updates, and printable tax receipts.</p>
          </div>
          <button
            onClick={fetchOrders}
            className="bg-emerald-950 hover:bg-emerald-900 text-gold-400 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Live Orders</span>
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-emerald-950 text-gold-400 font-serif uppercase tracking-wider">
                <th className="p-3">Tracking ID</th>
                <th className="p-3">Customer Details</th>
                <th className="p-3">Items & Qty</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Total</th>
                <th className="p-3">Order Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800 text-gray-800 dark:text-gray-200">
              {orders.map((order) => {
                const addr = order.shippingAddress || {};
                const items = order.orderItems || [];
                return (
                  <tr key={order.trackingId || order._id} className="hover:bg-gray-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-mono font-bold text-gold-600">#{order.trackingId}</td>
                    <td className="p-3">
                      <p className="font-bold text-slate-900 dark:text-white">{addr.fullName || 'Guest Customer'}</p>
                      <p className="text-[11px] text-emerald-700 font-semibold">{addr.phone || 'No Phone'}</p>
                      <p className="text-[10px] text-gray-400">{addr.city || 'Pakistan'} | {addr.address || ''}</p>
                    </td>
                    <td className="p-3">
                      <p className="font-bold">{items.length} item(s)</p>
                      <p className="text-[10px] text-gray-500 max-w-[180px] truncate">
                        {items.map(i => `${i.name} (${i.qty}x)`).join(', ')}
                      </p>
                    </td>
                    <td className="p-3">
                      <span className="font-semibold">{order.paymentMethod || 'COD'}</span>
                      {order.transactionRef && (
                        <p className="text-[10px] font-mono text-emerald-600 font-bold">TRX: {order.transactionRef}</p>
                      )}
                      <span className={`block text-[10px] font-extrabold ${order.isPaid ? 'text-emerald-700' : 'text-amber-600'}`}>
                        {order.isPaid ? 'PAID' : 'UNPAID / COD'}
                      </span>
                    </td>
                    <td className="p-3 font-extrabold text-emerald-950 dark:text-gold-400 text-sm">
                      {formatPrice(order.totalPrice || 0)}
                    </td>
                    <td className="p-3">
                      <select
                        value={order.orderStatus || 'Pending'}
                        onChange={(e) => handleStatusChange(order._id || order.trackingId, e.target.value)}
                        className="bg-gray-100 dark:bg-slate-800 border text-xs font-bold rounded-lg px-2 py-1 cursor-pointer focus:outline-none"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-3 text-right space-x-1">
                      <button
                        onClick={() => setSelectedDetailModal(order)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-gray-200 text-xs font-bold p-1.5 rounded-lg inline-flex items-center"
                        title="View Full Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setSelectedInvoice(order)}
                        className="bg-emerald-950 hover:bg-emerald-900 text-gold-400 text-xs font-bold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 shadow-sm"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Invoice</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Full Details Modal */}
        {selectedDetailModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-lg w-full space-y-4 border border-gold-500/40 shadow-2xl">
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="font-serif font-bold text-lg text-emerald-950 dark:text-gold-400">
                  Order #{selectedDetailModal.trackingId}
                </h3>
                <button onClick={() => setSelectedDetailModal(null)} className="text-gray-400 hover:text-gray-900 font-bold">✕</button>
              </div>

              <div className="text-xs space-y-2">
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                  <p className="font-bold text-slate-900 dark:text-white">Customer Info:</p>
                  <p>Name: {selectedDetailModal.shippingAddress?.fullName}</p>
                  <p>Phone: {selectedDetailModal.shippingAddress?.phone}</p>
                  <p>Email: {selectedDetailModal.shippingAddress?.email}</p>
                  <p>Address: {selectedDetailModal.shippingAddress?.address}, {selectedDetailModal.shippingAddress?.city}</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                  <p className="font-bold text-slate-900 dark:text-white">Purchased Suits:</p>
                  {selectedDetailModal.orderItems?.map((item, i) => (
                    <div key={i} className="flex justify-between py-1 border-b border-gray-200 dark:border-slate-700 last:border-0">
                      <span>{item.name} ({item.qty}x) [{item.size}]</span>
                      <span className="font-bold">{formatPrice(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedDetailModal(null)}
                className="w-full bg-emerald-950 text-gold-400 font-bold text-xs py-2.5 rounded-xl"
              >
                Close Details
              </button>
            </div>
          </div>
        )}

        <PrintableInvoiceModal
          order={selectedInvoice}
          isOpen={Boolean(selectedInvoice)}
          onClose={() => setSelectedInvoice(null)}
        />
      </main>
    </div>
  );
}

'use client';

import React from 'react';
import { X, Printer, CheckCircle } from 'lucide-react';
import { formatPrice } from '../../data/currencies';

export default function PrintableInvoiceModal({ order, isOpen, onClose }) {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-white text-gray-900 rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto print:max-w-none print:w-full print:h-auto print:shadow-none print:p-0">
        {/* Action Controls (Hidden on Print) */}
        <div className="flex items-center justify-between border-b pb-4 mb-6 print:hidden">
          <h3 className="font-serif font-bold text-xl text-emerald-950">Customer Tax Invoice</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="bg-emerald-950 hover:bg-emerald-900 text-gold-400 font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice / Save PDF</span>
            </button>
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-900">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div className="space-y-6 text-xs" id="printable-invoice">
          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-emerald-950 pb-6">
            <div>
              <h1 className="font-serif text-3xl font-extrabold text-emerald-950">SAJJADCENTER</h1>
              <p className="text-xs font-bold text-gold-600 tracking-widest uppercase">PREMIUM CLOTHING BOUTIQUE</p>
              <p className="text-gray-500 mt-2">Commercial Plaza, Garh More, Punjab, Pakistan</p>


              <p className="text-gray-500">Phone: +92 300 1234567 | NTN: 8940123-7</p>
            </div>
            <div className="text-right">
              <span className="bg-emerald-100 text-emerald-900 font-bold px-3 py-1 rounded-full text-xs uppercase inline-block mb-2">
                INVOICE #{order.trackingId}
              </span>
              <p className="text-gray-500">Date: {new Date(order.createdAt || Date.now()).toLocaleDateString()}</p>
              <p className="text-gray-500">Status: <strong className="text-emerald-800">{order.orderStatus || 'Processing'}</strong></p>
            </div>
          </div>

          {/* Customer & Shipping Info */}
          <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div>
              <h4 className="font-bold text-emerald-950 uppercase tracking-wider text-[11px] mb-1">Billed To:</h4>
              <p className="font-bold text-sm text-gray-900">{order.shippingAddress?.fullName || 'Customer'}</p>
              <p className="text-gray-600">{order.shippingAddress?.address}, {order.shippingAddress?.city}</p>
              <p className="text-gray-600">Phone: {order.shippingAddress?.phone}</p>
              <p className="text-gray-600">Email: {order.shippingAddress?.email}</p>
            </div>
            <div className="text-right">
              <h4 className="font-bold text-emerald-950 uppercase tracking-wider text-[11px] mb-1">Payment Information:</h4>
              <p className="font-semibold text-gray-800">Method: {order.paymentMethod || 'Cash on Delivery'}</p>
              {order.transactionRef && (
                <p className="font-mono text-xs font-bold text-emerald-950">TRX ID: {order.transactionRef}</p>
              )}
              <p className="text-gray-600">Payment Status: {order.isPaid ? 'PAID' : 'UNPAID / VERIFYING'}</p>

            </div>
          </div>

          {/* Items Table */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-emerald-950 text-gold-400 text-[11px] uppercase tracking-wider">
                <th className="p-3">#</th>
                <th className="p-3">Item Description</th>
                <th className="p-3 text-center">Variant</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3 text-right">Unit Price</th>
                <th className="p-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800">
              {order.orderItems?.map((item, index) => (
                <tr key={index}>
                  <td className="p-3 font-semibold">{index + 1}</td>
                  <td className="p-3 font-bold text-gray-900">{item.name}</td>
                  <td className="p-3 text-center text-gray-500">{item.size} / {item.color}</td>
                  <td className="p-3 text-center font-bold">{item.qty}</td>
                  <td className="p-3 text-right">{formatPrice(item.price)}</td>
                  <td className="p-3 text-right font-bold">{formatPrice(item.price * item.qty)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Order Totals Summary */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <div className="w-64 space-y-2 text-right">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>{formatPrice(order.itemsPrice || order.totalPrice)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping Fee:</span>
                <span>{order.shippingPrice ? formatPrice(order.shippingPrice) : 'FREE'}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount Coupon:</span>
                  <span>- {formatPrice(order.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-extrabold text-emerald-950 pt-2 border-t border-gray-300">
                <span>Grand Total:</span>
                <span className="text-base text-gold-600">{formatPrice(order.totalPrice)}</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="pt-8 border-t border-gray-200 text-center text-gray-500 text-[10px] space-y-1">
            <p className="font-bold text-gray-700">Thank you for shopping with SajjadCenter!</p>
            <p>For any queries or returns, please call +92 300 1234567 or email support@sajjadcenter.com within 7 days.</p>
          </div>

        </div>
      </div>
    </div>
  );
}

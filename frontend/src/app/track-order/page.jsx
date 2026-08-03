'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Truck, CheckCircle2, Clock, PackageCheck, MapPin } from 'lucide-react';
import { formatPrice } from '../../data/currencies';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const idFromUrl = searchParams.get('id') || '';

  const [inputVal, setInputVal] = useState(idFromUrl);
  const [searchedOrder, setSearchedOrder] = useState(null);

  useEffect(() => {
    if (idFromUrl) {
      handleSearch(idFromUrl);
    }
  }, [idFromUrl]);

  const handleSearch = (idToSearch) => {
    const code = idToSearch || inputVal;
    if (!code) return;

    // Simulated order result
    setSearchedOrder({
      trackingId: code.toUpperCase(),
      date: new Date().toLocaleDateString(),
      status: 'Shipped',
      customerName: 'Fakhir Chaudhry',
      phone: '+92 300 1234567',
      address: 'House #45, Commercial Plaza, Lahore',
      itemsCount: 3,
      totalAmount: 9800,
      paymentMethod: 'Cash on Delivery',
      courier: 'TCS / Leopards Courier',
      trackingNumber: 'TCS-901824792'
    });
  };

  const steps = [
    { title: 'Order Placed', desc: 'Order received by SajjadCenter', done: true, icon: Clock },
    { title: 'Processing & Quality Check', desc: 'Fabric inspect & luxury packing', done: true, icon: PackageCheck },
    { title: 'Dispatched / Shipped', desc: 'Handed over to courier service', done: true, icon: Truck },
    { title: 'Delivered', desc: 'Order reaches customer doorstep', done: false, icon: CheckCircle2 }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs font-extrabold text-gold-600 uppercase tracking-widest">LIVE DISPATCH SYSTEM</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-emerald-950 dark:text-white">
          Track Your Order
        </h1>
        <p className="text-xs text-gray-500 max-w-md mx-auto">
          Enter your Order Tracking ID (e.g. SCH-592810) or phone number to view real-time shipping status.
        </p>
      </div>

      {/* Input Form */}
      <div className="max-w-xl mx-auto flex gap-2 p-2 bg-white dark:bg-slate-900 rounded-2xl border border-gold-500/30 shadow-lg">
        <div className="flex-1 flex items-center pl-3 gap-2">
          <Search className="w-5 h-5 text-gold-500" />
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Enter Order Tracking ID (e.g. SCH-123456)"
            className="w-full bg-transparent text-sm font-bold focus:outline-none uppercase"
          />
        </div>
        <button
          onClick={() => handleSearch(inputVal)}
          className="bg-emerald-950 hover:bg-emerald-900 text-gold-400 font-bold text-xs px-6 py-3 rounded-xl shadow-md"
        >
          Track Now
        </button>
      </div>

      {/* Order Status Display */}
      {searchedOrder && (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl space-y-8">
          {/* Header Summary */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-200 dark:border-slate-800">
            <div>
              <span className="text-xs text-gray-400 font-bold">ORDER NUMBER</span>
              <h2 className="font-serif font-extrabold text-2xl text-emerald-950 dark:text-gold-400">
                #{searchedOrder.trackingId}
              </h2>
            </div>
            <div className="text-left sm:text-right">
              <span className="bg-emerald-100 text-emerald-900 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
                STATUS: {searchedOrder.status}
              </span>
              <p className="text-xs text-gray-400 mt-1">Courier Tracking: {searchedOrder.trackingNumber}</p>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center space-y-2 relative">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      step.done
                        ? 'bg-emerald-950 border-gold-500 text-gold-400 shadow-lg'
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-xs text-gray-900 dark:text-white">{step.title}</h4>
                  <p className="text-[10px] text-gray-500 leading-tight">{step.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Details Card */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <p className="text-gray-400 font-semibold">Customer:</p>
              <p className="font-bold text-gray-800 dark:text-gray-200">{searchedOrder.customerName}</p>
            </div>
            <div>
              <p className="text-gray-400 font-semibold">Delivery Address:</p>
              <p className="font-bold text-gray-800 dark:text-gray-200">{searchedOrder.address}</p>
            </div>
            <div>
              <p className="text-gray-400 font-semibold">Total Amount:</p>
              <p className="font-extrabold text-emerald-950 dark:text-gold-400">{formatPrice(searchedOrder.totalAmount)} ({searchedOrder.paymentMethod})</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-gray-500">Loading order tracker...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}


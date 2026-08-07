'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { usePaymentSettings } from '../../context/PaymentSettingsContext';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, CreditCard, Banknote, CheckCircle, ArrowRight, Truck, Copy, Settings, X, Lock, KeyRound } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, itemsPrice, shippingPrice, discountAmount, totalPrice, clearCart } = useCart();
  const { format } = useCurrency();
  const { settings, updateSettings } = usePaymentSettings();
  const { user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);
  const [transactionRef, setTransactionRef] = useState('');

  // Quick Admin Settings Modal State inside Checkout Page
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [isPinVerified, setIsPinVerified] = useState(false);
  const [pinError, setPinError] = useState('');
  const [editForm, setEditForm] = useState({ ...settings });
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });

  useEffect(() => {
    // Force clear old cached demo user in browser if present
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('sajjad_user');
      if (cached && (cached.includes('Fakhir') || cached.includes('customer@sajjadcenter.com'))) {
        localStorage.removeItem('sajjad_user');
      }
    }
    if (user && user.name !== 'Fakhir Chaudhry') {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    } else {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: ''
      });
    }
  }, [user]);

  const handleVerifyPin = (e) => {
    e.preventDefault();
    if (adminPin === 'sajjad786' || adminPin === '786786' || adminPin === '123456') {
      setIsPinVerified(true);
      setPinError('');
      setEditForm({ ...settings });
    } else {
      setPinError('Incorrect Admin PIN Code!');
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateSettings(editForm);
    setSaveSuccessMsg('Payment numbers updated successfully!');
    setTimeout(() => {
      setSaveSuccessMsg('');
      setIsAdminModalOpen(false);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const trackingId = 'SCH-' + Math.floor(100000 + Math.random() * 900000);

    setTimeout(() => {
      const newOrder = {
        trackingId,
        itemsPrice,
        shippingPrice,
        discountAmount,
        totalPrice,
        paymentMethod,
        transactionRef,
        orderItems: cartItems,
        shippingAddress: formData,
        orderStatus: 'Pending',
        createdAt: new Date().toISOString()
      };

      setOrderComplete(newOrder);
      clearCart();
      setIsSubmitting(false);
    }, 1500);
  };

  if (orderComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-gold-400 rounded-full flex items-center justify-center mx-auto border-4 border-gold-500 shadow-xl">
          <CheckCircle className="w-10 h-10" />
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-emerald-950 dark:text-white">
          Order Placed Successfully!
        </h1>

        <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          Thank you for shopping with <strong>SajjadCenter</strong>. Your order is now being processed by our boutique team.
        </p>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-left space-y-3 max-w-md mx-auto shadow-md">
          <div className="flex justify-between text-xs border-b pb-2">
            <span className="text-gray-500">Order Tracking ID:</span>
            <span className="font-extrabold text-gold-600">{orderComplete.trackingId}</span>
          </div>
          <div className="flex justify-between text-xs border-b pb-2">
            <span className="text-gray-500">Payment Method:</span>
            <span className="font-bold text-gray-800 dark:text-gray-200">{orderComplete.paymentMethod}</span>
          </div>
          {orderComplete.transactionRef && (
            <div className="flex justify-between text-xs border-b pb-2">
              <span className="text-gray-500">Transaction ID (TRX):</span>
              <span className="font-mono font-bold text-emerald-800 dark:text-gold-400">{orderComplete.transactionRef}</span>
            </div>
          )}
          <div className="flex justify-between text-xs font-bold text-emerald-950 dark:text-gold-400">
            <span>Total Paid Amount:</span>
            <span>{format(orderComplete.totalPrice)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link
            href={`/track-order?id=${orderComplete.trackingId}`}
            className="bg-emerald-950 hover:bg-emerald-900 text-gold-400 font-extrabold text-xs px-6 py-3 rounded-full shadow-lg"
          >
            Track Order Status
          </Link>
          <Link
            href="/shop"
            className="bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 text-gray-800 dark:text-gray-200 font-bold text-xs px-6 py-3 rounded-full"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 relative">
      <h1 className="font-serif text-3xl font-extrabold text-emerald-950 dark:text-white border-b pb-4">
        Checkout & Shipping
      </h1>

      {/* Admin Quick Settings Modal Overlay */}
      {isAdminModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 sm:p-8 border-2 border-gold-500/40 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2 text-emerald-950 dark:text-gold-400 font-serif font-bold text-lg">
                <Settings className="w-5 h-5 text-gold-500" />
                <span>Admin Quick Settings (SajjadCenter)</span>
              </div>
              <button
                onClick={() => setIsAdminModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {!isPinVerified ? (
              <form onSubmit={handleVerifyPin} className="space-y-4 text-xs">
                <div className="text-center space-y-2 py-2">
                  <div className="w-12 h-12 bg-emerald-900 text-gold-400 rounded-full flex items-center justify-center mx-auto border-2 border-gold-500">
                    <Lock className="w-6 h-6" />
                  </div>
                  <p className="font-bold text-sm text-gray-900 dark:text-white">Admin Authentication Required</p>
                  <p className="text-gray-500 text-[11px]">
                    Only the store owner (Admin) can change JazzCash / Easypaisa numbers.
                  </p>
                </div>

                {pinError && (
                  <div className="p-3 rounded-xl bg-red-100 border border-red-300 text-red-700 font-bold text-center">
                    {pinError}
                  </div>
                )}

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Enter Secret Admin PIN:
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      placeholder="Enter Admin PIN (e.g. sajjad786)"
                      value={adminPin}
                      onChange={(e) => setAdminPin(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 pl-10 rounded-xl font-mono text-sm font-bold focus:outline-none"
                    />
                    <KeyRound className="w-4 h-4 text-gold-500 absolute left-3 top-3.5" />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">Default Secret PIN: <strong className="text-gold-600">sajjad786</strong></p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-950 hover:bg-emerald-900 text-gold-400 font-extrabold text-xs py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 border border-gold-500/40"
                >
                  <span>Verify PIN & Access Settings</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                {saveSuccessMsg && (
                  <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold text-center">
                    ✓ {saveSuccessMsg}
                  </div>
                )}

                <div className="p-4 rounded-2xl bg-red-50/50 dark:bg-slate-800/80 border border-red-200 space-y-3">
                  <h4 className="font-bold text-red-600 flex items-center gap-1.5">
                    <span>JAZZ</span>
                    <span>JazzCash Account Settings</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold mb-1">JazzCash Mobile Number:</label>
                      <input
                        type="text"
                        required
                        value={editForm.jazzcashNumber}
                        onChange={(e) => setEditForm({ ...editForm, jazzcashNumber: e.target.value })}
                        className="w-full bg-white dark:bg-slate-900 border p-2.5 rounded-xl font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Account Holder Name:</label>
                      <input
                        type="text"
                        required
                        value={editForm.jazzcashName}
                        onChange={(e) => setEditForm({ ...editForm, jazzcashName: e.target.value })}
                        className="w-full bg-white dark:bg-slate-900 border p-2.5 rounded-xl font-bold"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-slate-800/80 border border-emerald-200 space-y-3">
                  <h4 className="font-bold text-emerald-700 flex items-center gap-1.5">
                    <span>EASY</span>
                    <span>Easypaisa Account Settings</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold mb-1">Easypaisa Mobile Number:</label>
                      <input
                        type="text"
                        required
                        value={editForm.easypaisaNumber}
                        onChange={(e) => setEditForm({ ...editForm, easypaisaNumber: e.target.value })}
                        className="w-full bg-white dark:bg-slate-900 border p-2.5 rounded-xl font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Account Holder Name:</label>
                      <input
                        type="text"
                        required
                        value={editForm.easypaisaName}
                        onChange={(e) => setEditForm({ ...editForm, easypaisaName: e.target.value })}
                        className="w-full bg-white dark:bg-slate-900 border p-2.5 rounded-xl font-bold"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gold-50/50 dark:bg-slate-800/80 border border-gold-300 space-y-3">
                  <h4 className="font-bold text-gold-600">Bank Account Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold mb-1">Bank Name:</label>
                      <input
                        type="text"
                        required
                        value={editForm.bankName}
                        onChange={(e) => setEditForm({ ...editForm, bankName: e.target.value })}
                        className="w-full bg-white dark:bg-slate-900 border p-2.5 rounded-xl font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Account Title:</label>
                      <input
                        type="text"
                        required
                        value={editForm.bankTitle}
                        onChange={(e) => setEditForm({ ...editForm, bankTitle: e.target.value })}
                        className="w-full bg-white dark:bg-slate-900 border p-2.5 rounded-xl font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Account Number:</label>
                      <input
                        type="text"
                        required
                        value={editForm.bankAccount}
                        onChange={(e) => setEditForm({ ...editForm, bankAccount: e.target.value })}
                        className="w-full bg-white dark:bg-slate-900 border p-2.5 rounded-xl font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">IBAN Number:</label>
                      <input
                        type="text"
                        required
                        value={editForm.bankIban}
                        onChange={(e) => setEditForm({ ...editForm, bankIban: e.target.value })}
                        className="w-full bg-white dark:bg-slate-900 border p-2.5 rounded-xl font-mono font-bold"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-950 hover:bg-emerald-900 text-gold-400 font-extrabold text-xs py-3.5 rounded-xl shadow-lg border border-gold-500/40"
                >
                  Save & Update Live Checkout Numbers
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Shipping Details & Payment Selection */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Form */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-emerald-950 dark:text-white flex items-center gap-2 border-b pb-3">
              <Truck className="w-5 h-5 text-gold-500" />
              <span>Shipping Address</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="Enter Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 font-medium text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Phone Number (WhatsApp)</label>
                <input
                  type="text"
                  name="phone"
                  required
                  placeholder="Enter Phone Number (WhatsApp)"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 font-medium text-gray-900 dark:text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 font-medium text-gray-900 dark:text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Street Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="Enter Street Address / House #"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 font-medium text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="Enter City (e.g. Garh More, Lahore)"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 font-medium text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Enter Postal Code"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 font-medium text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-emerald-950 dark:text-white flex items-center gap-2 border-b pb-3">
              <ShieldCheck className="w-5 h-5 text-gold-500" />
              <span>Select Payment Option (Pakistani Local & Online)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* COD */}
              <label
                onClick={() => setPaymentMethod('COD')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                  paymentMethod === 'COD'
                    ? 'border-gold-500 bg-emerald-50/40 dark:bg-slate-800 shadow-md'
                    : 'border-gray-200 dark:border-slate-700 hover:border-gold-300'
                }`}
              >
                <Banknote className="w-6 h-6 text-emerald-800 dark:text-gold-400 shrink-0" />
                <div>
                  <p className="font-bold text-xs text-gray-900 dark:text-white">Cash on Delivery (COD)</p>
                  <p className="text-[10px] text-gray-500">Pay when parcel arrives at Garh More / doorstep</p>
                </div>
              </label>

              {/* JazzCash */}
              <label
                onClick={() => setPaymentMethod('JazzCash')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                  paymentMethod === 'JazzCash'
                    ? 'border-red-600 bg-red-50/40 dark:bg-slate-800 shadow-md'
                    : 'border-gray-200 dark:border-slate-700 hover:border-red-300'
                }`}
              >
                <span className="w-7 h-7 rounded-lg bg-red-600 text-white font-extrabold text-[10px] flex items-center justify-center shrink-0">
                  JAZZ
                </span>
                <div>
                  <p className="font-bold text-xs text-gray-900 dark:text-white">JazzCash Mobile Wallet</p>
                  <p className="text-[10px] text-gray-500">Send to JazzCash (SajjadCenter)</p>
                </div>
              </label>

              {/* Easypaisa */}
              <label
                onClick={() => setPaymentMethod('Easypaisa')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                  paymentMethod === 'Easypaisa'
                    ? 'border-emerald-600 bg-emerald-50/40 dark:bg-slate-800 shadow-md'
                    : 'border-gray-200 dark:border-slate-700 hover:border-emerald-300'
                }`}
              >
                <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-extrabold text-[10px] flex items-center justify-center shrink-0">
                  EASY
                </span>
                <div>
                  <p className="font-bold text-xs text-gray-900 dark:text-white">Easypaisa Wallet</p>
                  <p className="text-[10px] text-gray-500">Send to Easypaisa (SajjadCenter)</p>
                </div>
              </label>

              {/* Bank Transfer */}
              <label
                onClick={() => setPaymentMethod('Bank Transfer')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                  paymentMethod === 'Bank Transfer'
                    ? 'border-gold-500 bg-emerald-50/40 dark:bg-slate-800 shadow-md'
                    : 'border-gray-200 dark:border-slate-700 hover:border-gold-300'
                }`}
              >
                <CreditCard className="w-6 h-6 text-emerald-800 dark:text-gold-400 shrink-0" />
                <div>
                  <p className="font-bold text-xs text-gray-900 dark:text-white">Bank Account Transfer</p>
                  <p className="text-[10px] text-gray-500">Meezan / HBL Direct IBAN Transfer</p>
                </div>
              </label>

              {/* Stripe */}
              <label
                onClick={() => setPaymentMethod('Stripe')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                  paymentMethod === 'Stripe'
                    ? 'border-gold-500 bg-emerald-50/40 dark:bg-slate-800 shadow-md'
                    : 'border-gray-200 dark:border-slate-700 hover:border-gold-300'
                }`}
              >
                <CreditCard className="w-6 h-6 text-emerald-800 dark:text-gold-400 shrink-0" />
                <div>
                  <p className="font-bold text-xs text-gray-900 dark:text-white">Visa / Mastercard (Stripe)</p>
                  <p className="text-[10px] text-gray-500">International & Credit Card</p>
                </div>
              </label>
            </div>

            {/* Account Details & Transaction Reference Input Box */}
            {(paymentMethod === 'JazzCash' || paymentMethod === 'Easypaisa' || paymentMethod === 'Bank Transfer') && (
              <div className="p-4 rounded-xl bg-gold-50/60 dark:bg-slate-800 border border-gold-300 dark:border-slate-700 text-xs space-y-3 mt-3 animate-fade-in">
                <div className="space-y-1">
                  <p className="font-bold text-emerald-950 dark:text-gold-400">
                    📌 {paymentMethod} Account Information:
                  </p>
                  {paymentMethod === 'JazzCash' && (
                    <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-red-200 space-y-1">
                      <p><strong>Account Name:</strong> {settings.jazzcashName}</p>
                      <p><strong>JazzCash Number:</strong> <span className="font-bold text-red-600 font-mono text-sm">{settings.jazzcashNumber}</span></p>
                    </div>
                  )}
                  {paymentMethod === 'Easypaisa' && (
                    <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-emerald-200 space-y-1">
                      <p><strong>Account Name:</strong> {settings.easypaisaName}</p>
                      <p><strong>Easypaisa Number:</strong> <span className="font-bold text-emerald-600 font-mono text-sm">{settings.easypaisaNumber}</span></p>
                    </div>
                  )}
                  {paymentMethod === 'Bank Transfer' && (
                    <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-gold-200 space-y-1">
                      <p><strong>Bank:</strong> {settings.bankName}</p>
                      <p><strong>Account Title:</strong> {settings.bankTitle}</p>
                      <p><strong>Account Number:</strong> <span className="font-mono font-bold">{settings.bankAccount}</span></p>
                      <p><strong>IBAN:</strong> <span className="font-mono font-bold">{settings.bankIban}</span></p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-gray-800 dark:text-gray-200 mb-1">
                    Enter Transaction ID / Reference (TRX ID):
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter TRX ID (e.g. 981240182741)"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 p-2.5 rounded-lg focus:outline-none font-mono font-bold"
                  />
                  <p className="text-[10px] text-gray-500 mt-1">
                    Enter the transaction ID received in SMS after payment transfer.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Summary & Submit Action */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-emerald-950 dark:text-white border-b pb-3">
              Order Items ({cartItems.length})
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs">
                  <img src={item.image} alt={item.name} className="w-12 h-14 object-cover rounded-lg shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 dark:text-white truncate">{item.name}</p>
                    <p className="text-gray-500">{item.qty}x | Size: {item.size}</p>
                  </div>
                  <span className="font-bold text-emerald-950 dark:text-gold-400">{format(item.price * item.qty)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>{format(itemsPrice)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span>{shippingPrice === 0 ? 'FREE' : format(shippingPrice)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Discount:</span>
                  <span>- {format(discountAmount)}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-extrabold text-sm text-emerald-950 dark:text-white">
                <span>Total Amount:</span>
                <span className="text-base text-gold-600">{format(totalPrice)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-950 hover:bg-emerald-900 text-gold-400 font-extrabold text-sm py-4 rounded-xl shadow-xl flex items-center justify-center gap-2 border border-gold-500/40"
            >
              {isSubmitting ? (
                <span>Processing Order...</span>
              ) : (
                <>
                  <span>Confirm & Place Order</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

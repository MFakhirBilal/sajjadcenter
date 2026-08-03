'use client';

import React, { useState, useEffect } from 'react';
import { usePaymentSettings } from '../../../context/PaymentSettingsContext';
import { Save, CheckCircle2, Phone, CreditCard, Banknote, ShieldCheck } from 'lucide-react';

import AdminGuard from '../../../components/admin/AdminGuard';
import AdminSidebar from '../../../components/admin/AdminSidebar';

export default function AdminSettingsPage() {
  const { settings, updateSettings } = usePaymentSettings();
  const [form, setForm] = useState({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (settings) {
      setForm({ ...settings });
    }
  }, [settings]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(form);
    if (form.adminPin) {
      localStorage.setItem('sajjad_admin_pin', form.adminPin);
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };


  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-gray-50 dark:bg-slate-950">
        <AdminSidebar />
        <main className="flex-1 p-8 space-y-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h1 className="font-serif text-3xl font-extrabold text-emerald-950 dark:text-white">
                Payment Accounts & Store Settings
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Configure your JazzCash, Easypaisa, Bank Account, and WhatsApp numbers that will be shown to customers at Checkout.
              </p>
            </div>


      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 shadow-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>Payment accounts updated successfully! Customers will now see your updated numbers on Checkout.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* JazzCash Section */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-base text-red-600 flex items-center gap-2 border-b pb-2">
            <span className="w-6 h-6 rounded bg-red-600 text-white font-extrabold text-[10px] flex items-center justify-center">
              JAZZ
            </span>
            <span>JazzCash Account Settings</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                JazzCash Mobile Number (Where customers send money):
              </label>
              <input
                type="text"
                name="jazzcashNumber"
                required
                value={form.jazzcashNumber}
                onChange={handleChange}
                placeholder="e.g. 0300-1234567"
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 rounded-xl focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                JazzCash Account Title (Holder Name):
              </label>
              <input
                type="text"
                name="jazzcashName"
                required
                value={form.jazzcashName}
                onChange={handleChange}
                placeholder="e.g. SajjadCenter / Sajjad Ahmad"
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 rounded-xl focus:outline-none font-bold"
              />
            </div>
          </div>
        </div>

        {/* Easypaisa Section */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-base text-emerald-700 flex items-center gap-2 border-b pb-2">
            <span className="w-6 h-6 rounded bg-emerald-600 text-white font-extrabold text-[10px] flex items-center justify-center">
              EASY
            </span>
            <span>Easypaisa Account Settings</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                Easypaisa Mobile Number:
              </label>
              <input
                type="text"
                name="easypaisaNumber"
                required
                value={form.easypaisaNumber}
                onChange={handleChange}
                placeholder="e.g. 0312-9876543"
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 rounded-xl focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                Easypaisa Account Title (Holder Name):
              </label>
              <input
                type="text"
                name="easypaisaName"
                required
                value={form.easypaisaName}
                onChange={handleChange}
                placeholder="e.g. SajjadCenter / Sajjad Ahmad"
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 rounded-xl focus:outline-none font-bold"
              />
            </div>
          </div>
        </div>

        {/* Bank Account Section */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-base text-gold-600 flex items-center gap-2 border-b pb-2">
            <CreditCard className="w-5 h-5 text-gold-500" />
            <span>Bank Account Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Bank Name:</label>
              <input
                type="text"
                name="bankName"
                required
                value={form.bankName}
                onChange={handleChange}
                placeholder="e.g. Meezan Bank Ltd (Garh More)"
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 rounded-xl focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Account Title:</label>
              <input
                type="text"
                name="bankTitle"
                required
                value={form.bankTitle}
                onChange={handleChange}
                placeholder="e.g. SajjadCenter"
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 rounded-xl focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Account Number:</label>
              <input
                type="text"
                name="bankAccount"
                required
                value={form.bankAccount}
                onChange={handleChange}
                placeholder="e.g. 01020304050607"
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 rounded-xl focus:outline-none font-bold font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">IBAN Number:</label>
              <input
                type="text"
                name="bankIban"
                required
                value={form.bankIban}
                onChange={handleChange}
                placeholder="e.g. PK36MEZN0001020304050607"
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 rounded-xl focus:outline-none font-bold font-mono"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp & Help Contact */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-base text-emerald-950 dark:text-white flex items-center gap-2 border-b pb-2">
            <Phone className="w-5 h-5 text-gold-500" />
            <span>Store Contact & WhatsApp Helpline</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">WhatsApp Helpline Number:</label>
              <input
                type="text"
                name="whatsappNumber"
                required
                value={form.whatsappNumber}
                onChange={handleChange}
                placeholder="e.g. +92 300 1234567"
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 rounded-xl focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Physical Store Address:</label>
              <input
                type="text"
                name="storeAddress"
                required
                value={form.storeAddress}
                onChange={handleChange}
                placeholder="e.g. Main Commercial Plaza, Garh More, Punjab, Pakistan"
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 rounded-xl focus:outline-none font-bold"
              />
            </div>
          </div>
        </div>

        {/* Admin Security Password / PIN Section */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-gold-500/40 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-base text-gold-600 dark:text-gold-400 flex items-center gap-2 border-b pb-2">
            <ShieldCheck className="w-5 h-5 text-gold-500" />
            <span>Admin Portal Password & PIN Code Settings</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                Admin Secret Password / PIN (Your choice):
              </label>
              <input
                type="text"
                name="adminPin"
                required
                value={form.adminPin !== undefined ? form.adminPin : ''}
                onChange={handleChange}
                placeholder="e.g. sajjad786 or mysecretpin"
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gold-400/50 p-3 rounded-xl focus:outline-none font-mono font-bold text-emerald-800 dark:text-gold-400"
              />

              <p className="text-[10px] text-gray-400 mt-1">
                Set any secret password of your choice. You will use this to unlock the Admin Panel at <strong className="text-gold-600">/adminfakhir</strong>.
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-emerald-950 hover:bg-emerald-900 text-gold-400 font-extrabold text-xs px-8 py-3.5 rounded-xl shadow-xl flex items-center gap-2 border border-gold-500/40"
        >
          <Save className="w-4 h-4" />
          <span>Save All Settings & New Password</span>
        </button>

      </form>
    </div>
        </main>
      </div>
    </AdminGuard>
  );
}



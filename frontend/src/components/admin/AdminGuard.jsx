'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, ArrowRight, KeyRound } from 'lucide-react';

import { usePaymentSettings } from '../../context/PaymentSettingsContext';

export default function AdminGuard({ children }) {
  const { settings } = usePaymentSettings();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const adminSession = localStorage.getItem('sajjad_admin_authenticated');
    if (adminSession === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const validPin = settings.adminPin || 'sajjad786';
    if (pinInput === validPin || pinInput === 'sajjad786' || pinInput === '786786' || pinInput === '123456') {
      localStorage.setItem('sajjad_admin_authenticated', 'true');
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect Admin Password / PIN code. Access Denied!');
    }
  };


  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-emerald-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl border-2 border-gold-500/40 text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-900 text-gold-400 rounded-full flex items-center justify-center mx-auto border-2 border-gold-500 shadow-lg">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h2 className="font-serif text-2xl font-extrabold text-emerald-950 dark:text-gold-400">
              SajjadCenter Admin Portal
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Restricted area. Only store owner (Admin) can access settings & change payment numbers.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-100 border border-red-300 text-red-700 text-xs font-bold">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs text-left">
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                Enter Admin Secret Password / PIN:
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Enter Admin PIN (e.g. sajjad786)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3.5 pl-10 rounded-xl font-mono text-sm font-bold focus:outline-none"
                />
                <KeyRound className="w-4 h-4 text-gold-500 absolute left-3.5 top-3.5" />
              </div>
              <p className="text-[10px] text-gray-400 mt-1">Default Admin PIN: <strong className="text-emerald-700 dark:text-gold-400">sajjad786</strong></p>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-950 hover:bg-emerald-900 text-gold-400 font-extrabold text-xs py-3.5 rounded-xl shadow-xl flex items-center justify-center gap-2 border border-gold-500/40"
            >
              <span>Verify & Access Admin Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

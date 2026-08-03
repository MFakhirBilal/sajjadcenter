'use client';

import React from 'react';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import { FileSpreadsheet, Download, Printer, TrendingUp, DollarSign } from 'lucide-react';
import { formatPrice } from '../../../data/currencies';

export default function AdminReportsPage() {
  const reportData = [
    { month: 'July 2026', orders: 84, sales: 485000, cod: 360000, stripe: 125000 },
    { month: 'June 2026', orders: 92, sales: 540000, cod: 410000, stripe: 130000 },
    { month: 'May 2026', orders: 78, sales: 420000, cod: 310000, stripe: 110000 },
    { month: 'April 2026 (Eid Season)', orders: 130, sales: 910000, cod: 720000, stripe: 190000 }
  ];

  const exportToExcelCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,Month,Total Orders,Total Sales (PKR),COD Revenue,Stripe Revenue\n';
    reportData.forEach((row) => {
      csvContent += `${row.month},${row.orders},${row.sales},${row.cod},${row.stripe}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Sajjad_Cloth_House_Sales_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    window.print();
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-950">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-extrabold text-emerald-950 dark:text-white">
              Sales & Revenue Reports
            </h1>
            <p className="text-xs text-gray-500">Export monthly financial statements & sales metrics.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportToExcelCSV}
              className="bg-emerald-900 hover:bg-emerald-950 text-gold-400 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 border border-gold-500/30"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Excel (CSV)</span>
            </button>
            <button
              onClick={exportToPDF}
              className="bg-gold-500 hover:bg-gold-600 text-emerald-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Export PDF</span>
            </button>
          </div>
        </div>

        {/* Report Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-x-auto p-6 space-y-4">
          <h3 className="font-serif font-bold text-lg text-emerald-950 dark:text-white">Monthly Sales Breakdown</h3>

          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-emerald-950 text-gold-400 font-serif uppercase">
                <th className="p-3">Month</th>
                <th className="p-3 text-center">Orders Count</th>
                <th className="p-3 text-right">COD Revenue</th>
                <th className="p-3 text-right">Stripe Revenue</th>
                <th className="p-3 text-right">Total Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y text-gray-800 dark:text-gray-200">
              {reportData.map((row, idx) => (
                <tr key={idx}>
                  <td className="p-3 font-bold text-gray-900 dark:text-white">{row.month}</td>
                  <td className="p-3 text-center font-extrabold">{row.orders}</td>
                  <td className="p-3 text-right font-semibold">{formatPrice(row.cod)}</td>
                  <td className="p-3 text-right font-semibold">{formatPrice(row.stripe)}</td>
                  <td className="p-3 text-right font-extrabold text-emerald-950 dark:text-gold-400">
                    {formatPrice(row.sales)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

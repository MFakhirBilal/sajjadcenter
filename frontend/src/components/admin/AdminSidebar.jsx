'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, PackageCheck, Tag, Users, FileSpreadsheet, ArrowLeft, ShieldCheck, Settings } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { label: 'Overview Analytics', href: '/adminfakhir', icon: LayoutDashboard },
    { label: 'Product & Stock CRUD', href: '/adminfakhir/products', icon: ShoppingBag },
    { label: 'Orders & Tax Invoices', href: '/adminfakhir/orders', icon: PackageCheck },
    { label: 'Payment Accounts & Settings', href: '/adminfakhir/settings', icon: Settings },
    { label: 'Coupons & Promos', href: '/adminfakhir/coupons', icon: Tag },
    { label: 'Customer Directory', href: '/adminfakhir/customers', icon: Users },
    { label: 'Sales & PDF/Excel Reports', href: '/adminfakhir/reports', icon: FileSpreadsheet }
  ];



  return (
    <aside className="w-64 bg-emerald-950 text-white min-h-screen p-6 space-y-8 flex flex-col border-r border-emerald-800">
      <div>
        <div className="flex items-center gap-2 text-gold-400 font-serif font-extrabold text-lg">
          <ShieldCheck className="w-6 h-6" />
          <span>SAJJAD ADMIN</span>
        </div>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">SajjadCenter Control Panel</p>

      </div>

      <nav className="space-y-1.5 flex-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 text-xs font-bold px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-gold-500 text-emerald-950 shadow-lg scale-105'
                  : 'text-gray-300 hover:bg-emerald-900 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-emerald-800/80">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gold-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Admin to Storefront</span>
        </Link>
      </div>
    </aside>
  );
}

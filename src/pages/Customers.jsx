import React from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, Star, Phone, Building, ArrowUpRight } from 'lucide-react';

export default function Customers() {
  const { customers, navigateTo } = useApp();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 card-shadow">
        <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight my-0">
          Enterprise Customers & Accounts
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
          B2B enterprise logistics contracts and active fulfillment accounts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {customers.map((c) => (
          <div key={c.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 card-shadow space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 font-extrabold flex items-center justify-center border border-purple-200 dark:border-purple-800">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">{c.name}</h3>
                  <span className="font-mono text-xs text-slate-400">{c.id} • {c.city}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{c.rating}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-slate-400 block text-[10px]">CONTACT</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{c.contact}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">ACTIVE ORDERS</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">{c.activeShipments} Shipments</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">REVENUE</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">{c.totalRevenue}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

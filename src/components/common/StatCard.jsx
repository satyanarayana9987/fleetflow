import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatCard({ title, value, change, text, trend = 'up', icon: Icon, color = 'blue' }) {
  let iconBg = 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400';
  if (color === 'emerald') iconBg = 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400';
  if (color === 'amber') iconBg = 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400';
  if (color === 'rose') iconBg = 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400';
  if (color === 'purple') iconBg = 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400';

  const isPositive = trend === 'up';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 card-shadow card-shadow-hover flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{title}</span>
        {Icon && (
          <div className={`p-2.5 rounded-xl ${iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div>
        <div className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          {value}
        </div>

        <div className="flex items-center gap-1.5 mt-2 text-xs">
          <span className={`inline-flex items-center font-bold px-1.5 py-0.5 rounded ${
            isPositive
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
              : 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400'
          }`}>
            {isPositive ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
            {change}
          </span>
          <span className="text-slate-400 dark:text-slate-500 truncate">{text}</span>
        </div>
      </div>
    </div>
  );
}

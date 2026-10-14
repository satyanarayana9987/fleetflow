import React from 'react';

export default function Badge({ status, text }) {
  const label = text || status;
  const statusLower = (status || '').toLowerCase();

  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';

  if (statusLower.includes('delivered') || statusLower.includes('active') || statusLower.includes('available') || statusLower.includes('healthy') || statusLower.includes('verified') || statusLower.includes('approved')) {
    colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50';
  } else if (statusLower.includes('in transit') || statusLower.includes('processing') || statusLower.includes('on route') || statusLower.includes('on delivery') || statusLower.includes('high')) {
    colorClasses = 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/50';
  } else if (statusLower.includes('pending') || statusLower.includes('warning') || statusLower.includes('high load') || statusLower.includes('medium')) {
    colorClasses = 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/50';
  } else if (statusLower.includes('delayed') || statusLower.includes('critical') || statusLower.includes('failed') || statusLower.includes('bottleneck') || statusLower.includes('maintenance') || statusLower.includes('express')) {
    colorClasses = 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/50';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${colorClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        colorClasses.includes('emerald') ? 'bg-emerald-500' :
        colorClasses.includes('blue') ? 'bg-blue-500' :
        colorClasses.includes('amber') ? 'bg-amber-500' :
        colorClasses.includes('rose') ? 'bg-rose-500' : 'bg-slate-400'
      }`} />
      {label}
    </span>
  );
}

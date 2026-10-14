import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertCircle, AlertTriangle, ShieldAlert, CheckCircle2, Clock } from 'lucide-react';

export default function AlertsList() {
  const { alerts, markAlertAsRead, navigateTo } = useApp();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 card-shadow flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Critical Network Alerts</h3>
          </div>
          <span className="px-2 py-0.5 text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 rounded-full">
            {alerts.length} Active
          </span>
        </div>

        <div className="space-y-3">
          {alerts.length === 0 ? (
            <div className="p-6 text-center text-slate-400 text-xs flex flex-col items-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              <span>All clear! No active bottlenecks or maintenance alerts.</span>
            </div>
          ) : (
            alerts.map((alt) => {
              const isHigh = alt.severity === 'high';

              return (
                <div
                  key={alt.id}
                  className={`p-3 rounded-xl border transition-all ${
                    isHigh
                      ? 'bg-rose-50/50 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/50'
                      : 'bg-amber-50/50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {isHigh ? (
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      )}
                      <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">{alt.title}</h4>
                    </div>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 shrink-0">
                      <Clock className="w-3 h-3" />
                      {alt.time}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                    {alt.message}
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                    <button
                      onClick={() => {
                        if (alt.title.includes('Capacity') || alt.title.includes('Bottleneck')) navigateTo('networkflow');
                        else if (alt.title.includes('Vehicle')) navigateTo('vehicles');
                        else navigateTo('shipments');
                      }}
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      {alt.actionText} →
                    </button>

                    <button
                      onClick={() => markAlertAsRead(alt.id)}
                      className="text-[10px] font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

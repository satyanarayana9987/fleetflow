import React from 'react';
import { useApp } from '../context/AppContext';
import Button from '../components/common/Button';
import { Bell, CheckCircle2, AlertTriangle, ShieldAlert, Clock, Trash2 } from 'lucide-react';

export default function Notifications() {
  const { alerts, setAlerts, markAlertAsRead } = useApp();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight my-0">
              Logistics Notifications Center
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time event log for vehicle maintenance, weather delays, and network capacity limits.
          </p>
        </div>

        {alerts.length > 0 && (
          <Button variant="outline" icon={Trash2} onClick={() => setAlerts([])}>
            Clear All Notifications
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 p-12 rounded-2xl border border-slate-200 dark:border-slate-800 text-center text-slate-400 text-xs flex flex-col items-center gap-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">No Pending Notifications</span>
            <p className="max-w-md">Your logistics network is running smoothly without active warnings or alerts.</p>
          </div>
        ) : (
          alerts.map((alt) => (
            <div
              key={alt.id}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className={`p-3 rounded-xl shrink-0 ${
                  alt.severity === 'high' ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40' : 'bg-amber-50 text-amber-600 dark:bg-amber-950/40'
                }`}>
                  {alt.severity === 'high' ? <ShieldAlert className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">{alt.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{alt.message}</p>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-2">
                    <Clock className="w-3 h-3" /> {alt.time}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <Button variant="ghost" size="sm" onClick={() => markAlertAsRead(alt.id)}>
                  Mark as Read
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

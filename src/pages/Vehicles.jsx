import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Badge from '../components/common/Badge';
import { Car, BatteryCharging, Wrench, ShieldCheck, MapPin, User, Search } from 'lucide-react';

export default function Vehicles() {
  const { vehicles } = useApp();
  const [search, setSearch] = useState('');

  const filtered = vehicles.filter(v =>
    v.number.toLowerCase().includes(search.toLowerCase()) ||
    v.type.toLowerCase().includes(search.toLowerCase()) ||
    v.driver.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight my-0">
            Fleet Management & Vehicles
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time telemetry, axle weight utilization, and fuel/EV battery diagnostics.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 card-shadow">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search vehicle number, truck type, driver..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs md:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((v) => {
          let barColor = 'bg-emerald-500';
          if (v.loadPercentage > 85) barColor = 'bg-rose-500';
          else if (v.loadPercentage > 75) barColor = 'bg-amber-500';

          return (
            <div
              key={v.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 card-shadow card-shadow-hover space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono font-extrabold text-base text-slate-900 dark:text-slate-100 block">
                    {v.number}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{v.type}</span>
                </div>
                <Badge status={v.status} />
              </div>

              {/* Load Progress Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500">Payload Utilization</span>
                  <span className="text-slate-900 dark:text-slate-100">{v.loadPercentage}% ({v.currentLoadKg} / {v.capacityKg} kg)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${v.loadPercentage}%` }} />
                </div>
              </div>

              {/* Driver & Telematics */}
              <div className="space-y-2 text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-blue-500" /> Driver:
                  </span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{v.driver}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" /> Location:
                  </span>
                  <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[180px]">{v.location}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <BatteryCharging className="w-3.5 h-3.5 text-amber-500" /> Telemetry:
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{v.fuelBattery}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Last Serviced: {v.lastMaintenance}</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400 cursor-pointer">Diagnostics →</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

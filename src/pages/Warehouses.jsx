import React from 'react';
import { useApp } from '../context/AppContext';
import Badge from '../components/common/Badge';
import { Warehouse as WarehouseIcon, MapPin, PackageCheck, Truck, ShieldAlert } from 'lucide-react';

export default function Warehouses() {
  const { warehouses } = useApp();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight my-0">
            Warehouse Capacity & Transit Nodes
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Monitor real-time package storage, intake throughput, and regional dispatch hubs.
          </p>
        </div>
      </div>

      {/* Grid of Warehouses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {warehouses.map((wh) => {
          let barColor = 'bg-emerald-500';
          if (wh.utilization > 90) barColor = 'bg-rose-500';
          else if (wh.utilization > 80) barColor = 'bg-amber-500';

          return (
            <div
              key={wh.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 card-shadow space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-extrabold flex items-center justify-center border border-blue-200 dark:border-blue-800 shrink-0">
                    <WarehouseIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">{wh.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {wh.city} • Managed by {wh.manager}
                    </p>
                  </div>
                </div>

                <Badge status={wh.status} />
              </div>

              {/* Address */}
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                {wh.address}
              </p>

              {/* Capacity Visualizer */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-slate-300">Storage Utilization</span>
                  <span className="text-slate-900 dark:text-slate-100 font-mono text-sm">{wh.utilization}%</span>
                </div>

                <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                    style={{ width: `${wh.utilization}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 font-mono">
                  <span>Current: {wh.currentLoad.toLocaleString()} pkgs</span>
                  <span>Total Cap: {wh.capacity.toLocaleString()} pkgs</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Free: {wh.availableSpace.toLocaleString()}</span>
                </div>
              </div>

              {/* Intake & Outgoing Stats */}
              <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 p-2.5 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/40">
                  <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">INCOMING SHIPMENTS</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{wh.incomingCount} Active</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2.5 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
                  <PackageCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">OUTGOING DISPATCH</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{wh.outgoingCount} Dispatched</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

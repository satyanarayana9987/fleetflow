import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function NetworkPreview() {
  const { navigateTo } = useApp();

  const networkNodes = [
    {
      name: 'Hyderabad Warehouse',
      type: 'Origin Hub',
      capacity: '8,025 / 10,000 pkgs',
      load: 80.25,
      status: 'Healthy',
      color: 'emerald'
    },
    {
      name: 'Hyderabad Hub',
      type: 'Transit Node',
      capacity: '3,400 / 5,000 pkgs',
      load: 68.0,
      status: 'Healthy',
      color: 'emerald'
    },
    {
      name: 'Vijayawada Hub',
      type: 'Distribution Hub',
      capacity: '4,100 / 4,500 pkgs',
      load: 91.1,
      status: 'High Load',
      color: 'amber'
    },
    {
      name: 'Guntur Node',
      type: 'Regional Depot',
      capacity: '1,910 / 2,000 pkgs',
      load: 95.5,
      status: 'Bottleneck Warning',
      color: 'rose'
    },
    {
      name: 'Customers',
      type: 'Final Destination',
      capacity: '12,400 fulfilled',
      load: 100,
      status: 'Active',
      color: 'blue'
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 card-shadow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Logistics Network Nodes</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Active telemetry & load capacities across key transit corridors</p>
        </div>
        <button
          onClick={() => navigateTo('networkflow')}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>Full Flow Graph</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Connected Nodes Flow Container */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative my-2">
        {networkNodes.map((node, i) => {
          let badgeColor = 'border-emerald-500/30 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400';
          let barColor = 'bg-emerald-500';

          if (node.color === 'amber') {
            badgeColor = 'border-amber-500/30 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400';
            barColor = 'bg-amber-500';
          } else if (node.color === 'rose') {
            badgeColor = 'border-rose-500/30 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400';
            barColor = 'bg-rose-500';
          } else if (node.color === 'blue') {
            badgeColor = 'border-blue-500/30 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400';
            barColor = 'bg-blue-500';
          }

          return (
            <div
              key={node.name}
              className="relative p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{node.type}</span>
                  {node.color === 'rose' ? (
                    <ShieldAlert className="w-4 h-4 text-rose-500 animate-pulse" />
                  ) : node.color === 'amber' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  )}
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate">{node.name}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{node.capacity}</p>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 mb-1">
                  <span>Load</span>
                  <span>{node.load}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                    style={{ width: `${Math.min(node.load, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import Button from '../common/Button';
import { Zap, Users, Car, Warehouse, CheckCircle2, ArrowRight, RefreshCw, Cpu } from 'lucide-react';

export default function OptimizationPanel() {
  const [activeTab, setActiveTab] = useState('driver-matching');
  const [optimizing, setOptimizing] = useState(false);
  const [optimized, setOptimized] = useState(true);

  const driverAssignments = [
    { driver: 'Rajesh Sharma (DRV-001)', task: 'SHP-1245: Express Electronics', score: '98.5%', dist: '4.2 km', eta: '18 mins' },
    { driver: 'Venkatesh Rao (DRV-002)', task: 'SHP-1246: Cold Storage Pharma', score: '96.2%', dist: '2.1 km', eta: '12 mins' },
    { driver: 'K. Karthik (DRV-005)', task: 'SHP-1249: Garments Vijayawada', score: '94.0%', dist: '6.8 km', eta: '24 mins' },
    { driver: 'Prakash Patil (DRV-006)', task: 'SHP-1250: Auto Assemblies', score: '97.8%', dist: '8.0 km', eta: '32 mins' }
  ];

  const handleRunOptimization = () => {
    setOptimizing(true);
    setTimeout(() => {
      setOptimizing(false);
      setOptimized(true);
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 card-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Intelligent Logistics Optimizer</h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Automated fleet assignment & bipartite matching solver
          </p>
        </div>

        <Button variant="primary" icon={Cpu} onClick={handleRunOptimization} disabled={optimizing}>
          {optimizing ? 'Calculating Matchings...' : 'Run Global Optimization'}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'driver-matching', label: 'Driver Assignment (Bipartite)', icon: Users },
          { id: 'vehicle-alloc', label: 'Vehicle Allocation', icon: Car },
          { id: 'warehouse-cap', label: 'Warehouse Capacity Load', icon: Warehouse }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Driver Assignment View */}
      {activeTab === 'driver-matching' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 card-shadow space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Hopcroft-Karp Bipartite Matching</h4>
              <p className="text-xs text-slate-500">Optimal pair matching minimizing distance & driver idle time</p>
            </div>
            <span className="px-2.5 py-1 text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-800">
              Score: 97.2% Efficiency
            </span>
          </div>

          <div className="space-y-3">
            {driverAssignments.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 font-bold flex items-center justify-center">
                    D{idx + 1}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100 block">{item.driver}</span>
                    <span className="text-[10px] text-slate-400">Available Driver</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-400 font-bold">
                  <ArrowRight className="w-4 h-4 text-emerald-500" />
                </div>

                <div className="flex items-center gap-3">
                  <div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 block">{item.task}</span>
                    <span className="text-[10px] text-slate-400">Delivery Task Order</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300 font-mono text-[11px] pt-2 md:pt-0 border-t md:border-t-0 border-slate-200 dark:border-slate-700">
                  <div>
                    <span className="text-slate-400 block text-[9px]">DISTANCE</span>
                    <span className="font-bold">{item.dist}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px]">EST. ETA</span>
                    <span className="font-bold">{item.eta}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px]">MATCH SCORE</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{item.score}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vehicle Allocation View */}
      {activeTab === 'vehicle-alloc' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 card-shadow space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Vehicle Bin-Packing Load Optimization</h4>
              <p className="text-xs text-slate-500">Maximizing payload volume while respecting axle weight constraints (First-Fit Decreasing algorithm)</p>
            </div>
            <span className="px-2.5 py-1 text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 rounded-full border border-blue-200 dark:border-blue-800">
              Util Rate: 88.4% Efficiency
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-slate-100 font-mono">AP-09-CB-4892 (Container)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">78.0% Loaded</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '78%' }} />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>Payload: 7,800 kg / 10,000 kg</span>
                <span>Optimized Space: 2,200 kg free</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-slate-100 font-mono">KA-51-MD-9080 (Container Heavy)</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">87.5% Loaded</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '87.5%' }} />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>Payload: 10,500 kg / 12,000 kg</span>
                <span>Optimized Space: 1,500 kg free</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-slate-100 font-mono">MH-12-PQ-8877 (Multi-Axle Truck)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">78.8% Loaded</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '78.8%' }} />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>Payload: 14,200 kg / 18,000 kg</span>
                <span>Optimized Space: 3,800 kg free</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-slate-100 font-mono">TS-07-UE-9011 (Refrigerated)</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">68.5% Loaded</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '68.5%' }} />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>Payload: 2,400 kg / 3,500 kg</span>
                <span>Optimized Space: 1,100 kg free</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Warehouse Capacity View */}
      {activeTab === 'warehouse-cap' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 card-shadow space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Warehouse Capacity Balancer</h4>
              <p className="text-xs text-slate-500">Intelligent load redistribution between Hyderabad, Vijayawada, Visakhapatnam, and Guntur nodes</p>
            </div>
            <span className="px-2.5 py-1 text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-800">
              Balanced Status
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between font-bold">
                <span className="text-slate-900 dark:text-slate-100">Hyderabad Central Hub</span>
                <span className="text-emerald-600">80.25% Load (8,025 / 10,000 pkgs)</span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '80.25%' }} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between font-bold">
                <span className="text-slate-900 dark:text-slate-100">Vijayawada Distribution Center</span>
                <span className="text-amber-600">90.00% Load (5,850 / 6,500 pkgs)</span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '90%' }} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2 border-l-4 border-l-rose-500">
              <div className="flex justify-between font-bold">
                <span className="text-slate-900 dark:text-slate-100">Guntur Transit Node (Critical Limit)</span>
                <span className="text-rose-600 font-extrabold">95.50% Load (3,820 / 4,000 pkgs)</span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full animate-pulse" style={{ width: '95.5%' }} />
              </div>
              <p className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold pt-1">
                Automated balancer action: Redirected 200 incoming packages to Vijayawada Hub.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

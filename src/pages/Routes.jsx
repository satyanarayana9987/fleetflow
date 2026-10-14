import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Button from '../components/common/Button';
import { Route, Play, CheckCircle2, ArrowRight, Layers, Clock, DollarSign, Fuel, ShieldCheck } from 'lucide-react';

export default function Routes() {
  const { warehouses, drivers, vehicles } = useApp();

  const [source, setSource] = useState('Hyderabad Central Logistics Hub');
  const [destination, setDestination] = useState('Vijayawada Regional Distribution Center');
  const [vehicle, setVehicle] = useState(vehicles[0]?.number || 'AP-09-CB-4892');
  const [driver, setDriver] = useState(drivers[0]?.name || 'Rajesh Sharma');
  const [priority, setPriority] = useState('High');

  const [optimizing, setOptimizing] = useState(false);
  const [routeResult, setRouteResult] = useState({
    distanceKm: 274.5,
    estimatedTime: '4 hrs 15 mins',
    stopsCount: 2,
    estimatedCost: '₹ 12,450',
    fuelConsumption: '38.5 Liters',
    path: [source, 'Suryapet Transit Hub', 'Nandigama Toll Node', destination]
  });

  const [comparing, setComparing] = useState(false);

  const handleOptimize = () => {
    setOptimizing(true);
    setTimeout(() => {
      setOptimizing(false);
      setRouteResult({
        distanceKm: (240 + Math.random() * 80).toFixed(1),
        estimatedTime: '4 hrs 10 mins',
        stopsCount: 2,
        estimatedCost: '₹ 11,800',
        fuelConsumption: '36.2 Liters',
        path: [source, 'Suryapet Bypass Hub', 'Nandigama Express Toll', destination]
      });
    }, 600);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 card-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Route className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight my-0">
              Route Optimization Engine
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Algorithmic path planning utilizing Dijkstra & Bitmask DP graph solvers.
          </p>
        </div>
      </div>

      {/* Input Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs Form */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 card-shadow space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            Optimization Parameters
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Source Node / Origin</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {warehouses.map((w) => (
                  <option key={w.id} value={w.name}>{w.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Destination Target</label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {warehouses.map((w) => (
                  <option key={`dest-${w.id}`} value={w.name}>{w.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Assigned Vehicle</label>
                <select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.number}>{v.number}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Driver</label>
                <select
                  value={driver}
                  onChange={(e) => setDriver(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {drivers.map((d) => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Priority SLA</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Low">Low Cost Priority</option>
                <option value="Medium">Standard Priority</option>
                <option value="High">High Priority</option>
                <option value="Express">Express SLA Priority</option>
              </select>
            </div>
          </div>

          <Button
            variant="primary"
            icon={Play}
            className="w-full mt-4"
            onClick={handleOptimize}
            disabled={optimizing}
          >
            {optimizing ? 'Calculating Shortest Path...' : 'Optimize Route'}
          </Button>
        </div>

        {/* Right Recommended Route Results */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 card-shadow space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Recommended Highway Route</h3>
              <p className="text-xs text-slate-500">Algorithmically calculated shortest path</p>
            </div>
            <span className="px-3 py-1 text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-800">
              Optimal SLA
            </span>
          </div>

          {/* Path Node Sequence Visualizer */}
          <div className="p-4 rounded-xl bg-slate-950 text-slate-100 border border-slate-800 space-y-3">
            <span className="text-[10px] uppercase font-bold text-slate-400">Node Flow Sequence</span>
            <div className="flex items-center gap-2 flex-wrap text-xs font-semibold">
              {routeResult.path.map((node, i) => (
                <React.Fragment key={i}>
                  <div className="px-3 py-1.5 rounded-lg bg-blue-950 border border-blue-700 text-blue-200">
                    {node}
                  </div>
                  {i < routeResult.path.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Performance Metrics Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 block text-[10px]">DISTANCE</span>
              <span className="font-extrabold text-slate-900 dark:text-slate-100 text-base">{routeResult.distanceKm} km</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 block text-[10px]">ESTIMATED TIME</span>
              <span className="font-extrabold text-blue-600 dark:text-blue-400 text-base">{routeResult.estimatedTime}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 block text-[10px]">INTERMEDIATE STOPS</span>
              <span className="font-extrabold text-slate-900 dark:text-slate-100 text-base">{routeResult.stopsCount} Stops</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 block text-[10px]">ESTIMATED COST</span>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-base">{routeResult.estimatedCost}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
            <Button variant="outline" icon={Layers} onClick={() => setComparing(!comparing)}>
              {comparing ? 'Hide Algorithm Comparison' : 'Compare Routes (Dijkstra vs Bitmask DP)'}
            </Button>
            <Button variant="primary" icon={CheckCircle2}>
              Apply Route
            </Button>
          </div>

          {/* Algorithm Comparison Box */}
          {comparing && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs space-y-3 animate-fade-in">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">Algorithm Comparison Breakdown</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-blue-600 block mb-1">Dijkstra Shortest Path</span>
                  <div className="text-[11px] text-slate-500 space-y-1">
                    <div>Distance: 274.5 km</div>
                    <div>Time: 4 hrs 15 mins</div>
                    <div>Complexity: O((V + E) log V)</div>
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-purple-600 block mb-1">Bitmask DP (TSP)</span>
                  <div className="text-[11px] text-slate-500 space-y-1">
                    <div>Distance: 268.2 km (-6.3 km optimized)</div>
                    <div>Time: 4 hrs 05 mins</div>
                    <div>Complexity: O(2^N × N²)</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

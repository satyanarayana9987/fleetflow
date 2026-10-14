import React, { useState } from 'react';
import { NETWORK_NODES, NETWORK_EDGES } from '../../data/mockData';
import Button from '../common/Button';
import { GitFork, Activity, ShieldAlert, ArrowRight, CheckCircle2, Cpu } from 'lucide-react';

export default function NetworkGraph() {
  const [algo, setAlgo] = useState('Ford-Fulkerson');
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Network Header & Controls */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 card-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <GitFork className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Network Flow Intelligence</h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Inter-hub flow capacity & bottleneck optimization engine
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={algo}
            onChange={(e) => setAlgo(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
          >
            <option value="Ford-Fulkerson">Ford-Fulkerson Algorithm</option>
            <option value="Edmonds-Karp">Edmonds-Karp (BFS Path)</option>
            <option value="Min-Cut">Max-Flow Min-Cut Theorem</option>
          </select>

          <Button variant="primary" icon={Cpu} onClick={handleAnalyze} disabled={analyzing}>
            {analyzing ? 'Analyzing Network...' : 'Analyze Network'}
          </Button>
        </div>
      </div>

      {/* Network Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 card-shadow">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Maximum Network Capacity</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">2,800 pkgs/hr</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 card-shadow">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Current Active Flow</span>
          <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">2,420 pkgs/hr</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 card-shadow">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Remaining Buffer</span>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">380 pkgs/hr</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 card-shadow border-l-4 border-l-rose-500">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Bottleneck Cut Edge</span>
          <div className="text-sm font-bold text-rose-600 dark:text-rose-400 mt-1 truncate">VJA → GNT (600 max)</div>
        </div>
      </div>

      {/* Connected Graph Nodes Visual Canvas */}
      <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-6 pb-2 border-b border-slate-800">
          <span className="font-mono text-slate-200">INTER-STATE LOGISTICS CAPACITY GRAPH</span>
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Optimal Edge
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 ml-2" /> Bottleneck Edge
          </span>
        </div>

        {/* Node Flow Diagram */}
        <div className="space-y-6">
          {/* Main Highway Pipeline */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
            <div className="p-4 rounded-xl bg-slate-900 border border-blue-500/40 text-center w-full md:w-56 shadow-lg">
              <span className="text-[10px] uppercase font-bold text-blue-400">Source Warehouse</span>
              <div className="font-bold text-white text-sm mt-1">Hyderabad Central</div>
              <div className="text-xs text-slate-400 mt-1 font-mono">Capacity: 10,000</div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-2">
              <span className="text-[10px] font-mono text-emerald-400 mb-1">Flow: 950 / 1200 pkgs/hr</span>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden relative">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '79%' }} />
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-400 mt-1" />
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 text-center w-full md:w-56">
              <span className="text-[10px] uppercase font-bold text-slate-400">Primary Hub</span>
              <div className="font-bold text-white text-sm mt-1">Hyderabad Hub</div>
              <div className="text-xs text-slate-400 mt-1 font-mono">Capacity: 5,000</div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-2">
              <span className="text-[10px] font-mono text-amber-400 mb-1">Flow: 880 / 1000 pkgs/hr</span>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '88%' }} />
              </div>
              <ArrowRight className="w-4 h-4 text-amber-400 mt-1" />
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 text-center w-full md:w-56">
              <span className="text-[10px] uppercase font-bold text-slate-400">Distribution Hub</span>
              <div className="font-bold text-white text-sm mt-1">Vijayawada Hub</div>
              <div className="text-xs text-slate-400 mt-1 font-mono">Capacity: 4,500</div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-2">
              <span className="text-[10px] font-mono text-rose-400 font-bold mb-1">BOTTLENECK: 590 / 600</span>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full animate-pulse" style={{ width: '98%' }} />
              </div>
              <ArrowRight className="w-4 h-4 text-rose-400 mt-1" />
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/60 text-center w-full md:w-56 shadow-lg shadow-rose-950/40">
              <span className="text-[10px] uppercase font-bold text-rose-400 flex items-center justify-center gap-1">
                <ShieldAlert className="w-3 h-3" /> Critical Node
              </span>
              <div className="font-bold text-white text-sm mt-1">Guntur Node</div>
              <div className="text-xs text-slate-400 mt-1 font-mono">Capacity: 2,000</div>
            </div>
          </div>
        </div>

        {/* Algorithm Result Feedback */}
        {analyzed && (
          <div className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-emerald-500/40 text-xs space-y-2 animate-fade-in font-sans">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4" /> {algo} Analysis Execution Complete
              </span>
              <span className="text-slate-400 font-mono">Runtime: 1.4ms</span>
            </div>
            {algo === 'Ford-Fulkerson' && (
              <p className="text-slate-300 leading-relaxed">
                Max flow saturated at <strong>1,850 pkgs/hr</strong> via Depth-First Search augmenting paths.
                The minimum cut edge causing capacity restriction is <strong>Vijayawada Hub → Guntur Node (600 pkgs/hr limit)</strong>.
                Recommendation: Reroute 150 pkgs/hr via Visakhapatnam Port secondary corridor.
              </p>
            )}
            {algo === 'Edmonds-Karp' && (
              <p className="text-slate-300 leading-relaxed">
                Edmonds-Karp BFS shortest augmenting path solver confirmed max flow of <strong>1,850 pkgs/hr</strong> across 4 augmenting iterations.
                Guaranteed polynomial execution runtime in <strong>O(V × E²)</strong>. Zero augmenting path cycles detected.
              </p>
            )}
            {algo === 'Min-Cut' && (
              <p className="text-slate-300 leading-relaxed">
                Max-Flow Min-Cut Theorem boundary identified. Cut Partition S = {'{HYD, HYD_HUB, VJA_HUB, VSKP}'}, Partition T = {'{GNT_NODE, CUST}'}.
                Total cut capacity: <strong>600 pkgs/hr</strong>. Expanding Guntur intake by 400 pkgs/hr will increase overall system capacity to 2,250 pkgs/hr.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

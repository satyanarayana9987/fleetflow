import React, { useState } from 'react';
import { DSA_CATEGORIES } from '../../data/mockData';
import { fleetApi } from '../../services/api';
import Button from '../common/Button';
import { Play, Code, Cpu, Terminal, CheckCircle2, Clock, Zap, ArrowRight, Activity } from 'lucide-react';

export default function AlgorithmRunner() {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(3); // Default Graph Algorithms
  const [selectedAlgoId, setSelectedAlgoId] = useState('dijkstra');
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);

  const category = DSA_CATEGORIES[selectedCategoryIndex];
  const algo = category.algorithms.find(a => a.id === selectedAlgoId) || category.algorithms[0];

  // Dynamic input states based on selected algorithm
  const [inputs, setInputs] = useState({
    source: 'Hyderabad Central Hub',
    destination: 'Guntur Transit Node',
    text: algo.sampleInput?.text || 'HYD-SHP-2026-VJA-001245',
    pattern: algo.sampleInput?.pattern || 'SHP-2026',
    str1: 'Vijaywada Tech Park',
    str2: 'Vijayawada Tech Park'
  });

  const handleRun = async () => {
    setRunning(true);
    setResult(null);

    try {
      const apiResult = await fleetApi.runDSAAlgorithm(algo.id, {
        ...inputs,
        algorithmId: algo.id,
        algorithmName: algo.name
      });
      setResult(apiResult);
    } catch (err) {
      console.error(err);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {DSA_CATEGORIES.map((cat, idx) => (
          <button
            key={cat.name}
            onClick={() => {
              setSelectedCategoryIndex(idx);
              setSelectedAlgoId(cat.algorithms[0].id);
              setResult(null);
            }}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              selectedCategoryIndex === idx
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Main Runner Grid: Left Algo List | Center Spec | Right Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Category Algorithms */}
        <div className="lg:col-span-3 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Algorithms in {category.name}
          </div>
          {category.algorithms.map((a) => (
            <button
              key={a.id}
              onClick={() => {
                setSelectedAlgoId(a.id);
                setResult(null);
              }}
              className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                selectedAlgoId === a.id
                  ? 'bg-blue-50/80 border-blue-500 text-blue-900 dark:bg-blue-950/40 dark:border-blue-500 dark:text-blue-200 font-bold shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="text-xs font-semibold">{a.name}</div>
              <div className="text-[10px] text-slate-400 font-mono mt-1">{a.complexity}</div>
            </button>
          ))}
        </div>

        {/* Center Column: Algorithm Spec & Logistics Problem Context */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 card-shadow space-y-4">
            <div>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                {category.name}
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-2">{algo.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{algo.description}</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                <Zap className="w-4 h-4 text-amber-500" />
                Logistics Application Problem
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {algo.problem}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs font-mono p-3 bg-slate-900 text-slate-200 rounded-xl border border-slate-800">
              <span className="text-slate-400">Complexity:</span>
              <span className="font-bold text-emerald-400">{algo.complexity}</span>
            </div>

            {/* Java Spring Boot REST Payload Spec */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-blue-500" />
                Spring Boot API Mapping
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 text-slate-300 font-mono text-[11px] border border-slate-800">
                <span className="text-purple-400">@PostMapping</span>(<span className="text-emerald-400">"/api/dsa/{algo.id}"</span>)
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Sandbox Input & Live Visualization Output */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 card-shadow space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-600" />
                Algorithm Input Parameters
              </h4>
              <Button
                variant="primary"
                size="sm"
                icon={Play}
                onClick={handleRun}
                disabled={running}
              >
                {running ? 'Executing...' : 'Run Algorithm'}
              </Button>
            </div>

            {/* Custom Input Controls based on algo type */}
            <div className="space-y-3">
              {algo.id === 'dijkstra' || algo.id === 'ford-fulkerson' || algo.id === 'edmonds-karp' || algo.id === 'min-cut' ? (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Source Node</label>
                    <input
                      type="text"
                      value={inputs.source}
                      onChange={(e) => setInputs({ ...inputs, source: e.target.value })}
                      className="w-full p-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Destination Sink / Target</label>
                    <input
                      type="text"
                      value={inputs.destination}
                      onChange={(e) => setInputs({ ...inputs, destination: e.target.value })}
                      className="w-full p-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    />
                  </div>
                </>
              ) : algo.id === 'kmp' || algo.id === 'z-algo' || algo.id === 'rabin-karp' || algo.id === 'bloom-filter' ? (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Text / Sequence</label>
                    <input
                      type="text"
                      value={inputs.text}
                      onChange={(e) => setInputs({ ...inputs, text: e.target.value })}
                      className="w-full p-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Search Pattern / Query ID</label>
                    <input
                      type="text"
                      value={inputs.pattern}
                      onChange={(e) => setInputs({ ...inputs, pattern: e.target.value })}
                      className="w-full p-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
                    />
                  </div>
                </>
              ) : algo.id === 'levenshtein' ? (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Address String 1</label>
                    <input
                      type="text"
                      value={inputs.str1}
                      onChange={(e) => setInputs({ ...inputs, str1: e.target.value })}
                      className="w-full p-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Comparison Address String 2</label>
                    <input
                      type="text"
                      value={inputs.str2}
                      onChange={(e) => setInputs({ ...inputs, str2: e.target.value })}
                      className="w-full p-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Sample Input JSON Payload</label>
                  <pre className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono overflow-x-auto text-slate-800 dark:text-slate-200">
                    {JSON.stringify(algo.sampleInput, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* Execution Result Box */}
            {result && (
              <div className="mt-4 p-4 rounded-xl bg-slate-950 text-slate-100 border border-slate-800 space-y-3 animate-fade-in font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Execution Success ({result.status || 'OK'})
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {result.clientExecutionTimeMs} ms
                  </span>
                </div>

                {/* Specific Algorithm Key Outputs */}
                {result.shortestPath && (
                  <div>
                    <span className="text-slate-400 block mb-1">Optimal Shortest Path:</span>
                    <div className="flex items-center gap-1 flex-wrap text-blue-300">
                      {result.shortestPath.map((p, idx) => (
                        <React.Fragment key={p}>
                          <span className="px-2 py-0.5 rounded bg-blue-900/60 border border-blue-700/50">{p}</span>
                          {idx < result.shortestPath.length - 1 && <ArrowRight className="w-3 h-3 text-slate-500" />}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}

                {result.maxFlow && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Max Network Flow:</span>
                    <span className="text-emerald-400 font-bold">{result.maxFlow}</span>
                  </div>
                )}

                {result.matchings && (
                  <div className="space-y-1">
                    <span className="text-slate-400 block mb-1">Driver Bipartite Matching:</span>
                    {result.matchings.map((m, i) => (
                      <div key={i} className="text-[11px] text-slate-300 flex justify-between">
                        <span>{m.driver}</span>
                        <span className="text-emerald-400">{m.task}</span>
                      </div>
                    ))}
                  </div>
                )}

                {result.lpsArray && (
                  <div>
                    <span className="text-slate-400 block mb-1">LPS Array:</span>
                    <span className="text-purple-300 font-bold">[{result.lpsArray.join(', ')}]</span>
                  </div>
                )}

                {result.optimalRoute && (
                  <div>
                    <span className="text-slate-400 block mb-1">TSP Optimal Route Cycle:</span>
                    <span className="text-emerald-300 font-bold">{result.optimalRoute.join(' → ')}</span>
                  </div>
                )}

                {result.editDistance !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Levenshtein Edit Distance:</span>
                    <span className="text-blue-400 font-bold">{result.editDistance} operation(s)</span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  <span className="text-slate-500 block mb-1">Execution Telemetry Log:</span>
                  <p className="text-slate-300 leading-relaxed font-sans">{result.log}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import AlgorithmRunner from '../components/dsa/AlgorithmRunner';
import { Cpu } from 'lucide-react';

export default function DSALab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-purple-600" />
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight my-0">
              DSA Algorithm Laboratory
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Execution sandbox for String Matching, Graph Theory, Dynamic Programming, and Suffix Tree solvers.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-mono font-bold">
          Spring Boot REST: BASE_URL/api/dsa/{'{algo}'}
        </div>
      </div>

      <AlgorithmRunner />
    </div>
  );
}

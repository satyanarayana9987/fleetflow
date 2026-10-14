import React from 'react';
import Modal from './Modal';
import { Terminal, Cpu, Network, Zap, BookOpen, Layers } from 'lucide-react';
import { BASE_URL } from '../../services/api';

export default function HelpModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="FleetFlow System Documentation & API Guide"
      subtitle="Intelligent Logistics Management Architecture"
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6 text-sm">
        {/* Backend API specs */}
        <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/50">
          <div className="flex items-center gap-2 font-semibold text-blue-900 dark:text-blue-200 text-base mb-2">
            <Terminal className="w-5 h-5 text-blue-600" />
            Spring Boot REST API Endpoint
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-xs mb-3">
            FleetFlow frontend is engineered to seamlessly hook into a Spring Boot backend running on Java 17+.
          </p>
          <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs overflow-x-auto border border-slate-800">
            <div><span className="text-emerald-400">BASE_URL:</span> {BASE_URL}</div>
            <div className="text-slate-400 mt-1">Endpoints available:</div>
            <div className="text-blue-300 pl-2">GET /api/shipments | POST /api/shipments</div>
            <div className="text-blue-300 pl-2">GET /api/drivers | GET /api/vehicles | GET /api/warehouses</div>
            <div className="text-blue-300 pl-2">POST /api/routes/optimize | POST /api/dsa/{'{algorithmId}'}</div>
          </div>
        </div>

        {/* DSA Lab Specs */}
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-2">
            <Cpu className="w-4 h-4 text-purple-600" />
            DSA Algorithm Engine Highlights
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100 block mb-1">Graph Algorithms</span>
              Dijkstra, Ford-Fulkerson, Edmonds-Karp, Bipartite Matching for driver scheduling & bottleneck resolution.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100 block mb-1">Dynamic Programming</span>
              Bitmask DP for Traveling Salesperson Problem (TSP) multi-stop truck routing up to 20 cities.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100 block mb-1">String Matching</span>
              KMP, Rabin-Karp, Z-Algorithm for high-throughput package barcode indexing.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100 block mb-1">NP-Complete & Parallel</span>
              Vertex Cover 2-Approximation, Bloom Filters, Parallel Brent's Theorem for telematics.
            </div>
          </div>
        </div>

        {/* Hotkeys */}
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-amber-500" />
            Keyboard Shortcuts
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <div className="flex items-center justify-between p-2 bg-slate-100 dark:bg-slate-800 rounded">
              <span>Global Search</span>
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-700 rounded border text-[10px]">⌘K</kbd>
            </div>
            <div className="flex items-center justify-between p-2 bg-slate-100 dark:bg-slate-800 rounded">
              <span>Create Shipment</span>
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-700 rounded border text-[10px]">Alt + N</kbd>
            </div>
            <div className="flex items-center justify-between p-2 bg-slate-100 dark:bg-slate-800 rounded">
              <span>Toggle Theme</span>
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-700 rounded border text-[10px]">Alt + T</kbd>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

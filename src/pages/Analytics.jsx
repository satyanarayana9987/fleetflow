import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { BarChart3, TrendingUp, Clock, CheckCircle2, Truck, Warehouse as WarehouseIcon, Car, AlertTriangle } from 'lucide-react';

const DATA_BY_RANGE = {
  'Last 7 Days': {
    totalShipments: '2,845',
    avgDeliveryTime: '4.2 Hours',
    onTimeRate: '96.8%',
    fleetUtil: '88.4%',
    whCapacity: '78.2%',
    driverUtil: '91.0%',
    avgDistance: '248 km',
    delayedCount: '48 (1.6%)',
    volume: [
      { day: 'Mon', volume: 340, onTime: 320, delayed: 20 },
      { day: 'Tue', volume: 410, onTime: 390, delayed: 20 },
      { day: 'Wed', volume: 390, onTime: 370, delayed: 20 },
      { day: 'Thu', volume: 480, onTime: 450, delayed: 30 },
      { day: 'Fri', volume: 520, onTime: 490, delayed: 30 },
      { day: 'Sat', volume: 380, onTime: 360, delayed: 20 },
      { day: 'Sun', volume: 325, onTime: 310, delayed: 15 }
    ]
  },
  '30 Days': {
    totalShipments: '12,480',
    avgDeliveryTime: '4.5 Hours',
    onTimeRate: '95.4%',
    fleetUtil: '91.2%',
    whCapacity: '82.0%',
    driverUtil: '93.5%',
    avgDistance: '262 km',
    delayedCount: '210 (1.7%)',
    volume: [
      { day: 'Wk 1', volume: 2900, onTime: 2780, delayed: 120 },
      { day: 'Wk 2', volume: 3100, onTime: 2960, delayed: 140 },
      { day: 'Wk 3', volume: 3250, onTime: 3100, delayed: 150 },
      { day: 'Wk 4', volume: 3230, onTime: 3110, delayed: 120 }
    ]
  },
  'This Quarter': {
    totalShipments: '38,900',
    avgDeliveryTime: '4.1 Hours',
    onTimeRate: '97.2%',
    fleetUtil: '89.6%',
    whCapacity: '80.5%',
    driverUtil: '92.1%',
    avgDistance: '255 km',
    delayedCount: '580 (1.5%)',
    volume: [
      { day: 'Month 1', volume: 12100, onTime: 11750, delayed: 350 },
      { day: 'Month 2', volume: 13200, onTime: 12800, delayed: 400 },
      { day: 'Month 3', volume: 13600, onTime: 13250, delayed: 350 }
    ]
  },
  'YTD': {
    totalShipments: '142,500',
    avgDeliveryTime: '4.3 Hours',
    onTimeRate: '96.1%',
    fleetUtil: '90.1%',
    whCapacity: '81.8%',
    driverUtil: '92.8%',
    avgDistance: '250 km',
    delayedCount: '2,280 (1.6%)',
    volume: [
      { day: 'Q1', volume: 32000, onTime: 30800, delayed: 1200 },
      { day: 'Q2', volume: 35500, onTime: 34100, delayed: 1400 },
      { day: 'Q3', volume: 38900, onTime: 37400, delayed: 1500 },
      { day: 'Q4', volume: 36100, onTime: 34800, delayed: 1300 }
    ]
  }
};

const UTILIZATION_DATA = [
  { time: '06:00', fleet: 65, warehouse: 72, driver: 70 },
  { time: '09:00', fleet: 88, warehouse: 85, driver: 92 },
  { time: '12:00', fleet: 94, warehouse: 89, driver: 95 },
  { time: '15:00', fleet: 85, warehouse: 80, driver: 88 },
  { time: '18:00', fleet: 78, warehouse: 76, driver: 80 }
];

export default function Analytics() {
  const [range, setRange] = useState('Last 7 Days');
  const currentData = DATA_BY_RANGE[range] || DATA_BY_RANGE['Last 7 Days'];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight my-0">
              Logistics Network Analytics
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Network efficiency, driver productivity, and transit SLA performance metrics.
          </p>
        </div>

        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          {['Last 7 Days', '30 Days', 'This Quarter', 'YTD'].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                range === r
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* 8 Top Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 card-shadow">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Shipments</span>
          <div className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{currentData.totalShipments}</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 card-shadow">
          <span className="text-[10px] uppercase font-bold text-slate-400">Average Delivery Time</span>
          <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">{currentData.avgDeliveryTime}</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 card-shadow">
          <span className="text-[10px] uppercase font-bold text-slate-400">On-Time Delivery %</span>
          <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{currentData.onTimeRate}</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 card-shadow">
          <span className="text-[10px] uppercase font-bold text-slate-400">Fleet Utilization</span>
          <div className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{currentData.fleetUtil}</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 card-shadow">
          <span className="text-[10px] uppercase font-bold text-slate-400">Warehouse Capacity</span>
          <div className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{currentData.whCapacity}</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 card-shadow">
          <span className="text-[10px] uppercase font-bold text-slate-400">Driver Utilization</span>
          <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{currentData.driverUtil}</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 card-shadow">
          <span className="text-[10px] uppercase font-bold text-slate-400">Average Distance</span>
          <div className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{currentData.avgDistance}</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 card-shadow border-l-4 border-l-rose-500">
          <span className="text-[10px] uppercase font-bold text-slate-400">Delayed Shipments</span>
          <div className="text-xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">{currentData.delayedCount}</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shipment Volume Breakdown */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 card-shadow space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Dispatch Volume vs SLA ({range})</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentData.volume}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="onTime" name="On Time" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="delayed" name="Delayed" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resource Utilization */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 card-shadow space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Intraday Resource Utilization (%)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={UTILIZATION_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff' }} />
                <Line type="monotone" dataKey="fleet" name="Fleet Vehicles" stroke="#2563eb" strokeWidth={2} />
                <Line type="monotone" dataKey="warehouse" name="Warehouse Space" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="driver" name="Driver Shifts" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

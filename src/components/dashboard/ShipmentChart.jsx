import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

const CHART_DATA = {
  '7 Days': [
    { date: 'Mon', total: 340, delivered: 290, inTransit: 40, delayed: 10 },
    { date: 'Tue', total: 410, delivered: 350, inTransit: 48, delayed: 12 },
    { date: 'Wed', total: 390, delivered: 330, inTransit: 45, delayed: 15 },
    { date: 'Thu', total: 480, delivered: 410, inTransit: 58, delayed: 12 },
    { date: 'Fri', total: 520, delivered: 450, inTransit: 55, delayed: 15 },
    { date: 'Sat', total: 380, delivered: 330, inTransit: 40, delayed: 10 },
    { date: 'Sun', total: 325, delivered: 285, inTransit: 32, delayed: 8 }
  ],
  '30 Days': [
    { date: 'Week 1', total: 2100, delivered: 1850, inTransit: 200, delayed: 50 },
    { date: 'Week 2', total: 2450, delivered: 2150, inTransit: 230, delayed: 70 },
    { date: 'Week 3', total: 2300, delivered: 2020, inTransit: 220, delayed: 60 },
    { date: 'Week 4', total: 2845, delivered: 2480, inTransit: 310, delayed: 55 }
  ],
  '3 Months': [
    { date: 'Aug', total: 7200, delivered: 6400, inTransit: 650, delayed: 150 },
    { date: 'Sep', total: 8100, delivered: 7250, inTransit: 680, delayed: 170 },
    { date: 'Oct', total: 8900, delivered: 7900, inTransit: 810, delayed: 190 }
  ],
  '1 Year': [
    { date: 'Q1', total: 22000, delivered: 19800, inTransit: 1700, delayed: 500 },
    { date: 'Q2', total: 24500, delivered: 22100, inTransit: 1900, delayed: 500 },
    { date: 'Q3', total: 26800, delivered: 24200, inTransit: 2000, delayed: 600 },
    { date: 'Q4', total: 29100, delivered: 26400, inTransit: 2100, delayed: 600 }
  ]
};

export default function ShipmentChart() {
  const [range, setRange] = useState('7 Days');
  const data = CHART_DATA[range];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 card-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Shipment Overview</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Total volume vs fulfillment efficiency</p>
        </div>

        {/* Time Range Tabs */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          {['7 Days', '30 Days', '3 Months', '1 Year'].map((tab) => (
            <button
              key={tab}
              onClick={() => setRange(tab)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                range === tab
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Legend Header */}
      <div className="flex flex-wrap items-center gap-4 mb-4 text-xs font-medium">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-600" />
          <span className="text-slate-600 dark:text-slate-300">Total Volume</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-slate-600 dark:text-slate-300">Delivered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-400" />
          <span className="text-slate-600 dark:text-slate-300">In Transit</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-500" />
          <span className="text-slate-600 dark:text-slate-300">Delayed</span>
        </div>
      </div>

      {/* Chart Box */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="deliveredGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#1e293b',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px'
              }}
            />
            <Area type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#totalGradient)" />
            <Area type="monotone" dataKey="delivered" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#deliveredGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

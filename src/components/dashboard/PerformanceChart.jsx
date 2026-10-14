import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const PERFORMANCE_DATA = [
  { name: 'On Time', value: 88, color: '#10b981' },
  { name: 'Delayed', value: 8, color: '#ef4444' },
  { name: 'Cancelled', value: 4, color: '#94a3b8' }
];

export default function PerformanceChart() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 card-shadow flex flex-col justify-between">
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Delivery Performance</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">On-Time SLA compliance breakdown</p>
      </div>

      <div className="h-44 my-2 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={PERFORMANCE_DATA}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={4}
              dataKey="value"
            >
              {PERFORMANCE_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#1e293b',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px'
              }}
              formatter={(val) => [`${val}%`, 'Rate']}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-extrabold text-slate-900 dark:text-slate-100">96.8%</span>
          <span className="text-[10px] uppercase font-bold text-slate-400">Efficiency</span>
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        {PERFORMANCE_DATA.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-slate-600 dark:text-slate-300">{item.name}</span>
            </div>
            <span className="font-bold text-slate-900 dark:text-slate-100">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

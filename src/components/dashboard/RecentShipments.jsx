import React from 'react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import { Eye, Navigation, ArrowUpRight } from 'lucide-react';

export default function RecentShipments() {
  const { shipments, navigateTo } = useApp();
  const recentList = shipments.slice(0, 5);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 card-shadow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Recent Network Shipments</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Live dispatch and fulfillment activity</p>
        </div>
        <button
          onClick={() => navigateTo('shipments')}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>View All ({shipments.length})</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
              <th className="py-2.5 px-3">Tracking ID</th>
              <th className="py-2.5 px-3">Customer</th>
              <th className="py-2.5 px-3">Route (Origin → Dest)</th>
              <th className="py-2.5 px-3">Driver & Vehicle</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3">ETA</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
            {recentList.map((shp) => (
              <tr key={shp.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-3">
                  <span
                    onClick={() => navigateTo('shipment-details', shp.id)}
                    className="font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-mono"
                  >
                    {shp.id}
                  </span>
                  <span className="block text-[10px] text-slate-400">{shp.priority} Priority</span>
                </td>
                <td className="py-3 px-3">
                  <span className="text-slate-900 dark:text-slate-100 font-semibold block">{shp.customer}</span>
                  <span className="text-[10px] text-slate-400">{shp.packageType}</span>
                </td>
                <td className="py-3 px-3">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{shp.originCity}</span>
                  <span className="text-slate-400 mx-1">→</span>
                  <span className="text-slate-900 dark:text-slate-100 font-semibold">{shp.destinationCity}</span>
                </td>
                <td className="py-3 px-3">
                  <span className="text-slate-800 dark:text-slate-200 block">{shp.driver}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{shp.vehicle.split(' ')[0]}</span>
                </td>
                <td className="py-3 px-3">
                  <Badge status={shp.status} />
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-medium">
                  {shp.eta}
                </td>
                <td className="py-3 px-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => navigateTo('shipment-details', shp.id)}
                      className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded transition-colors cursor-pointer"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigateTo('routes')}
                      className="p-1 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 rounded transition-colors cursor-pointer"
                      title="Track Live"
                    >
                      <Navigation className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

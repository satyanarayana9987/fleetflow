import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { Plus, Download, Search, Filter, Eye, Navigation, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Shipments() {
  const { shipments, navigateTo, setCreateShipmentModalOpen, updateShipmentStatus } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtering
  const filtered = shipments.filter((shp) => {
    const matchesSearch =
      shp.id.toLowerCase().includes(search.toLowerCase()) ||
      shp.customer.toLowerCase().includes(search.toLowerCase()) ||
      shp.destinationCity.toLowerCase().includes(search.toLowerCase()) ||
      shp.driver.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' || shp.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || shp.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Tracking ID,Customer,Origin,Destination,Driver,Vehicle,Status,ETA"].join(",") + "\n"
      + filtered.map(e => `${e.id},"${e.customer}",${e.originCity},${e.destinationCity},"${e.driver}",${e.vehicle},${e.status},${e.eta}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `FleetFlow_Shipments_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 card-shadow">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight my-0">
            Shipment Management
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track, dispatch, and manage enterprise orders across all logistics corridors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" icon={Download} onClick={handleExport}>
            Export CSV
          </Button>
          <Button variant="primary" icon={Plus} onClick={() => setCreateShipmentModalOpen(true)}>
            Create Shipment
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 card-shadow flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tracking ID, customer, destination, driver..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 text-xs md:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
            <Filter className="w-4 h-4 text-slate-400" />
            <span>Filters:</span>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Delayed">Delayed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => {
              setPriorityFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
            <option value="Express">Express</option>
          </select>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                <th className="py-3 px-4">Tracking ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Origin</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Weight & Type</th>
                <th className="py-3 px-4">Driver & Vehicle</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">ETA</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-12 text-center text-slate-400 text-xs">
                    No shipments match your search filter criteria.
                  </td>
                </tr>
              ) : (
                paginated.map((shp) => (
                  <tr key={shp.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <span
                        onClick={() => navigateTo('shipment-details', shp.id)}
                        className="font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-mono"
                      >
                        {shp.id}
                      </span>
                      <span className="block text-[10px] text-slate-400">{shp.priority} Priority</span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-slate-100">
                      {shp.customer}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      {shp.originCity}
                    </td>
                    <td className="py-3.5 px-4 text-slate-900 dark:text-slate-100 font-semibold">
                      {shp.destinationCity}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="block text-slate-700 dark:text-slate-300 font-bold">{shp.weight}</span>
                      <span className="text-[10px] text-slate-400">{shp.packageType}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="block text-slate-800 dark:text-slate-200">{shp.driver}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{shp.vehicle.split(' ')[0]}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge status={shp.status} />
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      {shp.eta}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => navigateTo('shipment-details', shp.id)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg transition-colors cursor-pointer"
                          title="View Telemetry"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <select
                          value={shp.status}
                          onChange={(e) => updateShipmentStatus(shp.id, e.target.value)}
                          className="text-[10px] py-1 px-1.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Transit">In Transit</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Delayed">Delayed</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-800 dark:text-slate-200">{paginated.length}</strong> of{' '}
            <strong className="text-slate-800 dark:text-slate-200">{filtered.length}</strong> shipments
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

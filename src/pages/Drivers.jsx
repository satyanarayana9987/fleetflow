import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { Users, Phone, ShieldCheck, Star, MapPin, Car, Search, Filter } from 'lucide-react';

export default function Drivers() {
  const { drivers } = useApp();
  const [search, setSearch] = useState('');
  const [selectedDriver, setSelectedDriver] = useState(null);

  const filtered = drivers.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.id.toLowerCase().includes(search.toLowerCase()) ||
    d.license.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight my-0">
            Driver Roster & Telematics
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage drivers, license verifications, assigned vehicles, and shift statuses.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 card-shadow">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search driver name, ID, or license number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs md:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Grid of Driver Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((d) => (
          <div
            key={d.id}
            onClick={() => setSelectedDriver(d)}
            className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 card-shadow card-shadow-hover flex flex-col justify-between cursor-pointer space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[11px] font-bold text-slate-400">{d.id}</span>
                <Badge status={d.status} />
              </div>

              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-extrabold flex items-center justify-center text-sm border border-blue-200 dark:border-blue-800">
                  {d.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{d.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{d.rating}</span>
                    <span className="text-slate-400 text-[10px]">({d.deliveries} deliveries)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{d.phone}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Car className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{d.assignedVehicle}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="truncate">{d.currentLocation}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">License: {d.license}</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">View Profile →</span>
            </div>
          </div>
        ))}
      </div>

      {/* Driver Details Modal */}
      {selectedDriver && (
        <Modal
          isOpen={!!selectedDriver}
          onClose={() => setSelectedDriver(null)}
          title={`Driver Telematics: ${selectedDriver.name}`}
          subtitle={`ID: ${selectedDriver.id} • Rating: ${selectedDriver.rating} / 5.0`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[10px]">CURRENT STATUS</span>
                <Badge status={selectedDriver.status} />
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">EXPERIENCE</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{selectedDriver.experience}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">TOTAL DELIVERIES</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">{selectedDriver.deliveries}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px]">PHONE</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">{selectedDriver.phone}</span>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px]">LICENSE NO.</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{selectedDriver.license}</span>
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px]">ASSIGNED VEHICLE</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">{selectedDriver.assignedVehicle}</span>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px]">CURRENT SHIPMENT ORDER</span>
              <span className="font-mono font-bold text-blue-600">{selectedDriver.assignedShipment}</span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

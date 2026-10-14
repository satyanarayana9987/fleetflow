import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import StatCard from '../components/common/StatCard';
import ShipmentChart from '../components/dashboard/ShipmentChart';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import NetworkPreview from '../components/dashboard/NetworkPreview';
import RecentShipments from '../components/dashboard/RecentShipments';
import AlertsList from '../components/dashboard/AlertsList';
import Button from '../components/common/Button';
import {
  Package,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Car,
  Users,
  RefreshCw,
  Calendar
} from 'lucide-react';

export default function Dashboard() {
  const { kpi, setCreateShipmentModalOpen } = useApp();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 card-shadow">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight my-0">
            Good morning, Admin
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Here's what's happening across your logistics network today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs text-slate-600 dark:text-slate-300 font-medium">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span>{currentDate}</span>
          </div>

          <button
            onClick={handleRefresh}
            className={`p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl transition-all ${
              refreshing ? 'animate-spin' : ''
            }`}
            title="Refresh Network Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 6 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Shipments"
          value={kpi.totalShipments.value}
          change={kpi.totalShipments.change}
          text={kpi.totalShipments.text}
          trend={kpi.totalShipments.trend}
          icon={Package}
          color="blue"
        />
        <StatCard
          title="In Transit"
          value={kpi.inTransit.value}
          change={kpi.inTransit.change}
          text={kpi.inTransit.text}
          trend={kpi.inTransit.trend}
          icon={Truck}
          color="purple"
        />
        <StatCard
          title="Delivered"
          value={kpi.delivered.value}
          change={kpi.delivered.change}
          text={kpi.delivered.text}
          trend={kpi.delivered.trend}
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Delayed"
          value={kpi.delayed.value}
          change={kpi.delayed.change}
          text={kpi.delayed.text}
          trend="down"
          icon={AlertTriangle}
          color="rose"
        />
        <StatCard
          title="Active Vehicles"
          value={kpi.activeVehicles.value}
          change={kpi.activeVehicles.change}
          text={kpi.activeVehicles.text}
          trend={kpi.activeVehicles.trend}
          icon={Car}
          color="blue"
        />
        <StatCard
          title="Available Drivers"
          value={kpi.availableDrivers.value}
          change={kpi.availableDrivers.change}
          text={kpi.availableDrivers.text}
          trend={kpi.availableDrivers.trend}
          icon={Users}
          color="emerald"
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ShipmentChart />
        </div>
        <div className="lg:col-span-1">
          <PerformanceChart />
        </div>
      </div>

      {/* Logistics Network Nodes Flow */}
      <NetworkPreview />

      {/* Tables & Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentShipments />
        </div>
        <div className="lg:col-span-1">
          <AlertsList />
        </div>
      </div>
    </div>
  );
}

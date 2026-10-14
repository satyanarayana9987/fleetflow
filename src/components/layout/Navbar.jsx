import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  Search,
  Bell,
  HelpCircle,
  Sun,
  Moon,
  Plus,
  ChevronRight,
  Truck,
  User,
  Car,
  Warehouse as WarehouseIcon,
  X
} from 'lucide-react';

export default function Navbar() {
  const {
    activePage,
    navigateTo,
    sidebarCollapsed,
    setMobileDrawerOpen,
    globalSearch,
    setGlobalSearch,
    theme,
    toggleTheme,
    setCreateShipmentModalOpen,
    setHelpModalOpen,
    alerts,
    shipments,
    drivers,
    vehicles,
    warehouses
  } = useApp();

  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const searchRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter entities based on global search
  const filteredShipments = globalSearch ? shipments.filter(s =>
    s.id.toLowerCase().includes(globalSearch.toLowerCase()) ||
    s.customer.toLowerCase().includes(globalSearch.toLowerCase()) ||
    s.destinationCity.toLowerCase().includes(globalSearch.toLowerCase())
  ).slice(0, 3) : [];

  const filteredDrivers = globalSearch ? drivers.filter(d =>
    d.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
    d.id.toLowerCase().includes(globalSearch.toLowerCase())
  ).slice(0, 2) : [];

  const filteredVehicles = globalSearch ? vehicles.filter(v =>
    v.number.toLowerCase().includes(globalSearch.toLowerCase()) ||
    v.type.toLowerCase().includes(globalSearch.toLowerCase())
  ).slice(0, 2) : [];

  const filteredWarehouses = globalSearch ? warehouses.filter(w =>
    w.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
    w.city.toLowerCase().includes(globalSearch.toLowerCase())
  ).slice(0, 2) : [];

  const hasSearchMatches = globalSearch && (
    filteredShipments.length > 0 ||
    filteredDrivers.length > 0 ||
    filteredVehicles.length > 0 ||
    filteredWarehouses.length > 0
  );

  // Format page breadcrumb
  const pageTitles = {
    dashboard: 'Network Dashboard',
    shipments: 'Shipment Management',
    'shipment-details': 'Shipment Telemetry Details',
    routes: 'Route Optimization Engine',
    drivers: 'Driver Roster & Telematics',
    vehicles: 'Fleet Management',
    warehouses: 'Warehouse Capacity Nodes',
    customers: 'Enterprise Customers',
    documents: 'Document Vault & PODs',
    analytics: 'Network Performance Analytics',
    dsalab: 'Java DSA Algorithm Engine',
    networkflow: 'Network Flow Intelligence',
    optimization: 'Resource Allocation Optimizer',
    notifications: 'Logistics Notifications Center',
    settings: 'System Preferences & API Keys'
  };

  return (
    <header className={`sticky top-0 z-30 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300 ${
      sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
    }`}>
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Left: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs md:text-sm text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-800 dark:text-slate-200">FleetFlow</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="capitalize font-medium text-blue-600 dark:text-blue-400">
              {pageTitles[activePage] || activePage}
            </span>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div className="relative flex-1 max-w-md mx-4 hidden sm:block" ref={searchRef}>
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search Tracking ID, Driver, Vehicle, Warehouse..."
              value={globalSearch}
              onChange={(e) => {
                setGlobalSearch(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              className="w-full pl-9 pr-9 py-1.5 text-xs md:text-sm bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
            />
            {globalSearch && (
              <button
                onClick={() => setGlobalSearch('')}
                className="absolute right-3 p-0.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {searchOpen && globalSearch && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-3 z-50 max-h-96 overflow-y-auto animate-fade-in">
              {hasSearchMatches ? (
                <div className="space-y-3">
                  {/* Shipments */}
                  {filteredShipments.length > 0 && (
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Truck className="w-3 h-3 text-blue-500" /> Shipments
                      </div>
                      {filteredShipments.map((s) => (
                        <div
                          key={s.id}
                          onClick={() => {
                            navigateTo('shipment-details', s.id);
                            setSearchOpen(false);
                          }}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-xs"
                        >
                          <div>
                            <span className="font-bold text-blue-600 dark:text-blue-400">{s.id}</span>
                            <span className="text-slate-600 dark:text-slate-300 ml-2">{s.customer}</span>
                          </div>
                          <span className="text-[11px] text-slate-400">{s.destinationCity}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Drivers */}
                  {filteredDrivers.length > 0 && (
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <User className="w-3 h-3 text-emerald-500" /> Drivers
                      </div>
                      {filteredDrivers.map((d) => (
                        <div
                          key={d.id}
                          onClick={() => {
                            navigateTo('drivers');
                            setSearchOpen(false);
                          }}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-xs"
                        >
                          <span className="font-medium text-slate-800 dark:text-slate-200">{d.name} ({d.id})</span>
                          <span className="text-[11px] text-emerald-600">{d.status}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Vehicles */}
                  {filteredVehicles.length > 0 && (
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Car className="w-3 h-3 text-purple-500" /> Vehicles
                      </div>
                      {filteredVehicles.map((v) => (
                        <div
                          key={v.id}
                          onClick={() => {
                            navigateTo('vehicles');
                            setSearchOpen(false);
                          }}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-xs"
                        >
                          <span className="font-mono text-slate-800 dark:text-slate-200">{v.number}</span>
                          <span className="text-[11px] text-slate-400">{v.type}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Warehouses */}
                  {filteredWarehouses.length > 0 && (
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <WarehouseIcon className="w-3 h-3 text-amber-500" /> Warehouses
                      </div>
                      {filteredWarehouses.map((w) => (
                        <div
                          key={w.id}
                          onClick={() => {
                            navigateTo('warehouses');
                            setSearchOpen(false);
                          }}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-xs"
                        >
                          <span className="font-medium text-slate-800 dark:text-slate-200">{w.name}</span>
                          <span className="text-[11px] text-slate-400">{w.utilization}% load</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-400">
                  No matching shipment, driver, or vehicle found for "{globalSearch}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => setCreateShipmentModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Shipment</span>
          </button>

          {/* Notifications Icon with Popup */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {alerts.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800 mb-2">
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-200">Logistics Alerts ({alerts.length})</span>
                  <button
                    onClick={() => navigateTo('notifications')}
                    className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {alerts.map((alt) => (
                    <div key={alt.id} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-xs border border-slate-200 dark:border-slate-700/50">
                      <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between">
                        <span>{alt.title}</span>
                        <span className="text-[10px] text-slate-400">{alt.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{alt.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Help Modal Trigger */}
          <button
            onClick={() => setHelpModalOpen(true)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            title="System Documentation & Shortcuts"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? <Moon className="w-5 h-5 text-slate-700" /> : <Sun className="w-5 h-5 text-amber-400" />}
          </button>

          {/* User Profile Avatar */}
          <div
            onClick={() => navigateTo('settings')}
            className="flex items-center gap-2 pl-2 cursor-pointer border-l border-slate-200 dark:border-slate-800"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
              AD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

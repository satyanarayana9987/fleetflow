import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Truck,
  Route,
  Users,
  Car,
  Warehouse,
  UserCheck,
  FileText,
  BarChart3,
  Cpu,
  GitFork,
  Zap,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Box
} from 'lucide-react';

export default function Sidebar() {
  const {
    activePage,
    navigateTo,
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileDrawerOpen,
    setMobileDrawerOpen,
    alerts
  } = useApp();

  const navigationSections = [
    {
      title: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'Operations',
      items: [
        { id: 'shipments', label: 'Shipments', icon: Truck },
        { id: 'routes', label: 'Routes', icon: Route },
        { id: 'drivers', label: 'Drivers', icon: Users },
        { id: 'vehicles', label: 'Vehicles', icon: Car },
        { id: 'warehouses', label: 'Warehouses', icon: Warehouse }
      ]
    },
    {
      title: 'Management',
      items: [
        { id: 'customers', label: 'Customers', icon: UserCheck },
        { id: 'documents', label: 'Documents', icon: FileText }
      ]
    },
    {
      title: 'Intelligence',
      items: [
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'dsalab', label: 'DSA Lab', icon: Cpu, badge: 'Java API' },
        { id: 'networkflow', label: 'Network Flow', icon: GitFork },
        { id: 'optimization', label: 'Optimization', icon: Zap }
      ]
    },
    {
      title: 'System',
      items: [
        { id: 'notifications', label: 'Notifications', icon: Bell, badgeCount: alerts.length },
        { id: 'settings', label: 'Settings', icon: Settings }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileDrawerOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-slate-900 text-slate-300 border-r border-slate-800 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        } ${
          mobileDrawerOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800 shrink-0">
          <div
            className="flex items-center gap-3 cursor-pointer overflow-hidden"
            onClick={() => navigateTo('dashboard')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-900/30 shrink-0">
              <Box className="w-6 h-6 stroke-[2.5]" />
            </div>
            {!sidebarCollapsed && (
              <div className="animate-fade-in">
                <span className="font-extrabold text-lg text-white tracking-wide block leading-none">
                  Fleet<span className="text-blue-400">Flow</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-tight block mt-0.5 uppercase font-medium">
                  Logistics Platform
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation Links List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navigationSections.map((section, idx) => (
            <div key={idx}>
              {!sidebarCollapsed && (
                <div className="px-3 mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {section.title}
                </div>
              )}

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id || (activePage === 'shipment-details' && item.id === 'shipments');

                  return (
                    <button
                      key={item.id}
                      onClick={() => navigateTo(item.id)}
                      title={sidebarCollapsed ? item.label : undefined}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40 font-semibold'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                      } ${sidebarCollapsed ? 'justify-center' : ''}`}
                    >
                      <Icon className={`w-5 h-5 shrink-0 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />

                      {!sidebarCollapsed && (
                        <span className="flex-1 text-left truncate">{item.label}</span>
                      )}

                      {!sidebarCollapsed && item.badge && (
                        <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30">
                          {item.badge}
                        </span>
                      )}

                      {!sidebarCollapsed && item.badgeCount > 0 && (
                        <span className="px-2 py-0.5 text-[11px] font-bold bg-rose-500 text-white rounded-full">
                          {item.badgeCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Admin User Profile */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40 shrink-0">
          <div className={`flex items-center gap-3 p-2 rounded-xl bg-slate-800/40 border border-slate-800 ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="relative shrink-0">
              <div className="w-9 h-9 rounded-full bg-blue-900 text-blue-200 flex items-center justify-center font-bold text-sm border border-blue-700">
                AD
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
            </div>

            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-slate-200 truncate">Admin User</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                </div>
                <span className="text-xs text-emerald-400 block truncate">Online • Enterprise</span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

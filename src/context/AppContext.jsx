import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_KPI,
  INITIAL_SHIPMENTS,
  INITIAL_DRIVERS,
  INITIAL_VEHICLES,
  INITIAL_WAREHOUSES,
  ALERTS,
  CUSTOMERS,
  DOCUMENTS
} from '../data/mockData';
import { fleetApi } from '../services/api';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Helper for localStorage initial state
  const getStoredItem = (key, fallback) => {
    try {
      const stored = localStorage.getItem(`fleetflow_${key}`);
      return stored ? JSON.parse(stored) : fallback;
    } catch {
      return fallback;
    }
  };

  const [activePage, setActivePage] = useState('dashboard');
  const [selectedShipmentId, setSelectedShipmentId] = useState('SHP-2026-001245');
  
  const [shipments, setShipments] = useState(() => getStoredItem('shipments', INITIAL_SHIPMENTS));
  const [drivers, setDrivers] = useState(() => getStoredItem('drivers', INITIAL_DRIVERS));
  const [vehicles, setVehicles] = useState(() => getStoredItem('vehicles', INITIAL_VEHICLES));
  const [warehouses, setWarehouses] = useState(() => getStoredItem('warehouses', INITIAL_WAREHOUSES));
  const [alerts, setAlerts] = useState(() => getStoredItem('alerts', ALERTS));
  const [customers] = useState(CUSTOMERS);
  const [documents] = useState(DOCUMENTS);
  const [kpi] = useState(INITIAL_KPI);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [theme, setTheme] = useState('light');

  const [createShipmentModalOpen, setCreateShipmentModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fleetflow_shipments', JSON.stringify(shipments));
    } catch (e) { console.error(e); }
  }, [shipments]);

  useEffect(() => {
    try {
      localStorage.setItem('fleetflow_drivers', JSON.stringify(drivers));
    } catch (e) { console.error(e); }
  }, [drivers]);

  useEffect(() => {
    try {
      localStorage.setItem('fleetflow_vehicles', JSON.stringify(vehicles));
    } catch (e) { console.error(e); }
  }, [vehicles]);

  useEffect(() => {
    try {
      localStorage.setItem('fleetflow_warehouses', JSON.stringify(warehouses));
    } catch (e) { console.error(e); }
  }, [warehouses]);

  useEffect(() => {
    try {
      localStorage.setItem('fleetflow_alerts', JSON.stringify(alerts));
    } catch (e) { console.error(e); }
  }, [alerts]);

  // Toggle dark/light theme on body class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const navigateTo = (page, shipmentId = null) => {
    setActivePage(page);
    if (shipmentId) {
      setSelectedShipmentId(shipmentId);
    }
    setMobileDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateShipment = async (formData) => {
    const created = await fleetApi.createShipment(formData);
    setShipments(prev => [created, ...prev]);
    setCreateShipmentModalOpen(false);
    return created;
  };

  const updateShipmentStatus = (id, newStatus) => {
    setShipments(prev =>
      prev.map(s => {
        if (s.id === id) {
          const updatedTimeline = s.timeline.map(t => {
            if (t.step === newStatus || (newStatus === 'Delivered' && t.step === 'Delivered')) {
              return { ...t, completed: true, current: true };
            }
            return t;
          });
          return { ...s, status: newStatus, timeline: updatedTimeline };
        }
        return s;
      })
    );
  };

  const markAlertAsRead = (alertId) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  const value = {
    activePage,
    setActivePage,
    navigateTo,
    selectedShipmentId,
    setSelectedShipmentId,
    shipments,
    setShipments,
    drivers,
    setDrivers,
    vehicles,
    setVehicles,
    warehouses,
    setWarehouses,
    alerts,
    setAlerts,
    customers,
    documents,
    kpi,
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileDrawerOpen,
    setMobileDrawerOpen,
    globalSearch,
    setGlobalSearch,
    theme,
    toggleTheme,
    createShipmentModalOpen,
    setCreateShipmentModalOpen,
    helpModalOpen,
    setHelpModalOpen,
    handleCreateShipment,
    updateShipmentStatus,
    markAlertAsRead
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import ShipmentFormModal from './components/shipments/ShipmentFormModal';
import HelpModal from './components/common/HelpModal';

import Dashboard from './pages/Dashboard';
import Shipments from './pages/Shipments';
import ShipmentDetails from './pages/ShipmentDetails';
import Routes from './pages/Routes';
import Drivers from './pages/Drivers';
import Vehicles from './pages/Vehicles';
import Warehouses from './pages/Warehouses';
import Customers from './pages/Customers';
import Documents from './pages/Documents';
import Analytics from './pages/Analytics';
import DSALab from './pages/DSALab';
import NetworkFlow from './pages/NetworkFlow';
import Optimization from './pages/Optimization';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';

function MainLayout() {
  const {
    activePage,
    sidebarCollapsed,
    createShipmentModalOpen,
    setCreateShipmentModalOpen,
    helpModalOpen,
    setHelpModalOpen
  } = useApp();

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'shipments':
        return <Shipments />;
      case 'shipment-details':
        return <ShipmentDetails />;
      case 'routes':
        return <Routes />;
      case 'drivers':
        return <Drivers />;
      case 'vehicles':
        return <Vehicles />;
      case 'warehouses':
        return <Warehouses />;
      case 'customers':
        return <Customers />;
      case 'documents':
        return <Documents />;
      case 'analytics':
        return <Analytics />;
      case 'dsalab':
        return <DSALab />;
      case 'networkflow':
        return <NetworkFlow />;
      case 'optimization':
        return <Optimization />;
      case 'notifications':
        return <Notifications />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <Sidebar />
      <Navbar />

      <main className={`flex-1 transition-all duration-300 p-4 md:p-6 lg:p-8 ${
        sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
      }`}>
        <div className="max-w-7xl mx-auto space-y-6">
          {renderPage()}
        </div>
      </main>

      {/* Global Modals */}
      <ShipmentFormModal
        isOpen={createShipmentModalOpen}
        onClose={() => setCreateShipmentModalOpen(false)}
      />

      <HelpModal
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

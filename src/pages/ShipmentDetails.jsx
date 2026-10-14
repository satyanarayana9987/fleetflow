import React from 'react';
import { useApp } from '../context/AppContext';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import ShipmentMap from '../components/shipments/ShipmentMap';
import {
  ArrowLeft,
  Truck,
  MapPin,
  User,
  Car,
  FileText,
  Clock,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Download
} from 'lucide-react';

export default function ShipmentDetails() {
  const { shipments, selectedShipmentId, navigateTo } = useApp();
  const shipment = shipments.find((s) => s.id === selectedShipmentId) || shipments[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Navigation Back Banner */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('shipments')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Shipments</span>
        </button>

        <div className="flex items-center gap-2">
          <Badge status={shipment.status} text={shipment.status.toUpperCase()} />
          <span className="text-xs text-slate-400 font-mono">Created: {shipment.createdDate}</span>
        </div>
      </div>

      {/* Main Header Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 card-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-mono my-0">
              {shipment.id}
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
              {shipment.priority} Priority
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 mt-2 font-medium">
            <MapPin className="w-4 h-4 text-emerald-500" />
            <span className="font-bold">{shipment.originCity}</span>
            <span className="text-slate-400">→</span>
            <span className="font-bold text-blue-600 dark:text-blue-400">{shipment.destinationCity}</span>
            <span className="text-slate-400 text-xs font-normal">({shipment.distanceKm} km transit path)</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" icon={FileText} onClick={() => navigateTo('documents')}>
            View POD Documents
          </Button>
          <Button variant="primary" icon={Truck} onClick={() => navigateTo('routes')}>
            Optimize Route Path
          </Button>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 card-shadow space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          Fulfillment & Dispatch Timeline
        </h3>

        {/* Horizontal Stepper Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-7 gap-3 relative py-4">
          {shipment.timeline.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center">
              {/* Stepper Dot */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs z-10 transition-all ${
                  step.current
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-950 scale-110 shadow-lg'
                    : step.completed
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-300 dark:border-slate-700'
                }`}
              >
                {step.completed ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
              </div>

              {/* Step Info */}
              <div className="mt-3 space-y-1">
                <span className={`text-xs font-bold block ${step.current ? 'text-blue-600 dark:text-blue-400' : 'text-slate-800 dark:text-slate-200'}`}>
                  {step.step}
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">{step.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map & Specs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Vector Map */}
        <div className="lg:col-span-7 space-y-4">
          <ShipmentMap
            origin={shipment.originCity}
            destination={shipment.destinationCity}
            currentLocation={shipment.currentLocation}
          />
        </div>

        {/* Right Column: Key Details & Documents */}
        <div className="lg:col-span-5 space-y-4">
          {/* Package & Customer Card */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 card-shadow space-y-4">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
              Consignment & Customer Specs
            </h4>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">CUSTOMER</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{shipment.customer}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">CONTACT</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">{shipment.customerContact}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">CARGO TYPE</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{shipment.packageType}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">GROSS WEIGHT</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{shipment.weight}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-400 block text-[10px] mb-1">DESTINATION ADDRESS</span>
              <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                {shipment.destinationAddress}
              </p>
            </div>
          </div>

          {/* Driver & Telematics Card */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 card-shadow space-y-4">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
              Assigned Fleet & Driver
            </h4>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">DRIVER</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{shipment.driver}</span>
                <span className="text-[10px] text-slate-400 block">{shipment.driverPhone}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">VEHICLE</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 font-mono">{shipment.vehicle}</span>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 card-shadow space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Shipment Documents</h4>

            {shipment.documents && shipment.documents.length > 0 ? (
              shipment.documents.map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">{doc.name}</span>
                  </div>
                  <button className="p-1 text-slate-400 hover:text-blue-600">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400">No documents uploaded for this shipment yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

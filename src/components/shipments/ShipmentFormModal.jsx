import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { Truck, MapPin, User, Calendar, AlertCircle } from 'lucide-react';

export default function ShipmentFormModal({ isOpen, onClose }) {
  const { handleCreateShipment, drivers, vehicles, warehouses } = useApp();

  const [formData, setFormData] = useState({
    customer: '',
    customerContact: '',
    packageType: 'General Cargo',
    weight: '250 kg',
    priority: 'Medium',
    originWarehouse: 'Hyderabad Central Hub',
    originAddress: 'ORR Exit 10, Patancheru Industrial Area, Hyderabad',
    destinationCity: 'Vijayawada',
    destinationAddress: '',
    destinationState: 'Andhra Pradesh',
    destinationPostalCode: '520007',
    driver: drivers[0]?.name || 'Rajesh Sharma',
    vehicle: vehicles[0]?.number || 'AP-09-CB-4892',
    expectedDate: '2026-10-07',
    instructions: 'Handle with care. Temperature sensitive.'
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.customer.trim()) errs.customer = 'Customer name is required';
    if (!formData.destinationAddress.trim()) errs.destinationAddress = 'Destination address is required';
    if (!formData.destinationCity.trim()) errs.destinationCity = 'Destination city is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await handleCreateShipment(formData);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Logistics Shipment"
      subtitle="Dispatch order registration & automated driver assignment"
      maxWidth="max-w-3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6 text-xs md:text-sm">
        {/* Section 1: Shipment Info */}
        <div>
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Truck className="w-4 h-4 text-blue-600" />
            <span>1. Shipment Information</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Customer / Enterprise Name *
              </label>
              <input
                type="text"
                placeholder="e.g. TechCorp Solutions India"
                value={formData.customer}
                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.customer && (
                <span className="text-rose-500 text-[11px] flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {errors.customer}
                </span>
              )}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Customer Phone / Contact
              </label>
              <input
                type="text"
                placeholder="e.g. Ramesh (+91 98765 43210)"
                value={formData.customerContact}
                onChange={(e) => setFormData({ ...formData, customerContact: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Package Type</label>
              <select
                value={formData.packageType}
                onChange={(e) => setFormData({ ...formData, packageType: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="General Cargo">General Cargo</option>
                <option value="Electronics & Components">Electronics & Components</option>
                <option value="Cold Storage Vaccines">Cold Storage Vaccines / Pharma</option>
                <option value="Heavy Machinery Spares">Heavy Machinery Spares</option>
                <option value="Textiles & Apparel">Textiles & Apparel</option>
                <option value="Automotive Assemblies">Automotive Assemblies</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Weight</label>
                <input
                  type="text"
                  placeholder="e.g. 450 kg"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Express">Express</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Origin & Destination */}
        <div>
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>2. Origin & Destination Node</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Dispatch Warehouse</label>
              <select
                value={formData.originWarehouse}
                onChange={(e) => setFormData({ ...formData, originWarehouse: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {warehouses.map((w) => (
                  <option key={w.id} value={w.name}>{w.name} ({w.city})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Destination City *</label>
              <input
                type="text"
                placeholder="e.g. Vijayawada, Guntur, Bengaluru..."
                value={formData.destinationCity}
                onChange={(e) => setFormData({ ...formData, destinationCity: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.destinationCity && (
                <span className="text-rose-500 text-[11px] flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {errors.destinationCity}
                </span>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Delivery Address *</label>
              <input
                type="text"
                placeholder="Plot / Street / Industrial Area / Landmark"
                value={formData.destinationAddress}
                onChange={(e) => setFormData({ ...formData, destinationAddress: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.destinationAddress && (
                <span className="text-rose-500 text-[11px] flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {errors.destinationAddress}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Driver & Fleet Assignment */}
        <div>
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
            <User className="w-4 h-4 text-purple-600" />
            <span>3. Fleet & Driver Assignment</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Assigned Driver</label>
              <select
                value={formData.driver}
                onChange={(e) => setFormData({ ...formData, driver: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {drivers.map((d) => (
                  <option key={d.id} value={d.name}>{d.name} ({d.status})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Assigned Vehicle</label>
              <select
                value={formData.vehicle}
                onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {vehicles.map((v) => (
                  <option key={v.id} value={`${v.number} (${v.type})`}>{v.number} - {v.type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 4: Delivery Target */}
        <div>
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Calendar className="w-4 h-4 text-amber-600" />
            <span>4. Delivery Schedule</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Expected Delivery Date</label>
              <input
                type="date"
                value={formData.expectedDate}
                onChange={(e) => setFormData({ ...formData, expectedDate: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Special Instructions</label>
              <input
                type="text"
                placeholder="e.g. Call before delivery, Gate 4 entry"
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? 'Creating Shipment...' : 'Save Shipment Order'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Button from '../components/common/Button';
import { Settings as SettingsIcon, Terminal, Shield, User, Bell, Palette, Globe, CheckCircle2 } from 'lucide-react';
import { BASE_URL } from '../services/api';

export default function Settings() {
  const { theme, toggleTheme } = useApp();
  const [saved, setSaved] = useState(false);

  const [apiUrl, setApiUrl] = useState(BASE_URL);
  const [metricSystem, setMetricSystem] = useState('Metric (km, kg)');

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 card-shadow">
        <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight my-0">
          System Preferences & API Config
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Spring Boot REST backend connectivity, authentication keys, and platform settings.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Spring Boot API Integration */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 card-shadow space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Terminal className="w-5 h-5 text-blue-600" />
            <span>Spring Boot REST API Integration</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Backend Base Endpoint URL</label>
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Standard default endpoint for Spring Boot Java REST backend: <code className="text-blue-500">http://localhost:9090/api</code>
              </span>
            </div>

            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
              <span className="font-semibold">Offline Fallback Engine Active:</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-600 text-white">READY FOR BACKEND</span>
            </div>
          </div>
        </div>

        {/* Section 2: Profile & Security */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 card-shadow space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            <User className="w-5 h-5 text-purple-600" />
            <span>Administrator Profile & System Preferences</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Admin User Name</label>
              <input
                type="text"
                defaultValue="System Admin"
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Contact Email</label>
              <input
                type="email"
                defaultValue="admin@fleetflow.logistics.io"
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Measurement System</label>
              <select
                value={metricSystem}
                onChange={(e) => setMetricSystem(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none"
              >
                <option value="Metric (km, kg)">Metric System (Kilometers, Kilograms)</option>
                <option value="Imperial (miles, lbs)">Imperial System (Miles, Pounds)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Theme Preferences</label>
              <button
                type="button"
                onClick={toggleTheme}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold cursor-pointer text-left"
              >
                Current Mode: <span className="capitalize font-bold text-blue-600 dark:text-blue-400">{theme} Mode</span> (Click to switch)
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between pt-2">
          {saved ? (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> System Preferences Saved Successfully
            </span>
          ) : (
            <span />
          )}

          <Button type="submit" variant="primary">
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
}

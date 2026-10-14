import React, { useState } from 'react';
import { Navigation, MapPin, Compass, ShieldCheck, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react';

export default function ShipmentMap({ origin = 'Hyderabad', destination = 'Vijayawada', currentLocation }) {
  const [zoom, setZoom] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <div className="bg-slate-950 text-slate-100 rounded-xl p-5 border border-slate-800 shadow-xl overflow-hidden relative">
      {/* Map Header Overlay */}
      <div className="flex items-center justify-between mb-4 z-10 relative">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              GPS Telemetry & Route Map
              <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Telematics
              </span>
            </h4>
            <p className="text-xs text-slate-400">{origin} → {destination} Highway Corridor</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className={`p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800 text-xs transition-all ${
              refreshing ? 'animate-spin' : ''
            }`}
            title="Refresh GPS Feed"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(z => Math.min(z + 0.2, 1.6))}
            className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800 text-xs"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(z => Math.max(z - 0.2, 0.8))}
            className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800 text-xs"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Vector Map Graphic Canvas */}
      <div className="relative h-64 md:h-72 w-full bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
        {/* SVG Grid Overlay */}
        <div
          className="absolute inset-0 transition-transform duration-300"
          style={{
            backgroundImage: `radial-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            transform: `scale(${zoom})`
          }}
        />

        <svg
          className="w-full h-full absolute inset-0 transition-transform duration-300"
          style={{ transform: `scale(${zoom})` }}
          viewBox="0 0 800 350"
        >
          {/* Topo Roads Grid */}
          <path d="M 50 100 Q 200 40 400 120 T 750 80" fill="none" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 80 300 Q 300 320 500 200 T 720 280" fill="none" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />

          {/* Primary Highway Path */}
          <path
            id="route-path"
            d="M 120 220 C 240 120, 360 280, 480 160 C 560 80, 640 180, 680 140"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Glowing Animated Route Trace */}
          <path
            d="M 120 220 C 240 120, 360 280, 480 160 C 560 80, 640 180, 680 140"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="3"
            strokeDasharray="12 12"
            className="animate-pulse"
          />

          {/* Origin Marker (Hyderabad) */}
          <g transform="translate(120, 220)">
            <circle r="14" fill="#1e40af" opacity="0.4" />
            <circle r="8" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
            <text x="0" y="30" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">
              {origin} (Origin)
            </text>
          </g>

          {/* Intermediate Waypoint (Suryapet) */}
          <g transform="translate(360, 220)">
            <circle r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
            <text x="0" y="-14" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="500">
              Suryapet Toll
            </text>
          </g>

          {/* Live Vehicle Moving Marker */}
          <g transform="translate(480, 160)">
            <circle r="18" fill="#3b82f6" opacity="0.3" className="animate-ping" />
            <circle r="10" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
            <foreignObject x="-10" y="-10" width="20" height="20">
              <div className="flex items-center justify-center text-white">
                <Navigation className="w-4 h-4 transform rotate-45" />
              </div>
            </foreignObject>
            <text x="0" y="-22" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">
              GPS Ping (Active)
            </text>
          </g>

          {/* Destination Marker (Vijayawada) */}
          <g transform="translate(680, 140)">
            <circle r="14" fill="#065f46" opacity="0.4" />
            <circle r="8" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
            <text x="0" y="30" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">
              {destination} (Dest)
            </text>
          </g>
        </svg>

        {/* Floating Telemetry Info Pill */}
        <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="text-slate-400 block text-[10px]">Current Location</span>
              <span className="font-semibold text-white">{currentLocation || 'NH65 Suryapet Bypass (km 142)'}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <div>
              <span className="text-slate-400 block text-[10px]">Speed</span>
              <span className="font-mono font-bold text-blue-400">68 km/h</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Distance Remaining</span>
              <span className="font-mono font-bold text-amber-400">133 km</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Signal Status</span>
              <span className="font-medium text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 5G Satellite
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

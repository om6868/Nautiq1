import React from 'react';
import { Navigation, Compass, Wind, Waves, MapPin, CheckCircle, Ship, AlertCircle } from 'lucide-react';
import { PORTS } from '../data/ports';
import { CandidatePlan, VoyageInput } from '../types';

interface RouteVisualizerProps {
  voyageInput: VoyageInput;
  activePlan: CandidatePlan;
}

export const RouteVisualizer: React.FC<RouteVisualizerProps> = ({ voyageInput, activePlan }) => {
  const origin = PORTS.find(p => p.id === voyageInput.originPortId) || PORTS[0];
  const dest = PORTS.find(p => p.id === voyageInput.destPortId) || PORTS[1];

  const waypoints = [
    { name: origin.name, sub: 'Bunkering & Loading', status: 'Origin' },
    { name: 'Arabian Sea Corridor', sub: 'Calm Sea State • 1.2m Swell', status: 'Transit' },
    { name: 'Dondra Head (Sri Lanka)', sub: 'Favorable East-Bound Current (+0.4 kts)', status: 'Waypoint' },
    { name: 'Malacca Strait Entry', sub: 'Slow-Steaming Regulated Zone', status: 'Eco Zone' },
    { name: dest.name, sub: 'Berth Window: Confirmed', status: 'Destination' }
  ];

  return (
    <div className="bg-[#0B132B]/90 backdrop-blur-md rounded-2xl p-5 border border-sky-900/30 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-slate-800">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Navigation className="w-4 h-4 text-sky-400" />
            <span>Maritime Navigation Corridor & Oceanographic State</span>
          </h4>
          <p className="text-xs text-slate-400">
            Current trajectory: <strong className="text-slate-200">{activePlan.routeName}</strong> ({voyageInput.distanceNM.toLocaleString()} NM)
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-500/30 font-mono">
            <Wind className="w-3 h-3 text-sky-400" />
            <span>SW Monsoon 14 kts</span>
          </span>
          <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-mono">
            <Waves className="w-3 h-3 text-emerald-400" />
            <span>Sea State 3</span>
          </span>
        </div>
      </div>

      {/* Schematic Stepper / Route Corridor */}
      <div className="relative pt-3 pb-2">
        <div className="hidden md:block absolute top-1/2 left-6 right-6 h-0.5 bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-400 -translate-y-1/2 z-0" />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative z-10">
          {waypoints.map((wp, idx) => (
            <div
              key={idx}
              className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 flex flex-col justify-between space-y-2 hover:border-sky-500/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-sky-300 font-mono">
                  WP 0{idx + 1}
                </span>
                {idx === 0 || idx === 4 ? (
                  <MapPin className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Compass className="w-3.5 h-3.5 text-teal-400" />
                )}
              </div>

              <div>
                <span className="text-xs font-bold text-white block">{wp.name}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5 leading-tight">{wp.sub}</span>
              </div>

              <div className="text-[10px] font-medium text-emerald-400 flex items-center gap-1 pt-1 border-t border-slate-800">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                <span>{wp.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-slate-300">
        <div className="flex items-center space-x-2">
          <Ship className="w-4 h-4 text-sky-400" />
          <span>Vessel: <strong>{voyageInput.vesselType}</strong> at <strong>{activePlan.speedKnots} knots</strong></span>
        </div>
        <div className="flex items-center space-x-2">
          <span>Active Plan Fuel: <strong className="text-emerald-400">{activePlan.fuelType}</strong></span>
          <span>•</span>
          <span>ETA Duration: <strong className="text-sky-300">{activePlan.durationHours} hrs ({activePlan.durationDays} d)</strong></span>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Navigation, Compass, Wind, Waves, MapPin, CheckCircle, Ship } from 'lucide-react';
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
    { name: origin.name.split(' ')[0], sub: 'Origin Port', status: 'Origin' },
    { name: 'Arabian Sea', sub: 'Calm Sea State', status: 'Transit' },
    { name: 'Sri Lanka Passage', sub: 'Current +0.4 kts', status: 'Waypoint' },
    { name: 'Malacca Strait', sub: 'Eco Zone', status: 'Eco Zone' },
    { name: dest.name.split(' ')[0], sub: 'Destination Port', status: 'Destination' }
  ];

  return (
    <div className="bg-white rounded-lg p-4 border border-[#D9E2DE] shadow-sm space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-1 border-b border-[#D9E2DE]">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#16324F] flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-[#258F87]" />
            <span>Navigation Route & Ocean Conditions</span>
          </h4>
          <p className="text-xs text-[#64748B]">
            Route: <strong className="text-[#16324F]">{activePlan.routeName}</strong> ({voyageInput.distanceNM.toLocaleString()} NM)
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="flex items-center space-x-1 px-2 py-0.5 rounded bg-[#F8FAF9] text-[#16324F] border border-[#D9E2DE]">
            <Wind className="w-3 h-3 text-[#258F87]" />
            <span>14 kts Wind</span>
          </span>
          <span className="flex items-center space-x-1 px-2 py-0.5 rounded bg-[#F8FAF9] text-[#16324F] border border-[#D9E2DE]">
            <Waves className="w-3 h-3 text-[#258F87]" />
            <span>Sea State 3</span>
          </span>
        </div>
      </div>

      {/* Schematic Stepper / Route Corridor */}
      <div className="relative pt-2 pb-1">
        <div className="hidden md:block absolute top-1/2 left-6 right-6 h-0.5 bg-[#D9E2DE] -translate-y-1/2 z-0" />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 relative z-10">
          {waypoints.map((wp, idx) => (
            <div
              key={idx}
              className="bg-[#F8FAF9] rounded-md p-2.5 border border-[#D9E2DE] flex flex-col justify-between space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#64748B] font-mono">
                  WP 0{idx + 1}
                </span>
                {idx === 0 || idx === 4 ? (
                  <MapPin className="w-3.5 h-3.5 text-[#258F87]" />
                ) : (
                  <Compass className="w-3.5 h-3.5 text-[#64748B]" />
                )}
              </div>

              <div>
                <span className="text-xs font-semibold text-[#16324F] block">{wp.name}</span>
                <span className="text-[10px] text-[#64748B] block">{wp.sub}</span>
              </div>

              <div className="text-[10px] text-[#258F87] flex items-center gap-1 pt-1 border-t border-[#D9E2DE]">
                <CheckCircle className="w-3 h-3" />
                <span>{wp.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs bg-[#F8FAF9] p-2.5 rounded-md border border-[#D9E2DE] text-[#64748B]">
        <div className="flex items-center space-x-1.5">
          <Ship className="w-3.5 h-3.5 text-[#258F87]" />
          <span>Vessel: <strong className="text-[#16324F]">{voyageInput.vesselType}</strong> ({activePlan.speedKnots} kts)</span>
        </div>
        <div>
          <span>Fuel: <strong className="text-[#258F87]">{activePlan.fuelType}</strong></span>
          <span className="mx-1.5 text-[#D9E2DE]">•</span>
          <span>Duration: <strong className="text-[#16324F]">{activePlan.durationHours} hrs ({activePlan.durationDays}d)</strong></span>
        </div>
      </div>
    </div>
  );
};

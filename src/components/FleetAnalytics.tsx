import React from 'react';
import { BarChart3, ShieldCheck } from 'lucide-react';
import { CostEmissionChart } from './Charts/CostEmissionChart';
import { FuelEmissionChart } from './Charts/FuelEmissionChart';
import { VoyageInput } from '../types';
import { optimizeVoyage } from '../utils/quantumOptimizer';

interface FleetAnalyticsProps {
  voyageInput: VoyageInput;
}

export const FleetAnalytics: React.FC<FleetAnalyticsProps> = ({ voyageInput }) => {
  const optimizationResult = optimizeVoyage(voyageInput);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-teal-400" />
          <span>Fleet Decarbonization & Operational Analytics</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Fleet-wide carbon reduction metrics, bunker consumption trends, and IMO regulatory compliance.
        </p>
      </div>

      {/* 4 Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Total Fuel Saved</span>
          <div className="text-2xl font-bold font-mono text-teal-400">1,480 MT</div>
          <span className="text-[11px] text-slate-400">12.8% fleet reduction</span>
        </div>

        <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">CO₂ Avoided</span>
          <div className="text-2xl font-bold font-mono text-teal-400">4,620 MT</div>
          <span className="text-[11px] text-slate-400">Net emissions avoided</span>
        </div>

        <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Cost Savings</span>
          <div className="text-2xl font-bold font-mono text-slate-100">₹3.07 Cr</div>
          <span className="text-[11px] text-slate-400">₹2.4L average per voyage</span>
        </div>

        <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">CII Fleet Grade</span>
          <div className="text-2xl font-bold font-mono text-teal-300">A / B Avg</div>
          <span className="text-[11px] text-slate-400">IMO 2030 Compliant</span>
        </div>
      </div>

      {/* Dual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <CostEmissionChart plans={optimizationResult.plans} />
        <FuelEmissionChart voyageInput={voyageInput} />
      </div>

      {/* Operational Highlights */}
      <div className="rounded-lg bg-slate-900 p-4 border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          <span>Fleet Optimization Insights</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="p-3 bg-slate-800 rounded border border-slate-700 space-y-1">
            <strong className="text-slate-200 block">EU ETS & Maritime Regulations</strong>
            <p className="text-slate-400">Automated carbon footprint tracking ensures compliance with maritime green corridor mandates.</p>
          </div>
          <div className="p-3 bg-slate-800 rounded border border-slate-700 space-y-1">
            <strong className="text-slate-200 block">Bunker Arbitrage</strong>
            <p className="text-slate-400">Optimized port bunkering recommendations save 4-7% by timing fuel procurement at major hubs.</p>
          </div>
          <div className="p-3 bg-slate-800 rounded border border-slate-700 space-y-1">
            <strong className="text-slate-200 block">Dynamic Speed Throttling</strong>
            <p className="text-slate-400">Allows vessels to slow steam without missing port berth windows, cutting unnecessary fuel burn.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

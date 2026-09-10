import React from 'react';
import { BarChart3, TrendingDown, Leaf, IndianRupee, ShieldCheck, Ship, ArrowUpRight } from 'lucide-react';
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-sky-400" />
            <span>Fleet Decarbonization & Operational Analytics</span>
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Fleet-wide carbon reduction metrics, bunker consumption trends, and IMO regulatory compliance.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs px-3 py-1 rounded-full bg-sky-950 text-sky-300 border border-sky-500/40 font-mono">
            128 Active Fleet Voyages
          </span>
        </div>
      </div>

      {/* 4 Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0B132B]/80 rounded-2xl p-5 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 uppercase font-semibold">Total Fuel Saved</span>
          <div className="text-3xl font-black font-mono text-emerald-400">1,480 MT</div>
          <span className="text-[11px] text-slate-400">12.8% reduction across all corridors</span>
        </div>

        <div className="bg-[#0B132B]/80 rounded-2xl p-5 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 uppercase font-semibold">CO₂ Emissions Avoided</span>
          <div className="text-3xl font-black font-mono text-teal-300">4,620 MT</div>
          <span className="text-[11px] text-slate-400">Equivalent to 1,000+ cars off road</span>
        </div>

        <div className="bg-[#0B132B]/80 rounded-2xl p-5 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 uppercase font-semibold">Cumulative Cost Savings</span>
          <div className="text-3xl font-black font-mono text-sky-400">₹3.07 Cr</div>
          <span className="text-[11px] text-slate-400">₹2.4L average per voyage</span>
        </div>

        <div className="bg-[#0B132B]/80 rounded-2xl p-5 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 uppercase font-semibold">CII Fleet Grade</span>
          <div className="text-3xl font-black font-mono text-emerald-400">A / B Avg</div>
          <span className="text-[11px] text-slate-400">100% IMO 2030 CII Compliant</span>
        </div>
      </div>

      {/* Dual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CostEmissionChart plans={optimizationResult.plans} />
        <FuelEmissionChart voyageInput={voyageInput} />
      </div>

      {/* Operational Highlights */}
      <div className="rounded-2xl bg-gradient-to-r from-sky-950/50 via-slate-900/80 to-emerald-950/50 p-6 border border-sky-800/30 space-y-3">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Fleet Optimization Insights & Regulatory Alignment</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300 pt-1">
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
            <strong className="text-sky-300 block">EU ETS & FuelEU Maritime</strong>
            <p>Automated carbon footprint tracking ensures penalty-free compliance with European and Indian Green Corridor mandates.</p>
          </div>
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
            <strong className="text-emerald-300 block">Bunker Arbitrage</strong>
            <p>Smart port bunkering recommendations save 4-7% by timing fuel procurement at optimal bunkering hubs like Singapore & Rotterdam.</p>
          </div>
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
            <strong className="text-teal-300 block">Dynamic Speed Throttling</strong>
            <p>Real-time terminal congestion tracking allows vessels to slow steam without incurring port delays, eliminating wasted fuel at anchorage.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

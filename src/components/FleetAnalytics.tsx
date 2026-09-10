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
      <div className="pb-2 border-b border-[#D9E2DE]">
        <h2 className="text-xl font-bold text-[#16324F] flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#258F87]" />
          <span>Fleet Decarbonization & Operational Analytics</span>
        </h2>
        <p className="text-xs text-[#64748B] mt-0.5">
          Fleet-wide carbon reduction metrics, bunker consumption trends, and IMO regulatory compliance.
        </p>
      </div>

      {/* 4 Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-lg p-4 border border-[#D9E2DE] shadow-sm space-y-1">
          <span className="text-xs text-[#64748B] font-medium">Total Fuel Saved</span>
          <div className="text-2xl font-bold font-mono text-[#5B8C72]">1,480 MT</div>
          <span className="text-[11px] text-[#64748B]">12.8% fleet reduction</span>
        </div>

        <div className="bg-white rounded-lg p-4 border border-[#D9E2DE] shadow-sm space-y-1">
          <span className="text-xs text-[#64748B] font-medium">CO₂ Avoided</span>
          <div className="text-2xl font-bold font-mono text-[#5B8C72]">4,620 MT</div>
          <span className="text-[11px] text-[#64748B]">Net emissions avoided</span>
        </div>

        <div className="bg-white rounded-lg p-4 border border-[#D9E2DE] shadow-sm space-y-1">
          <span className="text-xs text-[#64748B] font-medium">Cost Savings</span>
          <div className="text-2xl font-bold font-mono text-[#16324F]">₹3.07 Cr</div>
          <span className="text-[11px] text-[#64748B]">₹2.4L average per voyage</span>
        </div>

        <div className="bg-white rounded-lg p-4 border border-[#D9E2DE] shadow-sm space-y-1">
          <span className="text-xs text-[#64748B] font-medium">CII Fleet Grade</span>
          <div className="text-2xl font-bold font-mono text-[#258F87]">A / B Avg</div>
          <span className="text-[11px] text-[#64748B]">IMO 2030 Compliant</span>
        </div>
      </div>

      {/* Dual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <CostEmissionChart plans={optimizationResult.plans} />
        <FuelEmissionChart voyageInput={voyageInput} />
      </div>

      {/* Operational Highlights */}
      <div className="rounded-lg bg-white p-4 border border-[#D9E2DE] shadow-sm space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#16324F] flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#258F87]" />
          <span>Fleet Optimization Insights</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-[#1F2937]">
          <div className="p-3 bg-[#F8FAF9] rounded border border-[#D9E2DE] space-y-1">
            <strong className="text-[#16324F] block">EU ETS & Maritime Regulations</strong>
            <p className="text-[#64748B]">Automated carbon footprint tracking ensures compliance with maritime green corridor mandates.</p>
          </div>
          <div className="p-3 bg-[#F8FAF9] rounded border border-[#D9E2DE] space-y-1">
            <strong className="text-[#16324F] block">Bunker Arbitrage</strong>
            <p className="text-[#64748B]">Optimized port bunkering recommendations save 4-7% by timing fuel procurement at major hubs.</p>
          </div>
          <div className="p-3 bg-[#F8FAF9] rounded border border-[#D9E2DE] space-y-1">
            <strong className="text-[#16324F] block">Dynamic Speed Throttling</strong>
            <p className="text-[#64748B]">Allows vessels to slow steam without missing port berth windows, cutting unnecessary fuel burn.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

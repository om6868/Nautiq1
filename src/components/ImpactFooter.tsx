import React from 'react';
import { Gauge, IndianRupee, Leaf } from 'lucide-react';

export const ImpactFooter: React.FC = () => {
  return (
    <footer className="mt-12 pt-8 pb-10 border-t border-[#D9E2DE] space-y-6">
      {/* NautiQ Impact Section */}
      <div className="text-center max-w-2xl mx-auto space-y-1">
        <h3 className="text-lg font-bold text-[#16324F]">
          NautiQ Impact: <span className="text-[#258F87]">Lower Fuel → Lower Cost → Lower Emissions</span>
        </h3>
        <p className="text-xs text-[#64748B]">
          Decarbonizing maritime fleets through computational intelligence and green fuels.
        </p>
      </div>

      {/* 3 Impact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {/* Card 1: Fuel Efficiency */}
        <div className="rounded-lg bg-white border border-[#D9E2DE] shadow-sm p-4 space-y-2">
          <div className="w-8 h-8 rounded bg-[#EDF5F1] flex items-center justify-center border border-[#D9E2DE] text-[#258F87]">
            <Gauge className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-[#16324F]">Fuel Efficiency</h4>
          <p className="text-xs text-[#64748B] leading-relaxed">
            By exploiting the non-linear cubic propulsion curve (<span className="font-mono text-[#258F87]">P ∝ v³</span>), NautiQ cuts unnecessary fuel burn without sacrificing schedule reliability.
          </p>
          <div className="text-[11px] font-medium text-[#5B8C72] pt-1 border-t border-[#D9E2DE]">
            • Up to 15% lower fuel consumption
          </div>
        </div>

        {/* Card 2: Cost Optimization */}
        <div className="rounded-lg bg-white border border-[#D9E2DE] shadow-sm p-4 space-y-2">
          <div className="w-8 h-8 rounded bg-[#EDF5F1] flex items-center justify-center border border-[#D9E2DE] text-[#258F87]">
            <IndianRupee className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-[#16324F]">Cost Optimization</h4>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Multi-variable trade-off analysis shields shipping operators from bunker price volatility and carbon tax exposure, saving lakhs per voyage.
          </p>
          <div className="text-[11px] font-medium text-[#5B8C72] pt-1 border-t border-[#D9E2DE]">
            • ₹2.4L+ average savings per voyage
          </div>
        </div>

        {/* Card 3: Green Fleet */}
        <div className="rounded-lg bg-white border border-[#D9E2DE] shadow-sm p-4 space-y-2">
          <div className="w-8 h-8 rounded bg-[#EDF5F1] flex items-center justify-center border border-[#D9E2DE] text-[#258F87]">
            <Leaf className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-[#16324F]">Green Fleet Decarbonization</h4>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Integrates alternative fuels (Methanol, LNG, Ammonia) with verified port bunkering availability, empowering fleets to achieve IMO 2030 compliance.
          </p>
          <div className="text-[11px] font-medium text-[#5B8C72] pt-1 border-t border-[#D9E2DE]">
            • 18-25% immediate CO₂ reduction
          </div>
        </div>
      </div>

      {/* Bottom Metadata & Disclaimer */}
      <div className="border-t border-[#D9E2DE] pt-4 text-center">
        <p className="text-[11px] text-[#64748B]">
          Prototype using simulated hydrodynamic and operational data for demonstration purposes.
        </p>
      </div>
    </footer>
  );
};

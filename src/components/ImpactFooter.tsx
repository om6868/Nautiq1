import React from 'react';
import { Gauge, IndianRupee, Leaf } from 'lucide-react';

export const ImpactFooter: React.FC = () => {
  return (
    <footer className="mt-12 pt-8 pb-10 border-t border-slate-800 space-y-6">
      {/* NautiQ Impact Section */}
      <div className="text-center max-w-2xl mx-auto space-y-1">
        <h3 className="text-lg font-bold text-white">
          NautiQ Impact: <span className="text-teal-400">Lower Fuel → Lower Cost → Lower Emissions</span>
        </h3>
        <p className="text-xs text-slate-400">
          Decarbonizing maritime fleets through computational intelligence and green fuels.
        </p>
      </div>

      {/* 3 Impact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {/* Card 1: Fuel Efficiency */}
        <div className="rounded-lg bg-slate-900 border border-slate-800 p-4 space-y-2">
          <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center border border-slate-700 text-teal-400">
            <Gauge className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-white">Fuel Efficiency</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            By exploiting the non-linear cubic propulsion curve (<span className="font-mono text-teal-300">P ∝ v³</span>), NautiQ cuts unnecessary fuel burn without sacrificing schedule reliability.
          </p>
          <div className="text-[11px] font-medium text-teal-400 pt-1 border-t border-slate-800">
            • Up to 15% lower fuel consumption
          </div>
        </div>

        {/* Card 2: Cost Optimization */}
        <div className="rounded-lg bg-slate-900 border border-slate-800 p-4 space-y-2">
          <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center border border-slate-700 text-teal-400">
            <IndianRupee className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-white">Cost Optimization</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Multi-variable trade-off analysis shields shipping operators from bunker price volatility and carbon tax exposure, saving lakhs per voyage.
          </p>
          <div className="text-[11px] font-medium text-teal-400 pt-1 border-t border-slate-800">
            • ₹2.4L+ average savings per voyage
          </div>
        </div>

        {/* Card 3: Green Fleet */}
        <div className="rounded-lg bg-slate-900 border border-slate-800 p-4 space-y-2">
          <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center border border-slate-700 text-teal-400">
            <Leaf className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-white">Green Fleet Decarbonization</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Integrates alternative fuels (Methanol, LNG, Ammonia) with verified port bunkering availability, empowering fleets to achieve IMO 2030 compliance.
          </p>
          <div className="text-[11px] font-medium text-teal-400 pt-1 border-t border-slate-800">
            • 18-25% immediate CO₂ reduction
          </div>
        </div>
      </div>

      {/* Bottom Metadata & Disclaimer */}
      <div className="border-t border-slate-800/80 pt-4 text-center">
        <p className="text-[11px] text-slate-400">
          Prototype using simulated hydrodynamic and operational data for demonstration purposes.
        </p>
      </div>
    </footer>
  );
};

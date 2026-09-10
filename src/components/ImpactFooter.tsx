import React from 'react';
import { Gauge, IndianRupee, Leaf, Anchor, ShieldCheck } from 'lucide-react';

export const ImpactFooter: React.FC = () => {
  return (
    <footer className="mt-16 pt-10 pb-12 border-t border-sky-900/30 space-y-10">
      {/* NautiQ Impact Section */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
          Decarbonization at Scale
        </span>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          NautiQ Impact: <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">Lower Fuel → Lower Cost → Lower Emissions</span>
        </h2>
        <p className="text-sm text-slate-400">
          Transforming maritime operations through quantum-inspired computational intelligence and green fuels.
        </p>
      </div>

      {/* 3 Impact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Card 1: Fuel Efficiency */}
        <div className="rounded-2xl bg-[#0B132B]/80 border border-sky-900/40 p-6 space-y-3 hover:border-sky-500/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-sky-950 flex items-center justify-center border border-sky-800/50 text-sky-400">
            <Gauge className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Fuel Efficiency</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            By exploiting the non-linear cubic propulsion curve (<span className="font-mono text-emerald-400">P ∝ v³</span>) and live hydrodynamics, NautiQ cuts propulsive energy waste without sacrificing delivery reliability.
          </p>
          <div className="text-[11px] font-semibold text-sky-300 pt-2 border-t border-slate-800">
            • Up to 15% lower fuel consumption
          </div>
        </div>

        {/* Card 2: Cost Optimization */}
        <div className="rounded-2xl bg-[#0B132B]/80 border border-emerald-900/40 p-6 space-y-3 hover:border-emerald-500/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 flex items-center justify-center border border-emerald-800/50 text-emerald-400">
            <IndianRupee className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Cost Optimization</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Multi-variable trade-off analysis shields shipping operators from bunker price volatility and carbon tax exposure (EU ETS, IMO Net-Zero levy), saving lakhs per long-haul voyage.
          </p>
          <div className="text-[11px] font-semibold text-emerald-400 pt-2 border-t border-slate-800">
            • ₹2.4L+ average savings per voyage
          </div>
        </div>

        {/* Card 3: Green Fleet */}
        <div className="rounded-2xl bg-[#0B132B]/80 border border-teal-900/40 p-6 space-y-3 hover:border-teal-500/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-teal-950 flex items-center justify-center border border-teal-800/50 text-teal-400">
            <Leaf className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Green Fleet Decarbonization</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Integrates alternative fuels (Methanol, LNG, Ammonia) with verified port bunkering availability, empowering fleets to achieve IMO 2030 and 2050 Net-Zero compliance.
          </p>
          <div className="text-[11px] font-semibold text-teal-300 pt-2 border-t border-slate-800">
            • 18-25% immediate CO₂ reduction
          </div>
        </div>
      </div>

      {/* Bottom Metadata & Disclaimer */}
      <div className="border-t border-slate-800/80 pt-6 text-center space-y-2">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
          <span>Team: <strong className="text-slate-200">FlowState</strong></span>
          <span>•</span>
          <span>Problem Statement: <strong className="text-slate-200">SIH26138</strong></span>
          <span>•</span>
          <span>Theme: <strong className="text-emerald-400">Clean and Green Technology</strong></span>
        </div>
        <p className="text-[11px] text-slate-400 italic">
          Disclaimer: Prototype using simulated data for demonstration purposes. Production connects to live AIS vessel telemetry, ECMWF wave data, and physics-informed PINN neural models.
        </p>
      </div>
    </footer>
  );
};

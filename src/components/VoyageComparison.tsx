import React from 'react';
import { CandidatePlan } from '../types';
import { Fuel, IndianRupee, Leaf, Clock, Navigation, Gauge, Sparkles, Check, ArrowRight } from 'lucide-react';
import { formatINR, formatUSD } from '../utils/fuelPhysics';

interface VoyageComparisonProps {
  plans: CandidatePlan[];
  selectedPlanId: string;
  onSelectPlan: (planId: string) => void;
}

export const VoyageComparison: React.FC<VoyageComparisonProps> = ({
  plans,
  selectedPlanId,
  onSelectPlan
}) => {
  const ciiColors: Record<string, string> = {
    A: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
    B: 'bg-teal-500/20 text-teal-300 border-teal-500/50',
    C: 'bg-sky-500/20 text-sky-300 border-sky-500/50',
    D: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
    E: 'bg-rose-500/20 text-rose-300 border-rose-500/50'
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Candidate Voyage Plans Comparison</span>
          </h3>
          <p className="text-xs text-slate-400">
            Multi-objective Pareto comparison across speed, route corridor, and alternative fuels.
          </p>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          Current Plan → NautiQ Alternatives → Recommended
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {plans.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          const isRec = plan.isRecommended;

          return (
            <div
              key={plan.id}
              onClick={() => onSelectPlan(plan.id)}
              className={`relative rounded-2xl p-5 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                isRec
                  ? 'bg-gradient-to-b from-[#064E3B]/30 via-[#0B132B] to-[#070C18] border-2 border-emerald-500/60 shadow-xl shadow-emerald-950/40 glow-emerald scale-[1.02]'
                  : isSelected
                  ? 'bg-[#0B132B] border-2 border-sky-500/60 shadow-lg'
                  : 'bg-[#0B132B]/80 hover:bg-[#0B132B] border border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Top Badges */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      isRec
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                        : plan.id === 'current-plan'
                        ? 'bg-slate-800 text-slate-300 border-slate-700'
                        : 'bg-teal-950 text-teal-300 border-teal-600/40'
                    }`}
                  >
                    {plan.badge || plan.title}
                  </span>

                  <div className="flex items-center space-x-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${ciiColors[plan.ciiRating]}`}>
                      CII {plan.ciiRating}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-300 bg-slate-900/90 px-2 py-0.5 rounded-md border border-slate-700">
                      Score: {plan.overallScore}
                    </span>
                  </div>
                </div>

                <h4 className="text-lg font-bold text-white">{plan.title}</h4>
                <p className="text-xs text-slate-400 mb-4">{plan.tagline}</p>

                {/* Main Metrics Grid */}
                <div className="space-y-2.5 bg-slate-900/60 rounded-xl p-3.5 border border-slate-800/80 mb-4">
                  {/* Fuel & Speed */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Fuel className="w-3.5 h-3.5 text-slate-400" />
                      <span>Fuel & Speed:</span>
                    </span>
                    <span className="font-semibold text-white">
                      {plan.fuelType} @ <strong className="text-sky-300">{plan.speedKnots} kts</strong>
                    </span>
                  </div>

                  {/* Fuel Consumption */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-slate-400" />
                      <span>Fuel Burn:</span>
                    </span>
                    <span className="font-mono font-semibold text-slate-200">
                      {plan.fuelConsumptionTons} MT
                      {plan.fuelSavedPct !== 0 && (
                        <span className={`ml-1 text-[11px] ${plan.fuelSavedPct > 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                          ({plan.fuelSavedPct > 0 ? `-${plan.fuelSavedPct}%` : `+${Math.abs(plan.fuelSavedPct)}%`})
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Fuel Cost */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <IndianRupee className="w-3.5 h-3.5 text-slate-400" />
                      <span>Bunker Cost:</span>
                    </span>
                    <span className="font-mono font-bold text-emerald-400">
                      {formatINR(plan.fuelCostINR)}
                      {plan.costSavedPct !== 0 && (
                        <span className={`ml-1 text-[11px] font-normal ${plan.costSavedPct > 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                          ({plan.costSavedPct > 0 ? `-${plan.costSavedPct}%` : `+${Math.abs(plan.costSavedPct)}%`})
                        </span>
                      )}
                    </span>
                  </div>

                  {/* CO2 Emissions */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Leaf className="w-3.5 h-3.5 text-slate-400" />
                      <span>CO₂ Emissions:</span>
                    </span>
                    <span className="font-mono font-bold text-teal-300">
                      {plan.co2EmissionsTons} MT
                      {plan.co2ReducedPct !== 0 && (
                        <span className="ml-1 text-[11px] text-teal-400 font-normal">
                          (-{Math.abs(plan.co2ReducedPct)}%)
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Duration & ETA */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Duration / ETA:</span>
                    </span>
                    <span className="font-mono text-slate-200">
                      {plan.durationHours}h ({plan.durationDays}d)
                      {plan.etaDeltaHours !== 0 && (
                        <span className="ml-1 text-[11px] text-sky-400">
                          ({plan.etaDeltaHours > 0 ? `+${plan.etaDeltaHours}h` : `${plan.etaDeltaHours}h`})
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Route corridor */}
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5 text-slate-400" />
                      <span>Corridor:</span>
                    </span>
                    <span className="text-[11px] text-slate-300 font-medium truncate max-w-[150px]" title={plan.routeName}>
                      {plan.routeName}
                    </span>
                  </div>
                </div>

                {/* Key Highlights Bullet Points */}
                <div className="space-y-1.5 mb-4">
                  {plan.keyHighlights.map((highlight, i) => (
                    <div key={i} className="flex items-center space-x-1.5 text-xs text-slate-300">
                      <Check className={`w-3.5 h-3.5 shrink-0 ${isRec ? 'text-emerald-400' : 'text-sky-400'}`} />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action / Select Indicator */}
              <button
                type="button"
                className={`w-full py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 ${
                  isRec
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                    : isSelected
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <span>{isRec ? 'Select Recommended Plan' : isSelected ? 'Active Selection' : 'Inspect Plan'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

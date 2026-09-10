import React from 'react';
import { CandidatePlan } from '../types';
import { Fuel, IndianRupee, Leaf, Clock, Navigation, Gauge, Check, ArrowRight } from 'lucide-react';
import { formatINR } from '../utils/fuelPhysics';

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
    A: 'bg-emerald-950 text-emerald-300 border-emerald-700/60',
    B: 'bg-teal-950 text-teal-300 border-teal-700/60',
    C: 'bg-slate-800 text-slate-300 border-slate-700',
    D: 'bg-amber-950 text-amber-300 border-amber-700/60',
    E: 'bg-rose-950 text-rose-300 border-rose-700/60'
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-1">
        <div>
          <h3 className="text-base font-bold text-white">
            Candidate Voyage Plans Comparison
          </h3>
          <p className="text-xs text-slate-400">
            Current Plan vs. NautiQ Alternatives
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          const isRec = plan.isRecommended;

          return (
            <div
              key={plan.id}
              onClick={() => onSelectPlan(plan.id)}
              className={`rounded-lg p-4 cursor-pointer transition-colors flex flex-col justify-between ${
                isRec
                  ? 'bg-slate-900 border-2 border-teal-500/80 shadow-sm'
                  : isSelected
                  ? 'bg-slate-900 border-2 border-slate-600'
                  : 'bg-slate-900 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Top Badges */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                      isRec
                        ? 'bg-teal-700 text-white border-teal-600'
                        : plan.id === 'current-plan'
                        ? 'bg-slate-800 text-slate-300 border-slate-700'
                        : 'bg-slate-800 text-teal-300 border-slate-700'
                    }`}
                  >
                    {plan.badge || plan.title}
                  </span>

                  <div className="flex items-center space-x-1.5">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${ciiColors[plan.ciiRating]}`}>
                      CII {plan.ciiRating}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Score: {plan.overallScore}
                    </span>
                  </div>
                </div>

                <h4 className="text-base font-bold text-white">{plan.title}</h4>
                <p className="text-xs text-slate-400 mb-3">{plan.tagline}</p>

                {/* Main Metrics Grid */}
                <div className="space-y-2 bg-slate-800/60 rounded-md p-3 border border-slate-750 mb-3">
                  {/* Fuel & Speed */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Fuel className="w-3.5 h-3.5 text-slate-400" />
                      <span>Fuel & Speed:</span>
                    </span>
                    <span className="font-semibold text-white">
                      {plan.fuelType} @ <strong className="text-teal-300">{plan.speedKnots} kts</strong>
                    </span>
                  </div>

                  {/* Fuel Consumption */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-slate-400" />
                      <span>Fuel Burn:</span>
                    </span>
                    <span className="font-mono text-slate-200">
                      {plan.fuelConsumptionTons} MT
                      {plan.fuelSavedPct !== 0 && (
                        <span className={`ml-1 text-[11px] ${plan.fuelSavedPct > 0 ? 'text-teal-400' : 'text-slate-400'}`}>
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
                    <span className="font-mono font-bold text-teal-400">
                      {formatINR(plan.fuelCostINR)}
                      {plan.costSavedPct !== 0 && (
                        <span className={`ml-1 text-[11px] font-normal ${plan.costSavedPct > 0 ? 'text-teal-400' : 'text-amber-400'}`}>
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
                        <span className="ml-1 text-[11px] text-slate-300">
                          ({plan.etaDeltaHours > 0 ? `+${plan.etaDeltaHours}h` : `${plan.etaDeltaHours}h`})
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Route corridor */}
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-700/60">
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
                <div className="space-y-1 mb-3">
                  {plan.keyHighlights.map((highlight, i) => (
                    <div key={i} className="flex items-center space-x-1.5 text-xs text-slate-300">
                      <Check className={`w-3.5 h-3.5 shrink-0 ${isRec ? 'text-teal-400' : 'text-slate-400'}`} />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action / Select Button */}
              <button
                type="button"
                className={`w-full py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center justify-center space-x-1 ${
                  isRec
                    ? 'bg-teal-600 hover:bg-teal-500 text-white'
                    : isSelected
                    ? 'bg-slate-700 text-white'
                    : 'bg-slate-800 hover:bg-slate-750 text-slate-300'
                }`}
              >
                <span>{isRec ? 'Select Recommended Plan' : isSelected ? 'Selected' : 'Select Plan'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

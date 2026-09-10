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
    A: 'bg-[#EDF5F1] text-[#5B8C72] border-[#D9E2DE]',
    B: 'bg-[#EDF5F1] text-[#258F87] border-[#D9E2DE]',
    C: 'bg-slate-100 text-slate-700 border-slate-200',
    D: 'bg-amber-50 text-amber-800 border-amber-200',
    E: 'bg-rose-50 text-rose-800 border-rose-200'
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-1">
        <div>
          <h3 className="text-base font-bold text-[#16324F]">
            Candidate Voyage Plans Comparison
          </h3>
          <p className="text-xs text-[#64748B]">
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
                  ? 'bg-white border-2 border-[#258F87] shadow-sm'
                  : isSelected
                  ? 'bg-white border-2 border-[#16324F] shadow-sm'
                  : 'bg-white border border-[#D9E2DE] hover:border-slate-300 shadow-sm'
              }`}
            >
              {/* Top Badges */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                      isRec
                        ? 'bg-[#5B8C72] text-white border-[#5B8C72]'
                        : plan.id === 'current-plan'
                        ? 'bg-slate-100 text-slate-700 border-slate-200'
                        : 'bg-[#EDF5F1] text-[#258F87] border-[#D9E2DE]'
                    }`}
                  >
                    {plan.badge || plan.title}
                  </span>

                  <div className="flex items-center space-x-1.5">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${ciiColors[plan.ciiRating]}`}>
                      CII {plan.ciiRating}
                    </span>
                    <span className="text-xs font-mono text-[#64748B]">
                      Score: {plan.overallScore}
                    </span>
                  </div>
                </div>

                <h4 className="text-base font-bold text-[#16324F]">{plan.title}</h4>
                <p className="text-xs text-[#64748B] mb-3">{plan.tagline}</p>

                {/* Main Metrics Grid */}
                <div className="space-y-2 bg-[#F8FAF9] rounded-md p-3 border border-[#D9E2DE] mb-3">
                  {/* Fuel & Speed */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#64748B] flex items-center gap-1.5">
                      <Fuel className="w-3.5 h-3.5 text-[#64748B]" />
                      <span>Fuel & Speed:</span>
                    </span>
                    <span className="font-semibold text-[#16324F]">
                      {plan.fuelType} @ <strong className="text-[#258F87]">{plan.speedKnots} kts</strong>
                    </span>
                  </div>

                  {/* Fuel Consumption */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#64748B] flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-[#64748B]" />
                      <span>Fuel Burn:</span>
                    </span>
                    <span className="font-mono text-[#1F2937]">
                      {plan.fuelConsumptionTons} MT
                      {plan.fuelSavedPct !== 0 && (
                        <span className={`ml-1 text-[11px] font-semibold ${plan.fuelSavedPct > 0 ? 'text-[#5B8C72]' : 'text-[#64748B]'}`}>
                          ({plan.fuelSavedPct > 0 ? `-${plan.fuelSavedPct}%` : `+${Math.abs(plan.fuelSavedPct)}%`})
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Fuel Cost */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#64748B] flex items-center gap-1.5">
                      <IndianRupee className="w-3.5 h-3.5 text-[#64748B]" />
                      <span>Bunker Cost:</span>
                    </span>
                    <span className="font-mono font-bold text-[#16324F]">
                      {formatINR(plan.fuelCostINR)}
                      {plan.costSavedPct !== 0 && (
                        <span className={`ml-1 text-[11px] font-semibold ${plan.costSavedPct > 0 ? 'text-[#5B8C72]' : 'text-amber-600'}`}>
                          ({plan.costSavedPct > 0 ? `-${plan.costSavedPct}%` : `+${Math.abs(plan.costSavedPct)}%`})
                        </span>
                      )}
                    </span>
                  </div>

                  {/* CO2 Emissions */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#64748B] flex items-center gap-1.5">
                      <Leaf className="w-3.5 h-3.5 text-[#64748B]" />
                      <span>CO₂ Emissions:</span>
                    </span>
                    <span className="font-mono font-bold text-[#16324F]">
                      {plan.co2EmissionsTons} MT
                      {plan.co2ReducedPct !== 0 && (
                        <span className="ml-1 text-[11px] text-[#5B8C72] font-semibold">
                          (-{Math.abs(plan.co2ReducedPct)}%)
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Duration & ETA */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#64748B] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#64748B]" />
                      <span>Duration / ETA:</span>
                    </span>
                    <span className="font-mono text-[#1F2937]">
                      {plan.durationHours}h ({plan.durationDays}d)
                      {plan.etaDeltaHours !== 0 && (
                        <span className="ml-1 text-[11px] text-[#64748B]">
                          ({plan.etaDeltaHours > 0 ? `+${plan.etaDeltaHours}h` : `${plan.etaDeltaHours}h`})
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Route corridor */}
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-[#D9E2DE]">
                    <span className="text-[#64748B] flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5 text-[#64748B]" />
                      <span>Corridor:</span>
                    </span>
                    <span className="text-[11px] text-[#16324F] font-medium truncate max-w-[150px]" title={plan.routeName}>
                      {plan.routeName}
                    </span>
                  </div>
                </div>

                {/* Key Highlights Bullet Points */}
                <div className="space-y-1 mb-3">
                  {plan.keyHighlights.map((highlight, i) => (
                    <div key={i} className="flex items-center space-x-1.5 text-xs text-[#1F2937]">
                      <Check className={`w-3.5 h-3.5 shrink-0 ${isRec ? 'text-[#5B8C72]' : 'text-[#258F87]'}`} />
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
                    ? 'bg-[#258F87] hover:bg-[#1E746D] text-white'
                    : isSelected
                    ? 'bg-[#16324F] text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-[#16324F]'
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

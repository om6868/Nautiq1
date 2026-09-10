import React, { useState } from 'react';
import { Sparkles, CheckCircle, ChevronDown, ChevronUp, Cpu, Leaf, IndianRupee, Clock, ArrowUpRight, Fuel, ShieldCheck, HelpCircle } from 'lucide-react';
import { CandidatePlan, RecommendationDetails } from '../types';
import { formatINR, formatUSD } from '../utils/fuelPhysics';

interface RecommendationCardProps {
  recommendation: RecommendationDetails;
  onOpenTechnicalDetails: () => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  onOpenTechnicalDetails
}) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const { recommendedPlan, baselinePlan, whyExplanation, quantumOptimizationMetadata } = recommendation;

  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#064E3B]/40 via-[#0B132B]/90 to-[#070C18] border-2 border-emerald-500/40 p-6 sm:p-8 shadow-2xl shadow-emerald-950/50 glow-emerald">
      {/* Background ambient lighting */}
      <div className="absolute -right-16 -top-16 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center space-x-2">
          <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md">
            <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
            <span>⭐ NautiQ Recommended</span>
          </span>
          <span className="text-xs text-emerald-300 font-mono hidden sm:inline-block">
            Global Pareto Optimum • Score {recommendedPlan.overallScore}/100
          </span>
        </div>

        <button
          onClick={onOpenTechnicalDetails}
          className="flex items-center space-x-1.5 text-xs text-sky-300 hover:text-white px-3 py-1 rounded-lg bg-sky-950/60 border border-sky-800/40 hover:border-sky-500/50 transition-colors"
        >
          <Cpu className="w-3.5 h-3.5 text-sky-400" />
          <span>View Quantum QUBO Formulation</span>
        </button>
      </div>

      {/* Hero Action Recommendation Title */}
      <div className="mb-6">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Switch to <span className="text-emerald-400 underline decoration-emerald-500/50 decoration-2 underline-offset-4">{recommendedPlan.fuelType}</span> + Adjust Speed to <span className="text-sky-300">{recommendedPlan.speedKnots} knots</span>
        </h3>
        <p className="text-sm text-slate-300 mt-2 flex items-center gap-2">
          <span>Corridor: <strong className="text-white">{recommendedPlan.routeName}</strong></span>
          <span>•</span>
          <span className="text-emerald-300">Port Bunkering: Validated ✅</span>
        </p>
      </div>

      {/* Core 3 Hero Impact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Metric 1: Cost Reduction */}
        <div className="rounded-2xl bg-slate-900/80 border border-emerald-500/30 p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold uppercase tracking-wider">Fuel Cost Saving</span>
            <IndianRupee className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
              {recommendedPlan.costSavedPct > 0 ? `${recommendedPlan.costSavedPct}%` : 'Optimal'}
            </span>
            <span className="text-xs text-emerald-300 font-semibold">Lower Cost</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {formatINR(recommendedPlan.fuelCostINR)} (Save {formatINR(baselinePlan.fuelCostINR - recommendedPlan.fuelCostINR)})
          </p>
        </div>

        {/* Metric 2: Emission Reduction */}
        <div className="rounded-2xl bg-slate-900/80 border border-teal-500/30 p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold uppercase tracking-wider">Emission Reduction</span>
            <Leaf className="w-4 h-4 text-teal-400" />
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl sm:text-3xl font-black font-mono text-teal-300">
              {Math.abs(recommendedPlan.co2ReducedPct)}%
            </span>
            <span className="text-xs text-teal-300 font-semibold">CO₂ Reduced</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {recommendedPlan.co2EmissionsTons} MT CO₂ (CII Grade {recommendedPlan.ciiRating})
          </p>
        </div>

        {/* Metric 3: Schedule / ETA Impact */}
        <div className="rounded-2xl bg-slate-900/80 border border-sky-500/30 p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold uppercase tracking-wider">ETA Impact</span>
            <Clock className="w-4 h-4 text-sky-400" />
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl sm:text-3xl font-black font-mono text-sky-300">
              {recommendedPlan.etaDeltaHours >= 0 ? `+${recommendedPlan.etaDeltaHours}` : recommendedPlan.etaDeltaHours} hrs
            </span>
            <span className="text-xs text-sky-300 font-semibold">Schedule Delta</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Total {recommendedPlan.durationHours} hrs ({recommendedPlan.durationDays} days)
          </p>
        </div>
      </div>

      {/* "View Why This Was Recommended" Expandable Drawer */}
      <div className="border-t border-slate-800/80 pt-4">
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900/70 hover:bg-slate-800/90 border border-emerald-500/20 text-slate-200 font-semibold text-sm transition-colors"
        >
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span>View Why This Was Recommended</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-emerald-400 font-normal">
            <span>{showExplanation ? 'Hide AI Rationales' : 'Expand 4 Operational Rationales'}</span>
            {showExplanation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showExplanation && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 rounded-2xl bg-[#070C18]/90 border border-emerald-500/30 animate-fadeIn">
            {/* Reason 1: Speed */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center space-x-2 text-sky-400 font-semibold text-xs">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1. Hydrodynamic Speed Optimization</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {whyExplanation.hydrodynamicSpeedRationale}
              </p>
            </div>

            {/* Reason 2: Fuel Transition */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>2. Green Fuel Decarbonization</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {whyExplanation.greenFuelAdvantage}
              </p>
            </div>

            {/* Reason 3: Schedule Buffer */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center space-x-2 text-teal-400 font-semibold text-xs">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>3. Berth Window Reliability</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {whyExplanation.scheduleFeasibility}
              </p>
            </div>

            {/* Reason 4: Port Bunkering Check */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center space-x-2 text-amber-300 font-semibold text-xs">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>4. Port Fuel Availability Verified</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {whyExplanation.portAvailabilityValidation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

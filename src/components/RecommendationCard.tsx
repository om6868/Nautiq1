import React, { useState } from 'react';
import { CheckCircle, ChevronDown, ChevronUp, Cpu, Leaf, IndianRupee, Clock, HelpCircle } from 'lucide-react';
import { CandidatePlan, RecommendationDetails } from '../types';
import { formatINR } from '../utils/fuelPhysics';

interface RecommendationCardProps {
  recommendation: RecommendationDetails;
  onOpenTechnicalDetails: () => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  onOpenTechnicalDetails
}) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const { recommendedPlan, baselinePlan, whyExplanation } = recommendation;

  return (
    <div className="rounded-lg bg-white border-2 border-[#5B8C72] p-5 sm:p-6 space-y-5 shadow-sm">
      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-1 rounded bg-[#5B8C72] text-white font-semibold text-xs uppercase tracking-wide">
            ⭐ NautiQ Recommended
          </span>
          <span className="text-xs text-[#64748B] font-mono hidden sm:inline-block">
            Pareto Optimal • Score {recommendedPlan.overallScore}/100
          </span>
        </div>

        <button
          onClick={onOpenTechnicalDetails}
          className="flex items-center space-x-1.5 text-xs text-[#16324F] hover:text-[#258F87] px-2.5 py-1 rounded bg-white border border-[#D9E2DE] hover:border-[#258F87] transition-colors"
        >
          <Cpu className="w-3.5 h-3.5 text-[#258F87]" />
          <span>View Technical Details</span>
        </button>
      </div>

      {/* Hero Recommendation Title */}
      <div>
        <h3 className="text-xl font-bold text-[#16324F]">
          Switch to <span className="text-[#258F87]">{recommendedPlan.fuelType}</span> + Reduce Speed to <span className="text-[#258F87]">{recommendedPlan.speedKnots} knots</span>
        </h3>
        <p className="text-xs text-[#64748B] mt-1 flex items-center gap-2">
          <span>Route: <strong className="text-[#16324F]">{recommendedPlan.routeName}</strong></span>
          <span>•</span>
          <span className="text-[#5B8C72] font-medium">Fuel Availability: Verified at Required Ports</span>
        </p>
      </div>

      {/* Core 3 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Metric 1: Cost Reduction */}
        <div className="rounded-md bg-[#EDF5F1] border border-[#D9E2DE] p-3.5">
          <div className="flex items-center justify-between text-xs text-[#64748B] mb-1">
            <span className="font-medium">Fuel Cost Saving</span>
            <IndianRupee className="w-3.5 h-3.5 text-[#258F87]" />
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold font-mono text-[#5B8C72]">
              {recommendedPlan.costSavedPct > 0 ? `${recommendedPlan.costSavedPct}%` : 'Optimal'}
            </span>
            <span className="text-xs text-[#16324F] font-medium">Lower Cost</span>
          </div>
          <p className="text-[11px] text-[#64748B] mt-1">
            {formatINR(recommendedPlan.fuelCostINR)} (Save {formatINR(baselinePlan.fuelCostINR - recommendedPlan.fuelCostINR)})
          </p>
        </div>

        {/* Metric 2: Emission Reduction */}
        <div className="rounded-md bg-[#EDF5F1] border border-[#D9E2DE] p-3.5">
          <div className="flex items-center justify-between text-xs text-[#64748B] mb-1">
            <span className="font-medium">Emission Reduction</span>
            <Leaf className="w-3.5 h-3.5 text-[#258F87]" />
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold font-mono text-[#5B8C72]">
              {Math.abs(recommendedPlan.co2ReducedPct)}%
            </span>
            <span className="text-xs text-[#16324F] font-medium">CO₂ Reduced</span>
          </div>
          <p className="text-[11px] text-[#64748B] mt-1">
            {recommendedPlan.co2EmissionsTons} MT CO₂ (CII Grade {recommendedPlan.ciiRating})
          </p>
        </div>

        {/* Metric 3: Schedule / ETA Impact */}
        <div className="rounded-md bg-[#EDF5F1] border border-[#D9E2DE] p-3.5">
          <div className="flex items-center justify-between text-xs text-[#64748B] mb-1">
            <span className="font-medium">ETA Impact</span>
            <Clock className="w-3.5 h-3.5 text-[#64748B]" />
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold font-mono text-[#16324F]">
              {recommendedPlan.etaDeltaHours >= 0 ? `+${recommendedPlan.etaDeltaHours}` : recommendedPlan.etaDeltaHours} hrs
            </span>
            <span className="text-xs text-[#16324F] font-medium">Schedule Delta</span>
          </div>
          <p className="text-[11px] text-[#64748B] mt-1">
            Total duration: {recommendedPlan.durationHours} hrs ({recommendedPlan.durationDays} days)
          </p>
        </div>
      </div>

      {/* "View Why This Was Recommended" Expandable Drawer */}
      <div className="border-t border-[#D9E2DE] pt-3">
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-md bg-[#F8FAF9] hover:bg-[#EDF5F1] border border-[#D9E2DE] text-[#16324F] text-xs font-medium transition-colors"
        >
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#258F87]" />
            <span>View Why This Was Recommended</span>
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-[#64748B]">
            <span>{showExplanation ? 'Hide Explanation' : 'Show Explanation'}</span>
            {showExplanation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </div>
        </button>

        {showExplanation && (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-md bg-[#F8FAF9] border border-[#D9E2DE] text-xs">
            {/* Reason 1: Speed */}
            <div className="p-2.5 rounded bg-white border border-[#D9E2DE] space-y-1">
              <div className="flex items-center space-x-1.5 text-[#16324F] font-semibold text-xs">
                <CheckCircle className="w-3.5 h-3.5 text-[#5B8C72] shrink-0" />
                <span>Lower Cruising Speed</span>
              </div>
              <p className="text-xs text-[#64748B]">
                {whyExplanation.hydrodynamicSpeedRationale}
              </p>
            </div>

            {/* Reason 2: Fuel Transition */}
            <div className="p-2.5 rounded bg-white border border-[#D9E2DE] space-y-1">
              <div className="flex items-center space-x-1.5 text-[#16324F] font-semibold text-xs">
                <CheckCircle className="w-3.5 h-3.5 text-[#5B8C72] shrink-0" />
                <span>Alternative Fuel Reduced Emissions</span>
              </div>
              <p className="text-xs text-[#64748B]">
                {whyExplanation.greenFuelAdvantage}
              </p>
            </div>

            {/* Reason 3: Schedule Buffer */}
            <div className="p-2.5 rounded bg-white border border-[#D9E2DE] space-y-1">
              <div className="flex items-center space-x-1.5 text-[#16324F] font-semibold text-xs">
                <CheckCircle className="w-3.5 h-3.5 text-[#5B8C72] shrink-0" />
                <span>Route Remained Within Schedule</span>
              </div>
              <p className="text-xs text-[#64748B]">
                {whyExplanation.scheduleFeasibility}
              </p>
            </div>

            {/* Reason 4: Port Bunkering Check */}
            <div className="p-2.5 rounded bg-white border border-[#D9E2DE] space-y-1">
              <div className="flex items-center space-x-1.5 text-[#16324F] font-semibold text-xs">
                <CheckCircle className="w-3.5 h-3.5 text-[#5B8C72] shrink-0" />
                <span>Fuel Available at Required Ports</span>
              </div>
              <p className="text-xs text-[#64748B]">
                {whyExplanation.portAvailabilityValidation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

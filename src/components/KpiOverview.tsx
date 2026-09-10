import React from 'react';
import { TrendingDown, Leaf, IndianRupee, Ship, ArrowRight, Zap } from 'lucide-react';
import { VoyageInput } from '../types';

interface KpiOverviewProps {
  onOptimizeCurrentVoyage: () => void;
  onNavigateToPrediction: () => void;
  currentVoyage: VoyageInput;
}

export const KpiOverview: React.FC<KpiOverviewProps> = ({
  onOptimizeCurrentVoyage,
  onNavigateToPrediction,
  currentVoyage
}) => {
  const kpiData = [
    {
      title: 'Fuel Saved',
      value: '12.8%',
      subtitle: 'Fleet average reduction',
      icon: TrendingDown,
      textColor: 'text-teal-400',
      badge: '+2.1% this month'
    },
    {
      title: 'CO₂ Reduced',
      value: '18.4%',
      subtitle: 'Net emissions avoided',
      icon: Leaf,
      textColor: 'text-teal-400',
      badge: 'IMO 2030 Aligned'
    },
    {
      title: 'Cost Saved',
      value: '₹2.4L',
      subtitle: 'Avg savings per voyage',
      icon: IndianRupee,
      textColor: 'text-slate-100',
      badge: '₹3.1 Cr cumulative'
    },
    {
      title: 'Voyages Optimized',
      value: '128',
      subtitle: 'Completed voyage plans',
      icon: Ship,
      textColor: 'text-slate-100',
      badge: '99.2% on-time ETA'
    }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="rounded-lg bg-slate-900 p-4 border border-slate-800 transition-colors hover:border-slate-700"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-400">
                  {kpi.title}
                </span>
                <div className="p-1.5 rounded bg-slate-800 border border-slate-700 text-slate-400">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className={`text-2xl font-bold font-mono ${kpi.textColor}`}>
                  {kpi.value}
                </span>
                <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700/60">
                  {kpi.badge}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1.5">{kpi.subtitle}</p>
            </div>
          );
        })}
      </div>

      {/* Active Voyage Banner & Quick Action Card */}
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="space-y-2.5">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-teal-400 font-mono">
                Active Voyage Monitoring
              </span>
              <span className="text-xs text-slate-400">• Vessel ID: #IN-CT-9042</span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>Mumbai (JNPT)</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
                <span>Singapore</span>
              </h3>
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                3,200 NM
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
              <div className="bg-slate-800/60 rounded p-2 border border-slate-700/60">
                <span className="text-slate-400 block text-[11px]">Vessel & Cargo</span>
                <span className="font-semibold text-slate-200">{currentVoyage.vesselType} ({currentVoyage.cargoLoadPct}%)</span>
              </div>
              <div className="bg-slate-800/60 rounded p-2 border border-slate-700/60">
                <span className="text-slate-400 block text-[11px]">Current Bunker</span>
                <span className="font-semibold text-slate-200">{currentVoyage.fuelType} @ {currentVoyage.speedKnots} kts</span>
              </div>
              <div className="bg-slate-800/60 rounded p-2 border border-slate-700/60">
                <span className="text-slate-400 block text-[11px]">Baseline CO₂</span>
                <span className="font-semibold text-slate-200">~312.4 MT CO₂</span>
              </div>
              <div className="bg-slate-800/60 rounded p-2 border border-slate-700/60">
                <span className="text-slate-400 block text-[11px]">Baseline ETA</span>
                <span className="font-semibold text-slate-200">177.8 hrs (7.4 days)</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <button
              onClick={onOptimizeCurrentVoyage}
              className="flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-md bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors shadow-sm"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Optimize This Voyage</span>
            </button>

            <button
              onClick={onNavigateToPrediction}
              className="flex items-center justify-center space-x-1 px-3 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition-colors"
            >
              <span>Inspect Fuel Prediction Model</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

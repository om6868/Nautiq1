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
      textColor: 'text-[#5B8C72]',
      badge: '+2.1% this month'
    },
    {
      title: 'CO₂ Reduced',
      value: '18.4%',
      subtitle: 'Net emissions avoided',
      icon: Leaf,
      textColor: 'text-[#5B8C72]',
      badge: 'IMO 2030 Aligned'
    },
    {
      title: 'Cost Saved',
      value: '₹2.4L',
      subtitle: 'Avg savings per voyage',
      icon: IndianRupee,
      textColor: 'text-[#16324F]',
      badge: '₹3.1 Cr cumulative'
    },
    {
      title: 'Voyages Optimized',
      value: '128',
      subtitle: 'Completed voyage plans',
      icon: Ship,
      textColor: 'text-[#16324F]',
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
              className="rounded-lg bg-white p-4 border border-[#D9E2DE] shadow-sm transition-colors hover:border-slate-300"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-[#64748B]">
                  {kpi.title}
                </span>
                <div className="p-1.5 rounded bg-[#EDF5F1] text-[#258F87]">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className={`text-2xl font-bold font-mono ${kpi.textColor}`}>
                  {kpi.value}
                </span>
                <span className="text-[11px] text-[#64748B] bg-[#F5F7F4] px-2 py-0.5 rounded border border-[#D9E2DE]">
                  {kpi.badge}
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-1.5">{kpi.subtitle}</p>
            </div>
          );
        })}
      </div>

      {/* Active Voyage Banner & Quick Action Card */}
      <div className="rounded-lg border border-[#D9E2DE] bg-white p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="space-y-2.5">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-[#258F87] font-mono">
                Active Voyage Monitoring
              </span>
              <span className="text-xs text-[#64748B]">• Vessel ID: #IN-CT-9042</span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="text-xl font-bold text-[#16324F] flex items-center gap-2">
                <span>Mumbai (JNPT)</span>
                <ArrowRight className="w-4 h-4 text-[#64748B]" />
                <span>Singapore</span>
              </h3>
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-[#EDF5F1] text-[#258F87] border border-[#D9E2DE]">
                3,200 NM
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
              <div className="bg-[#F8FAF9] rounded p-2 border border-[#D9E2DE]">
                <span className="text-[#64748B] block text-[11px]">Vessel & Cargo</span>
                <span className="font-semibold text-[#16324F]">{currentVoyage.vesselType} ({currentVoyage.cargoLoadPct}%)</span>
              </div>
              <div className="bg-[#F8FAF9] rounded p-2 border border-[#D9E2DE]">
                <span className="text-[#64748B] block text-[11px]">Current Bunker</span>
                <span className="font-semibold text-[#16324F]">{currentVoyage.fuelType} @ {currentVoyage.speedKnots} kts</span>
              </div>
              <div className="bg-[#F8FAF9] rounded p-2 border border-[#D9E2DE]">
                <span className="text-[#64748B] block text-[11px]">Baseline CO₂</span>
                <span className="font-semibold text-[#16324F]">~312.4 MT CO₂</span>
              </div>
              <div className="bg-[#F8FAF9] rounded p-2 border border-[#D9E2DE]">
                <span className="text-[#64748B] block text-[11px]">Baseline ETA</span>
                <span className="font-semibold text-[#16324F]">177.8 hrs (7.4 days)</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <button
              onClick={onOptimizeCurrentVoyage}
              className="flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-md bg-[#258F87] hover:bg-[#1E746D] text-white font-semibold text-xs transition-colors shadow-sm"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Optimize This Voyage</span>
            </button>

            <button
              onClick={onNavigateToPrediction}
              className="flex items-center justify-center space-x-1 px-3 py-2 rounded-md bg-white hover:bg-[#F5F7F4] text-[#16324F] text-xs border border-[#D9E2DE] transition-colors"
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

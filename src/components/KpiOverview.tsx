import React from 'react';
import { TrendingDown, Leaf, IndianRupee, Ship, ArrowRight, Zap, Clock, ShieldCheck } from 'lucide-react';
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
      color: 'from-emerald-500/20 to-teal-500/10',
      borderColor: 'border-emerald-500/30',
      textColor: 'text-emerald-400',
      badge: '+2.1% this month'
    },
    {
      title: 'CO₂ Reduced',
      value: '18.4%',
      subtitle: 'Net emissions avoided',
      icon: Leaf,
      color: 'from-teal-500/20 to-cyan-500/10',
      borderColor: 'border-teal-500/30',
      textColor: 'text-teal-300',
      badge: 'IMO 2030 Aligned'
    },
    {
      title: 'Cost Saved',
      value: '₹2.4L',
      subtitle: 'Avg savings per voyage',
      icon: IndianRupee,
      color: 'from-sky-500/20 to-indigo-500/10',
      borderColor: 'border-sky-500/30',
      textColor: 'text-sky-300',
      badge: '₹3.1 Cr cumulative'
    },
    {
      title: 'Voyages Optimized',
      value: '128',
      subtitle: 'Completed quantum plans',
      icon: Ship,
      color: 'from-blue-500/20 to-navy-700/20',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-300',
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
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-b ${kpi.color} bg-[#0B132B]/80 backdrop-blur-md p-5 border ${kpi.borderColor} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {kpi.title}
                </span>
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-700/50">
                  <Icon className={`w-5 h-5 ${kpi.textColor}`} />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className={`text-3xl font-extrabold font-mono tracking-tight ${kpi.textColor}`}>
                  {kpi.value}
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-900/80 text-slate-300 border border-slate-700/50">
                  {kpi.badge}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2 font-medium">{kpi.subtitle}</p>
            </div>
          );
        })}
      </div>

      {/* Active Voyage Banner & Quick Action Card */}
      <div className="relative rounded-2xl overflow-hidden border border-sky-500/30 bg-gradient-to-r from-[#0B132B] via-[#0F1D40] to-[#0A2239] p-6 shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 font-mono">
                Active Voyage Monitoring
              </span>
              <span className="text-xs text-slate-400">• Vessel ID: #IN-CT-9042</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>Mumbai (JNPT)</span>
                <ArrowRight className="w-5 h-5 text-sky-400" />
                <span>Singapore</span>
              </h3>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-sky-950/80 text-sky-300 border border-sky-500/30">
                3,200 Nautical Miles
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 text-xs">
              <div className="bg-slate-900/60 rounded-lg p-2.5 border border-slate-800">
                <span className="text-slate-400 block">Vessel & Cargo</span>
                <span className="font-semibold text-slate-200">{currentVoyage.vesselType} ({currentVoyage.cargoLoadPct}% Load)</span>
              </div>
              <div className="bg-slate-900/60 rounded-lg p-2.5 border border-slate-800">
                <span className="text-slate-400 block">Current Bunker</span>
                <span className="font-semibold text-slate-200">{currentVoyage.fuelType} @ {currentVoyage.speedKnots} kts</span>
              </div>
              <div className="bg-slate-900/60 rounded-lg p-2.5 border border-slate-800">
                <span className="text-slate-400 block">Baseline CO₂</span>
                <span className="font-semibold text-amber-300">~312.4 MT CO₂</span>
              </div>
              <div className="bg-slate-900/60 rounded-lg p-2.5 border border-slate-800">
                <span className="text-slate-400 block">Baseline ETA</span>
                <span className="font-semibold text-sky-300">177.8 hrs (7.4 days)</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={onOptimizeCurrentVoyage}
              className="flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-500 to-sky-500 hover:from-emerald-500 hover:via-teal-400 hover:to-sky-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Zap className="w-5 h-5 fill-white text-white animate-pulse" />
              <span>⚡ Optimize This Voyage</span>
            </button>

            <button
              onClick={onNavigateToPrediction}
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-xs border border-slate-700/60 transition-colors"
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

import React, { useState } from 'react';
import { Fuel, CheckCircle2, AlertTriangle, XCircle, ShieldAlert, Sparkles, Sliders, Info, Zap, ArrowRight } from 'lucide-react';
import { ALL_FUELS, FUEL_SPECS } from '../data/fuels';
import { PORTS } from '../data/ports';
import { FuelType, PortAvailabilityStatus, VoyageInput } from '../types';
import { calculateVoyagePrediction, formatINR, formatUSD } from '../utils/fuelPhysics';

interface FuelScenarioEngineProps {
  voyageInput: VoyageInput;
  setVoyageInput: React.Dispatch<React.SetStateAction<VoyageInput>>;
  onGoToOptimizer: () => void;
}

export const FuelScenarioEngine: React.FC<FuelScenarioEngineProps> = ({
  voyageInput,
  setVoyageInput,
  onGoToOptimizer
}) => {
  const [carbonTaxUSD, setCarbonTaxUSD] = useState<number>(50); // $50/ton CO2 carbon levy default

  const originPort = PORTS.find(p => p.id === voyageInput.originPortId) || PORTS[0];
  const destPort = PORTS.find(p => p.id === voyageInput.destPortId) || PORTS[1];

  const getStatusBadge = (status: PortAvailabilityStatus) => {
    switch (status) {
      case 'Available':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Available</span>
          </span>
        );
      case 'Limited':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-500/40">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Limited</span>
          </span>
        );
      case 'Unavailable':
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-950/80 text-rose-300 border border-rose-500/40">
            <XCircle className="w-3.5 h-3.5 text-rose-400" />
            <span>Unavailable</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Fuel className="w-6 h-6 text-emerald-400" />
            <span>Green Fuel Scenario Engine</span>
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Evaluate alternative bunker fuels against bunkering availability constraints and carbon pricing.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-mono">
            6 Alternative Fuels Modeled
          </span>
        </div>
      </div>

      {/* HARD OPERATIONAL CONSTRAINT BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900/90 to-sky-950/40 p-5 border border-amber-500/30 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center space-x-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Hard Operational Constraint: Fuel Availability by Port</span>
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              “NautiQ treats fuel availability as a hard operational constraint. If a fuel is marked <span className="text-rose-400 font-bold">❌ Unavailable</span> at either the origin or destination bunkering hub, the optimization engine prunes the state and will NOT recommend it.”
            </p>
          </div>

          {/* Active Corridor Port Pair Selector */}
          <div className="flex items-center space-x-2 bg-slate-900/90 px-4 py-2.5 rounded-xl border border-slate-700/80 shrink-0">
            <div className="text-xs text-right">
              <span className="text-slate-400 block text-[10px]">CURRENT VOYAGE PAIR</span>
              <span className="font-bold text-white">{originPort.name} → {destPort.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Carbon Tax Slider */}
      <div className="rounded-2xl bg-[#0B132B]/80 backdrop-blur-md p-5 border border-sky-900/30 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4" />
              <span>Simulate IMO Carbon Levy / ETS Carbon Tax</span>
            </span>
            <p className="text-xs text-slate-400 mt-0.5">
              See how a global maritime carbon penalty ($/ton CO₂) shifts economics in favor of clean fuels.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-black font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-lg border border-emerald-500/30">
              ${carbonTaxUSD} / MT CO₂ (₹{Math.round(carbonTaxUSD * 83.5).toLocaleString()})
            </span>
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={250}
          step={10}
          value={carbonTaxUSD}
          onChange={(e) => setCarbonTaxUSD(parseInt(e.target.value))}
          className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>$0/t (No Tax)</span>
          <span>$50/t (Baseline EU ETS)</span>
          <span>$150/t (IMO Net-Zero 2030 Proposal)</span>
          <span>$250/t (High Ambition)</span>
        </div>
      </div>

      {/* Green Fuel Matrix Table */}
      <div className="overflow-x-auto rounded-2xl border border-sky-900/40 bg-[#0B132B]/90 backdrop-blur-md shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/70 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3.5 px-4">Fuel Type</th>
              <th className="py-3.5 px-3">Base Price (MT)</th>
              <th className="py-3.5 px-3">Voyage Burn</th>
              <th className="py-3.5 px-3">CO₂ Emissions</th>
              <th className="py-3.5 px-3">Total Cost (incl. Carbon Tax)</th>
              <th className="py-3.5 px-3 text-center">Origin ({originPort.name.split(' ')[0]})</th>
              <th className="py-3.5 px-3 text-center">Dest ({destPort.name.split(' ')[0]})</th>
              <th className="py-3.5 px-3 text-center">Optimizer Status</th>
              <th className="py-3.5 px-3 text-center">Suitability</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-xs">
            {ALL_FUELS.map((fuel) => {
              const spec = FUEL_SPECS[fuel];
              const originStatus = originPort.fuelAvailability[fuel];
              const destStatus = destPort.fuelAvailability[fuel];
              const isFeasible = originStatus !== 'Unavailable' && destStatus !== 'Unavailable';

              // Calculate fuel burn for this voyage
              const pred = calculateVoyagePrediction({
                ...voyageInput,
                fuelType: fuel
              });

              // Add carbon tax: CO2 Tons * CarbonTaxUSD * 83.5
              const carbonTaxCostINR = pred.co2EmissionsTons * carbonTaxUSD * 83.5;
              const totalCostWithTaxINR = pred.fuelCostINR + carbonTaxCostINR;

              return (
                <tr
                  key={fuel}
                  className={`hover:bg-slate-800/40 transition-colors ${
                    voyageInput.fuelType === fuel ? 'bg-sky-950/20' : ''
                  }`}
                >
                  {/* Fuel Name & Description */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-2.5">
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: spec.color }}
                      />
                      <div>
                        <span className="font-bold text-white block">{spec.name}</span>
                        <span className="text-[10px] text-slate-400 block max-w-[160px] truncate">{spec.fullName}</span>
                      </div>
                    </div>
                  </td>

                  {/* Base Price */}
                  <td className="py-3.5 px-3 font-mono text-slate-200">
                    <div>{formatINR(spec.costPerTonINR)}</div>
                    <div className="text-[10px] text-slate-400">${spec.costPerTonUSD}/t</div>
                  </td>

                  {/* Voyage Burn */}
                  <td className="py-3.5 px-3 font-mono text-slate-200">
                    <span className="font-semibold">{pred.fuelConsumptionTons} MT</span>
                    <span className="text-[10px] text-slate-400 block">{spec.energyDensityMJkg} MJ/kg</span>
                  </td>

                  {/* CO2 Emissions */}
                  <td className="py-3.5 px-3 font-mono">
                    <span className={`font-bold ${pred.co2EmissionsTons < 150 ? 'text-teal-300' : 'text-amber-300'}`}>
                      {pred.co2EmissionsTons} MT
                    </span>
                    <span className="text-[10px] text-slate-400 block">{spec.co2FactorTonPerTon} tCO₂/t</span>
                  </td>

                  {/* Total Cost with Tax */}
                  <td className="py-3.5 px-3 font-mono">
                    <span className="font-bold text-emerald-400">{formatINR(totalCostWithTaxINR)}</span>
                    {carbonTaxUSD > 0 && (
                      <span className="text-[10px] text-slate-400 block">
                        (+{formatINR(carbonTaxCostINR)} tax)
                      </span>
                    )}
                  </td>

                  {/* Origin Availability */}
                  <td className="py-3.5 px-3 text-center">
                    {getStatusBadge(originStatus)}
                  </td>

                  {/* Destination Availability */}
                  <td className="py-3.5 px-3 text-center">
                    {getStatusBadge(destStatus)}
                  </td>

                  {/* Optimizer Status */}
                  <td className="py-3.5 px-3 text-center">
                    {isFeasible ? (
                      <span className="inline-flex items-center text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        Eligible
                      </span>
                    ) : (
                      <span
                        className="inline-flex items-center text-[11px] font-semibold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-500/30 cursor-help"
                        title="Excluded from quantum optimizer recommendation due to port bunkering unavailability"
                      >
                        Pruned ❌
                      </span>
                    )}
                  </td>

                  {/* Suitability Score */}
                  <td className="py-3.5 px-3 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-12 bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-400"
                          style={{ width: `${spec.suitabilityScore}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-200">
                        {spec.suitabilityScore}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bottom CTA to Optimizer */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-[#0B132B] border border-slate-800">
        <div className="text-xs text-slate-300">
          Want to simulate these fuels in the multi-variable voyage optimizer?
        </div>
        <button
          onClick={onGoToOptimizer}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center space-x-1.5 shadow-md shadow-emerald-600/20"
        >
          <span>Run Voyage Optimizer</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Fuel, CheckCircle2, AlertTriangle, XCircle, ShieldAlert, Sliders, ArrowRight } from 'lucide-react';
import { ALL_FUELS, FUEL_SPECS } from '../data/fuels';
import { PORTS } from '../data/ports';
import { PortAvailabilityStatus, VoyageInput } from '../types';
import { calculateVoyagePrediction, formatINR } from '../utils/fuelPhysics';

interface FuelScenarioEngineProps {
  voyageInput: VoyageInput;
  setVoyageInput: React.Dispatch<React.SetStateAction<VoyageInput>>;
  onGoToOptimizer: () => void;
}

export const FuelScenarioEngine: React.FC<FuelScenarioEngineProps> = ({
  voyageInput,
  onGoToOptimizer
}) => {
  const [carbonTaxUSD, setCarbonTaxUSD] = useState<number>(50); // $50/ton CO2 default

  const originPort = PORTS.find(p => p.id === voyageInput.originPortId) || PORTS[0];
  const destPort = PORTS.find(p => p.id === voyageInput.destPortId) || PORTS[1];

  const getStatusBadge = (status: PortAvailabilityStatus) => {
    switch (status) {
      case 'Available':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-950 text-emerald-300 border border-emerald-800/60">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Available</span>
          </span>
        );
      case 'Limited':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-xs font-medium bg-amber-950 text-amber-300 border border-amber-800/60">
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            <span>Limited</span>
          </span>
        );
      case 'Unavailable':
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-xs font-medium bg-rose-950 text-rose-300 border border-rose-800/60">
            <XCircle className="w-3 h-3 text-rose-400" />
            <span>Unavailable</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="pb-2 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Fuel className="w-5 h-5 text-teal-400" />
          <span>Green Fuel Scenario Engine</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Compare alternative fuels against port availability constraints and simulated carbon pricing.
        </p>
      </div>

      {/* HARD OPERATIONAL CONSTRAINT BANNER */}
      <div className="rounded-lg bg-slate-900 p-4 border border-slate-800 space-y-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-amber-300 font-semibold text-xs uppercase tracking-wide">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Hard Operational Constraint: Fuel Availability by Port</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              “NautiQ treats fuel availability as a hard operational constraint. If a fuel is unavailable at a required port, the optimizer will NOT recommend it.”
            </p>
          </div>

          {/* Active Corridor Port Pair */}
          <div className="bg-slate-800 px-3 py-2 rounded-md border border-slate-700 shrink-0 text-xs">
            <span className="text-slate-400 block text-[10px]">SELECTED ROUTE</span>
            <span className="font-semibold text-white">{originPort.name.split(' ')[0]} → {destPort.name.split(' ')[0]}</span>
          </div>
        </div>
      </div>

      {/* Carbon Tax Slider */}
      <div className="rounded-lg bg-slate-900 p-4 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-teal-400" />
              <span>Simulate IMO Carbon Levy / ETS Carbon Tax</span>
            </span>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulate carbon penalties ($/ton CO₂) to evaluate clean fuel cost parity.
            </p>
          </div>
          <div className="text-xs font-mono font-bold text-teal-300 bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
            ${carbonTaxUSD} / MT CO₂ (₹{Math.round(carbonTaxUSD * 83.5).toLocaleString()})
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={250}
          step={10}
          value={carbonTaxUSD}
          onChange={(e) => setCarbonTaxUSD(parseInt(e.target.value))}
          className="w-full accent-teal-500 bg-slate-800 h-1.5 rounded cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>$0/t</span>
          <span>$50/t (EU ETS)</span>
          <span>$150/t (IMO 2030 Proposal)</span>
          <span>$250/t (High Ambition)</span>
        </div>
      </div>

      {/* Green Fuel Matrix Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-850 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-3.5">Fuel</th>
              <th className="py-3 px-3">Base Price</th>
              <th className="py-3 px-3">Voyage Burn</th>
              <th className="py-3 px-3">CO₂ Emissions</th>
              <th className="py-3 px-3">Total Cost (with Tax)</th>
              <th className="py-3 px-3 text-center">Origin</th>
              <th className="py-3 px-3 text-center">Dest</th>
              <th className="py-3 px-3 text-center">Optimizer Status</th>
              <th className="py-3 px-3 text-center">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-xs">
            {ALL_FUELS.map((fuel) => {
              const spec = FUEL_SPECS[fuel];
              const originStatus = originPort.fuelAvailability[fuel];
              const destStatus = destPort.fuelAvailability[fuel];
              const isFeasible = originStatus !== 'Unavailable' && destStatus !== 'Unavailable';

              const pred = calculateVoyagePrediction({
                ...voyageInput,
                fuelType: fuel
              });

              const carbonTaxCostINR = pred.co2EmissionsTons * carbonTaxUSD * 83.5;
              const totalCostWithTaxINR = pred.fuelCostINR + carbonTaxCostINR;

              return (
                <tr
                  key={fuel}
                  className={`hover:bg-slate-800/40 transition-colors ${
                    voyageInput.fuelType === fuel ? 'bg-slate-800/40' : ''
                  }`}
                >
                  <td className="py-3 px-3.5">
                    <span className="font-bold text-white block">{spec.name}</span>
                    <span className="text-[10px] text-slate-400 block">{spec.fullName}</span>
                  </td>

                  <td className="py-3 px-3 font-mono text-slate-200">
                    <div>{formatINR(spec.costPerTonINR)}</div>
                    <div className="text-[10px] text-slate-400">${spec.costPerTonUSD}/t</div>
                  </td>

                  <td className="py-3 px-3 font-mono text-slate-200">
                    <span className="font-semibold">{pred.fuelConsumptionTons} MT</span>
                    <span className="text-[10px] text-slate-400 block">{spec.energyDensityMJkg} MJ/kg</span>
                  </td>

                  <td className="py-3 px-3 font-mono">
                    <span className={`font-semibold ${pred.co2EmissionsTons < 150 ? 'text-teal-300' : 'text-slate-200'}`}>
                      {pred.co2EmissionsTons} MT
                    </span>
                    <span className="text-[10px] text-slate-400 block">{spec.co2FactorTonPerTon} tCO₂/t</span>
                  </td>

                  <td className="py-3 px-3 font-mono">
                    <span className="font-semibold text-teal-400">{formatINR(totalCostWithTaxINR)}</span>
                    {carbonTaxUSD > 0 && (
                      <span className="text-[10px] text-slate-400 block">
                        (+{formatINR(carbonTaxCostINR)} tax)
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3 text-center">
                    {getStatusBadge(originStatus)}
                  </td>

                  <td className="py-3 px-3 text-center">
                    {getStatusBadge(destStatus)}
                  </td>

                  <td className="py-3 px-3 text-center">
                    {isFeasible ? (
                      <span className="inline-flex items-center text-[11px] font-medium text-teal-300 bg-teal-950 px-2 py-0.5 rounded border border-teal-800/60">
                        Eligible
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-[11px] font-medium text-rose-300 bg-rose-950 px-2 py-0.5 rounded border border-rose-800/60">
                        Unavailable
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3 text-center font-mono font-semibold text-slate-200">
                    {spec.suitabilityScore}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bottom CTA to Optimizer */}
      <div className="flex items-center justify-between p-3.5 rounded-lg bg-slate-900 border border-slate-800">
        <div className="text-xs text-slate-300">
          Ready to run the multi-objective voyage optimizer with these fuels?
        </div>
        <button
          onClick={onGoToOptimizer}
          className="px-3.5 py-1.5 rounded-md bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs transition-colors flex items-center space-x-1"
        >
          <span>Run Voyage Optimizer</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

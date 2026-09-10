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
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-xs font-medium bg-[#EDF5F1] text-[#258F87] border border-[#D9E2DE]">
            <CheckCircle2 className="w-3 h-3 text-[#258F87]" />
            <span>Available</span>
          </span>
        );
      case 'Limited':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-xs font-medium bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
            <AlertTriangle className="w-3 h-3 text-[#D97706]" />
            <span>Limited</span>
          </span>
        );
      case 'Unavailable':
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-xs font-medium bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]">
            <XCircle className="w-3 h-3 text-[#DC2626]" />
            <span>Unavailable</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="pb-2 border-b border-[#D9E2DE]">
        <h2 className="text-xl font-bold text-[#16324F] flex items-center gap-2">
          <Fuel className="w-5 h-5 text-[#258F87]" />
          <span>Green Fuel Scenario Engine</span>
        </h2>
        <p className="text-xs text-[#64748B] mt-0.5">
          Compare alternative fuels against port availability constraints and simulated carbon pricing.
        </p>
      </div>

      {/* HARD OPERATIONAL CONSTRAINT BANNER */}
      <div className="rounded-lg bg-[#FFFBEB] p-4 border border-[#FDE68A] space-y-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-[#B45309] font-semibold text-xs uppercase tracking-wide">
              <ShieldAlert className="w-4 h-4 text-[#D97706]" />
              <span>Hard Operational Constraint: Fuel Availability by Port</span>
            </div>
            <p className="text-xs text-[#78350F] leading-relaxed">
              “NautiQ treats fuel availability as a hard operational constraint. If a fuel is unavailable at a required port, the optimizer will NOT recommend it.”
            </p>
          </div>

          {/* Active Corridor Port Pair */}
          <div className="bg-white px-3 py-2 rounded-md border border-[#FDE68A] shrink-0 text-xs">
            <span className="text-[#64748B] block text-[10px]">SELECTED ROUTE</span>
            <span className="font-semibold text-[#16324F]">{originPort.name.split(' ')[0]} → {destPort.name.split(' ')[0]}</span>
          </div>
        </div>
      </div>

      {/* Carbon Tax Slider */}
      <div className="rounded-lg bg-white p-4 border border-[#D9E2DE] shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <span className="text-xs font-semibold text-[#16324F] flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#258F87]" />
              <span>Simulate IMO Carbon Levy / ETS Carbon Tax</span>
            </span>
            <p className="text-xs text-[#64748B] mt-0.5">
              Simulate carbon penalties ($/ton CO₂) to evaluate clean fuel cost parity.
            </p>
          </div>
          <div className="text-xs font-mono font-bold text-[#16324F] bg-[#EDF5F1] px-2.5 py-1 rounded border border-[#D9E2DE]">
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
          className="w-full accent-[#258F87] bg-[#E2E8F0] h-1.5 rounded cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[#64748B]">
          <span>$0/t</span>
          <span>$50/t (EU ETS)</span>
          <span>$150/t (IMO 2030 Proposal)</span>
          <span>$250/t (High Ambition)</span>
        </div>
      </div>

      {/* Green Fuel Matrix Table */}
      <div className="overflow-x-auto rounded-lg border border-[#D9E2DE] bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#D9E2DE] bg-[#F8FAF9] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
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
          <tbody className="divide-y divide-[#D9E2DE] text-xs">
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
                  className={`hover:bg-[#F8FAF9] transition-colors ${
                    voyageInput.fuelType === fuel ? 'bg-[#EDF5F1]/60 font-medium' : ''
                  }`}
                >
                  <td className="py-3 px-3.5">
                    <span className="font-bold text-[#16324F] block">{spec.name}</span>
                    <span className="text-[10px] text-[#64748B] block">{spec.fullName}</span>
                  </td>

                  <td className="py-3 px-3 font-mono text-[#1F2937]">
                    <div>{formatINR(spec.costPerTonINR)}</div>
                    <div className="text-[10px] text-[#64748B]">${spec.costPerTonUSD}/t</div>
                  </td>

                  <td className="py-3 px-3 font-mono text-[#1F2937]">
                    <span className="font-semibold">{pred.fuelConsumptionTons} MT</span>
                    <span className="text-[10px] text-[#64748B] block">{spec.energyDensityMJkg} MJ/kg</span>
                  </td>

                  <td className="py-3 px-3 font-mono">
                    <span className={`font-semibold ${pred.co2EmissionsTons < 150 ? 'text-[#5B8C72]' : 'text-[#1F2937]'}`}>
                      {pred.co2EmissionsTons} MT
                    </span>
                    <span className="text-[10px] text-[#64748B] block">{spec.co2FactorTonPerTon} tCO₂/t</span>
                  </td>

                  <td className="py-3 px-3 font-mono">
                    <span className="font-semibold text-[#16324F]">{formatINR(totalCostWithTaxINR)}</span>
                    {carbonTaxUSD > 0 && (
                      <span className="text-[10px] text-[#64748B] block">
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
                      <span className="inline-flex items-center text-[11px] font-medium text-[#258F87] bg-[#EDF5F1] px-2 py-0.5 rounded border border-[#D9E2DE]">
                        Eligible
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-[11px] font-medium text-[#DC2626] bg-[#FEF2F2] px-2 py-0.5 rounded border border-[#FECACA]">
                        Unavailable
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3 text-center font-mono font-semibold text-[#16324F]">
                    {spec.suitabilityScore}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bottom CTA to Optimizer */}
      <div className="flex items-center justify-between p-3.5 rounded-lg bg-white border border-[#D9E2DE] shadow-sm">
        <div className="text-xs text-[#1F2937]">
          Ready to run the multi-objective voyage optimizer with these fuels?
        </div>
        <button
          onClick={onGoToOptimizer}
          className="px-3.5 py-1.5 rounded-md bg-[#258F87] hover:bg-[#1E746D] text-white font-medium text-xs transition-colors flex items-center space-x-1 shadow-sm"
        >
          <span>Run Voyage Optimizer</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

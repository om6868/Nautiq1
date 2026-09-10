import React, { useState } from 'react';
import { Ship, Gauge, Fuel, Clock, Leaf, IndianRupee, AlertCircle, Info, Sliders } from 'lucide-react';
import { ALL_FUELS, FUEL_SPECS } from '../data/fuels';
import { PORTS, getDistanceBetweenPorts } from '../data/ports';
import { VESSELS, VESSEL_TYPES } from '../data/vessels';
import { PredictionResult, VoyageInput } from '../types';
import { calculateVoyagePrediction, formatINR, formatUSD } from '../utils/fuelPhysics';

interface FuelPredictionCardProps {
  voyageInput: VoyageInput;
  setVoyageInput: React.Dispatch<React.SetStateAction<VoyageInput>>;
  onGoToOptimizer: () => void;
}

export const FuelPredictionCard: React.FC<FuelPredictionCardProps> = ({
  voyageInput,
  setVoyageInput,
  onGoToOptimizer
}) => {
  const [prediction, setPrediction] = useState<PredictionResult>(() => calculateVoyagePrediction(voyageInput));
  const [validationError, setValidationError] = useState<string | null>(null);

  const selectedVessel = VESSELS.find(v => v.type === voyageInput.vesselType) || VESSELS[0];
  const selectedFuel = FUEL_SPECS[voyageInput.fuelType] || FUEL_SPECS.HFO;

  const handlePredict = () => {
    // Validation
    if (!voyageInput.distanceNM || voyageInput.distanceNM <= 0) {
      setValidationError('Please provide a positive voyage distance in nautical miles.');
      return;
    }
    if (!voyageInput.speedKnots || voyageInput.speedKnots < 5 || voyageInput.speedKnots > 35) {
      setValidationError('Ship cruising speed must be between 5.0 and 35.0 knots.');
      return;
    }
    if (voyageInput.cargoLoadPct < 0 || voyageInput.cargoLoadPct > 100) {
      setValidationError('Cargo loading percentage must be between 0% and 100%.');
      return;
    }

    setValidationError(null);
    const result = calculateVoyagePrediction(voyageInput);
    setPrediction(result);
  };

  const handlePortChange = (type: 'origin' | 'dest', portId: string) => {
    const originId = type === 'origin' ? portId : voyageInput.originPortId;
    const destId = type === 'dest' ? portId : voyageInput.destPortId;
    const distance = getDistanceBetweenPorts(originId, destId);

    setVoyageInput(prev => ({
      ...prev,
      originPortId: originId,
      destPortId: destId,
      distanceNM: distance
    }));
  };

  const ciiColors: Record<string, string> = {
    A: 'bg-[#EDF5F1] text-[#5B8C72] border-[#D9E2DE]',
    B: 'bg-[#EDF5F1] text-[#258F87] border-[#D9E2DE]',
    C: 'bg-slate-100 text-slate-700 border-slate-200',
    D: 'bg-amber-50 text-amber-800 border-amber-200',
    E: 'bg-rose-50 text-rose-800 border-rose-200'
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="pb-2 border-b border-[#D9E2DE]">
        <h2 className="text-xl font-bold text-[#16324F] flex items-center gap-2">
          <Fuel className="w-5 h-5 text-[#258F87]" />
          <span>Voyage Fuel Prediction</span>
        </h2>
        <p className="text-xs text-[#64748B] mt-0.5">
          Deterministic hydrodynamic & energy consumption model.
        </p>
      </div>

      {/* Main Grid: Input Parameters Form + Prediction Output Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Voyage Inputs Form (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-lg p-5 border border-[#D9E2DE] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#D9E2DE]">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#16324F] flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#258F87]" />
              <span>Voyage & Vessel Parameters</span>
            </span>
          </div>

          {/* Validation alert */}
          {validationError && (
            <div className="p-2.5 rounded bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Vessel Selection */}
          <div>
            <label className="block text-xs font-medium text-[#64748B] mb-1.5">
              Vessel Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {VESSEL_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setVoyageInput(prev => ({ ...prev, vesselType: type }))}
                  className={`px-2.5 py-2 rounded-md text-xs font-medium text-left border transition-colors ${
                    voyageInput.vesselType === type
                      ? 'bg-[#EDF5F1] text-[#258F87] border-[#258F87]'
                      : 'bg-slate-50 text-slate-700 border-[#D9E2DE] hover:bg-slate-100'
                  }`}
                >
                  <Ship className={`w-3.5 h-3.5 mb-1 ${voyageInput.vesselType === type ? 'text-[#258F87]' : 'text-slate-400'}`} />
                  <span className="font-semibold block">{type}</span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[#64748B] mt-1">
              Profile: {selectedVessel.name} ({selectedVessel.dwt.toLocaleString()} DWT)
            </p>
          </div>

          {/* Origin & Destination Ports */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs font-medium text-[#64748B] mb-1">
                Origin Port
              </label>
              <select
                value={voyageInput.originPortId}
                onChange={(e) => handlePortChange('origin', e.target.value)}
                className="w-full bg-white border border-[#D9E2DE] rounded-md px-2.5 py-1.5 text-xs text-[#1F2937] focus:border-[#258F87] focus:outline-none"
              >
                {PORTS.map(port => (
                  <option key={port.id} value={port.id}>
                    {port.name} ({port.code})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#64748B] mb-1">
                Destination Port
              </label>
              <select
                value={voyageInput.destPortId}
                onChange={(e) => handlePortChange('dest', e.target.value)}
                className="w-full bg-white border border-[#D9E2DE] rounded-md px-2.5 py-1.5 text-xs text-[#1F2937] focus:border-[#258F87] focus:outline-none"
              >
                {PORTS.map(port => (
                  <option key={port.id} value={port.id}>
                    {port.name} ({port.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Distance (NM) */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-[#64748B]">
                Voyage Distance (NM)
              </label>
              <span className="text-xs font-mono text-[#16324F] font-semibold">
                {voyageInput.distanceNM.toLocaleString()} NM
              </span>
            </div>
            <input
              type="number"
              min={100}
              max={15000}
              step={50}
              value={voyageInput.distanceNM}
              onChange={(e) => setVoyageInput(prev => ({ ...prev, distanceNM: Number(e.target.value) }))}
              className="w-full bg-white border border-[#D9E2DE] rounded-md px-2.5 py-1.5 text-xs text-[#1F2937] font-mono focus:border-[#258F87] focus:outline-none"
            />
          </div>

          {/* Average Speed (knots) Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-[#64748B]">
                Average Speed
              </label>
              <span className="text-xs font-mono text-[#258F87] font-semibold px-2 py-0.5 rounded bg-[#EDF5F1] border border-[#D9E2DE]">
                {voyageInput.speedKnots.toFixed(1)} Knots
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={24}
              step={0.5}
              value={voyageInput.speedKnots}
              onChange={(e) => setVoyageInput(prev => ({ ...prev, speedKnots: parseFloat(e.target.value) }))}
              className="w-full accent-[#258F87] bg-slate-200 h-1.5 rounded cursor-pointer"
            />
          </div>

          {/* Cargo Load (%) Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-[#64748B]">
                Cargo Load
              </label>
              <span className="text-xs font-mono text-[#16324F]">
                {voyageInput.cargoLoadPct}%
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              step={1}
              value={voyageInput.cargoLoadPct}
              onChange={(e) => setVoyageInput(prev => ({ ...prev, cargoLoadPct: parseInt(e.target.value) }))}
              className="w-full accent-[#258F87] bg-slate-200 h-1.5 rounded cursor-pointer"
            />
          </div>

          {/* Current Fuel Type Selection */}
          <div>
            <label className="block text-xs font-medium text-[#64748B] mb-1.5">
              Current Fuel Type
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {ALL_FUELS.map(fuel => {
                const isSelected = voyageInput.fuelType === fuel;
                return (
                  <button
                    key={fuel}
                    type="button"
                    onClick={() => setVoyageInput(prev => ({ ...prev, fuelType: fuel }))}
                    className={`px-2 py-1.5 rounded-md text-xs font-medium border text-center transition-colors ${
                      isSelected
                        ? 'bg-[#EDF5F1] text-[#258F87] border-[#258F87]'
                        : 'bg-slate-50 text-slate-700 border-[#D9E2DE] hover:bg-slate-100'
                    }`}
                  >
                    <span className="font-semibold block">{fuel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Predict CTA */}
          <button
            onClick={handlePredict}
            className="w-full py-2.5 rounded-md bg-[#258F87] hover:bg-[#1E746D] text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5 shadow-sm"
          >
            <Gauge className="w-4 h-4" />
            <span>Predict Fuel Consumption</span>
          </button>
        </div>

        {/* Right Column: Prediction Results Dashboard (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main 4 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Metric 1: Fuel Consumption */}
            <div className="rounded-lg bg-white p-4 border border-[#D9E2DE] shadow-sm space-y-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#64748B] font-medium">
                  Estimated Fuel Consumption
                </span>
                <Fuel className="w-4 h-4 text-[#258F87]" />
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-[#16324F]">
                  {prediction.fuelConsumptionTons.toLocaleString()}
                </span>
                <span className="text-xs text-[#64748B] font-medium">Metric Tons</span>
              </div>
              <p className="text-xs text-[#64748B] pt-1">
                Rate: <strong className="text-[#16324F]">{prediction.dailyConsumptionTons} MT/day</strong> ({selectedFuel.name})
              </p>
            </div>

            {/* Metric 2: Estimated Fuel Cost */}
            <div className="rounded-lg bg-white p-4 border border-[#D9E2DE] shadow-sm space-y-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#64748B] font-medium">
                  Estimated Fuel Cost
                </span>
                <IndianRupee className="w-4 h-4 text-[#258F87]" />
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-[#16324F]">
                  {formatINR(prediction.fuelCostINR)}
                </span>
              </div>
              <p className="text-xs text-[#64748B] pt-1">
                Equivalent: <strong className="text-[#16324F]">{formatUSD(prediction.fuelCostUSD)}</strong> @ ₹{selectedFuel.costPerTonINR.toLocaleString()}/MT
              </p>
            </div>

            {/* Metric 3: CO2 Emissions */}
            <div className="rounded-lg bg-white p-4 border border-[#D9E2DE] shadow-sm space-y-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#64748B] font-medium">
                  Estimated CO₂ Emissions
                </span>
                <Leaf className="w-4 h-4 text-[#5B8C72]" />
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-[#16324F]">
                  {prediction.co2EmissionsTons.toLocaleString()}
                </span>
                <span className="text-xs text-[#64748B] font-medium">MT CO₂e</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-[#64748B]">
                  Factor: {selectedFuel.co2FactorTonPerTon} tCO₂/t
                </span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${ciiColors[prediction.ciiRating]}`}>
                  CII Grade {prediction.ciiRating}
                </span>
              </div>
            </div>

            {/* Metric 4: Voyage Duration */}
            <div className="rounded-lg bg-white p-4 border border-[#D9E2DE] shadow-sm space-y-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#64748B] font-medium">
                  Voyage Duration & ETA
                </span>
                <Clock className="w-4 h-4 text-[#64748B]" />
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-[#16324F]">
                  {prediction.durationHours}
                </span>
                <span className="text-xs text-[#64748B] font-medium">Hours</span>
              </div>
              <p className="text-xs text-[#64748B] pt-1">
                Transit: <strong className="text-[#16324F]">{prediction.durationDays} days</strong> ({voyageInput.speedKnots} kts)
              </p>
            </div>
          </div>

          {/* Physics Engine Callout Box */}
          <div className="rounded-lg bg-[#EDF5F1] p-4 border border-[#D9E2DE] text-xs space-y-2">
            <div className="flex items-center space-x-2 text-[#16324F] font-semibold">
              <Info className="w-4 h-4 text-[#258F87]" />
              <span>Physics-Informed Model Details</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Fuel consumption scales non-linearly with speed cubed (<span className="font-mono text-[#258F87] font-semibold">P ∝ Δ²/³ · V³·⁰⁵</span>). Cargo displacement and fuel Lower Heating Value (LHV) adjust the required fuel mass.
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#D9E2DE] text-[11px] text-[#64748B]">
              <span>Production uses FlowState Physics-Informed Neural Network (PINN)</span>
              <button
                onClick={onGoToOptimizer}
                className="text-[#258F87] hover:text-[#1E746D] font-medium underline"
              >
                Go to Optimizer →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

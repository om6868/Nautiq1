import React, { useState } from 'react';
import { Ship, Gauge, Fuel, Navigation, Clock, Leaf, IndianRupee, AlertCircle, Info, Sparkles, CheckCircle2, Sliders } from 'lucide-react';
import { ALL_FUELS, FUEL_SPECS } from '../data/fuels';
import { PORTS, getDistanceBetweenPorts } from '../data/ports';
import { VESSELS, VESSEL_TYPES } from '../data/vessels';
import { FuelType, PredictionResult, VesselType, VoyageInput } from '../types';
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
  const [hasCalculated, setHasCalculated] = useState(true);
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
    setHasCalculated(true);
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
    A: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
    B: 'bg-teal-500/20 text-teal-300 border-teal-500/50',
    C: 'bg-sky-500/20 text-sky-300 border-sky-500/50',
    D: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
    E: 'bg-rose-500/20 text-rose-300 border-rose-500/50'
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Fuel className="w-6 h-6 text-emerald-400" />
            <span>Voyage Fuel Prediction</span>
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Physics-calibrated deterministic hydrodynamic & energy consumption model.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs px-2.5 py-1 rounded-md bg-sky-950/80 text-sky-300 border border-sky-800/50 font-mono">
            Model: Admiralty + LHV Calc
          </span>
        </div>
      </div>

      {/* Main Grid: Input Parameters Form + Prediction Output Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Voyage Inputs Form (5 cols) */}
        <div className="lg:col-span-5 bg-[#0B132B]/90 backdrop-blur-md rounded-2xl p-6 border border-sky-900/30 space-y-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-sky-400" />
              <span>Voyage & Vessel Parameters</span>
            </span>
            <span className="text-xs text-slate-400">Step 1 of 2</span>
          </div>

          {/* Validation alert */}
          {validationError && (
            <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Vessel Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Vessel Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {VESSEL_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setVoyageInput(prev => ({ ...prev, vesselType: type }))}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium text-left border transition-all ${
                    voyageInput.vesselType === type
                      ? 'bg-sky-500/20 text-sky-200 border-sky-400 shadow-sm'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-300'
                  }`}
                >
                  <Ship className={`w-3.5 h-3.5 mb-1 ${voyageInput.vesselType === type ? 'text-sky-400' : 'text-slate-500'}`} />
                  <span className="font-semibold block">{type}</span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Profile: {selectedVessel.name} ({selectedVessel.dwt.toLocaleString()} DWT)
            </p>
          </div>

          {/* Origin & Destination Ports */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Origin Port
              </label>
              <select
                value={voyageInput.originPortId}
                onChange={(e) => handlePortChange('origin', e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
              >
                {PORTS.map(port => (
                  <option key={port.id} value={port.id}>
                    {port.name} ({port.code})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Destination Port
              </label>
              <select
                value={voyageInput.destPortId}
                onChange={(e) => handlePortChange('dest', e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
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
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Voyage Distance (NM)
              </label>
              <span className="text-xs font-mono text-sky-400 font-semibold">
                {voyageInput.distanceNM.toLocaleString()} Nautical Miles
              </span>
            </div>
            <input
              type="number"
              min={100}
              max={15000}
              step={50}
              value={voyageInput.distanceNM}
              onChange={(e) => setVoyageInput(prev => ({ ...prev, distanceNM: Number(e.target.value) }))}
              className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white font-mono focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          {/* Average Speed (knots) Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Average Speed
              </label>
              <span className="text-xs font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30">
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
              className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>10.0 kts (Super Eco)</span>
              <span>16-18 kts (Standard)</span>
              <span>24.0 kts (Max Power)</span>
            </div>
          </div>

          {/* Cargo Load (%) Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Cargo Load
              </label>
              <span className="text-xs font-mono text-sky-400 font-semibold">
                {voyageInput.cargoLoadPct}% Payload
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              step={1}
              value={voyageInput.cargoLoadPct}
              onChange={(e) => setVoyageInput(prev => ({ ...prev, cargoLoadPct: parseInt(e.target.value) }))}
              className="w-full accent-sky-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Current Fuel Type Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Current Fuel Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {ALL_FUELS.map(fuel => {
                const spec = FUEL_SPECS[fuel];
                const isSelected = voyageInput.fuelType === fuel;
                return (
                  <button
                    key={fuel}
                    type="button"
                    onClick={() => setVoyageInput(prev => ({ ...prev, fuelType: fuel }))}
                    className={`px-2.5 py-2 rounded-lg text-xs font-medium border text-center transition-all ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 shadow-sm'
                        : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-300'
                    }`}
                  >
                    <span className="font-bold block">{fuel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Predict CTA */}
          <button
            onClick={handlePredict}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 hover:from-sky-500 hover:via-teal-500 hover:to-emerald-500 text-white font-bold text-sm shadow-lg shadow-sky-600/20 transition-all transform active:scale-[0.99] flex items-center justify-center space-x-2"
          >
            <Gauge className="w-5 h-5" />
            <span>Predict Fuel Consumption</span>
          </button>
        </div>

        {/* Right Column: Prediction Results Dashboard (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Main 4 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Metric 1: Fuel Consumption */}
            <div className="rounded-2xl bg-[#0B132B]/90 backdrop-blur-md p-5 border border-sky-900/40 relative overflow-hidden shadow-xl group hover:border-sky-500/40 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Estimated Fuel Consumption
                </span>
                <div className="p-2 rounded-lg bg-sky-950/60 border border-sky-800/40 text-sky-400">
                  <Fuel className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl sm:text-4xl font-black font-mono text-white">
                  {prediction.fuelConsumptionTons.toLocaleString()}
                </span>
                <span className="text-sm font-bold text-sky-400">Metric Tons</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Burn rate: <strong className="text-slate-200">{prediction.dailyConsumptionTons} MT/day</strong> ({selectedFuel.name})
              </p>
            </div>

            {/* Metric 2: Estimated Fuel Cost */}
            <div className="rounded-2xl bg-[#0B132B]/90 backdrop-blur-md p-5 border border-sky-900/40 relative overflow-hidden shadow-xl group hover:border-sky-500/40 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Estimated Fuel Cost
                </span>
                <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-400">
                  <IndianRupee className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl sm:text-4xl font-black font-mono text-emerald-400">
                  {formatINR(prediction.fuelCostINR)}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Equivalent: <strong className="text-slate-200">{formatUSD(prediction.fuelCostUSD)}</strong> @ ₹{selectedFuel.costPerTonINR.toLocaleString()}/MT
              </p>
            </div>

            {/* Metric 3: CO2 Emissions */}
            <div className="rounded-2xl bg-[#0B132B]/90 backdrop-blur-md p-5 border border-sky-900/40 relative overflow-hidden shadow-xl group hover:border-teal-500/40 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Estimated CO₂ Emissions
                </span>
                <div className="p-2 rounded-lg bg-teal-950/60 border border-teal-800/40 text-teal-400">
                  <Leaf className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl sm:text-4xl font-black font-mono text-teal-300">
                  {prediction.co2EmissionsTons.toLocaleString()}
                </span>
                <span className="text-sm font-bold text-teal-400">MT CO₂e</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-400">
                  Factor: {selectedFuel.co2FactorTonPerTon} tCO₂/t
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${ciiColors[prediction.ciiRating]}`}>
                  CII Grade {prediction.ciiRating}
                </span>
              </div>
            </div>

            {/* Metric 4: Voyage Duration */}
            <div className="rounded-2xl bg-[#0B132B]/90 backdrop-blur-md p-5 border border-sky-900/40 relative overflow-hidden shadow-xl group hover:border-sky-500/40 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Voyage Duration & ETA
                </span>
                <div className="p-2 rounded-lg bg-sky-950/60 border border-sky-800/40 text-sky-400">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl sm:text-4xl font-black font-mono text-sky-300">
                  {prediction.durationHours}
                </span>
                <span className="text-sm font-bold text-sky-400">Hours</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Transit time: <strong className="text-slate-200">{prediction.durationDays} days</strong> ({voyageInput.speedKnots} knots steady)
              </p>
            </div>
          </div>

          {/* Physics Engine Callout Box */}
          <div className="rounded-2xl bg-gradient-to-r from-sky-950/60 via-slate-900/80 to-emerald-950/60 p-5 border border-sky-800/30 text-xs space-y-3">
            <div className="flex items-center space-x-2 text-sky-300 font-semibold">
              <Info className="w-4 h-4 text-sky-400" />
              <span>Physics-Informed Model Mechanics</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Fuel consumption scales non-linearly with speed cubed (<span className="font-mono text-emerald-400">P ∝ Δ²/³ · V³·⁰⁵</span>). Increasing speed from 14 to 18 knots surges fuel burn by over 80%. Cargo displacement and fuel Lower Heating Value (LHV) adjust the thermal mass required.
            </p>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Production uses FlowState Physics-Informed Neural Network (PINN)</span>
              </div>
              <button
                onClick={onGoToOptimizer}
                className="inline-flex items-center space-x-1.5 text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4"
              >
                <span>Ready to find a greener route? Launch Optimizer →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

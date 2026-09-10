import React, { useState } from 'react';
import { Sparkles, Zap, Sliders, Info } from 'lucide-react';
import { ALL_FUELS } from '../data/fuels';
import { PORTS, getDistanceBetweenPorts } from '../data/ports';
import { VESSEL_TYPES } from '../data/vessels';
import { CandidatePlan, RecommendationDetails, VoyageInput } from '../types';
import { optimizeVoyage } from '../utils/quantumOptimizer';
import { RecommendationCard } from './RecommendationCard';
import { VoyageComparison } from './VoyageComparison';
import { CostEmissionChart } from './Charts/CostEmissionChart';
import { RouteVisualizer } from './RouteVisualizer';
import { QuantumDetailsModal } from './QuantumDetailsModal';

interface VoyageOptimizerProps {
  voyageInput: VoyageInput;
  setVoyageInput: React.Dispatch<React.SetStateAction<VoyageInput>>;
}

export const VoyageOptimizer: React.FC<VoyageOptimizerProps> = ({
  voyageInput,
  setVoyageInput
}) => {
  // Optimization result states
  const [optimizationResult, setOptimizationResult] = useState<{
    plans: CandidatePlan[];
    recommendation: RecommendationDetails;
    allGeneratedCount: number;
  }>(() => optimizeVoyage(voyageInput));

  const [selectedPlanId, setSelectedPlanId] = useState<string>('nautiq-balanced');
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [isQuantumModalOpen, setIsQuantumModalOpen] = useState<boolean>(false);

  const handleRunOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      const result = optimizeVoyage(voyageInput);
      setOptimizationResult(result);
      setSelectedPlanId('nautiq-balanced');
      setIsOptimizing(false);
    }, 300);
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

  const activePlan = optimizationResult.plans.find(p => p.id === selectedPlanId) || optimizationResult.plans[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>NautiQ Voyage Optimizer</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Quantum-inspired combinatorial solver balancing fuel cost, emissions, and schedule reliability.
        </p>
      </div>

      {/* Input Configuration Card */}
      <div className="bg-slate-900 rounded-lg p-5 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-300 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-teal-400" />
            <span>Voyage Input Parameters</span>
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {optimizationResult.allGeneratedCount}+ Permutations Evaluated
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 text-xs">
          {/* Vessel */}
          <div>
            <label className="block font-medium text-slate-400 mb-1">
              Vessel
            </label>
            <select
              value={voyageInput.vesselType}
              onChange={(e) => setVoyageInput(prev => ({ ...prev, vesselType: e.target.value as any }))}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-2.5 py-1.5 text-white focus:border-teal-500 focus:outline-none"
            >
              {VESSEL_TYPES.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Origin Port */}
          <div>
            <label className="block font-medium text-slate-400 mb-1">
              Origin Port
            </label>
            <select
              value={voyageInput.originPortId}
              onChange={(e) => handlePortChange('origin', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-2.5 py-1.5 text-white focus:border-teal-500 focus:outline-none"
            >
              {PORTS.map(p => (
                <option key={p.id} value={p.id}>{p.name.split(' ')[0]}</option>
              ))}
            </select>
          </div>

          {/* Destination Port */}
          <div>
            <label className="block font-medium text-slate-400 mb-1">
              Destination Port
            </label>
            <select
              value={voyageInput.destPortId}
              onChange={(e) => handlePortChange('dest', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-2.5 py-1.5 text-white focus:border-teal-500 focus:outline-none"
            >
              {PORTS.map(p => (
                <option key={p.id} value={p.id}>{p.name.split(' ')[0]}</option>
              ))}
            </select>
          </div>

          {/* Cargo Load */}
          <div>
            <label className="block font-medium text-slate-400 mb-1">
              Cargo Load ({voyageInput.cargoLoadPct}%)
            </label>
            <input
              type="number"
              min={10}
              max={100}
              value={voyageInput.cargoLoadPct}
              onChange={(e) => setVoyageInput(prev => ({ ...prev, cargoLoadPct: Number(e.target.value) }))}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-2.5 py-1.5 text-white font-mono focus:border-teal-500 focus:outline-none"
            />
          </div>

          {/* Current Speed */}
          <div>
            <label className="block font-medium text-slate-400 mb-1">
              Speed ({voyageInput.speedKnots} kts)
            </label>
            <input
              type="number"
              step={0.5}
              min={10}
              max={24}
              value={voyageInput.speedKnots}
              onChange={(e) => setVoyageInput(prev => ({ ...prev, speedKnots: Number(e.target.value) }))}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-2.5 py-1.5 text-white font-mono focus:border-teal-500 focus:outline-none"
            />
          </div>

          {/* Current Fuel */}
          <div>
            <label className="block font-medium text-slate-400 mb-1">
              Current Fuel
            </label>
            <select
              value={voyageInput.fuelType}
              onChange={(e) => setVoyageInput(prev => ({ ...prev, fuelType: e.target.value as any }))}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-2.5 py-1.5 text-white focus:border-teal-500 focus:outline-none"
            >
              {ALL_FUELS.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Primary Optimize CTA Button */}
        <div className="pt-1">
          <button
            onClick={handleRunOptimization}
            disabled={isOptimizing}
            className="w-full py-2.5 px-4 rounded-md bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-2"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>{isOptimizing ? 'Evaluating Voyage Combinations...' : 'Optimize My Voyage'}</span>
          </button>
        </div>

        {/* Quantum Solver Status Line */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
          <div className="flex items-center space-x-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-300">Quantum-Inspired Search:</span>
            <span>Searching 100+ possible voyage combinations across speed, route, and fuel</span>
          </div>
          <button
            onClick={() => setIsQuantumModalOpen(true)}
            className="text-teal-400 hover:text-teal-300 font-medium underline mt-1 sm:mt-0 text-xs"
          >
            View Technical Details
          </button>
        </div>
      </div>

      {/* Hero Recommendation Card */}
      <RecommendationCard
        recommendation={optimizationResult.recommendation}
        onOpenTechnicalDetails={() => setIsQuantumModalOpen(true)}
      />

      {/* 3 Comparison Cards (Current Plan, NautiQ Eco, NautiQ Balanced) */}
      <VoyageComparison
        plans={optimizationResult.plans}
        selectedPlanId={selectedPlanId}
        onSelectPlan={(id) => setSelectedPlanId(id)}
      />

      {/* Visual Analytics Row: Cost vs Emission Chart & Corridor Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-6">
          <CostEmissionChart plans={optimizationResult.plans} />
        </div>
        <div className="lg:col-span-6">
          <RouteVisualizer voyageInput={voyageInput} activePlan={activePlan} />
        </div>
      </div>

      {/* Technical Quantum Details Modal */}
      <QuantumDetailsModal
        isOpen={isQuantumModalOpen}
        onClose={() => setIsQuantumModalOpen(false)}
        recommendation={optimizationResult.recommendation}
      />
    </div>
  );
};

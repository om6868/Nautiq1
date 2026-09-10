import React, { useState } from 'react';
import { Sparkles, Zap, Sliders, Ship, Fuel, Navigation, Clock, Leaf, IndianRupee, Atom, CheckCircle2, RotateCcw } from 'lucide-react';
import { ALL_FUELS, FUEL_SPECS } from '../data/fuels';
import { PORTS, getDistanceBetweenPorts } from '../data/ports';
import { VESSELS, VESSEL_TYPES } from '../data/vessels';
import { CandidatePlan, RecommendationDetails, VoyageInput } from '../types';
import { optimizeVoyage } from '../utils/quantumOptimizer';
import { RecommendationCard } from './RecommendationCard';
import { VoyageComparison } from './VoyageComparison';
import { CostEmissionChart } from './Charts/CostEmissionChart';
import { RouteVisualizer } from './RouteVisualizer';
import { QuantumDetailsModal } from './QuantumDetailsModal';
import confetti from 'canvas-confetti';

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

  const selectedVessel = VESSELS.find(v => v.type === voyageInput.vesselType) || VESSELS[0];

  const handleRunOptimization = () => {
    setIsOptimizing(true);
    // Smooth immediate simulation state for quantum search effect
    setTimeout(() => {
      const result = optimizeVoyage(voyageInput);
      setOptimizationResult(result);
      setSelectedPlanId('nautiq-balanced');
      setIsOptimizing(false);

      // Trigger celebratory micro-confetti on successful quantum optimization
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#10B981', '#06B6D4', '#38BDF8']
        });
      } catch (e) {
        // Ignore in environments where canvas is not supported
      }
    }, 450);
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
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald-400" />
            <span>NautiQ Voyage Optimizer</span>
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Quantum-inspired combinatorial solver balancing fuel cost, greenhouse gas emissions, and schedule reliability.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-mono">
            Pareto Frontier Multi-Objective
          </span>
        </div>
      </div>

      {/* Input Configuration Bar & Primary Optimize CTA */}
      <div className="bg-[#0B132B]/90 backdrop-blur-md rounded-2xl p-6 border border-sky-900/40 shadow-xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-400" />
            <span>Voyage Input Parameters for Optimization</span>
          </span>
          <span className="text-xs font-mono text-emerald-400">
            {optimizationResult.allGeneratedCount}+ Permutations Ready
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5 text-xs">
          {/* Vessel */}
          <div>
            <label className="block font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Vessel
            </label>
            <select
              value={voyageInput.vesselType}
              onChange={(e) => setVoyageInput(prev => ({ ...prev, vesselType: e.target.value as any }))}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              {VESSEL_TYPES.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Origin Port */}
          <div>
            <label className="block font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Origin Port
            </label>
            <select
              value={voyageInput.originPortId}
              onChange={(e) => handlePortChange('origin', e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              {PORTS.map(p => (
                <option key={p.id} value={p.id}>{p.name.split(' ')[0]}</option>
              ))}
            </select>
          </div>

          {/* Destination Port */}
          <div>
            <label className="block font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Destination Port
            </label>
            <select
              value={voyageInput.destPortId}
              onChange={(e) => handlePortChange('dest', e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              {PORTS.map(p => (
                <option key={p.id} value={p.id}>{p.name.split(' ')[0]}</option>
              ))}
            </select>
          </div>

          {/* Cargo Load */}
          <div>
            <label className="block font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Cargo Load ({voyageInput.cargoLoadPct}%)
            </label>
            <input
              type="number"
              min={10}
              max={100}
              value={voyageInput.cargoLoadPct}
              onChange={(e) => setVoyageInput(prev => ({ ...prev, cargoLoadPct: Number(e.target.value) }))}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-mono focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          {/* Current Speed */}
          <div>
            <label className="block font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Speed ({voyageInput.speedKnots} kts)
            </label>
            <input
              type="number"
              step={0.5}
              min={10}
              max={24}
              value={voyageInput.speedKnots}
              onChange={(e) => setVoyageInput(prev => ({ ...prev, speedKnots: Number(e.target.value) }))}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-mono focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          {/* Current Fuel */}
          <div>
            <label className="block font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Current Fuel
            </label>
            <select
              value={voyageInput.fuelType}
              onChange={(e) => setVoyageInput(prev => ({ ...prev, fuelType: e.target.value as any }))}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              {ALL_FUELS.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Large Primary Optimize CTA */}
        <div className="pt-2">
          <button
            onClick={handleRunOptimization}
            disabled={isOptimizing}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-sky-500 hover:from-emerald-500 hover:via-teal-400 hover:to-sky-400 text-white font-extrabold text-base shadow-xl shadow-emerald-500/25 transition-all transform active:scale-[0.99] flex items-center justify-center space-x-3 group"
          >
            <Zap className={`w-6 h-6 fill-white text-white ${isOptimizing ? 'animate-spin' : 'group-hover:scale-110 transition-transform'}`} />
            <span>{isOptimizing ? 'Evaluating Quantum States...' : '⚡ Optimize My Voyage'}</span>
          </button>
        </div>

        {/* Quantum Solver Simulation Tag */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/60">
          <div className="flex items-center space-x-2">
            <Atom className="w-4 h-4 text-emerald-400 animate-spin-slow" />
            <span className="font-semibold text-slate-200">Quantum-Inspired Optimization Engine:</span>
            <span className="text-slate-400">Searching 100+ multi-variable voyage combinations…</span>
          </div>
          <button
            onClick={() => setIsQuantumModalOpen(true)}
            className="text-sky-400 hover:text-sky-300 font-semibold underline underline-offset-2 mt-1 sm:mt-0"
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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

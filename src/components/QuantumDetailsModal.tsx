import React from 'react';
import { X, Cpu } from 'lucide-react';
import { RecommendationDetails } from '../types';

interface QuantumDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  recommendation: RecommendationDetails;
}

export const QuantumDetailsModal: React.FC<QuantumDetailsModalProps> = ({
  isOpen,
  onClose,
  recommendation
}) => {
  if (!isOpen) return null;

  const { quantumOptimizationMetadata } = recommendation;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-lg p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded bg-slate-800 text-teal-400 border border-slate-700">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Quantum-Inspired Optimization Architecture
              </h3>
              <p className="text-xs text-slate-400">
                QUBO / Multi-Objective Mathematical Formulation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Core Mathematical Formulation */}
        <div className="space-y-4">
          <div className="bg-slate-800/80 rounded-md p-4 border border-slate-700 space-y-2.5 font-mono text-xs">
            <div className="text-teal-300 font-semibold uppercase text-[11px]">
              Multi-Objective Hamiltonian Objective Function:
            </div>
            <div className="p-2.5 rounded bg-slate-950 text-teal-300 overflow-x-auto text-xs border border-slate-800">
              min H(s) = w_cost · C(s) + w_co2 · E(s) + w_time · T(s) + λ_port · P_unavail(s)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-300 text-[11px]">
              <div>• <strong>C(s)</strong>: Normalized bunker cost</div>
              <div>• <strong>E(s)</strong>: Well-to-Wake CO₂e emissions</div>
              <div>• <strong>T(s)</strong>: ETA deviation penalty</div>
              <div>• <strong>λ_port</strong>: Port availability constraint penalty</div>
            </div>
          </div>

          {/* Combinatorial State-Space Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="bg-slate-800/60 p-3 rounded-md border border-slate-700 space-y-0.5">
              <span className="text-[10px] text-slate-400 uppercase block font-medium">
                Combinations Evaluated
              </span>
              <span className="text-xl font-bold font-mono text-teal-400">
                {quantumOptimizationMetadata.combinationsEvaluated}+
              </span>
              <span className="text-[11px] text-slate-400 block">Candidate states</span>
            </div>

            <div className="bg-slate-800/60 p-3 rounded-md border border-slate-700 space-y-0.5">
              <span className="text-[10px] text-slate-400 uppercase block font-medium">
                Objective Weights
              </span>
              <div className="text-xs font-mono text-slate-200">
                Cost: {(quantumOptimizationMetadata.objectiveWeights.costWeight * 100).toFixed(0)}% | CO₂: {(quantumOptimizationMetadata.objectiveWeights.emissionWeight * 100).toFixed(0)}%
              </div>
              <span className="text-[11px] text-slate-400 block">Schedule: {(quantumOptimizationMetadata.objectiveWeights.scheduleWeight * 100).toFixed(0)}%</span>
            </div>

            <div className="bg-slate-800/60 p-3 rounded-md border border-slate-700 space-y-0.5">
              <span className="text-[10px] text-slate-400 uppercase block font-medium">
                Convergence
              </span>
              <span className="text-xl font-bold font-mono text-teal-300">
                {quantumOptimizationMetadata.convergenceIterations} iters
              </span>
              <span className="text-[11px] text-slate-400 block">Optimization cycles</span>
            </div>
          </div>

          {/* Physics-Informed Neural Network (PINN) Pipeline */}
          <div className="bg-slate-800/60 rounded-md p-4 border border-slate-700 space-y-1.5 text-xs">
            <span className="text-slate-200 font-semibold block">
              Hydrodynamic Drag & Physics-Informed Surrogates
            </span>
            <p className="text-slate-300 leading-relaxed">
              The platform integrates the discrete combinatorial solver with a Physics-Informed model. The model calculates cubic hydrodynamic hull resistance (<span className="font-mono text-teal-300">P ∝ Δ²/³ · V³</span>) and oceanographic weather margins to predict accurate voyage fuel consumption.
            </p>
          </div>
        </div>

        {/* Footer Close */}
        <div className="flex items-center justify-end pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

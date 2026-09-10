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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#16324F]/40 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-[#D9E2DE] rounded-lg p-6 space-y-5 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#D9E2DE]">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded bg-[#EDF5F1] text-[#258F87] border border-[#D9E2DE]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#16324F]">
                Quantum-Inspired Optimization Architecture
              </h3>
              <p className="text-xs text-[#64748B]">
                QUBO / Multi-Objective Mathematical Formulation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded bg-[#F8FAF9] text-[#64748B] hover:text-[#16324F] hover:bg-[#EDF5F1] border border-[#D9E2DE] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Core Mathematical Formulation */}
        <div className="space-y-4">
          <div className="bg-[#F8FAF9] rounded-md p-4 border border-[#D9E2DE] space-y-2.5 font-mono text-xs">
            <div className="text-[#258F87] font-semibold uppercase text-[11px]">
              Multi-Objective Hamiltonian Objective Function:
            </div>
            <div className="p-2.5 rounded bg-[#16324F] text-[#EDF5F1] overflow-x-auto text-xs border border-[#16324F]">
              min H(s) = w_cost · C(s) + w_co2 · E(s) + w_time · T(s) + λ_port · P_unavail(s)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[#64748B] text-[11px]">
              <div>• <strong className="text-[#16324F]">C(s)</strong>: Normalized bunker cost</div>
              <div>• <strong className="text-[#16324F]">E(s)</strong>: Well-to-Wake CO₂e emissions</div>
              <div>• <strong className="text-[#16324F]">T(s)</strong>: ETA deviation penalty</div>
              <div>• <strong className="text-[#16324F]">λ_port</strong>: Port availability constraint penalty</div>
            </div>
          </div>

          {/* Combinatorial State-Space Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="bg-[#F8FAF9] p-3 rounded-md border border-[#D9E2DE] space-y-0.5">
              <span className="text-[10px] text-[#64748B] uppercase block font-medium">
                Combinations Evaluated
              </span>
              <span className="text-xl font-bold font-mono text-[#258F87]">
                {quantumOptimizationMetadata.combinationsEvaluated}+
              </span>
              <span className="text-[11px] text-[#64748B] block">Candidate states</span>
            </div>

            <div className="bg-[#F8FAF9] p-3 rounded-md border border-[#D9E2DE] space-y-0.5">
              <span className="text-[10px] text-[#64748B] uppercase block font-medium">
                Objective Weights
              </span>
              <div className="text-xs font-mono text-[#16324F]">
                Cost: {(quantumOptimizationMetadata.objectiveWeights.costWeight * 100).toFixed(0)}% | CO₂: {(quantumOptimizationMetadata.objectiveWeights.emissionWeight * 100).toFixed(0)}%
              </div>
              <span className="text-[11px] text-[#64748B] block">Schedule: {(quantumOptimizationMetadata.objectiveWeights.scheduleWeight * 100).toFixed(0)}%</span>
            </div>

            <div className="bg-[#F8FAF9] p-3 rounded-md border border-[#D9E2DE] space-y-0.5">
              <span className="text-[10px] text-[#64748B] uppercase block font-medium">
                Convergence
              </span>
              <span className="text-xl font-bold font-mono text-[#5B8C72]">
                {quantumOptimizationMetadata.convergenceIterations} iters
              </span>
              <span className="text-[11px] text-[#64748B] block">Optimization cycles</span>
            </div>
          </div>

          {/* Physics-Informed Neural Network (PINN) Pipeline */}
          <div className="bg-[#F8FAF9] rounded-md p-4 border border-[#D9E2DE] space-y-1.5 text-xs">
            <span className="text-[#16324F] font-semibold block">
              Hydrodynamic Drag & Physics-Informed Surrogates
            </span>
            <p className="text-[#64748B] leading-relaxed">
              The platform integrates the discrete combinatorial solver with a Physics-Informed model. The model calculates cubic hydrodynamic hull resistance (<span className="font-mono text-[#258F87]">P ∝ Δ²/³ · V³</span>) and oceanographic weather margins to predict accurate voyage fuel consumption.
            </p>
          </div>
        </div>

        {/* Footer Close */}
        <div className="flex items-center justify-end pt-2 border-t border-[#D9E2DE]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-[#F8FAF9] hover:bg-[#EDF5F1] text-[#16324F] font-medium text-xs border border-[#D9E2DE] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

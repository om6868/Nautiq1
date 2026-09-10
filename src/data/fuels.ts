import { FuelSpec, FuelType } from '../types';

export const FUEL_SPECS: Record<FuelType, FuelSpec> = {
  HFO: {
    id: 'HFO',
    name: 'HFO',
    fullName: 'Heavy Fuel Oil (Residual)',
    costPerTonUSD: 620,
    costPerTonINR: 51770,
    energyDensityMJkg: 40.2,
    co2FactorTonPerTon: 3.114, // IMO standard factor
    suitabilityScore: 42,
    technologyReadiness: 'Commercial Standard',
    engineCompatibility: 'Universal 2-stroke/4-stroke with scrubbers',
    description: 'Conventional residual marine fuel with high carbon and sulfur density.',
    color: '#64748B' // slate
  },
  MGO: {
    id: 'MGO',
    name: 'MGO',
    fullName: 'Marine Gas Oil (Distillate)',
    costPerTonUSD: 840,
    costPerTonINR: 70140,
    energyDensityMJkg: 42.7,
    co2FactorTonPerTon: 3.206, // IMO standard factor
    suitabilityScore: 58,
    technologyReadiness: 'Commercial Standard',
    engineCompatibility: 'Universal marine engines without scrubber',
    description: 'Low-sulfur distillate fuel meeting ECA regulations with moderate emissions.',
    color: '#0284C7' // ocean blue
  },
  LNG: {
    id: 'LNG',
    name: 'LNG',
    fullName: 'Liquefied Natural Gas (Cryogenic)',
    costPerTonUSD: 760,
    costPerTonINR: 63460,
    energyDensityMJkg: 49.2, // Higher heating value
    co2FactorTonPerTon: 2.750, // 20-25% lower carbon intensity per unit energy
    suitabilityScore: 78,
    technologyReadiness: 'Commercial Transition',
    engineCompatibility: 'Dual-fuel cryogenic engine systems',
    description: 'Established transition fuel cutting CO₂ by ~22% and SOx/PM by 99%.',
    color: '#06B6D4' // cyan
  },
  Methanol: {
    id: 'Methanol',
    name: 'Methanol',
    fullName: 'Green / e-Methanol (CH₃OH)',
    costPerTonUSD: 690,
    costPerTonINR: 57615,
    energyDensityMJkg: 19.9, // Lower volumetric density, but net-zero/low lifecycle
    co2FactorTonPerTon: 1.375, // Well-to-wake lifecycle or combustion accounting
    suitabilityScore: 92,
    technologyReadiness: 'Commercial Transition',
    engineCompatibility: 'Dual-fuel 2-stroke with low-flashpoint supply',
    description: 'Leading liquid green fuel with drop-in capability and rapid bunkering expansion.',
    color: '#10B981' // emerald green
  },
  Hydrogen: {
    id: 'Hydrogen',
    name: 'Hydrogen',
    fullName: 'Liquid Green Hydrogen (LH₂)',
    costPerTonUSD: 1450,
    costPerTonINR: 121075,
    energyDensityMJkg: 120.0, // High gravimetric energy
    co2FactorTonPerTon: 0.05, // Near zero direct combustion emissions
    suitabilityScore: 64,
    technologyReadiness: 'Pilot Demonstration',
    engineCompatibility: 'Fuel cell systems or specialized dual-fuel H₂ injection',
    description: 'Zero-carbon molecular carrier with high cryogenic storage complexity.',
    color: '#8B5CF6' // violet
  },
  Ammonia: {
    id: 'Ammonia',
    name: 'Ammonia',
    fullName: 'Green Ammonia (NH₃)',
    costPerTonUSD: 890,
    costPerTonINR: 74315,
    energyDensityMJkg: 18.6,
    co2FactorTonPerTon: 0.12, // Zero carbon molecule
    suitabilityScore: 71,
    technologyReadiness: 'Early Scale',
    engineCompatibility: 'Next-generation ammonia 2-stroke engines',
    description: 'Zero-carbon hydrogen carrier requiring strict toxicity management.',
    color: '#F59E0B' // amber
  }
};

export const ALL_FUELS: FuelType[] = ['HFO', 'MGO', 'LNG', 'Methanol', 'Hydrogen', 'Ammonia'];

export type FuelType = 'HFO' | 'MGO' | 'LNG' | 'Methanol' | 'Hydrogen' | 'Ammonia';

export type PortAvailabilityStatus = 'Available' | 'Limited' | 'Unavailable';

export interface FuelSpec {
  id: FuelType;
  name: string;
  fullName: string;
  costPerTonUSD: number;
  costPerTonINR: number;
  energyDensityMJkg: number;
  co2FactorTonPerTon: number; // MT CO2 emitted per MT fuel burned
  suitabilityScore: number; // 0-100
  technologyReadiness: 'Commercial Standard' | 'Commercial Transition' | 'Early Scale' | 'Pilot Demonstration';
  engineCompatibility: string;
  description: string;
  color: string;
}

export interface Port {
  id: string;
  name: string;
  code: string;
  country: string;
  region: string;
  coordinates: [number, number]; // [lat, lng]
  fuelAvailability: Record<FuelType, PortAvailabilityStatus>;
}

export type VesselType = 'Container Ship' | 'Bulk Carrier' | 'Tanker' | 'LNG Carrier';

export interface Vessel {
  id: string;
  name: string;
  type: VesselType;
  dwt: number; // Deadweight tonnage in MT
  designSpeed: number; // knots
  minSpeed: number;
  maxSpeed: number;
  admiraltyCoefficient: number;
  baselineDailyFuelMT: number; // tons/day at design speed full load HFO
  auxiliaryPowerKW: number;
  defaultFuel: FuelType;
}

export interface VoyageInput {
  vesselType: VesselType;
  originPortId: string;
  destPortId: string;
  distanceNM: number;
  speedKnots: number;
  cargoLoadPct: number; // 0 to 100
  fuelType: FuelType;
}

export interface PredictionResult {
  fuelConsumptionTons: number;
  fuelCostINR: number;
  fuelCostUSD: number;
  co2EmissionsTons: number;
  durationHours: number;
  durationDays: number;
  dailyConsumptionTons: number;
  ciiRating: 'A' | 'B' | 'C' | 'D' | 'E';
  eeoiScore: number; // gCO2 / (ton-nautical mile)
  speedEfficiencyRatio: number;
}

export interface CandidatePlan {
  id: string;
  title: string;
  tagline: string;
  badge?: string;
  isRecommended: boolean;
  speedKnots: number;
  fuelType: FuelType;
  routeName: string;
  routeDescription: string;
  fuelConsumptionTons: number;
  fuelCostINR: number;
  fuelCostUSD: number;
  co2EmissionsTons: number;
  durationHours: number;
  durationDays: number;
  etaDeltaHours: number;
  overallScore: number;
  fuelSavedPct: number;
  costSavedPct: number;
  co2ReducedPct: number;
  ciiRating: 'A' | 'B' | 'C' | 'D' | 'E';
  isFeasible: boolean;
  feasibilityReason?: string;
  keyHighlights: string[];
}

export interface RecommendationDetails {
  recommendedPlan: CandidatePlan;
  baselinePlan: CandidatePlan;
  whyExplanation: {
    hydrodynamicSpeedRationale: string;
    greenFuelAdvantage: string;
    scheduleFeasibility: string;
    portAvailabilityValidation: string;
  };
  quantumOptimizationMetadata: {
    combinationsEvaluated: number;
    quboVariableCount: number;
    convergenceIterations: number;
    objectiveWeights: {
      costWeight: number;
      emissionWeight: number;
      scheduleWeight: number;
      portConstraintWeight: number;
    };
  };
}

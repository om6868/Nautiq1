import { FUEL_SPECS } from '../data/fuels';
import { VESSELS } from '../data/vessels';
import { FuelType, PredictionResult, VesselType, VoyageInput } from '../types';

/**
 * Calculates deterministic physics-informed fuel consumption, emissions, cost, and duration.
 * Based on hydrodynamic drag law (Admiralty coefficient P ~ V^3 * Displacement^(2/3)),
 * cargo loading displacement delta, auxiliary generator load, and fuel lower heating value (LHV).
 */
export function calculateVoyagePrediction(input: VoyageInput): PredictionResult {
  const { vesselType, distanceNM, speedKnots, cargoLoadPct, fuelType } = input;

  // Find vessel profile
  const vessel = VESSELS.find(v => v.type === vesselType) || VESSELS[0];
  const fuel = FUEL_SPECS[fuelType] || FUEL_SPECS.HFO;

  // Sanitize inputs
  const validDistance = Math.max(1, distanceNM);
  const validSpeed = Math.max(5, Math.min(35, speedKnots));
  const validCargo = Math.max(0, Math.min(100, cargoLoadPct));

  // 1. Voyage duration in hours & days
  const durationHours = validDistance / validSpeed;
  const durationDays = durationHours / 24;

  // 2. Hydrodynamic scaling
  // Displacement effect: lightweight is roughly 25% of DWT; payload is cargo% of DWT
  const totalDisplacementRatio = (0.25 + 0.75 * (validCargo / 100)) / 1.0; // relative to full load
  const displacementFactor = Math.pow(totalDisplacementRatio, 0.67);

  // Speed-power cubic relationship (calibrated to 3.05 to account for wave resistance)
  const speedRatio = validSpeed / vessel.designSpeed;
  const speedPowerFactor = Math.pow(speedRatio, 3.05);

  // Daily propulsion fuel rate for HFO equivalent (MT/day)
  const propulsiveFuelPerDayHFO = vessel.baselineDailyFuelMT * displacementFactor * speedPowerFactor;

  // Auxiliary generator fuel rate (continuous electrical load, reefer/hotel load)
  const auxDailyFuelHFO = (vessel.auxiliaryPowerKW / 1000) * 0.19 * 24 * 0.001; // ~3.5 to 7 MT/day

  const totalDailyHFOEquivalent = propulsiveFuelPerDayHFO + auxDailyFuelHFO;

  // Total HFO equivalent for full voyage
  const totalHFOEquivalentMT = totalDailyHFOEquivalent * durationDays;

  // 3. Fuel calorific energy adjustment (LHV conversion)
  // Higher energy density fuels (e.g. LNG at 49.2 MJ/kg) require fewer metric tons for same propulsion energy.
  // Lower volumetric fuels (e.g. Methanol at 19.9 MJ/kg) require higher mass tonnage.
  const baseHfoLhv = FUEL_SPECS.HFO.energyDensityMJkg;
  const targetLhv = fuel.energyDensityMJkg;
  const massConversionFactor = baseHfoLhv / targetLhv;

  // Specific engine thermal efficiency adjustments
  let engineEfficiencyFactor = 1.0;
  if (fuelType === 'LNG') engineEfficiencyFactor = 0.94; // slightly higher thermal efficiency in dual-fuel
  if (fuelType === 'Methanol') engineEfficiencyFactor = 0.97;
  if (fuelType === 'Hydrogen') engineEfficiencyFactor = 0.88; // fuel cell/H2 hybrid
  if (fuelType === 'Ammonia') engineEfficiencyFactor = 0.96;

  const actualFuelConsumptionTons = totalHFOEquivalentMT * massConversionFactor * engineEfficiencyFactor;
  const dailyConsumptionTons = actualFuelConsumptionTons / Math.max(0.01, durationDays);

  // 4. Financial costs
  const fuelCostINR = actualFuelConsumptionTons * fuel.costPerTonINR;
  const fuelCostUSD = actualFuelConsumptionTons * fuel.costPerTonUSD;

  // 5. Environmental CO2 emissions
  const co2EmissionsTons = actualFuelConsumptionTons * fuel.co2FactorTonPerTon;

  // 6. IMO Carbon Intensity & EEOI estimation
  // EEOI = (CO2 grams) / (Cargo Tons * Distance NM)
  const cargoTons = Math.max(1000, vessel.dwt * (validCargo / 100));
  const eeoiScore = (co2EmissionsTons * 1000000) / (cargoTons * validDistance);

  // CII Rating determination (standard baseline curve comparison)
  let ciiRating: 'A' | 'B' | 'C' | 'D' | 'E' = 'C';
  if (eeoiScore < 6.5) {
    ciiRating = 'A';
  } else if (eeoiScore < 9.5) {
    ciiRating = 'B';
  } else if (eeoiScore < 13.5) {
    ciiRating = 'C';
  } else if (eeoiScore < 17.5) {
    ciiRating = 'D';
  } else {
    ciiRating = 'E';
  }

  // Speed efficiency ratio (NM per metric ton)
  const speedEfficiencyRatio = validDistance / Math.max(0.1, actualFuelConsumptionTons);

  return {
    fuelConsumptionTons: Number(actualFuelConsumptionTons.toFixed(1)),
    fuelCostINR: Math.round(fuelCostINR),
    fuelCostUSD: Math.round(fuelCostUSD),
    co2EmissionsTons: Number(co2EmissionsTons.toFixed(1)),
    durationHours: Number(durationHours.toFixed(1)),
    durationDays: Number(durationDays.toFixed(1)),
    dailyConsumptionTons: Number(dailyConsumptionTons.toFixed(1)),
    ciiRating,
    eeoiScore: Number(eeoiScore.toFixed(2)),
    speedEfficiencyRatio: Number(speedEfficiencyRatio.toFixed(1))
  };
}

/**
 * Format currency in Indian Rupees (Lakhs / Crores) or standard format
 */
export function formatINR(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Format currency in USD
 */
export function formatUSD(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(2)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}k`;
  }
  return `$${Math.round(amount).toLocaleString('en-US')}`;
}

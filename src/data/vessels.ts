import { Vessel, VesselType } from '../types';

export const VESSELS: Vessel[] = [
  {
    id: 'container-ship',
    name: 'Ocean Pioneer (Ultra-Large Container)',
    type: 'Container Ship',
    dwt: 120000,
    designSpeed: 19.0,
    minSpeed: 12.0,
    maxSpeed: 24.0,
    admiraltyCoefficient: 560,
    baselineDailyFuelMT: 62.0,
    auxiliaryPowerKW: 2800,
    defaultFuel: 'HFO'
  },
  {
    id: 'bulk-carrier',
    name: 'Iron Horizon (Capesize Bulk Carrier)',
    type: 'Bulk Carrier',
    dwt: 180000,
    designSpeed: 14.5,
    minSpeed: 10.0,
    maxSpeed: 17.5,
    admiraltyCoefficient: 610,
    baselineDailyFuelMT: 42.0,
    auxiliaryPowerKW: 1600,
    defaultFuel: 'HFO'
  },
  {
    id: 'tanker',
    name: 'Neptune Star (Suezmax Crude Tanker)',
    type: 'Tanker',
    dwt: 155000,
    designSpeed: 15.0,
    minSpeed: 10.5,
    maxSpeed: 18.0,
    admiraltyCoefficient: 590,
    baselineDailyFuelMT: 46.0,
    auxiliaryPowerKW: 1900,
    defaultFuel: 'HFO'
  },
  {
    id: 'lng-carrier',
    name: 'Polaris Cryo (Q-Flex LNG Carrier)',
    type: 'LNG Carrier',
    dwt: 95000,
    designSpeed: 19.5,
    minSpeed: 12.0,
    maxSpeed: 23.0,
    admiraltyCoefficient: 540,
    baselineDailyFuelMT: 54.0,
    auxiliaryPowerKW: 2400,
    defaultFuel: 'LNG'
  }
];

export const VESSEL_TYPES: VesselType[] = [
  'Container Ship',
  'Bulk Carrier',
  'Tanker',
  'LNG Carrier'
];

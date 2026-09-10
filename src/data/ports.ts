import { Port } from '../types';

export const PORTS: Port[] = [
  {
    id: 'mumbai',
    name: 'Mumbai (JNPT)',
    code: 'INBOM',
    country: 'India',
    region: 'South Asia / Indian Ocean',
    coordinates: [18.95, 72.95],
    fuelAvailability: {
      HFO: 'Available',
      MGO: 'Available',
      LNG: 'Limited',
      Methanol: 'Available', // India's green methanol bunkering pilot at JNPT/Kandla
      Hydrogen: 'Unavailable',
      Ammonia: 'Unavailable'
    }
  },
  {
    id: 'singapore',
    name: 'Singapore',
    code: 'SGSIN',
    country: 'Singapore',
    region: 'Southeast Asia / Malacca Strait',
    coordinates: [1.29, 103.85],
    fuelAvailability: {
      HFO: 'Available',
      MGO: 'Available',
      LNG: 'Available',
      Methanol: 'Available',
      Hydrogen: 'Limited',
      Ammonia: 'Limited'
    }
  },
  {
    id: 'rotterdam',
    name: 'Rotterdam',
    code: 'NLRTM',
    country: 'Netherlands',
    region: 'North-West Europe',
    coordinates: [51.92, 4.47],
    fuelAvailability: {
      HFO: 'Available',
      MGO: 'Available',
      LNG: 'Available',
      Methanol: 'Available',
      Hydrogen: 'Limited',
      Ammonia: 'Available'
    }
  },
  {
    id: 'dubai',
    name: 'Dubai (Jebel Ali)',
    code: 'AEDXB',
    country: 'UAE',
    region: 'Middle East / Persian Gulf',
    coordinates: [25.01, 55.06],
    fuelAvailability: {
      HFO: 'Available',
      MGO: 'Available',
      LNG: 'Available',
      Methanol: 'Limited',
      Hydrogen: 'Unavailable',
      Ammonia: 'Limited'
    }
  },
  {
    id: 'shanghai',
    name: 'Shanghai (Yangshan)',
    code: 'CNSHA',
    country: 'China',
    region: 'East Asia',
    coordinates: [30.63, 122.06],
    fuelAvailability: {
      HFO: 'Available',
      MGO: 'Available',
      LNG: 'Available',
      Methanol: 'Available',
      Hydrogen: 'Limited',
      Ammonia: 'Limited'
    }
  },
  {
    id: 'colombo',
    name: 'Colombo',
    code: 'LKCMB',
    country: 'Sri Lanka',
    region: 'Indian Ocean Hub',
    coordinates: [6.94, 79.84],
    fuelAvailability: {
      HFO: 'Available',
      MGO: 'Available',
      LNG: 'Limited',
      Methanol: 'Unavailable',
      Hydrogen: 'Unavailable',
      Ammonia: 'Unavailable'
    }
  }
];

// Predefined realistic nautical distances (NM) between ports
export const PORT_DISTANCES: Record<string, number> = {
  'mumbai-singapore': 3200,
  'singapore-mumbai': 3200,
  'mumbai-dubai': 1070,
  'dubai-mumbai': 1070,
  'mumbai-rotterdam': 6350,
  'rotterdam-mumbai': 6350,
  'singapore-rotterdam': 8280,
  'rotterdam-singapore': 8280,
  'singapore-shanghai': 2250,
  'shanghai-singapore': 2250,
  'dubai-rotterdam': 6400,
  'rotterdam-dubai': 6400,
  'mumbai-shanghai': 4900,
  'shanghai-mumbai': 4900,
  'mumbai-colombo': 900,
  'colombo-mumbai': 900,
  'colombo-singapore': 1580,
  'singapore-colombo': 1580
};

export function getDistanceBetweenPorts(originId: string, destId: string): number {
  if (originId === destId) return 500;
  const key1 = `${originId}-${destId}`;
  const key2 = `${destId}-${originId}`;
  return PORT_DISTANCES[key1] || PORT_DISTANCES[key2] || 3200;
}

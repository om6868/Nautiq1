import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid
} from 'recharts';
import { ALL_FUELS, FUEL_SPECS } from '../../data/fuels';
import { VoyageInput } from '../../types';
import { calculateVoyagePrediction, formatINR } from '../../utils/fuelPhysics';

interface FuelEmissionChartProps {
  voyageInput: VoyageInput;
}

export const FuelEmissionChart: React.FC<FuelEmissionChartProps> = ({ voyageInput }) => {
  const chartData = ALL_FUELS.map(fuel => {
    const spec = FUEL_SPECS[fuel];
    const pred = calculateVoyagePrediction({
      ...voyageInput,
      fuelType: fuel
    });

    return {
      name: fuel,
      fullName: spec.fullName,
      co2Emissions: pred.co2EmissionsTons,
      fuelCostLakhs: Number((pred.fuelCostINR / 100000).toFixed(2)),
      fuelBurnMT: pred.fuelConsumptionTons,
      rawCostINR: pred.fuelCostINR,
      color: spec.color
    };
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-[#D9E2DE] p-2.5 rounded-md text-xs space-y-1 shadow-md">
          <p className="font-bold text-[#16324F]">{data.fullName}</p>
          <p className="text-[#258F87]">
            CO₂: <strong>{data.co2Emissions} MT</strong>
          </p>
          <p className="text-[#16324F]">
            Cost: <strong>{formatINR(data.rawCostINR)}</strong> (₹{data.fuelCostLakhs}L)
          </p>
          <p className="text-[#64748B]">
            Fuel Mass: <strong className="text-[#16324F]">{data.fuelBurnMT} MT</strong>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-[#D9E2DE] shadow-sm space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#16324F]">
            Lifecycle Emissions Across 6 Fuel Options
          </h4>
          <p className="text-xs text-[#64748B]">
            Calculated for {voyageInput.distanceNM.toLocaleString()} NM @ {voyageInput.speedKnots} kts
          </p>
        </div>
      </div>

      <div className="h-56 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="name" stroke="#64748B" tick={{ fill: '#64748B', fontSize: 11 }} />
            <YAxis stroke="#258F87" tick={{ fill: '#258F87', fontSize: 11 }} label={{ value: 'MT CO₂', angle: -90, position: 'insideLeft', fill: '#258F87', fontSize: 10 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="co2Emissions" name="Total CO₂ Emissions (MT)" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

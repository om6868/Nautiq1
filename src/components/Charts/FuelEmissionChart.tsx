import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
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
        <div className="bg-[#0B132B] border border-sky-500/40 p-3 rounded-xl shadow-2xl text-xs space-y-1">
          <p className="font-bold text-white">{data.fullName}</p>
          <p className="text-teal-300">
            CO₂ Emissions: <strong className="font-mono">{data.co2Emissions} MT</strong>
          </p>
          <p className="text-emerald-400">
            Fuel Cost: <strong className="font-mono">{formatINR(data.rawCostINR)}</strong> (₹{data.fuelCostLakhs}L)
          </p>
          <p className="text-slate-300">
            Fuel Mass Burned: <strong className="font-mono">{data.fuelBurnMT} MT</strong>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#0B132B]/90 backdrop-blur-md rounded-2xl p-5 border border-sky-900/30 shadow-xl space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <span>Lifecycle Carbon Benchmark Across 6 Fuel Alternatives</span>
          </h4>
          <p className="text-xs text-slate-400">
            Dynamic emissions benchmark computed for {voyageInput.distanceNM.toLocaleString()} NM @ {voyageInput.speedKnots} kts.
          </p>
        </div>
        <span className="text-[11px] font-mono text-teal-400 bg-teal-950/80 px-2.5 py-0.5 rounded-full border border-teal-500/30">
          IMO Carbon Accounting
        </span>
      </div>

      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
            <XAxis dataKey="name" stroke="#64748B" tick={{ fill: '#94A3B8', fontSize: 11 }} />
            <YAxis stroke="#14B8A6" tick={{ fill: '#14B8A6', fontSize: 11 }} label={{ value: 'MT CO₂ Emitted', angle: -90, position: 'insideLeft', fill: '#14B8A6', fontSize: 10 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="co2Emissions" name="Total CO₂ Emissions (MT)" radius={[6, 6, 0, 0]}>
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

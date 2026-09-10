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
import { CandidatePlan } from '../../types';
import { formatINR } from '../../utils/fuelPhysics';

interface CostEmissionChartProps {
  plans: CandidatePlan[];
}

export const CostEmissionChart: React.FC<CostEmissionChartProps> = ({ plans }) => {
  const chartData = plans.map(p => ({
    name: p.title,
    co2Emissions: p.co2EmissionsTons,
    fuelCostLakhs: Number((p.fuelCostINR / 100000).toFixed(2)),
    durationHours: p.durationHours,
    isRecommended: p.isRecommended,
    speed: p.speedKnots,
    fuel: p.fuelType,
    rawCostINR: p.fuelCostINR
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-[#D9E2DE] p-2.5 rounded-md text-xs space-y-1 shadow-md">
          <p className="font-bold text-[#16324F] flex items-center gap-1">
            {data.isRecommended && <span className="text-[#258F87]">⭐</span>}
            <span>{data.name}</span>
          </p>
          <p className="text-[#64748B]">
            Speed: <strong className="text-[#16324F]">{data.speed} kts</strong> | Fuel: <strong className="text-[#16324F]">{data.fuel}</strong>
          </p>
          <p className="text-[#258F87]">
            CO₂: <strong>{data.co2Emissions} MT</strong>
          </p>
          <p className="text-[#16324F]">
            Cost: <strong>{formatINR(data.rawCostINR)}</strong> (₹{data.fuelCostLakhs}L)
          </p>
          <p className="text-[#64748B]">
            Duration: <strong className="text-[#16324F]">{data.durationHours} hrs</strong>
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
            Candidate Plans: Cost vs. Emissions
          </h4>
          <p className="text-xs text-[#64748B]">
            Carbon output and bunker cost comparison
          </p>
        </div>
      </div>

      <div className="h-56 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="name" stroke="#64748B" tick={{ fill: '#64748B', fontSize: 11 }} />
            <YAxis yAxisId="left" orientation="left" stroke="#258F87" tick={{ fill: '#258F87', fontSize: 11 }} label={{ value: 'CO₂ (MT)', angle: -90, position: 'insideLeft', fill: '#258F87', fontSize: 10 }} />
            <YAxis yAxisId="right" orientation="right" stroke="#16324F" tick={{ fill: '#16324F', fontSize: 11 }} label={{ value: 'Cost (₹ Lakhs)', angle: 90, position: 'insideRight', fill: '#16324F', fontSize: 10 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
            <Bar yAxisId="left" dataKey="co2Emissions" name="CO₂ (MT)" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-co2-${index}`}
                  fill={entry.isRecommended ? '#258F87' : entry.name === 'NautiQ Eco' ? '#5B8C72' : '#94A3B8'}
                />
              ))}
            </Bar>
            <Bar yAxisId="right" dataKey="fuelCostLakhs" name="Cost (₹ Lakhs)" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-cost-${index}`}
                  fill={entry.isRecommended ? '#16324F' : entry.name === 'NautiQ Eco' ? '#334E68' : '#CBD5E1'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

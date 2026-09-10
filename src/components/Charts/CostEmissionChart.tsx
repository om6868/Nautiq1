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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#0B132B] border border-sky-500/40 p-3 rounded-xl shadow-2xl text-xs space-y-1">
          <p className="font-bold text-white flex items-center gap-1.5">
            {data.isRecommended && <span className="text-emerald-400">⭐</span>}
            <span>{data.name}</span>
          </p>
          <p className="text-slate-300">
            Speed: <strong className="text-sky-300">{data.speed} kts</strong> | Fuel: <strong className="text-emerald-300">{data.fuel}</strong>
          </p>
          <p className="text-teal-300">
            CO₂ Emissions: <strong className="font-mono">{data.co2Emissions} MT</strong>
          </p>
          <p className="text-emerald-400">
            Fuel Cost: <strong className="font-mono">{formatINR(data.rawCostINR)}</strong> (₹{data.fuelCostLakhs}L)
          </p>
          <p className="text-sky-300">
            Duration: <strong className="font-mono">{data.durationHours} hrs</strong>
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
            <span>Candidate Plans: Cost vs Emission Trade-off</span>
          </h4>
          <p className="text-xs text-slate-400">
            Comparison of carbon output and financial fuel expenditure per voyage option.
          </p>
        </div>
        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
          ⭐ NautiQ Balanced Spotlighted
        </span>
      </div>

      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
            <XAxis dataKey="name" stroke="#64748B" tick={{ fill: '#94A3B8', fontSize: 11 }} />
            <YAxis yAxisId="left" orientation="left" stroke="#14B8A6" tick={{ fill: '#14B8A6', fontSize: 11 }} label={{ value: 'CO₂ (MT)', angle: -90, position: 'insideLeft', fill: '#14B8A6', fontSize: 10 }} />
            <YAxis yAxisId="right" orientation="right" stroke="#10B981" tick={{ fill: '#10B981', fontSize: 11 }} label={{ value: 'Cost (₹ Lakhs)', angle: 90, position: 'insideRight', fill: '#10B981', fontSize: 10 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
            <Bar yAxisId="left" dataKey="co2Emissions" name="CO₂ Emissions (MT)" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-co2-${index}`}
                  fill={entry.isRecommended ? '#10B981' : entry.name === 'NautiQ Eco' ? '#0D9488' : '#64748B'}
                />
              ))}
            </Bar>
            <Bar yAxisId="right" dataKey="fuelCostLakhs" name="Fuel Cost (₹ Lakhs)" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-cost-${index}`}
                  fill={entry.isRecommended ? '#34D399' : entry.name === 'NautiQ Eco' ? '#06B6D4' : '#475569'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

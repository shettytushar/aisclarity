
import React from 'react';
import { ReconciliationStatus } from '../types';

interface SummaryStatsProps {
  stats: {
    total: number;
    verified: number;
    unexplained: number;
    explainable: number;
    risk: number;
  };
}

const SummaryStats: React.FC<SummaryStatsProps> = ({ stats }) => {
  const cards = [
    { label: 'Total Entries', value: stats.total, color: 'text-slate-900', bg: 'bg-white', border: 'border-slate-200' },
    { label: 'Verified', value: stats.verified, color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { label: 'Explainable', value: stats.explainable, color: 'text-sky-700', bg: 'bg-sky-50', border: 'border-sky-100' },
    { label: 'Unexplained', value: stats.unexplained, color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-100' },
    { label: 'Risk Flags', value: stats.risk, color: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-100' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
      {cards.map((card, idx) => (
        <div key={idx} className={`${card.bg} ${card.border} border p-5 rounded-xl shadow-sm transition-all hover:shadow-md`}>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">{card.label}</p>
          <div className="flex items-baseline space-x-2">
            <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
            <span className="text-xs text-slate-400 font-medium">items</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryStats;

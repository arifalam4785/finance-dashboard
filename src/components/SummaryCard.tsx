import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: string;
  trend?: string;
  trendUp?: boolean;
  accentColor?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, trend, trendUp, accentColor = '#3b82f6' }) => {
  return (
    <div className="rounded-xl p-6 flex flex-col gap-3" style={{ backgroundColor: '#1e293b' }}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium" style={{ color: '#94a3b8' }}>{title}</span>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ backgroundColor: `${accentColor}20` }}>
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold" style={{ color: '#f8fafc' }}>{value}</div>
      {trend && (
        <div className="flex items-center gap-1 text-sm">
          <span style={{ color: trendUp ? '#22c55e' : '#ef4444' }}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
          <span style={{ color: '#94a3b8' }}>vs last month</span>
        </div>
      )}
    </div>
  );
};

export default SummaryCard;

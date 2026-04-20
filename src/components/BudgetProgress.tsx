import React from 'react';
import { expenseCategories } from '../data/mockData';

const BudgetProgress: React.FC = () => {
  return (
    <div className="rounded-xl p-6" style={{ backgroundColor: '#1e293b' }}>
      <h2 className="text-lg font-semibold mb-6" style={{ color: '#f8fafc' }}>Budget Progress</h2>
      <div className="flex flex-col gap-5">
        {expenseCategories.map((cat) => {
          const pct = Math.min((cat.value / cat.budget) * 100, 100);
          const over = cat.value > cat.budget;
          return (
            <div key={cat.name}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></div>
                  <span className="text-sm font-medium" style={{ color: '#f8fafc' }}>{cat.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold" style={{ color: over ? '#ef4444' : '#f8fafc' }}>
                    ${cat.value.toLocaleString()}
                  </span>
                  <span className="text-xs" style={{ color: '#94a3b8' }}>/ ${cat.budget.toLocaleString()}</span>
                </div>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#0f172a' }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: over ? '#ef4444' : cat.color,
                  }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs" style={{ color: over ? '#ef4444' : '#94a3b8' }}>
                  {over ? `$${(cat.value - cat.budget).toFixed(0)} over budget` : `${(100 - pct).toFixed(0)}% remaining`}
                </span>
                <span className="text-xs" style={{ color: '#94a3b8' }}>{pct.toFixed(0)}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetProgress;

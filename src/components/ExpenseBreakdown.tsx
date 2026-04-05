import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { expenseCategories } from '../data/mockData';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const entry = payload[0];
    return (
      <div className="rounded-lg p-3 shadow-lg" style={{ backgroundColor: '#0f172a', border: '1px solid #334155' }}>
        <p className="font-medium text-sm" style={{ color: '#f8fafc' }}>{entry.name}</p>
        <p className="text-sm" style={{ color: entry.payload.color }}>${entry.value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const ExpenseBreakdown: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const total = expenseCategories.reduce((sum, cat) => sum + cat.value, 0);

  return (
    <div className="rounded-xl p-6" style={{ backgroundColor: '#1e293b' }}>
      <h2 className="text-lg font-semibold mb-4" style={{ color: '#f8fafc' }}>Expense Breakdown</h2>
      <div className="flex flex-col gap-4">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={expenseCategories}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={90}
              dataKey="value"
              onMouseEnter={(_, index) => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {expenseCategories.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  opacity={hoveredIndex === null || hoveredIndex === index ? 1 : 0.6}
                  stroke={hoveredIndex === index ? '#f8fafc' : 'none'}
                  strokeWidth={hoveredIndex === index ? 2 : 0}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-2">
          {expenseCategories.map((cat) => (
            <div key={cat.name} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }}></div>
              <span className="text-xs" style={{ color: '#94a3b8' }}>{cat.name}</span>
              <span className="text-xs font-medium ml-auto" style={{ color: '#f8fafc' }}>{((cat.value / total) * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseBreakdown;

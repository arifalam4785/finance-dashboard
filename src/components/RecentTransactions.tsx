import React from 'react';
import { recentTransactions } from '../data/mockData';

const categoryColors: Record<string, string> = {
  Income: '#22c55e',
  Food: '#f59e0b',
  Housing: '#3b82f6',
  Transport: '#8b5cf6',
  Entertainment: '#ec4899',
  Healthcare: '#22c55e',
  Other: '#94a3b8',
};

const RecentTransactions: React.FC = () => {
  return (
    <div className="rounded-xl p-6" style={{ backgroundColor: '#1e293b' }}>
      <h2 className="text-lg font-semibold mb-4" style={{ color: '#f8fafc' }}>Recent Transactions</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <th className="text-left pb-3 text-xs font-medium uppercase tracking-wider" style={{ color: '#94a3b8' }}>Date</th>
              <th className="text-left pb-3 text-xs font-medium uppercase tracking-wider" style={{ color: '#94a3b8' }}>Description</th>
              <th className="text-left pb-3 text-xs font-medium uppercase tracking-wider" style={{ color: '#94a3b8' }}>Category</th>
              <th className="text-right pb-3 text-xs font-medium uppercase tracking-wider" style={{ color: '#94a3b8' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((tx, i) => (
              <tr
                key={i}
                className="transition-colors"
                style={{ borderBottom: i < recentTransactions.length - 1 ? '1px solid #1e3a5f20' : 'none' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#0f172a40')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <td className="py-3 text-sm" style={{ color: '#94a3b8' }}>{tx.date}</td>
                <td className="py-3 text-sm font-medium" style={{ color: '#f8fafc' }}>{tx.description}</td>
                <td className="py-3">
                  <span className="text-xs px-2 py-1 rounded-full font-medium" style={{
                    backgroundColor: `${categoryColors[tx.category] || '#94a3b8'}20`,
                    color: categoryColors[tx.category] || '#94a3b8'
                  }}>
                    {tx.category}
                  </span>
                </td>
                <td className="py-3 text-sm font-semibold text-right" style={{ color: tx.amount >= 0 ? '#22c55e' : '#ef4444' }}>
                  {tx.amount >= 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;

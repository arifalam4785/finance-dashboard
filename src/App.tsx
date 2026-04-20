import React from 'react';
import SummaryCard from './components/SummaryCard';
import IncomeExpenseChart from './components/IncomeExpenseChart';
import ExpenseBreakdown from './components/ExpenseBreakdown';
import RecentTransactions from './components/RecentTransactions';
import BudgetProgress from './components/BudgetProgress';
import { summaryData } from './data/mockData';

const App: React.FC = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#0f172a' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-2">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#f8fafc' }}>Finance Dashboard</h1>
            <p className="text-sm mt-1" style={{ color: '#94a3b8' }}>{today}</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: '#1e293b' }}>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-sm" style={{ color: '#94a3b8' }}>Live Data</span>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <SummaryCard
            title="Total Balance"
            value={`$${summaryData.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
            icon="💰"
            trend="8.2%"
            trendUp={true}
            accentColor="#3b82f6"
          />
          <SummaryCard
            title="Monthly Income"
            value={`$${summaryData.monthlyIncome.toLocaleString()}`}
            icon="📈"
            trend="11.5%"
            trendUp={true}
            accentColor="#22c55e"
          />
          <SummaryCard
            title="Monthly Expenses"
            value={`$${summaryData.monthlyExpenses.toLocaleString()}`}
            icon="📉"
            trend="7.7%"
            trendUp={false}
            accentColor="#ef4444"
          />
          <SummaryCard
            title="Savings Rate"
            value={`${summaryData.savingsRate}%`}
            icon="🏦"
            trend="3.1%"
            trendUp={true}
            accentColor="#8b5cf6"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2">
            <IncomeExpenseChart />
          </div>
          <div>
            <ExpenseBreakdown />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <RecentTransactions />
          </div>
          <div>
            <BudgetProgress />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

import { useMemo } from 'react'
import {
  TrendingUp, TrendingDown, AlertTriangle, Award, PiggyBank,
  Flame, ArrowUpRight, ArrowDownRight, Target, Calendar,
  ShieldCheck, Zap,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { formatCurrency, groupByCategory, groupByMonth } from '../../utils/helpers'
import { CATEGORIES } from '../../data/mockData'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'

function InsightCard({ icon, iconBg, iconColor, title, children }) {
  const Icon = icon
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 transition-all duration-300">
      <div className="flex items-start gap-3 mb-4">
        <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
          <Icon className={`w-4.5 h-4.5 ${iconColor}`} />
        </div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white pt-1.5">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function StatRow({ label, value, sub, positive }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
      <div className="text-right">
        <span className="text-sm font-bold text-gray-900 dark:text-white">{value}</span>
        {sub && (
          <span className={`ml-2 text-[10px] font-semibold ${positive ? 'text-emerald-500' : 'text-rose-500'}`}>
            {sub}
          </span>
        )}
      </div>
    </div>
  )
}

export default function InsightsPage() {
  const { transactions } = useApp()

  const insights = useMemo(() => {
    const categories = groupByCategory(transactions)
    const monthly = groupByMonth(transactions)
    const totalExpenses = categories.reduce((s, c) => s + c.total, 0)
    const totalIncome = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0)

    // Highest spending category
    const topCategory = categories[0] || { category: 'N/A', total: 0 }
    const topCategoryPct = totalExpenses > 0 ? ((topCategory.total / totalExpenses) * 100).toFixed(1) : 0

    // Lowest spending category
    const bottomCategory = categories[categories.length - 1] || { category: 'N/A', total: 0 }

    // Monthly comparison (last 2 months)
    const lastMonth = monthly[monthly.length - 1] || { income: 0, expenses: 0, balance: 0, label: 'N/A' }
    const prevMonth = monthly[monthly.length - 2] || { income: 0, expenses: 0, balance: 0, label: 'N/A' }
    const expenseChange = prevMonth.expenses > 0
      ? (((lastMonth.expenses - prevMonth.expenses) / prevMonth.expenses) * 100).toFixed(1)
      : 0
    const incomeChange = prevMonth.income > 0
      ? (((lastMonth.income - prevMonth.income) / prevMonth.income) * 100).toFixed(1)
      : 0

    // Savings rate
    const savingsRate = totalIncome > 0 ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1) : 0

    // Best and worst months
    const bestMonth = [...monthly].sort((a, b) => b.balance - a.balance)[0] || lastMonth
    const worstMonth = [...monthly].sort((a, b) => a.balance - b.balance)[0] || lastMonth

    // Average daily spending
    const days = transactions.length > 0
      ? Math.ceil(
          (new Date(transactions[0].date) - new Date(transactions[transactions.length - 1].date)) /
            (1000 * 60 * 60 * 24)
        ) || 1
      : 1
    const avgDaily = totalExpenses / Math.abs(days)

    // Top 5 largest expenses
    const topExpenses = [...transactions]
      .filter((t) => t.type === 'expense')
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5)

    // Monthly expense chart data
    const monthlyExpenseChart = monthly.map((m) => ({
      name: m.label,
      expenses: m.expenses,
      income: m.income,
    }))

    return {
      categories, topCategory, topCategoryPct, bottomCategory,
      lastMonth, prevMonth, expenseChange, incomeChange,
      savingsRate, bestMonth, worstMonth, avgDaily,
      topExpenses, totalExpenses, totalIncome, monthlyExpenseChart, monthly,
    }
  }, [transactions])

  if (!transactions.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700">
        <AlertTriangle className="w-10 h-10 text-gray-300 dark:text-gray-600 mb-3" />
        <p className="text-gray-400 dark:text-gray-500 text-lg">No transaction data to analyze</p>
        <p className="text-gray-300 dark:text-gray-600 text-sm mt-1">Add some transactions to see insights</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Quick stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Savings Rate', value: `${insights.savingsRate}%`, icon: PiggyBank, color: 'emerald', good: parseFloat(insights.savingsRate) > 20 },
          { label: 'Avg Daily Spend', value: formatCurrency(insights.avgDaily), icon: Flame, color: 'orange', good: false },
          { label: 'Categories Used', value: insights.categories.length, icon: Target, color: 'violet', good: true },
          { label: 'Total Months', value: insights.monthly.length, icon: Calendar, color: 'blue', good: true },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-center"
          >
            <stat.icon className={`w-5 h-5 mx-auto mb-2 text-${stat.color}-500`} />
            <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Highest Spending Category */}
        <InsightCard
          icon={Award}
          iconBg="bg-amber-50 dark:bg-amber-500/10"
          iconColor="text-amber-500"
          title="Top Spending Category"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{CATEGORIES[insights.topCategory.category]?.icon || '📦'}</span>
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{insights.topCategory.category}</p>
              <p className="text-xs text-gray-400">{insights.topCategoryPct}% of total spending</p>
            </div>
          </div>
          <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-amber-500 transition-all duration-1000"
              style={{ width: `${insights.topCategoryPct}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            Total: {formatCurrency(insights.topCategory.total)} across {insights.topCategory.count} transactions
          </p>
        </InsightCard>

        {/* Monthly Comparison */}
        <InsightCard
          icon={TrendingUp}
          iconBg="bg-blue-50 dark:bg-blue-500/10"
          iconColor="text-blue-500"
          title="Monthly Comparison"
        >
          <div className="space-y-1">
            <StatRow
              label={`${insights.lastMonth.label} Income`}
              value={formatCurrency(insights.lastMonth.income)}
              sub={`${insights.incomeChange > 0 ? '+' : ''}${insights.incomeChange}%`}
              positive={insights.incomeChange >= 0}
            />
            <StatRow
              label={`${insights.lastMonth.label} Expenses`}
              value={formatCurrency(insights.lastMonth.expenses)}
              sub={`${insights.expenseChange > 0 ? '+' : ''}${insights.expenseChange}%`}
              positive={insights.expenseChange <= 0}
            />
            <StatRow
              label={`${insights.prevMonth.label} Income`}
              value={formatCurrency(insights.prevMonth.income)}
            />
            <StatRow
              label={`${insights.prevMonth.label} Expenses`}
              value={formatCurrency(insights.prevMonth.expenses)}
            />
          </div>
        </InsightCard>

        {/* Savings Health */}
        <InsightCard
          icon={ShieldCheck}
          iconBg="bg-emerald-50 dark:bg-emerald-500/10"
          iconColor="text-emerald-500"
          title="Savings Health"
        >
          <div className="text-center mb-4">
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-24 h-24 -rotate-90">
                <circle cx="48" cy="48" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" className="dark:stroke-gray-800" />
                <circle
                  cx="48" cy="48" r="40" fill="none"
                  stroke={parseFloat(insights.savingsRate) > 20 ? '#10b981' : parseFloat(insights.savingsRate) > 10 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(parseFloat(insights.savingsRate) / 100) * 251.2} 251.2`}
                />
              </svg>
              <span className="absolute text-lg font-bold text-gray-900 dark:text-white">{insights.savingsRate}%</span>
            </div>
          </div>
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            {parseFloat(insights.savingsRate) > 30
              ? '🎉 Excellent! You\'re saving aggressively'
              : parseFloat(insights.savingsRate) > 20
              ? '👍 Good savings rate. Keep it up!'
              : parseFloat(insights.savingsRate) > 10
              ? '⚠️ Moderate. Try to save a bit more'
              : '🚨 Low savings rate. Review your expenses'}
          </p>
        </InsightCard>

        {/* Best & Worst Month */}
        <InsightCard
          icon={Zap}
          iconBg="bg-violet-50 dark:bg-violet-500/10"
          iconColor="text-violet-500"
          title="Best & Worst Month"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
              <ArrowUpRight className="w-5 h-5 text-emerald-500" />
              <div className="flex-1">
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Best Month</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{insights.bestMonth.label}</p>
              </div>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                +{formatCurrency(insights.bestMonth.balance)}
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-rose-50 dark:bg-rose-500/10 rounded-xl">
              <ArrowDownRight className="w-5 h-5 text-rose-500" />
              <div className="flex-1">
                <p className="text-[10px] text-rose-600 dark:text-rose-400 uppercase tracking-wider">Worst Month</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{insights.worstMonth.label}</p>
              </div>
              <span className="text-sm font-bold text-rose-600 dark:text-rose-400">
                +{formatCurrency(insights.worstMonth.balance)}
              </span>
            </div>
          </div>
        </InsightCard>

        {/* Top 5 Expenses */}
        <InsightCard
          icon={TrendingDown}
          iconBg="bg-rose-50 dark:bg-rose-500/10"
          iconColor="text-rose-500"
          title="Top 5 Largest Expenses"
        >
          <div className="space-y-1">
            {insights.topExpenses.map((t, i) => (
              <div
                key={t.id}
                className="flex items-center gap-2 py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
              >
                <span className="text-xs font-bold text-gray-300 dark:text-gray-600 w-4">{i + 1}</span>
                <span className="text-sm">{CATEGORIES[t.category]?.icon || '📦'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">{t.description}</p>
                  <p className="text-[10px] text-gray-400">{t.date}</p>
                </div>
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400">{formatCurrency(t.amount)}</span>
              </div>
            ))}
          </div>
        </InsightCard>

        {/* Monthly Expense Bar Chart */}
        <InsightCard
          icon={Flame}
          iconBg="bg-orange-50 dark:bg-orange-500/10"
          iconColor="text-orange-500"
          title="Monthly Expense Trend"
        >
          <div className="h-50 -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={insights.monthlyExpenseChart}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: '#9ca3af' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: '#9ca3af' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                  width={45}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="expenses" radius={[6, 6, 0, 0]}>
                  {insights.monthlyExpenseChart.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={index === insights.monthlyExpenseChart.length - 1 ? '#f97316' : '#fed7aa'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </InsightCard>
      </div>
    </div>
  )
}
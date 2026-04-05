import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight, BarChart3 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { calculateSummary, groupByMonth } from '../../utils/helpers'
import AnimatedNumber from '../ui/AnimatedNumber'
import MiniSparkline from '../ui/MiniSparkline'

export default function SummaryCards() {
  const { transactions } = useApp()
  const summary = calculateSummary(transactions)
  const monthly = groupByMonth(transactions)

  // Sparkline data arrays
  const incomeData = monthly.map((m) => m.income)
  const expenseData = monthly.map((m) => m.expenses)
  const balanceData = monthly.map((m) => m.balance)

  // Calculate month-over-month change
  const calcChange = (data) => {
    if (data.length < 2) return 0
    const prev = data[data.length - 2]
    const curr = data[data.length - 1]
    if (prev === 0) return 0
    return ((curr - prev) / prev * 100).toFixed(1)
  }

  const cards = [
    {
      title: 'Total Balance',
      value: summary.balance,
      change: calcChange(balanceData),
      sparkData: balanceData,
      icon: Wallet,
      color: 'violet',
      sparkColor: '#8b5cf6',
      gradient: 'from-violet-500 to-indigo-600',
      bgLight: 'bg-violet-50 dark:bg-violet-500/10',
      textColor: 'text-violet-600 dark:text-violet-400',
    },
    {
      title: 'Total Income',
      value: summary.income,
      change: calcChange(incomeData),
      sparkData: incomeData,
      icon: TrendingUp,
      color: 'emerald',
      sparkColor: '#10b981',
      gradient: 'from-emerald-500 to-teal-600',
      bgLight: 'bg-emerald-50 dark:bg-emerald-500/10',
      textColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      title: 'Total Expenses',
      value: summary.expenses,
      change: calcChange(expenseData),
      sparkData: expenseData,
      icon: TrendingDown,
      color: 'rose',
      sparkColor: '#f43f5e',
      gradient: 'from-rose-500 to-pink-600',
      bgLight: 'bg-rose-50 dark:bg-rose-500/10',
      textColor: 'text-rose-600 dark:text-rose-400',
    },
    {
      title: 'Transactions',
      value: summary.transactionCount,
      change: null,
      sparkData: monthly.map((m) => m.income + m.expenses),
      icon: BarChart3,
      color: 'amber',
      sparkColor: '#f59e0b',
      gradient: 'from-amber-500 to-orange-600',
      bgLight: 'bg-amber-50 dark:bg-amber-500/10',
      textColor: 'text-amber-600 dark:text-amber-400',
      isCount: true,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 stagger-children">
      {cards.map((card) => (
        <div
          key={card.title}
          className="relative overflow-hidden bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 group hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 transition-all duration-300"
        >
          {/* Background gradient accent */}
          <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${card.gradient} opacity-[0.03] dark:opacity-[0.06] rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500`} />

          <div className="relative flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                {card.title}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {card.isCount ? (
                  summary.transactionCount
                ) : (
                  <AnimatedNumber value={card.value} />
                )}
              </p>
            </div>
            <div className={`w-10 h-10 rounded-xl ${card.bgLight} flex items-center justify-center`}>
              <card.icon className={`w-5 h-5 ${card.textColor}`} />
            </div>
          </div>

          <div className="relative flex items-end justify-between">
            {card.change !== null ? (
              <div className="flex items-center gap-1">
                {parseFloat(card.change) >= 0 ? (
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5 text-rose-500" />
                )}
                <span
                  className={`text-xs font-semibold ${
                    parseFloat(card.change) >= 0
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {Math.abs(card.change)}%
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">vs last month</span>
              </div>
            ) : (
              <span className="text-xs text-gray-400 dark:text-gray-500">All time</span>
            )}
            <MiniSparkline data={card.sparkData} color={card.sparkColor} height={36} width={80} />
          </div>
        </div>
      ))}
    </div>
  )
}
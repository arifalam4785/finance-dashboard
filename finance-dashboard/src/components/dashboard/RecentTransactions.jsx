import { ArrowRight } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { formatCurrency, formatDate } from '../../utils/helpers'
import { CATEGORIES } from '../../data/mockData'

export default function RecentTransactions() {
  const { transactions, setTab } = useApp()

  const recent = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6)

  if (recent.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 text-center">
        <p className="text-sm text-gray-400 dark:text-gray-500">No recent transactions</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
          <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">Latest financial activity</p>
        </div>
        <button
          onClick={() => setTab('transactions')}
          className="flex items-center gap-1 text-xs font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
        >
          View All
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
        {recent.map((t, i) => (
          <div
            key={t.id}
            className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
              style={{ backgroundColor: `${CATEGORIES[t.category]?.color || '#6b7280'}15` }}
            >
              {CATEGORIES[t.category]?.icon || '📦'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {t.description}
              </p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
                {formatDate(t.date)} · {t.category}
              </p>
            </div>
            <span
              className={`text-sm font-bold shrink-0 ${
                t.type === 'income'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-rose-600 dark:text-rose-400'
              }`}
            >
              {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

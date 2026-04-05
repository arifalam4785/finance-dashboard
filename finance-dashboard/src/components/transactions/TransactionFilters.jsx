import { Search, X, SlidersHorizontal, RotateCcw } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { CATEGORIES } from '../../data/mockData'

export default function TransactionFilters() {
  const { filters, setFilter, resetFilters, filteredTransactions } = useApp()
  const hasActiveFilters = filters.search || filters.type !== 'all' || filters.category !== 'all' || filters.dateRange.from || filters.dateRange.to

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
      <div className="flex flex-col gap-3">
        {/* Top row: Search + Reset */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={filters.search}
              onChange={(e) => setFilter({ search: e.target.value })}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
            />
            {filters.search && (
              <button
                onClick={() => setFilter({ search: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Reset button */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Filter row */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Type filter */}
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {['all', 'income', 'expense'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter({ type })}
                className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all
                  ${filters.type === type
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
              >
                {type === 'all' ? 'All Types' : type}
              </button>
            ))}
          </div>

          {/* Category dropdown */}
          <select
            value={filters.category}
            onChange={(e) => setFilter({ category: e.target.value })}
            className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
          >
            <option value="all">All Categories</option>
            {Object.keys(CATEGORIES).map((cat) => (
              <option key={cat} value={cat}>{CATEGORIES[cat].icon} {cat}</option>
            ))}
          </select>

          {/* Date range */}
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={filters.dateRange.from}
              onChange={(e) => setFilter({ dateRange: { ...filters.dateRange, from: e.target.value } })}
              className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
            />
            <span className="text-xs text-gray-400">to</span>
            <input
              type="date"
              value={filters.dateRange.to}
              onChange={(e) => setFilter({ dateRange: { ...filters.dateRange, to: e.target.value } })}
              className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-1 ml-auto">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split('-')
                setFilter({ sortBy, sortOrder })
              }}
              className="px-2 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Highest Amount</option>
              <option value="amount-asc">Lowest Amount</option>
            </select>
          </div>
        </div>

        {/* Result count */}
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-gray-400 dark:text-gray-500">
            Showing {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
          </p>
          {hasActiveFilters && (
            <div className="flex gap-1.5 flex-wrap">
              {filters.type !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-50 dark:bg-violet-500/10 text-[10px] font-medium text-violet-600 dark:text-violet-400">
                  {filters.type}
                  <button onClick={() => setFilter({ type: 'all' })}><X className="w-2.5 h-2.5" /></button>
                </span>
              )}
              {filters.category !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-500/10 text-[10px] font-medium text-amber-600 dark:text-amber-400">
                  {filters.category}
                  <button onClick={() => setFilter({ category: 'all' })}><X className="w-2.5 h-2.5" /></button>
                </span>
              )}
              {(filters.dateRange.from || filters.dateRange.to) && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[10px] font-medium text-blue-600 dark:text-blue-400">
                  Date filtered
                  <button onClick={() => setFilter({ dateRange: { from: '', to: '' } })}><X className="w-2.5 h-2.5" /></button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
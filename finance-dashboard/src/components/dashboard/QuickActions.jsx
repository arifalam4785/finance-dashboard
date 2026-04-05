import { Plus, FileDown, BarChart3, ArrowLeftRight } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function QuickActions({ onAddTransaction }) {
  const { isAdmin, setTab, transactions } = useApp()

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(transactions, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `finance_data_${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const actions = [
    ...(isAdmin
      ? [
          {
            label: 'Add Transaction',
            icon: Plus,
            color: 'violet',
            gradient: 'from-violet-500 to-indigo-600',
            onClick: onAddTransaction,
          },
        ]
      : []),
    {
      label: 'View Transactions',
      icon: ArrowLeftRight,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-600',
      onClick: () => setTab('transactions'),
    },
    {
      label: 'View Insights',
      icon: BarChart3,
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-600',
      onClick: () => setTab('insights'),
    },
    {
      label: 'Export JSON',
      icon: FileDown,
      color: 'amber',
      gradient: 'from-amber-500 to-orange-600',
      onClick: exportJSON,
    },
  ]

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-md transition-all duration-200 group"
          >
            <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${action.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 text-center leading-tight">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
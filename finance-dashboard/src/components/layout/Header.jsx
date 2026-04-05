import { Sun, Moon, Shield, Eye } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { ROLES } from '../../data/mockData'

export default function Header() {
  const { setRole, darkMode, toggleDarkMode, isAdmin, activeTab } = useApp()

  const tabTitles = {
    dashboard: 'Dashboard',
    transactions: 'Transactions',
    insights: 'Insights',
  }

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 md:px-6">
      {/* Page title */}
      <div>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          {tabTitles[activeTab] || 'Dashboard'}
        </h1>
        <p className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">
          Welcome back — here's your financial overview
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {/* Role switcher */}
        <button
          onClick={() => setRole(isAdmin ? ROLES.VIEWER : ROLES.ADMIN)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border
            ${isAdmin
              ? 'bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-500/30'
              : 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30'
            }`}
        >
          {isAdmin ? <Shield className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{isAdmin ? 'Admin' : 'Viewer'}</span>
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold ml-1">
          D
        </div>
      </div>
    </header>
  )
}
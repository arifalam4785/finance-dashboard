import { useState } from 'react'
import Layout from './components/layout/Layout'
import { useApp } from './context/AppContext'
import SummaryCards from './components/dashboard/SummaryCards'
import BalanceTrend from './components/dashboard/BalanceTrend'
import SpendingBreakdown from './components/dashboard/SpendingBreakdown'
import RecentTransactions from './components/dashboard/RecentTransactions'
import QuickActions from './components/dashboard/QuickActions'
import InsightsPage from './components/insights/InsightsPage'
import TransactionsPage from './components/transactions/TransactionsPage'
import TransactionModal from './components/transactions/TransactionModal'

function App() {
  const { activeTab } = useApp()
  const [showDashboardModal, setShowDashboardModal] = useState(false)

  return (
    <Layout>
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <SummaryCards />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3">
              <BalanceTrend />
            </div>
            <div className="lg:col-span-2">
              <SpendingBreakdown />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3">
              <RecentTransactions />
            </div>
            <div className="lg:col-span-2">
              <QuickActions onAddTransaction={() => setShowDashboardModal(true)} />
            </div>
          </div>

          {showDashboardModal && (
            <TransactionModal
              transaction={null}
              onClose={() => setShowDashboardModal(false)}
            />
          )}
        </div>
      )}

      {activeTab === 'transactions' && <TransactionsPage />}
      {activeTab === 'insights' && <InsightsPage />}
    </Layout>
  )
}

export default App
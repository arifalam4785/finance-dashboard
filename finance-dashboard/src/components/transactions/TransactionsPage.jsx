import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import TransactionFilters from './TransactionFilters'
import TransactionTable from './TransactionTable'
import TransactionModal from './TransactionModal'

export default function TransactionsPage() {
  const { isAdmin } = useApp()
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction)
    setShowModal(true)
  }

  const handleAdd = () => {
    setEditingTransaction(null)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingTransaction(null)
  }

  return (
    <div className="space-y-4">
      {/* Header with Add button */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Manage and explore all your financial transactions
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold shadow-lg shadow-violet-500/20 transition-all duration-200 hover:shadow-violet-500/30"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Transaction</span>
          </button>
        )}
      </div>

      <TransactionFilters />
      <TransactionTable onEdit={handleEdit} />

      {/* Modal */}
      {showModal && (
        <TransactionModal
          transaction={editingTransaction}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
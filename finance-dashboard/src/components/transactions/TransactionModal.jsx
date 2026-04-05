import { useState, useEffect, useLayoutEffect, useCallback } from 'react'
import { X, Save, Plus, AlertCircle } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { CATEGORIES } from '../../data/mockData'

const emptyForm = {
  date: new Date().toISOString().slice(0, 10),
  description: '',
  amount: '',
  category: '',
  type: 'expense',
}

export default function TransactionModal({ transaction, onClose }) {
  const { addTransaction, editTransaction } = useApp()
  const isEditing = !!transaction

  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [shake, setShake] = useState(false)
  const [closing, setClosing] = useState(false)

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-eff
    if (transaction) {
      setForm({
        date: transaction.date,
        description: transaction.description,
        amount: String(transaction.amount),
        category: transaction.category,
        type: transaction.type,
      })
    } else {
      setForm(emptyForm)
    }
  }, [transaction])

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!form.date) newErrors.date = 'Date is required'
    if (!form.description.trim()) newErrors.description = 'Description is required'
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      newErrors.amount = 'Enter a valid amount'
    }
    if (!form.category) newErrors.category = 'Select a category'
    return newErrors
  }

  const handleSubmit = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    const data = {
      ...form,
      amount: Number(form.amount),
    }

    if (isEditing) {
      editTransaction({ ...data, id: transaction.id })
    } else {
      addTransaction(data)
    }

    handleClose()
  }

  const handleClose = useCallback(() => {
    setClosing(true)
    setTimeout(onClose, 200)
  }, [onClose])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleClose])

  // Separate categories by type
  const incomeCategories = ['Salary', 'Freelance', 'Investment']
  const expenseCategories = Object.keys(CATEGORIES).filter((c) => !incomeCategories.includes(c))
  const availableCategories = form.type === 'income' ? incomeCategories : expenseCategories

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-200
        ${closing ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-white dark:bg-gray-900 w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden transition-all duration-200
          ${closing ? 'translate-y-8 sm:scale-95' : 'translate-y-0 sm:scale-100'}
          ${shake ? 'animate-shake' : ''}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center
              ${isEditing
                ? 'bg-amber-50 dark:bg-amber-500/10'
                : 'bg-violet-50 dark:bg-violet-500/10'
              }`}
            >
              {isEditing
                ? <Save className="w-4 h-4 text-amber-500" />
                : <Plus className="w-4 h-4 text-violet-500" />
              }
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                {isEditing ? 'Edit Transaction' : 'New Transaction'}
              </h2>
              <p className="text-[10px] text-gray-400 dark:text-gray-500">
                {isEditing ? 'Modify the transaction details' : 'Add a new transaction to your records'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Type toggle */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              Transaction Type
            </label>
            <div className="flex gap-2">
              {['expense', 'income'].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    handleChange('type', type)
                    handleChange('category', '')
                  }}
                  className={`flex-1 py-3 rounded-xl text-sm font-semibold capitalize transition-all duration-200 border-2
                    ${form.type === type
                      ? type === 'income'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                        : 'border-rose-500 bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400'
                      : 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                >
                  {type === 'income' ? '↑ Income' : '↓ Expense'}
                </button>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              Amount (₹)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-300 dark:text-gray-600">₹</span>
              <input
                type="number"
                min="0"
                value={form.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                placeholder="0"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-lg font-bold bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600 focus:outline-none focus:ring-2 transition-all
                  ${errors.amount
                    ? 'border-rose-300 dark:border-rose-500 focus:ring-rose-500/30'
                    : 'border-gray-200 dark:border-gray-700 focus:ring-violet-500/30 focus:border-violet-500'
                  }`}
              />
            </div>
            {errors.amount && (
              <p className="flex items-center gap-1 mt-1.5 text-[11px] text-rose-500">
                <AlertCircle className="w-3 h-3" /> {errors.amount}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              Description
            </label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="What was this transaction for?"
              className={`w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all
                ${errors.description
                  ? 'border-rose-300 dark:border-rose-500 focus:ring-rose-500/30'
                  : 'border-gray-200 dark:border-gray-700 focus:ring-violet-500/30 focus:border-violet-500'
                }`}
            />
            {errors.description && (
              <p className="flex items-center gap-1 mt-1.5 text-[11px] text-rose-500">
                <AlertCircle className="w-3 h-3" /> {errors.description}
              </p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              Date
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all
                ${errors.date
                  ? 'border-rose-300 dark:border-rose-500 focus:ring-rose-500/30'
                  : 'border-gray-200 dark:border-gray-700 focus:ring-violet-500/30 focus:border-violet-500'
                }`}
            />
            {errors.date && (
              <p className="flex items-center gap-1 mt-1.5 text-[11px] text-rose-500">
                <AlertCircle className="w-3 h-3" /> {errors.date}
              </p>
            )}
          </div>

          {/* Category grid */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              Category
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {availableCategories.map((cat) => {
                const selected = form.category === cat
                const color = CATEGORIES[cat]?.color || '#6b7280'
                return (
                  <button
                    key={cat}
                    onClick={() => handleChange('category', cat)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200
                      ${selected
                        ? 'border-current shadow-sm scale-[1.02]'
                        : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
                      }`}
                    style={selected ? { borderColor: color, backgroundColor: `${color}10` } : {}}
                  >
                    <span className="text-xl">{CATEGORIES[cat]?.icon || '📦'}</span>
                    <span className={`text-[10px] font-medium ${selected ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                      {cat}
                    </span>
                  </button>
                )
              })}
            </div>
            {errors.category && (
              <p className="flex items-center gap-1 mt-1.5 text-[11px] text-rose-500">
                <AlertCircle className="w-3 h-3" /> {errors.category}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <button
            onClick={handleClose}
            className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold text-white shadow-lg transition-all duration-200
              ${isEditing
                ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20'
                : 'bg-violet-600 hover:bg-violet-700 shadow-violet-500/20'
              }`}
          >
            {isEditing ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  )
}
import { createContext, useContext, useReducer, useCallback, useMemo } from 'react'
import { mockTransactions, ROLES } from '../data/mockData'

// Load from localStorage if available
const loadState = () => {
  try {
    const saved = localStorage.getItem('finance-dashboard')
    if (saved) {
      const parsed = JSON.parse(saved)
      return {
        ...parsed,
        // Ensure transactions array exists
        transactions: parsed.transactions || mockTransactions,
      }
    }
  } catch (e) {
    console.warn('Failed to load state:', e)
  }
  return null
}

const initialState = loadState() || {
  transactions: mockTransactions,
  role: ROLES.ADMIN,
  darkMode: false,
  filters: {
    search: '',
    type: 'all',       // 'all' | 'income' | 'expense'
    category: 'all',
    dateRange: { from: '', to: '' },
    sortBy: 'date',    // 'date' | 'amount'
    sortOrder: 'desc', // 'asc' | 'desc'
  },
  activeTab: 'dashboard', // 'dashboard' | 'transactions' | 'insights'
}

// Action types
const ACTIONS = {
  SET_ROLE: 'SET_ROLE',
  TOGGLE_DARK_MODE: 'TOGGLE_DARK_MODE',
  SET_FILTER: 'SET_FILTER',
  RESET_FILTERS: 'RESET_FILTERS',
  SET_TAB: 'SET_TAB',
  ADD_TRANSACTION: 'ADD_TRANSACTION',
  EDIT_TRANSACTION: 'EDIT_TRANSACTION',
  DELETE_TRANSACTION: 'DELETE_TRANSACTION',
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_ROLE:
      return { ...state, role: action.payload }

    case ACTIONS.TOGGLE_DARK_MODE:
      return { ...state, darkMode: !state.darkMode }

    case ACTIONS.SET_FILTER:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      }

    case ACTIONS.RESET_FILTERS:
      return {
        ...state,
        filters: initialState.filters,
      }

    case ACTIONS.SET_TAB:
      return { ...state, activeTab: action.payload }

    case ACTIONS.ADD_TRANSACTION:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      }

    case ACTIONS.EDIT_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      }

    case ACTIONS.DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      }

    default:
      return state
  }
}

// Save to localStorage middleware
function persistReducer(state, action) {
  const newState = reducer(state, action)
  try {
    localStorage.setItem('finance-dashboard', JSON.stringify(newState))
  } catch (e) {
    console.warn('Failed to save state:', e)
  }
  return newState
}

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(persistReducer, initialState)

  // Actions
  const setRole = useCallback(
    (role) => dispatch({ type: ACTIONS.SET_ROLE, payload: role }),
    []
  )

  const toggleDarkMode = useCallback(
    () => dispatch({ type: ACTIONS.TOGGLE_DARK_MODE }),
    []
  )

  const setFilter = useCallback(
    (filterUpdate) => dispatch({ type: ACTIONS.SET_FILTER, payload: filterUpdate }),
    []
  )

  const resetFilters = useCallback(
    () => dispatch({ type: ACTIONS.RESET_FILTERS }),
    []
  )

  const setTab = useCallback(
    (tab) => dispatch({ type: ACTIONS.SET_TAB, payload: tab }),
    []
  )

  const addTransaction = useCallback(
    (transaction) =>
      dispatch({
        type: ACTIONS.ADD_TRANSACTION,
        payload: {
          ...transaction,
          id: `txn_${Date.now()}`,
        },
      }),
    []
  )

  const editTransaction = useCallback(
    (transaction) =>
      dispatch({ type: ACTIONS.EDIT_TRANSACTION, payload: transaction }),
    []
  )

  const deleteTransaction = useCallback(
    (id) => dispatch({ type: ACTIONS.DELETE_TRANSACTION, payload: id }),
    []
  )

  // Filtered & sorted transactions (memoized)
  const filteredTransactions = useMemo(() => {
    let result = [...state.transactions]

    const { search, type, category, dateRange, sortBy, sortOrder } = state.filters

    // Search
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      )
    }

    // Type filter
    if (type !== 'all') {
      result = result.filter((t) => t.type === type)
    }

    // Category filter
    if (category !== 'all') {
      result = result.filter((t) => t.category === category)
    }

    // Date range
    if (dateRange.from) {
      result = result.filter((t) => t.date >= dateRange.from)
    }
    if (dateRange.to) {
      result = result.filter((t) => t.date <= dateRange.to)
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0
      if (sortBy === 'date') {
        comparison = a.date.localeCompare(b.date)
      } else if (sortBy === 'amount') {
        comparison = a.amount - b.amount
      }
      return sortOrder === 'desc' ? -comparison : comparison
    })

    return result
  }, [state.transactions, state.filters])

  const value = useMemo(
    () => ({
      ...state,
      filteredTransactions,
      setRole,
      toggleDarkMode,
      setFilter,
      resetFilters,
      setTab,
      addTransaction,
      editTransaction,
      deleteTransaction,
      isAdmin: state.role === ROLES.ADMIN,
    }),
    [state, filteredTransactions, setRole, toggleDarkMode, setFilter, resetFilters, setTab, addTransaction, editTransaction, deleteTransaction]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// Custom hook
// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
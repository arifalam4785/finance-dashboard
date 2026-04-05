// Categories with colors for charts
export const CATEGORIES = {
  Food: { color: '#f97316', icon: '🍔' },
  Transport: { color: '#3b82f6', icon: '🚗' },
  Shopping: { color: '#a855f7', icon: '🛍️' },
  Entertainment: { color: '#ec4899', icon: '🎬' },
  Bills: { color: '#ef4444', icon: '📄' },
  Health: { color: '#10b981', icon: '🏥' },
  Education: { color: '#6366f1', icon: '📚' },
  Salary: { color: '#22c55e', icon: '💰' },
  Freelance: { color: '#14b8a6', icon: '💻' },
  Investment: { color: '#eab308', icon: '📈' },
}

export const ROLES = {
  VIEWER: 'viewer',
  ADMIN: 'admin',
}

// Generate a unique ID
let idCounter = 1
const uid = () => `txn_${String(idCounter++).padStart(4, '0')}`

// Helper to create a transaction
const txn = (date, description, amount, category, type) => ({
  id: uid(),
  date,
  description,
  amount,
  category,
  type, // 'income' or 'expense'
})

export const mockTransactions = [
  // January 2025
  txn('2025-01-02', 'Monthly Salary', 85000, 'Salary', 'income'),
  txn('2025-01-03', 'Grocery Shopping', 3200, 'Food', 'expense'),
  txn('2025-01-05', 'Netflix Subscription', 649, 'Entertainment', 'expense'),
  txn('2025-01-07', 'Uber Rides', 1450, 'Transport', 'expense'),
  txn('2025-01-10', 'Electricity Bill', 2800, 'Bills', 'expense'),
  txn('2025-01-12', 'Freelance Project - UI Design', 15000, 'Freelance', 'income'),
  txn('2025-01-15', 'Online Course - React', 4999, 'Education', 'expense'),
  txn('2025-01-18', 'Restaurant Dinner', 2100, 'Food', 'expense'),
  txn('2025-01-22', 'Amazon Purchase', 5600, 'Shopping', 'expense'),
  txn('2025-01-25', 'Gym Membership', 1500, 'Health', 'expense'),
  txn('2025-01-28', 'Internet Bill', 1199, 'Bills', 'expense'),

  // February 2025
  txn('2025-02-01', 'Monthly Salary', 85000, 'Salary', 'income'),
  txn('2025-02-03', 'Vegetables & Fruits', 1800, 'Food', 'expense'),
  txn('2025-02-06', 'Spotify Subscription', 119, 'Entertainment', 'expense'),
  txn('2025-02-08', 'Petrol', 3000, 'Transport', 'expense'),
  txn('2025-02-10', 'Water Bill', 800, 'Bills', 'expense'),
  txn('2025-02-14', 'Valentine Dinner', 3500, 'Food', 'expense'),
  txn('2025-02-16', 'Freelance - Logo Design', 8000, 'Freelance', 'income'),
  txn('2025-02-20', 'Flipkart Order', 7200, 'Shopping', 'expense'),
  txn('2025-02-23', 'Doctor Visit', 1200, 'Health', 'expense'),
  txn('2025-02-26', 'Investment - Mutual Fund', 10000, 'Investment', 'income'),

  // March 2025
  txn('2025-03-01', 'Monthly Salary', 85000, 'Salary', 'income'),
  txn('2025-03-04', 'Swiggy Orders', 2400, 'Food', 'expense'),
  txn('2025-03-06', 'Movie Tickets', 900, 'Entertainment', 'expense'),
  txn('2025-03-09', 'Metro Card Recharge', 500, 'Transport', 'expense'),
  txn('2025-03-11', 'Gas Bill', 650, 'Bills', 'expense'),
  txn('2025-03-14', 'Book Purchase', 1299, 'Education', 'expense'),
  txn('2025-03-17', 'Freelance - Website Dev', 25000, 'Freelance', 'income'),
  txn('2025-03-20', 'Myntra Shopping', 4300, 'Shopping', 'expense'),
  txn('2025-03-24', 'Medicine', 850, 'Health', 'expense'),
  txn('2025-03-27', 'Electricity Bill', 3100, 'Bills', 'expense'),
  txn('2025-03-30', 'Investment - Stocks', 15000, 'Investment', 'income'),

  // April 2025
  txn('2025-04-01', 'Monthly Salary', 90000, 'Salary', 'income'),
  txn('2025-04-03', 'Grocery - BigBasket', 4100, 'Food', 'expense'),
  txn('2025-04-05', 'Disney+ Hotstar', 299, 'Entertainment', 'expense'),
  txn('2025-04-08', 'Ola Rides', 1800, 'Transport', 'expense'),
  txn('2025-04-10', 'Mobile Recharge', 799, 'Bills', 'expense'),
  txn('2025-04-13', 'Udemy Course - Node.js', 3499, 'Education', 'expense'),
  txn('2025-04-16', 'Freelance - App Design', 20000, 'Freelance', 'income'),
  txn('2025-04-19', 'Electronics - Headphones', 6500, 'Shopping', 'expense'),
  txn('2025-04-22', 'Annual Health Checkup', 3500, 'Health', 'expense'),
  txn('2025-04-25', 'WiFi Bill', 1199, 'Bills', 'expense'),
  txn('2025-04-28', 'Investment - FD', 20000, 'Investment', 'income'),

  // May 2025
  txn('2025-05-01', 'Monthly Salary', 90000, 'Salary', 'income'),
  txn('2025-05-04', 'Zomato Orders', 3200, 'Food', 'expense'),
  txn('2025-05-07', 'Concert Tickets', 4500, 'Entertainment', 'expense'),
  txn('2025-05-09', 'Fuel', 3500, 'Transport', 'expense'),
  txn('2025-05-12', 'Electricity Bill', 3400, 'Bills', 'expense'),
  txn('2025-05-15', 'Freelance - Branding', 12000, 'Freelance', 'income'),
  txn('2025-05-18', 'Clothing - H&M', 5200, 'Shopping', 'expense'),
  txn('2025-05-21', 'Dentist Appointment', 2000, 'Health', 'expense'),
  txn('2025-05-24', 'Workshop - Design Thinking', 2500, 'Education', 'expense'),
  txn('2025-05-28', 'Investment - Crypto', 5000, 'Investment', 'income'),

  // June 2025
  txn('2025-06-01', 'Monthly Salary', 90000, 'Salary', 'income'),
  txn('2025-06-03', 'Restaurant - Family Dinner', 4800, 'Food', 'expense'),
  txn('2025-06-06', 'YouTube Premium', 149, 'Entertainment', 'expense'),
  txn('2025-06-09', 'Rapido Bike Rides', 600, 'Transport', 'expense'),
  txn('2025-06-11', 'Internet Bill', 1199, 'Bills', 'expense'),
  txn('2025-06-14', 'Coursera Subscription', 3200, 'Education', 'expense'),
  txn('2025-06-17', 'Freelance - SEO Audit', 10000, 'Freelance', 'income'),
  txn('2025-06-20', 'Amazon - Kitchen Items', 3800, 'Shopping', 'expense'),
  txn('2025-06-23', 'Pharmacy', 950, 'Health', 'expense'),
  txn('2025-06-27', 'Gas + Water Bill', 1400, 'Bills', 'expense'),
  txn('2025-06-30', 'Investment - Gold ETF', 8000, 'Investment', 'income'),
]
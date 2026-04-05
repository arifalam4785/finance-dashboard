# FinTrack — Personal Finance Dashboard

A clean, interactive, and fully responsive finance dashboard built with **React**, **Tailwind CSS**, and **Recharts**. Designed to help users track income, expenses, and understand their spending patterns through beautiful visualizations and smart insights.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite)

---

## Features

### Dashboard Overview
- **Summary Cards** with animated counters, sparkline mini-charts, and month-over-month change indicators
- **Balance Trend Chart** — interactive multi-line area chart (Income / Expenses / Balance) with toggleable views
- **Spending Breakdown** — interactive donut chart with hover effects and a scrollable category legend with progress bars
- **Recent Transactions** — quick view of the 6 latest transactions
- **Quick Actions** — shortcuts to add transactions, view insights, or export data

### Transactions
- Full **searchable, filterable, and sortable** transaction table
- **Filters**: type (income/expense), category, date range, sort order
- **Active filter chips** with individual clear buttons
- **Pagination** with page numbers
- **Add / Edit / Delete** transactions (Admin mode only)
- Beautiful **modal form** with emoji-based category picker, validation with shake animation
- **Export to CSV** functionality
- **Mobile-optimized** card layout on smaller screens
- **Empty state** handling with helpful messages

### Insights
- **Quick Stats Strip** — savings rate, average daily spend, categories used, months tracked
- **Top Spending Category** with progress bar and transaction count
- **Monthly Comparison** — last vs previous month with percentage changes
- **Savings Health** — circular progress ring with contextual advice
- **Best & Worst Month** cards
- **Top 5 Largest Expenses** ranked list
- **Monthly Expense Bar Chart** with highlighted current month

### Role-Based UI (RBAC Simulation)
- **Admin** — full access: add, edit, delete transactions
- **Viewer** — read-only: can view all data but cannot modify
- Toggle between roles via the header badge

### Additional Features
- **Dark Mode** — full dark theme with smooth transitions
- **Data Persistence** — localStorage saves all state (transactions, role, dark mode, filters)
- **Export** — CSV export from transactions, JSON export from dashboard
- **Responsive Design** — desktop sidebar, mobile bottom navigation, adaptive layouts
- **Animations** — staggered fade-in, animated counters, hover effects, modal transitions, shake on validation error

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 (Vite) |
| Styling | Tailwind CSS 4 |
| Charts | Recharts |
| Icons | Lucide React |
| State Management | React Context API + useReducer |
| Persistence | localStorage |
| Build Tool | Vite 6 |

---

## Project Structure
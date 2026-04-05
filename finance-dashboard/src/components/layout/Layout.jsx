import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'
import Header from './Header'

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const { darkMode } = useApp()

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Desktop sidebar */}
        <div className="hidden md:block">
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>

        {/* Main content */}
        <div
          className={`transition-all duration-300 ${
            collapsed ? 'md:ml-18' : 'md:ml-60'
          }`}
        >
          <Header />
          <main className="p-4 md:p-6 pb-24 md:pb-6 min-h-[calc(100vh-4rem)]">
            {children}
          </main>
        </div>

        {/* Mobile bottom nav */}
        <MobileNav />
      </div>
    </div>
  )
}
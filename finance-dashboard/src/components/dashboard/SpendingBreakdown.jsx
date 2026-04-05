import { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts'
import { useApp } from '../../context/AppContext'
import { groupByCategory, formatCurrency } from '../../utils/helpers'
import { CATEGORIES } from '../../data/mockData'

// Custom active shape for hover effect
const renderActiveShape = (props) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value, percent,
  } = props

  return (
    <g>
      <text x={cx} y={cy - 8} textAnchor="middle" className="fill-gray-900 dark:fill-white text-sm font-bold">
        {payload.category}
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" className="fill-gray-400 text-xs">
        {formatCurrency(value)}
      </text>
      <text x={cx} y={cy + 28} textAnchor="middle" className="fill-gray-400 text-[10px]">
        {(percent * 100).toFixed(1)}%
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 2}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={outerRadius + 10}
        outerRadius={outerRadius + 14}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.3}
      />
    </g>
  )
}

export default function SpendingBreakdown() {
  const { transactions } = useApp()
  const [activeIndex, setActiveIndex] = useState(0)

  const categoryData = groupByCategory(transactions)
  const total = categoryData.reduce((sum, c) => sum + c.total, 0)

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Spending Breakdown</h3>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Expenses by category</p>
      </div>

      <div className="h-55">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              dataKey="total"
              nameKey="category"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              strokeWidth={2}
              stroke="#fff"
              className="dark:[&_path]:stroke-gray-900"
            >
              {categoryData.map((entry) => (
                <Cell
                  key={entry.category}
                  fill={CATEGORIES[entry.category]?.color || '#6b7280'}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend list */}
      <div className="mt-2 space-y-2 max-h-45 overflow-y-auto pr-1 custom-scrollbar">
        {categoryData.map((cat, i) => {
          const pct = ((cat.total / total) * 100).toFixed(1)
          const color = CATEGORIES[cat.category]?.color || '#6b7280'
          const icon = CATEGORIES[cat.category]?.icon || '📦'

          return (
            <div
              key={cat.category}
              onMouseEnter={() => setActiveIndex(i)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200
                ${activeIndex === i
                  ? 'bg-gray-50 dark:bg-gray-800'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
            >
              <span className="text-base">{icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                    {cat.category}
                  </span>
                  <span className="text-xs font-bold text-gray-900 dark:text-white ml-2">
                    {formatCurrency(cat.total)}
                  </span>
                </div>
                <div className="mt-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
              </div>
              <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 w-10 text-right">
                {pct}%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
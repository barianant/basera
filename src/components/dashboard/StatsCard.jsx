import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StatsCard({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  variant = 'blue',
  subtitle,
}) {
  const variantStyles = {
    blue: {
      bg: 'bg-blue-50 text-blue-600',
      border: 'hover:border-blue-200',
    },
    green: {
      bg: 'bg-emerald-50 text-emerald-600',
      border: 'hover:border-emerald-200',
    },
    amber: {
      bg: 'bg-amber-50 text-amber-600',
      border: 'hover:border-amber-200',
    },
    purple: {
      bg: 'bg-purple-50 text-purple-600',
      border: 'hover:border-purple-200',
    },
  }

  const selected = variantStyles[variant] || variantStyles.blue

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm transition-all duration-200 ${selected.border}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
          {title}
        </span>
        {Icon && (
          <div className={`w-10 h-10 rounded-xl ${selected.bg} flex items-center justify-center`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-2xl font-black text-gray-900 tracking-tight">{value}</h3>

        {change && (
          <div
            className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
              isPositive
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-rose-50 text-rose-700'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>{change}</span>
          </div>
        )}
      </div>

      {subtitle && (
        <p className="text-xs text-gray-400 mt-2 font-medium">{subtitle}</p>
      )}
    </motion.div>
  )
}

import React from 'react'

export default function Badge({
  children,
  variant = 'info',
  size = 'md',
  dot = false,
  icon = null,
  className = '',
}) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full border transition-colors'

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-0.5 gap-1.5',
    lg: 'text-sm px-3.5 py-1 gap-2',
  }

  const variantStyles = {
    info: 'bg-blue-50 text-blue-700 border-blue-200/80',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    warning: 'bg-amber-50 text-amber-700 border-amber-200/80',
    error: 'bg-rose-50 text-rose-700 border-rose-200/80',
    neutral: 'bg-gray-100 text-gray-700 border-gray-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200/80',
    pink: 'bg-pink-50 text-pink-700 border-pink-200/80',
    boys: 'bg-blue-50 text-blue-700 border-blue-200 font-semibold',
    girls: 'bg-rose-50 text-rose-700 border-rose-200 font-semibold',
    unisex: 'bg-violet-50 text-violet-700 border-violet-200 font-semibold',
    verified: 'bg-blue-600 text-white border-transparent font-medium shadow-sm',
    beds: 'bg-emerald-600 text-white border-transparent font-semibold shadow-sm',
    premium: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-transparent shadow-sm font-semibold',
  }

  const dotColors = {
    info: 'bg-blue-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-rose-500',
    neutral: 'bg-gray-400',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
    boys: 'bg-blue-500',
    girls: 'bg-rose-500',
    unisex: 'bg-violet-500',
    verified: 'bg-white',
    beds: 'bg-white',
    premium: 'bg-white',
  }

  return (
    <span
      className={`
        ${baseStyles}
        ${sizeStyles[size] || sizeStyles.md}
        ${variantStyles[variant] || variantStyles.info}
        ${className}
      `}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            dotColors[variant] || 'bg-current'
          }`}
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  )
}

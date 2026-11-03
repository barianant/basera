import React from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = 'relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2'

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 font-medium',
    md: 'text-sm px-5 py-2.5 gap-2 font-medium',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
  }

  const variantStyles = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-600/25 hover:shadow-lg hover:shadow-primary-600/35 focus:ring-primary-500 border border-transparent active:bg-primary-800',
    secondary: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/60 focus:ring-indigo-400',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 shadow-sm hover:border-gray-400 focus:ring-gray-300',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 focus:ring-gray-200',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/20 focus:ring-red-400',
    gradient: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35',
    dark: 'bg-gray-900 hover:bg-black text-white shadow-md shadow-gray-900/20 focus:ring-gray-800',
  }

  const isDisabled = disabled || loading

  return (
    <motion.button
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      whileHover={!isDisabled ? { translateY: -1 } : {}}
      transition={{ duration: 0.15 }}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${sizeStyles[size] || sizeStyles.md}
        ${variantStyles[variant] || variantStyles.primary}
        ${fullWidth ? 'w-full' : ''}
        ${isDisabled ? 'opacity-55 cursor-not-allowed transform-none shadow-none pointer-events-none' : ''}
        ${className}
      `}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
      {!loading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </motion.button>
  )
}

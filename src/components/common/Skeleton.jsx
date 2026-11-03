import React from 'react'

export default function Skeleton({
  variant = 'text',
  className = '',
  count = 1,
}) {
  const baseClasses = 'animate-pulse bg-gray-200 rounded-lg'

  const variants = {
    text: 'h-4 w-full rounded',
    title: 'h-7 w-3/4 rounded-md',
    avatar: 'w-10 h-10 rounded-full',
    card: 'h-64 w-full rounded-2xl',
    badge: 'h-5 w-16 rounded-full',
    button: 'h-10 w-28 rounded-xl',
  }

  const items = Array.from({ length: count })

  if (count === 1) {
    return (
      <div
        className={`${baseClasses} ${variants[variant] || variants.text} ${className}`}
      />
    )
  }

  return (
    <div className="space-y-2">
      {items.map((_, i) => (
        <div
          key={i}
          className={`${baseClasses} ${variants[variant] || variants.text} ${className}`}
        />
      ))}
    </div>
  )
}

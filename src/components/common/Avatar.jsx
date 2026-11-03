import React, { useState } from 'react'
import { Check } from 'lucide-react'

export default function Avatar({
  src,
  name = 'User',
  size = 'md',
  online = null,
  verified = false,
  className = '',
}) {
  const [imgError, setImgError] = useState(false)

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg font-bold',
    '2xl': 'w-24 h-24 text-2xl font-bold',
  }

  const indicatorSizes = {
    xs: 'w-1.5 h-1.5 border',
    sm: 'w-2 h-2 border',
    md: 'w-2.5 h-2.5 border-2',
    lg: 'w-3 h-3 border-2',
    xl: 'w-4 h-4 border-2',
    '2xl': 'w-5 h-5 border-2',
  }

  const getInitials = (n) => {
    if (!n) return 'U'
    const parts = n.trim().split(' ')
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    }
    return n.slice(0, 2).toUpperCase()
  }

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      <div
        className={`
          ${sizeClasses[size] || sizeClasses.md}
          rounded-full overflow-hidden flex items-center justify-center font-semibold
          bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-sm ring-2 ring-white
        `}
      >
        {src && !imgError ? (
          <img
            src={src}
            alt={name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>

      {online !== null && (
        <span
          className={`
            absolute bottom-0 right-0 rounded-full border-white
            ${indicatorSizes[size] || indicatorSizes.md}
            ${online ? 'bg-emerald-500 ring-1 ring-white' : 'bg-gray-400'}
          `}
          title={online ? 'Online now' : 'Offline'}
        />
      )}

      {verified && (
        <span
          className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs ring-1 ring-white"
          title="Verified Profile"
        >
          <Check className="w-2.5 h-2.5 stroke-[3]" />
        </span>
      )}
    </div>
  )
}

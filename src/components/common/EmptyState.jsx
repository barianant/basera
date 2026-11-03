import React from 'react'
import { motion } from 'framer-motion'
import { Home, Heart, Calendar, MessageSquare, Bell, Search, AlertCircle } from 'lucide-react'
import Button from './Button'

const presets = {
  'no-listings': {
    icon: Search,
    title: 'No Available Beds Found',
    description: 'Try adjusting your filters, budget range, or selecting another nearby college area.',
    actionLabel: 'Reset All Filters',
  },
  'no-wishlist': {
    icon: Heart,
    title: 'Your Wishlist is Empty',
    description: 'Explore student accommodations near top colleges and tap the heart icon to save your favorites.',
    actionLabel: 'Browse PGs Now',
  },
  'no-bookings': {
    icon: Calendar,
    title: 'No Scheduled Visits',
    description: 'You have not scheduled any PG walkthroughs yet. Book a visit directly with verified owners in one tap.',
    actionLabel: 'Find a PG to Visit',
  },
  'no-messages': {
    icon: MessageSquare,
    title: 'No Conversations Yet',
    description: 'Have questions about available beds, food, or deposit? Chat directly with verified PG owners.',
    actionLabel: 'Find Accommodation',
  },
  'no-notifications': {
    icon: Bell,
    title: 'All Caught Up!',
    description: 'No new alerts. We will notify you when a bed opens up or when an owner replies to your visit request.',
    actionLabel: null,
  },
}

export default function EmptyState({
  preset = 'generic',
  title,
  description,
  icon: CustomIcon,
  actionLabel,
  onAction,
  className = '',
}) {
  const config = presets[preset] || {
    icon: CustomIcon || AlertCircle,
    title: title || 'Nothing to show here',
    description: description || 'There are currently no items in this section.',
    actionLabel: actionLabel || null,
  }

  const IconComponent = CustomIcon || config.icon || AlertCircle
  const displayTitle = title || config.title
  const displayDesc = description || config.description
  const displayAction = actionLabel !== undefined ? actionLabel : config.actionLabel

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white rounded-2xl border border-gray-100 shadow-sm ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4 ring-8 ring-primary-50/50 shadow-inner">
        <IconComponent className="w-8 h-8" />
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-1.5">{displayTitle}</h3>
      <p className="text-sm text-gray-500 max-w-md mb-6 leading-relaxed">
        {displayDesc}
      </p>

      {displayAction && onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {displayAction}
        </Button>
      )}
    </motion.div>
  )
}

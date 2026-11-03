import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bell,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Bed,
  Tag,
  Clock,
  Check,
} from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import EmptyState from '../../components/common/EmptyState'
import { useAuth } from '../../context/AuthContext'
import notify from '../../components/common/Toast'

const iconMap = {
  booking: Calendar,
  chat: MessageSquare,
  bed: Bed,
  price: Tag,
  reminder: Clock,
}

const colorMap = {
  booking: 'bg-emerald-50 text-emerald-600',
  chat: 'bg-blue-50 text-blue-600',
  bed: 'bg-emerald-50 text-emerald-600',
  price: 'bg-amber-50 text-amber-600',
  reminder: 'bg-purple-50 text-purple-600',
}

export default function StudentNotifications() {
  const { notifications, markAllNotificationsRead } = useAuth()
  const [filter, setFilter] = useState('all')

  const filteredNotifs = notifications.filter((n) => {
    if (filter === 'unread') return !n.read
    if (filter === 'bookings') return n.type === 'booking' || n.type === 'reminder'
    return true
  })

  const handleMarkRead = () => {
    markAllNotificationsRead()
    notify.success('All notifications marked as read')
  }

  return (
    <DashboardLayout
      title="Notifications"
      subtitle="Stay informed about new bed vacancies, price drops, and visit confirmations"
    >
      <div className="max-w-4xl space-y-6">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          {/* Tabs */}
          <div className="flex gap-2">
            {[
              { id: 'all', label: 'All Alerts' },
              { id: 'unread', label: 'Unread' },
              { id: 'bookings', label: 'Visits' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  filter === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleMarkRead}
            className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mark All as Read</span>
          </button>
        </div>

        {/* Notifications List */}
        {filteredNotifs.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifs.map((n) => {
              const Icon = iconMap[n.type] || Bell
              const colorClass = colorMap[n.type] || 'bg-blue-50 text-blue-600'
              return (
                <div
                  key={n.id}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                    !n.read
                      ? 'bg-blue-50/50 border-blue-200/80 shadow-xs'
                      : 'bg-white border-gray-100'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${colorClass} flex items-center justify-center shrink-0 mt-0.5`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-gray-900">{n.title}</h4>
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium shrink-0">
                        {n.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{n.message}</p>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <EmptyState preset="no-notifications" />
        )}
      </div>
    </DashboardLayout>
  )
}

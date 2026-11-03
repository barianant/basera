import React from 'react'
import {
  Calendar,
  MessageSquare,
  Bed,
  CheckCircle2,
  DollarSign,
  UserPlus,
} from 'lucide-react'

const iconMap = {
  visit: Calendar,
  chat: MessageSquare,
  bed: Bed,
  booking: CheckCircle2,
  payment: DollarSign,
  lead: UserPlus,
}

const colorMap = {
  visit: 'bg-blue-50 text-blue-600',
  chat: 'bg-indigo-50 text-indigo-600',
  bed: 'bg-emerald-50 text-emerald-600',
  booking: 'bg-emerald-50 text-emerald-600',
  payment: 'bg-amber-50 text-amber-600',
  lead: 'bg-purple-50 text-purple-600',
}

export default function ActivityFeed({ activities = [], title = 'Recent Activity' }) {
  const defaultActivities = [
    {
      id: 1,
      type: 'visit',
      title: 'New Visit Scheduled',
      description: 'Priya Sharma (COEP) booked a room inspection for tomorrow 2:00 PM',
      time: '12 min ago',
    },
    {
      id: 2,
      type: 'lead',
      title: 'Student Lead Generated',
      description: 'Arjun Verma inquired about single AC room with food',
      time: '45 min ago',
    },
    {
      id: 3,
      type: 'bed',
      title: 'Bed Status Marked Occupied',
      description: 'Bed #4 in Room 201 filled by Student Hub tenant',
      time: '3 hours ago',
    },
    {
      id: 4,
      type: 'chat',
      title: 'New Student Message',
      description: 'Sneha Patil asked: "Is there 24hr power backup during exams?"',
      time: '5 hours ago',
    },
  ]

  const items = activities.length > 0 ? activities : defaultActivities

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <h3 className="text-base font-bold text-gray-900 mb-4">{title}</h3>

      <div className="space-y-4">
        {items.map((act) => {
          const Icon = iconMap[act.type] || CheckCircle2
          const colorClass = colorMap[act.type] || 'bg-gray-100 text-gray-700'
          return (
            <div key={act.id} className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-xl ${colorClass} flex items-center justify-center shrink-0 mt-0.5`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold text-gray-900 truncate">
                    {act.title}
                  </p>
                  <span className="text-[10px] text-gray-400 shrink-0 font-medium">
                    {act.time}
                  </span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2 mt-0.5 leading-relaxed">
                  {act.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

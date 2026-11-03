import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Search,
  Heart,
  Calendar,
  MessageSquare,
  Bell,
  User,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Home,
  CheckCircle2,
  GraduationCap,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Avatar from '../common/Avatar'
import Badge from '../common/Badge'

export default function DashboardLayout({ children, title, subtitle }) {
  const { user, logout, wishlist, notifications, chats } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const unreadNotifs = notifications.filter((n) => !n.read).length
  const unreadChats = chats.reduce((acc, c) => acc + (c.unread || 0), 0)

  const navItems = [
    { label: 'Overview', path: '/student/dashboard', icon: LayoutDashboard },
    { label: 'Find Beds', path: '/search', icon: Search },
    {
      label: 'Saved PGs',
      path: '/student/wishlist',
      icon: Heart,
      badge: wishlist.length > 0 ? wishlist.length : null,
      badgeColor: 'bg-rose-500',
    },
    { label: 'My Bookings', path: '/student/bookings', icon: Calendar },
    {
      label: 'Messages',
      path: '/student/messages',
      icon: MessageSquare,
      badge: unreadChats > 0 ? unreadChats : null,
      badgeColor: 'bg-primary-600',
    },
    {
      label: 'Notifications',
      path: '/student/notifications',
      icon: Bell,
      badge: unreadNotifs > 0 ? unreadNotifs : null,
      badgeColor: 'bg-amber-500',
    },
    { label: 'My Profile', path: '/student/profile', icon: User },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-gray-200/80 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Logo */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-black text-gray-900 tracking-tight">
                BASERA
              </span>
              <span className="block text-[9px] font-bold text-primary-600 tracking-wider uppercase">
                Student Portal
              </span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 text-gray-400 hover:text-gray-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Mini Card */}
        <div className="p-4 mx-4 my-4 bg-gradient-to-br from-blue-50 to-indigo-50/60 rounded-2xl border border-blue-100/80">
          <div className="flex items-center gap-3">
            <Avatar
              src={user?.avatar}
              name={user?.name || 'Rahul Verma'}
              size="md"
              online={true}
              verified={true}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-gray-900 truncate">
                {user?.name || 'Rahul Verma'}
              </p>
              <p className="text-xs text-primary-600 font-medium truncate flex items-center gap-1">
                <GraduationCap className="w-3 h-3 shrink-0" />
                COEP Pune
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-600/25 font-semibold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-gray-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${
                      active ? 'bg-white/20' : item.badgeColor
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => {
              logout()
              navigate('/')
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-900 rounded-xl hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                {title || 'Student Dashboard'}
              </h1>
              {subtitle && (
                <p className="text-xs text-gray-500 hidden sm:block">{subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/search"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-gray-500" />
              Search Beds
            </Link>
            <Link
              to="/student/notifications"
              className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
              )}
            </Link>
            <Link to="/student/profile">
              <Avatar
                src={user?.avatar}
                name={user?.name || 'Rahul Verma'}
                size="sm"
                online={true}
              />
            </Link>
          </div>
        </header>

        {/* Main Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-20 lg:pb-8">
          {children}
        </main>
      </div>
    </div>
  )
}

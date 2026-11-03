import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  MessageSquare,
  User,
  LogOut,
  Menu,
  X,
  Home,
  TrendingUp,
  ShieldCheck,
  Bell,
  Sparkles,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Avatar from '../common/Avatar'
import Badge from '../common/Badge'

export default function OwnerDashboardLayout({ children, title, subtitle }) {
  const { user, logout, chats } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const unreadChats = chats.reduce((acc, c) => acc + (c.unread || 0), 0)

  const navItems = [
    { label: 'Overview', path: '/owner/dashboard', icon: LayoutDashboard },
    { label: 'My Listings', path: '/owner/listings', icon: Building2 },
    { label: 'Add New Property', path: '/owner/add-property', icon: PlusCircle, highlight: true },
    {
      label: 'Student Inquiries',
      path: '/owner/messages',
      icon: MessageSquare,
      badge: unreadChats > 0 ? unreadChats : null,
      badgeColor: 'bg-primary-600',
    },
    { label: 'Business Profile', path: '/owner/profile', icon: User },
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
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Logo */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-black text-white tracking-tight">
                BASERA
              </span>
              <span className="block text-[9px] font-bold text-blue-400 tracking-wider uppercase">
                Owner Business Suite
              </span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Owner Mini Card */}
        <div className="p-4 mx-4 my-4 bg-slate-800/80 rounded-2xl border border-slate-700/60">
          <div className="flex items-center gap-3">
            <Avatar
              src={user?.avatar}
              name={user?.name || 'Ramesh Sharma'}
              size="md"
              online={true}
              verified={true}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-white truncate">
                {user?.name || 'Ramesh Sharma'}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Verified Host</span>
              </div>
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
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-600/30 font-semibold'
                    : item.highlight
                    ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      active ? 'text-white' : item.highlight ? 'text-blue-400' : 'text-slate-400'
                    }`}
                  />
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

        {/* Quick Stats Pill */}
        <div className="p-4 mx-4 mb-3 bg-slate-800/50 rounded-xl border border-slate-700/40 text-xs">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span>Bed Occupancy</span>
            <span className="text-emerald-400 font-bold">81%</span>
          </div>
          <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '81%' }} />
          </div>
          <p className="text-[10px] text-slate-400 mt-2">29 / 36 beds currently occupied</p>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => {
              logout()
              navigate('/')
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
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
                {title || 'PG Owner Business Hub'}
              </h1>
              {subtitle && (
                <p className="text-xs text-gray-500 hidden sm:block">{subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/owner/add-property"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-primary-600 hover:bg-primary-700 text-white shadow-sm shadow-primary-600/20 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List New PG</span>
            </Link>
            <Link to="/owner/profile">
              <Avatar
                src={user?.avatar}
                name={user?.name || 'Ramesh Sharma'}
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

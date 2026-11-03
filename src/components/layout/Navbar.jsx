import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Search,
  Heart,
  MessageSquare,
  Bell,
  User,
  PlusCircle,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Building2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Avatar from '../common/Avatar'
import Badge from '../common/Badge'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [demoBannerOpen, setDemoBannerOpen] = useState(true)

  const { user, loginAs, logout, wishlist, notifications, chats } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setProfileDropdownOpen(false)
  }, [location.pathname])

  const unreadNotifs = notifications.filter((n) => !n.read).length
  const unreadChats = chats.reduce((acc, c) => acc + (c.unread || 0), 0)

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Quick Pitch / Hackathon Demo Switcher Banner */}
      {demoBannerOpen && (
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-primary-800 text-white text-xs py-1.5 px-4 sticky top-0 z-50 shadow-xs border-b border-white/10">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="bg-amber-400 text-gray-950 font-bold px-1.5 py-0.5 rounded text-[10px] tracking-wide uppercase">
                Investor Demo
              </span>
              <span className="hidden sm:inline font-medium text-blue-100">
                BASERA • India's Bed-Level Student Housing Engine
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-blue-200 text-[11px] hidden md:inline">Quick Test:</span>
              <button
                onClick={() => loginAs('student')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  user?.role === 'student'
                    ? 'bg-white text-blue-800 shadow-xs'
                    : 'bg-white/15 text-white hover:bg-white/25'
                }`}
              >
                🎓 Student
              </button>
              <button
                onClick={() => loginAs('owner')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  user?.role === 'owner'
                    ? 'bg-white text-blue-800 shadow-xs'
                    : 'bg-white/15 text-white hover:bg-white/25'
                }`}
              >
                🏢 PG Owner
              </button>
              <button
                onClick={() => setDemoBannerOpen(false)}
                className="text-white/60 hover:text-white ml-1 p-0.5 rounded"
                title="Dismiss demo banner"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Sticky Navbar */}
      <header
        className={`sticky ${demoBannerOpen ? 'top-[33px]' : 'top-0'} z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-3'
            : 'bg-white/80 backdrop-blur-xs border-b border-gray-100/60 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform duration-200">
                <Home className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-gray-900 group-hover:text-primary-600 transition-colors">
                  BASERA
                </span>
                <span className="text-[9.5px] font-medium tracking-wider text-gray-400 uppercase -mt-1 hidden sm:block">
                  Find Beds • Not Problems
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              <Link
                to="/search"
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isActive('/search')
                    ? 'text-primary-600 bg-primary-50 font-semibold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Find Beds
              </Link>
              <Link
                to="/#how-it-works"
                className="px-3.5 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                How It Works
              </Link>
              <Link
                to="/owner/add-property"
                className="px-3.5 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-1.5"
              >
                <Building2 className="w-4 h-4 text-primary-500" />
                List Your PG
              </Link>
              <Link
                to="/about"
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isActive('/about')
                    ? 'text-primary-600 bg-primary-50 font-semibold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                About
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {user ? (
                /* Logged In State */
                <div className="flex items-center gap-2">
                  {user.role === 'student' && (
                    <>
                      {/* Wishlist Link */}
                      <Link
                        to="/student/wishlist"
                        className="relative p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors hidden sm:flex"
                        title="Wishlist"
                      >
                        <Heart className="w-5 h-5" />
                        {wishlist.length > 0 && (
                          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                            {wishlist.length}
                          </span>
                        )}
                      </Link>

                      {/* Messages Link */}
                      <Link
                        to="/student/messages"
                        className="relative p-2 text-gray-600 hover:text-primary-600 hover:bg-blue-50 rounded-xl transition-colors hidden sm:flex"
                        title="Messages"
                      >
                        <MessageSquare className="w-5 h-5" />
                        {unreadChats > 0 && (
                          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                            {unreadChats}
                          </span>
                        )}
                      </Link>

                      {/* Notifications Link */}
                      <Link
                        to="/student/notifications"
                        className="relative p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors hidden sm:flex"
                        title="Notifications"
                      >
                        <Bell className="w-5 h-5" />
                        {unreadNotifs > 0 && (
                          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
                            {unreadNotifs}
                          </span>
                        )}
                      </Link>
                    </>
                  )}

                  {user.role === 'owner' && (
                    <Link
                      to="/owner/add-property"
                      className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Add Room
                    </Link>
                  )}

                  {/* Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className="flex items-center gap-2.5 p-1 pl-2 pr-2.5 rounded-full border border-gray-200 hover:border-gray-300 hover:shadow-xs transition-all cursor-pointer bg-white"
                    >
                      <Avatar
                        src={user.avatar}
                        name={user.name}
                        size="sm"
                        online={true}
                        verified={user.verified}
                      />
                      <div className="hidden lg:flex flex-col text-left">
                        <span className="text-xs font-semibold text-gray-800 leading-tight">
                          {user.name.split(' ')[0]}
                        </span>
                        <span className="text-[10px] text-gray-400 capitalize">
                          {user.role}
                        </span>
                      </div>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {profileDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50"
                        >
                          <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm font-bold text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-400 truncate">{user.email}</p>
                            <div className="mt-2">
                              <Badge
                                variant={user.role === 'owner' ? 'purple' : 'info'}
                                size="sm"
                              >
                                {user.role === 'owner' ? '🏢 Verified PG Owner' : '🎓 Verified Student'}
                              </Badge>
                            </div>
                          </div>

                          <div className="py-1 text-sm">
                            {user.role === 'student' ? (
                              <>
                                <Link
                                  to="/student/dashboard"
                                  className="flex items-center gap-2.5 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                                >
                                  <Home className="w-4 h-4" />
                                  Dashboard
                                </Link>
                                <Link
                                  to="/student/wishlist"
                                  className="flex items-center gap-2.5 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-rose-600"
                                >
                                  <Heart className="w-4 h-4" />
                                  Saved Beds ({wishlist.length})
                                </Link>
                                <Link
                                  to="/student/bookings"
                                  className="flex items-center gap-2.5 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                  My Bookings
                                </Link>
                                <Link
                                  to="/student/messages"
                                  className="flex items-center gap-2.5 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                                >
                                  <MessageSquare className="w-4 h-4" />
                                  Chats
                                </Link>
                                <Link
                                  to="/student/profile"
                                  className="flex items-center gap-2.5 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                                >
                                  <User className="w-4 h-4" />
                                  My Profile
                                </Link>
                              </>
                            ) : (
                              <>
                                <Link
                                  to="/owner/dashboard"
                                  className="flex items-center gap-2.5 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                                >
                                  <Home className="w-4 h-4" />
                                  Owner Dashboard
                                </Link>
                                <Link
                                  to="/owner/listings"
                                  className="flex items-center gap-2.5 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                                >
                                  <Building2 className="w-4 h-4" />
                                  My PG Listings
                                </Link>
                                <Link
                                  to="/owner/add-property"
                                  className="flex items-center gap-2.5 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                                >
                                  <PlusCircle className="w-4 h-4" />
                                  Add New Property
                                </Link>
                                <Link
                                  to="/owner/messages"
                                  className="flex items-center gap-2.5 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                                >
                                  <MessageSquare className="w-4 h-4" />
                                  Student Leads
                                </Link>
                                <Link
                                  to="/owner/profile"
                                  className="flex items-center gap-2.5 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                                >
                                  <User className="w-4 h-4" />
                                  Business Profile
                                </Link>
                              </>
                            )}
                          </div>

                          <div className="pt-1 border-t border-gray-100">
                            <button
                              onClick={() => {
                                logout()
                                navigate('/')
                              }}
                              className="flex items-center gap-2.5 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                            >
                              <LogOut className="w-4 h-4" />
                              Sign Out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                /* Logged Out State */
                <div className="flex items-center gap-2 sm:gap-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-xl text-sm font-semibold bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-600/20 hover:shadow-lg transition-all"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100 md:hidden cursor-pointer"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-3"
            >
              <Link
                to="/search"
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Search className="w-4 h-4 text-primary-600" />
                Find Available Beds
              </Link>
              <Link
                to="/#how-it-works"
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                How BASERA Works
              </Link>
              <Link
                to="/owner/add-property"
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Building2 className="w-4 h-4 text-blue-600" />
                List Your PG (Owners)
              </Link>
              <Link
                to="/about"
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                About BASERA
              </Link>

              <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                {user ? (
                  <Link
                    to={user.role === 'owner' ? '/owner/dashboard' : '/student/dashboard'}
                    className="w-full text-center py-2.5 rounded-xl bg-primary-600 text-white font-medium text-sm"
                  >
                    Go to {user.role === 'owner' ? 'Owner' : 'Student'} Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="w-full text-center py-2 rounded-xl border border-gray-200 text-gray-700 font-medium text-sm"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="w-full text-center py-2.5 rounded-xl bg-primary-600 text-white font-medium text-sm"
                    >
                      Create Free Account
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}

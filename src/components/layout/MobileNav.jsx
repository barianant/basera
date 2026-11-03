import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Search, Heart, MessageSquare, User, Building } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function MobileNav() {
  const location = useLocation()
  const { user, wishlist, chats } = useAuth()

  const isActive = (path) => location.pathname === path

  const unreadChats = chats.reduce((acc, c) => acc + (c.unread || 0), 0)

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/80 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        {/* Home */}
        <Link
          to="/"
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${
            isActive('/') ? 'text-primary-600 font-semibold' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Home className={`w-5 h-5 ${isActive('/') ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-0.5">Home</span>
        </Link>

        {/* Search */}
        <Link
          to="/search"
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${
            isActive('/search') ? 'text-primary-600 font-semibold' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Search className={`w-5 h-5 ${isActive('/search') ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-0.5">Explore</span>
        </Link>

        {/* Wishlist / My Listings (based on role) */}
        {user?.role === 'owner' ? (
          <Link
            to="/owner/listings"
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${
              isActive('/owner/listings') ? 'text-primary-600 font-semibold' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Building className={`w-5 h-5 ${isActive('/owner/listings') ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className="text-[10px] mt-0.5">Listings</span>
          </Link>
        ) : (
          <Link
            to="/student/wishlist"
            className={`relative flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${
              isActive('/student/wishlist') ? 'text-rose-600 font-semibold' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Heart className={`w-5 h-5 ${isActive('/student/wishlist') ? 'stroke-[2.5] fill-rose-50' : 'stroke-2'}`} />
            <span className="text-[10px] mt-0.5">Saved</span>
            {wishlist.length > 0 && (
              <span className="absolute top-0 right-2 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
        )}

        {/* Messages */}
        <Link
          to={user?.role === 'owner' ? '/owner/messages' : '/student/messages'}
          className={`relative flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${
            isActive(user?.role === 'owner' ? '/owner/messages' : '/student/messages')
              ? 'text-primary-600 font-semibold'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <MessageSquare
            className={`w-5 h-5 ${
              isActive(user?.role === 'owner' ? '/owner/messages' : '/student/messages')
                ? 'stroke-[2.5]'
                : 'stroke-2'
            }`}
          />
          <span className="text-[10px] mt-0.5">Chats</span>
          {unreadChats > 0 && (
            <span className="absolute top-0 right-2 w-4 h-4 bg-primary-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
              {unreadChats}
            </span>
          )}
        </Link>

        {/* Profile / Dashboard */}
        <Link
          to={
            user
              ? user.role === 'owner'
                ? '/owner/dashboard'
                : '/student/dashboard'
              : '/login'
          }
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${
            location.pathname.includes('/student') || location.pathname.includes('/owner')
              ? 'text-primary-600 font-semibold'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <User className="w-5 h-5 stroke-2" />
          <span className="text-[10px] mt-0.5">
            {user ? (user.role === 'owner' ? 'Owner' : 'Profile') : 'Log In'}
          </span>
        </Link>
      </div>
    </div>
  )
}

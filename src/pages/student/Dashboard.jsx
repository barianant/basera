import React from 'react'
import { Link } from 'react-router-dom'
import {
  Heart,
  Calendar,
  MessageSquare,
  Search,
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Bed,
  GraduationCap,
} from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatsCard from '../../components/dashboard/StatsCard'
import ListingCard from '../../components/listings/ListingCard'
import { useAuth } from '../../context/AuthContext'
import { listings } from '../../data/listings'

export default function StudentDashboard() {
  const { user, wishlist, bookings, chats } = useAuth()

  const recommendedListings = listings.slice(0, 3)
  const recentlyViewed = listings.slice(3, 7)

  return (
    <DashboardLayout
      title="Student Overview"
      subtitle={`Welcome back, ${user?.name || 'Rahul'} • ${user?.college || 'COEP Pune'}`}
    >
      <div className="space-y-8">
        {/* Welcome Pitch Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-primary-700 text-white p-6 sm:p-8 shadow-xl shadow-blue-900/10">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Campus Match Engine Active</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Good morning, {user?.name?.split(' ')[0] || 'Rahul'}! 👋
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 mt-2 leading-relaxed">
              We found <strong>5 new vacant beds</strong> within 1.2 km of{' '}
              {user?.college || 'COEP Pune'}. 2 are single occupancy with food included.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                to="/search"
                className="px-5 py-2.5 bg-white text-primary-700 font-bold text-xs rounded-xl shadow-md hover:bg-blue-50 transition-all flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search Near Campus</span>
              </Link>
              <Link
                to="/student/bookings"
                className="px-5 py-2.5 bg-blue-700/60 hover:bg-blue-700 text-white font-bold text-xs rounded-xl border border-white/20 transition-all flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>View Visits ({bookings.length})</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Stats Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatsCard
            title="Saved Beds"
            value={wishlist.length}
            change="+2 new"
            isPositive={true}
            icon={Heart}
            variant="blue"
            subtitle="Wishlisted accommodations"
          />
          <StatsCard
            title="Scheduled Visits"
            value={bookings.length}
            change="1 upcoming"
            isPositive={true}
            icon={Calendar}
            variant="green"
            subtitle="In-person room inspections"
          />
          <StatsCard
            title="Active Chats"
            value={chats.length}
            change="2 unread"
            isPositive={true}
            icon={MessageSquare}
            variant="purple"
            subtitle="Direct owner discussions"
          />
          <StatsCard
            title="Profile Trust Score"
            value="90%"
            change="Verified"
            isPositive={true}
            icon={ShieldCheck}
            variant="amber"
            subtitle="College ID validated"
          />
        </div>

        {/* Upcoming Scheduled Visit Alert Card */}
        {bookings.length > 0 && (
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-base font-bold text-gray-900">
                  Upcoming Scheduled Walkthrough
                </h3>
              </div>
              <Link
                to="/student/bookings"
                className="text-xs font-bold text-primary-600 hover:underline"
              >
                All Bookings →
              </Link>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={bookings[0].image}
                  alt={bookings[0].pgName}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-gray-900">
                      {bookings[0].pgName}
                    </h4>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                      {bookings[0].status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {bookings[0].roomType} • ₹{bookings[0].rent.toLocaleString('en-IN')}/mo
                  </p>
                  <p className="text-xs text-primary-600 font-semibold mt-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{bookings[0].date}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${bookings[0].ownerPhone}`}
                  className="px-4 py-2 bg-white hover:bg-gray-100 text-gray-800 font-bold text-xs rounded-xl border border-gray-200 transition-colors"
                >
                  Call Host
                </a>
                <Link
                  to={`/student/messages?pg=${bookings[0].pgId}`}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                >
                  Chat
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Recommended for You Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Recommended For You
              </h3>
              <p className="text-xs text-gray-500">
                Matches your preference for {user?.college || 'COEP Pune'} & budget
              </p>
            </div>
            <Link
              to="/search"
              className="text-xs font-bold text-primary-600 hover:underline flex items-center gap-1"
            >
              <span>Explore all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>

        {/* Recently Viewed */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Recently Viewed Properties
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentlyViewed.map((item) => (
              <Link
                key={item.id}
                to={`/listing/${item.id}`}
                className="bg-white rounded-2xl p-3 border border-gray-100 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="h-28 rounded-xl overflow-hidden mb-2.5 relative">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-1.5 left-1.5 text-[10px] font-bold bg-black/60 text-white px-2 py-0.5 rounded backdrop-blur-xs">
                      {item.availableBeds} Beds Free
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 group-hover:text-primary-600 truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 truncate mt-0.5">
                    {item.nearestCollege} ({item.distance})
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-gray-100 flex items-baseline justify-between">
                  <span className="text-xs font-extrabold text-gray-900">
                    ₹{item.rent.toLocaleString('en-IN')}/mo
                  </span>
                  <span className="text-[10px] text-primary-600 font-bold">
                    View →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

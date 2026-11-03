import React from 'react'
import { Link } from 'react-router-dom'
import {
  Building2,
  Bed,
  TrendingUp,
  DollarSign,
  Users,
  Eye,
  PlusCircle,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'
import OwnerDashboardLayout from '../../components/layout/OwnerDashboardLayout'
import StatsCard from '../../components/dashboard/StatsCard'
import ActivityFeed from '../../components/dashboard/ActivityFeed'
import { useAuth } from '../../context/AuthContext'

const revenueData = [
  { month: 'Jan', revenue: 165000, leads: 42 },
  { month: 'Feb', revenue: 178000, leads: 51 },
  { month: 'Mar', revenue: 195000, leads: 68 },
  { month: 'Apr', revenue: 210000, leads: 74 },
  { month: 'May', revenue: 228000, leads: 89 },
  { month: 'Jun', revenue: 246500, leads: 112 },
]

const viewsData = [
  { day: '01', views: 320 },
  { day: '05', views: 480 },
  { day: '10', views: 620 },
  { day: '15', views: 850 },
  { day: '20', views: 790 },
  { day: '25', views: 980 },
  { day: '30', views: 1247 },
]

export default function OwnerDashboard() {
  const { user } = useAuth()

  return (
    <OwnerDashboardLayout
      title="Owner Analytics & Portfolio"
      subtitle={`Welcome back, ${user?.name || 'Ramesh Sharma'} • Urban Nest PG Group`}
    >
      <div className="space-y-8">
        {/* Welcome Pitch Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Bed Demand: High</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Your listings generated 89 verified student leads this month 🚀
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Your average bed vacancy rate is 19% (industry average: 38%). Occupancy is up 12% across your 3 properties.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/owner/add-property"
              className="px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-primary-600/30 transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List New Room / PG</span>
            </Link>
            <Link
              to="/owner/listings"
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-all"
            >
              Manage 3 Listings
            </Link>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatsCard
            title="Total Properties"
            value="3 Active"
            change="+1 new"
            isPositive={true}
            icon={Building2}
            variant="blue"
            subtitle="Mumbai & Pune campuses"
          />
          <StatsCard
            title="Bed Occupancy"
            value="29 / 36"
            change="81% Full"
            isPositive={true}
            icon={Bed}
            variant="green"
            subtitle="7 vacant beds remaining"
          />
          <StatsCard
            title="Monthly Revenue"
            value="₹2,46,500"
            change="+18.4%"
            isPositive={true}
            icon={DollarSign}
            variant="amber"
            subtitle="Projected this month"
          />
          <StatsCard
            title="Student Inquiries"
            value="89 Leads"
            change="+24% vs last mo"
            isPositive={true}
            icon={Users}
            variant="purple"
            subtitle="Direct in-app messages"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Revenue Bar Chart (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Monthly Rental Revenue Growth (₹)
                </h3>
                <p className="text-xs text-gray-400">
                  Last 6 months verified rental collection
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                +49% H1 Growth
              </span>
            </div>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={(val) => `₹${val / 1000}k`}
                  />
                  <Tooltip
                    formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Rental Income']}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
                  />
                  <Bar dataKey="revenue" fill="#2563EB" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Student Impressions Area Chart (5 Cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Student Listing Views (30 Days)
                </h3>
                <p className="text-xs text-gray-400">
                  1,247 campus student visits
                </p>
              </div>
              <span className="text-xs font-bold text-primary-600 bg-blue-50 px-2.5 py-1 rounded-full">
                1.2k Views
              </span>
            </div>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={viewsData}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#4F46E5"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorViews)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Activity & Quick Action Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <ActivityFeed
              title="Recent Student Inquiries & Tenant Activity"
            />
          </div>

          {/* Bed Occupancy Quick Action Card */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-gray-900">
              Live Property Occupancy
            </h3>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-gray-100">
                <div className="flex justify-between font-bold text-gray-900 mb-1">
                  <span>Urban Nest PG (Mumbai)</span>
                  <span className="text-primary-600">9 / 12 Beds</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary-600 h-full rounded-full" style={{ width: '75%' }} />
                </div>
                <span className="text-[10px] text-gray-400 mt-1 block">3 single beds vacant</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-gray-100">
                <div className="flex justify-between font-bold text-gray-900 mb-1">
                  <span>Comfort Stay PG (Pune)</span>
                  <span className="text-emerald-600">11 / 14 Beds</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '78%' }} />
                </div>
                <span className="text-[10px] text-gray-400 mt-1 block">3 double sharing beds vacant</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-gray-100">
                <div className="flex justify-between font-bold text-gray-900 mb-1">
                  <span>BlueSky Residency (Mumbai)</span>
                  <span className="text-indigo-600">9 / 10 Beds</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: '90%' }} />
                </div>
                <span className="text-[10px] text-gray-400 mt-1 block">1 single bed vacant</span>
              </div>
            </div>

            <Link
              to="/owner/listings"
              className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Update Bed Availability</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </OwnerDashboardLayout>
  )
}

import React, { useState } from 'react'
import {
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Save,
  CreditCard,
  AlertCircle,
} from 'lucide-react'
import OwnerDashboardLayout from '../../components/layout/OwnerDashboardLayout'
import Avatar from '../../components/common/Avatar'
import { useAuth } from '../../context/AuthContext'
import notify from '../../components/common/Toast'

export default function OwnerProfile() {
  const { user, setUser } = useAuth()

  const [businessName, setBusinessName] = useState(
    user?.businessName || 'Urban Nest & Comfort Stays Group'
  )
  const [name, setName] = useState(user?.name || 'Ramesh Sharma')
  const [email, setEmail] = useState(user?.email || 'ramesh.sharma@urbannest.in')
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210')
  const [city, setCity] = useState(user?.city || 'Mumbai')
  const [upiId, setUpiId] = useState('ramesh.sharma@okaxis')

  const handleSave = (e) => {
    e.preventDefault()
    setUser((prev) => ({
      ...prev,
      businessName,
      name,
      email,
      phone,
      city,
    }))
    notify.success('Business profile updated!')
  }

  return (
    <OwnerDashboardLayout
      title="Host Business Profile & KYC"
      subtitle="Manage your registered entity, Aadhaar verification, and direct payout setup"
    >
      <div className="max-w-4xl space-y-8">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-6">
          <Avatar
            src={user?.avatar}
            name={name}
            size="2xl"
            online={true}
            verified={true}
          />

          <div className="text-center sm:text-left flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
              <h2 className="text-xl font-bold text-gray-900">{businessName}</h2>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified PG Host</span>
              </span>
            </div>
            <p className="text-xs text-primary-600 font-semibold mt-1">
              Managed by {name} • {city} Campuses
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              3 Verified Properties • 4.9 ★ Rating (127 Reviews)
            </p>
          </div>
        </div>

        {/* KYC Verification Checklist */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-100">
            Host Verification & Safety Badges
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-gray-900">Aadhaar & PAN Verification</p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Identity matched against government database
                </p>
              </div>
            </div>

            <div className="p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-gray-900">Property Deed / Electricity Bill</p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Physical premise ownership validated
                </p>
              </div>
            </div>

            <div className="p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-gray-900">Bank Account & UPI Payout</p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Instant settlement connected for token deposits
                </p>
              </div>
            </div>

            <div className="p-4 bg-blue-50/60 border border-blue-200/80 rounded-2xl flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-gray-900">Local Police Tenant Intimation</p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Automated police intimation form generator ready
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Business Settings Form */}
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
            Business Contact Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Property / Business Brand Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Owner / Authorized Manager Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Official Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Direct Contact Phone (Visible to Students)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>

          <h3 className="text-base font-bold text-gray-900 pt-4 pb-3 border-b border-gray-100">
            Payout Settlement Setup
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                UPI ID for Token Deposits
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Operating City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Update Business Profile</span>
            </button>
          </div>
        </form>
      </div>
    </OwnerDashboardLayout>
  )
}

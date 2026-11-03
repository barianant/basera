import React, { useState } from 'react'
import {
  User,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Calendar,
  IndianRupee,
  ShieldCheck,
  CheckCircle2,
  Save,
  Camera,
} from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Avatar from '../../components/common/Avatar'
import { useAuth } from '../../context/AuthContext'
import { colleges } from '../../data/colleges'
import notify from '../../components/common/Toast'

export default function StudentProfile() {
  const { user, setUser } = useAuth()

  const [name, setName] = useState(user?.name || 'Rahul Verma')
  const [email, setEmail] = useState(user?.email || 'rahul.verma@coep.ac.in')
  const [phone, setPhone] = useState(user?.phone || '+91 98234 56789')
  const [college, setCollege] = useState(user?.college || 'College of Engineering Pune (COEP)')
  const [course, setCourse] = useState(user?.course || 'B.Tech Computer Engineering (3rd Year)')
  const [budget, setBudget] = useState(user?.budget || '₹6,000 - ₹10,000')
  const [preferredArea, setPreferredArea] = useState(user?.preferredArea || 'Shivajinagar, Pune')
  const [gender, setGender] = useState(user?.gender || 'Male')

  const handleSave = (e) => {
    e.preventDefault()
    setUser((prev) => ({
      ...prev,
      name,
      email,
      phone,
      college,
      course,
      budget,
      preferredArea,
      gender,
    }))
    notify.success('Student profile & housing preferences updated!')
  }

  return (
    <DashboardLayout
      title="My Student Profile"
      subtitle="Manage your identity, college verification, and room match criteria"
    >
      <div className="max-w-4xl space-y-8">
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <Avatar
              src={user?.avatar}
              name={name}
              size="2xl"
              online={true}
              verified={true}
            />
            <button
              onClick={() => notify.info('Avatar photo update simulation')}
              className="absolute bottom-0 right-0 p-2 bg-primary-600 text-white rounded-full shadow-md hover:bg-primary-700 transition-colors cursor-pointer"
              title="Change Photo"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center sm:text-left flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
              <h2 className="text-xl font-bold text-gray-900">{name}</h2>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Student</span>
              </span>
            </div>
            <p className="text-xs text-primary-600 font-semibold mt-1">
              {college}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{course}</p>
          </div>
        </div>

        {/* Verification Status Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Email Address</p>
              <p className="text-[11px] text-emerald-600 font-medium">Verified (.ac.in)</p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">WhatsApp Mobile</p>
              <p className="text-[11px] text-emerald-600 font-medium">OTP Verified</p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">College ID Card</p>
              <p className="text-[11px] text-emerald-600 font-medium">Valid Till 2026</p>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
            Personal & Academic Info
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Full Name
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
                College Email
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
                Contact Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Institute / University
              </label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>

          <h3 className="text-base font-bold text-gray-900 pt-4 pb-3 border-b border-gray-100">
            Housing & Accommodation Preferences
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Monthly Budget
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary-500"
              >
                <option value="₹4,000 - ₹6,000">₹4,000 - ₹6,000</option>
                <option value="₹6,000 - ₹10,000">₹6,000 - ₹10,000 (Recommended)</option>
                <option value="₹10,000 - ₹15,000">₹10,000 - ₹15,000</option>
                <option value="₹15,000+">₹15,000+</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Preferred Area / Suburb
              </label>
              <input
                type="text"
                value={preferredArea}
                onChange={(e) => setPreferredArea(e.target.value)}
                placeholder="e.g. Matunga, Shivajinagar, Jalgaon City"
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
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}

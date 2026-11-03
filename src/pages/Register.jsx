import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Home,
  Mail,
  Lock,
  User,
  GraduationCap,
  Building,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { colleges } from '../data/colleges'
import notify from '../components/common/Toast'

export default function Register() {
  const navigate = useNavigate()
  const { loginAs, setUser } = useAuth()

  const [role, setRole] = useState('student') // 'student' | 'owner'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [college, setCollege] = useState('COEP Pune')
  const [city, setCity] = useState('Pune')
  const [businessName, setBusinessName] = useState('')

  const handleRegister = (e) => {
    e.preventDefault()
    if (!name || !email) {
      notify.error('Please fill in required fields')
      return
    }

    if (role === 'owner') {
      const newOwner = {
        id: `owner_${Date.now()}`,
        name,
        businessName: businessName || `${name}'s Residency`,
        email,
        phone: phone || '+91 98765 00000',
        role: 'owner',
        city,
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        activeListingsCount: 1,
        totalBedsManaged: 12,
        occupiedBeds: 8,
      }
      setUser(newOwner)
      notify.success('Account created! Welcome to BASERA Owner Suite.')
      navigate('/owner/dashboard')
    } else {
      const newStudent = {
        id: `student_${Date.now()}`,
        name,
        email,
        phone: phone || '+91 98000 12345',
        role: 'student',
        college,
        course: 'B.Tech / Degree Student',
        city,
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400',
        verified: true,
      }
      setUser(newStudent)
      notify.success('Account created! Happy room hunting.')
      navigate('/student/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-lg text-center mb-6">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Home className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-2xl font-black text-gray-900 tracking-tight">
            BASERA
          </span>
        </Link>
        <h2 className="mt-4 text-2xl font-black text-gray-900 tracking-tight">
          Create Your Free Account
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Join India's dedicated student bed discovery & PG management network
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-6 shadow-xl shadow-blue-900/5 sm:rounded-3xl sm:px-10 border border-gray-100">
          {/* Role Picker Big Cards */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                role === 'student'
                  ? 'border-primary-600 bg-blue-50/70 shadow-xs'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-primary-600 flex items-center justify-center mb-2">
                <GraduationCap className="w-5 h-5" />
              </div>
              <p className="font-bold text-sm text-gray-900">I am a Student</p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Find available beds near campus
              </p>
            </button>

            <button
              type="button"
              onClick={() => setRole('owner')}
              className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                role === 'owner'
                  ? 'border-primary-600 bg-blue-50/70 shadow-xs'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-2">
                <Building className="w-5 h-5" />
              </div>
              <p className="font-bold text-sm text-gray-900">I am a PG Owner</p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                List vacant beds & get tenant leads
              </p>
            </button>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={role === 'owner' ? 'e.g. Ramesh Sharma' : 'e.g. Priya Sharma'}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>

            {role === 'owner' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  PG / Hostel Business Name
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Urban Nest Residency Group"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>
            )}

            {role === 'student' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Your College / Institute
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-primary-500 cursor-pointer"
                  >
                    {colleges.map((col) => (
                      <option key={col.id} value={col.short}>
                        {col.short} ({col.city})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@mail.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Phone (WhatsApp)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Create Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>

            <p className="text-[11px] text-gray-500 leading-relaxed pt-1">
              By clicking "Register Account", you accept BASERA's Terms of Service and Privacy Policy. Zero broker spam guaranteed.
            </p>

            <button
              type="submit"
              className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-primary-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <span>Register Account as {role === 'owner' ? 'PG Owner' : 'Student'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-primary-600 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Home,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  GraduationCap,
  Building,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import notify from '../components/common/Toast'

export default function Login() {
  const navigate = useNavigate()
  const { loginAs, DEMO_STUDENT, DEMO_OWNER } = useAuth()

  const [role, setRole] = useState('student') // 'student' | 'owner'
  const [email, setEmail] = useState('rahul.verma@coep.ac.in')
  const [password, setPassword] = useState('••••••••')
  const [rememberMe, setRememberMe] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    loginAs(role)
    notify.success(`Welcome back, ${role === 'owner' ? 'Ramesh' : 'Rahul'}!`)
    navigate(role === 'owner' ? '/owner/dashboard' : '/student/dashboard')
  }

  const handleQuickDemo = (selectedRole) => {
    loginAs(selectedRole)
    notify.success(`Logged in as Demo ${selectedRole === 'owner' ? 'PG Owner' : 'Student'}!`)
    navigate(selectedRole === 'owner' ? '/owner/dashboard' : '/student/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Home className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-2xl font-black text-gray-900 tracking-tight">
            BASERA
          </span>
        </Link>
        <h2 className="mt-4 text-2xl font-black text-gray-900 tracking-tight">
          Welcome back 👋
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Sign in to access your saved beds, visits, or manage your PG property
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl shadow-blue-900/5 sm:rounded-3xl sm:px-10 border border-gray-100">
          {/* Quick Demo Fill Buttons for Judges / Evaluators */}
          <div className="mb-6 p-3 bg-gradient-to-r from-blue-50 to-indigo-50/70 border border-blue-200/60 rounded-2xl">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-primary-700 mb-2">
              ⚡ Hackathon Evaluator 1-Click Access
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('student')}
                className="py-2 px-3 bg-white hover:bg-blue-600 hover:text-white text-gray-800 text-xs font-bold rounded-xl border border-blue-200 shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Student Demo</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('owner')}
                className="py-2 px-3 bg-white hover:bg-slate-900 hover:text-white text-gray-800 text-xs font-bold rounded-xl border border-blue-200 shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Building className="w-3.5 h-3.5" />
                <span>Owner Demo</span>
              </button>
            </div>
          </div>

          {/* User Type Segmented Radio Tabs */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-gray-100 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => {
                setRole('student')
                setEmail('rahul.verma@coep.ac.in')
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                role === 'student'
                  ? 'bg-white text-primary-600 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setRole('owner')
                setEmail('ramesh.sharma@urbannest.in')
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                role === 'owner'
                  ? 'bg-white text-primary-600 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>PG Owner</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                {role === 'owner' ? 'Business or Owner Email' : 'Student / College Email'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Password
                </label>
                <a href="#forgot" className="text-xs font-semibold text-primary-600 hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
                <span>Keep me signed in</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-primary-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <span>Sign In as {role === 'owner' ? 'PG Owner' : 'Student'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social Sign In Mock */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-gray-400 font-medium">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleQuickDemo(role)}
              className="mt-4 w-full py-2.5 px-4 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-primary-600 hover:underline">
              Register Free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

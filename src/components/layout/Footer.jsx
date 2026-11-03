import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Home,
  Mail,
  Heart,
  Shield,
  Send,
  CheckCircle,
  MapPin,
  Phone,
  Globe,
} from 'lucide-react'
import notify from '../common/Toast'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      notify.error('Please enter a valid email address')
      return
    }
    setSubscribed(true)
    notify.success('Subscribed! You will get instant alerts for newly vacant beds.')
    setEmail('')
  }

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-12 border-t-4 border-primary-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Highlight Banner */}
        <div className="bg-gray-800/80 rounded-3xl p-8 mb-16 border border-gray-700/60 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-primary-400 font-semibold text-xs tracking-wider uppercase">
              Bed Vacancy Alert System
            </span>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Get notified the second a bed opens near your campus
            </h3>
            <p className="text-sm text-gray-400 max-w-xl">
              Never miss a single occupancy or double-sharing room in prime student zones.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full lg:w-auto gap-2">
            <div className="relative flex-1 lg:w-80">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter college email (e.g. rahul@vjti.ac.in)"
                className="w-full pl-11 pr-4 py-3 bg-gray-900/90 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-primary-500 placeholder-gray-500"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 shadow-lg shadow-primary-600/30"
            >
              {subscribed ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Send className="w-4 h-4" />}
              <span>{subscribed ? 'Subscribed' : 'Notify Me'}</span>
            </button>
          </form>
        </div>

        {/* 4 Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Home className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                BASERA
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              India's modern student accommodation discovery engine. Solving the real student struggle: finding actual available beds, verified owners, and transparent rents without broker commissions.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#twitter"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-primary-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#instagram"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-rose-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#linkedin"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Students */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              For Students
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/search" className="hover:text-white transition-colors">
                  Search Available Beds
                </Link>
              </li>
              <li>
                <Link to="/student/wishlist" className="hover:text-white transition-colors">
                  Saved PGs & Hostels
                </Link>
              </li>
              <li>
                <Link to="/student/bookings" className="hover:text-white transition-colors">
                  Schedule Free PG Visit
                </Link>
              </li>
              <li>
                <Link to="/student/dashboard" className="hover:text-white transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-white transition-colors">
                  Safety & Zero Scam Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Owners */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              For PG Owners
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/owner/add-property" className="hover:text-white transition-colors">
                  List Your PG Free
                </Link>
              </li>
              <li>
                <Link to="/owner/dashboard" className="hover:text-white transition-colors">
                  Owner Portal & Analytics
                </Link>
              </li>
              <li>
                <Link to="/owner/listings" className="hover:text-white transition-colors">
                  Manage Bed Vacancies
                </Link>
              </li>
              <li>
                <Link to="/owner/messages" className="hover:text-white transition-colors">
                  Direct Student Inquiries
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-white transition-colors">
                  Owner Verification FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust & Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company & Trust
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About BASERA
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} BASERA Technologies Pvt. Ltd. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Indian college students 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  )
}

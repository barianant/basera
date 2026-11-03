import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Search, Bed, ArrowRight } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import MobileNav from '../components/layout/MobileNav'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-6">
          <div className="relative inline-block">
            <span className="text-8xl font-black text-gray-200 select-none">404</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-primary-600 flex items-center justify-center shadow-lg">
                <Bed className="w-8 h-8" />
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              Oops! Bed Not Found
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
              The page or PG listing you are looking for might have been moved, renamed, or is currently fully occupied.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <Link
              to="/search"
              className="px-6 py-3 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 text-primary-600" />
              <span>Explore Available Beds</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  )
}

import React from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import MobileNav from '../components/layout/MobileNav'

export default function Terms() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-100 shadow-sm space-y-6">
          <div>
            <span className="text-primary-600 text-xs font-bold uppercase tracking-wider">
              Legal Agreement
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
              Terms of Service
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Effective Date: November 2024 • BASERA Platform Guidelines
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
            <h3 className="text-base font-bold text-gray-900">1. Zero Brokerage Marketplace</h3>
            <p>
              BASERA acts solely as an accommodation discovery and bed vacancy tracking engine between verified property owners and college students. No agent commissions or brokerage charges are levied on students.
            </p>

            <h3 className="text-base font-bold text-gray-900">2. Real-Time Bed Accuracy</h3>
            <p>
              Property owners agree to maintain truthful, real-time records of available beds. Any landlord found falsifying vacancies or bait-and-switching students faces immediate suspension from the BASERA verified directory.
            </p>

            <h3 className="text-base font-bold text-gray-900">3. Physical Inspection Policy</h3>
            <p>
              All walk-through visit appointments scheduled via BASERA are 100% free of charge. Students are advised to never transfer security deposits or advance rent without physically inspecting the premises and verifying the written rent agreement.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  )
}

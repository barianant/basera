import React from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import MobileNav from '../components/layout/MobileNav'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-100 shadow-sm space-y-6">
          <div>
            <span className="text-primary-600 text-xs font-bold uppercase tracking-wider">
              Legal & Compliance
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
              Privacy Policy
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Last Updated: November 2024 • BASERA Technologies Pvt. Ltd.
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
            <h3 className="text-base font-bold text-gray-900">1. Information We Collect</h3>
            <p>
              When registering as a Student or PG Owner on BASERA, we collect your name, official college email, mobile number, campus identification details, and property ownership documentation where applicable.
            </p>

            <h3 className="text-base font-bold text-gray-900">2. Privacy-First Student Messaging</h3>
            <p>
              Unlike traditional classifieds that publish student phone numbers publicly, BASERA uses encrypted in-app messaging. Your phone number is never shared with PG owners or third parties without your explicit confirmation when scheduling a physical visit.
            </p>

            <h3 className="text-base font-bold text-gray-900">3. Zero Data Brokerage</h3>
            <p>
              We do not sell student contact lists to third-party telemarketers, coaching institutes, or loan brokers. Your data is strictly used to match you with verified campus accommodations.
            </p>

            <h3 className="text-base font-bold text-gray-900">4. Location & Geospatial Data</h3>
            <p>
              We calculate walking and cycling isochrones between student accommodations and college main gates using privacy-preserving distance APIs.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  )
}

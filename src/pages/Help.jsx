import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  HelpCircle,
  ShieldCheck,
  CreditCard,
  Building,
  Bed,
  Phone,
  ChevronDown,
  Plus,
  Minus,
  Sparkles,
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import MobileNav from '../components/layout/MobileNav'
import { faqs } from '../data/listings'

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('')
  const [openIndex, setOpenIndex] = useState(0)

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Help Hero */}
        <section className="py-14 bg-gradient-to-b from-blue-50/70 to-slate-50 text-center border-b border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-primary-600 text-xs font-bold uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-blue-200">
              Support & Knowledge Base
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-3">
              How can we help you today?
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Everything you need to know about finding beds, booking visits, and verified safety
            </p>

            <div className="relative max-w-xl mx-auto mt-6">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search keywords (e.g. deposit, refund, safety, Wi-Fi, food)..."
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm font-semibold shadow-md shadow-blue-900/5 focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>
        </section>

        {/* Categories Strip */}
        <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary-600 mx-auto flex items-center justify-center">
                <Bed className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-gray-900">Finding Vacant Beds</h4>
              <p className="text-xs text-gray-500">Live filters, college radius, and single/sharing</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-gray-900">Safety & KYC</h4>
              <p className="text-xs text-gray-500">Physical premise audits and Aadhaar verification</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-gray-900">Deposit & Pricing</h4>
              <p className="text-xs text-gray-500">Standard refundable deposits & zero broker cut</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 mx-auto flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-gray-900">For PG Owners</h4>
              <p className="text-xs text-gray-500">Managing bed vacancies, tenant leads, and rent</p>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto space-y-3">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
              Frequently Asked Questions
            </h3>

            {filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-gray-900 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="p-1 rounded-lg bg-gray-100 text-gray-600 shrink-0">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs sm:text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Need More Help Box */}
          <div className="mt-16 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center max-w-2xl mx-auto space-y-3">
            <h4 className="text-lg font-bold text-gray-900">
              Still Have Questions?
            </h4>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Our student housing advisors are available daily to answer questions about specific campuses or landlords.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs rounded-xl shadow-xs inline-flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                <span>Contact Student Support</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileNav />
    </div>
  )
}

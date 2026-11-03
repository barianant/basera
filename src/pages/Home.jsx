import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Bed,
  ShieldCheck,
  Zap,
  MapPin,
  MessageSquare,
  Sparkles,
  ChevronRight,
  Star,
  CheckCircle2,
  Users,
  Building,
  ArrowRight,
  Plus,
  Minus,
  Search,
  Award,
  Clock,
  Heart,
  Phone,
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import MobileNav from '../components/layout/MobileNav'
import SearchBar from '../components/listings/SearchBar'
import ListingCard from '../components/listings/ListingCard'
import { listings, testimonials, faqs } from '../data/listings'
import { colleges } from '../data/colleges'
import Badge from '../components/common/Badge'

export default function Home() {
  const navigate = useNavigate()
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  const featuredListings = listings.slice(0, 6)

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-blue-50/70 via-indigo-50/40 to-slate-50">
          {/* Subtle Ambient Light Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-blue-400/15 to-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
              {/* Top Tagline Pill */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-blue-200/80 shadow-xs mb-6 backdrop-blur-xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-gray-800 tracking-wide">
                  Real-time Bed Availability Engine
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-xs font-medium text-primary-600">
                  Zero Brokerage
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tight leading-[1.15]"
              >
                Find Beds.{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                  Not Problems.
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-xl text-gray-600 mt-4 leading-relaxed font-normal"
              >
                Students don't search for rooms. Students search for{' '}
                <strong className="text-gray-900 font-bold">AVAILABLE BEDS</strong>.
                Discover verified PGs & hostels near your campus with guaranteed real-time vacancies.
              </motion.p>

              {/* Dual Hero CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex flex-wrap items-center justify-center gap-3 mt-6 sm:mt-8"
              >
                <Link
                  to="/search"
                  className="px-6 py-3.5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-600/35 transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Find Available Beds</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/owner/add-property"
                  className="px-6 py-3.5 rounded-2xl bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm border border-gray-200/80 shadow-xs hover:border-gray-300 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Building className="w-4 h-4 text-primary-600" />
                  <span>List Your PG Free</span>
                </Link>
              </motion.div>
            </div>

            {/* Smart Search Bar Component */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 mb-12"
            >
              <SearchBar />
            </motion.div>

            {/* Trusted By Top Colleges Carousel / Bar */}
            <div className="pt-6 border-t border-gray-200/60 max-w-5xl mx-auto">
              <p className="text-center text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                Trusted by 50,000+ Students Across Top Maharashtra & National Institutes
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {colleges.map((col) => (
                  <Link
                    key={col.id}
                    to={`/search?college=${encodeURIComponent(col.short)}`}
                    className="px-3.5 py-1.5 bg-white/80 hover:bg-white text-gray-700 hover:text-primary-600 text-xs font-semibold rounded-full border border-gray-200/70 shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                    <span>{col.short}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= STATS COUNTER STRIP ================= */}
        <section className="py-10 bg-white border-y border-gray-100 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                  10,000+
                </p>
                <p className="text-xs sm:text-sm font-semibold text-gray-500 mt-1">
                  Beds Tracked in Real-Time
                </p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-black text-primary-600 tracking-tight">
                  500+
                </p>
                <p className="text-xs sm:text-sm font-semibold text-gray-500 mt-1">
                  Physically Verified PGs
                </p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                  ₹0
                </p>
                <p className="text-xs sm:text-sm font-semibold text-gray-500 mt-1">
                  Brokerage & Hidden Fees
                </p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-black text-emerald-600 tracking-tight">
                  4.8 ★
                </p>
                <p className="text-xs sm:text-sm font-semibold text-gray-500 mt-1">
                  Average Student Rating
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= HOW BASERA WORKS ================= */}
        <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary-600 text-xs font-bold uppercase tracking-wider">
                Simple 3-Step Discovery
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-2">
                How BASERA Solves Student Housing
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-3">
                No endless phone calls asking "Bhaiya koi room khali hai kya?". We show exact bed vacancies live.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary-600 flex items-center justify-center font-black text-lg mb-6 ring-4 ring-blue-50/50">
                  01
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Search by Campus & Bed
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Type your college (e.g. VJTI or COEP). Filter by exact available beds, single vs. sharing, budget, and walking distance.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-lg mb-6 ring-4 ring-indigo-50/50">
                  02
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Direct In-App Chat & Call
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Connect straight with physically verified owners. Ask about mess menus, gate curfews, and book a room walkthrough with 1 tap.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-lg mb-6 ring-4 ring-emerald-50/50">
                  03
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Move In With Peace of Mind
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Lock your bed at 100% verified rates. No broker cut, verified deposit terms, and complete tenant safety backing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= WHY BASERA / PRODUCT FEATURES ================= */}
        <section className="py-16 sm:py-24 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary-600 text-xs font-bold uppercase tracking-wider">
                Startup Innovation
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-2">
                Why Top Campuses Choose BASERA
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-3">
                Engineered specifically for India's 40M+ college students struggling with accommodation chaos every semester.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-gray-100 hover:border-blue-200 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-primary-600 flex items-center justify-center mb-4">
                  <Bed className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-1.5">
                  Bed-Level Real-Time Inventory
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Unlike generic rental portals with stale 6-month-old listings, BASERA tracks individual bed vacancies updated daily by owners.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-gray-100 hover:border-emerald-200 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-1.5">
                  100% Verified Owners & Leases
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Every listed property undergoes physical premise verification, Aadhaar/PAN validation, and standard fair-deposit agreements.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-gray-100 hover:border-indigo-200 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-1.5">
                  OLX-Style Instant Messaging
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Direct privacy-first communication. No need to hand out your personal WhatsApp to random agents until you schedule a visit.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-gray-100 hover:border-amber-200 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-1.5">
                  Campus Proximity Radius
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Accurate walking and bicycling distances from your lecture halls, library, and campus gate so you save hours commuting.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-gray-100 hover:border-purple-200 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-1.5">
                  Vacancy Push Alerts
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Looking for a high-demand single room? Get notified via email or app the instant a senior vacates a bed.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-gray-100 hover:border-rose-200 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-1.5">
                  Zero Brokerage Guarantee
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  We are strictly a direct discovery marketplace. Students save an average of ₹8,000 to ₹15,000 on agent commissions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= POPULAR / FEATURED LISTINGS ================= */}
        <section className="py-16 sm:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-primary-600 text-xs font-bold uppercase tracking-wider">
                  Trending Accommodations
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
                  Popular PGs with Beds Available Today
                </h2>
              </div>
              <Link
                to="/search"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-600 hover:text-primary-700"
              >
                <span>View All 24+ Listings</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/search"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 hover:bg-black text-white text-sm font-bold rounded-2xl shadow-lg transition-all"
              >
                <Search className="w-4 h-4" />
                <span>Search All Available Beds Near You</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section className="py-16 sm:py-24 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary-600 text-xs font-bold uppercase tracking-wider">
                Student Stories
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-2">
                Loved by Students & PG Owners Alike
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-3">
                Real feedback from engineers, medical students, and property hosts across India.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 p-6 rounded-3xl border border-gray-100 flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <div className="flex items-center gap-1 text-amber-400 mb-3">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 italic leading-relaxed mb-6">
                      "{item.text}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200/60">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-10 h-10 rounded-full bg-blue-100 ring-2 ring-primary-500/20"
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.college}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section className="py-16 sm:py-24 bg-slate-50 border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-primary-600 text-xs font-bold uppercase tracking-wider">
                Got Questions?
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-2">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs transition-all"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-gray-900 cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <span className="p-1 rounded-lg bg-gray-100 text-gray-600 shrink-0">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-2">
                        {faq.a}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA BANNER ================= */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-primary-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block backdrop-blur-xs">
              Join 50,000+ Happy Students
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight mt-2">
              Ready to find your next home near college?
            </h2>
            <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
              Book a free visit in 30 seconds. No broker calls. 100% verified bed vacancies.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Link
                to="/search"
                className="px-8 py-4 bg-white text-primary-700 hover:bg-blue-50 font-extrabold text-sm rounded-2xl shadow-xl transition-all hover:scale-105"
              >
                Find Available Beds Now
              </Link>
              <Link
                to="/owner/add-property"
                className="px-8 py-4 bg-blue-700/60 hover:bg-blue-700 text-white font-extrabold text-sm rounded-2xl border border-white/30 backdrop-blur-xs transition-all"
              >
                List Your Property
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

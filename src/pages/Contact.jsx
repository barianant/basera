import React, { useState } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  Building,
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import MobileNav from '../components/layout/MobileNav'
import notify from '../components/common/Toast'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !message) {
      notify.error('Please complete all form fields')
      return
    }
    setSubmitted(true)
    notify.success('Message sent! Our student support team will reply within 2 hours.')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-primary-600 text-xs font-bold uppercase tracking-wider">
            We are here to help
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-2">
            Get in Touch with BASERA
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            Questions about booking a bed walkthrough or listing your property? Connect with us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-gray-900">
                Direct Support Channels
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-primary-600 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase block">
                      Student Helpline (Toll-Free)
                    </span>
                    <a href="tel:+911800267372" className="text-sm font-bold text-gray-900 hover:text-primary-600">
                      1800-BASERA (1800-227-372)
                    </a>
                    <span className="text-gray-400 block mt-0.5">Mon–Sat, 9:00 AM – 8:00 PM IST</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase block">
                      Support Email
                    </span>
                    <a href="mailto:support@basera.in" className="text-sm font-bold text-gray-900 hover:text-primary-600">
                      support@basera.in
                    </a>
                    <span className="text-gray-400 block mt-0.5">Response within 2 hours</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase block">
                      Headquarters
                    </span>
                    <p className="text-sm font-bold text-gray-900">
                      BASERA Technologies Pvt. Ltd.
                    </p>
                    <p className="text-gray-500 mt-0.5">
                      BKC Innovation Hub, Bandra East, Mumbai, Maharashtra 400051
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Hubs */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-3">
              <h4 className="text-sm font-bold text-gray-900">
                Active Campus Operations Hubs
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  <span className="font-bold text-gray-900">📍 Mumbai Hub</span>
                  <p className="text-gray-400 text-[10px]">Matunga / Dadar / Powai</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  <span className="font-bold text-gray-900">📍 Pune Hub</span>
                  <p className="text-gray-400 text-[10px]">Shivajinagar / Kothrud</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  <span className="font-bold text-gray-900">📍 Jalgaon Hub</span>
                  <p className="text-gray-400 text-[10px]">NH6 / GCE Campus Zone</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  <span className="font-bold text-gray-900">📍 Nagpur Hub</span>
                  <p className="text-gray-400 text-[10px]">South Ambazari / VNIT</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Send Us a Direct Message
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Our campus relations team helps students with specific room requirements.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Thank you, {name}. A member of our support team will contact you at {email}.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Verma"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    How Can We Help?
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Let us know your college, preferred move-in date, or property question..."
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm leading-relaxed focus:outline-none focus:border-primary-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to BASERA</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  )
}

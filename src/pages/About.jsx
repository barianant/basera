import React from 'react'
import { Link } from 'react-router-dom'
import {
  Home,
  ShieldCheck,
  Bed,
  Users,
  Target,
  Award,
  Sparkles,
  ArrowRight,
  Heart,
  GraduationCap,
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import MobileNav from '../components/layout/MobileNav'

const team = [
  {
    name: 'Anant Patil',
    role: 'Founder & CEO',
    college: 'GCE Jalgaon / Tech Alumni',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    bio: 'Experienced first-hand the torture of searching for a single bed during college admissions.',
  },
  {
    name: 'Siddharth Rao',
    role: 'Co-founder & CTO',
    college: 'COEP Pune',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    bio: 'Ex-Google engineer building scalable geospatial inventory algorithms for real-time bed tracking.',
  },
  {
    name: 'Tanvi Deshmukh',
    role: 'Head of Product & Design',
    college: 'VJTI Mumbai',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    bio: 'Passionate about craft, micro-interactions, and student safety.',
  },
  {
    name: 'Vikram Joshi',
    role: 'Head of Host Operations',
    college: 'VNIT Nagpur',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    bio: 'Leading on-ground physical premise verification across 500+ student accommodations.',
  },
]

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-slate-50 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-primary-600 text-xs font-bold uppercase tracking-wider bg-white px-3.5 py-1.5 rounded-full border border-blue-200 shadow-2xs">
              The BASERA Origin Story
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight mt-4 leading-tight">
              Building India's Modern{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Student Accommodation Network
              </span>
            </h1>
            <p className="text-sm sm:text-lg text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
              We started with a fundamental realization that traditional real estate portals completely missed:
            </p>
            <div className="mt-6 p-6 bg-white rounded-3xl border border-blue-100 shadow-md max-w-xl mx-auto">
              <p className="text-xl font-black text-gray-900 tracking-tight">
                "Students don't search for rooms. Students search for AVAILABLE BEDS."
              </p>
            </div>
          </div>
        </section>

        {/* The Problem & Our Mission */}
        <section className="py-16 bg-white border-y border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-primary-600 text-xs font-bold uppercase tracking-wider">
                  The Problem in India
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-2">
                  40 Million Students. 0 Real-time Vacancy Systems.
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-3">
                  Every year during admission season across Mumbai, Pune, Jalgaon, and Nagpur, thousands of students walk streets in 38°C heat, calling to-let numbers painted on walls, dealing with extortionate brokers, and getting scammed with non-refundable deposits.
                </p>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2">
                  BASERA replaces this chaos with verified bed-level discovery, direct owner chat, and zero brokerage fees.
                </p>
              </div>

              <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-gray-200/80 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-primary-600 flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Bed-Level Granularity</h4>
                    <p className="text-xs text-gray-500">Know exact occupancy per room before stepping out</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Zero Middlemen Guarantee</h4>
                    <p className="text-xs text-gray-500">Direct connection with vetted hosts saving ₹8k-₹15k</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Campus-Radius Match</h4>
                    <p className="text-xs text-gray-500">Walk times mapped directly to lecture hall gates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16 sm:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary-600 text-xs font-bold uppercase tracking-wider">
                Our Team
              </span>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight mt-2">
                Built by Students, for Students
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex flex-col items-center text-center group hover:shadow-md transition-shadow"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-2xl object-cover mb-4 ring-4 ring-blue-50 group-hover:scale-105 transition-transform"
                  />
                  <h4 className="font-bold text-base text-gray-900">{member.name}</h4>
                  <p className="text-xs font-bold text-primary-600">{member.role}</p>
                  <span className="text-[11px] text-gray-400 font-medium mt-0.5">
                    {member.college}
                  </span>
                  <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Milestone Timeline */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">
              The Journey So Far
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 bg-slate-50 rounded-2xl border border-gray-100">
                <span className="text-2xl font-black text-primary-600">2023</span>
                <p className="text-xs font-bold text-gray-800 mt-1">Prototype Launched</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Piloted at COEP & VJTI</p>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl border border-gray-100">
                <span className="text-2xl font-black text-emerald-600">500+</span>
                <p className="text-xs font-bold text-gray-800 mt-1">PG Partners</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Physically verified premises</p>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl border border-gray-100">
                <span className="text-2xl font-black text-indigo-600">10,000+</span>
                <p className="text-xs font-bold text-gray-800 mt-1">Beds Tracked</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Real-time occupancy engine</p>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl border border-gray-100">
                <span className="text-2xl font-black text-amber-500">20+</span>
                <p className="text-xs font-bold text-gray-800 mt-1">Campus Hubs</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Expanding across India</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileNav />
    </div>
  )
}

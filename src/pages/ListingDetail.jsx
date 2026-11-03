import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  MapPin,
  Star,
  ShieldCheck,
  Bed,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Phone,
  Share2,
  Heart,
  ChevronLeft,
  Wifi,
  Wind,
  Shirt,
  Utensils,
  Car,
  Zap,
  Dumbbell,
  BookOpen,
  Bath,
  AlertCircle,
  Building,
  Clock,
  Compass,
  ArrowRight,
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import MobileNav from '../components/layout/MobileNav'
import ImageGallery from '../components/listings/ImageGallery'
import ListingCard from '../components/listings/ListingCard'
import Modal from '../components/common/Modal'
import Badge from '../components/common/Badge'
import Avatar from '../components/common/Avatar'
import { listings } from '../data/listings'
import { useAuth } from '../context/AuthContext'
import notify from '../components/common/Toast'

const facilityIconMap = {
  WiFi: Wifi,
  AC: Wind,
  Laundry: Shirt,
  Mess: Utensils,
  'Power Backup': Zap,
  CCTV: ShieldCheck,
  Parking: Car,
  Gym: Dumbbell,
  'Study Room': BookOpen,
  'Attached Bathroom': Bath,
}

export default function ListingDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isWishlisted, toggleWishlist, addBooking } = useAuth()

  const listing = listings.find((item) => item.id === id) || listings[0]
  const wishlisted = isWishlisted(listing.id)

  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 2:30 PM')
  const [selectedRoomType, setSelectedRoomType] = useState(
    listing.roomTypes?.[0]?.type || 'Single'
  )
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState('overview') // 'overview' | 'facilities' | 'rules' | 'location'

  const handleBookVisit = (e) => {
    e.preventDefault()
    const newBooking = {
      id: `bkg-${Date.now().toString().slice(-4)}`,
      pgId: listing.id,
      pgName: listing.name,
      college: listing.nearestCollege,
      date: selectedDate,
      status: 'Confirmed',
      tokenNumber: `BSR-${Math.floor(1000 + Math.random() * 9000)}`,
      rent: listing.rent,
      roomType: selectedRoomType,
      address: listing.address,
      ownerName: listing.owner.name,
      ownerPhone: listing.owner.phone,
      image: listing.images[0],
    }
    addBooking(newBooking)
    setBookingSuccess(true)
    notify.success('Visit scheduled successfully! Check your bookings dashboard.')
  }

  const similarListings = listings.filter((l) => l.id !== listing.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between mb-4">
          <Link
            to="/search"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-primary-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to all beds</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                toggleWishlist(listing.id)
                notify.success(
                  wishlisted ? 'Removed from wishlist' : 'Saved to your wishlist!'
                )
              }}
              className="p-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:text-rose-600 shadow-xs flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <Heart
                className={`w-4 h-4 ${
                  wishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-500'
                }`}
              />
              <span className="hidden sm:inline">
                {wishlisted ? 'Saved' : 'Save'}
              </span>
            </button>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href)
                notify.success('Listing link copied!')
              }}
              className="p-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:text-primary-600 shadow-xs flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-gray-500" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Title Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <Badge variant={listing.gender === 'Girls' ? 'girls' : listing.gender === 'Boys' ? 'boys' : 'unisex'}>
                {listing.gender} PG
              </Badge>
              {listing.verified && (
                <Badge variant="verified" icon={<CheckCircle2 className="w-3 h-3" />}>
                  Physically Verified
                </Badge>
              )}
              <Badge variant="beds" icon={<Bed className="w-3 h-3" />}>
                {listing.availableBeds} Beds Vacant
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
              {listing.name}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mt-2 font-medium">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{listing.rating}</span>
                <span className="text-gray-400 font-normal">
                  ({listing.reviewCount} student reviews)
                </span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-primary-500" />
                <span>
                  <strong>{listing.distance}</strong> from {listing.nearestCollege}
                </span>
              </div>
              <span>•</span>
              <span>{listing.address}</span>
            </div>
          </div>
        </div>

        {/* Image Gallery Component */}
        <div className="mb-10">
          <ImageGallery images={listing.images} title={listing.name} />
        </div>

        {/* Two-Column Layout: Left Content (65%), Right Sticky Booking (35%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Quick Feature Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
              <div className="p-2">
                <span className="text-[10px] uppercase font-bold text-gray-400">
                  Total Capacity
                </span>
                <p className="text-sm font-extrabold text-gray-900 mt-0.5">
                  {listing.totalBeds || 12} Beds
                </p>
              </div>
              <div className="p-2">
                <span className="text-[10px] uppercase font-bold text-gray-400">
                  Vacant Now
                </span>
                <p className="text-sm font-extrabold text-emerald-600 mt-0.5">
                  {listing.availableBeds} Available
                </p>
              </div>
              <div className="p-2">
                <span className="text-[10px] uppercase font-bold text-gray-400">
                  Gate Curfew
                </span>
                <p className="text-sm font-extrabold text-gray-900 mt-0.5">
                  11:00 PM
                </p>
              </div>
              <div className="p-2">
                <span className="text-[10px] uppercase font-bold text-gray-400">
                  Notice Period
                </span>
                <p className="text-sm font-extrabold text-gray-900 mt-0.5">
                  1 Month
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-200 space-x-6 text-sm font-bold">
              {[
                { id: 'overview', label: 'Room Options & Overview' },
                { id: 'facilities', label: 'Facilities & Food' },
                { id: 'rules', label: 'House Rules' },
                { id: 'location', label: 'Campus Map & Transit' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 transition-colors cursor-pointer relative ${
                    activeTab === tab.id
                      ? 'text-primary-600'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab 1: Overview & Bed Types Table */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    About {listing.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {listing.description}
                  </p>
                </div>

                {/* Real-time Room Options Table (Core BASERA Innovation) */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900">
                      Available Room & Bed Configurations
                    </h3>
                    <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
                      Live Vacancy Status
                    </span>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
                    <div className="divide-y divide-gray-100">
                      {listing.roomTypes?.map((rt, i) => (
                        <div
                          key={i}
                          className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-gray-900">
                                {rt.type} Room
                              </span>
                              {rt.available > 0 ? (
                                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                                  {rt.available} bed{rt.available > 1 ? 's' : ''} free
                                </span>
                              ) : (
                                <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                                  Occupied (Waitlist)
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">
                              Includes individual wooden study table, wardrobe, and orthopedic mattress
                            </p>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                            <div className="text-right">
                              <span className="text-lg font-black text-gray-900">
                                ₹{rt.rent.toLocaleString('en-IN')}
                              </span>
                              <span className="text-xs text-gray-400"> / mo</span>
                            </div>

                            <button
                              disabled={rt.available <= 0}
                              onClick={() => {
                                setSelectedRoomType(rt.type)
                                setBookingModalOpen(true)
                              }}
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                rt.available > 0
                                  ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-xs cursor-pointer'
                                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              {rt.available > 0 ? 'Select Bed' : 'Full'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bed Occupancy Meter */}
                <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50/70 border border-blue-100 rounded-2xl">
                  <div className="flex justify-between items-center text-xs font-bold mb-2">
                    <span className="text-gray-800">Current Building Occupancy</span>
                    <span className="text-primary-700 font-extrabold">
                      {Math.round(
                        ((listing.totalBeds - listing.availableBeds) / listing.totalBeds) *
                          100
                      )}
                      % Occupied
                    </span>
                  </div>
                  <div className="w-full bg-white h-2.5 rounded-full overflow-hidden p-0.5 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          ((listing.totalBeds - listing.availableBeds) /
                            listing.totalBeds) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 mt-2">
                    ⚡ High demand zone near {listing.nearestCollege}. Vacancies typically fill within 48 hours.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: Facilities */}
            {activeTab === 'facilities' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Included Amenities & Services
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {listing.facilities?.map((f) => {
                      const Icon = facilityIconMap[f] || Wifi
                      return (
                        <div
                          key={f}
                          className="p-3.5 bg-white rounded-xl border border-gray-100 shadow-xs flex items-center gap-3"
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary-600 flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-semibold text-gray-800">
                            {f}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Meal & Food Menu Details */}
                <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-xs">
                  <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-emerald-600" />
                    <span>Food & Mess Facility</span>
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">
                    Home-cooked North & South Indian meals served 3 times daily (Breakfast, Lunch, Dinner). Special festive feasts on Sundays. Unlimited milk, tea, and RO purified water.
                  </p>
                  <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-emerald-700">
                    <span className="px-2.5 py-1 bg-emerald-50 rounded-lg">✓ Pure Veg / Separate Non-Veg Prep</span>
                    <span className="px-2.5 py-1 bg-emerald-50 rounded-lg">✓ FSSAI Certified Kitchen</span>
                    <span className="px-2.5 py-1 bg-emerald-50 rounded-lg">✓ Tiffin packing for college</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Rules */}
            {activeTab === 'rules' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  House Rules & Code of Conduct
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {listing.rules?.map((rule, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-white rounded-xl border border-gray-100 shadow-xs flex items-center gap-3 text-xs text-gray-700 font-medium"
                    >
                      <span className="w-6 h-6 rounded-full bg-blue-50 text-primary-600 flex items-center justify-center font-bold text-[10px] shrink-0">
                        {idx + 1}
                      </span>
                      <span>{rule}</span>
                    </div>
                  ))}
                  <div className="p-3.5 bg-white rounded-xl border border-gray-100 shadow-xs flex items-center gap-3 text-xs text-gray-700 font-medium">
                    <span className="w-6 h-6 rounded-full bg-blue-50 text-primary-600 flex items-center justify-center font-bold text-[10px] shrink-0">
                      *
                    </span>
                    <span>Valid Student College ID card required at move-in</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Location & Transit */}
            {activeTab === 'location' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Campus Neighborhood & Transit
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">
                    {listing.address}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-white rounded-xl border border-gray-100 text-xs">
                    <span className="text-gray-400 font-medium block">College Gate</span>
                    <span className="font-bold text-gray-900">{listing.distance} (Walk)</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-gray-100 text-xs">
                    <span className="text-gray-400 font-medium block">Metro Station</span>
                    <span className="font-bold text-gray-900">0.8 km</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-gray-100 text-xs">
                    <span className="text-gray-400 font-medium block">Hospital / Clinic</span>
                    <span className="font-bold text-gray-900">1.2 km</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-gray-100 text-xs">
                    <span className="text-gray-400 font-medium block">Library & Study Cafe</span>
                    <span className="font-bold text-gray-900">0.4 km</span>
                  </div>
                </div>
              </div>
            )}

            {/* Verified Owner Profile Card */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <Avatar
                  src={listing.owner.avatar}
                  name={listing.owner.name}
                  size="xl"
                  online={true}
                  verified={true}
                />
                <div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <h4 className="text-base font-bold text-gray-900">
                      {listing.owner.name}
                    </h4>
                    <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                      Host
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Managing {listing.owner.totalListings} Student Properties • Responds {listing.owner.responseTime}
                  </p>
                  <p className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1 justify-center sm:justify-start">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Government ID & Deed Verified by BASERA</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`tel:${listing.owner.phone}`}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-xs hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Host</span>
                </a>
                <button
                  onClick={() => navigate(`/student/messages?pg=${listing.id}`)}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat on BASERA</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Sticky Booking Card (Desktop) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-white rounded-3xl border border-gray-100 shadow-xl p-6 space-y-6">
              {/* Price Banner */}
              <div className="flex items-baseline justify-between pb-4 border-b border-gray-100">
                <div>
                  <span className="text-3xl font-black text-gray-900 tracking-tight">
                    ₹{listing.rent.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-gray-400 font-medium"> / month</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-emerald-600 block">
                    Zero Brokerage
                  </span>
                  <span className="text-[11px] text-gray-400">
                    Deposit: ₹{listing.deposit?.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Vacancy Badge Callout */}
              <div className="p-3 bg-emerald-50 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-800 font-medium">
                <Bed className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>{listing.availableBeds} beds remaining</strong> out of {listing.totalBeds} total
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-primary-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Free Visit</span>
                </button>

                <button
                  onClick={() => navigate(`/student/messages?pg=${listing.id}`)}
                  className="w-full py-3 bg-blue-50 hover:bg-blue-100 text-primary-700 font-bold text-xs rounded-2xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat with Owner Directly</span>
                </button>

                <a
                  href={`tel:${listing.owner.phone}`}
                  className="w-full py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold text-xs rounded-2xl transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Call {listing.owner.phone}</span>
                </a>
              </div>

              {/* Trust badges */}
              <div className="pt-4 border-t border-gray-100 space-y-2 text-[11px] text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Free visit cancellation anytime before appointment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Lock in rate with zero extra agent commission</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Verified tenancy agreement support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Recommended PGs Section */}
        <div className="mt-20 pt-10 border-t border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Other Accommodations Near {listing.nearestCollege}
            </h3>
            <Link to="/search" className="text-xs font-bold text-primary-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarListings.map((sim) => (
              <ListingCard key={sim.id} listing={sim} />
            ))}
          </div>
        </div>
      </main>

      {/* Book Visit Modal */}
      <Modal
        isOpen={bookingModalOpen}
        onClose={() => {
          setBookingModalOpen(false)
          setBookingSuccess(false)
        }}
        title={bookingSuccess ? 'Visit Scheduled!' : `Schedule Visit: ${listing.name}`}
        description={
          bookingSuccess
            ? 'Your visit pass has been issued with instant confirmation.'
            : 'Select your preferred time slot to inspect the room.'
        }
      >
        {bookingSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900">
                You're All Set!
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Owner {listing.owner.name} has been notified. Token pass saved to your dashboard.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-left text-xs space-y-1">
              <p><strong>Appointment:</strong> {selectedDate}</p>
              <p><strong>Room Category:</strong> {selectedRoomType}</p>
              <p><strong>Host Contact:</strong> {listing.owner.phone}</p>
              <p><strong>Location:</strong> {listing.address}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setBookingModalOpen(false)
                  navigate('/student/bookings')
                }}
                className="flex-1 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs cursor-pointer"
              >
                View in My Bookings
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleBookVisit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Select Preferred Date & Time
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary-500"
              >
                <option value="Tomorrow, 11:00 AM">Tomorrow, 11:00 AM</option>
                <option value="Tomorrow, 2:30 PM">Tomorrow, 2:30 PM (Recommended)</option>
                <option value="Tomorrow, 5:00 PM">Tomorrow, 5:00 PM</option>
                <option value="Saturday, 11:00 AM">Saturday, 11:00 AM</option>
                <option value="Sunday, 3:00 PM">Sunday, 3:00 PM</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Room Sharing Preference
              </label>
              <select
                value={selectedRoomType}
                onChange={(e) => setSelectedRoomType(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary-500"
              >
                {listing.roomTypes?.map((rt, i) => (
                  <option key={i} value={rt.type}>
                    {rt.type} — ₹{rt.rent.toLocaleString('en-IN')}/mo ({rt.available} beds free)
                  </option>
                ))}
              </select>
            </div>

            <div className="p-3 bg-blue-50/70 rounded-xl text-[11px] text-blue-800">
              💡 Zero deposit or booking fee required to schedule a physical walkthrough.
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-sm shadow-md transition-all cursor-pointer"
            >
              Confirm Appointment
            </button>
          </form>
        )}
      </Modal>

      <Footer />
      <MobileNav />
    </div>
  )
}

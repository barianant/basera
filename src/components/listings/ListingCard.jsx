import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Heart,
  Star,
  MapPin,
  Bed,
  Wifi,
  Wind,
  Shirt,
  Utensils,
  Zap,
  ShieldCheck,
  Phone,
  MessageSquare,
  Share2,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react'
import Badge from '../common/Badge'
import Modal from '../common/Modal'
import { useAuth } from '../../context/AuthContext'
import notify from '../common/Toast'

// Map facilities to icons
const facilityIcons = {
  WiFi: Wifi,
  AC: Wind,
  Laundry: Shirt,
  Mess: Utensils,
  'Power Backup': Zap,
  CCTV: ShieldCheck,
}

export default function ListingCard({ listing, viewMode = 'grid' }) {
  const { isWishlisted, toggleWishlist } = useAuth()
  const navigate = useNavigate()
  const [callModalOpen, setCallModalOpen] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)

  if (!listing) return null

  const wishlisted = isWishlisted(listing.id)

  const handleShare = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const url = `${window.location.origin}/listing/${listing.id}`
    navigator.clipboard?.writeText(url)
    notify.success('Listing link copied to clipboard!')
    setShareModalOpen(true)
  }

  const handleCall = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCallModalOpen(true)
  }

  const handleChat = (e) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(`/student/messages?pg=${listing.id}`)
  }

  const handleWishlistClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(listing.id)
    if (!wishlisted) {
      notify.success(`Added ${listing.name} to wishlist!`)
    } else {
      notify.info(`Removed ${listing.name} from wishlist`)
    }
  }

  const genderVariant =
    listing.gender === 'Girls' ? 'girls' : listing.gender === 'Boys' ? 'boys' : 'unisex'

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className={`group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden flex ${
          viewMode === 'list' ? 'flex-col md:flex-row' : 'flex-col'
        }`}
      >
        {/* Image Container */}
        <div
          className={`relative overflow-hidden bg-gray-100 shrink-0 ${
            viewMode === 'list' ? 'md:w-72 h-56 md:h-auto' : 'h-52 w-full'
          }`}
        >
          <img
            src={listing.images?.[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800'}
            alt={listing.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-black/20 pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center z-10">
            <Badge variant={genderVariant} size="sm">
              {listing.gender} PG
            </Badge>
            {listing.verified && (
              <Badge variant="verified" size="sm" icon={<CheckCircle2 className="w-3 h-3" />}>
                Verified
              </Badge>
            )}
          </div>

          {/* Wishlist Heart Button */}
          <button
            onClick={handleWishlistClick}
            aria-label="Wishlist"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-rose-600 flex items-center justify-center shadow-md backdrop-blur-xs transition-transform active:scale-90 z-10 cursor-pointer"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                wishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-600'
              }`}
            />
          </button>

          {/* Bottom Overlay on Image: Beds Available Indicator */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10">
            <div className="flex items-center gap-1.5 bg-emerald-600/95 backdrop-blur-xs px-2.5 py-1 rounded-lg font-semibold shadow-xs">
              <Bed className="w-3.5 h-3.5" />
              <span>
                {listing.availableBeds === 1
                  ? '⚡ Last 1 Bed Left!'
                  : `${listing.availableBeds} Beds Available`}
              </span>
            </div>

            <span className="text-[11px] font-medium bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
              {listing.type || 'Single/Sharing'}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Rating and College */}
            <div className="flex items-center justify-between gap-2 mb-1.5 text-xs">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{listing.rating || '4.8'}</span>
                <span className="text-gray-400 font-normal">
                  ({listing.reviewCount || 42})
                </span>
              </div>
              <span className="text-gray-500 truncate max-w-[170px] text-right font-medium">
                {listing.nearestCollege || 'Near Campus'}
              </span>
            </div>

            {/* PG Name */}
            <Link to={`/listing/${listing.id}`}>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1 mb-1">
                {listing.name}
              </h3>
            </Link>

            {/* Distance & Area */}
            <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
              <MapPin className="w-3.5 h-3.5 text-primary-500 shrink-0" />
              <span className="font-semibold text-gray-700">{listing.distance}</span>
              <span>from {listing.nearestCollege || 'college'}</span>
              <span className="text-gray-300">•</span>
              <span className="truncate">{listing.area || listing.city}</span>
            </div>

            {/* Facilities Chips */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {listing.facilities?.slice(0, 4).map((f) => {
                const Icon = facilityIcons[f] || Wifi
                return (
                  <span
                    key={f}
                    className="inline-flex items-center gap-1 text-[11px] px-2 py-1 bg-gray-50 text-gray-600 rounded-lg border border-gray-100"
                  >
                    <Icon className="w-3 h-3 text-gray-400" />
                    <span>{f}</span>
                  </span>
                )
              })}
              {listing.facilities?.length > 4 && (
                <span className="text-[11px] px-1.5 py-1 text-gray-400 font-medium">
                  +{listing.facilities.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Pricing & Actions */}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xl font-extrabold text-gray-900">
                  ₹{Number(listing.rent).toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-gray-400 font-normal"> / month</span>
              </div>
              <span className="text-[11px] text-gray-500">
                Deposit: ₹{Number(listing.deposit || listing.rent * 2).toLocaleString('en-IN')}
              </span>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              <button
                onClick={handleChat}
                className="col-span-1 p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-primary-600 flex items-center justify-center transition-colors cursor-pointer"
                title="Direct Chat with Owner"
              >
                <MessageSquare className="w-4 h-4" />
              </button>

              <button
                onClick={handleCall}
                className="col-span-1 p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex items-center justify-center transition-colors cursor-pointer"
                title="Call Verified Host"
              >
                <Phone className="w-4 h-4" />
              </button>

              <button
                onClick={handleShare}
                className="col-span-1 p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
                title="Share PG Link"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <Link
                to={`/listing/${listing.id}`}
                className="col-span-1 py-2 px-1 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs flex items-center justify-center gap-1 shadow-sm transition-all"
              >
                <span>View</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Call Host Modal */}
      <Modal
        isOpen={callModalOpen}
        onClose={() => setCallModalOpen(false)}
        title="Contact PG Owner"
        description={`Direct line for ${listing.name}`}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
            <img
              src={listing.owner?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ramesh'}
              alt={listing.owner?.name || 'Owner'}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-primary-500"
            />
            <div>
              <p className="font-bold text-gray-900 text-base">
                {listing.owner?.name || 'Ramesh Sharma'}
              </p>
              <p className="text-xs text-gray-500">
                Verified Host • Responds {listing.owner?.responseTime || '< 1 hour'}
              </p>
              <div className="mt-1 flex items-center gap-1 text-emerald-600 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Government ID & Property Verified</span>
              </div>
            </div>
          </div>

          <div className="p-4 border border-blue-100 bg-blue-50/60 rounded-xl text-center">
            <span className="text-xs text-blue-600 uppercase font-semibold">Owner Contact Number</span>
            <p className="text-2xl font-black text-gray-900 my-1 tracking-wide">
              {listing.owner?.phone || '+91 98765 43210'}
            </p>
            <p className="text-[11px] text-gray-500">Mention BASERA for guaranteed zero brokerage rate</p>
          </div>

          <div className="flex gap-2">
            <a
              href={`tel:${listing.owner?.phone || '+919876543210'}`}
              className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-center text-sm transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
            <button
              onClick={() => {
                setCallModalOpen(false)
                navigate(`/student/messages?pg=${listing.id}`)
              }}
              className="flex-1 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl text-center text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              Chat on BASERA
            </button>
          </div>
        </div>
      </Modal>

      {/* Share Modal */}
      <Modal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        title="Share this PG"
        description="Send this room to your roommates or parents"
      >
        <div className="space-y-4">
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between text-xs text-gray-600 break-all">
            <span>{`${window.location.origin}/listing/${listing.id}`}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`https://wa.me/?text=Check%20out%20${encodeURIComponent(listing.name)}%20on%20BASERA:%20${window.location.origin}/listing/${listing.id}`}
              target="_blank"
              rel="noreferrer"
              className="py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl text-center transition-colors"
            >
              Share via WhatsApp
            </a>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(`${window.location.origin}/listing/${listing.id}`)
                notify.success('Link copied!')
                setShareModalOpen(false)
              }}
              className="py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-xl text-center transition-colors cursor-pointer"
            >
              Copy Link
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

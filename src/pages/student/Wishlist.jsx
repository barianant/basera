import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Heart,
  Search,
  Scale,
  Trash2,
  X,
  Check,
  Bed,
  MapPin,
  Wifi,
  Wind,
} from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import ListingCard from '../../components/listings/ListingCard'
import EmptyState from '../../components/common/EmptyState'
import Modal from '../../components/common/Modal'
import { useAuth } from '../../context/AuthContext'
import { listings } from '../../data/listings'
import notify from '../../components/common/Toast'

export default function StudentWishlist() {
  const { wishlist, toggleWishlist } = useAuth()
  const [compareModalOpen, setCompareModalOpen] = useState(false)

  const wishlistedListings = listings.filter((item) => wishlist.includes(item.id))

  const handleClearAll = () => {
    wishlist.forEach((id) => toggleWishlist(id))
    notify.info('Wishlist cleared')
  }

  return (
    <DashboardLayout
      title="Saved PGs & Hostels"
      subtitle={`You have saved ${wishlistedListings.length} student accommodations`}
    >
      <div className="space-y-6">
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              My Saved Accommodations ({wishlistedListings.length})
            </h2>
            <p className="text-xs text-gray-500">
              Review and compare room rates, facilities, and current bed vacancies
            </p>
          </div>

          <div className="flex items-center gap-2">
            {wishlistedListings.length >= 2 && (
              <button
                onClick={() => setCompareModalOpen(true)}
                className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Scale className="w-4 h-4" />
                <span>Compare PGs</span>
              </button>
            )}

            {wishlistedListings.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* Listings Grid */}
        {wishlistedListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {wishlistedListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <EmptyState
            preset="no-wishlist"
            onAction={() => (window.location.href = '/search')}
          />
        )}
      </div>

      {/* Side-by-Side Comparison Modal */}
      <Modal
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        title="Side-by-Side Accommodation Comparison"
        description="Evaluating your top saved choices near college"
        size="xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="p-3 font-bold text-gray-400 uppercase">Features</th>
                {wishlistedListings.slice(0, 3).map((pg) => (
                  <th key={pg.id} className="p-3 font-extrabold text-gray-900 text-sm">
                    {pg.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-3 font-bold text-gray-500">Monthly Rent</td>
                {wishlistedListings.slice(0, 3).map((pg) => (
                  <td key={pg.id} className="p-3 font-black text-primary-600 text-sm">
                    ₹{pg.rent.toLocaleString('en-IN')}/mo
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-gray-500">Security Deposit</td>
                {wishlistedListings.slice(0, 3).map((pg) => (
                  <td key={pg.id} className="p-3 text-gray-800">
                    ₹{pg.deposit?.toLocaleString('en-IN')}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-gray-500">Vacant Beds Now</td>
                {wishlistedListings.slice(0, 3).map((pg) => (
                  <td key={pg.id} className="p-3">
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      {pg.availableBeds} beds
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-gray-500">Campus Distance</td>
                {wishlistedListings.slice(0, 3).map((pg) => (
                  <td key={pg.id} className="p-3 font-semibold text-gray-700">
                    {pg.distance}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-gray-500">Food / Mess Included</td>
                {wishlistedListings.slice(0, 3).map((pg) => (
                  <td key={pg.id} className="p-3">
                    {pg.facilities.includes('Mess') ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Yes (3 meals)
                      </span>
                    ) : (
                      <span className="text-gray-400">Available on extra charge</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-gray-500">AC Included</td>
                {wishlistedListings.slice(0, 3).map((pg) => (
                  <td key={pg.id} className="p-3">
                    {pg.facilities.includes('AC') ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Yes
                      </span>
                    ) : (
                      <span className="text-gray-400">No (Cooler)</span>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>
    </DashboardLayout>
  )
}

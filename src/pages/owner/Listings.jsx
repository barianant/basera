import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Building2,
  PlusCircle,
  Edit,
  Trash2,
  Copy,
  Pause,
  Play,
  Rocket,
  BarChart2,
  Grid,
  List as ListIcon,
  CheckCircle2,
  Bed,
  MapPin,
  ExternalLink,
} from 'lucide-react'
import OwnerDashboardLayout from '../../components/layout/OwnerDashboardLayout'
import Modal from '../../components/common/Modal'
import { listings } from '../../data/listings'
import notify from '../../components/common/Toast'

export default function OwnerListings() {
  const [viewMode, setViewMode] = useState('card') // 'card' | 'table'
  const [myListings, setMyListings] = useState(
    listings.slice(0, 3).map((l, i) => ({
      ...l,
      status: i === 2 ? 'Paused' : 'Active',
      views: 300 + i * 150,
      leads: 24 + i * 12,
    }))
  )

  const [boostModalListing, setBoostModalListing] = useState(null)
  const [analyticsModalListing, setAnalyticsModalListing] = useState(null)

  const handleToggleStatus = (id) => {
    setMyListings((prev) =>
      prev.map((l) => {
        if (l.id === id) {
          const newStatus = l.status === 'Active' ? 'Paused' : 'Active'
          notify.info(`${l.name} is now ${newStatus}`)
          return { ...l, status: newStatus }
        }
        return l
      })
    )
  }

  const handleDelete = (id, name) => {
    setMyListings((prev) => prev.filter((l) => l.id !== id))
    notify.error(`Deleted "${name}"`)
  }

  const handleDuplicate = (listing) => {
    const duplicated = {
      ...listing,
      id: `copy_${Date.now()}`,
      name: `${listing.name} (Copy)`,
      status: 'Active',
    }
    setMyListings((prev) => [duplicated, ...prev])
    notify.success(`Duplicated listing created!`)
  }

  return (
    <OwnerDashboardLayout
      title="My PG & Hostel Properties"
      subtitle="Manage your listings, bed vacancies, and search rankings"
    >
      <div className="space-y-6">
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Active Properties ({myListings.length})
            </h2>
            <p className="text-xs text-gray-500">
              Update live vacant beds or boost listings ahead of semester move-ins
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('card')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'card' ? 'bg-white text-primary-600 shadow-xs' : 'text-gray-400'
                }`}
                title="Card View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'table' ? 'bg-white text-primary-600 shadow-xs' : 'text-gray-400'
                }`}
                title="Table View"
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>

            <Link
              to="/owner/add-property"
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Property</span>
            </Link>
          </div>
        </div>

        {/* Card View Mode */}
        {viewMode === 'card' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {myListings.map((l) => (
              <div
                key={l.id}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <div className="h-44 relative bg-gray-100">
                    <img
                      src={l.images[0]}
                      alt={l.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          l.status === 'Active'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-500 text-white'
                        }`}
                      >
                        {l.status}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-xs">
                        {l.gender} PG
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <div className="flex items-center gap-1.5 bg-emerald-600/90 backdrop-blur-xs px-2.5 py-1 rounded-lg font-bold">
                        <Bed className="w-3.5 h-3.5" />
                        <span>{l.availableBeds} / {l.totalBeds} Beds Vacant</span>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="text-base font-bold text-gray-900 truncate">
                        {l.name}
                      </h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <span>{l.nearestCollege} ({l.distance})</span>
                      </p>
                    </div>

                    {/* Stats Strip */}
                    <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50 rounded-xl text-center text-xs">
                      <div>
                        <span className="text-gray-400 block text-[10px] font-bold">RENT</span>
                        <span className="font-extrabold text-gray-900">₹{l.rent.toLocaleString('en-IN')}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px] font-bold">VIEWS</span>
                        <span className="font-extrabold text-primary-600">{l.views}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px] font-bold">LEADS</span>
                        <span className="font-extrabold text-emerald-600">{l.leads}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Toolbar */}
                <div className="p-4 bg-slate-50 border-t border-gray-100 flex items-center justify-between gap-1 text-xs">
                  <button
                    onClick={() => handleToggleStatus(l.id)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-xl transition-colors cursor-pointer"
                    title={l.status === 'Active' ? 'Pause Listing' : 'Resume Listing'}
                  >
                    {l.status === 'Active' ? (
                      <Pause className="w-4 h-4 text-amber-600" />
                    ) : (
                      <Play className="w-4 h-4 text-emerald-600" />
                    )}
                  </button>

                  <button
                    onClick={() => setBoostModalListing(l)}
                    className="px-2.5 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-2xs hover:scale-105 transition-all flex items-center gap-1 cursor-pointer"
                    title="Boost to top of search results"
                  >
                    <Rocket className="w-3.5 h-3.5" />
                    <span>Boost</span>
                  </button>

                  <button
                    onClick={() => setAnalyticsModalListing(l)}
                    className="p-2 text-gray-600 hover:text-primary-600 hover:bg-white rounded-xl transition-colors cursor-pointer"
                    title="View Analytics"
                  >
                    <BarChart2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDuplicate(l)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-xl transition-colors cursor-pointer"
                    title="Duplicate Listing"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(l.id, l.name)}
                    className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                    title="Delete Listing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Table View Mode */
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-gray-200">
                  <tr>
                    <th className="p-4 font-bold text-gray-500 uppercase">Property</th>
                    <th className="p-4 font-bold text-gray-500 uppercase">Status</th>
                    <th className="p-4 font-bold text-gray-500 uppercase">Vacant Beds</th>
                    <th className="p-4 font-bold text-gray-500 uppercase">Monthly Rent</th>
                    <th className="p-4 font-bold text-gray-500 uppercase">Views / Leads</th>
                    <th className="p-4 font-bold text-gray-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {myListings.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50/50">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={l.images[0]}
                          alt={l.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-bold text-gray-900">{l.name}</p>
                          <p className="text-[11px] text-gray-400">{l.nearestCollege}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded-full font-bold ${
                            l.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {l.status}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-emerald-600">
                        {l.availableBeds} / {l.totalBeds} Beds
                      </td>
                      <td className="p-4 font-black text-gray-900">
                        ₹{l.rent.toLocaleString('en-IN')}
                      </td>
                      <td className="p-4 text-gray-500">
                        {l.views} views • {l.leads} inquiries
                      </td>
                      <td className="p-4 text-right space-x-1">
                        <button
                          onClick={() => setBoostModalListing(l)}
                          className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg"
                        >
                          <Rocket className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(l.id, l.name)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Boost Modal */}
      <Modal
        isOpen={!!boostModalListing}
        onClose={() => setBoostModalListing(null)}
        title="🚀 Boost Campus Ranking"
        description={`Promote ${boostModalListing?.name} to rank #1 near ${boostModalListing?.nearestCollege}`}
      >
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl">
            <h4 className="font-bold text-sm text-amber-900">
              BASERA Pro Boost Benefits
            </h4>
            <ul className="text-xs text-amber-800 space-y-1.5 mt-2">
              <li>✓ Pinned to top 3 search results for 7 days</li>
              <li>✓ Highlighted with "⚡ Featured Vacancy" badge</li>
              <li>✓ Instant WhatsApp broadcast to students looking in this zone</li>
            </ul>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between text-xs">
            <span className="font-semibold text-gray-700">7-Day Campus Boost</span>
            <span className="text-base font-black text-gray-900">₹499 (Zero brokerage)</span>
          </div>

          <button
            onClick={() => {
              notify.success('Listing boosted! Your property is now ranked #1 near campus.')
              setBoostModalListing(null)
            }}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer"
          >
            Activate Instant Boost
          </button>
        </div>
      </Modal>

      {/* Analytics Modal */}
      <Modal
        isOpen={!!analyticsModalListing}
        onClose={() => setAnalyticsModalListing(null)}
        title={`Performance: ${analyticsModalListing?.name}`}
        description="Detailed engagement metrics for the current billing cycle"
      >
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 bg-blue-50 rounded-xl">
              <span className="text-gray-400 font-bold block">TOTAL SEARCH VIEWS</span>
              <span className="text-xl font-black text-primary-600">
                {analyticsModalListing?.views}
              </span>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl">
              <span className="text-gray-400 font-bold block">IN-APP LEADS</span>
              <span className="text-xl font-black text-emerald-600">
                {analyticsModalListing?.leads}
              </span>
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl space-y-1">
            <p><strong>Contact conversion rate:</strong> 14.8% (Top 10% on platform)</p>
            <p><strong>Average response time:</strong> 18 minutes</p>
            <p><strong>Campus demand index:</strong> High (VJTI / COEP Zone)</p>
          </div>
        </div>
      </Modal>
    </OwnerDashboardLayout>
  )
}

import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  SlidersHorizontal,
  MapPin,
  Map,
  Grid,
  List as ListIcon,
  X,
  Search as SearchIcon,
  RotateCcw,
  Sparkles,
  Bed,
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import MobileNav from '../components/layout/MobileNav'
import ListingCard from '../components/listings/ListingCard'
import SearchFilters from '../components/listings/SearchFilters'
import EmptyState from '../components/common/EmptyState'
import Modal from '../components/common/Modal'
import { listings } from '../data/listings'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Parse initial query params
  const initialCollege = searchParams.get('college') || ''
  const initialGender = searchParams.get('gender') || 'All'
  const initialMaxRent = Number(searchParams.get('maxRent')) || 20000

  const [searchQuery, setSearchQuery] = useState(initialCollege)
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'
  const [sortBy, setSortBy] = useState('recommended')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [mapModalOpen, setMapModalOpen] = useState(false)

  // Filters State
  const [filters, setFilters] = useState({
    maxRent: initialMaxRent,
    maxDistance: 10,
    gender: initialGender,
    vacantOnly: false,
    roomTypes: [],
    facilities: [],
  })

  useEffect(() => {
    if (initialCollege) setSearchQuery(initialCollege)
    if (initialGender) setFilters((f) => ({ ...f, gender: initialGender }))
  }, [initialCollege, initialGender])

  const handleResetFilters = () => {
    setFilters({
      maxRent: 20000,
      maxDistance: 10,
      gender: 'All',
      vacantOnly: false,
      roomTypes: [],
      facilities: [],
    })
    setSearchQuery('')
    setSearchParams({})
  }

  // Filter listings
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // Search query (matches name, college, city, area)
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        const matchesQuery =
          item.name.toLowerCase().includes(q) ||
          item.nearestCollege.toLowerCase().includes(q) ||
          item.city.toLowerCase().includes(q) ||
          item.area.toLowerCase().includes(q)
        if (!matchesQuery) return false
      }

      // Rent
      if (item.rent > filters.maxRent) return false

      // Distance (parse "0.5 km" -> 0.5)
      const distNum = parseFloat(item.distance) || 0
      if (distNum > filters.maxDistance) return false

      // Gender
      if (filters.gender !== 'All' && item.gender !== filters.gender) {
        return false
      }

      // Vacant beds only
      if (filters.vacantOnly && item.availableBeds <= 0) {
        return false
      }

      // Room Types
      if (filters.roomTypes.length > 0) {
        const hasMatchingType = item.roomTypes?.some((rt) =>
          filters.roomTypes.includes(rt.type)
        )
        if (!hasMatchingType) return false
      }

      // Facilities
      if (filters.facilities.length > 0) {
        const hasAllFacilities = filters.facilities.every((f) =>
          item.facilities?.includes(f)
        )
        if (!hasAllFacilities) return false
      }

      return true
    })
  }, [listings, searchQuery, filters])

  // Sort listings
  const sortedListings = useMemo(() => {
    const list = [...filteredListings]
    switch (sortBy) {
      case 'rent-low':
        return list.sort((a, b) => a.rent - b.rent)
      case 'rent-high':
        return list.sort((a, b) => b.rent - a.rent)
      case 'beds':
        return list.sort((a, b) => b.availableBeds - a.availableBeds)
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating)
      default:
        // Recommended
        return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
  }, [filteredListings, sortBy])

  // Count active filters
  const activeFilterCount =
    (filters.gender !== 'All' ? 1 : 0) +
    (filters.maxRent < 20000 ? 1 : 0) +
    (filters.maxDistance < 10 ? 1 : 0) +
    (filters.vacantOnly ? 1 : 0) +
    filters.roomTypes.length +
    filters.facilities.length

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search & Top Action Bar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quick Search Input */}
          <div className="relative w-full sm:w-96">
            <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by college (e.g. VJTI), area, or PG..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary-500 focus:bg-white transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Toolbar: Map, Sort, View mode */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden px-3.5 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs font-semibold text-gray-700 flex items-center gap-1.5 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-primary-600" />
              <span>Filters ({activeFilterCount})</span>
            </button>

            {/* Map View Toggle Button */}
            <button
              onClick={() => setMapModalOpen(true)}
              className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-primary-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Map className="w-3.5 h-3.5" />
              <span>Map View</span>
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 border-none rounded-xl text-xs font-semibold text-gray-700 cursor-pointer focus:outline-none"
            >
              <option value="recommended">Sort: Recommended</option>
              <option value="beds">Sort: Most Beds Available</option>
              <option value="rent-low">Sort: Rent Low to High</option>
              <option value="rent-high">Sort: Rent High to Low</option>
              <option value="rating">Sort: Highest Rated</option>
            </select>

            {/* Grid / List View Toggle */}
            <div className="hidden sm:flex items-center bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-primary-600 shadow-xs' : 'text-gray-400'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-white text-primary-600 shadow-xs' : 'text-gray-400'
                }`}
                title="List View"
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Info & Active Filter Tags */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              {searchQuery ? `PGs near "${searchQuery}"` : 'All Verified Student Accommodations'}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Showing <strong className="text-gray-900">{sortedListings.length}</strong> available properties with instant booking
            </p>
          </div>

          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-gray-400 font-medium mr-1">Active filters:</span>
              {filters.gender !== 'All' && (
                <span className="text-[11px] font-semibold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full flex items-center gap-1">
                  {filters.gender} Only
                  <button onClick={() => setFilters((f) => ({ ...f, gender: 'All' }))}>
                    <X className="w-3 h-3 ml-0.5" />
                  </button>
                </span>
              )}
              {filters.maxRent < 20000 && (
                <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full flex items-center gap-1">
                  Max ₹{filters.maxRent}
                  <button onClick={() => setFilters((f) => ({ ...f, maxRent: 20000 }))}>
                    <X className="w-3 h-3 ml-0.5" />
                  </button>
                </span>
              )}
              {filters.vacantOnly && (
                <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full flex items-center gap-1">
                  Vacant Beds Only
                  <button onClick={() => setFilters((f) => ({ ...f, vacantOnly: false }))}>
                    <X className="w-3 h-3 ml-0.5" />
                  </button>
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-xs text-rose-600 font-semibold hover:underline ml-1 cursor-pointer"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Main Content Layout: Sidebar + Grid */}
        <div className="flex gap-8 items-start">
          {/* Desktop Left Sidebar Filters */}
          <div className="hidden lg:block w-72 shrink-0 sticky top-20">
            <SearchFilters
              filters={filters}
              setFilters={setFilters}
              onReset={handleResetFilters}
            />
          </div>

          {/* Right Listings Grid */}
          <div className="flex-1 min-w-0">
            {sortedListings.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-2'
                    : 'grid-cols-1'
                }`}
              >
                {sortedListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                preset="no-listings"
                title="No Available Beds Found Matching Filters"
                description="We couldn't find any rooms matching your exact combination. Try broadening your rent budget or distance from campus."
                actionLabel="Reset Filters"
                onAction={handleResetFilters}
              />
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filters Drawer Modal */}
      <Modal
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        title="Search Filters"
        description="Filter by rent, campus distance, and amenities"
      >
        <SearchFilters
          filters={filters}
          setFilters={setFilters}
          onReset={handleResetFilters}
        />
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => setMobileFiltersOpen(false)}
            className="w-full py-3 bg-primary-600 text-white font-bold rounded-xl text-sm"
          >
            Show {sortedListings.length} PGs
          </button>
        </div>
      </Modal>

      {/* Interactive Map Modal Placeholder */}
      <Modal
        isOpen={mapModalOpen}
        onClose={() => setMapModalOpen(false)}
        title="Interactive Campus Radius Map"
        description="Visualizing verified PGs within walking distance of campus"
        size="lg"
      >
        <div className="h-96 rounded-2xl bg-slate-100 border border-slate-200 relative overflow-hidden flex flex-col items-center justify-center p-6 text-center">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 space-y-3 max-w-md">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 text-primary-600 mx-auto flex items-center justify-center shadow-md">
              <MapPin className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-gray-900">
              Campus Geospatial Radius
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              In production, this integrates OpenStreetMap / Mapbox to show exact walking walking time (5 min, 10 min, 15 min isochrones) from your engineering or medical department gate.
            </p>
            <div className="flex flex-wrap gap-2 justify-center pt-2">
              <span className="px-3 py-1 bg-white text-xs font-semibold rounded-full shadow-xs border border-gray-200">
                📍 VJTI Main Gate: 0.5 km
              </span>
              <span className="px-3 py-1 bg-white text-xs font-semibold rounded-full shadow-xs border border-gray-200">
                📍 Matunga Central Station: 0.8 km
              </span>
            </div>
          </div>
        </div>
      </Modal>

      <Footer />
      <MobileNav />
    </div>
  )
}

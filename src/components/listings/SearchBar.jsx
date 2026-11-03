import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  MapPin,
  GraduationCap,
  Users,
  IndianRupee,
  Calendar,
  ChevronDown,
  Sparkles,
} from 'lucide-react'
import { colleges } from '../../data/colleges'

export default function SearchBar({
  initialCollege = '',
  initialGender = '',
  initialRent = '',
  compact = false,
  className = '',
}) {
  const navigate = useNavigate()
  const [collegeQuery, setCollegeQuery] = useState(initialCollege)
  const [selectedGender, setSelectedGender] = useState(initialGender || 'All')
  const [maxRent, setMaxRent] = useState(initialRent || '15000')
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false)

  const filteredColleges = colleges.filter((c) =>
    c.name.toLowerCase().includes(collegeQuery.toLowerCase()) ||
    c.short.toLowerCase().includes(collegeQuery.toLowerCase()) ||
    c.city.toLowerCase().includes(collegeQuery.toLowerCase())
  )

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (collegeQuery) params.set('college', collegeQuery)
    if (selectedGender && selectedGender !== 'All') params.set('gender', selectedGender)
    if (maxRent) params.set('maxRent', maxRent)

    navigate(`/search?${params.toString()}`)
  }

  const handleSelectCollege = (col) => {
    setCollegeQuery(col.short)
    setShowCollegeDropdown(false)
  }

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <form
        onSubmit={handleSearch}
        className={`bg-white rounded-3xl p-2 sm:p-3 shadow-xl shadow-blue-900/10 border border-gray-100 flex flex-col md:flex-row items-stretch md:items-center divide-y md:divide-y-0 md:divide-x divide-gray-100 relative ${
          compact ? 'py-1.5' : ''
        }`}
      >
        {/* College / University field */}
        <div className="relative flex-1 px-4 py-2 sm:py-1">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-primary-600">
            College or Campus
          </label>
          <div className="flex items-center gap-2 mt-0.5">
            <GraduationCap className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              value={collegeQuery}
              onChange={(e) => {
                setCollegeQuery(e.target.value)
                setShowCollegeDropdown(true)
              }}
              onFocus={() => setShowCollegeDropdown(true)}
              placeholder="e.g. VJTI, COEP, GCE Jalgaon, IIT"
              className="w-full text-sm font-semibold text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent"
            />
          </div>

          {/* Autocomplete Dropdown */}
          {showCollegeDropdown && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setShowCollegeDropdown(false)}
              />
              <div className="absolute left-0 right-0 top-full mt-3 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-30 max-h-64 overflow-y-auto">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Popular Campuses
                </div>
                {filteredColleges.length > 0 ? (
                  filteredColleges.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleSelectCollege(c)}
                      className="w-full text-left px-4 py-2.5 hover:bg-blue-50/70 transition-colors flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-100 text-primary-600 flex items-center justify-center text-xs font-bold">
                          {c.short.slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 group-hover:text-primary-600">
                            {c.short}
                          </p>
                          <p className="text-xs text-gray-400 truncate max-w-[220px]">
                            {c.name}
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                        {c.city}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-xs text-gray-500">
                    Press search to find all PGs matching "{collegeQuery}"
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Gender / Sharing filter */}
        <div className="px-4 py-2 sm:py-1 md:w-44">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
            For Whom
          </label>
          <div className="flex items-center gap-2 mt-0.5">
            <Users className="w-4 h-4 text-gray-400 shrink-0" />
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="w-full text-sm font-semibold text-gray-900 focus:outline-none bg-transparent cursor-pointer"
            >
              <option value="All">All Genders</option>
              <option value="Boys">Boys Only</option>
              <option value="Girls">Girls Only</option>
              <option value="Unisex">Unisex / Co-ed</option>
            </select>
          </div>
        </div>

        {/* Max Budget filter */}
        <div className="px-4 py-2 sm:py-1 md:w-44">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Max Budget
          </label>
          <div className="flex items-center gap-1.5 mt-0.5">
            <IndianRupee className="w-4 h-4 text-gray-400 shrink-0" />
            <select
              value={maxRent}
              onChange={(e) => setMaxRent(e.target.value)}
              className="w-full text-sm font-semibold text-gray-900 focus:outline-none bg-transparent cursor-pointer"
            >
              <option value="6000">Up to ₹6,000</option>
              <option value="8000">Up to ₹8,000</option>
              <option value="10000">Up to ₹10,000</option>
              <option value="15000">Up to ₹15,000</option>
              <option value="25000">Any Budget</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="p-2 shrink-0">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span className="text-sm">Find Beds</span>
          </button>
        </div>
      </form>
    </div>
  )
}

import React from 'react'
import {
  RotateCcw,
  SlidersHorizontal,
  Wifi,
  Wind,
  Shirt,
  Utensils,
  Car,
  ShieldCheck,
  Zap,
  Dumbbell,
  BookOpen,
  Bath,
  Bed,
} from 'lucide-react'

const allFacilities = [
  { id: 'WiFi', label: 'High-speed WiFi', icon: Wifi },
  { id: 'AC', label: 'Air Conditioning', icon: Wind },
  { id: 'Laundry', label: 'Laundry Service', icon: Shirt },
  { id: 'Mess', label: 'Mess / Meal Included', icon: Utensils },
  { id: 'Attached Bathroom', label: 'Attached Washroom', icon: Bath },
  { id: 'Power Backup', label: 'Power Backup (Inverter/DG)', icon: Zap },
  { id: 'CCTV', label: '24/7 CCTV & Security', icon: ShieldCheck },
  { id: 'Parking', label: 'Bike / Car Parking', icon: Car },
  { id: 'Gym', label: 'Fitness Center / Gym', icon: Dumbbell },
  { id: 'Study Room', label: 'Quiet Study Room', icon: BookOpen },
]

export default function SearchFilters({
  filters,
  setFilters,
  onReset,
  className = '',
}) {
  const handleFacilityToggle = (facilityId) => {
    setFilters((prev) => {
      const exists = prev.facilities.includes(facilityId)
      return {
        ...prev,
        facilities: exists
          ? prev.facilities.filter((f) => f !== facilityId)
          : [...prev.facilities, facilityId],
      }
    })
  }

  const handleRoomTypeToggle = (type) => {
    setFilters((prev) => {
      const exists = prev.roomTypes.includes(type)
      return {
        ...prev,
        roomTypes: exists
          ? prev.roomTypes.filter((t) => t !== type)
          : [...prev.roomTypes, type],
      }
    })
  }

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2 font-bold text-gray-900 text-base">
          <SlidersHorizontal className="w-4 h-4 text-primary-600" />
          <span>Filters</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Core BASERA Value Prop: Available Beds Only Toggle */}
      <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/60 rounded-xl">
        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            <Bed className="w-4 h-4 text-emerald-600" />
            <div>
              <p className="text-xs font-bold text-gray-900">Only Vacant Beds</p>
              <p className="text-[10px] text-gray-500">Hide fully occupied PGs</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={filters.vacantOnly}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, vacantOnly: e.target.checked }))
            }
            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
          />
        </label>
      </div>

      {/* Monthly Budget Slider */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">
            Max Monthly Rent
          </label>
          <span className="text-sm font-extrabold text-primary-600">
            ₹{Number(filters.maxRent).toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min="3000"
          max="20000"
          step="500"
          value={filters.maxRent}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, maxRent: Number(e.target.value) }))
          }
          className="w-full accent-primary-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-medium">
          <span>₹3,000</span>
          <span>₹10,000</span>
          <span>₹20,000+</span>
        </div>
      </div>

      {/* Distance Slider */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">
            Max Distance from Campus
          </label>
          <span className="text-sm font-extrabold text-primary-600">
            {filters.maxDistance} km
          </span>
        </div>
        <input
          type="range"
          min="0.5"
          max="10"
          step="0.5"
          value={filters.maxDistance}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, maxDistance: Number(e.target.value) }))
          }
          className="w-full accent-primary-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-medium">
          <span>0.5 km (Walking)</span>
          <span>5 km</span>
          <span>10 km</span>
        </div>
      </div>

      {/* Gender Segmented Tabs */}
      <div>
        <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5">
          Accommodation Type
        </label>
        <div className="grid grid-cols-4 gap-1 p-1 bg-gray-100 rounded-xl">
          {['All', 'Boys', 'Girls', 'Unisex'].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setFilters((prev) => ({ ...prev, gender: g }))}
              className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                filters.gender === g
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Room Occupancy Type */}
      <div>
        <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5">
          Room Sharing Type
        </label>
        <div className="space-y-2">
          {['Single', 'Double Sharing', 'Triple Sharing'].map((t) => (
            <label
              key={t}
              className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer hover:text-gray-900"
            >
              <input
                type="checkbox"
                checked={filters.roomTypes.includes(t)}
                onChange={() => handleRoomTypeToggle(t)}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 cursor-pointer"
              />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="pt-2">
        <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5">
          Amenities & Facilities
        </label>
        <div className="space-y-2">
          {allFacilities.map((f) => {
            const Icon = f.icon
            const isChecked = filters.facilities.includes(f.id)
            return (
              <label
                key={f.id}
                className="flex items-center justify-between text-xs text-gray-700 cursor-pointer hover:text-gray-900 group"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleFacilityToggle(f.id)}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 cursor-pointer"
                  />
                  <span className={isChecked ? 'font-semibold text-gray-900' : ''}>
                    {f.label}
                  </span>
                </div>
                <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary-500" />
              </label>
            )
          })}
        </div>
      </div>
    </div>
  )
}

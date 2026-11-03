import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Building2,
  Image as ImageIcon,
  IndianRupee,
  Sparkles,
  MapPin,
  Eye,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  UploadCloud,
  Check,
  Bed,
  Phone,
  GraduationCap,
} from 'lucide-react'
import OwnerDashboardLayout from '../../components/layout/OwnerDashboardLayout'
import MultiStepForm from '../../components/forms/MultiStepForm'
import { colleges } from '../../data/colleges'
import notify from '../../components/common/Toast'

const formSteps = [
  { id: 1, title: 'Basic Details' },
  { id: 2, title: 'Upload Photos' },
  { id: 3, title: 'Pricing & Beds' },
  { id: 4, title: 'Amenities' },
  { id: 5, title: 'Campus Location' },
  { id: 6, title: 'Live Preview' },
  { id: 7, title: 'Publish' },
]

export default function OwnerAddProperty() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)

  // Form State
  const [formData, setFormData] = useState({
    name: 'Scholar Haven Residency',
    description:
      'Newly renovated student accommodation located 5 minutes walking distance from college main gate. High-speed 150 Mbps Wi-Fi, 3-time nutritious meals, daily housekeeping, and 24/7 CCTV surveillance.',
    gender: 'Boys',
    type: 'Single & Sharing',
    totalBeds: 16,
    availableBeds: 4,
    rent: 8000,
    deposit: 16000,
    noticePeriod: '1 Month',
    rentIncludes: ['Water', 'High-speed WiFi', 'Electricity Backup', 'Daily Cleaning'],
    facilities: ['WiFi', 'AC', 'Laundry', 'Mess', 'Power Backup', 'CCTV', 'Attached Bathroom', 'Study Room'],
    address: 'Near College Back Gate, Matunga / Shivaji Nagar',
    city: 'Mumbai',
    pincode: '400019',
    nearestCollege: 'VJTI Mumbai',
    distance: '0.4 km',
    contactPhone: '+91 98765 43210',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800',
    ],
  })

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePublish = () => {
    setCurrentStep(7)
    notify.success('🎉 Congratulations! Your PG listing is live on BASERA.')
  }

  return (
    <OwnerDashboardLayout
      title="Add New Student PG / Hostel"
      subtitle="Complete the 7-step wizard to publish vacant beds in under 5 minutes"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Multi Step Progress Bar */}
        <MultiStepForm
          steps={formSteps}
          currentStep={currentStep}
          onStepClick={(step) => setCurrentStep(step)}
        />

        {/* Wizard Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm">
          {/* STEP 1: Basic Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Step 1: Basic Property Details
                </h3>
                <p className="text-xs text-gray-500">
                  Provide clear branding and description so students understand your accommodation
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Property Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Urban Nest Residency"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Gender Policy
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-primary-500"
                    >
                      <option value="Boys">Boys Only</option>
                      <option value="Girls">Girls Only</option>
                      <option value="Unisex">Unisex / Co-ed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Property Category
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-primary-500"
                    >
                      <option value="Single & Sharing">Single & Sharing PG</option>
                      <option value="Student Hostel">Full Student Hostel</option>
                      <option value="Flatmates / Flat">Shared Student Flat</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Description & Key Selling Points
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Mention distance to college gate, food menu, library, quiet environment..."
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm leading-relaxed focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Photos */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Step 2: Upload Real Room & Washroom Photos
                </h3>
                <p className="text-xs text-gray-500">
                  Listings with 3+ real photos receive 4.5x more student visit requests
                </p>
              </div>

              {/* Upload Zone */}
              <div className="p-8 border-2 border-dashed border-gray-300 hover:border-primary-500 bg-gray-50 rounded-2xl text-center cursor-pointer transition-colors">
                <UploadCloud className="w-10 h-10 text-primary-600 mx-auto mb-2" />
                <p className="text-sm font-bold text-gray-800">
                  Drag & Drop photos here, or click to browse
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Upload JPG, PNG (Max 10MB each). Recommended: Bedroom, Washroom, Dining area
                </p>
              </div>

              {/* Photo Previews */}
              <div className="grid grid-cols-3 gap-3">
                {formData.images.map((img, i) => (
                  <div key={i} className="h-28 rounded-xl overflow-hidden relative group border border-gray-200">
                    <img src={img} alt={`Upload ${i}`} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 left-1 text-[9px] bg-black/60 text-white px-1.5 py-0.5 rounded">
                      {i === 0 ? 'Cover Photo' : `Photo ${i + 1}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Pricing & Bed Vacancies */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Step 3: Rent & Available Bed Vacancies
                </h3>
                <p className="text-xs text-gray-500">
                  Accurate bed counts ensure zero wasted inquiries and instant matching
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Monthly Rent (₹ / Bed)
                  </label>
                  <input
                    type="number"
                    value={formData.rent}
                    onChange={(e) => setFormData({ ...formData, rent: Number(e.target.value) })}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Security Deposit (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.deposit}
                    onChange={(e) => setFormData({ ...formData, deposit: Number(e.target.value) })}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Total Bed Capacity
                  </label>
                  <input
                    type="number"
                    value={formData.totalBeds}
                    onChange={(e) => setFormData({ ...formData, totalBeds: Number(e.target.value) })}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                    Currently Available Beds Now
                  </label>
                  <input
                    type="number"
                    value={formData.availableBeds}
                    onChange={(e) => setFormData({ ...formData, availableBeds: Number(e.target.value) })}
                    className="w-full p-3 bg-emerald-50/70 border border-emerald-300 rounded-xl text-sm font-black text-emerald-800 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Facilities */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Step 4: Amenities & Meal Inclusions
                </h3>
                <p className="text-xs text-gray-500">
                  Select all services provided to tenants at no extra charge
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  'WiFi',
                  'AC',
                  'Laundry',
                  'Mess',
                  'Power Backup',
                  'CCTV',
                  'Attached Bathroom',
                  'Parking',
                  'Gym',
                  'Study Room',
                ].map((item) => {
                  const isChecked = formData.facilities.includes(item)
                  return (
                    <label
                      key={item}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer text-xs font-semibold transition-all ${
                        isChecked
                          ? 'border-primary-500 bg-blue-50/60 text-primary-800'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          setFormData((prev) => ({
                            ...prev,
                            facilities: isChecked
                              ? prev.facilities.filter((f) => f !== item)
                              : [...prev.facilities, item],
                          }))
                        }}
                        className="w-4 h-4 text-primary-600 rounded"
                      />
                      <span>{item}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          )}

          {/* STEP 5: Location */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Step 5: Campus Proximity & Address
                </h3>
                <p className="text-xs text-gray-500">
                  This helps students find your PG based on walking distance to their classes
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Nearest College / University Campus
                  </label>
                  <select
                    value={formData.nearestCollege}
                    onChange={(e) => setFormData({ ...formData, nearestCollege: e.target.value })}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-primary-500"
                  >
                    {colleges.map((col) => (
                      <option key={col.id} value={col.short}>
                        {col.short} ({col.city})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Distance to Main Gate
                    </label>
                    <input
                      type="text"
                      value={formData.distance}
                      onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                      placeholder="e.g. 0.4 km"
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Complete Street Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Preview */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Step 6: Student View Preview
                </h3>
                <p className="text-xs text-gray-500">
                  Here is how your PG will appear to students on BASERA search
                </p>
              </div>

              {/* Mock Student Card Preview */}
              <div className="border border-gray-200 rounded-3xl overflow-hidden shadow-md bg-white max-w-md mx-auto">
                <div className="h-44 relative bg-gray-100">
                  <img src={formData.images[0]} alt="preview" className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {formData.gender} PG
                  </div>
                  <div className="absolute bottom-3 left-3 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                    {formData.availableBeds} Beds Vacant
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h4 className="font-bold text-base text-gray-900">{formData.name}</h4>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-primary-500" />
                    <span>{formData.distance} from {formData.nearestCollege}</span>
                  </p>
                  <div className="pt-2 flex items-baseline justify-between border-t border-gray-100">
                    <span className="text-lg font-black text-gray-900">
                      ₹{formData.rent.toLocaleString('en-IN')}/mo
                    </span>
                    <span className="text-xs text-emerald-600 font-bold">
                      Zero Brokerage
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: Publish Success */}
          {currentStep === 7 && (
            <div className="text-center py-8 space-y-5">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                  Your Property is Now Live!
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-md mx-auto">
                  {formData.name} has been published to students near {formData.nearestCollege}. You will receive WhatsApp notifications for new visit appointments.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center pt-4">
                <Link
                  to="/owner/listings"
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                >
                  Manage My Listings
                </Link>
                <Link
                  to="/search"
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl transition-all"
                >
                  View on Public Search
                </Link>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 7 && (
            <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              {currentStep === 6 ? (
                <button
                  type="button"
                  onClick={handlePublish}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Publish Listing Now</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </OwnerDashboardLayout>
  )
}

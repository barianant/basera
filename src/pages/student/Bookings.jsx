import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  QrCode,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ExternalLink,
} from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import EmptyState from '../../components/common/EmptyState'
import Modal from '../../components/common/Modal'
import { useAuth } from '../../context/AuthContext'
import notify from '../../components/common/Toast'

export default function StudentBookings() {
  const { bookings } = useAuth()
  const [selectedPass, setSelectedPass] = useState(null)
  const [activeTab, setActiveTab] = useState('upcoming') // 'upcoming' | 'past'

  const handleCancel = (bookingId) => {
    notify.info(`Visit request #${bookingId} has been cancelled`)
  }

  return (
    <DashboardLayout
      title="My Scheduled Visits"
      subtitle="Manage your in-person PG inspections and digital entry passes"
    >
      <div className="space-y-6">
        {/* Tab Filters */}
        <div className="flex border-b border-gray-200 gap-6 text-sm font-bold">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`pb-3 transition-colors cursor-pointer relative ${
              activeTab === 'upcoming'
                ? 'text-primary-600'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Upcoming Walkthroughs ({bookings.length})
            {activeTab === 'upcoming' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`pb-3 transition-colors cursor-pointer relative ${
              activeTab === 'past'
                ? 'text-primary-600'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Past Inspections (1)
            {activeTab === 'past' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full" />
            )}
          </button>
        </div>

        {activeTab === 'upcoming' ? (
          bookings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Top image & status strip */}
                    <div className="h-40 relative bg-gray-100">
                      <img
                        src={b.image}
                        alt={b.pgName}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
                      
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-xs">
                          {b.status}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3">
                        <button
                          onClick={() => setSelectedPass(b)}
                          className="px-2.5 py-1 bg-white/90 hover:bg-white text-gray-900 rounded-lg text-xs font-bold shadow-xs flex items-center gap-1 cursor-pointer"
                        >
                          <QrCode className="w-3.5 h-3.5 text-primary-600" />
                          <span>Entry QR</span>
                        </button>
                      </div>

                      <div className="absolute bottom-3 left-3 text-white">
                        <h3 className="font-extrabold text-lg leading-tight">
                          {b.pgName}
                        </h3>
                        <p className="text-xs text-blue-100">{b.college}</p>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs pb-3 border-b border-gray-100">
                        <span className="text-gray-500 font-medium">Appointment:</span>
                        <span className="font-bold text-primary-600 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {b.date}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs pb-3 border-b border-gray-100">
                        <span className="text-gray-500 font-medium">Selected Configuration:</span>
                        <span className="font-bold text-gray-800">{b.roomType}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs pb-3 border-b border-gray-100">
                        <span className="text-gray-500 font-medium">Pass Token:</span>
                        <span className="font-mono font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                          {b.tokenNumber}
                        </span>
                      </div>

                      <div className="text-xs text-gray-500 flex items-start gap-1.5 pt-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                        <span>{b.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 bg-slate-50 border-t border-gray-100 grid grid-cols-3 gap-2">
                    <a
                      href={`tel:${b.ownerPhone}`}
                      className="py-2.5 bg-white hover:bg-gray-100 text-gray-800 rounded-xl text-xs font-bold border border-gray-200 text-center transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Call</span>
                    </a>
                    <Link
                      to={`/student/messages?pg=${b.pgId}`}
                      className="py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat</span>
                    </Link>
                    <button
                      onClick={() => handleCancel(b.id)}
                      className="py-2.5 bg-white hover:bg-rose-50 text-rose-600 rounded-xl text-xs font-bold border border-gray-200 text-center transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              preset="no-bookings"
              onAction={() => (window.location.href = '/search')}
            />
          )
        ) : (
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Green Valley PG</h4>
                <p className="text-xs text-gray-500">Visited on 15 Oct, 2024 • Double Sharing Non-AC</p>
                <span className="text-[10px] font-bold text-gray-400 uppercase mt-1 inline-block">
                  Walkthrough Completed
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Digital QR Entry Pass Modal */}
      <Modal
        isOpen={!!selectedPass}
        onClose={() => setSelectedPass(null)}
        title="BASERA Digital Entry Pass"
        description="Show this digital pass to PG security / warden upon arrival"
      >
        {selectedPass && (
          <div className="text-center space-y-4">
            <div className="p-6 bg-slate-50 rounded-2xl border border-gray-200 flex flex-col items-center justify-center">
              {/* Simulated QR Code SVG */}
              <div className="w-44 h-44 bg-white p-3 rounded-2xl border border-gray-300 shadow-inner flex items-center justify-center">
                <div className="w-full h-full bg-slate-900 rounded-lg p-2 text-white flex flex-col items-center justify-center">
                  <QrCode className="w-24 h-24 text-white" />
                  <span className="font-mono text-xs font-bold mt-1 tracking-widest">
                    {selectedPass.tokenNumber}
                  </span>
                </div>
              </div>
              <p className="text-xs font-bold text-gray-900 mt-3">{selectedPass.pgName}</p>
              <p className="text-[11px] text-gray-500">{selectedPass.date}</p>
            </div>

            <div className="text-left text-xs text-gray-600 space-y-1 bg-blue-50/70 p-3.5 rounded-xl border border-blue-100">
              <p><strong>Visitor:</strong> Rahul Verma (COEP)</p>
              <p><strong>Host Contact:</strong> {selectedPass.ownerPhone}</p>
              <p><strong>Premise Address:</strong> {selectedPass.address}</p>
            </div>

            <button
              onClick={() => {
                notify.success('Pass saved to phone gallery')
                setSelectedPass(null)
              }}
              className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  )
}

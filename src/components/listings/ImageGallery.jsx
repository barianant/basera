import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Compass,
} from 'lucide-react'

export default function ImageGallery({ images = [], title = 'PG Gallery' }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const galleryImages =
    images.length > 0
      ? images
      : [
          'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200',
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
          'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800',
          'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
          'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?w=800',
        ]

  const openLightbox = (index) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <>
      {/* Grid Layout (Desktop) */}
      <div className="relative rounded-3xl overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-72 sm:h-96 md:h-[420px]">
          {/* Main Large Image (2 cols) */}
          <div
            onClick={() => openLightbox(0)}
            className="md:col-span-2 h-full relative overflow-hidden group cursor-pointer"
          >
            <img
              src={galleryImages[0]}
              alt={`${title} main`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </div>

          {/* 2 Middle Thumbnails */}
          <div className="hidden md:flex flex-col gap-2 h-full">
            <div
              onClick={() => openLightbox(1)}
              className="flex-1 relative overflow-hidden group cursor-pointer"
            >
              <img
                src={galleryImages[1] || galleryImages[0]}
                alt={`${title} thumb 1`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div
              onClick={() => openLightbox(2)}
              className="flex-1 relative overflow-hidden group cursor-pointer"
            >
              <img
                src={galleryImages[2] || galleryImages[0]}
                alt={`${title} thumb 2`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* 2 Right Thumbnails */}
          <div className="hidden md:flex flex-col gap-2 h-full">
            <div
              onClick={() => openLightbox(3)}
              className="flex-1 relative overflow-hidden group cursor-pointer"
            >
              <img
                src={galleryImages[3] || galleryImages[0]}
                alt={`${title} thumb 3`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div
              onClick={() => openLightbox(4)}
              className="flex-1 relative overflow-hidden group cursor-pointer"
            >
              <img
                src={galleryImages[4] || galleryImages[0]}
                alt={`${title} thumb 4`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Floating View All Photos Button */}
        <button
          onClick={() => openLightbox(0)}
          className="absolute bottom-4 right-4 bg-white/95 hover:bg-white text-gray-900 text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg backdrop-blur-xs flex items-center gap-2 border border-gray-200/80 transition-transform active:scale-95 cursor-pointer"
        >
          <ImageIcon className="w-4 h-4 text-primary-600" />
          <span>View All Photos ({galleryImages.length})</span>
        </button>

        {/* 360 Virtual Tour Button */}
        <div className="absolute top-4 left-4 bg-gray-900/80 hover:bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-md backdrop-blur-xs flex items-center gap-1.5 border border-white/20">
          <Compass className="w-3.5 h-3.5 text-blue-400 animate-spin-slow" />
          <span>360° Bed Tour Available</span>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6">
            {/* Header */}
            <div className="flex items-center justify-between text-white pb-4">
              <span className="text-sm font-semibold">
                Photo {currentIndex + 1} of {galleryImages.length}
              </span>
              <button
                onClick={() => setLightboxOpen(false)}
                className="p-2 text-white/70 hover:text-white bg-white/10 rounded-full cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Stage */}
            <div className="relative flex-1 flex items-center justify-center max-w-5xl mx-auto w-full">
              <motion.img
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                src={galleryImages[currentIndex]}
                alt={`Photo ${currentIndex + 1}`}
                className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl"
              />

              {/* Prev / Next controls */}
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 p-3 bg-white/10 hover:bg-white/25 text-white rounded-full backdrop-blur-sm transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 p-3 bg-white/10 hover:bg-white/25 text-white rounded-full backdrop-blur-sm transition-colors cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Thumbnail Ribbon */}
            <div className="flex items-center justify-center gap-2 pt-4 overflow-x-auto max-w-xl mx-auto">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    currentIndex === i
                      ? 'border-primary-500 scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`thumb ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

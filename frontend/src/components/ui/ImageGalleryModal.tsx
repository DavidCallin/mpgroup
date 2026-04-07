import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageGalleryModalProps {
  images: string[]
  isOpen: boolean
  onClose: () => void
  initialIndex?: number
}

export function ImageGalleryModal({ images, isOpen, onClose, initialIndex = 0 }: ImageGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious()
    if (e.key === 'ArrowRight') goToNext()
    if (e.key === 'Escape') onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-primary/95 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-8 sm:right-8 z-50 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-all group"
          aria-label="Close gallery"
        >
          <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              className="absolute left-4 sm:left-8 z-50 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-white/10 hover:bg-secondary text-white hover:text-primary transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              className="absolute right-4 sm:right-8 z-50 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-white/10 hover:bg-secondary text-white hover:text-primary transition-all"
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>
          </>
        )}

        {/* Main Image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-7xl max-h-[80vh] mx-4 sm:mx-8"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            className="max-w-full max-h-[80vh] object-contain"
          />
          
          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary/80 backdrop-blur-sm px-4 py-2 text-white text-sm font-bold">
            {currentIndex + 1} / {images.length}
          </div>
        </motion.div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 max-w-[90vw] overflow-x-auto px-4 py-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentIndex(index)
                }}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 overflow-hidden transition-all ${
                  index === currentIndex
                    ? 'ring-4 ring-secondary scale-110'
                    : 'ring-2 ring-white/20 hover:ring-white/40 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

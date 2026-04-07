import React, { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnOverlayClick?: boolean
}

export function Modal({ 
  isOpen, 
  onClose, 
  children, 
  size = 'md',
  closeOnOverlayClick = true 
}: ModalProps) {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  }

  // Fermer avec Escape
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeOnOverlayClick ? onClose : undefined}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden`}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// Composants pour structurer le modal
export function ModalHeader({ 
  children, 
  onClose, 
  showCloseButton = true 
}: { 
  children: ReactNode
  onClose?: () => void
  showCloseButton?: boolean 
}) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-100">
      <div className="flex-1">
        {children}
      </div>
      {showCloseButton && onClose && (
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors ml-4"
        >
          <X size={20} />
        </button>
      )}
    </div>
  )
}

export function ModalBody({ children }: { children: ReactNode }) {
  return (
    <div className="p-6 overflow-y-auto max-h-[60vh]">
      {children}
    </div>
  )
}

export function ModalFooter({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50/50">
      {children}
    </div>
  )
}
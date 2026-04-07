import React from 'react'
import { AlertTriangle, Trash2 } from 'lucide-react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal'

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
  itemName?: string
  isLoading?: boolean
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning'
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmer la suppression',
  message,
  itemName,
  isLoading = false,
  confirmText = 'Supprimer',
  cancelText = 'Annuler',
  variant = 'danger'
}: DeleteConfirmationModalProps) {
  
  const defaultMessage = itemName 
    ? `Êtes-vous sûr de vouloir supprimer "${itemName}" ? Cette action est irréversible.`
    : 'Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.'

  const finalMessage = message || defaultMessage

  const handleConfirm = () => {
    onConfirm()
    // Ne pas fermer automatiquement - laisser le parent gérer
  }

  const iconColor = variant === 'danger' ? 'text-red-500' : 'text-orange-500'
  const iconBg = variant === 'danger' ? 'bg-red-50' : 'bg-orange-50'
  const buttonColor = variant === 'danger' 
    ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
    : 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500'

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" closeOnOverlayClick={!isLoading}>
      <ModalHeader onClose={!isLoading ? onClose : undefined} showCloseButton={!isLoading}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center`}>
            <AlertTriangle size={24} className={iconColor} />
          </div>
          <div>
            <h3 className="text-lg font-heading font-bold text-gray-900">
              {title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Action irréversible
            </p>
          </div>
        </div>
      </ModalHeader>

      <ModalBody>
        <div className="text-center">
          <p className="text-gray-700 leading-relaxed text-lg">
            {finalMessage}
          </p>
        </div>
      </ModalBody>

      <ModalFooter>
        <button
          onClick={onClose}
          disabled={isLoading}
          className="px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {cancelText}
        </button>
        
        <button
          onClick={handleConfirm}
          disabled={isLoading}
          className={`px-4 py-2.5 text-white ${buttonColor} rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2 min-w-[120px] justify-center`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Suppression...
            </>
          ) : (
            <>
              <Trash2 size={16} />
              {confirmText}
            </>
          )}
        </button>
      </ModalFooter>
    </Modal>
  )
}
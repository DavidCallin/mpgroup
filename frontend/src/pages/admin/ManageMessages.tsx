import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mail, 
  Search, 
  CheckCircle2, 
  Trash2, 
  Inbox, 
  Calendar, 
  Phone, 
  Building2, 
  Eye,
  Filter,
  ArrowLeft,
  MoreVertical,
  Clock,
  User,
  X,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { DeleteConfirmationModal } from '@/components/ui/DeleteConfirmationModal'
import { Loader } from '@/components/ui/Loader'
import { apiService, Contact, ContactsResponse } from '@/services/api'
import { toast } from 'react-hot-toast'

export default function ManageMessages() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'nouveau' | 'lu'>('all')
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isDeleting, setIsDeleting] = useState<number | null>(null)
  const [isUpdating, setIsUpdating] = useState<number | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; contact: Contact | null }>({ 
    isOpen: false, 
    contact: null 
  })
  const [copiedField, setCopiedField] = useState<string | null>(null)

  // Charger les contacts
  const loadContacts = async (page: number = 1) => {
    try {
      setIsLoading(true)
      const response: ContactsResponse = await apiService.getContacts(page)
      setContacts(response.data)
      setCurrentPage(response.current_page)
      setTotalPages(response.last_page)
    } catch (error) {
      console.error('Error loading contacts:', error)
      toast.error('Erreur lors du chargement des messages')
    } finally {
      setIsLoading(false)
    }
  }

  // Actualiser les contacts
  const handleRefresh = async () => {
    try {
      setIsRefreshing(true)
      const response: ContactsResponse = await apiService.getContacts(currentPage)
      setContacts(response.data)
      setCurrentPage(response.current_page)
      setTotalPages(response.last_page)
      toast.success('Messages actualisés', {
        style: {
          background: '#10B981',
          color: '#ffffff',
          borderRadius: '12px',
        },
        duration: 2000
      })
    } catch (error) {
      console.error('Error refreshing contacts:', error)
      toast.error('Erreur lors de l\'actualisation')
    } finally {
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    loadContacts()
    
    // Raccourci clavier pour actualiser (Ctrl+R ou Cmd+R)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault()
        handleRefresh()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Filtrer les contacts
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      (contact.fullname ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.organization ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.email ?? '').toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = filter === 'all' ? true : contact.contactStatus === filter
    
    const contactDate = new Date(contact.created_at)
    const now = new Date()
    let matchesDateFilter = true
    
    if (dateFilter === 'today') {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      matchesDateFilter = contactDate >= today
    } else if (dateFilter === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      matchesDateFilter = contactDate >= weekAgo
    } else if (dateFilter === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      matchesDateFilter = contactDate >= monthAgo
    }
    
    return matchesSearch && matchesFilter && matchesDateFilter
  })

  // Sélectionner un contact et le marquer comme lu automatiquement
  const handleSelectContact = async (contact: Contact) => {
    setSelectedContact(contact)
    
    // Marquer automatiquement comme lu si c'est un nouveau message
    if (contact.contactStatus === 'nouveau') {
      try {
        setIsUpdating(contact.id)
        await apiService.updateContactStatus(contact.id, 'lu')
        
        // Mettre à jour la liste des contacts
        setContacts(prev => prev.map(c => 
          c.id === contact.id ? { ...c, contactStatus: 'lu' } : c
        ))
        
        // Mettre à jour le contact sélectionné
        setSelectedContact({ ...contact, contactStatus: 'lu' })
        
        toast.success('Message marqué comme lu', {
          style: {
            background: '#10B981',
            color: '#ffffff',
            borderRadius: '12px',
          },
          duration: 2000
        })
      } catch (error) {
        console.error('Error updating contact:', error)
        toast.error('Erreur lors de la mise à jour')
      } finally {
        setIsUpdating(null)
      }
    }
  }

  // Supprimer un contact
  const handleDeleteClick = (contact: Contact) => {
    setDeleteModal({ isOpen: true, contact })
  }

  const handleDeleteConfirm = async () => {
    if (!deleteModal.contact) return
    
    try {
      setIsDeleting(deleteModal.contact.id)
      await apiService.deleteContact(deleteModal.contact.id)
      setContacts(prev => prev.filter(c => c.id !== deleteModal.contact!.id))
      if (selectedContact?.id === deleteModal.contact.id) {
        setSelectedContact(null)
      }
      toast.success('Message supprimé avec succès')
      setDeleteModal({ isOpen: false, contact: null })
    } catch (error) {
      console.error('Error deleting contact:', error)
      toast.error('Erreur lors de la suppression')
    } finally {
      setIsDeleting(null)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, contact: null })
  }

  // Copier dans le presse-papiers
  const handleCopy = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(fieldName)
      toast.success(`${fieldName} copié !`, {
        style: {
          background: '#10B981',
          color: '#ffffff',
          borderRadius: '12px',
        },
        duration: 2000
      })
      
      // Réinitialiser l'état après 2 secondes
      setTimeout(() => {
        setCopiedField(null)
      }, 2000)
    } catch (error) {
      console.error('Erreur lors de la copie:', error)
      toast.error('Erreur lors de la copie')
    }
  }

  // Formater la date avec l'heure
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return "Aujourd'hui à " + date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    if (diffDays === 2) return "Hier à " + date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    if (diffDays <= 7) return `Il y a ${diffDays - 1} jours à ` + date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const newMessagesCount = contacts.filter(c => c.contactStatus === 'nouveau').length
  const processedMessagesCount = contacts.filter(c => c.contactStatus === 'lu').length

  if (selectedContact) {
    return (
      <>
        <div className="space-y-6">
          {/* Header avec bouton retour */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedContact(null)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-primary tracking-tight">
                Message de {selectedContact.fullname}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Reçu le {formatDate(selectedContact.created_at)}
              </p>
            </div>
          </div>

          {/* Détail du message */}
          <div className="bg-white shadow-premium rounded-xl border border-gray-100 overflow-hidden">
            {/* En-tête du message */}
            <div className="p-4 sm:p-6 border-b border-gray-100 bg-gray-50/50">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <User size={18} className="text-primary sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-primary text-lg truncate">{selectedContact.fullname}</h3>
                    {selectedContact.organization && (
                      <p className="text-gray-600 text-sm flex items-center gap-2 truncate">
                        <Building2 size={12} className="shrink-0" />
                        <span className="truncate">{selectedContact.organization}</span>
                      </p>
                    )}
                  </div>
                </div>
                <Badge className={`${
                  selectedContact.contactStatus === 'nouveau' 
                    ? 'bg-secondary/10 text-secondary' 
                    : 'bg-green-500/10 text-green-600'
                } border-none uppercase tracking-wider text-xs font-bold shrink-0 self-start`}>
                  {selectedContact.contactStatus === 'nouveau' ? 'Nouveau' : 'Lu'}
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail size={14} className="shrink-0" />
                  <a href={`mailto:${selectedContact.email}`} className="hover:text-primary transition-colors truncate flex-1">
                    {selectedContact.email}
                  </a>
                  <button
                    onClick={() => handleCopy(selectedContact.email, 'Email')}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-200 shrink-0"
                    title="Copier l'email"
                  >
                    {copiedField === 'Email' ? (
                      <Check size={14} className="text-green-600" />
                    ) : (
                      <Copy size={14} className="text-gray-500 hover:text-primary" />
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone size={14} className="shrink-0" />
                  <a href={`tel:${selectedContact.phone}`} className="hover:text-primary transition-colors flex-1">
                    {selectedContact.phone}
                  </a>
                  <button
                    onClick={() => handleCopy(selectedContact.phone, 'Téléphone')}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-200 shrink-0"
                    title="Copier le numéro"
                  >
                    {copiedField === 'Téléphone' ? (
                      <Check size={14} className="text-green-600" />
                    ) : (
                      <Copy size={14} className="text-gray-500 hover:text-primary" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Contenu du message */}
            <div className="p-4 sm:p-6">
              <h4 className="font-bold text-primary mb-3">Message :</h4>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                  {selectedContact.message}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50/50">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => handleDeleteClick(selectedContact)}
                  disabled={isDeleting === selectedContact.id}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 text-sm font-medium"
                >
                  <Trash2 size={16} />
                  {isDeleting === selectedContact.id ? 'Suppression...' : 'Supprimer'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de confirmation de suppression - Toujours accessible */}
        <DeleteConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          title="Supprimer le message"
          message={deleteModal.contact ? 
            `Supprimer définitivement le message de ${deleteModal.contact.fullname} ?` 
            : 'Supprimer définitivement ce message ?'
          }
          isLoading={isDeleting === deleteModal.contact?.id}
          confirmText="Supprimer"
        />
      </>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header & Stats */}
      <div>
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-primary tracking-tight">
            Gestion des Messages
          </h1>
          
          {/* Bouton d'actualisation */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing || isLoading}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-sm hover:shadow-md"
            title="Actualiser les messages (Ctrl+R)"
          >
            <RefreshCw 
              size={16} 
              className={`text-gray-600 group-hover:text-primary transition-colors ${
                isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'
              } transition-transform duration-500 sm:w-[18px] sm:h-[18px]`} 
            />
            <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-primary transition-colors hidden sm:inline">
              {isRefreshing ? 'Actualisation...' : 'Actualiser'}
            </span>
            {/* Texte mobile plus court */}
            <span className="text-xs font-medium text-gray-700 group-hover:text-primary transition-colors sm:hidden">
              {isRefreshing ? '...' : ''}
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          <div className="bg-white p-4 sm:p-6 shadow-premium border border-gray-100 relative overflow-hidden group hover:border-secondary/20 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 translate-x-8 -translate-y-8 rotate-45 group-hover:scale-150 transition-transform duration-700" />
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-primary/5 text-primary rounded-xl">
                <Inbox size={18} className="sm:w-5 sm:h-5" />
              </div>
              <p className="text-gray-500 font-medium text-xs sm:text-sm uppercase tracking-widest relative z-10">Total</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-3xl sm:text-4xl font-heading font-bold text-primary relative z-10">{contacts.length}</p>
              {isRefreshing && (
                <Loader size={20} className="sm:w-6 sm:h-6" />
              )}
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 shadow-premium border border-gray-100 relative overflow-hidden group hover:border-secondary/20 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 translate-x-8 -translate-y-8 rotate-45 group-hover:scale-150 transition-transform duration-700" />
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-secondary/10 text-secondary rounded-xl">
                <Clock size={18} className="sm:w-5 sm:h-5" />
              </div>
              <p className="text-gray-500 font-medium text-xs sm:text-sm uppercase tracking-widest relative z-10">Nouveaux</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-3xl sm:text-4xl font-heading font-bold text-primary relative z-10">{newMessagesCount}</p>
              {isRefreshing && (
                <Loader size={20} className="sm:w-6 sm:h-6" />
              )}
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 shadow-premium border border-gray-100 relative overflow-hidden group hover:border-secondary/20 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 translate-x-8 -translate-y-8 rotate-45 group-hover:scale-150 transition-transform duration-700" />
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-green-500/5 text-green-600 rounded-xl">
                <CheckCircle2 size={18} className="sm:w-5 sm:h-5" />
              </div>
              <p className="text-gray-500 font-medium text-xs sm:text-sm uppercase tracking-widest relative z-10">Traités</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-3xl sm:text-4xl font-heading font-bold text-primary relative z-10">{processedMessagesCount}</p>
              {isRefreshing && (
                <Loader size={20} className="sm:w-6 sm:h-6" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filtres et recherche modernisés */}
      <div className="bg-white p-4 sm:p-6 shadow-premium rounded-xl border border-gray-100">
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Barre de recherche avec X */}
          <div className="relative">
            <Search size={18} className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 border border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all bg-gray-50/50 text-gray-700 placeholder-gray-400 text-sm sm:text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
                title="Effacer la recherche"
              >
                <X size={14} className="sm:w-4 sm:h-4" />
              </button>
            )}
          </div>
          
          {/* Filtres modernisés - Stack sur mobile */}
          <div className="flex flex-col gap-4">
            {/* Filtres par statut */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                <Filter size={16} />
                <span className="hidden sm:inline">Statut :</span>
                <span className="sm:hidden">Statut</span>
              </div>
              <div className="flex bg-gray-100 rounded-xl sm:rounded-2xl p-1 gap-0.5 sm:gap-1 overflow-x-auto">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    filter === 'all'
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  Tous
                  <span className="ml-1 sm:ml-2 text-xs bg-gray-200 text-gray-600 px-1.5 sm:px-2 py-0.5 rounded-full">
                    {contacts.length}
                  </span>
                </button>
                <button
                  onClick={() => setFilter('nouveau')}
                  className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    filter === 'nouveau'
                      ? 'bg-white text-secondary shadow-sm'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  Nouveaux
                  {newMessagesCount > 0 && (
                    <span className="ml-1 sm:ml-2 text-xs bg-secondary/20 text-secondary px-1.5 sm:px-2 py-0.5 rounded-full font-bold">
                      {newMessagesCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setFilter('lu')}
                  className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    filter === 'lu'
                      ? 'bg-white text-green-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  Traités
                  {processedMessagesCount > 0 && (
                    <span className="ml-1 sm:ml-2 text-xs bg-green-100 text-green-600 px-1.5 sm:px-2 py-0.5 rounded-full">
                      {processedMessagesCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
            
            {/* Filtres par période */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                <Calendar size={16} />
                <span className="hidden sm:inline">Période :</span>
                <span className="sm:hidden">Période</span>
              </div>
              <div className="flex bg-gray-100 rounded-xl sm:rounded-2xl p-1 gap-0.5 sm:gap-1 overflow-x-auto">
                <button
                  onClick={() => setDateFilter('all')}
                  className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    dateFilter === 'all'
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  Toutes
                </button>
                <button
                  onClick={() => setDateFilter('today')}
                  className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    dateFilter === 'today'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  Aujourd'hui
                </button>
                <button
                  onClick={() => setDateFilter('week')}
                  className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    dateFilter === 'week'
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  7 jours
                </button>
                <button
                  onClick={() => setDateFilter('month')}
                  className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    dateFilter === 'month'
                      ? 'bg-white text-orange-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  30 jours
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Indicateur de résultats */}
        {(searchQuery || filter !== 'all' || dateFilter !== 'all') && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-primary">{filteredContacts.length}</span> message{filteredContacts.length !== 1 ? 's' : ''} trouvé{filteredContacts.length !== 1 ? 's' : ''}
                {searchQuery && (
                  <span className="block sm:inline"> pour "<span className="font-medium text-secondary">{searchQuery}</span>"
                  </span>
                )}
                {filter !== 'all' && (
                  <span className="block sm:inline"> - <span className="font-medium text-secondary">
                    {filter === 'nouveau' ? 'Nouveaux' : 'Traités'}
                  </span></span>
                )}
                {dateFilter !== 'all' && (
                  <span className="block sm:inline"> - <span className="font-medium text-blue-600">
                    {dateFilter === 'today' && "Aujourd'hui"}
                    {dateFilter === 'week' && '7 derniers jours'}
                    {dateFilter === 'month' && '30 derniers jours'}
                  </span></span>
                )}
              </p>
              {(searchQuery || filter !== 'all' || dateFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setFilter('all')
                    setDateFilter('all')
                  }}
                  className="text-xs text-gray-500 hover:text-primary transition-colors font-medium flex items-center gap-1 self-start sm:self-auto"
                >
                  <X size={12} />
                  Réinitialiser
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Liste des messages */}
      <div className="bg-white shadow-premium rounded-xl overflow-hidden border border-gray-100">
        {isLoading ? (
          <div className="p-12 text-center">
            <Loader size={48} className="mx-auto mb-4" />
            <p className="text-gray-600">Chargement des messages...</p>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Inbox size={32} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-heading font-bold text-gray-400 mb-2">
              {searchQuery || filter !== 'all' || dateFilter !== 'all' ? 'Aucun résultat' : 'Aucun message'}
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {searchQuery || filter !== 'all' || dateFilter !== 'all'
                ? 'Aucun message ne correspond à vos critères de recherche. Essayez de modifier vos filtres.'
                : 'Les nouveaux messages de contact apparaîtront ici dès qu\'ils seront reçus.'
              }
            </p>
            {(searchQuery || filter !== 'all' || dateFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setFilter('all')
                  setDateFilter('all')
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                <X size={16} />
                Voir tous les messages
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            <AnimatePresence>
              {filteredContacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  className="p-4 sm:p-6 hover:bg-gray-50 transition-all duration-200 cursor-pointer border-l-4 border-transparent hover:border-secondary/30 hover:shadow-md"
                  onClick={() => handleSelectContact(contact)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="relative shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                          <User size={18} className="text-primary sm:w-5 sm:h-5" />
                        </div>
                        {contact.contactStatus === 'nouveau' && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-secondary rounded-full border-2 border-white flex items-center justify-center">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                          <h3 className="font-bold text-primary text-base sm:text-lg truncate">
                            {contact.fullname}
                          </h3>
                          <Badge className={`${
                            contact.contactStatus === 'nouveau' 
                              ? 'bg-secondary/10 text-secondary border border-secondary/20' 
                              : 'bg-green-50 text-green-600 border border-green-200'
                          } uppercase tracking-tighter text-xs font-bold shrink-0 px-2 sm:px-3 py-0.5 sm:py-1 self-start`}>
                            {contact.contactStatus === 'nouveau' ? 'Nouveau' : 'Traité'}
                          </Badge>
                        </div>
                        
                        {contact.organization && (
                          <p className="text-gray-600 text-sm mb-2 flex items-center gap-2 truncate">
                            <Building2 size={12} className="shrink-0" />
                            <span className="truncate">{contact.organization}</span>
                          </p>
                        )}
                        
                        <p className="text-gray-700 text-sm line-clamp-2 mb-3 leading-relaxed">
                          "{contact.message}"
                        </p>
                        
                        {/* Informations de contact - Stack sur mobile */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1.5 truncate">
                            <Mail size={11} className="shrink-0" />
                            <span className="truncate">{contact.email}</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Phone size={11} className="shrink-0" />
                            {contact.phone}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar size={11} className="shrink-0" />
                            {formatDate(contact.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Boutons d'action - Plus compacts sur mobile */}
                    <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-1 ml-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteClick(contact)
                        }}
                        disabled={isDeleting === contact.id}
                        className="p-2 sm:p-2.5 text-red-600 hover:bg-red-50 rounded-lg sm:rounded-xl transition-all duration-200 disabled:opacity-50 hover:scale-105 active:scale-95"
                        title="Supprimer"
                      >
                        <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Pagination modernisée */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => loadContacts(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
          >
            Précédent
          </button>
          
          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let page;
              if (totalPages <= 5) {
                page = i + 1;
              } else if (currentPage <= 3) {
                page = i + 1;
              } else if (currentPage >= totalPages - 2) {
                page = totalPages - 4 + i;
              } else {
                page = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={page}
                  onClick={() => loadContacts(page)}
                  className={`w-10 h-10 rounded-xl transition-all duration-200 text-sm font-medium ${
                    page === currentPage
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => loadContacts(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
          >
            Suivant
          </button>
        </div>
      )}

      {/* Modal de confirmation de suppression - Accessible depuis toutes les vues */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Supprimer le message"
        message={deleteModal.contact ? 
          `Supprimer définitivement le message de ${deleteModal.contact.fullname} ?` 
          : 'Supprimer définitivement ce message ?'
        }
        isLoading={isDeleting === deleteModal.contact?.id}
        confirmText="Supprimer"
      />
    </div>
  )
}
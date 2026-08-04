import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Eye, Trash2, Calendar, MapPin, Users, Euro, FileBarChart, Loader2, X, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'react-hot-toast'
import { apiService, Quote } from '@/services/api'

export default function Quotes() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'nouveau' | 'en_cours' | 'traite' | 'refuse'>('all')
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalQuotes, setTotalQuotes] = useState(0)

  // Charger les devis
  const loadQuotes = async (page: number = 1) => {
    try {
      setIsLoading(true)
      // Pour l'instant, on simule la pagination côté client
      // Plus tard, l'API pourra retourner une structure paginée
      const allQuotes = await apiService.getQuotes(1)
      console.log('Quotes loaded:', allQuotes)
      
      // Simulation de pagination côté client
      const quotesPerPage = 10
      const startIndex = (page - 1) * quotesPerPage
      const endIndex = startIndex + quotesPerPage
      const paginatedQuotes = allQuotes?.slice(startIndex, endIndex) || []
      
      setQuotes(paginatedQuotes)
      setCurrentPage(page)
      setTotalQuotes(allQuotes?.length || 0)
      setTotalPages(Math.ceil((allQuotes?.length || 0) / quotesPerPage))
    } catch (error) {
      console.error('Error loading quotes:', error)
      toast.error('Erreur lors du chargement des devis')
      setQuotes([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadQuotes()
  }, [])

  // Filtrer les devis
  const filteredQuotes = quotes?.filter(quote => {
    const matchesSearch = 
      quote.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.type_evenement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (quote.entreprise && quote.entreprise.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' ? true : quote.statut === statusFilter
    
    return matchesSearch && matchesStatus
  }) || []

  // Debug
  console.log('Quotes:', quotes)
  console.log('Filtered quotes:', filteredQuotes)
  console.log('Search query:', searchQuery)
  console.log('Status filter:', statusFilter)

  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  // Formater le numéro de devis
  const formatQuoteNumber = (id: number) => {
    return `Devis${String(id).padStart(4, '0')}`
  }

  // Obtenir le style du badge selon le statut
  const getStatusBadge = (status: Quote['statut']) => {
    const styles = {
      nouveau: 'bg-blue-500/10 text-blue-600 border-blue-200',
      en_cours: 'bg-orange-500/10 text-orange-600 border-orange-200',
      traite: 'bg-green-500/10 text-green-600 border-green-200',
      refuse: 'bg-red-500/10 text-red-600 border-red-200'
    }
    
    const labels = {
      nouveau: 'Nouveau',
      en_cours: 'En cours',
      traite: 'Traité',
      refuse: 'Refusé'
    }

    return (
      <Badge className={`${styles[status]} border text-xs font-bold uppercase tracking-wider`}>
        {labels[status]}
      </Badge>
    )
  }

  // Badge pour le niveau d'image souhaité
  const getImageBadge = (niveau?: Quote['image_souhaitee']) => {
    if (!niveau) return null
    const styles = {
      basique: 'bg-gray-500/10 text-gray-600 border-gray-200',
      premium: 'bg-secondary/10 text-secondary border-secondary/20',
      prestige: 'bg-primary/10 text-primary border-primary/20',
    }
    return (
      <Badge className={`${styles[niveau]} border text-xs font-bold capitalize`}>
        {niveau}
      </Badge>
    )
  }

  // Badge pour le type d'accès
  const getAccessBadge = (type?: Quote['type_acces']) => {
    if (!type) return null
    return (
      <Badge className={`${
        type === 'billetterie'
          ? 'bg-purple-500/10 text-purple-600 border-purple-200'
          : 'bg-indigo-500/10 text-indigo-600 border-indigo-200'
      } border text-xs font-bold`}>
        {type === 'billetterie' ? 'Billetterie' : 'Invitation'}
      </Badge>
    )
  }

  const openQuoteModal = (quote: Quote) => {
    setSelectedQuote(quote)
    setIsModalOpen(true)
  }

  const closeQuoteModal = () => {
    setSelectedQuote(null)
    setIsModalOpen(false)
  }

  // Marquer un devis comme traité
  const handleMarkAsProcessed = async (quote: Quote) => {
    if (quote.statut === 'traite') return
    
    try {
      setIsUpdating(quote.id)
      await apiService.updateQuoteStatus(quote.id, 'traite')
      
      // Mettre à jour la liste des devis
      setQuotes(prev => prev?.map(q => 
        q.id === quote.id ? { ...q, statut: 'traite' } : q
      ) || [])
      
      toast.success('Devis marqué comme traité', {
        style: {
          background: '#10B981',
          color: '#ffffff',
          borderRadius: '0px',
        }
      })
    } catch (error) {
      console.error('Error updating quote status:', error)
      toast.error('Erreur lors de la mise à jour du statut')
    } finally {
      setIsUpdating(null)
    }
  }

  // Supprimer un devis
  const handleDeleteQuote = async (quote: Quote) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le devis de ${quote.prenom} ${quote.nom} ?`)) {
      return
    }
    
    try {
      setIsDeleting(quote.id)
      await apiService.deleteQuote(quote.id)
      
      // Retirer le devis de la liste
      setQuotes(prev => prev?.filter(q => q.id !== quote.id) || [])
      
      // Recharger la page courante pour maintenir la pagination
      loadQuotes(currentPage)
      
      toast.success('Devis supprimé avec succès', {
        style: {
          background: '#10B981',
          color: '#ffffff',
          borderRadius: '0px',
        }
      })
    } catch (error) {
      console.error('Error deleting quote:', error)
      toast.error('Erreur lors de la suppression')
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-primary mb-2 tracking-tight">
          Gestion des Devis
        </h1>
        <p className="text-gray-600">
          Gérez et suivez toutes les demandes de devis reçues
        </p>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white p-4 sm:p-6 shadow-premium rounded-xl border border-gray-100">
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Barre de recherche avec X */}
          <div className="relative">
            <Search size={18} className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, email, type d'événement..."
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
          
          {/* Filtres par statut */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
              <Filter size={16} />
              <span className="hidden sm:inline">Statut :</span>
              <span className="sm:hidden">Statut</span>
            </div>
            <div className="flex bg-gray-100 rounded-xl sm:rounded-2xl p-1 gap-0.5 sm:gap-1 overflow-x-auto">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  statusFilter === 'all'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                Tous
                <span className="ml-1 sm:ml-2 text-xs bg-gray-200 text-gray-600 px-1.5 sm:px-2 py-0.5 rounded-full">
                  {quotes?.length || 0}
                </span>
              </button>
              <button
                onClick={() => setStatusFilter('nouveau')}
                className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  statusFilter === 'nouveau'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                Nouveaux
                {quotes?.filter(q => q.statut === 'nouveau').length > 0 && (
                  <span className="ml-1 sm:ml-2 text-xs bg-blue-100 text-blue-600 px-1.5 sm:px-2 py-0.5 rounded-full font-bold">
                    {quotes?.filter(q => q.statut === 'nouveau').length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setStatusFilter('en_cours')}
                className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  statusFilter === 'en_cours'
                    ? 'bg-white text-orange-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                En cours
                {quotes?.filter(q => q.statut === 'en_cours').length > 0 && (
                  <span className="ml-1 sm:ml-2 text-xs bg-orange-100 text-orange-600 px-1.5 sm:px-2 py-0.5 rounded-full">
                    {quotes?.filter(q => q.statut === 'en_cours').length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setStatusFilter('traite')}
                className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  statusFilter === 'traite'
                    ? 'bg-white text-green-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                Traités
                {quotes?.filter(q => q.statut === 'traite').length > 0 && (
                  <span className="ml-1 sm:ml-2 text-xs bg-green-100 text-green-600 px-1.5 sm:px-2 py-0.5 rounded-full">
                    {quotes?.filter(q => q.statut === 'traite').length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setStatusFilter('refuse')}
                className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  statusFilter === 'refuse'
                    ? 'bg-white text-red-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                Refusés
                {quotes?.filter(q => q.statut === 'refuse').length > 0 && (
                  <span className="ml-1 sm:ml-2 text-xs bg-red-100 text-red-600 px-1.5 sm:px-2 py-0.5 rounded-full">
                    {quotes?.filter(q => q.statut === 'refuse').length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Indicateur de résultats */}
        {(searchQuery || statusFilter !== 'all') && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-primary">{filteredQuotes?.length || 0}</span> devis trouvé{(filteredQuotes?.length || 0) !== 1 ? 's' : ''}
                {searchQuery && (
                  <span className="block sm:inline"> pour "<span className="font-medium text-secondary">{searchQuery}</span>"
                  </span>
                )}
                {statusFilter !== 'all' && (
                  <span className="block sm:inline"> - <span className="font-medium text-secondary">
                    {statusFilter === 'nouveau' && 'Nouveaux'}
                    {statusFilter === 'en_cours' && 'En cours'}
                    {statusFilter === 'traite' && 'Traités'}
                    {statusFilter === 'refuse' && 'Refusés'}
                  </span></span>
                )}
              </p>
              {(searchQuery || statusFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setStatusFilter('all')
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

      {/* Quotes List */}
      <div className="bg-white shadow-premium border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <Loader2 className="animate-spin mx-auto mb-4 text-gray-400" size={32} />
            <p className="text-gray-500">Chargement des devis...</p>
          </div>
        ) : filteredQuotes?.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FileBarChart size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">Aucun devis trouvé</p>
            <p className="text-sm">
              {searchQuery || statusFilter !== 'all' 
                ? 'Essayez de modifier vos critères de recherche'
                : 'Les demandes de devis apparaîtront ici'
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredQuotes?.map((quote) => (
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs font-mono font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                            Devis N° {formatQuoteNumber(quote.id)}
                          </span>
                          {getImageBadge(quote.image_souhaitee)}
                          {getAccessBadge(quote.type_acces)}
                        </div>
                        <h3 className="font-bold text-primary text-lg">
                          {quote.prenom} {quote.nom}
                        </h3>
                        {quote.entreprise && (
                          <p className="text-sm text-gray-600 font-medium">{quote.entreprise}</p>
                        )}
                        <p className="text-sm text-gray-500">{quote.email}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FileBarChart size={14} />
                        <span className="font-medium">{quote.type_evenement}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar size={14} />
                        <span>{formatDate(quote.date_evenement)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin size={14} />
                        <span>{quote.lieu_evenement}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users size={14} />
                        <span>{quote.nombre_participants} participants</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      {quote.type_acces === 'billetterie' && quote.prix_ticket && (
                        <div className="flex items-center gap-2 text-sm">
                          <Euro size={14} className="text-purple-600" />
                          <span className="font-medium text-purple-600">
                            Ticket: {quote.prix_ticket.toLocaleString('fr-FR')} FCFA
                          </span>
                        </div>
                      )}
                      {quote.budget_estime && (
                        <div className="flex items-center gap-2 text-sm">
                          <Euro size={14} className="text-green-600" />
                          <span className="font-medium text-green-600">
                            Budget MP GROUP: {quote.budget_estime.toLocaleString('fr-FR')} FCFA
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    {getStatusBadge(quote.statut)}
                    
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      {quote.statut !== 'traite' && (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleMarkAsProcessed(quote)
                          }}
                          disabled={isUpdating === quote.id}
                          variant="outline"
                          size="sm"
                          className="border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700 hover:border-green-300 text-xs sm:text-sm"
                        >
                          <CheckCircle2 size={14} className="mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">{isUpdating === quote.id ? 'Traitement...' : 'Marquer traité'}</span>
                          <span className="sm:hidden">{isUpdating === quote.id ? '...' : 'Traité'}</span>
                        </Button>
                      )}
                      <Button
                        onClick={() => openQuoteModal(quote)}
                        variant="outline"
                        size="sm"
                        className="border-primary/20 text-primary hover:bg-primary hover:text-white text-xs sm:text-sm"
                      >
                        <Eye size={14} className="mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Voir détails</span>
                        <span className="sm:hidden">Détails</span>
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteQuote(quote)
                        }}
                        disabled={isDeleting === quote.id}
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 text-xs sm:text-sm"
                      >
                        <Trash2 size={14} className="mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">{isDeleting === quote.id ? 'Suppression...' : 'Supprimer'}</span>
                        <span className="sm:hidden">{isDeleting === quote.id ? '...' : 'Suppr.'}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal pour voir les détails */}
      {isModalOpen && selectedQuote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-primary">
                    Devis N° {formatQuoteNumber(selectedQuote.id)}
                  </h2>
                  <p className="text-xs text-gray-400 font-mono mt-1">ID interne #{selectedQuote.id}</p>
                </div>
                <button
                  onClick={closeQuoteModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-primary mb-3">Informations client</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Nom:</span> {selectedQuote.prenom} {selectedQuote.nom}</p>
                    <p><span className="font-medium">Email:</span> {selectedQuote.email}</p>
                    <p><span className="font-medium">Téléphone:</span> {selectedQuote.telephone}</p>
                    {selectedQuote.entreprise && (
                      <p><span className="font-medium">Entreprise:</span> {selectedQuote.entreprise}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-primary mb-3">Détails événement</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Type:</span> {selectedQuote.type_evenement}</p>
                    <p><span className="font-medium">Date:</span> {formatDate(selectedQuote.date_evenement)}</p>
                    <p><span className="font-medium">Lieu:</span> {selectedQuote.lieu_evenement}</p>
                    <p><span className="font-medium">Participants:</span> {selectedQuote.nombre_participants}</p>
                    {selectedQuote.budget_estime && (
                      <p><span className="font-medium">Budget MP GROUP:</span> {selectedQuote.budget_estime.toLocaleString('fr-FR')} FCFA</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Image souhaitée, type d'accès, prix ticket */}
              {(selectedQuote.image_souhaitee || selectedQuote.type_acces) && (
                <div>
                  <h3 className="font-bold text-primary mb-3">Formule événementielle</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    {selectedQuote.image_souhaitee && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Image souhaitée:</span>
                        {getImageBadge(selectedQuote.image_souhaitee)}
                      </div>
                    )}
                    {selectedQuote.type_acces && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Accès:</span>
                        {getAccessBadge(selectedQuote.type_acces)}
                      </div>
                    )}
                  </div>
                  {selectedQuote.type_acces === 'billetterie' && selectedQuote.prix_ticket && (
                    <p className="text-sm mt-2">
                      <span className="font-medium">Prix du ticket:</span>{' '}
                      <span className="text-purple-600 font-semibold">
                        {selectedQuote.prix_ticket.toLocaleString('fr-FR')} FCFA
                      </span>
                    </p>
                  )}
                </div>
              )}
              
              <div>
                <h3 className="font-bold text-primary mb-3">Description</h3>
                <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
                  {selectedQuote.description}
                </p>
              </div>
              
              {selectedQuote.services_souhaites && selectedQuote.services_souhaites.length > 0 && (
                <div>
                  <h3 className="font-bold text-primary mb-3">Services souhaités</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedQuote.services_souhaites.map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Statut:</span>
                  {getStatusBadge(selectedQuote.statut)}
                </div>
                <div className="text-xs text-gray-400">
                  Reçu le {formatDate(selectedQuote.created_at)}
                </div>
              </div>
              
              {/* Actions dans le modal */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 mt-4">
                {selectedQuote.statut !== 'traite' && (
                  <Button
                    onClick={() => {
                      handleMarkAsProcessed(selectedQuote)
                      closeQuoteModal()
                    }}
                    disabled={isUpdating === selectedQuote.id}
                    className="bg-green-600 text-white hover:bg-green-700 flex-1 sm:flex-none"
                  >
                    <CheckCircle2 size={16} className="mr-2" />
                    {isUpdating === selectedQuote.id ? 'Traitement...' : 'Marquer comme traité'}
                  </Button>
                )}
                <Button
                  onClick={() => {
                    handleDeleteQuote(selectedQuote)
                    closeQuoteModal()
                  }}
                  disabled={isDeleting === selectedQuote.id}
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 flex-1 sm:flex-none"
                >
                  <Trash2 size={16} className="mr-2" />
                  {isDeleting === selectedQuote.id ? 'Suppression...' : 'Supprimer ce devis'}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => loadQuotes(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1 || isLoading}
            className="px-4 py-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 text-sm font-medium"
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
                  onClick={() => loadQuotes(page)}
                  disabled={isLoading}
                  className={`w-10 h-10 rounded-xl transition-all duration-200 text-sm font-medium disabled:opacity-50 ${
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
            onClick={() => loadQuotes(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages || isLoading}
            className="px-4 py-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 text-sm font-medium"
          >
            Suivant
          </button>
        </div>
      )}

      {/* Informations de pagination */}
      {totalQuotes > 0 && (
        <div className="text-center text-sm text-gray-500 mt-4">
          Affichage de {Math.min((currentPage - 1) * 10 + 1, totalQuotes)} à {Math.min(currentPage * 10, totalQuotes)} sur {totalQuotes} devis
        </div>
      )}
    </div>
  )
}
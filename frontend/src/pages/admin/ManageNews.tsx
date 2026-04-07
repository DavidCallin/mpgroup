import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Edit, Trash2, Calendar, Eye, Loader2, RefreshCw, Filter, X, Send } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { DeleteConfirmationModal } from '@/components/ui/DeleteConfirmationModal'
import { Loader } from '@/components/ui/Loader'
import { Link, useNavigate } from '@tanstack/react-router'
import { apiService, Article } from '@/services/api'
import { toast } from 'react-hot-toast'

export default function ManageNews() {
    const navigate = useNavigate()
    const [articles, setArticles] = useState<Article[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')
    const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all')
    const [viewsFilter, setViewsFilter] = useState<'all' | 'popular' | 'recent'>('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; article: Article | null }>({ 
        isOpen: false, 
        article: null 
    })
    const [isDeleting, setIsDeleting] = useState<number | null>(null)
    const [isPublishing, setIsPublishing] = useState<number | null>(null)

    // Charger les articles
    const loadArticles = async (page: number = 1) => {
        try {
            setIsLoading(true)
            const response = await apiService.getArticles(page)
            setArticles(response.data)
            setCurrentPage(response.current_page)
            setTotalPages(response.last_page)
        } catch (error) {
            console.error('Error loading articles:', error)
            toast.error('Erreur lors du chargement des articles')
        } finally {
            setIsLoading(false)
        }
    }

    // Actualiser les articles
    const handleRefresh = async () => {
        try {
            setIsRefreshing(true)
            const response = await apiService.getArticles(currentPage)
            setArticles(response.data)
            setCurrentPage(response.current_page)
            setTotalPages(response.last_page)
            toast.success('Articles actualisés', {
                style: {
                    background: '#10B981',
                    color: '#ffffff',
                    borderRadius: '12px',
                },
                duration: 2000
            })
        } catch (error) {
            console.error('Error refreshing articles:', error)
            toast.error('Erreur lors de l\'actualisation')
        } finally {
            setIsRefreshing(false)
        }
    }

    useEffect(() => {
        loadArticles()
    }, [])

    // Filtrer les articles
    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFilter = filter === 'all' ? true : article.actualiteStatus === filter
        
        // Filtre par date
        const articleDate = new Date(article.actualiteCreatedAt || article.created_at)
        const now = new Date()
        let matchesDateFilter = true
        
        if (dateFilter === 'today') {
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            matchesDateFilter = articleDate >= today
        } else if (dateFilter === 'week') {
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            matchesDateFilter = articleDate >= weekAgo
        } else if (dateFilter === 'month') {
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
            matchesDateFilter = articleDate >= monthAgo
        }
        
        // Filtre par vues
        let matchesViewsFilter = true
        if (viewsFilter === 'popular') {
            matchesViewsFilter = article.nbrViews >= 100 // Articles avec 100+ vues
        } else if (viewsFilter === 'recent') {
            const recentDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            matchesViewsFilter = articleDate >= recentDate
        }
        
        return matchesSearch && matchesFilter && matchesDateFilter && matchesViewsFilter
    })

    // Supprimer un article
    const handleDeleteClick = (article: Article) => {
        setDeleteModal({ isOpen: true, article })
    }

    const handleDeleteConfirm = async () => {
        if (!deleteModal.article) return
        
        try {
            setIsDeleting(deleteModal.article.id)
            await apiService.deleteArticle(deleteModal.article.id)
            setArticles(prev => prev.filter(a => a.id !== deleteModal.article!.id))
            toast.success('Article supprimé avec succès')
            setDeleteModal({ isOpen: false, article: null })
        } catch (error) {
            console.error('Error deleting article:', error)
            toast.error('Erreur lors de la suppression')
        } finally {
            setIsDeleting(null)
        }
    }

    const handleDeleteCancel = () => {
        setDeleteModal({ isOpen: false, article: null })
    }

    // Publier un article
    const handlePublishArticle = async (article: Article) => {
        try {
            setIsPublishing(article.id)
            await apiService.updateArticle(article.id, { actualiteStatus: 'published' })
            
            // Mettre à jour la liste des articles
            setArticles(prev => prev.map(a => 
                a.id === article.id ? { ...a, actualiteStatus: 'published' } : a
            ))
            
            toast.success('Article publié avec succès', {
                style: {
                    background: '#10B981',
                    color: '#ffffff',
                    borderRadius: '12px',
                },
                duration: 3000
            })
        } catch (error) {
            console.error('Error publishing article:', error)
            toast.error('Erreur lors de la publication')
        } finally {
            setIsPublishing(null)
        }
    }

    // Formater la date avec l'heure
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    // Extraire le premier tag comme catégorie
    const getCategory = (tags: string[]) => {
        return tags && tags.length > 0 ? tags[0] : 'Actualité'
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-heading font-bold text-primary tracking-tight">Actualités</h1>
                    <p className="text-gray-500 mt-2">Gérez les articles et publications du MP GROUP.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleRefresh}
                        disabled={isRefreshing || isLoading}
                        className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-sm hover:shadow-md"
                        title="Actualiser les articles"
                    >
                        <RefreshCw 
                            size={18} 
                            className={`text-gray-600 group-hover:text-primary transition-colors ${
                                isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'
                            } transition-transform duration-500`} 
                        />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors hidden sm:inline">
                            {isRefreshing ? 'Actualisation...' : 'Actualiser'}
                        </span>
                    </button>
                    <Link
                        to="/admin/news/new"
                        className="flex items-center gap-2 px-6 py-3 bg-secondary text-primary font-bold rounded-xl hover:bg-secondary/90 shadow-md hover:shadow-premium-hover transition-all group"
                    >
                        <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                        Créer un article
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 shadow-premium relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 translate-x-8 -translate-y-8 rotate-45 group-hover:scale-150 transition-transform duration-700" />
                    <p className="text-gray-500 font-medium text-sm uppercase tracking-widest mb-2 relative z-10">Total</p>
                    <p className="text-4xl font-heading font-bold text-primary relative z-10">{articles.length}</p>
                </div>
                <div className="bg-white p-6 shadow-premium relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 translate-x-8 -translate-y-8 rotate-45 group-hover:scale-150 transition-transform duration-700" />
                    <p className="text-gray-500 font-medium text-sm uppercase tracking-widest mb-2 relative z-10">Publiés</p>
                    <p className="text-4xl font-heading font-bold text-green-600 relative z-10">{articles.filter(a => a.actualiteStatus === 'published').length}</p>
                </div>
                <div className="bg-white p-6 shadow-premium relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gray-500/5 translate-x-8 -translate-y-8 rotate-45 group-hover:scale-150 transition-transform duration-700" />
                    <p className="text-gray-500 font-medium text-sm uppercase tracking-widest mb-2 relative z-10">Brouillons</p>
                    <p className="text-4xl font-heading font-bold text-gray-400 relative z-10">{articles.filter(a => a.actualiteStatus === 'draft').length}</p>
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
                            placeholder="Rechercher un article..."
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
                                        {articles.length}
                                    </span>
                                </button>
                                <button
                                    onClick={() => setFilter('published')}
                                    className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                                        filter === 'published'
                                            ? 'bg-white text-green-600 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                    }`}
                                >
                                    Publiés
                                    {articles.filter(a => a.actualiteStatus === 'published').length > 0 && (
                                        <span className="ml-1 sm:ml-2 text-xs bg-green-100 text-green-600 px-1.5 sm:px-2 py-0.5 rounded-full">
                                            {articles.filter(a => a.actualiteStatus === 'published').length}
                                        </span>
                                    )}
                                </button>
                                <button
                                    onClick={() => setFilter('draft')}
                                    className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                                        filter === 'draft'
                                            ? 'bg-white text-gray-600 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                    }`}
                                >
                                    Brouillons
                                    {articles.filter(a => a.actualiteStatus === 'draft').length > 0 && (
                                        <span className="ml-1 sm:ml-2 text-xs bg-gray-200 text-gray-600 px-1.5 sm:px-2 py-0.5 rounded-full">
                                            {articles.filter(a => a.actualiteStatus === 'draft').length}
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
                        
                        {/* Filtres par popularité */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                            <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                                <Eye size={16} />
                                <span className="hidden sm:inline">Popularité :</span>
                                <span className="sm:hidden">Popularité</span>
                            </div>
                            <div className="flex bg-gray-100 rounded-xl sm:rounded-2xl p-1 gap-0.5 sm:gap-1 overflow-x-auto">
                                <button
                                    onClick={() => setViewsFilter('all')}
                                    className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                                        viewsFilter === 'all'
                                            ? 'bg-white text-primary shadow-sm'
                                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                    }`}
                                >
                                    Tous
                                </button>
                                <button
                                    onClick={() => setViewsFilter('popular')}
                                    className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                                        viewsFilter === 'popular'
                                            ? 'bg-white text-red-600 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                    }`}
                                >
                                    Populaires
                                    <span className="ml-1 text-xs">(100+ vues)</span>
                                </button>
                                <button
                                    onClick={() => setViewsFilter('recent')}
                                    className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                                        viewsFilter === 'recent'
                                            ? 'bg-white text-indigo-600 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                    }`}
                                >
                                    Récents
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Indicateur de résultats */}
                {(searchQuery || filter !== 'all' || dateFilter !== 'all' || viewsFilter !== 'all') && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <p className="text-sm text-gray-600">
                                <span className="font-medium text-primary">{filteredArticles.length}</span> article{filteredArticles.length !== 1 ? 's' : ''} trouvé{filteredArticles.length !== 1 ? 's' : ''}
                                {searchQuery && (
                                    <span className="block sm:inline"> pour "<span className="font-medium text-secondary">{searchQuery}</span>"
                                    </span>
                                )}
                                {filter !== 'all' && (
                                    <span className="block sm:inline"> - <span className="font-medium text-secondary">
                                        {filter === 'published' ? 'Publiés' : 'Brouillons'}
                                    </span></span>
                                )}
                                {dateFilter !== 'all' && (
                                    <span className="block sm:inline"> - <span className="font-medium text-blue-600">
                                        {dateFilter === 'today' && "Aujourd'hui"}
                                        {dateFilter === 'week' && '7 derniers jours'}
                                        {dateFilter === 'month' && '30 derniers jours'}
                                    </span></span>
                                )}
                                {viewsFilter !== 'all' && (
                                    <span className="block sm:inline"> - <span className="font-medium text-red-600">
                                        {viewsFilter === 'popular' && 'Populaires'}
                                        {viewsFilter === 'recent' && 'Récents'}
                                    </span></span>
                                )}
                            </p>
                            {(searchQuery || filter !== 'all' || dateFilter !== 'all' || viewsFilter !== 'all') && (
                                <button
                                    onClick={() => {
                                        setSearchQuery('')
                                        setFilter('all')
                                        setDateFilter('all')
                                        setViewsFilter('all')
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

            {/* Liste des articles */}
            <div className="bg-white shadow-premium rounded-xl overflow-hidden border border-gray-100">
                {/* Articles List */}
                <div className="divide-y divide-gray-50">
                    {isLoading ? (
                        <div className="p-12 text-center">
                            <Loader size={48} className="mx-auto mb-4" />
                            <p className="text-gray-600">Chargement des articles...</p>
                        </div>
                    ) : filteredArticles.length === 0 ? (
                        <div className="p-16 text-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Edit size={32} className="text-gray-300" />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-gray-400 mb-2">
                                {searchQuery || filter !== 'all' || dateFilter !== 'all' || viewsFilter !== 'all' ? 'Aucun résultat' : 'Aucun article'}
                            </h3>
                            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                {searchQuery || filter !== 'all' || dateFilter !== 'all' || viewsFilter !== 'all'
                                    ? 'Aucun article ne correspond à vos critères de recherche. Essayez de modifier vos filtres.'
                                    : 'Les nouveaux articles apparaîtront ici dès qu\'ils seront créés.'
                                }
                            </p>
                            {(searchQuery || filter !== 'all' || dateFilter !== 'all' || viewsFilter !== 'all') && (
                                <button
                                    onClick={() => {
                                        setSearchQuery('')
                                        setFilter('all')
                                        setDateFilter('all')
                                        setViewsFilter('all')
                                    }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-sm font-medium"
                                >
                                    <X size={16} />
                                    Voir tous les articles
                                </button>
                            )}
                        </div>
                    ) : (
                        <AnimatePresence>
                            {filteredArticles.map((article) => (
                                <motion.div
                                    key={article.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    className="group p-4 sm:p-6 hover:bg-gray-50 transition-all duration-200 cursor-pointer border-l-4 border-transparent hover:border-secondary/30 hover:shadow-md"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-start gap-3 flex-1 min-w-0">
                                            {/* Image Handle - Plus petite sur mobile */}
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden rounded-lg bg-gray-100 relative">
                                                {article.image_url ? (
                                                    <img 
                                                        src={article.image_url} 
                                                        alt={article.title} 
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200">
                                                        <div className="text-center">
                                                            <Edit size={16} className="text-gray-300 mx-auto mb-1" />
                                                            <p className="text-xs text-gray-400 font-medium">Pas d'image</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {article.actualiteStatus === 'draft' && (
                                                    <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex items-center justify-center">
                                                        <div className="w-2 h-2 bg-gray-800 rounded-full" />
                                                    </div>
                                                )}
                                                {article.nbrViews >= 100 && (
                                                    <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                                                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 mb-2">
                                                    <h3 className="font-bold text-primary text-sm sm:text-lg line-clamp-2 sm:line-clamp-1 leading-tight flex-1 min-w-0">
                                                        {article.title}
                                                    </h3>
                                                    <div className="flex items-center gap-2 shrink-0">
                                                        <Badge className={`${
                                                            article.actualiteStatus === 'published' 
                                                                ? 'bg-green-50 text-green-600 border border-green-200' 
                                                                : 'bg-gray-50 text-gray-600 border border-gray-200'
                                                        } uppercase tracking-tighter text-xs font-bold px-2 py-0.5`}>
                                                            {article.actualiteStatus === 'published' ? 'Publié' : 'Brouillon'}
                                                        </Badge>
                                                        {article.nbrViews >= 100 && (
                                                            <Badge className="bg-red-50 text-red-600 border border-red-200 text-xs font-bold px-2 py-0.5">
                                                                Populaire
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                {/* Métadonnées - Stack sur mobile */}
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                                                    <span className="flex items-center gap-1.5">
                                                        <Calendar size={12} className="sm:w-[14px] sm:h-[14px]" /> 
                                                        {formatDate(article.created_at)}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Eye size={12} className="sm:w-[14px] sm:h-[14px]" /> 
                                                        {article.nbrViews} vues
                                                    </span>
                                                    {article.tags && article.tags.length > 0 && (
                                                        <div className="flex flex-wrap gap-1 self-start">
                                                            {article.tags.slice(0, 3).map((tag, index) => (
                                                                <Badge key={index} className="bg-secondary/10 text-secondary border-secondary/20 text-xs px-2 py-0.5">
                                                                    {tag}
                                                                </Badge>
                                                            ))}
                                                            {article.tags.length > 3 && (
                                                                <Badge className="bg-gray-100 text-gray-500 border-gray-200 text-xs px-2 py-0.5">
                                                                    +{article.tags.length - 3}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Actions - Plus compactes sur mobile */}
                                        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-1 ml-2">
                                            {/* Bouton publier pour les brouillons */}
                                            {article.actualiteStatus === 'draft' && (
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handlePublishArticle(article)
                                                    }}
                                                    disabled={isPublishing === article.id}
                                                    className="p-2 sm:p-2.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg sm:rounded-xl transition-all duration-200 disabled:opacity-50 hover:scale-105 active:scale-95" 
                                                    title="Publier l'article"
                                                >
                                                    {isPublishing === article.id ? (
                                                        <Loader size={16} className="sm:w-[18px] sm:h-[18px]" />
                                                    ) : (
                                                        <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
                                                    )}
                                                </button>
                                            )}
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    navigate({ to: `/admin/news/${article.id}/edit` })
                                                }}
                                                className="p-2 sm:p-2.5 text-gray-400 hover:text-secondary hover:bg-secondary/10 rounded-lg sm:rounded-xl transition-all duration-200 disabled:opacity-50 hover:scale-105 active:scale-95" 
                                                title="Modifier"
                                            >
                                                <Edit size={16} className="sm:w-[18px] sm:h-[18px]" />
                                            </button>
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleDeleteClick(article)
                                                }}
                                                disabled={isDeleting === article.id}
                                                className="p-2 sm:p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg sm:rounded-xl transition-all duration-200 disabled:opacity-50 hover:scale-105 active:scale-95" 
                                                title="Supprimer"
                                            >
                                                <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                        onClick={() => loadArticles(Math.max(1, currentPage - 1))}
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
                                    onClick={() => loadArticles(page)}
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
                        onClick={() => loadArticles(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages || isLoading}
                        className="px-4 py-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 text-sm font-medium"
                    >
                        Suivant
                    </button>
                </div>
            )}

            {/* Modal de confirmation de suppression */}
            <DeleteConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                title="Supprimer l'article"
                message={deleteModal.article ? 
                    `Supprimer définitivement l'article "${deleteModal.article.title}" ?` 
                    : 'Supprimer définitivement cet article ?'
                }
                isLoading={isDeleting === deleteModal.article?.id}
                confirmText="Supprimer"
            />
        </div>
    )
}

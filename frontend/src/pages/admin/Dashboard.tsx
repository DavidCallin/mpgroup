import { useState, useEffect } from 'react'
import { Inbox, FileText, ArrowRight, Eye, FileBarChart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Link } from '@tanstack/react-router'
import { apiService, Contact, Article, Quote } from '@/services/api'
import { toast } from 'react-hot-toast'

export default function Dashboard() {
    const [contacts, setContacts] = useState<Contact[]>([])
    const [articles, setArticles] = useState<Article[]>([])
    const [quotes, setQuotes] = useState<Quote[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                setIsLoading(true)
                const [contactsResponse, articlesResponse, quotesData] = await Promise.all([
                    apiService.getContacts(1),
                    apiService.getArticles(1),
                    apiService.getQuotes(1).catch(() => [])
                ])
                setContacts(contactsResponse.data)
                setArticles(articlesResponse.data)
                setQuotes(quotesData)
            } catch (error) {
                console.error('Error loading dashboard data:', error)
                toast.error('Erreur lors du chargement des données')
            } finally {
                setIsLoading(false)
            }
        }
        loadDashboardData()
    }, [])

    const newMessagesCount = contacts.filter(c => c.contactStatus === 'nouveau').length
    const publishedArticlesCount = articles.filter(a => a.actualiteStatus === 'published').length
    const totalViews = articles.reduce((sum, a) => sum + a.nbrViews, 0)
    const newQuotesCount = quotes?.filter(q => q.statut === 'nouveau').length || 0

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffDays = Math.ceil(Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
        if (diffDays === 1) return "Aujourd'hui"
        if (diffDays === 2) return "Hier"
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    }

    return (
        <div className="space-y-8">
            {/* Header & Stats */}
            <div>
                <h1 className="text-3xl sm:text-4xl font-heading font-bold text-primary mb-8 tracking-tight">Tableau de Bord</h1>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white p-6 shadow-premium border border-gray-100 animate-pulse">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-11 h-11 bg-gray-200 rounded-xl" />
                                    <div className="h-4 bg-gray-200 rounded w-20" />
                                </div>
                                <div className="h-10 bg-gray-200 rounded w-16" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        <div className="bg-white p-6 shadow-premium border border-gray-100 relative overflow-hidden group hover:border-secondary/20 transition-all">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 translate-x-8 -translate-y-8 rotate-45 group-hover:scale-150 transition-transform duration-700" />
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-primary/5 text-primary rounded-xl"><Inbox size={20} /></div>
                                <p className="text-gray-500 font-medium text-sm uppercase tracking-widest relative z-10">Messages</p>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <p className="text-4xl font-heading font-bold text-primary relative z-10">{contacts.length}</p>
                                {newMessagesCount > 0 && <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">+{newMessagesCount} nouveaux</span>}
                            </div>
                        </div>

                        <div className="bg-white p-6 shadow-premium border border-gray-100 relative overflow-hidden group hover:border-secondary/20 transition-all">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 translate-x-8 -translate-y-8 rotate-45 group-hover:scale-150 transition-transform duration-700" />
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-purple-500/5 text-purple-600 rounded-xl"><FileBarChart size={20} /></div>
                                <p className="text-gray-500 font-medium text-sm uppercase tracking-widest relative z-10">Devis</p>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <p className="text-4xl font-heading font-bold text-primary relative z-10">{quotes?.length || 0}</p>
                                {newQuotesCount > 0 && <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">+{newQuotesCount} nouveaux</span>}
                            </div>
                        </div>

                        <div className="bg-white p-6 shadow-premium border border-gray-100 relative overflow-hidden group hover:border-secondary/20 transition-all">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 translate-x-8 -translate-y-8 rotate-45 group-hover:scale-150 transition-transform duration-700" />
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-secondary/10 text-secondary rounded-xl"><FileText size={20} /></div>
                                <p className="text-gray-500 font-medium text-sm uppercase tracking-widest relative z-10">Articles News</p>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <p className="text-4xl font-heading font-bold text-primary relative z-10">{publishedArticlesCount}</p>
                                <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{articles.length} total</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 shadow-premium border border-gray-100 relative overflow-hidden group hover:border-secondary/20 transition-all">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 translate-x-8 -translate-y-8 rotate-45 group-hover:scale-150 transition-transform duration-700" />
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-green-500/5 text-green-600 rounded-xl"><Eye size={20} /></div>
                                <p className="text-gray-500 font-medium text-sm uppercase tracking-widest relative z-10">Total Lectures</p>
                            </div>
                            <p className="text-4xl font-heading font-bold text-primary relative z-10">{totalViews.toLocaleString()}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Big Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Messages */}
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-secondary rounded-full" />
                            <h2 className="text-xl font-heading font-bold text-primary uppercase tracking-wider">Derniers Messages</h2>
                        </div>
                        <Link to="/admin/messages" className="text-secondary hover:text-primary text-sm font-bold uppercase tracking-widest flex items-center gap-2 group transition-colors">
                            Voir tout <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <div className="bg-white shadow-premium rounded-xl overflow-hidden flex-1 border border-gray-100">
                        {isLoading ? (
                            <div className="divide-y divide-gray-50">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="p-5 animate-pulse">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="h-4 bg-gray-200 rounded w-24" />
                                            <div className="h-3 bg-gray-200 rounded w-16" />
                                        </div>
                                        <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                                        <div className="h-5 bg-gray-200 rounded w-16" />
                                    </div>
                                ))}
                            </div>
                        ) : contacts.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <Inbox size={32} className="mx-auto mb-4 text-gray-300" />
                                <p className="font-medium">Aucun message pour le moment</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {contacts.slice(0, 3).map((contact) => (
                                    <div key={contact.id} className="p-5 hover:bg-gray-50 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-3">
                                                {contact.contactStatus === 'nouveau' && <div className="w-2 h-2 bg-secondary rounded-full" />}
                                                <span className="font-bold text-primary text-sm">{contact.fullname}</span>
                                            </div>
                                            <span className="text-[10px] text-gray-400 font-medium">{formatDate(contact.contactCreatedAt)}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 line-clamp-1 italic mb-2">"{contact.message}"</p>
                                        <div className="flex items-center gap-2">
                                            <Badge className={`${contact.contactStatus === 'nouveau' ? 'bg-secondary/10 text-secondary' : 'bg-gray-100 text-gray-400'} border-none uppercase tracking-tighter text-[9px] font-black`}>
                                                {contact.contactStatus === 'nouveau' ? 'Nouveau' : 'Lu'}
                                            </Badge>
                                            {contact.organization && <span className="text-[10px] text-gray-400 font-medium">{contact.organization}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Devis */}
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-purple-500 rounded-full" />
                            <h2 className="text-xl font-heading font-bold text-primary uppercase tracking-wider">Derniers Devis</h2>
                        </div>
                        <Link to="/admin/quotes" className="text-secondary hover:text-primary text-sm font-bold uppercase tracking-widest flex items-center gap-2 group transition-colors">
                            Voir tout <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <div className="bg-white shadow-premium rounded-xl overflow-hidden flex-1 border border-gray-100">
                        {isLoading ? (
                            <div className="divide-y divide-gray-50">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="p-5 animate-pulse">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="h-4 bg-gray-200 rounded w-24" />
                                            <div className="h-3 bg-gray-200 rounded w-16" />
                                        </div>
                                        <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                                        <div className="h-5 bg-gray-200 rounded w-16" />
                                    </div>
                                ))}
                            </div>
                        ) : !quotes || quotes.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <FileBarChart size={32} className="mx-auto mb-4 text-gray-300" />
                                <p className="font-medium">Aucun devis pour le moment</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {quotes.slice(0, 3).map((quote) => (
                                    <div key={quote.id} className="p-5 hover:bg-gray-50 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-3">
                                                {quote.statut === 'nouveau' && <div className="w-2 h-2 bg-purple-500 rounded-full" />}
                                                <span className="font-bold text-primary text-sm">{quote.nom} {quote.prenom}</span>
                                            </div>
                                            <span className="text-[10px] text-gray-400 font-medium">{formatDate(quote.created_at)}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 line-clamp-1 mb-2">{quote.type_evenement}</p>
                                        <div className="flex items-center gap-2">
                                            <Badge className={`${quote.statut === 'nouveau' ? 'bg-purple-500/10 text-purple-600' : quote.statut === 'traite' ? 'bg-green-500/10 text-green-600' : 'bg-gray-100 text-gray-400'} border-none uppercase tracking-tighter text-[9px] font-black`}>
                                                {quote.statut === 'nouveau' ? 'Nouveau' : quote.statut === 'en_cours' ? 'En cours' : quote.statut === 'traite' ? 'Traité' : 'Refusé'}
                                            </Badge>
                                            {quote.entreprise && <span className="text-[10px] text-gray-400 font-medium">{quote.entreprise}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Actualités */}
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-primary rounded-full" />
                            <h2 className="text-xl font-heading font-bold text-primary uppercase tracking-wider">Vos Actualités</h2>
                        </div>
                        <Link to="/admin/news" className="text-secondary hover:text-primary text-sm font-bold uppercase tracking-widest flex items-center gap-2 group transition-colors">
                            Gérer <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <div className="bg-white shadow-premium rounded-xl overflow-hidden flex-1 border border-gray-100">
                        {isLoading ? (
                            <div className="divide-y divide-gray-50">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="p-5 animate-pulse">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="h-4 bg-gray-200 rounded w-3/4" />
                                            <div className="h-3 bg-gray-200 rounded w-16" />
                                        </div>
                                        <div className="flex items-center gap-4 mt-3">
                                            <div className="h-5 bg-gray-200 rounded w-16" />
                                            <div className="h-3 bg-gray-200 rounded w-20" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>
                                <div className="divide-y divide-gray-50">
                                    {articles.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500">
                                            <FileText size={32} className="mx-auto mb-4 text-gray-300" />
                                            <p className="font-medium">Aucun article pour le moment</p>
                                        </div>
                                    ) : (
                                        articles.slice(0, 3).map((article) => (
                                            <div key={article.id} className="p-5 hover:bg-gray-50 transition-colors">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="font-bold text-primary text-sm line-clamp-1">{article.title}</span>
                                                    <span className="text-[10px] text-gray-400 font-medium shrink-0 ml-4">
                                                        {formatDate(article.actualiteCreatedAt || article.created_at)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 mt-3">
                                                    <Badge className={`${article.actualiteStatus === 'published' ? 'bg-green-500/10 text-green-600' : 'bg-gray-100 text-gray-400'} border-none uppercase tracking-tighter text-[9px] font-black`}>
                                                        {article.actualiteStatus === 'published' ? 'Publié' : 'Brouillon'}
                                                    </Badge>
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                        <Eye size={12} />
                                                        <span>{article.nbrViews} lectures</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <Link
                                    to="/admin/news/new"
                                    className="block p-4 text-center bg-gray-50/50 hover:bg-gray-50 text-gray-400 text-xs font-bold uppercase tracking-[0.2em] transition-colors border-t border-gray-100"
                                >
                                    + Créer un nouvel article
                                </Link>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

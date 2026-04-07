import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useArticles } from '@/contexts/ArticlesContext'
import { useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Newspaper, Calendar, ArrowRight, Eye, Loader2 } from 'lucide-react'
import { Loader } from '@/components/ui/Loader'
import { toast } from 'react-hot-toast'


import newsHeaderImage from '@/assets/photo-1504711434969-e33886168f5c.webp'


export default function News() {
    const { t } = useLanguage()
    const navigate = useNavigate()
    const { cache, loadArticles, loadPopularArticles } = useArticles()
    
    const {
        articles,
        popularArticles,
        currentPage,
        totalPages,
        isLoading,
        isLoadingPopular
    } = cache

    // Charger les articles avec cache
    const handleLoadArticles = async (page: number = 1) => {
        try {
            await loadArticles(page)
        } catch (error) {
            console.error('Error loading articles:', error)
            toast.error('Erreur lors du chargement des articles')
        }
    }

    useEffect(() => {
        handleLoadArticles()
        loadPopularArticles()
    }, [])

    // Formater la date sans l'heure pour le public
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }

    // Extraire le premier tag comme catégorie
    const getCategory = (tags: string[]) => {
        return tags && tags.length > 0 ? tags[0] : 'Actualité'
    }

    // Extraire un extrait du contenu HTML
    const getExcerpt = (htmlContent: string, maxLength: number = 150) => {
        // Supprimer les balises HTML
        const textContent = htmlContent.replace(/<[^>]*>/g, '')
        return textContent.length > maxLength 
            ? textContent.substring(0, maxLength) + '...' 
            : textContent
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Header Section */}
            <section className="relative bg-primary pt-32 pb-20 px-4 sm:px-6 text-white text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className="w-full h-full"
                    >
                        <img
                            src={newsHeaderImage}
                            alt="News Background"
                            className="w-full h-full object-cover opacity-20 brightness-50"
                        />
                    </motion.div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="w-12 h-1 bg-secondary mx-auto mb-8" />
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 tracking-tight">
                            {t('news.title')}
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    {/* Section Les plus lus */}
                    {!isLoadingPopular && popularArticles.length > 0 && (
                        <div className="mb-20">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="text-center mb-12"
                            >
                                <div className="w-12 h-1 bg-secondary mx-auto mb-6" />
                                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-4">
                                    {t('news.popular.title')}
                                </h2>
                                <p className="text-gray-600 max-w-2xl mx-auto">
                                    {t('news.popular.description')}
                                </p>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                                {popularArticles.map((article, idx) => (
                                    <motion.div
                                        key={article.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                                        viewport={{ once: true }}
                                        onClick={() => navigate({ to: '/news/$id', params: { id: article.id.toString() } })}
                                        className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
                                    >
                                        {article.image_url && (
                                            <div className="relative aspect-[4/3] overflow-hidden">
                                                <img
                                                    src={article.image_url}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute top-3 right-3 bg-secondary text-primary px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                                    <Eye size={12} />
                                                    {article.nbrViews}
                                                </div>
                                                <div className="absolute top-3 left-3 bg-primary text-white px-2 py-1 rounded-full text-xs font-bold">
                                                    #{idx + 1}
                                                </div>
                                            </div>
                                        )}
                                        <div className="p-4">
                                            <h3 className="font-heading font-bold text-primary text-sm mb-2 line-clamp-2 group-hover:text-secondary transition-colors leading-tight">
                                                {article.title}
                                            </h3>
                                            <div className="text-xs text-gray-400 mb-2">
                                                {formatDate(article.actualiteCreatedAt || article.created_at)}
                                            </div>
                                            {article.tags && article.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-1">
                                                    {article.tags.slice(0, 2).map((tag, index) => (
                                                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Séparateur */}
                    {!isLoadingPopular && popularArticles.length > 0 && (
                        <div className="border-t border-gray-200 mb-16" />
                    )}

                    {/* Section Tous les articles */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="w-12 h-1 bg-secondary mx-auto mb-6" />
                        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-4">
                            {t('news.all.title')}
                        </h2>
                    </motion.div>
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="text-center">
                                <Loader size={48} className="mx-auto mb-4" />
                                <p className="text-gray-600">Chargement des articles...</p>
                            </div>
                        </div>
                    ) : articles.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Newspaper size={32} className="text-gray-300" />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-gray-400 mb-2">
                                Aucun article disponible
                            </h3>
                            <p className="text-gray-500">
                                Les nouveaux articles apparaîtront ici dès qu'ils seront publiés.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                                {articles.map((article, idx) => (
                                    <motion.div
                                        key={article.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                                        viewport={{ once: true }}
                                        onClick={() => navigate({ to: '/news/$id', params: { id: article.id.toString() } })}
                                        className="group bg-white overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-500 flex flex-col h-full border-t border-gray-100 cursor-pointer"
                                    >
                                        {article.image_url && (
                                            <div className="relative aspect-[16/10] overflow-hidden">
                                                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
                                                <img
                                                    src={article.image_url}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                                                />
                                                {article.nbrViews > 0 && (
                                                    <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1 z-20">
                                                        <Eye size={12} />
                                                        {article.nbrViews}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        <div className="p-8 flex flex-col flex-1">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                                                    {formatDate(article.actualiteCreatedAt || article.created_at)}
                                                </span>
                                                <div className="w-4 h-[1px] bg-secondary" />
                                            </div>
                                            <h3 className="text-xl font-heading font-bold text-primary mb-4 group-hover:text-secondary transition-colors line-clamp-2 leading-tight">
                                                {article.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 leading-relaxed font-light mb-4 line-clamp-3">
                                                {getExcerpt(article.content)}
                                            </p>
                                            {/* Tags */}
                                            {article.tags && article.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mb-6">
                                                    {article.tags.slice(0, 4).map((tag, index) => (
                                                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs font-medium">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                    {article.tags.length > 4 && (
                                                        <span className="bg-gray-200 text-gray-500 px-2 py-1 rounded-md text-xs font-medium">
                                                            +{article.tags.length - 4} tags
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                            <div className="mt-auto flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.2em] group-hover:gap-4 transition-all duration-300">
                                                {t('news.readMore')} <ArrowRight size={14} className="text-secondary" />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-16">
                                    <button
                                        onClick={() => handleLoadArticles(Math.max(1, currentPage - 1))}
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
                                                    onClick={() => handleLoadArticles(page)}
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
                                        onClick={() => handleLoadArticles(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                                    >
                                        Suivant
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    )
}

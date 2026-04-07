import { useState, useEffect } from 'react'
import { useParams, useRouter } from '@tanstack/react-router'
import { useArticles } from '@/contexts/ArticlesContext'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Eye, Share2, Clock, Tag } from 'lucide-react'
import { Loader } from '@/components/ui/Loader'
import { apiService, Article } from '@/services/api'
import { toast } from 'react-hot-toast'


export default function ArticleDetail() {
    const { id } = useParams({ from: '/news/$id' })
    const router = useRouter()
    const { getArticleById, cache } = useArticles()
    const [article, setArticle] = useState<Article | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (id) {
            loadArticle(id)
        }
    }, [id])

    const loadArticle = async (articleId: string) => {
        try {
            setIsLoading(true)
            
            // D'abord essayer de récupérer l'article depuis le cache
            const cachedArticle = getArticleById(parseInt(articleId))
            if (cachedArticle) {
                setArticle(cachedArticle)
                setIsLoading(false)
                return
            }
            
            // Si pas en cache, charger depuis l'API
            const response = await apiService.getArticle(parseInt(articleId))
            setArticle(response)
        } catch (error) {
            console.error('Error loading article:', error)
            toast.error('Erreur lors du chargement de l\'article')
            router.navigate({ to: '/news' })
        } finally {
            setIsLoading(false)
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }

    const getReadingTime = (content: string) => {
        const wordsPerMinute = 200
        const textContent = content.replace(/<[^>]*>/g, '')
        const wordCount = textContent.split(/\s+/).length
        const readingTime = Math.ceil(wordCount / wordsPerMinute)
        return readingTime
    }

    const handleShare = async () => {
        if (navigator.share && article) {
            try {
                await navigator.share({
                    title: article.title,
                    text: article.title,
                    url: window.location.href,
                })
            } catch (error) {
                console.log('Error sharing:', error)
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href)
            toast.success('Lien copié dans le presse-papiers')
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <Loader size={48} className="mx-auto mb-4" />
                    <p className="text-gray-600">Chargement de l'article...</p>
                </div>
            </div>
        )
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-heading font-bold text-gray-800 mb-4">
                        Article non trouvé
                    </h2>
                    <button
                        onClick={() => router.navigate({ to: '/news' })}
                        className="text-primary hover:text-secondary transition-colors"
                    >
                        Retour aux actualités
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Navigation */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
                    <button
                        onClick={() => router.navigate({ to: '/news' })}
                        className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Retour aux actualités</span>
                    </button>
                </div>
            </div>

            {/* Hero Section */}
            {article.image_url ? (
                <section className="relative">
                    <div className="aspect-[21/9] sm:aspect-[21/8] overflow-hidden">
                        <motion.img
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1.5 }}
                            src={article.image_url}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    {/* Article Header */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                        <div className="max-w-4xl mx-auto">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-2xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 leading-tight"
                            >
                                {article.title}
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="flex flex-wrap items-center gap-4 text-white/90 text-sm"
                            >
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    <span>{formatDate(article.actualiteCreatedAt || article.created_at)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    <span>{getReadingTime(article.content)} min de lecture</span>
                                </div>
                                {article.nbrViews > 0 && (
                                    <div className="flex items-center gap-2">
                                        <Eye size={16} />
                                        <span>{article.nbrViews} vues</span>
                                    </div>
                                )}
                                <button
                                    onClick={handleShare}
                                    className="flex items-center gap-2 hover:text-secondary transition-colors ml-auto"
                                >
                                    <Share2 size={16} />
                                    <span>Partager</span>
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="pt-32 pb-16 bg-gray-50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-2xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary mb-4 leading-tight"
                        >
                            {article.title}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex flex-wrap items-center gap-4 text-gray-600 text-sm"
                        >
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span>{formatDate(article.actualiteCreatedAt || article.created_at)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} />
                                <span>{getReadingTime(article.content)} min de lecture</span>
                            </div>
                            {article.nbrViews > 0 && (
                                <div className="flex items-center gap-2">
                                    <Eye size={16} />
                                    <span>{article.nbrViews} vues</span>
                                </div>
                            )}
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-2 hover:text-secondary transition-colors ml-auto"
                            >
                                <Share2 size={16} />
                                <span>Partager</span>
                            </button>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Article Content */}
            <section className="py-12 sm:py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-primary prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:text-secondary prose-img:rounded-xl prose-img:shadow-lg"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    {/* Tags Section */}
                    {article.tags && article.tags.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="mt-12 pt-8 border-t border-gray-200"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Tag size={18} className="text-gray-400" />
                                <span className="text-gray-600 font-medium">Tags</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {article.tags.map((tag, index) => (
                                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Related Articles */}
            {cache.articles.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-4">
                                Articles similaires
                            </h2>
                            <div className="w-16 h-1 bg-secondary mx-auto" />
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {cache.articles.filter(relatedArticle => relatedArticle.id !== article?.id).slice(0, 3).map((relatedArticle, idx) => (
                                <motion.div
                                    key={relatedArticle.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    onClick={() => router.navigate({ to: '/news/$id', params: { id: relatedArticle.id.toString() } })}
                                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                                >
                                    <div className="aspect-[16/10] overflow-hidden">
                                        {relatedArticle.image_url && (
                                            <img
                                                src={relatedArticle.image_url}
                                                alt={relatedArticle.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-heading font-bold text-primary mb-2 line-clamp-2 group-hover:text-secondary transition-colors">
                                            {relatedArticle.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                            {relatedArticle.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                                        </p>
                                        <div className="text-xs text-gray-400">
                                            {formatDate(relatedArticle.actualiteCreatedAt || relatedArticle.created_at)}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}
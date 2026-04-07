import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { apiService, Article, ArticlesResponse } from '@/services/api'

interface ArticlesCache {
  articles: Article[]
  popularArticles: Article[]
  currentPage: number
  totalPages: number
  lastFetch: number
  isLoading: boolean
  isLoadingPopular: boolean
}

interface ArticlesContextType {
  cache: ArticlesCache
  loadArticles: (page?: number, forceRefresh?: boolean) => Promise<void>
  loadPopularArticles: (forceRefresh?: boolean) => Promise<void>
  getArticleById: (id: number) => Article | undefined
  clearCache: () => void
}

const ArticlesContext = createContext<ArticlesContextType | undefined>(undefined)

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes en millisecondes

const initialCache: ArticlesCache = {
  articles: [],
  popularArticles: [],
  currentPage: 1,
  totalPages: 1,
  lastFetch: 0,
  isLoading: false,
  isLoadingPopular: false
}

export function ArticlesProvider({ children }: { children: ReactNode }) {
  const [cache, setCache] = useState<ArticlesCache>(initialCache)

  const isCacheValid = useCallback(() => {
    return Date.now() - cache.lastFetch < CACHE_DURATION
  }, [cache.lastFetch])

  const loadArticles = useCallback(async (page: number = 1, forceRefresh: boolean = false) => {
    // Si on a déjà les données en cache et qu'elles sont valides, ne pas recharger
    if (!forceRefresh && cache.articles.length > 0 && isCacheValid() && page === cache.currentPage) {
      return
    }

    setCache(prev => ({ ...prev, isLoading: true }))

    try {
      const response: ArticlesResponse = await apiService.getArticles(page, 'published')
      
      setCache(prev => ({
        ...prev,
        articles: response.data,
        currentPage: response.current_page,
        totalPages: response.last_page,
        lastFetch: Date.now(),
        isLoading: false
      }))
    } catch (error) {
      console.error('Error loading articles:', error)
      setCache(prev => ({ ...prev, isLoading: false }))
      throw error
    }
  }, [cache.articles.length, cache.currentPage, isCacheValid])

  const loadPopularArticles = useCallback(async (forceRefresh: boolean = false) => {
    // Si on a déjà les articles populaires en cache et qu'ils sont valides, ne pas recharger
    if (!forceRefresh && cache.popularArticles.length > 0 && isCacheValid()) {
      return
    }

    setCache(prev => ({ ...prev, isLoadingPopular: true }))

    try {
      const popularData: Article[] = await apiService.getPopularArticles(5)
      
      setCache(prev => ({
        ...prev,
        popularArticles: popularData,
        lastFetch: Date.now(),
        isLoadingPopular: false
      }))
    } catch (error) {
      console.error('Error loading popular articles:', error)
      setCache(prev => ({ ...prev, isLoadingPopular: false }))
    }
  }, [cache.popularArticles.length, isCacheValid])

  const getArticleById = useCallback((id: number): Article | undefined => {
    // Chercher d'abord dans les articles principaux
    let article = cache.articles.find(a => a.id === id)
    
    // Si pas trouvé, chercher dans les articles populaires
    if (!article) {
      article = cache.popularArticles.find(a => a.id === id)
    }
    
    return article
  }, [cache.articles, cache.popularArticles])

  const clearCache = useCallback(() => {
    setCache(initialCache)
  }, [])

  const value: ArticlesContextType = {
    cache,
    loadArticles,
    loadPopularArticles,
    getArticleById,
    clearCache
  }

  return (
    <ArticlesContext.Provider value={value}>
      {children}
    </ArticlesContext.Provider>
  )
}

export function useArticles() {
  const context = useContext(ArticlesContext)
  if (context === undefined) {
    throw new Error('useArticles must be used within an ArticlesProvider')
  }
  return context
}
import React, { ReactNode } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Loader } from '../ui/Loader'

interface ProtectedRouteProps {
  children: ReactNode
  fallback?: ReactNode
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: '/admin/login' })
    }
  }, [isAuthenticated, isLoading, navigate])

  // Affichage pendant le chargement
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center">
        <div className="text-center">
          <Loader size={48} className="mx-auto mb-4" />
        </div>
      </div>
    )
  }

  // Si non authentifié, afficher le fallback ou rien (redirection en cours)
  if (!isAuthenticated) {
    return fallback || null
  }

  // Si authentifié, afficher le contenu protégé
  return <>{children}</>
}

// Composant pour rediriger les utilisateurs connectés (ex: page de login)
interface PublicOnlyRouteProps {
  children: ReactNode
}

export function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate({ to: '/admin/dashboard' })
    }
  }, [isAuthenticated, isLoading, navigate])

  // Affichage pendant le chargement
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center">
        <div className="text-center">
          <Loader size={48} className="mx-auto mb-4" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  // Si authentifié, ne pas afficher (redirection en cours)
  if (isAuthenticated) {
    return null
  }

  // Si non authentifié, afficher le contenu public
  return <>{children}</>
}
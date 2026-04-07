import { useEffect } from 'react'
import { useLocation } from '@tanstack/react-router'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  type?: string
  keywords?: string
}

export function SEO({
  title = 'MP GROUP | Conseil Stratégique & Événementiel Institutionnel',
  description = 'MP GROUP accompagne les institutions et organisations en Afrique de l\'Ouest avec des services premium d\'événementiel stratégique, conseil institutionnel et partenariats d\'excellence.',
  image = 'https://mpgroup.africa/og-image.jpg',
  type = 'website',
  keywords = 'conseil stratégique, événementiel institutionnel, Afrique, Côte d\'Ivoire'
}: SEOProps) {
  const location = useLocation()
  const url = `https://mpgroup.africa${location.pathname}`

  useEffect(() => {
    // Update document title
    document.title = title

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = true) => {
      const attribute = isProperty ? 'property' : 'name'
      let element = document.querySelector(`meta[${attribute}="${property}"]`)
      
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, property)
        document.head.appendChild(element)
      }
      
      element.setAttribute('content', content)
    }

    // Standard meta tags
    updateMetaTag('description', description, false)
    updateMetaTag('keywords', keywords, false)

    // Open Graph tags
    updateMetaTag('og:title', title)
    updateMetaTag('og:description', description)
    updateMetaTag('og:image', image)
    updateMetaTag('og:url', url)
    updateMetaTag('og:type', type)

    // Twitter tags
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', image)
    updateMetaTag('twitter:url', url)

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)
  }, [title, description, image, type, keywords, url])

  return null
}

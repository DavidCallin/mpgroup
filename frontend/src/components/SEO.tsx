import { useEffect } from 'react'
import { useLocation } from '@tanstack/react-router'

interface AggregateRatingProps {
  ratingValue: number
  reviewCount: number
}

interface SEOProps {
  title?: string
  description?: string
  image?: string
  type?: string
  keywords?: string
  aggregateRating?: AggregateRatingProps // ⬅️ nouveau, optionnel
}

export function SEO({
  title = 'MP GROUP | Conseil Stratégique & Événementiel Institutionnel',
  description = 'MP GROUP accompagne les institutions et organisations en Afrique de l\'Ouest avec des services premium d\'événementiel stratégique, conseil institutionnel et partenariats d\'excellence.',
  image = 'https://mpgroupcompany.com/og-image.jpg',
  type = 'website',
  keywords = 'conseil stratégique, événementiel institutionnel, Afrique, Côte d\'Ivoire',
  aggregateRating,
}: SEOProps) {
  const location = useLocation()
  const url = `https://mpgroupcompany.com${location.pathname}`

  useEffect(() => {
    document.title = title

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

    updateMetaTag('description', description, false)
    updateMetaTag('keywords', keywords, false)
    updateMetaTag('og:title', title)
    updateMetaTag('og:description', description)
    updateMetaTag('og:image', image)
    updateMetaTag('og:url', url)
    updateMetaTag('og:type', type)
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', image)
    updateMetaTag('twitter:url', url)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)

    // --- JSON-LD : Organization + AggregateRating ---
    const scriptId = 'mpgroup-org-schema'
    let script = document.getElementById(scriptId) as HTMLScriptElement | null

    if (aggregateRating && aggregateRating.reviewCount > 0) {
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'MP GROUP',
        url: 'https://mpgroupcompany.com/',
        logo: 'https://mpgroupcompany.com/logo.png',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: aggregateRating.ratingValue,
          reviewCount: aggregateRating.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
      }

      if (!script) {
        script = document.createElement('script')
        script.id = scriptId
        script.type = 'application/ld+json'
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(schema)
    } else if (script) {
      // Pas d'avis publiés : on retire le schema pour ne pas envoyer de fausses données
      script.remove()
    }
  }, [title, description, image, type, keywords, url, aggregateRating])

  return null
}
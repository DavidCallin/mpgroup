import { useEffect } from 'react'

interface SchemaOrgProps {
  type?: 'Organization' | 'LocalBusiness' | 'Event' | 'Article' | 'Person'
  data?: Record<string, any>
}

const defaultOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MP GROUP',
  alternateName: 'Marveen Promise Group',
  url: 'https://mpgroup.africa',
  logo: 'https://mpgroup.africa/logo.png',
  description: 'Leader du conseil stratégique et de l\'événementiel institutionnel en Afrique de l\'Ouest',
  foundingDate: '2010',
  founder: {
    '@type': 'Person',
    name: 'Marveen Promïse AÏNADOU',
    jobTitle: 'CEO & Founder',
    description: 'Experte en événementiel institutionnel et conseil stratégique'
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Cocody Ambassades',
    addressLocality: 'Abidjan',
    addressCountry: 'CI',
    addressRegion: 'Abidjan'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+225-07-00-00-00-00',
    contactType: 'Customer Service',
    email: 'contact@mpgroup.africa',
    availableLanguage: ['French', 'English']
  },
  sameAs: [
    'https://www.linkedin.com/company/mpgroup',
    'https://www.facebook.com/mpgroup',
    'https://wa.me/22507000000000'
  ],
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: '5.316667',
      longitude: '-4.033333'
    },
    geoRadius: '5000000'
  },
  knowsAbout: [
    'Strategic Consulting',
    'Institutional Events',
    'Partnership Development',
    'Corporate Communications',
    'Event Management',
    'Sustainability Consulting'
  ],
  slogan: 'Excellence, Rigueur, Impact',
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: '10-50'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '50'
  }
}

export function SchemaOrg({ type = 'Organization', data }: SchemaOrgProps) {
  useEffect(() => {
    const schemaData = data || defaultOrganizationSchema
    
    // Remove existing schema script if any
    const existingScript = document.querySelector('script[type="application/ld+json"]')
    if (existingScript) {
      existingScript.remove()
    }

    // Create and inject new schema script
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schemaData)
    document.head.appendChild(script)

    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [type, data])

  return null
}

// Helper function to create breadcrumb schema
export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

// Helper function to create event schema
export function createEventSchema(event: {
  name: string
  description: string
  startDate: string
  endDate?: string
  location: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    location: {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Abidjan',
        addressCountry: 'CI'
      }
    },
    image: event.image || 'https://mpgroup.africa/og-image.jpg',
    organizer: {
      '@type': 'Organization',
      name: 'MP GROUP',
      url: 'https://mpgroup.africa'
    }
  }
}

// Helper function to create article schema
export function createArticleSchema(article: {
  title: string
  description: string
  author: string
  datePublished: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author
    },
    datePublished: article.datePublished,
    publisher: {
      '@type': 'Organization',
      name: 'MP GROUP',
      logo: {
        '@type': 'ImageObject',
        url: 'https://mpgroup.africa/logo.png'
      }
    },
    image: article.image || 'https://mpgroup.africa/og-image.jpg'
  }
}

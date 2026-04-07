import { useEffect } from 'react'
import { useLocation } from '@tanstack/react-router'

// Google Analytics tracking ID - Replace with your actual ID
const GA_MEASUREMENT_ID = 'GA_MEASUREMENT_ID'

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
    dataLayer?: any[]
  }
}

export function useAnalytics() {
  const location = useLocation()

  useEffect(() => {
    // Track page views on route change
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname,
        page_title: document.title,
        page_location: window.location.href
      })
    }
  }, [location])

  // Helper functions for tracking events
  const trackEvent = (
    eventName: string,
    eventParams?: Record<string, any>
  ) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, eventParams)
    }
  }

  const trackButtonClick = (buttonName: string, location?: string) => {
    trackEvent('button_click', {
      button_name: buttonName,
      button_location: location || 'unknown'
    })
  }

  const trackFormSubmit = (formName: string, success: boolean) => {
    trackEvent('form_submit', {
      form_name: formName,
      success: success
    })
  }

  const trackDownload = (fileName: string, fileType: string) => {
    trackEvent('file_download', {
      file_name: fileName,
      file_type: fileType
    })
  }

  const trackOutboundLink = (url: string, linkText?: string) => {
    trackEvent('outbound_link', {
      link_url: url,
      link_text: linkText || url
    })
  }

  const trackServiceView = (serviceName: string) => {
    trackEvent('service_view', {
      service_name: serviceName
    })
  }

  const trackPortfolioView = (projectName: string, category: string) => {
    trackEvent('portfolio_view', {
      project_name: projectName,
      project_category: category
    })
  }

  return {
    trackEvent,
    trackButtonClick,
    trackFormSubmit,
    trackDownload,
    trackOutboundLink,
    trackServiceView,
    trackPortfolioView
  }
}

// HOC to wrap components with analytics
export function withAnalytics<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) {
  return function AnalyticsWrapper(props: P) {
    const { trackEvent } = useAnalytics()

    useEffect(() => {
      trackEvent('component_view', {
        component_name: componentName
      })
    }, [trackEvent])

    return <Component {...props} />
  }
}

import { useState, useEffect } from 'react'
import { Cookie } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { cn } from '@/lib/utils'

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1000)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-7xl mx-auto">
        <div className={cn(
          "bg-white border-2 border-primary shadow-2xl rounded-lg p-4 sm:p-5 md:p-6 lg:p-8",
          "flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-5 md:gap-6"
        )}>
          <div className="flex items-start gap-3 sm:gap-4 flex-1 w-full">
            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-secondary/10 rounded-full flex items-center justify-center">
              <Cookie className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-heading font-bold text-primary mb-1 sm:mb-2">
                {t('cookie.title')}
              </h3>
              <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">
                {t('cookie.description')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto md:flex-shrink-0">
            <button
              onClick={handleDecline}
              className="flex-1 md:flex-none px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-medium text-primary border-2 border-primary hover:bg-primary/5 transition-colors rounded whitespace-nowrap"
            >
              {t('cookie.decline')}
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 md:flex-none px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-bold bg-secondary text-primary hover:bg-secondary/90 transition-colors rounded whitespace-nowrap"
            >
              {t('cookie.accept')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

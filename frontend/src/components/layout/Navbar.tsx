import { useState, useEffect } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/contexts/LanguageContext'
import { NavLanguageSelector } from '@/components/ui/NavLanguageSelector'
import { LanguageSelector } from '@/components/ui/LanguageSelector'
import logoLight from '@/assets/MP_group_logo_horizontale_sf2-8.png'
import logoDark from '@/assets/MP_group_logo_horizontale_sf1-8.png'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentHash, setCurrentHash] = useState('')
  const { t } = useLanguage()
  const location = useLocation()

  const isAdminLogin = location.pathname === '/admin/login'
  
  // Détecter les routes inexistantes (404) en listant toutes les routes valides
  const validRoutes = [
    '/',
    '/group', 
    '/expertises',
    '/services',
    '/portfolio',
    '/founder',
    '/news',
    '/contact',
    '/devis',
    '/privacy-policy',
    '/terms-of-service',
    '/admin/login',
    '/admin/forgot-password',
    '/admin/reset-link-sent',
    '/admin/reset-password',
    '/activites',
  ]
  
  const isValidRoute = validRoutes.includes(location.pathname) || 
                      location.pathname.startsWith('/news/') ||
                      location.pathname.startsWith('/admin/')
  
  // Si ce n'est pas une route valide, c'est une 404 -> navbar en mode scrolled
  const navbarScrolled = scrolled || !isValidRoute

  const navLinks = [
    { name: t('nav.home'), to: '/' },
    { name: t('nav.group'), to: '/group' },
    { name: t('nav.services'), to: '/expertises' },
    { name: t('nav.portfolio'), to: '/portfolio' },
    { name: t('nav.founder'), to: '/founder' },
    { name: t('nav.news'), to: '/news' },
    { name: 'Activités', to: '/activites' },
    { name: t('nav.avis'), to: '/avis' },
    { name: t('nav.contact'), to: '/contact' },
    
    
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    const handleHashChange = () => {
      setCurrentHash(window.location.hash)
    }

    // Set initial hash
    setCurrentHash(window.location.hash)

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  // Update hash when location changes
  useEffect(() => {
    setCurrentHash(window.location.hash)
  }, [location])

  // Hide Navbar completely on all admin routes except the login page
  if (location.pathname.startsWith('/admin') && !isAdminLogin) {
    return null
  }

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 md:px-12 lg:px-16',
        navbarScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm py-2'
          : isAdminLogin
            ? 'bg-primary py-5 border-b border-white/10'
            : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-[1700px] mx-auto flex items-center justify-between ">
        <Link to="/" className="flex items-center group mt-6 lg:mt-0 mr-6 xl:mr-12">
          <div className="transition-all duration-300">
            <img
              src={navbarScrolled ? logoDark : logoLight}
              alt="MP Group"
              className="h-5 sm:h-7 lg:h-9 w-auto object-contain transition-all duration-300"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-8">
          {isAdminLogin ? (
            <Link
              to="/"
              className={cn(
                "px-6 xl:px-8 py-3 text-xs font-bold transition-all whitespace-nowrap tracking-widest border border-transparent rounded-lg",
                navbarScrolled
                  ? "bg-primary text-white hover:bg-transparent hover:border-primary hover:text-primary"
                  : "bg-secondary text-primary hover:bg-transparent hover:border-secondary hover:text-secondary"
              )}
            >
              RETOUR AU SITE
            </Link>
          ) : (
            <>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="relative group"
                  >
                    <span className={cn(
                      "text-sm font-medium transition-colors whitespace-nowrap",
                      navbarScrolled ? "text-primary" : "text-white/90",
                      isActive && "text-secondary font-semibold",
                      !isActive && "group-hover:text-secondary"
                    )}>
                      {link.name}
                    </span>
                    {/* Underline animation */}
                    <span className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-secondary transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )} />
                  </Link>
                )
              })}
              <NavLanguageSelector scrolled={navbarScrolled} />
              <Link
                to="/contact"
                className={cn(
                  "px-6 xl:px-8 py-3 text-xs font-bold transition-all whitespace-nowrap tracking-widest border border-transparent",
                  navbarScrolled
                    ? "bg-primary text-white hover:bg-transparent hover:border-primary hover:text-primary"
                    : "bg-secondary text-primary hover:bg-transparent hover:border-secondary hover:text-secondary"
                )}
              >
                {t('common.contactUs').toUpperCase()}
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle & Direct Link */}
        {!isAdminLogin ? (
          <button
            className={cn(
              "lg:hidden p-2 transition-colors",
              navbarScrolled ? "text-primary" : "text-white"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        ) : (
          <Link
            to="/"
            className={cn(
              "lg:hidden px-4 py-2 text-xs font-bold transition-all whitespace-nowrap tracking-widest border border-transparent rounded-lg",
              navbarScrolled
                ? "bg-primary text-white hover:bg-transparent hover:border-primary hover:text-primary"
                : "bg-secondary text-primary hover:bg-transparent hover:border-secondary hover:text-secondary"
            )}
          >
            RETOUR
          </Link>
        )}
      </div>

      {/* Mobile Nav */}
      {!isAdminLogin && (
        <div
          className={cn(
            "absolute top-full left-0 right-0 bg-primary/95 backdrop-blur-sm z-40 transition-all duration-300 lg:hidden overflow-hidden",
            isOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-4 sm:px-6 py-6 space-y-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block relative group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className={cn(
                    "block text-base sm:text-lg font-medium transition-colors py-2",
                    isActive ? "text-secondary font-semibold" : "text-white group-hover:text-secondary"
                  )}>
                    {link.name}
                  </span>
                  {/* Underline for mobile */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-secondary" />
                  )}
                </Link>
              )
            })}
            <div className="pt-3 border-t border-white/20">
              <LanguageSelector />
            </div>
            <Link
              to="/contact"
              className="block mt-3 px-6 py-3 bg-secondary text-primary font-bold text-center rounded"
              onClick={() => setIsOpen(false)}
            >
              {t('common.contactUs').toUpperCase()}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

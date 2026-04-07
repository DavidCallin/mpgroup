import { Link, useLocation } from '@tanstack/react-router'
import { Linkedin, Facebook, Mail, MapPin, Phone } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '@/contexts/LanguageContext'
import logo from '@/assets/mp_group_logo1.png'

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()
  const location = useLocation()

  // Hide footer on all admin routes
  if (location.pathname.startsWith('/admin')) {
    return null
  }

  return (
    <footer className="bg-primary text-white pt-24 pb-12 px-4 sm:px-8 md:px-12 lg:px-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
      <div className="max-w-[1700px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16 md:mb-24">

        <div className="flex flex-col gap-4 sm:gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary rounded-lg p-1">
              <img
                src={logo}
                alt="MP Group"
                className="h-5 sm:h-8 w-auto object-contain"
              />
            </div>
          </Link>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs font-light italic">
            {t('footer.description')}
          </p>
          <div className="flex gap-3 sm:gap-4">
            <a href="https://www.linkedin.com/in/marveen-promise-ainadou/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
              <Linkedin size={16} className="sm:w-5 sm:h-5" />
            </a>
            <a href="https://www.facebook.com/marveen.ainadou" target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
              <Facebook size={16} className="sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-heading font-bold text-base sm:text-lg mb-6 sm:mb-8 text-secondary">{t('footer.sitemap')}</h4>
          <ul className="flex flex-col gap-4">
            <li><Link to="/" className="text-sm text-white/60 hover:text-secondary transition-all hover:pl-2">{t('nav.home')}</Link></li>
            <li><Link to="/group" className="text-sm text-white/60 hover:text-secondary transition-all hover:pl-2">{t('nav.group')}</Link></li>
            <li><Link to="/expertises" className="text-sm text-white/60 hover:text-secondary transition-all hover:pl-2">{t('nav.services')}</Link></li>
            <li><Link to="/portfolio" className="text-sm text-white/60 hover:text-secondary transition-all hover:pl-2">{t('nav.portfolio')}</Link></li>
            <li><Link to="/founder" className="text-sm text-white/60 hover:text-secondary transition-all hover:pl-2">{t('nav.founder')}</Link></li>
            <li><Link to="/news" className="text-sm text-white/60 hover:text-secondary transition-all hover:pl-2">{t('nav.news')}</Link></li>
            <li><Link to="/contact" className="text-sm text-white/60 hover:text-secondary transition-all hover:pl-2">{t('nav.contact')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold text-base sm:text-lg mb-6 sm:mb-8 text-secondary">{t('footer.expertise')}</h4>
          <ul className="flex flex-col gap-3 sm:gap-4">
            <li><Link to="/expertises" className="text-sm sm:text-base text-white/70 hover:text-white transition-colors">{t('footer.expertise.events')}</Link></li>
            <li><Link to="/expertises" className="text-sm sm:text-base text-white/70 hover:text-white transition-colors">{t('footer.expertise.consulting')}</Link></li>
            <li><Link to="/expertises" className="text-sm sm:text-base text-white/70 hover:text-white transition-colors">{t('footer.expertise.partnerships')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold text-base sm:text-lg mb-6 sm:mb-8 text-secondary">{t('footer.contact')}</h4>
          <ul className="flex flex-col gap-4 sm:gap-6">
            <li className="flex items-start gap-3 sm:gap-4 text-xs sm:text-sm">
              <MapPin size={18} className="text-secondary shrink-0 sm:w-5 sm:h-5" />
              <span className="text-white/70 leading-relaxed">
                Haie vive<br />
                Cotonou, Bénin
              </span>
            </li>
            <li className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
              <Phone size={18} className="text-secondary shrink-0 sm:w-5 sm:h-5" />
              <span className="text-white/70">+229 01 67 27 06 36</span>
            </li>
            <li className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
              <Mail size={18} className="text-secondary shrink-0 sm:w-5 sm:h-5" />
              <span className="text-white/70">mpgroupcompany1@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1700px] mx-auto pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4">
        <p className="text-white/40 text-xs text-center">
          © {currentYear} MP GROUP. {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}

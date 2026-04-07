import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import PortfolioHero from '@/components/portfolio/PortfolioHero'
import PortfolioGallery from '@/components/portfolio/PortfolioGallery'

export default function Portfolio() {
  const { t } = useLanguage()

  return (
    <div className="bg-white min-h-screen">
      <PortfolioHero />
      <PortfolioGallery />
    </div>
  )
}

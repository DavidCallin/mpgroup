import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

// Import images
import p1 from '@/assets/portfolio_asset/portfolio-1.jpeg'
import p2 from '@/assets/portfolio_asset/portfolio-2.jpeg'
import p3 from '@/assets/portfolio_asset/portfolio-3.jpeg'
import p4 from '@/assets/portfolio_asset/portfolio-4.jpeg'
import p5 from '@/assets/portfolio_asset/portfolio-5.jpeg'
import p6 from '@/assets/portfolio_asset/portfolio-6.jpeg'
import p7 from '@/assets/portfolio_asset/portfolio-7.jpeg'
import p8 from '@/assets/portfolio_asset/portfolio-8.jpeg'
import p9 from '@/assets/portfolio_asset/portfolio-9.jpeg'
import p10 from '@/assets/portfolio_asset/portfolio-10.jpeg'
import p11 from '@/assets/portfolio_asset/portfolio-11.jpeg'
import p12 from '@/assets/portfolio_asset/portfolio-12.jpeg'
import p14 from '@/assets/portfolio_asset/portfolio-14.jpeg'
import p15 from '@/assets/portfolio_asset/portfolio-15.jpeg'
import p16 from '@/assets/portfolio_asset/portfolio-16.jpeg'
import p17 from '@/assets/portfolio_asset/portfolio-17.jpeg'
import p18 from '@/assets/portfolio_asset/portfolio-18.jpeg'
import p19 from '@/assets/portfolio_asset/portfolio-19.jpeg'
import p20 from '@/assets/portfolio_asset/portfolio-20.jpeg'
import p21 from '@/assets/portfolio_asset/portfolio-21.jpeg'
import p22 from '@/assets/portfolio_asset/portfolio-22.jpeg'
import p23 from '@/assets/portfolio_asset/portfolio-23.jpeg'
import p24 from '@/assets/portfolio_asset/portfolio-24.jpeg'
import p25 from '@/assets/portfolio_asset/portfolio-25.jpeg'
import p26 from '@/assets/portfolio_asset/portfolio-26.jpeg'
import p27 from '@/assets/portfolio_asset/portfolio-27.jpeg'
import p28 from '@/assets/portfolio_asset/portfolio-28.jpeg'
import p29 from '@/assets/portfolio_asset/portfolio-29.jpeg'
import p30 from '@/assets/portfolio_asset/portfolio-30.jpeg'
import p31 from '@/assets/portfolio_asset/portfolio-31.jpeg'

interface Project {
  id: number
  cat: string
  title: string
  desc: string
  images: string[]
  role?: string
  date?: string
  location?: string
  result?: string
  award?: string
}

export default function PortfolioGallery() {
  const { t } = useLanguage()
  const [currentImageIndexes, setCurrentImageIndexes] = useState<Record<number, number>>({})
  const [isPaused, setIsPaused] = useState<Record<number, boolean>>({})

  const projects: Project[] = [
    // Events
    { id: 1, cat: 'events', title: t('portfolio.event.montreux.title'), desc: t('portfolio.event.montreux.desc'), images: [p23, p25, p26], role: t('portfolio.event.montreux.role'), date: t('portfolio.event.montreux.date'), location: t('portfolio.event.montreux.location'), result: t('portfolio.event.comedy.result') },
    { id: 2, cat: 'events', title: t('portfolio.event.partouche.title'), desc: t('portfolio.event.partouche.desc'), images: [p21, p20, p24, p22], role: t('portfolio.event.partouche.role'), date: t('portfolio.event.partouche.date'), location: t('portfolio.event.partouche.location') },
    { id: 3, cat: 'events', title: t('portfolio.event.reine.title'), desc: t('portfolio.event.reine.desc'), images: [p28, p27, p30], role: t('portfolio.event.reine.role'), location: t('portfolio.event.reine.location') },
    { id: 4, cat: 'events', title: t('portfolio.event.comedy.title'), desc: t('portfolio.event.comedy.desc'), images: [p10, p9, p11, p29], role: t('portfolio.event.comedy.role'), result: t('portfolio.event.comedy.result') },
    { id: 5, cat: 'events', title: t('portfolio.event.asworld.title'), desc: t('portfolio.event.asworld.desc'), images: [p5, p4, p3, p2], role: t('portfolio.event.asworld.role'), result: t('portfolio.event.asworld.result') },
    { id: 11, cat: 'events', title: t('portfolio.event.workshop.title'), desc: t('portfolio.event.workshop.desc'), images: [p6, p8, p1, p7], role: t('portfolio.event.workshop.role'), date: t('portfolio.event.workshop.date'), result: t('portfolio.event.workshop.result') },
    { id: 12, cat: 'events', title: t('portfolio.event.meetjuice.title'), desc: t('portfolio.event.meetjuice.desc'), images: [p18, p19, p17], role: t('portfolio.event.meetjuice.role'), date: t('portfolio.event.meetjuice.date') },
    { id: 13, cat: 'events', title: t('portfolio.event.dictionnaire.title'), desc: t('portfolio.event.dictionnaire.desc'), images: [p31], role: t('portfolio.event.dictionnaire.role'), location: t('portfolio.event.dictionnaire.location') },
    { id: 14, cat: 'events', title: t('portfolio.event.chariow.title'), desc: t('portfolio.event.chariow.desc'), images: [p16, p12, p14, p15], role: t('portfolio.event.chariow.role'), result: t('portfolio.event.chariow.result') },
  ]

  const goToNextImage = (projectId: number, totalImages: number) => {
    setCurrentImageIndexes(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) + 1) % totalImages
    }))
  }

  const goToPrevImage = (projectId: number, totalImages: number) => {
    setCurrentImageIndexes(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) - 1 + totalImages) % totalImages
    }))
  }

  const getCurrentImageIndex = (projectId: number) => {
    return currentImageIndexes[projectId] || 0
  }

  // Autoplay pour les carrousels
  useEffect(() => {
    const intervals: number[] = []

    projects.forEach(project => {
      if (project.images.length > 1 && !isPaused[project.id]) {
        const interval = setInterval(() => {
          goToNextImage(project.id, project.images.length)
        }, 3000) // Change d'image toutes les 3 secondes
        intervals.push(interval as unknown as number)
      }
    })

    return () => {
      intervals.forEach(interval => clearInterval(interval))
    }
  }, [isPaused, currentImageIndexes])

  return (
    <section className="py-16 sm:py-32 px-4 sm:px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-primary font-bold mb-4 sm:mb-6 max-w-4xl mx-auto italic">
              {t('portfolio.page.intro')}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
          <AnimatePresence mode="wait">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group"
              >
                <div
                  className="relative aspect-[16/10] overflow-hidden mb-8 shadow-premium transition-all duration-700 hover:shadow-premium-hover group bg-primary/5"
                  onMouseEnter={() => setIsPaused(prev => ({ ...prev, [project.id]: true }))}
                  onMouseLeave={() => setIsPaused(prev => ({ ...prev, [project.id]: false }))}
                >
                  <AnimatePresence initial={false}>
                    <motion.img
                      key={`${project.id}-${getCurrentImageIndex(project.id)}`}
                      src={project.images[getCurrentImageIndex(project.id)]}
                      alt={project.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-transparent transition-all duration-700 pointer-events-none" />

                  {/* Badge catégorie */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                    <Badge className="bg-white/90 text-primary border-none rounded-none px-3 sm:px-4 py-1 text-[9px] sm:text-[10px] tracking-widest font-bold uppercase backdrop-blur-sm">
                      {t(`portfolio.cat.${project.cat}`)}
                    </Badge>
                  </div>

                  {/* Navigation flèches - visible seulement si plusieurs images */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          goToPrevImage(project.id, project.images.length)
                        }}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-secondary/90 hover:bg-secondary text-white flex items-center justify-center opacity-70 group-hover:opacity-100 transition-all duration-300 z-10 shadow-lg"
                        aria-label="Image précédente"
                      >
                        <ChevronRight size={24} className="rotate-180" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          goToNextImage(project.id, project.images.length)
                        }}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-secondary/90 hover:bg-secondary text-white flex items-center justify-center opacity-70 group-hover:opacity-100 transition-all duration-300 z-10 shadow-lg"
                        aria-label="Image suivante"
                      >
                        <ChevronRight size={24} />
                      </button>

                      {/* Indicateur de pagination (dots) */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {project.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrentImageIndexes(prev => ({
                                ...prev,
                                [project.id]: index
                              }))
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${getCurrentImageIndex(project.id) === index
                              ? 'bg-secondary w-8'
                              : 'bg-white/60 hover:bg-white'
                              }`}
                            aria-label={`Aller à l'image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-primary mb-2 sm:mb-3 leading-tight transition-colors group-hover:text-secondary italic">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-primary/60 font-light leading-relaxed mb-4 sm:mb-6 max-w-lg italic">
                      {project.desc}
                    </p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 border border-primary/10 flex items-center justify-center text-primary/20 group-hover:text-secondary group-hover:border-secondary transition-all transform group-hover:rotate-45 shrink-0">
                    <ChevronRight size={18} className="sm:w-5 sm:h-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

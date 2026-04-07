import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import portfolioHeaderImage from '@/assets/photo-1486406146926-c627a92ad1ab.webp'

export default function PortfolioHero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-[70vh] min-h-[70dvh] flex items-center justify-center px-6 pt-20 sm:pt-24 md:pt-32 bg-primary overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full"
        >
          <img
            src={portfolioHeaderImage}
            alt="Portfolio Background"
            className="w-full h-full object-cover grayscale brightness-50"
          />
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent z-10" />

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-6 sm:mb-8 leading-[1.1] tracking-tighter"
        >
          {t('experience.title')}
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-16 sm:w-24 h-1 bg-secondary mx-auto mb-6 sm:mb-8 origin-center"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed font-light italic"
        >
          {t('experience.intro')}
        </motion.p>
      </div>
    </section>
  )
}

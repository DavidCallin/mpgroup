import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Sparkles, Target } from 'lucide-react'
import p1 from '@/assets/portfolio_asset/portfolio-1.jpeg'
import p13 from '@/assets/portfolio_asset/portfolio-13.jpeg'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
}

export default function PortfolioAbout() {
  const { t } = useLanguage()

  const stats = [
    { label: t('positioning.yearsExperience'), value: '5+' },
    { label: t('positioning.institutionalPartners'), value: '50+' },
    { label: t('portfolio.stats.soldOut'), value: '100%' },
    { label: t('portfolio.stats.csrImpact'), value: 'High' },
  ]

  return (
    <section className="py-20 sm:py-32 px-6 bg-white border-b border-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 sm:gap-24 items-start">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <span className="text-primary/40 font-bold text-xs tracking-widest uppercase mb-4 block">
              CEO & VISIONNAIRE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary mb-8 sm:mb-10 leading-tight">
              {t('portfolio.about.title')}
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-primary/70 leading-relaxed font-light italic">
              <p>{t('portfolio.about.desc1')}</p>
              <p>{t('portfolio.about.desc2')}</p>
            </div>

            <div className="mt-12 sm:mt-16 grid grid-cols-2 gap-4 sm:gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center p-6 bg-muted/30 rounded-br-[2rem] border border-primary/5">
                  <div className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-wider text-secondary font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4 pt-8 sm:pt-12">
              <div className="aspect-[3/4] overflow-hidden rounded-bl-[3rem] sm:rounded-bl-[4rem]">
                <img src={p13} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" alt="CEO Activity" />
              </div>
              <div className="aspect-square bg-secondary p-6 sm:p-8 flex flex-col justify-end text-primary">
                <Sparkles size={24} className="mb-4 sm:w-8 sm:h-8" />
                <h4 className="font-heading font-bold text-lg sm:text-xl leading-tight italic">{t('portfolio.about.innovation')}</h4>
              </div>
            </div>
            <div className="space-y-4">
              <div className="aspect-square bg-primary p-6 sm:p-8 flex flex-col justify-end text-white">
                <Target size={24} className="mb-4 text-secondary sm:w-8 sm:h-8" />
                <h4 className="font-heading font-bold text-lg sm:text-xl leading-tight italic">{t('portfolio.about.impact')}</h4>
              </div>
              <div className="aspect-[3/4] overflow-hidden rounded-tr-[3rem] sm:rounded-tr-[4rem]">
                <img src={p1} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" alt="CEO Activity" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

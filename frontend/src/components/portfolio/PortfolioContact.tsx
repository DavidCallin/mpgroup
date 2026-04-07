import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function PortfolioContact() {
  const { t } = useLanguage()
  
  return (
    <section className="py-20 sm:py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-heading font-bold text-primary mb-12 italic tracking-tighter leading-tight">
            {t('portfolio.contact.title')}
          </h2>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-16 mt-20">
            <div className="text-left py-6 border-t border-primary/5 w-full sm:min-w-[200px] sm:w-auto">
              <span className="text-[9px] sm:text-[10px] text-primary/30 uppercase tracking-[0.2em] block mb-3 font-black">{t('portfolio.contact.phone')}</span>
              <p className="text-lg sm:text-xl font-heading font-bold text-primary tracking-tight">+229 01 67 27 06 36</p>
            </div>
            <div className="text-left py-6 border-t border-primary/5 w-full sm:min-w-[200px] sm:w-auto">
              <span className="text-[9px] sm:text-[10px] text-primary/30 uppercase tracking-[0.2em] block mb-3 font-black">{t('portfolio.contact.email')}</span>
              <p className="text-lg sm:text-xl font-heading font-bold text-primary tracking-tight lowercase">marveenpromiseevents@gmail.com</p>
            </div>
            <div className="text-left py-6 border-t border-primary/5 w-full sm:min-w-[200px] sm:w-auto">
              <span className="text-[9px] sm:text-[10px] text-primary/30 uppercase tracking-[0.2em] block mb-3 font-black">{t('portfolio.contact.social')}</span>
              <p className="text-lg sm:text-xl font-heading font-bold text-primary italic underline underline-offset-8 decoration-secondary tracking-tight">Marveen Promïse AÏNADOU</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

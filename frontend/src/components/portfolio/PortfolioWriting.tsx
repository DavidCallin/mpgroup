import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { PenTool, Award, Calendar, MapPin, FileText } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Article {
  id: number
  title: string
  desc: string
  award?: string
  result?: string
  location?: string
  date?: string
  icon: 'award' | 'location' | 'standard'
}

export default function PortfolioWriting() {
  const { t } = useLanguage()

  const articles: Article[] = [
    {
      id: 1,
      title: t('portfolio.write.rfi.title'),
      desc: t('portfolio.write.rfi.desc'),
      award: t('portfolio.write.rfi.award'),
      result: t('portfolio.write.rfi.result'),
      icon: 'award'
    },
    {
      id: 2,
      title: t('portfolio.write.choiseul.title'),
      desc: t('portfolio.write.choiseul.desc'),
      location: t('portfolio.write.choiseul.location'),
      date: t('portfolio.write.choiseul.date'),
      icon: 'location'
    },
    {
      id: 3,
      title: t('portfolio.write.cadre.title'),
      desc: t('portfolio.write.cadre.desc'),
      icon: 'standard'
    },
  ]

  return (
    <section className="py-20 sm:py-32 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-secondary font-bold text-sm tracking-[0.3em] uppercase mb-6 block"
          >
            {t('portfolio.writing.tagline')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-primary mb-6 italic leading-tight"
          >
            {t('portfolio.writing.title').split(' ')[0]} <span className="text-secondary NOT-italic font-light">{t('portfolio.writing.title').split(' ').slice(1).join(' ')}</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="bg-white border border-primary/10 hover:border-secondary/30 transition-all duration-500 h-full flex flex-col overflow-hidden">
                {/* Header avec icône */}
                <div className="relative p-8 sm:p-10 bg-gradient-to-br from-primary/5 to-transparent">
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-secondary/10 text-secondary border-none rounded-none px-3 py-1 text-[9px] tracking-widest font-bold uppercase">
                      {t('portfolio.cat.writing')}
                    </Badge>
                  </div>
                  
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border-2 border-primary/10 flex items-center justify-center mb-6 group-hover:border-secondary/50 transition-all duration-500">
                    {article.icon === 'award' && <Award size={32} className="text-secondary" />}
                    {article.icon === 'location' && <MapPin size={32} className="text-primary" />}
                    {article.icon === 'standard' && <FileText size={32} className="text-primary" />}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-primary mb-3 leading-tight group-hover:text-secondary transition-colors duration-300">
                    {article.title}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-8 sm:p-10 pt-6 flex-grow flex flex-col">
                  <p className="text-sm text-primary/60 leading-relaxed mb-6 flex-grow">
                    {article.desc}
                  </p>

                  {/* Metadata */}
                  <div className="space-y-3 pt-4 border-t border-primary/5">
                    {article.award && (
                      <div className="flex items-start gap-3">
                        <Award size={16} className="text-secondary mt-0.5 shrink-0" />
                        <div>
                          <span className="text-[9px] text-primary/30 uppercase tracking-widest block mb-1">
                            {t('portfolio.label.distinction')}
                          </span>
                          <span className="text-xs font-bold text-secondary">
                            {article.award}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {article.result && (
                      <div className="flex items-start gap-3">
                        <PenTool size={16} className="text-primary/40 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-[9px] text-primary/30 uppercase tracking-widest block mb-1">
                            {t('portfolio.label.impact')}
                          </span>
                          <span className="text-xs font-bold text-primary">
                            {article.result}
                          </span>
                        </div>
                      </div>
                    )}

                    {article.date && (
                      <div className="flex items-start gap-3">
                        <Calendar size={16} className="text-primary/40 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-[9px] text-primary/30 uppercase tracking-widest block mb-1">
                            {t('portfolio.label.date')}
                          </span>
                          <span className="text-xs font-bold text-primary">
                            {article.date}
                          </span>
                        </div>
                      </div>
                    )}

                    {article.location && (
                      <div className="flex items-start gap-3">
                        <MapPin size={16} className="text-primary/40 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-[9px] text-primary/30 uppercase tracking-widest block mb-1">
                            {t('portfolio.label.location')}
                          </span>
                          <span className="text-xs font-bold text-primary">
                            {article.location}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover effect border */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-secondary group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

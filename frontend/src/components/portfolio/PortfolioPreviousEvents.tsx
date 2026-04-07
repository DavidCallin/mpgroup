import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Film, Leaf, Award, Music, Calendar, MapPin, Briefcase } from 'lucide-react'

interface PreviousEvent {
  id: number
  title: string
  desc: string
  role: string
  date?: string
  location?: string
  icon: React.ReactNode
  color: string
}

export default function PortfolioPreviousEvents() {
  const { t } = useLanguage()

  const events: PreviousEvent[] = [
    {
      id: 1,
      title: t('portfolio.event.cinema.title'),
      desc: t('portfolio.event.cinema.desc'),
      role: t('portfolio.event.cinema.role'),
      date: t('portfolio.event.cinema.date'),
      icon: <Film size={24} />,
      color: 'from-purple-500/10 to-purple-500/5'
    },
    {
      id: 2,
      title: t('portfolio.event.nature.title'),
      desc: t('portfolio.event.nature.desc'),
      role: t('portfolio.event.nature.role'),
      date: t('portfolio.event.nature.date'),
      location: t('portfolio.event.nature.location'),
      icon: <Leaf size={24} />,
      color: 'from-green-500/10 to-green-500/5'
    },
    {
      id: 3,
      title: t('portfolio.event.fashion.title'),
      desc: t('portfolio.event.fashion.desc'),
      role: t('portfolio.event.fashion.role'),
      date: t('portfolio.event.fashion.date'),
      icon: <Award size={24} />,
      color: 'from-pink-500/10 to-pink-500/5'
    },
    {
      id: 4,
      title: t('portfolio.event.chill.title'),
      desc: t('portfolio.event.chill.desc'),
      role: t('portfolio.event.chill.role'),
      date: t('portfolio.event.chill.date'),
      icon: <Music size={24} />,
      color: 'from-blue-500/10 to-blue-500/5'
    },
  ]

  return (
    <section className="py-20 sm:py-32 px-6 bg-white border-t border-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary/40 font-bold text-sm tracking-[0.3em] uppercase mb-6 block"
          >
            {t('portfolio.previous.tagline')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-primary mb-6 italic leading-tight"
          >
            {t('portfolio.previous.title').split(' ')[0]} <span className="text-secondary NOT-italic font-light">{t('portfolio.previous.title').split(' ').slice(1).join(' ')}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-primary/60 max-w-3xl mx-auto font-light"
          >
            {t('portfolio.previous.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative bg-white border border-primary/10 hover:border-secondary/30 transition-all duration-500 overflow-hidden h-full">
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative p-8 sm:p-10 flex gap-6">
                  {/* Icon */}
                  <div className="shrink-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/5 group-hover:bg-secondary/10 border border-primary/10 group-hover:border-secondary/30 flex items-center justify-center transition-all duration-500">
                      <div className="text-primary group-hover:text-secondary transition-colors duration-500">
                        {event.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-primary mb-3 leading-tight group-hover:text-secondary transition-colors duration-300">
                      {event.title}
                    </h3>
                    
                    <p className="text-sm text-primary/60 leading-relaxed mb-6">
                      {event.desc}
                    </p>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs">
                      <div className="flex items-center gap-2">
                        <Briefcase size={14} className="text-secondary shrink-0" />
                        <span className="font-bold text-primary">{event.role}</span>
                      </div>
                      
                      {event.date && (
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-primary/40 shrink-0" />
                          <span className="text-primary/70">{event.date}</span>
                        </div>
                      )}
                      
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-primary/40 shrink-0" />
                          <span className="text-primary/70">{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-secondary group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

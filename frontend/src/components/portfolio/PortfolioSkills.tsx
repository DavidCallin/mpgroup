import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Calendar, Award, PenTool, Mic2, Leaf, Layout } from 'lucide-react'

export default function PortfolioSkills() {
  const { t } = useLanguage()

  const skills = [
    { key: 'coordination', icon: <Calendar size={40} />, level: 95 },
    { key: 'mgmt', icon: <Layout size={40} />, level: 90 },
    { key: 'writing', icon: <PenTool size={40} />, level: 92 },
    { key: 'speaking', icon: <Mic2 size={40} />, level: 88 },
    { key: 'inst', icon: <Award size={40} />, level: 93 },
    { key: 'eco', icon: <Leaf size={40} />, level: 96 },
  ]

  return (
    <section className="py-20 sm:py-32 px-6 bg-primary text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-secondary font-bold text-sm tracking-[0.3em] uppercase mb-6 block"
          >
            {t('portfolio.skills.tagline')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-6 italic leading-tight"
          >
            {t('portfolio.skills.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60 max-w-3xl mx-auto font-light"
          >
            {t('portfolio.skills.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 sm:p-10 hover:bg-white/10 hover:border-secondary/50 transition-all duration-500 h-full flex flex-col">
                {/* Icon */}
                <div className="mb-6">
                  <div className="text-secondary group-hover:scale-110 transition-transform duration-500">
                    {skill.icon}
                  </div>
                </div>

                {/* Skill Name */}
                <h3 className="text-xl sm:text-2xl font-heading font-bold mb-3 group-hover:text-secondary transition-colors duration-300 leading-tight">
                  {t(`portfolio.skill.${skill.key}`)}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/60 mb-6 leading-relaxed flex-grow">
                  {t(`portfolio.skill.${skill.key}.highlight`)}
                </p>

                {/* Expertise Level */}
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-white/40 uppercase tracking-wider">{t('portfolio.label.expertiseLevel')}</span>
                    <span className="text-sm font-bold text-secondary">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: i * 0.1 + 0.3, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-secondary to-secondary/60 rounded-full"
                    />
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

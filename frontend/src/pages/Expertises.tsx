import React from 'react'
import { motion } from 'framer-motion'
import { Globe, Users, Handshake, Utensils, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import expertisesHeaderImage from '@/assets/photo-1552664730-d307ca884978.webp'

export default function Expertises() {
  const { t } = useLanguage()

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary pt-32 pb-20 px-4 sm:px-6 text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full"
          >
            <img
              src={expertisesHeaderImage}
              alt="MP Group Expertises"
              className="w-full h-full object-cover opacity-20 brightness-50"
            />
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-12 h-1 bg-secondary mx-auto mb-8" />
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 tracking-tight">
              {t('group.expertises.title')}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Expertises Section - Ultra Premium */}
      <section className="py-32 px-4 sm:px-6 bg-[#f8f9fb] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-light">
              {t('expertises.title')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              { id: 'coordination', icon: Globe, color: 'primary' },
              { id: 'accompaniment', icon: Users, color: 'secondary' },
              { id: 'networking', icon: Handshake, color: 'primary' },
              { id: 'pastry', icon: Utensils, color: 'secondary' }
            ].map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white p-12 shadow-premium hover:shadow-premium-hover transition-all duration-700 relative overflow-hidden"
              >
                {/* Decorative Accent */}
                <div className={`absolute top-0 right-0 w-24 h-24 translate-x-12 -translate-y-12 rotate-45 ${item.color === 'primary' ? 'bg-primary/5' : 'bg-secondary/10'} transition-transform duration-700 group-hover:scale-150`} />

                <div className="flex flex-col h-full relative z-10">
                  <div className={`w-16 h-16 ${item.color === 'primary' ? 'bg-primary text-white' : 'bg-secondary text-primary'} flex items-center justify-center mb-8 shadow-lg transform group-hover:rotate-[15deg] transition-transform duration-500`}>
                    <item.icon size={32} />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-6 group-hover:text-secondary transition-colors">
                    {t(`expertises.${item.id}.title` as any)}
                  </h3>

                  <p className="text-gray-600 text-[18px] mb-8 font-light leading-relaxed">
                    {t(item.id === 'pastry' ? 'expertises.pastry.description' : `expertises.${item.id}.subtitle` as any)}
                  </p>

                  {item.id !== 'pastry' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                      {[1, 2, 3, 4, 5].map((subIdx) => {
                        const translationKey = `expertises.${item.id}.item${subIdx}`;
                        const content = t(translationKey as any);
                        if (content === translationKey) return null; // Skip if missing
                        return (
                          <div key={subIdx} className="flex items-center gap-3 py-2 border-b border-gray-50 hover:border-secondary transition-colors duration-300">
                            <CheckCircle2 size={14} className="text-secondary shrink-0" />
                            <span className="text-primary font-medium text-[13.5px] uppercase tracking-wider">
                              {content}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
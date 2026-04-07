import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Target, Users, Zap, Award, CheckCircle2, Building2, Globe, TrendingUp } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import mpGroupLogo from '@/assets/mp_group_logo2.png'
import groupHeaderImage from '@/assets/photo-1497366216548-37526070297c.webp'
import historyImage from '@/assets/IMG_0746.webp'

const valuesList = [
  { key: 'excellence', icon: Award },
  { key: 'rigor', icon: Zap },
  { key: 'discretion', icon: ShieldCheck },
  { key: 'innovation', icon: Target },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
}

export default function Group() {
  const { t } = useLanguage()

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="relative bg-primary pt-32 pb-20 px-4 sm:px-6 text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full"
          >
            <img
              src={groupHeaderImage}
              alt="MP Group Corporate"
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
              {t('group.title')}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-24 px-4 sm:px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-secondary font-bold text-[25px] uppercase tracking-[0.2em]">{t('group.who.title')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary mb-10 leading-[1.2]">
                {t('group.subtitle')}
              </h2>
              <div className="space-y-8">
                <p className="text-lg text-gray-700 leading-relaxed font-light first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                  {t('group.who.description')}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-primary/5 rounded-full blur-3xl" />
              <div className="relative shadow-premium rounded-none overflow-hidden group">
                <img
                  src={historyImage}
                  alt="MP Group Team"
                  className="w-full h-auto transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-700" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section - Ultra Premium */}
      <section className="py-24 px-4 sm:px-6 bg-primary relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none overflow-hidden flex items-center justify-center">
          <span className="text-[15vw] font-heading font-bold text-white whitespace-nowrap leading-none">
            MISSION
          </span>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-8 leading-tight uppercase tracking-widest">
                {t('group.mission.title')}
              </h2>
              <p className="text-xl sm:text-2xl text-secondary font-bold leading-tight italic mb-10 border-l-4 border-secondary pl-6">
                {t('group.mission.main')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 p-8 hover:bg-white/10 transition-all duration-500 group"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mb-6 group-hover:bg-secondary transition-colors duration-500">
                    <CheckCircle2 className="text-secondary group-hover:text-primary w-5 h-5" />
                  </div>
                  <span className="text-white font-medium text-lg leading-snug">
                    {t(`group.mission.item${idx}` as any)}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Ultra Premium */}
      <section className="py-32 px-4 sm:px-6 bg-[#f8f9fb] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <div className="w-12 h-1 bg-secondary mx-auto mb-8" />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-primary mb-6 tracking-tight">
              {t('group.values.title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {valuesList.map((val, idx) => (
              <motion.div
                key={val.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Number Overlay */}
                <span className="absolute -top-10 -left-6 text-8xl font-heading font-bold text-primary/5 group-hover:text-secondary/20 transition-colors duration-700 pointer-events-none">
                  0{idx + 1}
                </span>
                
                <div className="relative bg-white border border-gray-100 p-10 shadow-premium hover:shadow-premium-hover transition-all duration-700 group-hover:-translate-y-2">
                  <div className="w-14 h-14 bg-primary/5 text-primary flex items-center justify-center mb-8 group-hover:bg-secondary group-hover:text-primary transition-all duration-500 rounded-none transform">
                    <val.icon size={28} />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-primary mb-4 uppercase tracking-[0.2em] group-hover:text-secondary transition-colors">
                    {t(`group.values.${val.key}.title` as any)}
                  </h3>
                  <div className="w-8 h-0.5 bg-secondary/30 mb-6 group-hover:w-full transition-all duration-700" />
                  <p className="text-gray-500 leading-relaxed font-light text-sm">
                    {t(`group.values.${val.key}.desc` as any)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </div>
  )
}

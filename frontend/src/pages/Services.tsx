import { motion } from 'framer-motion'
import { Globe, Users, Handshake, Utensils, CheckCircle2 } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { SEO } from '@/components/SEO'
import { SchemaOrg } from '@/components/SchemaOrg'
import servicesHeaderImage from '@/assets/pexels-bertellifotografia-16120243.webp'

export default function Services() {
  const { t } = useLanguage()

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title="Nos Expertises | MP Group - Coordination d'Événements Stratégiques"
        description="Découvrez nos expertises en coordination d'événements stratégiques, accompagnement de dirigeants, mise en relation et pâtisserie nutritionnelle."
        keywords="coordination événements, accompagnement dirigeants, mise en relation, partenariats, pâtisserie nutritionnelle, MP Group"
      />
      <SchemaOrg type="LocalBusiness" />

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
              src={servicesHeaderImage}
              alt="Background"
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
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 tracking-tight leading-tight">
              {t('expertises.title')}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Coordination d'événements stratégiques */}
      <section className="py-20 px-4 sm:px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="bg-white p-10 sm:p-16 shadow-premium relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
            <div className="flex flex-col lg:flex-row items-start gap-12 mb-12">
              <div className="w-20 h-20 bg-primary text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500">
                <Globe size={40} />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary mb-6">
                  {t('expertises.coordination.title')}
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed font-light">
                  ff
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5].map((idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-5 bg-[#fcfcfd] border border-gray-100 hover:border-secondary/30 hover:bg-white hover:shadow-premium transition-all duration-500"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-secondary w-4 h-4" />
                  </div>
                  <span className="text-primary font-bold text-lg uppercase tracking-wider" style={{fontSize: '18px'}}>
                    {t(`expertises.coordination.item${idx}` as any)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Accompagnement de dirigeants et personnalités */}
      <section className="py-20 px-4 sm:px-6 bg-[#f8f9fb]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="bg-white p-10 sm:p-16 shadow-premium relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-2 h-full bg-secondary" />
            <div className="flex flex-col lg:flex-row items-start gap-12 mb-12">
              <div className="w-20 h-20 bg-secondary text-primary flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500">
                <Users size={40} />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary mb-6">
                  {t('expertises.accompaniment.title')}
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed font-light">
                  {t('expertises.accompaniment.subtitle')}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#fcfcfd] p-8 hover:bg-white hover:shadow-premium transition-all duration-500 border-b-4 border-transparent hover:border-secondary"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="text-secondary w-5 h-5 shrink-0 mt-1" />
                    <span className="text-primary font-bold text-lg uppercase tracking-wider leading-relaxed" style={{fontSize: '18px'}}>
                      {t(`expertises.accompaniment.item${idx}` as any)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mise en relation & partenariats */}
      <section className="py-20 px-4 sm:px-6 bg-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="bg-white p-10 sm:p-16 shadow-premium relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary" />
            <div className="flex flex-col lg:flex-row items-start gap-12 mb-16">
              <div className="w-20 h-20 bg-primary text-white flex items-center justify-center shrink-0 shadow-lg group-hover:rotate-12 transition-transform duration-500">
                <Handshake size={40} />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary mb-6">
                  {t('expertises.networking.title')}
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed font-light">
                  {t('expertises.networking.subtitle')}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[1, 2, 3, 4].map((idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-8 bg-[#fcfcfd] border-t-2 border-transparent hover:border-secondary transition-all duration-500 group/item"
                >
                  <div className="w-16 h-16 bg-white shadow-md rounded-full flex items-center justify-center mx-auto mb-6 group-hover/item:bg-primary transition-colors duration-500">
                    <span className="text-primary group-hover/item:text-white font-bold text-xl">{idx}</span>
                  </div>
                  <span className="text-primary font-bold text-base uppercase tracking-[0.2em] block mt-4 transition-colors" style={{fontSize: '16px'}}>
                    {t(`expertises.networking.item${idx}` as any)}
                  </span>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-primary py-10 px-8 text-center relative overflow-hidden group/conclusion"
            >
              <div className="absolute inset-0 bg-secondary translate-x-full transition-transform duration-700 group-hover/conclusion:translate-x-0" />
              <p className="text-white group-hover:text-primary font-bold text-xl sm:text-2xl relative z-10 transition-colors duration-700">
                {t('expertises.networking.conclusion')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pâtisserie nutritionnelle */}
      <section className="py-20 px-4 sm:px-6 bg-[#f8f9fb]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="bg-white p-10 sm:p-16 shadow-premium relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-2 h-full bg-secondary" />
            <div className="flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left">
              <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-700">
                <Utensils size={48} className="text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary mb-6">
                  {t('expertises.pastry.title')}
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed font-light italic">
                  "{t('expertises.pastry.description')}"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-secondary" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl font-heading font-bold mb-10 tracking-tight leading-tight">
              {t('hero.cta.title')}
            </h2>
            <p className="text-xl text-white/70 mb-12 sm:mb-16 leading-relaxed max-w-2xl mx-auto font-light">
              {t('home.cta.description')}
            </p>
            <Button asChild className="relative overflow-hidden bg-secondary text-primary hover:bg-white hover:text-primary font-bold px-12 py-8 text-xl rounded-none transition-all duration-500 group">
              <Link to="/contact">
                <span className="relative z-10">{t('home.cta.button')}</span>
                <span className="absolute inset-0 bg-white -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

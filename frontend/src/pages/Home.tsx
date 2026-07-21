import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { useState } from 'react'
import { SEO } from '@/components/SEO'
import { SchemaOrg } from '@/components/SchemaOrg'
import AvisWidget from '@/components/ui/AvisWidget'
import heroImage from '@/assets/pexels-am83-14636315.webp'
import promiseImage from '@/assets/pexels-bertellifotografia-16120243.webp'
import { useQuery } from '@tanstack/react-query'
import { apiService } from '@/services/api'


export default function Home() {
  const { t } = useLanguage()
  const [heroImageLoaded, setHeroImageLoaded] = useState(false)
  const [promiseImageLoaded, setPromiseImageLoaded] = useState(false)
  const { data: stats } = useQuery({
      queryKey: ['avis-stats'],
      queryFn: () => apiService.getAvisStats(),
      staleTime: 1000 * 60 * 60,
    })

  return (
    <div className="bg-white overflow-hidden">
      <SEO
        title="MP GROUP | Coordination d'Événements Stratégiques"
        description="MP Group est spécialisé dans la conception, la coordination et le pilotage d'événements à forte portée institutionnelle en Afrique de l'Ouest."
        keywords="conseil stratégique, événementiel institutionnel, Afrique, coordination d'événements, MP Group"
        aggregateRating={
          stats && stats.total > 0
            ? { ratingValue: stats.moyenne, reviewCount: stats.total }
            : undefined
        }
      />
      <SchemaOrg type="Organization" />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full"
          >
            <img
              src={heroImage}
              alt="Corporate Environment"
              className="w-full h-full object-cover brightness-[0.35] contrast-[1.05]"
              loading="eager"
              onLoad={() => setHeroImageLoaded(true)}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="max-w-4xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.3 }
                }
              }}
            >
              <motion.h1 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="text-3xl sm:text-5xl md:text-6xl font-heading font-bold text-white mb-8 leading-[1.15]"
              >
                {t('hero.title')}
              </motion.h1>
              
              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl leading-relaxed font-light"
              >
                {t('hero.description')}
                <span className="hidden sm:inline"> {t('hero.description2')}</span>
              </motion.p>
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="flex flex-col sm:flex-row gap-5"
              >
                <Button asChild className="relative overflow-hidden bg-secondary text-primary hover:bg-secondary/90 font-bold px-8 py-7 text-lg rounded-none transition-transform hover:-translate-y-1 active:translate-y-0 group shadow-lg">
                  <Link to="/devis">
                    <span className="relative z-10">{t('hero.cta.devis')}</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="text-white border-white/40 hover:border-white hover:bg-white/20 font-bold px-8 py-7 text-lg rounded-none transition-all hover:-translate-y-1 active:translate-y-0 backdrop-blur-sm bg-transparent">
                  <Link to="/group">{t('hero.cta.discover')}</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Positioning Section */}
      <section className="py-20 px-4 sm:px-6 bg-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-secondary font-bold text-xl uppercase tracking-[0.2em]">
                  {t('positioning.tagline')}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary mb-8 leading-[1.2]">
                {t('positioning.title')}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-10 font-light italic border-l-2 border-secondary/30 pl-6">
                {t('positioning.description')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-6 bg-secondary/10 rounded-[2rem] blur-3xl group-hover:bg-secondary/20 transition-all duration-700" />
              <div className="relative overflow-hidden rounded-[1.5rem] shadow-premium hover:shadow-premium-hover transition-all duration-700">
                <img
                  src={promiseImage}
                  alt="MP Group Impact"
                  className={`w-full h-auto transition-transform duration-700 group-hover:scale-105 ${promiseImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setPromiseImageLoaded(true)}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services (Expertises) Section */}
      <section className="py-20 px-4 sm:px-6 bg-[#f8f9fb]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-secondary font-bold text-[25px] uppercase tracking-[0.2em] mb-4 block">
              {t('services.tagline')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary mb-6">
              {t('services.home.title')}
            </h2>
            <div className="w-20 h-1 bg-secondary mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[1, 2, 3, 4, 5].map((idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-none shadow-premium hover:shadow-premium-hover transition-all duration-500 flex flex-col items-center text-center border-t-2 border-transparent hover:border-secondary group relative"
              >
                <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-500">
                  <span className="text-xl font-bold text-secondary group-hover:text-white">{idx}</span>
                </div>
                <p className="text-primary font-bold text-sm uppercase tracking-wider leading-relaxed">
                  {t(`services.item${idx}` as any)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats/Credibility Section */}
      <section className="py-8 px-4 sm:px-6 bg-primary text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4">{t('stats.title')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center hover:bg-white/5 transition-colors"
              >
                <CheckCircle2 className="w-8 h-8 text-secondary mb-4" />
                <p className="text-lg font-medium text-white/90">{t(`stats.item${idx}` as any)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <span className="text-secondary font-bold text-[25px] uppercase tracking-[0.2em] mb-4 block">
              {t('vision.tagline')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary mb-10 leading-tight">
              {t('vision.title')}
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed font-light italic">
              "{t('vision.description')}"
            </p>
            <div className="relative py-10 px-8 sm:px-12 bg-primary text-white overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-1 h-full bg-secondary" />
              <p className="text-lg sm:text-2xl font-bold relative z-10">
                {t('vision.goal')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Avis Section */}
      <section className="py-8 px-4 sm:px-6 bg-primary text-white">
        <AvisWidget />
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 bg-secondary relative overflow-hidden group">
        <div className="absolute inset-0 bg-primary translate-y-full transition-transform duration-700 ease-[0.22, 1, 0.36, 1] group-hover:translate-y-0" />
        <div className="max-w-4xl mx-auto text-center relative z-10 transition-colors duration-700 group-hover:text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-8 leading-tight group-hover:text-white text-primary">
              {t('home.cta.title')}
            </h2>
            <p className="text-lg sm:text-xl mb-12 leading-relaxed opacity-90">
              {t('home.cta.description')}
            </p>
            
            <Button asChild className="bg-primary text-white hover:bg-white hover:text-primary font-bold px-10 py-8 text-xl rounded-none transition-all duration-500 group-hover:bg-secondary group-hover:text-primary">
              <Link to="/devis">{t('home.cta.button')}</Link>
            </Button>
            
          </motion.div>
        </div>
      </section>
    </div>
  )
}

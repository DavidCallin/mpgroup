import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { Link } from '@tanstack/react-router'
import { apiService } from '@/services/api'
import { StarRating } from '@/components/ui/star-rating'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AvisWidget() {
  const { t } = useLanguage()
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [])

  const { data: avisList, isLoading } = useQuery({
    queryKey: ['avis'],
    queryFn: () => apiService.getAvis(),
  })

  const recentAvis = avisList?.slice(0, 6) ?? []

  if (isLoading || recentAvis.length === 0) return null

  return (
    <section className="py-20 bg-[#001A4D] text-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold">{t('avis.widget.title')}</h2>
          <p className="text-[#EAB12D] mt-2">{t('avis.widget.subtitle')}</p>
        </motion.div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {recentAvis.map((avis) => (
              <div key={avis.id} className="flex-[0_0_85%] md:flex-[0_0_32%] min-w-0">
                <div className="bg-white text-[#001A4D] p-6 h-full flex flex-col justify-between">
                  <div>
                    <StarRating value={avis.note} readonly size={16} />
                    <p className="text-sm mt-3 italic">"{avis.commentaire}"</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="font-semibold text-sm">{avis.nom_evenement}</p>
                    <p className="text-xs text-gray-500">- {avis.nom_complet}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            to="/avis"
            className="inline-block bg-[#EAB12D] text-[#001A4D] px-6 py-3 font-semibold hover:opacity-90 transition-opacity"
          >
            {t('avis.widget.cta')}
          </Link>
        </div>
      </div>
    </section>
  )
}
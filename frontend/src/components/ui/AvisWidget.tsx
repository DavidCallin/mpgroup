import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { Trophy } from 'lucide-react'
import { apiService } from '@/services/api'
import { StarRating } from '@/components/ui/star-rating'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AvisWidget() {
  const { t } = useLanguage()

  const { data: topEvenements, isLoading } = useQuery({
    queryKey: ['top-notes-evenements'],
    queryFn: () => apiService.getTopNotesEvenements(),
  })

  if (isLoading || !topEvenements || topEvenements.length === 0) return null

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

        <div className="grid md:grid-cols-3 gap-6">
          {topEvenements.map((ev, index) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: '-50px' }}
              className="bg-white text-[#001A4D] p-6 relative"
            >
              {index === 0 && (
                <div className="absolute -top-3 -right-3 bg-[#EAB12D] text-[#001A4D] rounded-full p-2">
                  <Trophy size={18} />
                </div>
              )}

              <p className="font-semibold text-lg mb-3">{ev.nom}</p>

              <div className="flex items-center gap-2 mb-1">
                <StarRating value={Math.round(ev.note_moyenne)} readonly size={20} />
              </div>

              <p className="text-2xl font-bold text-[#001A4D]">
                {ev.note_moyenne}<span className="text-sm text-gray-400 font-normal">/5</span>
              </p>
              <p className="text-sm text-gray-500 mt-1 mb-4">
                {ev.nombre_avis} avis
              </p>

              <Link
                to="/avis"
                search={{ evenement: ev.id }}
                className="text-sm font-medium text-[#001A4D] underline hover:text-[#EAB12D] transition-colors"
              >
                Voir les commentaires →
              </Link>
            </motion.div>
          ))}
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
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import ambroiseDesign from '@/assets/partners/ambroise-design.webp'
import benediction from '@/assets/partners/benediction.webp'
import creativeArt from '@/assets/partners/creative-art.webp'
import magicRecords from '@/assets/partners/magic-records.webp'
import miaPictures from '@/assets/partners/mia-pictures.webp'
import paperlab from '@/assets/partners/paperlab.webp'
import wegalSpace from '@/assets/partners/wegal-space.webp'

type Partner = { name: string; logo: string; dark?: boolean }

const partners: Partner[] = [
  { name: 'Ambroise Design', logo: ambroiseDesign },
  { name: 'Paperlab', logo: paperlab },
  { name: 'Wegal Space', logo: wegalSpace },
  { name: 'Magic Records', logo: magicRecords, dark: true },
  { name: 'Mia Pictures', logo: miaPictures },
  { name: 'Creative Art', logo: creativeArt },
  { name: 'Bénédiction', logo: benediction },
]

export function PartnersSection() {
  const { t } = useLanguage()

  return (
    <section className="py-20 px-4 sm:px-6 bg-[#f8f9fb]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-secondary font-bold text-sm sm:text-base uppercase tracking-[0.2em] mb-3 block">
            {t('partners.tagline')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-primary">
            {t('partners.title')}
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {partners.map((partner, idx) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className={`w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)] h-28 sm:h-32 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md ${
                partner.dark ? 'bg-primary' : 'bg-white'
              }`}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                title={partner.name}
                loading="lazy"
                className="max-h-full max-w-full object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

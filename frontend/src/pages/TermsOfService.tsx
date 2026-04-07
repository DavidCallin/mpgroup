import { motion } from 'framer-motion'
import { FileText, Mail, Phone, MapPin } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function TermsOfService() {
  const { t } = useLanguage()

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="relative bg-primary pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <div className="w-16 h-16 bg-secondary flex items-center justify-center">
              <FileText size={32} />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4"
          >
            {t('terms.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-base text-white/70"
          >
            {t('terms.lastUpdate')}: Mars 2025
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none"
          >
            {/* Introduction */}
            <div className="mb-12">
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                {t('terms.intro')}
              </p>
            </div>

            {/* Section 1: Acceptance of Terms */}
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-4">
                {t('terms.acceptance.title')}
              </h2>
              <p className="text-base text-foreground/80">
                {t('terms.acceptance.desc')}
              </p>
            </div>

            {/* Section 2: Description of Services */}
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-4">
                {t('terms.services.title')}
              </h2>
              <p className="text-base text-foreground/80">
                {t('terms.services.desc')}
              </p>
            </div>

            {/* Section 3: Acceptable Use */}
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-4">
                {t('terms.use.title')}
              </h2>
              <p className="text-base text-foreground/80 mb-4">
                {t('terms.use.desc')}
              </p>
              <ul className="space-y-2 ml-6">
                <li className="text-base text-foreground/80">{t('terms.use.item1')}</li>
                <li className="text-base text-foreground/80">{t('terms.use.item2')}</li>
                <li className="text-base text-foreground/80">{t('terms.use.item3')}</li>
                <li className="text-base text-foreground/80">{t('terms.use.item4')}</li>
              </ul>
            </div>

            {/* Section 4: Intellectual Property */}
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-4">
                {t('terms.intellectual.title')}
              </h2>
              <p className="text-base text-foreground/80">
                {t('terms.intellectual.desc')}
              </p>
            </div>

            {/* Section 5: Limitation of Liability */}
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-4">
                {t('terms.liability.title')}
              </h2>
              <p className="text-base text-foreground/80 mb-4">
                {t('terms.liability.desc')}
              </p>
              <ul className="space-y-2 ml-6">
                <li className="text-base text-foreground/80">{t('terms.liability.item1')}</li>
                <li className="text-base text-foreground/80">{t('terms.liability.item2')}</li>
                <li className="text-base text-foreground/80">{t('terms.liability.item3')}</li>
              </ul>
            </div>

            {/* Section 6: Confidentiality */}
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-4">
                {t('terms.confidentiality.title')}
              </h2>
              <p className="text-base text-foreground/80">
                {t('terms.confidentiality.desc')}
              </p>
            </div>

            {/* Section 7: Modifications */}
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-4">
                {t('terms.modifications.title')}
              </h2>
              <p className="text-base text-foreground/80">
                {t('terms.modifications.desc')}
              </p>
            </div>

            {/* Section 8: Applicable Law */}
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-4">
                {t('terms.law.title')}
              </h2>
              <p className="text-base text-foreground/80">
                {t('terms.law.desc')}
              </p>
            </div>

            {/* Section 9: Contact */}
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-4">
                {t('terms.contact.title')}
              </h2>
              <p className="text-base text-foreground/80 mb-6">
                {t('terms.contact.desc')}
              </p>
              
              <div className="bg-muted p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-secondary" size={20} />
                  <span className="text-base text-foreground">mpgroupcompany1@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-secondary" size={20} />
                  <span className="text-base text-foreground">+229 01 67 27 06 36</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-secondary" size={20} />
                  <span className="text-base text-foreground">Haie vive, Cotonou, Bénin</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

import { motion } from 'framer-motion'
import { Shield, Mail, Phone, MapPin } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function PrivacyPolicy() {
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
              <Shield size={32} />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4"
          >
            {t('privacy.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-base text-white/70"
          >
            {t('privacy.lastUpdate')}: Mars 2025
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
                {t('privacy.intro')}
              </p>
            </div>

            {/* Section 1: Data Collection */}
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-4">
                {t('privacy.collection.title')}
              </h2>
              <p className="text-base text-foreground/80 mb-4">
                {t('privacy.collection.desc')}
              </p>
              <ul className="space-y-2 ml-6">
                <li className="text-base text-foreground/80">{t('privacy.collection.item1')}</li>
                <li className="text-base text-foreground/80">{t('privacy.collection.item2')}</li>
                <li className="text-base text-foreground/80">{t('privacy.collection.item3')}</li>
                <li className="text-base text-foreground/80">{t('privacy.collection.item4')}</li>
              </ul>
            </div>

            {/* Section 2: Data Usage */}
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-4">
                {t('privacy.usage.title')}
              </h2>
              <p className="text-base text-foreground/80 mb-4">
                {t('privacy.usage.desc')}
              </p>
              <ul className="space-y-2 ml-6">
                <li className="text-base text-foreground/80">{t('privacy.usage.item1')}</li>
                <li className="text-base text-foreground/80">{t('privacy.usage.item2')}</li>
                <li className="text-base text-foreground/80">{t('privacy.usage.item3')}</li>
                <li className="text-base text-foreground/80">{t('privacy.usage.item4')}</li>
              </ul>
            </div>

            {/* Section 3: Data Protection */}
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-4">
                {t('privacy.protection.title')}
              </h2>
              <p className="text-base text-foreground/80">
                {t('privacy.protection.desc')}
              </p>
            </div>

            {/* Section 4: Data Sharing */}
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-4">
                {t('privacy.sharing.title')}
              </h2>
              <p className="text-base text-foreground/80 mb-4">
                {t('privacy.sharing.desc')}
              </p>
              <ul className="space-y-2 ml-6">
                <li className="text-base text-foreground/80">{t('privacy.sharing.item1')}</li>
                <li className="text-base text-foreground/80">{t('privacy.sharing.item2')}</li>
                <li className="text-base text-foreground/80">{t('privacy.sharing.item3')}</li>
              </ul>
            </div>

            {/* Section 5: Your Rights */}
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-4">
                {t('privacy.rights.title')}
              </h2>
              <p className="text-base text-foreground/80 mb-4">
                {t('privacy.rights.desc')}
              </p>
              <ul className="space-y-2 ml-6">
                <li className="text-base text-foreground/80">{t('privacy.rights.item1')}</li>
                <li className="text-base text-foreground/80">{t('privacy.rights.item2')}</li>
                <li className="text-base text-foreground/80">{t('privacy.rights.item3')}</li>
                <li className="text-base text-foreground/80">{t('privacy.rights.item4')}</li>
                <li className="text-base text-foreground/80">{t('privacy.rights.item5')}</li>
              </ul>
            </div>

            {/* Section 6: Cookies */}
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-4">
                {t('privacy.cookies.title')}
              </h2>
              <p className="text-base text-foreground/80">
                {t('privacy.cookies.desc')}
              </p>
            </div>

            {/* Section 7: Contact */}
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-4">
                {t('privacy.contact.title')}
              </h2>
              <p className="text-base text-foreground/80 mb-6">
                {t('privacy.contact.desc')}
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

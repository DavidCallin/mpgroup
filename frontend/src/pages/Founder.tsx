import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'
import { Linkedin } from 'lucide-react'
import founderImage from '@/assets/portfolio_asset/portfolio-13.jpeg'

const founderHeaderImage = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop'
const founderImg = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop'

export default function Founder() {
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
                            src={founderHeaderImage}
                            alt="Corporate Background"
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
                            {t('founder.title')}
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
                        {/* Image Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true }}
                            className="lg:col-span-5 relative"
                        >
                            <div className="absolute -inset-6 bg-secondary/10 translate-x-1 translate-y-1" />
                            <div className="relative shadow-premium overflow-hidden group h-full min-h-[600px] lg:min-h-[800px]">
                                <img
                                    src={founderImage}
                                    alt="Marveen Promise AINADOU"
                                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-primary/90 to-transparent text-white">
                                    <h3 className="text-2xl font-heading font-bold mb-1">Marveen Promise AINADOU</h3>
                                    <p className="text-secondary font-bold text-sm uppercase tracking-widest">Fondatrice & CEO</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Text Column */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true }}
                            className="lg:col-span-7"
                        >
                            <div className="space-y-12">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <span className="text-secondary font-bold text-base uppercase tracking-[0.2em]">Biographie</span>
                                    </div>
                                    <p className="text-xl text-justify sm:text-2xl text-primary font-bold leading-relaxed italic">
                                        {t('founder.bio.description')}
                                    </p>
                                   <p className="text-lg text-justify text-gray-700 leading-relaxed font-light">
                                        {t('founder.bio.intro')}
                                    </p>
                                    <p className="text-lg text-justify text-gray-700 leading-relaxed font-light">
                                        {t('founder.bio.achievements')}
                                    </p>
                                    <p className="text-lg text-justify text-gray-700 leading-relaxed font-light">
                                        {t('founder.bio.business')}
                                    </p>
                                    <p className="text-lg text-justify text-gray-700 leading-relaxed font-light whitespace-pre-line">
                                        {t('founder.bio.experience')}
                                    </p>
                                </div>

                                <div className="space-y-8 bg-[#f8f9fb] p-8 sm:p-12 border-l-4 border-secondary">
                                    <h3 className="text-xl font-heading font-bold text-primary">
                                        {t('founder.bio.approach.title')}
                                    </h3>
                                    <ul className="space-y-4">
                                        {[1, 2, 3].map((idx) => (
                                            <li key={idx} className="flex items-start gap-4 group">
                                                <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2.5 shrink-0 group-hover:scale-150 transition-transform" />
                                                <span className="text-gray-700 text-[18px] font-light leading-relaxed">
                                                    {t(`founder.bio.approach.item${idx}`)}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <p className="text-lg text-gray-600 leading-relaxed font-light border-t border-gray-100 pt-8 mt-8">
                                    {t('founder.bio.ambition')}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}

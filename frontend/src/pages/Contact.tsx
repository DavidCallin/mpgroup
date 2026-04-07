import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'react-hot-toast'
import { useLanguage } from '@/contexts/LanguageContext'
import { apiService, ContactFormData } from '@/services/api'
import contactHeaderImage from '@/assets/pexels-masoodaslami-28450660.jpg'

export default function Contact() {
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    entreprise: '',
    sujet: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await apiService.submitContact(formData)
      
      toast.success(t('contact.form.success'), {
        style: {
          background: '#001A4D',
          color: '#EAB12D',
          borderRadius: '0px',
        }
      })
      
      // Reset form
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        entreprise: '',
        sujet: '',
        message: ''
      })
    } catch (error) {
      console.error('Contact submission error:', error)
      toast.error('Une erreur est survenue. Veuillez réessayer.', {
        style: {
          background: '#dc2626',
          color: '#ffffff',
          borderRadius: '0px',
        }
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white min-h-screen font-sans">
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
              src={contactHeaderImage}
              alt="Contact Background"
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
              {t('contact.page.title')}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 px-4 sm:px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-secondary font-bold text-sm uppercase tracking-[0.2em]">{t('contact.form.title')}</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-8 leading-tight">
                {t('contact.page.subtitle')}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed font-light">
                {t('contact.page.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: MapPin, title: "Siège Social", detail: "Haie Vive, Cotonou, Bénin", isAddress: true },
                { icon: Phone, title: "Téléphone", detail: "+229 01 67 27 06 36" },
                { icon: Mail, title: "Email", detail: "mpgroupcompany1@gmail.com" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/5 flex items-center justify-center shrink-0 text-primary">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-wider text-primary mb-1">{item.title}</h4>
                    {item.isAddress ? (
                      <a 
                        href="https://maps.app.goo.gl/yqtVGF9ZQmauT8Nf7" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 text-sm font-light hover:text-secondary transition-colors cursor-pointer underline decoration-transparent hover:decoration-secondary"
                      >
                        {item.detail}
                      </a>
                    ) : (
                      <p className="text-gray-600 text-sm font-light">{item.detail}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="bg-[#f8f9fb] p-10 sm:p-16 relative"
          >
            <div className="absolute top-0 right-0 w-2 h-full bg-secondary" />
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                <div className="space-y-2 group relative">
                  <Label className="text-xs font-bold uppercase tracking-widest text-primary/50 group-focus-within:text-secondary transition-colors">{t('contact.form.lastName')} *</Label>
                  <Input
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    required
                    className="peer bg-transparent !border-0 !shadow-none !outline-none focus:!ring-0 rounded-none px-0 transition-colors font-light h-12"
                    placeholder="Dupont"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary/10" />
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 origin-center" />
                </div>
                <div className="space-y-2 group relative">
                  <Label className="text-xs font-bold uppercase tracking-widest text-primary/50 group-focus-within:text-secondary transition-colors">{t('contact.form.firstName')} *</Label>
                  <Input
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                    required
                    className="peer bg-transparent !border-0 !shadow-none !outline-none focus:!ring-0 rounded-none px-0 transition-colors font-light h-12"
                    placeholder="Jean"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary/10" />
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 origin-center" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                <div className="space-y-2 group relative">
                  <Label className="text-xs font-bold uppercase tracking-widest text-primary/50 group-focus-within:text-secondary transition-colors">{t('contact.form.email')} *</Label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="peer bg-transparent !border-0 !shadow-none !outline-none focus:!ring-0 rounded-none px-0 transition-colors font-light h-12"
                    placeholder="jean@entreprise.com"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary/10" />
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 origin-center" />
                </div>
                <div className="space-y-2 group relative">
                  <Label className="text-xs font-bold uppercase tracking-widest text-primary/50 group-focus-within:text-secondary transition-colors">{t('contact.form.phone')} *</Label>
                  <Input
                    name="telephone"
                    type="tel"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    required
                    className="peer bg-transparent !border-0 !shadow-none !outline-none focus:!ring-0 rounded-none px-0 transition-colors font-light h-12"
                    placeholder="+229 01 .."
                  />
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary/10" />
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 origin-center" />
                </div>
              </div>
              <div className="space-y-2 group relative">
                <Label className="text-xs font-bold uppercase tracking-widest text-primary/50 group-focus-within:text-secondary transition-colors">{t('contact.form.organization')}</Label>
                <Input
                  name="entreprise"
                  value={formData.entreprise}
                  onChange={handleInputChange}
                  className="peer bg-transparent !border-0 !shadow-none !outline-none focus:!ring-0 rounded-none px-0 transition-colors font-light h-12"
                  placeholder={t('contact.form.organizationPlaceholder')}
                />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary/10" />
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 origin-center" />
              </div>
              <div className="space-y-2 group relative">
                <Label className="text-xs font-bold uppercase tracking-widest text-primary/50 group-focus-within:text-secondary transition-colors">{t('contact.form.subject')} *</Label>
                <Input
                  name="sujet"
                  value={formData.sujet}
                  onChange={handleInputChange}
                  required
                  className="peer bg-transparent !border-0 !shadow-none !outline-none focus:!ring-0 rounded-none px-0 transition-colors font-light h-12"
                  placeholder={t('contact.form.subjectPlaceholder')}
                />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary/10" />
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 origin-center" />
              </div>
              <div className="space-y-2 group relative">
                <Label className="text-xs font-bold uppercase tracking-widest text-primary/50 group-focus-within:text-secondary transition-colors">{t('contact.form.message')} *</Label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="peer bg-transparent !border-0 !shadow-none !outline-none focus:!ring-0 rounded-none px-0 transition-colors font-light min-h-[120px] resize-none"
                  placeholder={t('contact.form.messagePlaceholder')}
                />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary/10" />
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 origin-center" />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white hover:bg-secondary hover:text-primary font-bold py-8 text-lg rounded-none shadow-premium hover:shadow-premium-hover transition-all duration-500 group relative overflow-hidden">
                <span className="relative z-10 transition-colors uppercase tracking-widest">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : 'Envoyer le message'}
                </span>
                <span className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

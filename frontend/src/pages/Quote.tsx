import React, { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'react-hot-toast'
import { useLanguage } from '@/contexts/LanguageContext'
import { apiService, QuoteFormData } from '@/services/api'
import quoteHeaderImage from '@/assets/pexels-masoodaslami-28450660.jpg'

// Options pour "Comment avez-vous connu MP GROUP ?" - définies en dehors du composant
const getDiscoveryOptions = (t: (key: string) => string) => [
  { key: 'social', label: t('quote.form.discovery.social') },
  { key: 'recommendation', label: t('quote.form.discovery.recommendation') },
  { key: 'website', label: t('quote.form.discovery.website') },
  { key: 'search', label: t('quote.form.discovery.search') },
  { key: 'press', label: t('quote.form.discovery.press') },
  { key: 'event', label: t('quote.form.discovery.event') },
  { key: 'partner', label: t('quote.form.discovery.partner') },
  { key: 'other', label: t('quote.form.discovery.other') }
]

// Composant FormField défini en dehors pour éviter les re-créations
const FormField = React.memo(({ 
  name, 
  label, 
  placeholder, 
  required = false, 
  type = 'text',
  rows,
  value,
  onChange
}: {
  name: string
  label: string
  placeholder?: string
  required?: boolean
  type?: string
  rows?: number
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}) => (
  <div className="space-y-1 sm:space-y-2 group relative">
    <Label className="text-xs sm:text-xs md:text-xs font-bold uppercase tracking-widest text-primary/50 group-focus-within:text-secondary transition-colors">
      {label} {required && <span className="text-secondary">*</span>}
    </Label>
    {rows ? (
      <Textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className="peer bg-transparent !border-0 !shadow-none !outline-none focus:!ring-0 rounded-none px-0 transition-colors font-light min-h-[80px] sm:min-h-[100px] md:min-h-[120px] resize-none text-sm sm:text-base"
        placeholder={placeholder}
      />
    ) : (
      <Input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="peer bg-transparent !border-0 !shadow-none !outline-none focus:!ring-0 rounded-none px-0 transition-colors font-light h-10 sm:h-11 md:h-12 text-sm sm:text-base"
        placeholder={placeholder}
      />
    )}
    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary/10" />
    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 origin-center" />
  </div>
))

export default function Quote() {
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Clé pour le localStorage
  const FORM_STORAGE_KEY = 'quote_form_data'
  
  // Initialiser le formulaire avec les données du localStorage ou valeurs par défaut
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem(FORM_STORAGE_KEY)
    if (savedData) {
      try {
        return JSON.parse(savedData)
      } catch (error) {
        console.error('Erreur lors du chargement des données sauvegardées:', error)
      }
    }
    return {
      fullname: '',
      structure: '',
      position: '',
      email: '',
      phone: '',
      city: '',
      eventTitle: '',
      eventDate: '',
      eventDateAlternative: '',
      eventDuration: '',
      eventLocation: '',
      eventParticipants: '',
      description: '',
      services: '',
      providers: '',
      budget: '',
      discovery: '',
      additional: ''
    }
  })

  // Obtenir les options de découverte
  const discoveryOptions = getDiscoveryOptions(t)

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      }
      // Sauvegarder dans le localStorage à chaque changement
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(newData))
      return newData
    })
  }, [])

  const handleDiscoverySelect = useCallback((option: string) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        discovery: option
      }
      // Sauvegarder dans le localStorage
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(newData))
      return newData
    })
  }, [])

  // Fonction pour vider le formulaire manuellement
  const clearForm = useCallback(() => {
    const emptyFormData = {
      fullname: '',
      structure: '',
      position: '',
      email: '',
      phone: '',
      city: '',
      eventTitle: '',
      eventDate: '',
      eventDateAlternative: '',
      eventDuration: '',
      eventLocation: '',
      eventParticipants: '',
      description: '',
      services: '',
      providers: '',
      budget: '',
      discovery: '',
      additional: ''
    }
    setFormData(emptyFormData)
    localStorage.removeItem(FORM_STORAGE_KEY)
    toast.success('Formulaire vidé', {
      style: {
        background: '#001A4D',
        color: '#EAB12D',
        borderRadius: '0px',
      }
    })
  }, [])

  // Nettoyer le localStorage si l'utilisateur quitte la page après une soumission réussie
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Ne pas nettoyer si le formulaire contient des données
      const hasData = Object.values(formData).some(value => value.trim() !== '')
      if (!hasData) {
        localStorage.removeItem(FORM_STORAGE_KEY)
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [formData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Mapper les données du formulaire vers le format attendu par l'API
      const [nom, prenom] = formData.fullname.split(' ', 2)
      const quoteData: QuoteFormData = {
        nom: nom || formData.fullname,
        prenom: prenom || '',
        email: formData.email,
        telephone: formData.phone,
        entreprise: formData.structure || undefined,
        type_evenement: formData.eventTitle,
        date_evenement: formData.eventDate,
        lieu_evenement: formData.eventLocation || formData.city,
        nombre_participants: parseInt(formData.eventParticipants) || 1,
        description: `${formData.description}\n\nDurée: ${formData.eventDuration}\n\nDate alternative: ${formData.eventDateAlternative || 'Aucune'}\n\nPosition: ${formData.position || 'Non spécifiée'}\n\nComment nous avez-vous connu: ${formData.discovery || 'Non spécifié'}\n\nInformations complémentaires: ${formData.additional || 'Aucune'}`,
        services_souhaites: formData.services ? [formData.services] : undefined,
        budget_estime: formData.budget ? parseFloat(formData.budget) : undefined,
        discovery: formData.discovery || undefined
      }
      
      await apiService.submitQuote(quoteData)
      
      // Supprimer les données du localStorage après soumission réussie
      localStorage.removeItem(FORM_STORAGE_KEY)
      
      toast.success(t('quote.form.success'), {
        style: {
          background: '#001A4D',
          color: '#EAB12D',
          borderRadius: '0px',
        }
      })
      
      // Reset form
      const emptyFormData = {
        fullname: '',
        structure: '',
        position: '',
        email: '',
        phone: '',
        city: '',
        eventTitle: '',
        eventDate: '',
        eventDateAlternative: '',
        eventDuration: '',
        eventLocation: '',
        eventParticipants: '',
        description: '',
        services: '',
        providers: '',
        budget: '',
        discovery: '',
        additional: ''
      }
      setFormData(emptyFormData)
    } catch (error: any) {
      console.error('Quote submission error:', error)
      
      // Afficher le message d'erreur spécifique du backend ou un message générique
      const errorMessage = error.message || 'Une erreur est survenue. Veuillez réessayer.'
      
      toast.error(errorMessage, {
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
      <section className="relative bg-primary pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-3 sm:px-4 md:px-6 text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full"
          >
            <img
              src={quoteHeaderImage}
              alt="Quote Background"
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
            <div className="w-8 sm:w-10 md:w-12 h-0.5 sm:h-0.5 md:h-1 bg-secondary mx-auto mb-4 sm:mb-6 md:mb-8" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold mb-4 sm:mb-5 md:mb-6 tracking-tight leading-tight">
              {t('quote.page.title')}
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-3 sm:mb-4 max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed font-light px-2 sm:px-0">
              {t('quote.page.subtitle')}
            </p>
            <p className="text-xs sm:text-sm text-white/70 max-w-xs sm:max-w-xl md:max-w-2xl mx-auto px-2 sm:px-0">
              {t('quote.form.required')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-6 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="bg-[#f8f9fb] p-4 sm:p-6 md:p-10 lg:p-16 relative"
          >
            <div className="absolute top-0 right-0 w-1 sm:w-2 h-full bg-secondary" />
            
            <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-12 md:space-y-16">
              {/* Bouton pour vider le formulaire */}
              {Object.values(formData).some(value => value.trim() !== '') && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={clearForm}
                    className="text-xs sm:text-sm text-primary/60 hover:text-primary underline transition-colors"
                  >
                    {t('quote.form.clear')}
                  </button>
                </div>
              )}
              {/* Section 1: Coordonnées */}
              <div>
                <h2 className="text-base sm:text-lg md:text-xl font-heading font-bold text-primary mb-4 sm:mb-6 md:mb-8 uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em]">
                  {t('quote.section.coordinates')}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mb-6 sm:mb-8 md:mb-12">
                  <FormField
                    name="fullname"
                    label={t('quote.form.fullname')}
                    placeholder="Jean Dupont"
                    required
                    value={formData.fullname}
                    onChange={handleInputChange}
                  />
                  <FormField
                    name="structure"
                    label={t('quote.form.structure')}
                    placeholder={t('quote.form.structure.placeholder')}
                    value={formData.structure || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mb-6 sm:mb-8 md:mb-12">
                  <FormField
                    name="position"
                    label={t('quote.form.position')}
                    placeholder="Directeur Marketing"
                    value={formData.position || ''}
                    onChange={handleInputChange}
                  />
                  <FormField
                    name="email"
                    label={t('quote.form.email')}
                    placeholder="jean@entreprise.com"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
                  <FormField
                    name="phone"
                    label={t('quote.form.phone')}
                    placeholder="+229 01 67 27 06 36"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  <FormField
                    name="city"
                    label={t('quote.form.city')}
                    placeholder="Cotonou"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Section 2: Événement */}
              <div>
                <h2 className="text-base sm:text-lg md:text-xl font-heading font-bold text-primary mb-4 sm:mb-6 md:mb-8 uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em]">
                  {t('quote.section.event')}
                </h2>
                <div className="space-y-6 sm:space-y-8 md:space-y-12">
                  <FormField
                    name="eventTitle"
                    label={t('quote.form.event.title')}
                    placeholder={t('quote.form.event.title.placeholder')}
                    required
                    value={formData.eventTitle}
                    onChange={handleInputChange}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
                    <FormField
                      name="eventDate"
                      label={t('quote.form.event.date')}
                      type="date"
                      required
                      value={formData.eventDate}
                      onChange={handleInputChange}
                    />
                    <FormField
                      name="eventDateAlternative"
                      label={t('quote.form.event.date.alternative')}
                      type="date"
                      value={formData.eventDateAlternative || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
                    <FormField
                      name="eventDuration"
                      label={t('quote.form.event.duration')}
                      placeholder={t('quote.form.event.duration.placeholder')}
                      required
                      value={formData.eventDuration}
                      onChange={handleInputChange}
                    />
                    <FormField
                      name="eventLocation"
                      label={t('quote.form.event.location')}
                      placeholder={t('quote.form.event.location.placeholder')}
                      value={formData.eventLocation || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <FormField
                    name="eventParticipants"
                    label={t('quote.form.event.participants')}
                    placeholder="100"
                    type="number"
                    required
                    value={formData.eventParticipants}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Section 3: Besoins */}
              <div>
                <h2 className="text-base sm:text-lg md:text-xl font-heading font-bold text-primary mb-4 sm:mb-6 md:mb-8 uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em]">
                  {t('quote.section.needs')}
                </h2>
                <div className="space-y-6 sm:space-y-8 md:space-y-12">
                  <FormField
                    name="description"
                    label={t('quote.form.description')}
                    placeholder={t('quote.form.description.placeholder')}
                    rows={4}
                    required
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                  <FormField
                    name="services"
                    label={t('quote.form.services')}
                    placeholder={t('quote.form.services.placeholder')}
                    rows={3}
                    value={formData.services || ''}
                    onChange={handleInputChange}
                  />
                  <FormField
                    name="providers"
                    label={t('quote.form.providers')}
                    placeholder={t('quote.form.providers.placeholder')}
                    rows={3}
                    value={formData.providers || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Section 4: Budget */}
              <div>
                <h2 className="text-base sm:text-lg md:text-xl font-heading font-bold text-primary mb-4 sm:mb-6 md:mb-8 uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em]">
                  {t('quote.section.budget')}
                </h2>
                <FormField
                  name="budget"
                  label={t('quote.form.budget')}
                  placeholder={t('quote.form.budget.placeholder')}
                  value={formData.budget || ''}
                  onChange={handleInputChange}
                />
              </div>

              {/* Section 5: Informations complémentaires */}
              <div>
                <h2 className="text-base sm:text-lg md:text-xl font-heading font-bold text-primary mb-4 sm:mb-6 md:mb-8 uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em]">
                  {t('quote.section.additional')}
                </h2>
                <div className="space-y-6 sm:space-y-8 md:space-y-12">
                  {/* Comment avez-vous connu MP GROUP - Options cliquables */}
                  <div className="space-y-3 sm:space-y-4">
                    <Label className="text-xs sm:text-xs md:text-xs font-bold uppercase tracking-widest text-primary/50">
                      {t('quote.form.discovery')}
                    </Label>
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                      {discoveryOptions.map((option) => (
                        <motion.button
                          key={option.key}
                          type="button"
                          onClick={() => handleDiscoverySelect(option.label)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`
                            relative p-3 sm:p-4 text-xs sm:text-sm font-medium transition-all duration-300 border-2 group min-h-[44px] flex items-center justify-center
                            ${
                              formData.discovery === option.label
                                ? 'border-secondary bg-secondary/5 text-primary'
                                : 'border-primary/10 hover:border-secondary/50 text-primary/70 hover:text-primary'
                            }
                          `}
                        >
                          <span className="relative z-10 text-center leading-tight">{option.label}</span>
                          {formData.discovery === option.label && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-1 sm:top-2 right-1 sm:right-2 w-4 sm:w-5 h-4 sm:h-5 bg-secondary rounded-full flex items-center justify-center"
                            >
                              <Check size={10} className="text-primary sm:w-3 sm:h-3" />
                            </motion.div>
                          )}
                          <div className={`
                            absolute inset-0 bg-secondary/5 transition-opacity duration-300
                            ${
                              formData.discovery === option.label
                                ? 'opacity-100'
                                : 'opacity-0 group-hover:opacity-50'
                            }
                          `} />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  
                  <FormField
                    name="additional"
                    label={t('quote.form.additional')}
                    placeholder={t('quote.form.additional.placeholder')}
                    rows={4}
                    value={formData.additional || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-primary text-white hover:bg-secondary hover:text-primary font-bold py-4 sm:py-6 md:py-8 text-sm sm:text-base md:text-lg rounded-none shadow-premium hover:shadow-premium-hover transition-all duration-500 group relative overflow-hidden"
              >
                <span className="relative z-10 transition-colors uppercase tracking-widest flex items-center justify-center gap-2 sm:gap-3">
                  {isSubmitting ? (
                    <Loader2 className="animate-spin w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <>
                      <Send size={16} className="sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm md:text-base">{t('quote.form.submit')}</span>
                    </>
                  )}
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
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { apiService, NewAvisPayload } from '@/services/api'
import { StarRating } from '@/components/ui/star-rating'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Avis() {
  const { t } = useLanguage()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState<NewAvisPayload>({
    nom_complet: '', email: '', nom_evenement: '', note: 0, commentaire: '',
  })

  const { data: avisList, isLoading } = useQuery({
    queryKey: ['avis'],
    queryFn: () => apiService.getAvis(),
  })

  const mutation = useMutation({
    mutationFn: (data: NewAvisPayload) => apiService.submitAvis(data),
    onSuccess: (res) => {
      toast.success(res.message, { style: { background: '#001A4D', color: '#EAB12D', borderRadius: '0px' } })
      setFormData({ nom_complet: '', email: '', nom_evenement: '', note: 0, commentaire: '' })
      queryClient.invalidateQueries({ queryKey: ['avis'] })
    },
    onError: (err: any) => {
      toast.error(err.message, { style: { background: '#dc2626', color: '#ffffff', borderRadius: '0px' } })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.note === 0) {
      toast.error('Veuillez sélectionner une note.')
      return
    }
    mutation.mutate(formData)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">{t('avis.title')}</h1>

      {/* Formulaire */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="space-y-4 mb-16 border p-6"
      >
        <input
          required
          placeholder="Votre nom complet"
          value={formData.nom_complet}
          onChange={(e) => setFormData({ ...formData, nom_complet: e.target.value })}
          className="w-full border p-2"
        />
        <input
          type="email"
          placeholder="Email (optionnel)"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border p-2"
        />
        <input
          required
          placeholder="Nom de l'événement organisé par MP GROUP"
          value={formData.nom_evenement}
          onChange={(e) => setFormData({ ...formData, nom_evenement: e.target.value })}
          className="w-full border p-2"
        />
        <div>
          <p className="mb-2">Qualité de l'organisation</p>
          <StarRating value={formData.note} onChange={(note) => setFormData({ ...formData, note })} />
        </div>
        <textarea
          required
          placeholder="Votre appréciation"
          value={formData.commentaire}
          onChange={(e) => setFormData({ ...formData, commentaire: e.target.value })}
          className="w-full border p-2"
          rows={4}
        />
        <button type="submit" disabled={mutation.isPending} className="bg-[#001A4D] text-[#EAB12D] px-6 py-2">
          {mutation.isPending ? 'Envoi...' : 'Envoyer mon avis'}
        </button>
      </motion.form>

      {/* Liste des avis publiés */}
      <div className="grid md:grid-cols-2 gap-6">
        {isLoading && <p>Chargement...</p>}
        {avisList?.map((avis) => (
          <motion.div
            key={avis.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border p-5"
          >
            <StarRating value={avis.note} readonly size={18} />
            <p className="font-semibold mt-2">{avis.nom_evenement}</p>
            <p className="text-sm text-gray-600 mt-1">"{avis.commentaire}"</p>
            <p className="text-xs text-gray-400 mt-2">— {avis.nom_complet}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
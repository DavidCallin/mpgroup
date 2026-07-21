import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ChevronDown, ChevronUp } from 'lucide-react'
import toast from 'react-hot-toast'
import { apiService, NewAvisPayload } from '@/services/api'
import { StarRating } from '@/components/ui/star-rating'

export default function Avis() {
  const queryClient = useQueryClient()
  const [openEvent, setOpenEvent] = useState<number | null>(null)
  const [formData, setFormData] = useState<Partial<NewAvisPayload>>({
    evenement_id: undefined, nom_complet: '', email: '', note: 0, commentaire: '',
  })

const { data: evenements, error: errEvenements, isFetching, isSuccess } = useQuery({
  queryKey: ['evenements'],
  queryFn: () => apiService.getEvenements(),  
})

console.log('🔵 DEBUG evenements:', { evenements, errEvenements, isFetching, isSuccess })

  const { data: avisGroupes, isLoading } = useQuery({
    queryKey: ['avis'],
    queryFn: () => apiService.getAvis(),
  })

  const mutation = useMutation({
    mutationFn: apiService.submitAvis,mutationFn: (data: NewAvisPayload) => apiService.submitAvis(data),
    onSuccess: (res) => {
      toast.success(res.message)
      setFormData({ evenement_id: undefined, nom_complet: '', email: '', note: 0, commentaire: '' })
      queryClient.invalidateQueries({ queryKey: ['avis'] })
    },
    onError: (err: any) => toast.error(err.message),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.evenement_id) return toast.error('Veuillez sélectionner un événement.')
    if (!formData.note) return toast.error('Veuillez sélectionner une note.')
    mutation.mutate(formData as NewAvisPayload)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Vos avis sur nos événements</h1>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-16 border p-6">
        <select
          required
          value={formData.evenement_id ?? ''}
          onChange={(e) => setFormData({ ...formData, evenement_id: Number(e.target.value) })}
          className="w-full border p-2"
        >
          <option value="">Sélectionnez l'événement</option>
          {evenements?.map((ev) => (
            <option key={ev.id} value={ev.id}>{ev.nom}</option>
          ))}
        </select>

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
        <div>
          <p className="mb-2">Qualité de l'organisation</p>
          <StarRating value={formData.note ?? 0} onChange={(note) => setFormData({ ...formData, note })} />
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
      </form>

      {/* Liste groupée par événement */}
      <div className="space-y-4">
        {isLoading && <p>Chargement...</p>}
        {avisGroupes?.length === 0 && <p className="text-gray-400">Aucun avis pour le moment.</p>}

        {avisGroupes?.map((groupe) => {
          const isOpen = openEvent === groupe.evenement_id
          return (
            <div key={groupe.evenement_id} className="border">
              <div className="p-5 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-lg">{groupe.nom_evenement}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating value={Math.round(groupe.note_moyenne)} readonly size={16} />
                    <span className="text-sm text-gray-600">
                      {groupe.note_moyenne}/5 · {groupe.nombre_avis} avis
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setOpenEvent(isOpen ? null : groupe.evenement_id)}
                  className="flex items-center gap-1 text-sm border px-3 py-1.5 hover:bg-gray-50"
                >
                  {isOpen ? 'Masquer les commentaires' : 'Voir les commentaires'}
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>

              {isOpen && (
                <div className="border-t bg-gray-50 p-5 space-y-4">
                  {groupe.avis.map((a) => (
                    <div key={a.id} className="border-b last:border-0 pb-3">
                      <StarRating value={a.note} readonly size={14} />
                      <p className="text-sm mt-1">"{a.commentaire}"</p>
                      <p className="text-xs text-gray-400 mt-1">---- {a.nom_complet}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
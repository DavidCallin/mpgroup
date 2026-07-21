import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import { apiService } from '@/services/api'
import { StarRating } from '@/components/ui/star-rating'

export default function ManageEvenements() {
  const queryClient = useQueryClient()
  const [nom, setNom] = useState('')
  const [date, setDate] = useState('')

  const { data: evenements, isLoading } = useQuery({
    queryKey: ['admin-evenements'],
    queryFn: () => apiService.getAdminEvenements(),
  })

  const createMutation = useMutation({
    mutationFn: (data: { nom: string; date_evenement?: string }) => apiService.createEvenement(data),
    onSuccess: () => {
      toast.success('Événement créé.')
      setNom(''); setDate('')
      queryClient.invalidateQueries({ queryKey: ['admin-evenements'] })
      queryClient.invalidateQueries({ queryKey: ['evenements'] })
    },
  })

  const toggleActifMutation = useMutation({
    mutationFn: ({ id, actif }: { id: number; actif: boolean }) => apiService.updateEvenement(id, { actif }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-evenements'] })
      queryClient.invalidateQueries({ queryKey: ['evenements'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiService.deleteEvenement(id),
    onSuccess: () => {
      toast.success('Événement supprimé (et ses avis).')
      queryClient.invalidateQueries({ queryKey: ['admin-evenements'] })
    },
  })

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nom.trim()) return
    createMutation.mutate({ nom, date_evenement: date || undefined })
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-[#001A4D] mb-6">Gestion des événements à noter</h1>

      <form onSubmit={handleCreate} className="flex gap-2 mb-8">
        <input
          placeholder="Nom de l'événement"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="flex-1 border p-2"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2"
        />
        <button type="submit" className="bg-[#001A4D] text-[#EAB12D] px-4 flex items-center gap-1">
          <Plus size={18} /> Ajouter
        </button>
      </form>

      {isLoading && <p>Chargement...</p>}

      <div className="space-y-3">
        {evenements?.map((ev) => (
          <div key={ev.id} className="border p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold">{ev.nom}</p>
              <div className="flex items-center gap-2 mt-1">
                <StarRating value={Math.round(ev.note_moyenne)} readonly size={14} />
                <span className="text-sm text-gray-500">
                  {ev.note_moyenne}/5 · {ev.nombre_avis} avis
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleActifMutation.mutate({ id: ev.id, actif: !ev.actif })}
                title={ev.actif ? 'Masquer du formulaire public' : 'Rendre visible'}
                className="p-2 border hover:bg-gray-50"
              >
                {ev.actif ? <Eye size={16} /> : <EyeOff size={16} className="text-gray-400" />}
              </button>
              <button
                onClick={() => confirm('Supprimer cet événement et tous ses avis ?') && deleteMutation.mutate(ev.id)}
                className="p-2 bg-red-100 text-red-700 hover:bg-red-200"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
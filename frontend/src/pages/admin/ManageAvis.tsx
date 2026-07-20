import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Check, X, Trash2, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { apiService, AvisData } from '@/services/api'
import { StarRating } from '@/components/ui/star-rating'
import { useLanguage } from '@/contexts/LanguageContext'

type FilterStatut = 'tous' | 'en_attente' | 'publie' | 'rejete'

const statutColors: Record<string, string> = {
  en_attente: 'bg-yellow-100 text-yellow-800',
  publie: 'bg-green-100 text-green-800',
  rejete: 'bg-red-100 text-red-800',
}

export default function ManageAvis() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState<FilterStatut>('tous')
  const queryClient = useQueryClient()

  const { data: avisList, isLoading } = useQuery({
    queryKey: ['admin-avis', filter],
    queryFn: () => apiService.getAdminAvis(filter === 'tous' ? undefined : filter),
  })

  const { data: autoPublish } = useQuery({
    queryKey: ['avis-auto-publish'],
    queryFn: () => apiService.getAvisAutoPublish(),
  })

  const toastStyle = { style: { background: '#001A4D', color: '#EAB12D', borderRadius: '0px' } }
  const toastErrorStyle = { style: { background: '#dc2626', color: '#ffffff', borderRadius: '0px' } }

  const approveMutation = useMutation({
    mutationFn: (id: number) => apiService.approveAvis(id),
    onSuccess: () => {
      toast.success(t('admin.avis.approve') + '.', toastStyle)
      queryClient.invalidateQueries({ queryKey: ['admin-avis'] })
      queryClient.invalidateQueries({ queryKey: ['avis'] })
    },
    onError: () => toast.error(t('admin.avis.error.approve'), toastErrorStyle),
  })

  const rejectMutation = useMutation({
    mutationFn: (id: number) => apiService.rejectAvis(id),
    onSuccess: () => {
      toast.success(t('admin.avis.reject') + '.', toastStyle)
      queryClient.invalidateQueries({ queryKey: ['admin-avis'] })
    },
    onError: () => toast.error(t('admin.avis.error.reject'), toastErrorStyle),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiService.deleteAvis(id),
    onSuccess: () => {
      toast.success(t('admin.avis.delete') + '.', toastStyle)
      queryClient.invalidateQueries({ queryKey: ['admin-avis'] })
      queryClient.invalidateQueries({ queryKey: ['avis'] })
    },
    onError: () => toast.error(t('admin.avis.error.delete'), toastErrorStyle),
  })

  const toggleAutoPublishMutation = useMutation({
    mutationFn: (value: boolean) => apiService.setAvisAutoPublish(value),
    onSuccess: (res) => {
      toast.success(res.message, toastStyle)
      queryClient.invalidateQueries({ queryKey: ['avis-auto-publish'] })
    },
    onError: () => toast.error(t('admin.avis.error.update'), toastErrorStyle),
  })

  const handleDelete = (id: number) => {
    if (confirm(t('admin.avis.delete.confirm'))) {
      deleteMutation.mutate(id)
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#001A4D]">{t('admin.avis.title')}</h1>

        {/* Toggle publication automatique */}
        <div className="flex items-center gap-3 border px-4 py-2 rounded">
          <span className="text-sm font-medium">{t('admin.avis.autopublish')}</span>
          <button
            onClick={() => toggleAutoPublishMutation.mutate(!autoPublish)}
            disabled={toggleAutoPublishMutation.isPending}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              autoPublish ? 'bg-[#001A4D]' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                autoPublish ? 'translate-x-5' : ''
              }`}
            />
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-6">
        {autoPublish
          ? t('admin.avis.autopublish.on')
          : t('admin.avis.autopublish.off')}
      </p>

      {/* Filtres */}
      <div className="flex gap-2 mb-6">
        {(['tous', 'en_attente', 'publie', 'rejete'] as FilterStatut[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
              filter === f ? 'bg-[#001A4D] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {f === 'tous' ? t('admin.avis.filter.tous') : t(`admin.avis.filter.${f}`)}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin" size={32} />
        </div>
      )}

      {!isLoading && avisList?.length === 0 && (
        <p className="text-center text-gray-400 py-12">{t('avis.list.empty')}</p>
      )}

      <div className="space-y-4">
        {avisList?.map((avis: AvisData) => (
          <motion.div
            key={avis.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border rounded p-4 flex items-start justify-between gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-semibold">{avis.nom_evenement}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${statutColors[avis.statut]}`}>
                  {t(`admin.avis.filter.${avis.statut}`)}
                </span>
              </div>
              <StarRating value={avis.note} readonly size={16} />
              <p className="text-sm text-gray-700 mt-2">{avis.commentaire}</p>
              <p className="text-xs text-gray-400 mt-2">
                {avis.nom_complet} {avis.email && `· ${avis.email}`} ·{' '}
                {new Date(avis.created_at).toLocaleDateString('fr-FR')}
              </p>
            </div>

            <div className="flex gap-2 shrink-0">
              {avis.statut !== 'publie' && (
                <button
                  onClick={() => approveMutation.mutate(avis.id)}
                  title={t('admin.avis.approve')}
                  className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200"
                >
                  <Check size={18} />
                </button>
              )}
              {avis.statut !== 'rejete' && (
                <button
                  onClick={() => rejectMutation.mutate(avis.id)}
                  title={t('admin.avis.reject')}
                  className="p-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                >
                  <X size={18} />
                </button>
              )}
              <button
                onClick={() => handleDelete(avis.id)}
                title={t('admin.avis.delete')}
                className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

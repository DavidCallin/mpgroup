import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, ArrowLeft, Image as ImageIcon, UploadCloud, X } from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'
import { RichTextEditor } from '@/components/admin/RichTextEditor'
import { Loader } from '@/components/ui/Loader'
import { apiService } from '@/services/api'
import { toast } from 'react-hot-toast'

export default function CreateNews() {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [content, setContent] = useState('')
    const [tags, setTags] = useState<string[]>([])
    const [tagInput, setTagInput] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [isUploadingImage, setIsUploadingImage] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files?.[0]
        if (file && file.type.startsWith('image/')) {
            handleImageFile(file)
        }
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            handleImageFile(file)
        }
    }

    const handleImageFile = (file: File) => {
        // Vérifications de l'image
        const maxSize = 2 * 1024 * 1024 // 2MB
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
        
        if (!allowedTypes.includes(file.type)) {
            toast.error('Format d\'image non supporté. Utilisez JPG, PNG ou GIF.')
            return
        }
        
        if (file.size > maxSize) {
            toast.error('L\'image est trop volumineuse. Taille maximum : 2MB.')
            return
        }
        
        // Stocker le fichier et créer un aperçu local
        setImageFile(file)
        const tempUrl = URL.createObjectURL(file)
        setImageUrl(tempUrl)
        
        toast.success('Image sélectionnée avec succès')
    }

    const handleRemoveImage = () => {
        if (imageUrl?.startsWith('blob:')) {
            URL.revokeObjectURL(imageUrl)
        }
        setImageUrl('')
        setImageFile(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleSave = async (status: 'published' | 'draft') => {
        if (!isValid) return
        
        try {
            setIsSaving(true)
            
            let finalImageUrl: string | undefined = undefined
            
            // Si on a un fichier image, l'uploader d'abord
            if (imageFile) {
                try {
                    setIsUploadingImage(true)
                    const response = await apiService.uploadArticleImage(imageFile)
                    finalImageUrl = response.image_url
                    toast.success('Image uploadée avec succès')
                } catch (error) {
                    console.error('Error uploading image:', error)
                    toast.error('Erreur lors de l\'upload de l\'image. Article non sauvegardé.')
                    return
                } finally {
                    setIsUploadingImage(false)
                }
            } else if (imageUrl && !imageUrl.startsWith('blob:')) {
                // Si on a une URL valide (pas blob)
                finalImageUrl = imageUrl
            }
            
            const articleData = {
                title: title.trim(),
                content: content.trim(),
                image_url: finalImageUrl,
                tags: tags.length > 0 ? tags : undefined,
                actualiteStatus: status
            }
            
            await apiService.createArticle(articleData)
            
            // Nettoyer l'URL blob si elle existe
            if (imageUrl?.startsWith('blob:')) {
                URL.revokeObjectURL(imageUrl)
            }
            
            toast.success(`Article ${status === 'published' ? 'publié' : 'sauvegardé en brouillon'} avec succès`, {
                style: {
                    background: '#10B981',
                    color: '#ffffff',
                    borderRadius: '12px',
                },
                duration: 3000
            })
            
            navigate({ to: '/admin/news' })
        } catch (error) {
            console.error('Error saving article:', error)
            toast.error('Erreur lors de la sauvegarde de l\'article')
        } finally {
            setIsSaving(false)
        }
    }

    const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            addTag()
        }
    }

    const addTag = () => {
        const cleanTag = tagInput.trim().replace(/,$/, '')
        if (cleanTag && !tags.includes(cleanTag)) {
            if (tags.length >= 10) {
                toast.error('Maximum 10 tags autorisés')
                return
            }
            setTags([...tags, cleanTag])
            setTagInput('')
        }
    }

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(t => t !== tagToRemove))
    }

    const isValid = title.trim() !== '' && content.trim() !== ''

    return (
        <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto px-2 sm:px-0">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    to="/admin/news"
                    className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 hover:text-primary transition-colors text-gray-400"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-heading font-bold text-primary">Nouvel Article</h1>
                    <p className="text-sm text-gray-500">Rédigez et mettez en forme votre actualité.</p>
                </div>
            </div>

            {/* Editor Main */}
            <div className="bg-white p-4 sm:p-6 lg:p-8 shadow-premium rounded-xl space-y-6">
                {/* Title Input */}
                <div>
                    <label htmlFor="title" className="block text-sm font-bold text-primary uppercase tracking-wider mb-2">
                        Titre de l'article
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-lg font-medium"
                        placeholder="Saisissez un titre accrocheur..."
                    />
                </div>

                {/* SEO Tags */}
                <div>
                    <label htmlFor="tags" className="block text-sm font-bold text-primary uppercase tracking-wider mb-2">
                        Tags & Référencement (Séparés par des virgules)
                        <span className="text-xs text-gray-500 normal-case ml-2">({tags.length}/10 tags)</span>
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                        <AnimatePresence>
                            {tags.map((tag) => (
                                <motion.span
                                    key={tag}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary/10 text-secondary border border-secondary/20 rounded-lg text-xs font-bold uppercase tracking-wider"
                                >
                                    {tag}
                                    <button
                                        onClick={() => removeTag(tag)}
                                        className="hover:text-primary transition-colors"
                                    >
                                        <X size={14} />
                                    </button>
                                </motion.span>
                            ))}
                        </AnimatePresence>
                    </div>
                    <div className="relative">
                        <input
                            id="tags"
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagInputKeyDown}
                            onBlur={addTag}
                            disabled={tags.length >= 10}
                            className={`w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-sm ${
                                tags.length >= 10 ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            placeholder={tags.length >= 10 ? 'Limite de 10 tags atteinte' : 'seo, évènementiel, conseil...'}
                        />
                        {tags.length >= 10 && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-500 text-xs font-medium">
                                Max atteint
                            </div>
                        )}
                    </div>
                    {tags.length >= 8 && tags.length < 10 && (
                        <p className="text-xs text-orange-600 mt-2">
                            Attention : {10 - tags.length} tag{10 - tags.length > 1 ? 's' : ''} restant{10 - tags.length > 1 ? 's' : ''}
                        </p>
                    )}
                </div>

                {/* Cover Image */}
                <div>
                    <label className="block text-sm font-bold text-primary uppercase tracking-wider mb-2">
                        Image de couverture
                    </label>

                    {imageUrl ? (
                        <div className="relative w-full h-64 rounded-xl overflow-hidden border border-gray-200 group">
                            <img src={imageUrl} alt="Cover Preview" className="w-full h-full object-cover" />
                            {isUploadingImage && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
                                    <div className="text-center text-white">
                                        <Loader size={32} className="mx-auto mb-2" />
                                        <p className="text-sm">Upload en cours...</p>
                                    </div>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                <button
                                    onClick={handleRemoveImage}
                                    disabled={isUploadingImage}
                                    className="px-4 py-2 bg-white/20 hover:bg-white text-white hover:text-red-500 rounded-lg flex items-center gap-2 font-medium transition-all disabled:opacity-50"
                                >
                                    <X size={18} /> Changer l'image
                                </button>
                            </div>
                            {imageFile && (
                                <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                                    Aperçu
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
                                    isDragging ? 'border-secondary bg-secondary/5 scale-[1.02]' : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'
                                }`}
                            >
                                <div className={`p-3 rounded-full ${isDragging ? 'bg-secondary/20 text-secondary' : 'bg-white text-gray-400 shadow-sm'}`}>
                                    <UploadCloud size={24} />
                                </div>
                                <div className="text-center">
                                    <p className="text-gray-700 font-medium">Cliquez pour ajouter une image</p>
                                    <p className="text-gray-400 text-sm mt-1">ou glissez-déposez la ici</p>
                                    <p className="text-gray-500 text-xs mt-2">JPG, PNG, GIF - Max 2MB</p>
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="h-[1px] flex-1 bg-gray-200"></div>
                                <span className="text-xs uppercase font-bold text-gray-400">Ou via URL</span>
                                <div className="h-[1px] flex-1 bg-gray-200"></div>
                            </div>

                            <div className="relative">
                                <ImageIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="url"
                                    value={imageUrl?.startsWith('blob:') ? '' : imageUrl || ''}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                                    placeholder="Collez l'URL d'une image web (https://...)"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Content Editor */}
                <div className="pt-4">
                    <label className="block text-sm font-bold text-primary uppercase tracking-wider mb-4">
                        Contenu
                    </label>
                    <RichTextEditor content={content} onChange={setContent} />
                </div>
            </div>

            {/* Actions en bas */}
            <div className="bg-white p-4 sm:p-6 shadow-premium rounded-xl border border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="text-sm text-gray-500">
                        <p className="font-medium">Prêt à publier ?</p>
                        <p>Vérifiez votre contenu avant de publier ou sauvegardez en brouillon.</p>
                    </div>
                    <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                        <button
                            onClick={() => handleSave('draft')}
                            disabled={isSaving || !isValid}
                            className="flex-1 sm:flex-none px-6 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                        >
                            {isSaving ? 'Sauvegarde...' : 'Enregistrer le brouillon'}
                        </button>
                        <button
                            onClick={() => handleSave('published')}
                            disabled={isSaving || !isValid}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-primary font-bold rounded-xl hover:bg-secondary/90 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-secondary"
                        >
                            <Save size={18} /> {isSaving ? 'Publication...' : 'Publier'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

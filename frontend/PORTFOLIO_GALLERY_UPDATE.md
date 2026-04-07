# 📸 Mise à Jour Galerie Portfolio

## Modifications à Apporter

### 1. État du Composant (après ligne 44)

Ajouter ces états après `const [filter, setFilter] = useState('all')` :

```typescript
const [galleryOpen, setGalleryOpen] = useState(false)
const [selectedImages, setSelectedImages] = useState<string[]>([])
const [selectedImageIndex, setSelectedImageIndex] = useState(0)

const openGallery = (images: string[], index = 0) => {
  setSelectedImages(images)
  setSelectedImageIndex(index)
  setGalleryOpen(true)
}
```

### 2. Modifier les Projets (remplacer `image` par `images`)

```typescript
const projects = [
  // Events
  { id: 1, cat: 'events', title: t('portfolio.event.montreux.title'), desc: t('portfolio.event.montreux.desc'), images: [p23, p25, p26], role: t('portfolio.event.montreux.role'), date: t('portfolio.event.montreux.date'), location: t('portfolio.event.montreux.location') },
  { id: 2, cat: 'events', title: t('portfolio.event.partouche.title'), desc: t('portfolio.event.partouche.desc'), images: [p2], role: t('portfolio.event.partouche.role'), date: t('portfolio.event.partouche.date'), location: t('portfolio.event.partouche.location') },
  // ... etc pour tous les projets
]
```

### 3. Modifier l'Affichage des Images (ligne ~340)

Remplacer la section image par :

```typescript
<div className="relative aspect-[16/10] overflow-hidden mb-8 shadow-xl transition-all duration-700 group-hover:shadow-[0_45px_100px_rgba(0,0,0,0.1)] cursor-pointer"
  onClick={() => openGallery(project.images, 0)}
>
  <img
    src={project.images[0]}
    alt={project.title}
    className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
  />
  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-all duration-700" />
  
  {/* Badge catégorie */}
  <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
    <Badge className="bg-white/90 text-primary border-none rounded-none px-3 sm:px-4 py-1 text-[9px] sm:text-[10px] tracking-widest font-bold uppercase backdrop-blur-sm">
      {t(`portfolio.cat.${project.cat}`)}
    </Badge>
  </div>
  
  {/* Indicateur multi-images */}
  {project.images.length > 1 && (
    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-primary/90 backdrop-blur-sm text-white px-3 py-1.5 flex items-center gap-2 text-xs font-bold">
      <ImageIcon size={14} />
      +{project.images.length - 1}
    </div>
  )}
</div>
```

### 4. Ajouter le Modal avant le dernier `</div>` du return

```typescript
{/* Image Gallery Modal */}
<ImageGalleryModal
  images={selectedImages}
  isOpen={galleryOpen}
  onClose={() => setGalleryOpen(false)}
  initialIndex={selectedImageIndex}
/>
```

## Résultat Attendu

- ✅ Clic sur l'image ouvre le modal lightbox
- ✅ Navigation entre images avec flèches
- ✅ Thumbnails en bas pour navigation rapide
- ✅ Indicateur "+2" sur les projets avec plusieurs images
- ✅ Fermeture avec X, Escape ou clic extérieur
- ✅ Animations fluides et premium
- ✅ Responsive mobile/tablet/desktop

## Images Configurées

- **Mon Premier Montreux Afrique** : 3 images (p23, p25, p26)
- **Autres projets** : 1 image chacun (pour l'instant)

Vous pouvez ajouter plus d'images pour chaque projet en modifiant le tableau `images: [...]`

# Optimisation des Images - MP Group

## Problèmes Identifiés
1. ❌ Pas de lazy loading sur les images
2. ❌ Pas de placeholder pendant le chargement (effet bleu/blanc)
3. ❌ Images non optimisées pour mobile
4. ❌ Pas de priorité de chargement

## Solutions Implémentées

### 1. Composant OptimizedImage
Un composant réutilisable créé dans `src/components/ui/OptimizedImage.tsx` qui :
- ✅ Ajoute un placeholder coloré pendant le chargement
- ✅ Transition smooth quand l'image est chargée
- ✅ Support du lazy loading
- ✅ Priorité de chargement configurable

### 2. Optimisations sur Home.tsx
- ✅ Image hero avec `loading="eager"` et `fetchPriority="high"` (chargement prioritaire)
- ✅ Image promise avec `loading="lazy"` (chargement différé)
- ✅ Placeholders avec couleur de fond pendant le chargement
- ✅ Transitions smooth pour éviter l'effet de flash

### 3. Configuration Vite
- ✅ Code splitting pour réduire le bundle initial
- ✅ Chunks séparés pour React, Router et Framer Motion

## Recommandations Supplémentaires

### A. Optimiser les Images Existantes
Les images actuelles sont lourdes. Utilisez un outil comme:
- **Squoosh** (https://squoosh.app/) - en ligne, gratuit
- **ImageOptim** (Mac) ou **FileOptimizer** (Windows)

Cibles de compression :
- Images hero: max 200-300 KB
- Images de fond: max 150 KB
- Images portfolio: max 100 KB chacune

### B. Créer des Versions Responsive
Pour chaque image importante, créez 3 versions :
- Mobile (640px): `image-mobile.webp`
- Tablet (1024px): `image-tablet.webp`
- Desktop (1920px): `image-desktop.webp`

Exemple d'utilisation avec `<picture>` :
```tsx
<picture>
  <source media="(max-width: 640px)" srcSet={heroMobile} />
  <source media="(max-width: 1024px)" srcSet={heroTablet} />
  <img src={heroDesktop} alt="Hero" />
</picture>
```

### C. Utiliser un CDN d'Images
Pour une solution professionnelle, considérez :
- **Cloudinary** (gratuit jusqu'à 25 GB)
- **ImageKit** (gratuit jusqu'à 20 GB)
- **Cloudflare Images**

Avantages :
- Redimensionnement automatique
- Conversion de format automatique (WebP, AVIF)
- Optimisation automatique
- Cache global

### D. Preload des Images Critiques
Ajoutez dans `index.html` pour l'image hero :
```html
<link rel="preload" as="image" href="/src/assets/pexels-am83-14636315.webp" />
```

### E. Utiliser le Composant OptimizedImage
Remplacez progressivement les `<img>` par `<OptimizedImage>` :

```tsx
// Avant
<img src={image} alt="Description" className="w-full" />

// Après
<OptimizedImage 
  src={image} 
  alt="Description" 
  className="w-full"
  priority={false} // true pour images above-the-fold
  placeholderColor="bg-primary" // couleur du placeholder
/>
```

## Prochaines Étapes

1. **Immédiat** : Compresser toutes les images avec Squoosh
2. **Court terme** : Remplacer les `<img>` par `<OptimizedImage>` dans toutes les pages
3. **Moyen terme** : Créer des versions responsive des images principales
4. **Long terme** : Migrer vers un CDN d'images

## Mesure de Performance

Testez les améliorations avec :
- **Lighthouse** (Chrome DevTools)
- **PageSpeed Insights** (https://pagespeed.web.dev/)
- **WebPageTest** (https://www.webpagetest.org/)

Cibles :
- LCP (Largest Contentful Paint) : < 2.5s
- FID (First Input Delay) : < 100ms
- CLS (Cumulative Layout Shift) : < 0.1

## Commandes Utiles

```bash
# Analyser la taille du bundle
npm run build
npx vite-bundle-visualizer

# Tester en production localement
npm run build
npm run preview
```

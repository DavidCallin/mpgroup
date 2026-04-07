# 🚀 Guide Rapide : Compression des Images

## 🔴 Problème Identifié

Vos images sont **TROP LOURDES** :
- **Image hero** : 1.2 MB → devrait être ~200 KB
- **Image promise** : 1.6 MB → devrait être ~150 KB
- **Images portfolio** : jusqu'à 600 KB → devraient être ~100 KB max

**Total actuel : 10.66 MB d'images !**

C'est pourquoi vous voyez l'effet bleu/blanc sur mobile - les images mettent trop de temps à charger.

## ✅ Solution Immédiate (15 minutes)

### Étape 1 : Compresser les Images Principales

1. Allez sur **https://squoosh.app/**
2. Compressez ces 4 images en priorité :

#### Image 1 : Hero (page d'accueil)
- Fichier : `src/assets/pexels-am83-14636315.webp`
- Taille actuelle : 1.2 MB
- Paramètres Squoosh :
  - Format : WebP
  - Quality : 75
  - Resize : 1920px de largeur
- Cible : ~200 KB

#### Image 2 : Promise (section promesse)
- Fichier : `src/assets/pexels-bertellifotografia-16120243.webp`
- Taille actuelle : 1.6 MB
- Paramètres Squoosh :
  - Format : WebP
  - Quality : 70
  - Resize : 1920px de largeur
- Cible : ~150 KB

#### Image 3 : Services Header
- Fichier : `src/assets/pexels-masoodaslami-28450660.jpg`
- Taille actuelle : 357 KB
- Paramètres Squoosh :
  - Format : WebP
  - Quality : 75
  - Resize : 1920px de largeur
- Cible : ~150 KB

#### Image 4 : Contact/Other
- Fichier : `src/assets/pexels-quang-nguyen-vinh-222549-2649771.webp`
- Taille actuelle : 432 KB
- Paramètres Squoosh :
  - Format : WebP
  - Quality : 75
  - Resize : 1920px de largeur
- Cible : ~150 KB

### Étape 2 : Remplacer les Fichiers

1. Téléchargez les images compressées
2. Remplacez les fichiers originaux dans `src/assets/`
3. Gardez les mêmes noms de fichiers

### Étape 3 : Vérifier

```bash
npm run check:images
```

## 📱 Résultat Attendu

Après compression :
- ✅ Chargement 5-10x plus rapide
- ✅ Plus d'effet bleu/blanc
- ✅ Meilleure expérience mobile
- ✅ Meilleur score Lighthouse

## 🎯 Images Portfolio (Optionnel mais Recommandé)

16 images portfolio sont trop lourdes (300-600 KB chacune).

Pour les compresser en batch :
1. Allez sur https://squoosh.app/
2. Paramètres :
   - Format : WebP
   - Quality : 80
   - Resize : 1200px de largeur
3. Compressez toutes les images marquées 🔴 dans le rapport

## 🔍 Vérification Finale

Après compression, testez :

```bash
# 1. Vérifier les tailles
npm run check:images

# 2. Tester localement
npm run build
npm run preview

# 3. Tester sur mobile
# Ouvrez l'URL locale sur votre téléphone
```

## 📊 Objectifs de Performance

Avant :
- Total : 10.66 MB
- LCP : ~5-8 secondes (mobile)

Après :
- Total : ~2-3 MB
- LCP : ~1-2 secondes (mobile)

## 💡 Astuce Pro

Pour les futures images :
1. Toujours compresser AVANT de les ajouter au projet
2. Utiliser WebP au lieu de JPG/PNG
3. Redimensionner à 1920px max pour desktop
4. Quality 75-80 est le sweet spot

## 🆘 Besoin d'Aide ?

Si vous avez des questions :
1. Vérifiez que les images compressées s'affichent bien
2. Comparez avant/après avec les DevTools (Network tab)
3. Testez sur mobile avec un réseau 3G simulé

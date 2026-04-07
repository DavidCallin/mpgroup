# Composant de Gestion des Messages - ManageMessages

## Vue d'ensemble

Le composant `ManageMessages` permet aux administrateurs de gérer tous les messages de contact reçus via le formulaire de contact du site web.

## Fonctionnalités

### 📊 **Statistiques**
- **Total des messages** reçus
- **Nouveaux messages** non lus
- **Messages traités** (marqués comme lus)

### 🔍 **Recherche et Filtrage**
- **Recherche textuelle** par nom, organisation ou email
- **Filtres** : Tous / Nouveaux / Traités
- **Recherche en temps réel** sans rechargement

### 📋 **Liste des Messages**
- **Vue liste** avec informations essentielles
- **Badges de statut** (Nouveau/Lu)
- **Aperçu du message** (2 lignes)
- **Informations de contact** (email, téléphone)
- **Date de réception** formatée intelligemment

### 👁️ **Vue Détaillée**
- **Affichage complet** du message
- **Informations complètes** du contact
- **Actions disponibles** (marquer comme lu, supprimer)
- **Navigation** retour vers la liste

### ⚡ **Actions Rapides**
- **Marquer comme lu** directement depuis la liste
- **Supprimer** avec confirmation
- **Clic sur message** pour voir les détails

## Interface Utilisateur

### Design System
- **Cohérence** avec le style du projet (couleurs primary/secondary)
- **Animations** fluides avec Framer Motion
- **Responsive** pour mobile et desktop
- **Icônes** Lucide React
- **Toasts** pour les feedbacks utilisateur

### États de Chargement
- **Spinner** pendant le chargement initial
- **États désactivés** pendant les actions
- **Messages d'état** (vide, erreur)

## API Integration

### Endpoints Utilisés
```typescript
GET /api/admin/contacts?page=1    // Liste paginée
GET /api/admin/contacts/{id}      // Détail d'un contact
PUT /api/admin/contacts/{id}      // Mise à jour statut
DELETE /api/admin/contacts/{id}   // Suppression
```

### Gestion d'Erreurs
- **Try/catch** sur toutes les requêtes API
- **Toasts d'erreur** informatifs
- **Fallback** en cas d'échec réseau

## Structure du Composant

```
ManageMessages/
├── États (useState)
│   ├── contacts[]           # Liste des messages
│   ├── selectedContact      # Message sélectionné pour détail
│   ├── isLoading           # État de chargement
│   ├── searchQuery         # Terme de recherche
│   ├── filter              # Filtre actuel
│   └── pagination          # Page courante/totale
│
├── Fonctions
│   ├── loadContacts()      # Charger depuis API
│   ├── handleMarkAsRead()  # Marquer comme lu
│   ├── handleDelete()      # Supprimer message
│   └── formatDate()        # Formatage intelligent dates
│
└── Vues
    ├── Vue Liste           # Liste avec filtres/recherche
    └── Vue Détail          # Affichage complet message
```

## Sécurité

### Protection des Routes
- **ProtectedRoute** wrapper
- **Authentification** requise
- **Token Sanctum** pour API

### Validation
- **Confirmation** avant suppression
- **Validation côté serveur** (Laravel)
- **Gestion des erreurs** robuste

## Utilisation

### Navigation
1. **Admin Dashboard** → Clic "Messages" dans sidebar
2. **Route** : `/admin/messages`
3. **Composant** : `ManageMessages`

### Workflow Typique
1. **Voir la liste** des messages avec statistiques
2. **Filtrer/Rechercher** si nécessaire
3. **Cliquer sur un message** pour voir les détails
4. **Marquer comme lu** après traitement
5. **Supprimer** si nécessaire

## Responsive Design

### Mobile
- **Navigation** adaptée
- **Cartes** empilées verticalement
- **Actions** accessibles au doigt

### Desktop
- **Colonnes** optimisées
- **Hover effects** pour interactivité
- **Raccourcis clavier** possibles

## Performance

### Optimisations
- **Pagination** côté serveur
- **Filtrage local** pour la recherche
- **Lazy loading** des détails
- **Animations** optimisées

### Chargement
- **États de chargement** clairs
- **Skeleton screens** possibles
- **Gestion des erreurs** gracieuse

## Accessibilité

### Standards
- **Contraste** suffisant
- **Navigation clavier** possible
- **Screen readers** compatibles
- **Focus management** correct

## Évolutions Possibles

### Fonctionnalités Futures
- **Réponse directe** par email
- **Archivage** des messages
- **Catégorisation** automatique
- **Notifications** push
- **Export** CSV/PDF
- **Recherche avancée** avec filtres multiples
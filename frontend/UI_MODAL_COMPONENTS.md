# Composants UI - Modal & DeleteConfirmationModal

## Vue d'ensemble

Composants modernes pour les modales et confirmations de suppression, remplaçant les `alert()` et `confirm()` natifs du navigateur.

## Modal (Composant de base)

### Fonctionnalités
- **Overlay avec backdrop blur** pour un effet moderne
- **Animations Framer Motion** (fade + scale + slide)
- **Fermeture avec Escape** automatique
- **Fermeture au clic sur overlay** (configurable)
- **Blocage du scroll** du body quand ouvert
- **Tailles configurables** (sm, md, lg, xl)
- **Structure modulaire** avec Header/Body/Footer

### Usage
```tsx
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui'

<Modal isOpen={isOpen} onClose={onClose} size="md">
  <ModalHeader onClose={onClose}>
    <h2>Titre du modal</h2>
  </ModalHeader>
  <ModalBody>
    <p>Contenu du modal</p>
  </ModalBody>
  <ModalFooter>
    <button onClick={onClose}>Fermer</button>
  </ModalFooter>
</Modal>
```

### Props
```tsx
interface ModalProps {
  isOpen: boolean                    // État d'ouverture
  onClose: () => void               // Fonction de fermeture
  children: ReactNode               // Contenu du modal
  size?: 'sm' | 'md' | 'lg' | 'xl' // Taille (défaut: md)
  closeOnOverlayClick?: boolean     // Fermer au clic overlay (défaut: true)
}
```

## DeleteConfirmationModal (Composant spécialisé)

### Fonctionnalités
- **Interface de confirmation** moderne et claire
- **Icône d'alerte** avec couleurs contextuelles
- **Message personnalisable** avec nom de l'élément
- **Zone d'avertissement** sur l'irréversibilité
- **Bouton de confirmation** avec loading state
- **Variants** danger/warning
- **Désactivation des interactions** pendant le loading

### Usage
```tsx
import { DeleteConfirmationModal } from '@/components/ui'

<DeleteConfirmationModal
  isOpen={showDeleteModal}
  onClose={() => setShowDeleteModal(false)}
  onConfirm={handleDelete}
  title="Supprimer le message"
  itemName="Message de Jean Dupont"
  isLoading={isDeleting}
/>
```

### Props
```tsx
interface DeleteConfirmationModalProps {
  isOpen: boolean                    // État d'ouverture
  onClose: () => void               // Fonction d'annulation
  onConfirm: () => void             // Fonction de confirmation
  title?: string                    // Titre (défaut: "Confirmer la suppression")
  message?: string                  // Message personnalisé
  itemName?: string                 // Nom de l'élément à supprimer
  isLoading?: boolean               // État de chargement (défaut: false)
  confirmText?: string              // Texte du bouton (défaut: "Supprimer")
  cancelText?: string               // Texte d'annulation (défaut: "Annuler")
  variant?: 'danger' | 'warning'    // Variante de couleur (défaut: danger)
}
```

## Design System

### Couleurs
- **Danger** : Rouge (red-500/600/700)
- **Warning** : Orange (orange-500/600/700)
- **Neutral** : Gris (gray-100/200/300)

### Animations
- **Durée** : 200ms pour fluidité
- **Easing** : easeOut pour naturel
- **Overlay** : Fade in/out
- **Modal** : Scale + slide up/down

### Accessibilité
- **Focus management** automatique
- **Escape key** pour fermer
- **ARIA labels** appropriés
- **Contraste** suffisant
- **Taille des boutons** tactile

## Intégration dans ManageMessages

### État du modal
```tsx
const [deleteModal, setDeleteModal] = useState<{
  isOpen: boolean
  contact: Contact | null
}>({ isOpen: false, contact: null })
```

### Ouverture
```tsx
const handleDeleteClick = (contact: Contact) => {
  setDeleteModal({ isOpen: true, contact })
}
```

### Confirmation
```tsx
const handleDeleteConfirm = async () => {
  if (!deleteModal.contact) return
  
  try {
    setIsDeleting(deleteModal.contact.id)
    await apiService.deleteContact(deleteModal.contact.id)
    // Mise à jour de l'état local
    toast.success('Message supprimé avec succès')
    setDeleteModal({ isOpen: false, contact: null })
  } catch (error) {
    toast.error('Erreur lors de la suppression')
  } finally {
    setIsDeleting(null)
  }
}
```

## Avantages vs Alert natif

### Expérience Utilisateur
✅ **Design moderne** vs interface système  
✅ **Animations fluides** vs apparition brutale  
✅ **Informations contextuelles** vs message générique  
✅ **États de chargement** vs blocage interface  
✅ **Cohérence visuelle** vs style système  

### Fonctionnalités
✅ **Personnalisation complète** du contenu  
✅ **Gestion des erreurs** intégrée  
✅ **Loading states** avec spinners  
✅ **Fermeture multiple** (X, Escape, overlay)  
✅ **Responsive** sur tous devices  

### Développement
✅ **Réutilisable** pour tous types de confirmations  
✅ **TypeScript** avec types stricts  
✅ **Testable** facilement  
✅ **Maintenable** avec structure modulaire  

## Évolutions possibles

### Fonctionnalités futures
- **Confirmation par saisie** ("Tapez SUPPRIMER")
- **Délai de confirmation** (3 secondes)
- **Undo action** avec toast
- **Batch deletion** pour plusieurs éléments
- **Animations personnalisées** par contexte
- **Sons de confirmation** (optionnel)

### Autres modales
- **InfoModal** pour informations
- **ConfirmModal** générique
- **FormModal** pour saisies
- **ImageModal** pour galeries
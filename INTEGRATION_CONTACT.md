# Intégration Frontend-Backend - Page Contact

## Configuration réalisée

### Backend (Laravel)
- ✅ Modèle `Contact` configuré avec les champs : fullname, organization, email, phone, message, contactStatus
- ✅ Migration de base de données créée (table `contact`)
- ✅ Contrôleur `ContactController` avec méthode `apiStore()` 
- ✅ Route API `/api/contact` (POST) configurée
- ✅ Configuration CORS pour permettre les requêtes cross-origin
- ✅ Validation des données et envoi d'email de notification

### Frontend (React)
- ✅ Service API créé (`/src/services/api.ts`)
- ✅ Formulaire Contact modifié pour utiliser l'API
- ✅ Gestion des états de chargement et d'erreur
- ✅ Variables d'environnement configurées
- ✅ Bouton de test de connexion API ajouté

## Comment tester l'intégration

### 1. Démarrer le backend
```bash
cd backend
php artisan serve
```
Le backend sera accessible sur `http://localhost:8000`

### 2. Démarrer le frontend
```bash
cd frontend
npm run dev
```
Le frontend sera accessible sur `http://localhost:5173`

### 3. Tester la connexion
1. Aller sur la page Contact
2. Cliquer sur "Tester la connexion API" 
3. Vérifier que le message "API connectée: API is working" s'affiche

### 4. Tester le formulaire
1. Remplir tous les champs requis (nom, email, téléphone, message)
2. Cliquer sur "Envoyer le message"
3. Vérifier que le message de succès s'affiche
4. Vérifier en base de données que l'enregistrement a été créé

### 5. Vérifier en base de données
```sql
SELECT * FROM contact ORDER BY created_at DESC LIMIT 5;
```

## Structure des données

### Champs du formulaire
- `fullname` (requis) : Nom complet
- `organization` (optionnel) : Organisation/Entreprise  
- `email` (requis) : Adresse email
- `phone` (requis) : Numéro de téléphone
- `message` (requis) : Message/Description du besoin

### Réponse API
```json
{
  "message": "Contact submitted successfully",
  "contact": {
    "id": 1,
    "fullname": "Jean Dupont",
    "organization": "Entreprise XYZ",
    "email": "jean@entreprise.com",
    "phone": "+229 01 67 27 06 36",
    "message": "Besoin d'organiser un événement...",
    "contactStatus": "nouveau",
    "created_at": "2024-01-15T10:30:00.000000Z",
    "updated_at": "2024-01-15T10:30:00.000000Z"
  }
}
```

## Prochaines étapes

1. Supprimer le bouton de test API en production
2. Configurer l'envoi d'emails (SMTP)
3. Ajouter une page d'administration pour gérer les contacts
4. Implémenter la validation côté frontend
5. Ajouter des tests automatisés
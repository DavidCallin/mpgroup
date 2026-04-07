# Sécurité Frontend React - MP GROUP

## Protection des Routes Implémentée

### 1. Contexte d'Authentification
- **Fichier**: `src/contexts/AuthContext.tsx`
- **Fonction**: Gère l'état global d'authentification
- **Fonctionnalités**:
  - Vérification automatique du token au démarrage
  - Gestion de l'état utilisateur
  - Méthodes login/logout
  - Persistance du token dans localStorage

### 2. Composants de Protection

#### ProtectedRoute
- **Fichier**: `src/components/auth/ProtectedRoute.tsx`
- **Usage**: Protège les routes admin
- **Comportement**:
  - Redirige vers `/admin/login` si non authentifié
  - Affiche un loader pendant la vérification
  - Permet l'accès si authentifié

#### PublicOnlyRoute
- **Fichier**: `src/components/auth/ProtectedRoute.tsx`
- **Usage**: Pour les pages de connexion
- **Comportement**:
  - Redirige vers `/admin/dashboard` si déjà authentifié
  - Empêche l'accès aux pages de login quand connecté

### 3. Routes Protégées

#### Routes Admin (Nécessitent une authentification)
```
/admin/dashboard     # Tableau de bord
/admin/messages      # Gestion des messages
/admin/news          # Gestion des actualités
/admin/news/new      # Création d'actualité
```

#### Routes Publiques Admin (Accès sans authentification)
```
/admin/login              # Page de connexion
/admin/forgot-password    # Mot de passe oublié
/admin/reset-link-sent    # Confirmation envoi lien
/admin/reset-password     # Réinitialisation mot de passe
```

#### Routes Publiques (Site web)
```
/                    # Accueil
/group              # À propos
/expertises         # Expertises
/services           # Services
/portfolio          # Portfolio
/founder            # Fondateur
/news               # Actualités publiques
/contact            # Contact
/privacy-policy     # Politique de confidentialité
/terms-of-service   # Conditions d'utilisation
```

### 4. Flux d'Authentification

#### Connexion
1. Utilisateur saisit email/mot de passe
2. Appel API `/api/auth/login`
3. Stockage du token et des infos utilisateur
4. Redirection vers `/admin/dashboard`

#### Vérification Automatique
1. Au démarrage de l'app, vérification du token localStorage
2. Si token présent, appel API `/api/auth/user`
3. Si valide, utilisateur connecté
4. Si invalide, nettoyage et redirection

#### Déconnexion
1. Appel API `/api/auth/logout`
2. Nettoyage localStorage
3. Redirection vers `/admin/login`

### 5. Sécurité Implémentée

#### Protection Automatique
✅ **Redirection automatique** si non authentifié
✅ **Vérification du token** à chaque démarrage
✅ **Nettoyage automatique** des tokens invalides
✅ **Persistance sécurisée** dans localStorage
✅ **Gestion des erreurs** d'authentification

#### Expérience Utilisateur
✅ **Loaders** pendant les vérifications
✅ **Messages de feedback** (toast)
✅ **Redirection intelligente** selon l'état
✅ **Bouton de déconnexion** dans l'interface admin

### 6. Configuration API

#### Service API
- **Fichier**: `src/services/api.ts`
- **Token**: Ajouté automatiquement aux headers
- **Gestion d'erreurs**: Nettoyage automatique si 401

#### Variables d'Environnement
```env
VITE_API_URL=http://localhost:8000/api
```

### 7. Test de Sécurité

#### Scénarios à Tester

1. **Accès direct aux routes admin sans connexion**
   - Aller sur `/admin/dashboard` → Redirection vers `/admin/login`

2. **Token expiré/invalide**
   - Modifier le token localStorage → Nettoyage et redirection

3. **Connexion réussie**
   - Login valide → Accès aux routes admin

4. **Déconnexion**
   - Clic déconnexion → Nettoyage et redirection

5. **Accès aux pages de login quand connecté**
   - Aller sur `/admin/login` connecté → Redirection vers dashboard

### 8. Architecture de Sécurité

```
Frontend React
├── AuthProvider (Contexte global)
├── ProtectedRoute (Routes admin)
├── PublicOnlyRoute (Pages de connexion)
├── ApiService (Gestion tokens)
└── AdminLayout (Interface sécurisée)
```

### 9. Points de Sécurité Critiques

⚠️ **Token Storage**: localStorage (considérer httpOnly cookies en production)
⚠️ **HTTPS**: Obligatoire en production
⚠️ **CORS**: Configuré côté backend
⚠️ **Validation**: Côté backend principalement

## Sécurité Garantie

✅ **Impossible d'accéder aux routes admin sans authentification**
✅ **Vérification automatique des tokens**
✅ **Nettoyage automatique des sessions invalides**
✅ **Interface utilisateur sécurisée**
✅ **Gestion complète du cycle de vie d'authentification**
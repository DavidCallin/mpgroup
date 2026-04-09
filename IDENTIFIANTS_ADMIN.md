# Identifiants de Connexion Admin

## 🔐 Accès Administration MP Group

**URL de connexion :** `/admin/login`

### Identifiants par défaut :
- **Email :** `admin@mpgroup.com`
- **Mot de passe :** `password123`

## 🚀 Fonctionnalités implémentées

### ✅ Authentification
- Login avec email/mot de passe
- Génération et stockage du token Sanctum
- Gestion des erreurs de connexion
- Messages de succès/erreur
- Stockage sécurisé du token et des infos utilisateur

### ✅ API Routes disponibles
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion (protégée)
- `GET /api/auth/user` - Infos utilisateur (protégée)
- `POST /api/auth/forgot-password` - Mot de passe oublié
- `POST /api/auth/reset-password` - Reset mot de passe

### ✅ Sécurité
- Tokens Sanctum pour l'authentification API
- Validation des données côté backend
- Gestion des erreurs et timeouts
- Protection CSRF désactivée pour les routes API

## 🔧 Test de l'intégration

1. **Aller sur la page de connexion :** `http://localhost:5173/admin/login`
2. **Saisir les identifiants :**
   - Email: `admin@mpgroup.com`
   - Mot de passe: `password123`
3. **Cliquer sur "Se connecter"**
4. **Vérifier la redirection vers `/admin`**

## 📝 Notes techniques

- Le token est stocké dans `localStorage` sous la clé `auth_token`
- Les infos utilisateur sont stockées sous la clé `user`
- Le service API gère automatiquement l'ajout du token Bearer dans les headers
- La déconnexion nettoie automatiquement le stockage local

## 🔄 Prochaines étapes

- Implémenter la page dashboard admin
- Ajouter la gestion des contacts depuis l'admin
- Implémenter la fonctionnalité "mot de passe oublié"
- Ajouter la gestion des actualités
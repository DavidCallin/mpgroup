# Sécurité des Routes Admin - MP GROUP

## Protection mise en place

### 1. Middleware AdminMiddleware
- **Fichier**: `app/Http/Middleware/AdminMiddleware.php`
- **Fonction**: Vérifie l'authentification avant l'accès aux routes admin
- **Réponse**: 401 pour les requêtes API non autorisées

### 2. Routes API Protégées

#### Routes Admin Dashboard
```
GET /api/admin/stats
GET /api/admin/recent-messages  
GET /api/admin/recent-news
```
**Protection**: `auth:sanctum` + `admin`

#### Routes Gestion Contacts
```
GET /api/admin/contacts
GET /api/admin/contacts/{contact}
PUT /api/admin/contacts/{contact}
DELETE /api/admin/contacts/{contact}
```
**Protection**: `auth:sanctum` + `admin`

#### Routes Gestion Actualités
```
POST /api/news
PUT /api/news/{actualite}
DELETE /api/news/{actualite}
POST /api/news/upload
```
**Protection**: `auth:sanctum` + `admin`

### 3. Routes Publiques (Non protégées)

#### API Publiques
```
POST /api/contact          # Formulaire de contact
GET /api/news             # Liste des actualités
GET /api/news/{actualite} # Détail d'une actualité
POST /api/auth/login      # Connexion
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### 4. Authentification

#### Utilisateur Admin par défaut
- **Email**: admin@mpgroup.com
- **Mot de passe**: password123
- **Création**: Via `AdminUserSeeder`

#### Commandes pour créer l'admin
```bash
php artisan migrate
php artisan db:seed --class=AdminUserSeeder
```

### 5. Tests de Sécurité

#### Fichier de test
`tests/Feature/AdminProtectionTest.php`

#### Commande pour tester
```bash
php artisan test --filter=AdminProtectionTest
```

### 6. Vérifications de Sécurité

#### Tester l'accès non autorisé
```bash
# Ces requêtes doivent retourner 401
curl -X GET http://localhost:8000/api/admin/stats
curl -X GET http://localhost:8000/api/admin/contacts
curl -X POST http://localhost:8000/api/news
```

#### Tester l'accès autorisé
```bash
# 1. Se connecter d'abord
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mpgroup.com","password":"password123"}'

# 2. Utiliser le token retourné
curl -X GET http://localhost:8000/api/admin/stats \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Architecture

- **Backend**: Laravel API uniquement (pas de vues)
- **Frontend**: React séparé dans le dossier `frontend/`
- **Communication**: API REST avec tokens Sanctum

## Sécurité Garantie

✅ **Toutes les routes admin sont protégées**
✅ **Accès impossible sans authentification**
✅ **Tokens Sanctum requis pour les API**
✅ **Tests automatisés pour vérifier la sécurité**
✅ **Séparation complète frontend/backend**

## Recommandations Supplémentaires

1. **Rôles utilisateurs**: Ajouter un système de rôles pour différencier admin/utilisateur
2. **Rate limiting**: Limiter les tentatives de connexion
3. **Logs de sécurité**: Enregistrer les tentatives d'accès non autorisées
4. **HTTPS**: Utiliser HTTPS en production
5. **CORS**: Configurer CORS pour le frontend React
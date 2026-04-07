# Guide de Dépannage - Intégration API

## Problème rencontré
```
GET http://localhost:8000/api/test 404 (Not Found)
```

## Solutions à tester dans l'ordre

### 1. Vérifier que le backend Laravel fonctionne

```bash
cd backend
php artisan serve
```

Vérifier que le message s'affiche : `Laravel development server started: http://127.0.0.1:8000`

### 2. Tester l'API directement dans le navigateur

Ouvrir : `http://localhost:8000/api/test`

Résultat attendu :
```json
{
  "message": "API is working",
  "timestamp": "2024-01-15T10:30:00.000000Z",
  "status": "success"
}
```

### 3. Utiliser le fichier de test HTML

1. Ouvrir `test-api.html` dans le navigateur
2. Cliquer sur "Tester /api/test"
3. Vérifier le résultat

### 4. Vérifier les routes Laravel

```bash
cd backend
php artisan route:list --path=api
```

Vérifier que les routes suivantes existent :
- `GET api/test`
- `POST api/contact`

### 5. Vérifier la configuration CORS

Le fichier `backend/config/cors.php` doit contenir :
```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_methods' => ['*'],
'allowed_origins' => ['*'],
```

### 6. Redémarrer le serveur Laravel

```bash
cd backend
php artisan config:clear
php artisan route:clear
php artisan serve
```

### 7. Vérifier les logs Laravel

```bash
cd backend
tail -f storage/logs/laravel.log
```

### 8. Tester avec curl

```bash
curl -X GET http://localhost:8000/api/test
curl -X POST http://localhost:8000/api/contact \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "fullname": "Test User",
    "email": "test@example.com", 
    "phone": "+229 01 23 45 67",
    "message": "Test message"
  }'
```

### 9. Vérifier la base de données

```bash
cd backend
php artisan migrate:status
php artisan migrate # si nécessaire
```

### 10. Problèmes courants

#### Port différent
Si Laravel démarre sur un port différent (ex: 8001), mettre à jour :
```
VITE_API_URL=http://localhost:8001/api
```

#### Cache du navigateur
Vider le cache du navigateur ou utiliser le mode incognito

#### Firewall/Antivirus
Vérifier que le port 8000 n'est pas bloqué

## Commandes de diagnostic

```bash
# Vérifier les processus sur le port 8000
netstat -an | findstr :8000

# Tester la connectivité
ping localhost

# Vérifier les variables d'environnement (frontend)
console.log(import.meta.env.VITE_API_URL)
```
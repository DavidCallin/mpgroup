# MP GROUP - Plateforme Web Institutionnelle

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=flat-square&logo=laravel&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-8.2-777BB4?style=flat-square&logo=php&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)
![Database MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)

**MP GROUP (Marveen Promise Group)** est une plateforme web institutionnelle développée pour présenter les activités, les expertises et les réalisations d'une entreprise spécialisée dans la coordination d'événements stratégiques.

La plateforme offre une expérience digitale moderne, bilingue et responsive, avec un espace d'administration permettant de gérer les actualités, les messages de contact et les demandes de devis.

 **Site web :** https://mpgroupcompany.com/

---

## Présentation du projet

MP GROUP accompagne les institutions, les entreprises, les dirigeants et les personnalités dans l'organisation et la coordination d'événements à forte portée institutionnelle.

La plateforme a pour objectif de renforcer sa présence digitale, valoriser ses réalisations et faciliter les interactions avec ses prospects et partenaires.

### Fonctionnalités principales

- Présentation institutionnelle du groupe et de son fondateur.
- Présentation des expertises et des services.
- Portfolio des événements et réalisations.
- Système de publication d'actualités et d'articles.
- Formulaire de contact avec notifications par email.
- Formulaire de demande de devis détaillé.
- Interface d'administration sécurisée.
- Gestion des messages et demandes de devis.
- Gestion des actualités avec éditeur de contenu riche.
- Tableau de bord avec statistiques.
- Interface multilingue français / anglais.
- Interface responsive adaptée aux ordinateurs, tablettes et mobiles.

---

##  Stack technique

Le projet repose sur une architecture Full Stack séparant le frontend et le backend afin de faciliter la maintenance, l'évolution et la réutilisation des services.

### Frontend

| Technologie | Utilisation |
|---|---|
| React 19 | Construction des interfaces utilisateur |
| TypeScript | Typage et fiabilité du code |
| Vite | Environnement de développement et build |
| Tailwind CSS | Stylisation et responsive design |
| TanStack Router | Gestion de la navigation |
| TanStack Query | Gestion des requêtes et du cache |
| Framer Motion | Animations et interactions |
| Radix UI | Composants accessibles |
| shadcn/ui | Bibliothèque de composants UI |
| React Hook Form | Gestion des formulaires |
| Zod | Validation des données |
| Tiptap | Éditeur de contenu riche |
| Recharts | Visualisation des statistiques |
| Lucide React | Icônes |

### Backend

| Technologie | Utilisation |
|---|---|
| PHP 8.2 | Langage backend |
| Laravel 12 | Framework backend |
| Laravel Sanctum | Authentification API |
| Laravel Fortify | Gestion de l'authentification |
| Laravel Wayfinder | Génération des routes |
| SQLite | Base de données par défaut |
| Resend | Service d'envoi d'emails |
| Guzzle | Requêtes HTTP |

---

## Architecture du projet

Le projet est organisé en deux applications indépendantes qui communiquent à travers une API REST.

```text
mpgroup/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── layout/
│   │   │   ├── portfolio/
│   │   │   └── ui/
│   │   ├── contexts/
│   │   │   ├── AuthContext.tsx
│   │   │   ├── LanguageContext.tsx
│   │   │   └── ArticlesContext.tsx
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   │   └── admin/
│   │   └── services/
│   │       └── api.ts
│   │
│   └── package.json
│
└── backend/
    ├── app/
    │   ├── Http/
    │   │   ├── Controllers/
    │   │   └── Middleware/
    │   ├── Jobs/
    │   ├── Mail/
    │   └── Models/
    ├── database/
    │   ├── migrations/
    │   └── seeders/
    ├── resources/
    │   └── views/
    ├── routes/
    │   ├── api.php
    │   └── web.php
    └── composer.json
```

---

## Internationalisation (FR / EN)

La plateforme intègre un système de traduction permettant aux visiteurs de naviguer entre deux langues :

- Français (FR)
- Anglais (EN)

L'internationalisation est gérée à travers un contexte React personnalisé : `LanguageContext.tsx`.

Ce contexte expose un hook `useLanguage()` permettant de récupérer la langue active, de changer de langue et d'accéder aux traductions.

Exemple d'utilisation :

```tsx
const { t, language, setLanguage } = useLanguage();

// Afficher une traduction
<h1>{t('hero.title')}</h1>

// Changer de langue
setLanguage('en');
```

Les traductions sont centralisées dans un objet organisé par langue et par section de l'application.

---

## Authentification et espace d'administration

L'application dispose d'un espace d'administration permettant de gérer les contenus et les interactions avec les visiteurs.

L'authentification repose sur Laravel Sanctum et Laravel Fortify.

### Fonctionnalités administratives

| Module | Fonctionnalités |
|---|---|
| Dashboard | Statistiques et activités récentes |
| Messages | Consultation, suivi et suppression des messages |
| Devis | Consultation et gestion des demandes de devis |
| Actualités | Création, modification et suppression des articles |
| Authentification | Connexion, déconnexion et réinitialisation du mot de passe |

Les routes privées sont protégées côté frontend par un système de vérification d'authentification et côté backend par un middleware dédié.

Les requêtes authentifiées utilisent un token Bearer transmis dans l'en-tête HTTP `Authorization`.

---

## Gestion des formulaires et des demandes

### Formulaire de contact

Les visiteurs peuvent contacter directement l'entreprise à travers un formulaire dédié.

Les informations collectées comprennent :
- Nom et prénom.
- Adresse email.
- Téléphone.
- Entreprise.
- Sujet.
- Message.

Les données sont enregistrées dans la base de données et transmises par email.

### Demande de devis

Un formulaire structuré permet aux prospects de présenter leurs besoins en matière d'organisation événementielle.

Il comprend plusieurs sections :

1. Coordonnées du demandeur.
2. Informations sur l'événement.
3. Services souhaités.
4. Budget estimatif.
5. Informations complémentaires.

Les données du formulaire sont temporairement sauvegardées dans le navigateur afin de limiter les pertes d'informations en cas de navigation accidentelle.

Les demandes sont ensuite accessibles depuis l'espace d'administration.

---

## Gestion des actualités

La plateforme dispose d'un module de gestion éditoriale permettant à l'équipe d'administration de publier et de gérer les actualités du groupe.

Fonctionnalités :
- Création et modification des articles.
- Gestion des brouillons et publications.
- Éditeur de texte riche avec Tiptap.
- Ajout d'images de couverture.
- Gestion des tags.
- Consultation des articles populaires.
- Comptabilisation des vues.

---

## API REST

Le backend Laravel expose une API REST consommée par l'application React.

### Authentification

| Méthode | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Connexion |
| POST | `/api/auth/logout` | Déconnexion |
| GET | `/api/auth/user` | Informations utilisateur |
| POST | `/api/auth/forgot-password` | Demande de réinitialisation |
| POST | `/api/auth/reset-password` | Réinitialisation du mot de passe |

### Contacts

| Méthode | Endpoint | Description |
|---|---|---|
| POST | `/api/contact` | Envoyer un message |
| GET | `/api/admin/contacts` | Liste des messages |
| GET | `/api/admin/contacts/{id}` | Détails d'un message |
| PUT | `/api/admin/contacts/{id}` | Modifier le statut |
| DELETE | `/api/admin/contacts/{id}` | Supprimer un message |

### Devis

| Méthode | Endpoint | Description |
|---|---|---|
| POST | `/api/quotes` | Soumettre une demande |
| GET | `/api/admin/quotes` | Liste des demandes |
| GET | `/api/admin/quotes/{id}` | Détails d'une demande |
| PATCH | `/api/admin/quotes/{id}/status` | Modifier le statut |
| PUT | `/api/admin/quotes/{id}` | Modifier une demande |
| DELETE | `/api/admin/quotes/{id}` | Supprimer une demande |

### Actualités

| Méthode | Endpoint | Description |
|---|---|---|
| GET | `/api/news` | Liste des articles |
| GET | `/api/news/popular` | Articles populaires |
| GET | `/api/news/{id}` | Détails d'un article |
| POST | `/api/news` | Créer un article |
| PUT | `/api/news/{id}` | Modifier un article |
| DELETE | `/api/news/{id}` | Supprimer un article |
| POST | `/api/news/upload` | Téléverser une image |

---

## SEO et performances

Le projet intègre plusieurs mécanismes destinés à améliorer sa visibilité et son expérience utilisateur.

- Gestion dynamique des balises SEO.
- Métadonnées Open Graph et Twitter Cards.
- Données structurées Schema.org.
- Génération d'un sitemap XML.
- Suivi des interactions avec Google Analytics 4.
- Chargement et gestion optimisés des données avec TanStack Query.
- Interface responsive.
- Animations et transitions avec Framer Motion.

---

## Identité visuelle

La direction artistique repose sur une identité institutionnelle et premium.

| Élément | Valeur |
|---|---|
| Couleur principale | `#001A4D` |
| Couleur secondaire | `#EAB12D` |
| Police des titres | TT Travels Next |
| Police du contenu | Manrope |
| Style | Institutionnel, élégant et minimaliste |

---

## Installation et configuration

### Prérequis

- PHP 8.2 ou supérieur.
- Composer.
- Node.js et npm.
- Git.
- Une base de données compatible avec Laravel.

### 1. Cloner le projet

```bash
git clone git@github.com:DavidCallin/mpgroup.git
cd mpgroup
```

### 2. Configuration du backend

```bash
cd backend

composer install

cp .env.example .env

php artisan key:generate
```

Configurer les variables d'environnement de la base de données et du service email dans le fichier `.env`.

Exécuter ensuite les migrations :

```bash
php artisan migrate
```

Créer le lien symbolique du stockage public :

```bash
php artisan storage:link
```

### 3. Configuration du frontend

```bash
cd ../frontend

npm install
```

Créer un fichier `.env` à partir du modèle de configuration disponible et définir l'URL de l'API :

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

### 4. Lancer le projet

**Backend :**

```bash
cd backend
composer run dev
```

**Frontend :**

```bash
cd frontend
npm run dev
```

### 5. Build de production

```bash
cd frontend
npm run build
```

---

## Déploiement

Le projet utilise une architecture de déploiement séparée :

| Application | Hébergement |
|---|---|
| Frontend React | Vercel |
| Backend Laravel | Serveur distant |
| API | Laravel REST API |
| Emails | Service Resend / configuration mail |

Le frontend communique avec le backend à travers la variable d'environnement `VITE_API_URL`.

---

## Développement

**Conception et développement : Callin HOUNGA**

Ce projet illustre la mise en œuvre d'une solution web Full Stack intégrant une interface publique, une API backend, un système d'administration et des fonctionnalités de gestion de contenus et de demandes commerciales.

**Compétences mobilisées :**
- Développement frontend avec React et TypeScript.
- Développement backend avec Laravel et PHP.
- Conception et intégration d'API REST.
- Gestion de l'authentification et des accès.
- Gestion de formulaires et validation des données.
- Internationalisation des interfaces.
- Intégration de services d'envoi d'emails.
- Développement d'interfaces d'administration.
- SEO et intégration d'outils analytiques.

---

## Licence

Tous droits réservés à MP GROUP et aux détenteurs respectifs des éléments du projet.

Ce dépôt est destiné à présenter le travail de développement réalisé. Toute réutilisation du code doit faire l'objet d'une autorisation préalable.

---

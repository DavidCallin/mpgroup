# 🏢 MP GROUP — Guide Complet du Projet

> **Documentation destinée à une IA** pour comprendre, naviguer et ajouter des fonctionnalités au projet **MP GROUP** sans avoir besoin d'y accéder localement.

---

## 📋 Table des Matières

1. [Présentation Générale](#1-présentation-générale)
2. [Stack Technique](#2-stack-technique)
3. [Structure du Projet](#3-structure-du-projet)
4. [Architecture Frontend](#4-architecture-frontend)
5. [Architecture Backend](#5-architecture-backend)
6. [Base de Données](#6-base-de-données)
7. [Routes & Navigation](#7-routes--navigation)
8. [API Endpoints](#8-api-endpoints)
9. [Système de Traduction](#9-système-de-traduction)
10. [Système d'Authentification](#10-système-dauthentification)
11. [Composants UI](#11-composants-ui)
12. [SEO & Analytics](#12-seo--analytics)
13. [Thème & Design System](#13-thème--design-system)
14. [Fonctionnement des Formulaires](#14-fonctionnement-des-formulaires)
15. [Emails & Notifications](#15-emails--notifications)
16. [Déploiement](#16-déploiement)
17. [Bonnes Pratiques pour l'Ajout de Features](#17-bonnes-pratiques-pour-lajout-de-features)

---

## 1. Présentation Générale

**MP GROUP (Marveen Promise Group)** est un site web vitrine professionnel pour une entreprise de **coordination d'événements stratégiques** basée en Afrique de l'Ouest (Bénin/Côte d'Ivoire).

**Objectif métier :** Présenter les services du groupe, exposer le portfolio d'événements réalisés, gérer les demandes de contact et de devis, publier des actualités, et fournir un espace d'administration sécurisé.

**Cible :** Institutions, entreprises, dirigeants et personnalités cherchant à organiser des événements à forte portée institutionnelle.

---

## 2. Stack Technique

### Frontend (SPA React)

| Technologie | Version | Usage |
|---|---|---|
| React | ^19.2.4 | UI Framework |
| TypeScript | ~5.9.3 | Typage |
| Vite | ^7.2.4 | Bundler / Build |
| TailwindCSS | 3.3.5 | Styles utilitaires |
| @tanstack/react-router | ^1.163.3 | Routing SPA |
| @tanstack/react-query | ^5.90.21 | Data fetching / cache |
| Framer Motion | ^12.34.3 | Animations |
| Radix UI | (multiples) | Composants accessibles headless |
| react-hook-form | ^7.71.2 | Gestion formulaires |
| Zod | ^4.3.6 | Validation schémas |
| Tiptap | ^3.20.1 | Éditeur riche (admin) |
| Lucide React | ^0.575.0 | Icônes |
| React Hot Toast | ^2.6.0 | Notifications |
| Sonner | ^2.0.7 | Toasts alternatifs |
| Recharts | 2.15.4 | Graphiques (admin) |
| Embla Carousel | ^8.6.0 | Carousel |
| Vaul | ^1.1.2 | Drawer |
| Class Variance Authority | ^0.7.1 | Variantes de composants |
| Tailwind Merge | ^3.5.0 | Fusion de classes |
| TailwindCSS Animate | ^1.0.7 | Animations Tailwind |

### Backend (API Laravel)

| Technologie | Version | Usage |
|---|---|---|
| PHP | ^8.2 | Langage |
| Laravel | ^12.0 | Framework |
| Laravel Fortify | ^1.30 | Authentification |
| Laravel Sanctum | ^4.3 | Tokens API |
| Laravel Wayfinder | ^0.1.9 | Génération routes |
| Resend | ^1.3 | Service email |
| Guzzle | ^7.10 | HTTP Client |
| SQLite | (par défaut) | Base de données |
| Inertia.js | ^2.0 | (Backend admin Inertia - partiel) |

---

## 3. Structure du Projet

```
mpgroup/
├── frontend/                       # 📱 React SPA (client public)
│   ├── index.html                  # Entrée HTML avec meta tags SEO
│   ├── vite.config.ts              # Configuration Vite + alias @/
│   ├── tailwind.config.cjs         # Thème Tailwind personnalisé
│   ├── tsconfig.json               # TypeScript config
│   ├── vercel.json                 # Déploiement Vercel
│   ├── components.json             # Configuration shadcn/ui
│   └── src/
│       ├── main.tsx                # Point d'entrée React
│       ├── App.tsx                 # Router + Providers
│       ├── index.css               # Styles globaux + fonts + variables CSS
│       ├── assets/                 # Images, polices, documents
│       ├── components/
│       │   ├── admin/              # Layout admin
│       │   ├── auth/               # Route guards (ProtectedRoute)
│       │   ├── layout/             # Navbar, Footer, MainLayout
│       │   ├── portfolio/          # PortfolioHero, PortfolioGallery
│       │   └── ui/                 # 60+ composants UI (shadcn/ui)
│       ├── contexts/
│       │   ├── AuthContext.tsx      # Contexte d'authentification
│       │   ├── LanguageContext.tsx  # Contexte i18n (FR/EN)
│       │   └── ArticlesContext.tsx  # Cache des articles
│       ├── hooks/
│       │   ├── useAnalytics.tsx     # Google Analytics hook
│       │   ├── use-mobile.tsx       # Détection mobile
│       │   └── use-toast.tsx        # Toast notifications
│       ├── lib/
│       │   └── utils.ts            # Utility functions (cn)
│       ├── pages/
│       │   ├── Home.tsx, Group.tsx, Expertises.tsx, ...
│       │   └── admin/              # Dashboard, Login, ManageMessages, Quotes, News CRUD
│       └── services/
│           └── api.ts              # Service API centralisé
│
└── backend/                        # ⚙️ API Laravel
    ├── app/
    │   ├── Http/
    │   │   ├── Controllers/
    │   │   │   ├── ActualitesController.php    # CRUD actualités
    │   │   │   ├── ContactController.php       # Gestion contacts
    │   │   │   └── Api/
    │   │   │       ├── AuthController.php       # Login/Logout/Reset password
    │   │   │       ├── QuoteController.php      # CRUD devis
    │   │   │       └── AdminController.php      # Stats dashboard
    │   │   └── Middleware/
    │   │       └── AdminMiddleware.php          # Vérification auth Sanctum
    │   ├── Jobs/
    │   │   └── SendContactEmail.php             # Job file d'attente email
    │   ├── Mail/
    │   │   ├── ContactFormMail.php              # Mailable formulaire contact
    │   │   ├── ContactMessage.php               # Mailable contact
    │   │   └── QuoteMessage.php                 # Mailable devis
    │   └── Models/
    │       ├── User.php                         # Admin users (Fortify + Sanctum)
    │       ├── Actualites.php                   # Articles de blog
    │       ├── Contact.php                      # Messages de contact
    │       └── Quote.php                        # Demandes de devis
    ├── config/
    │   ├── fortify.php                          # Config Fortify (auth)
    │   ├── sanctum.php                          # Config Sanctum (tokens API)
    │   ├── cors.php                             # CORS (wildcard *)
    │   └── mail.php                             # Configuration email
    ├── database/
    │   ├── migrations/                          # 11 migrations
    │   └── seeders/
    │       ├── AdminUserSeeder.php              # Crée l'admin par défaut
    │       └── TestUserSeeder.php               # Utilisateur de test
    ├── resources/views/
    │   ├── app.blade.php                        # Layout Inertia (admin)
    │   └── emails/
    │       ├── contact-message.blade.php        # Template email contact
    │       └── quote-message.blade.php          # Template email devis
    └── routes/
        ├── api.php                              # Toutes les routes API
        ├── web.php                              # Redirige vers API
        └── settings.php                         # Routes profil admin (Inertia)
```

---

## 4. Architecture Frontend

### 4.1 Point d'Entrée (`main.tsx`)

```tsx
// Montage React avec QueryClientProvider pour le cache API
<React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
</React.StrictMode>
```

### 4.2 Providers & Routing (`App.tsx`)

L'application utilise une **architecture à providers imbriqués** :

```
QueryClientProvider
  └── AuthProvider (contexte auth + token management)
       └── LanguageProvider (i18n FR/EN)
            └── ArticlesProvider (cache articles news)
                 └── RouterProvider (TanStack Router)
```

**Toutes les routes sont définies dans App.tsx** avec `@tanstack/react-router` :

| Route | Page | Protection |
|---|---|---|
| `/` | Home | Publique |
| `/group` | Group | Publique |
| `/expertises` | Expertises | Publique |
| `/services` | Services | Publique |
| `/portfolio` | Portfolio | Publique |
| `/founder` | Founder | Publique |
| `/news` | News | Publique |
| `/news/$id` | ArticleDetail | Publique |
| `/contact` | Contact | Publique |
| `/devis` | Quote | Publique |
| `/privacy-policy` | PrivacyPolicy | Publique |
| `/terms-of-service` | TermsOfService | Publique |
| `/admin/login` | Login | PublicOnlyRoute |
| `/admin/forgot-password` | ForgotPassword | PublicOnlyRoute |
| `/admin/reset-link-sent` | ResetLinkSent | Publique |
| `/admin/reset-password` | ResetPassword | Publique |
| `/admin/dashboard` | Dashboard | ProtectedRoute |
| `/admin/messages` | ManageMessages | ProtectedRoute |
| `/admin/quotes` | Quotes | ProtectedRoute |
| `/admin/news` | ManageNews | ProtectedRoute |
| `/admin/news/new` | CreateNews | ProtectedRoute |
| `/admin/news/$id/edit` | EditNews | ProtectedRoute |

### 4.3 Layout Principal (`MainLayout.tsx`)

```tsx
// Structure : Navbar + Outlet (page content) + Footer + ScrollToTopButton
// Particularité : Navbar masquée sur les pages d'articles détaillés (/news/$id)
```

### 4.4 ScrollToTop

Un composant `<ScrollToTop />` est inclus dans chaque route qui utilise `useEffect` pour appeler `window.scrollTo(0, 0)`.

---

## 5. Architecture Backend

### 5.1 API Service (`frontend/src/services/api.ts`)

Classe `ApiService` centralisée qui gère :
- **Base URL** : `https://mpgroupbackend.collectivitesanoussiiyerouokinassala.org/api` (variable d'env `VITE_API_URL`)
- **Authentification** : Token Bearer stocké dans `localStorage('auth_token')`
- **Méthodes** : `request<T>()` générique avec gestion d'erreurs
- **Endpoints couverts** : Auth (login/logout/forgot/reset), Contacts CRUD, Quotes CRUD, Articles CRUD, Dashboard stats

**Pattern d'utilisation :**
```tsx
import { apiService } from '@/services/api'
const articles = await apiService.getArticles(1)
```

### 5.2 Middleware Admin

`AdminMiddleware.php` vérifie que l'utilisateur est authentifié via Sanctum. Il peut être étendu pour vérifier les rôles admin.

### 5.3 CORS

`config/cors.php` : Autorise toutes les origines (`['*']`) - à sécuriser en production.

---

## 6. Base de Données

### 6.1 Table `users`

| Champ | Type | Notes |
|---|---|---|
| id | bigint PK | |
| name | string | Nom admin |
| email | string | Unique, identifiant de connexion |
| email_verified_at | timestamp nullable | |
| password | string | Hashé (Fortify) |
| remember_token | string nullable | |
| two_factor_secret | text nullable | Fortify 2FA |
| two_factor_recovery_codes | text nullable | Fortify 2FA |
| two_factor_confirmed_at | timestamp nullable | Fortify 2FA |
| created_at / updated_at | timestamps | |

**Admin par défaut** (AdminUserSeeder) :
- Email : `fresneljeanclaudecossou64@gmail.com`
- Password : `password123`

### 6.2 Table `actualites`

| Champ | Type | Notes |
|---|---|---|
| id | bigint PK | Auto-incrément |
| title | string | Titre article |
| content | text | Contenu HTML (Tiptap) |
| image_url | string nullable | URL image de couverture |
| tags | json nullable | Tags sous forme de tableau JSON |
| actualiteStatus | enum | `published` ou `draft` |
| actualiteCreatedAt | timestamp | Date de publication |
| nbrViews | integer | Compteur de vues (défaut 0) |
| created_at / updated_at | timestamps | |

### 6.3 Table `contact`

| Champ | Type | Notes |
|---|---|---|
| id | bigint PK | |
| nom | string | |
| prenom | string | |
| email | string | |
| telephone | string | |
| entreprise | string nullable | |
| sujet | string | Objet du message |
| message | text | |
| contactStatus | enum | `nouveau` ou `lu` (défaut `nouveau`) |
| contactCreatedAt | timestamp | |
| created_at / updated_at | timestamps | |

### 6.4 Table `quotes`

| Champ | Type | Notes |
|---|---|---|
| id | bigint PK | |
| nom | string | |
| prenom | string | |
| email | string | |
| telephone | string | |
| entreprise | string nullable | |
| type_evenement | string | |
| date_evenement | date | |
| lieu_evenement | string | |
| nombre_participants | integer | |
| description | text | |
| services_souhaites | json nullable | |
| budget_estime | decimal(10,2) nullable | |
| discovery | string nullable | Comment connu MP GROUP ? |
| statut | enum | `nouveau`, `en_cours`, `traite`, `refuse` (défaut `nouveau`) |
| created_at / updated_at | timestamps | |

### 6.5 Migrations (ordre chronologique)

1. `0001_01_01_000000_create_users_table.php` - Users + password_reset_tokens + sessions
2. `0001_01_01_000001_create_cache_table.php` - Cache Laravel
3. `0001_01_01_000002_create_jobs_table.php` - Jobs queue
4. `2025_08_14_170933_add_two_factor_columns_to_users_table.php` - Colonnes 2FA
5. `2026_03_17_120634_contact_table.php` - Table contact
6. `2026_03_17_121434_actualites_table.php` - Table actualites
7. `2026_03_17_150415_create_personal_access_tokens_table.php` - Tokens Sanctum
8. `2026_03_18_172218_remove_actualite_created_at.php` - Fix colonne
9. `2026_04_04_132027_create_quotes_table.php` - Table quotes
10. `2026_04_04_150354_add_discovery_to_quotes_table.php` - Colonne discovery
11. `2026_04_09_072711_fix_contact_table_columns.php` - Fix contact
12. `2026_04_09_202518_contact.php` - Ajustements contact

---

## 7. Routes & Navigation

### 7.1 Navbar (`Navbar.tsx`)

- **Desktop** : Affichage horizontal avec liens + sélecteur langue + bouton "Nous contacter"
- **Mobile** : Menu hamburger avec animation slide
- **Comportement scroll** :
  - State `scrolled` quand `scrollY > 50`
  - Logo change (logo clair → logo foncé)
  - Background devient `bg-white/95 backdrop-blur-sm`
- **Routes admin** : Navbar masquée sur toutes les routes admin sauf `/admin/login`
- **Détection 404** : Vérifie si le pathname est dans la liste des routes valides

### 7.2 Footer (`Footer.tsx`)

- 4 colonnes : Logo + description, Menu rapide, Expertises, Contact
- Liens vers LinkedIn et Facebook
- Masqué sur toutes les routes admin
- Copyright dynamique (année courante)

---

## 8. API Endpoints

### 8.1 Authentification

| Méthode | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/login` | Connexion admin | Public |
| POST | `/api/auth/logout` | Déconnexion | Sanctum |
| GET | `/api/auth/user` | Infos utilisateur courant | Sanctum |
| POST | `/api/auth/forgot-password` | Demande reset mot de passe | Public |
| POST | `/api/auth/reset-password` | Reset mot de passe | Public |

### 8.2 Contacts

| Méthode | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/contact` | Soumettre formulaire contact | Public |
| GET | `/api/admin/contacts?page=X` | Liste contacts paginée | Sanctum+Admin |
| GET | `/api/admin/contacts/{id}` | Détail contact (marque comme lu) | Sanctum+Admin |
| PUT | `/api/admin/contacts/{id}` | Màj statut (nouveau/lu) | Sanctum+Admin |
| DELETE | `/api/admin/contacts/{id}` | Supprimer contact | Sanctum+Admin |

### 8.3 Devis (Quotes)

| Méthode | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/quotes` | Soumettre demande devis | Public |
| GET | `/api/admin/quotes` | Liste devis | Sanctum+Admin |
| GET | `/api/admin/quotes/{id}` | Détail devis | Sanctum+Admin |
| PATCH | `/api/admin/quotes/{id}/status` | Màj statut (nouveau/en_cours/traité/refusé) | Sanctum+Admin |
| PUT | `/api/admin/quotes/{id}` | Màj devis | Sanctum+Admin |
| DELETE | `/api/admin/quotes/{id}` | Supprimer devis | Sanctum+Admin |

### 8.4 Actualités (News)

| Méthode | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/news?page=X&status=published` | Liste articles paginée | Public |
| GET | `/api/news/popular?limit=5` | Articles plus vus | Public |
| GET | `/api/news/{id}` | Détail article (incrémente vues) | Public |
| POST | `/api/news` | Créer article | Sanctum+Admin |
| PUT | `/api/news/{id}` | Modifier article | Sanctum+Admin |
| DELETE | `/api/news/{id}` | Supprimer article | Sanctum+Admin |
| POST | `/api/news/upload` | Upload image article | Sanctum+Admin |

### 8.5 Dashboard

| Méthode | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/admin/stats` | Statistiques dashboard | Sanctum+Admin |
| GET | `/api/admin/recent-messages` | Messages récents | Sanctum+Admin |
| GET | `/api/admin/recent-news` | Articles récents | Sanctum+Admin |

**Format de réponse standard :**
- Succès : `{ data: [...], message: "..." }` ou directement le modèle
- Erreur 422 (validation) : `{ message: "...", errors: { field: ["..."] } }`
- Erreur 401 : `{ message: "Non authentifié", error: "Unauthorized" }`
- 204 : Suppression réussie (pas de contenu)

---

## 9. Système de Traduction

### 9.1 Fonctionnement

`LanguageContext.tsx` fournit un système i18n simple sans librairie externe via :
- **Provider** : `<LanguageProvider>` englobe toute l'application
- **Hook** : `useLanguage()` retourne `{ language, setLanguage, t }`
- **Langues** : `'fr'` (défaut) et `'en'`

### 9.2 Usage

```tsx
const { t, language, setLanguage } = useLanguage()

// Dans le JSX
<h1>{t('hero.title')}</h1>

// Changer de langue
<button onClick={() => setLanguage('en')}>EN</button>
```

### 9.3 Structure des traductions

Les traductions sont organisées par section dans un objet `translations` :
```tsx
const translations = {
  fr: {
    'nav.home': 'Accueil',
    'hero.title': 'Coordonner des événements stratégiques...',
    'services.item1': 'Coordination d\'événements...',
    // ...
  },
  en: {
    'nav.home': 'Home',
    'hero.title': 'Coordinate strategic events...',
    // ...
  }
}
```

### 9.4 Ajouter une traduction

1. Ajouter la clé dans `translations.fr` et `translations.en`
2. Utiliser `t('ma.clef')` dans le JSX
3. Le sélecteur de langue est disponible dans la navbar (desktop) et le menu mobile

### 9.5 Composants de sélection

- **`LanguageSelector`** (mobile) : Sélecteur globe + FR/EN boutons
- **`NavLanguageSelector`** (desktop) : Dans la barre de navigation

---

## 10. Système d'Authentification

### 10.1 Flux d'authentification

1. **Login** : POST `/api/auth/login` → reçoit `{ user, token }`
2. **Stockage** : Token dans `localStorage('auth_token')`, user dans `localStorage('user')`
3. **Requêtes** : Token envoyé dans header `Authorization: Bearer {token}`
4. **Vérification** : `AuthContext.checkAuth()` → GET `/api/auth/user`
5. **Logout** : POST `/api/auth/logout` → efface token côté serveur + localStorage

### 10.2 AuthContext

```tsx
const { user, isAuthenticated, isLoading, login, logout, checkAuth } = useAuth()
```

- `isLoading` : État initial pendant la vérification du token stocké
- `ProtectedRoute` : Redirige vers `/admin/login` si non authentifié
- `PublicOnlyRoute` : Redirige vers `/admin/dashboard` si déjà authentifié

### 10.3 Pages Admin

| Page | Fonctionnalité |
|---|---|
| Dashboard | Stats (messages, devis, articles, vues) + listes récentes |
| Messages | Liste, filtre, marquer lu, supprimer |
| Devis | Liste, filtre par statut, changer statut, supprimer |
| Actualités | Liste, filtre, éditeur riche Tiptap, upload image |

### 10.4 Layout Admin (`AdminLayout.tsx`)

- Sidebar rétractable avec état persistant dans localStorage
- Overlay mobile avec animation Framer Motion
- Header mobile sticky avec fond primary
- Boutons : Navigation, Retour au site (logout + redirect /), Déconnexion

---

## 11. Composants UI

### 11.1 Bibliothèque shadcn/ui

Le projet utilise une collection de **60+ composants UI** basés sur Radix UI, situés dans `src/components/ui/` :

```
accordion, alert-dialog, alert, aspect-ratio, avatar, badge, breadcrumb,
button, button-group, calendar, card, carousel, chart, checkbox,
collapsible, command, context-menu, CookieConsent, DeleteConfirmationModal,
dialog, drawer, dropdown-menu, empty, field, form, hover-card,
ImageGalleryModal, index.ts (barrel export), input, input-group, input-otp,
item, kbd, label, LanguageSelector, Loader, menubar, Modal,
navigation-menu, NavLanguageSelector, OptimizedImage, pagination, popver,
progress, radio-group, resizable, scroll-area, ScrollToTopButton, select,
separator, sheet, sidebar, skeleton, slider, sonner, spinner, switch,
table, tabs, textarea, toast, toaster, toggle, toogle-group, toogle, tooltip
```

### 11.2 Fonction `cn()`

```tsx
import { cn } from '@/lib/utils'
// Utilise clsx + tailwind-merge pour combiner des classes conditionnellement
className={cn("base-class", condition && "active-class")}
```

### 11.3 Composants portfolio

- **`PortfolioHero.tsx`** : Section d'en-tête du portfolio avec image hero
- **`PortfolioGallery.tsx`** : Grille de projets avec carrousels d'images (autoplay 3s, navigation manuelle, indicateur de pagination)

### 11.4 Cookies Consent Banner

`CookieConsent.tsx` : Bannière fixe en bas de page, stocke le consentement dans localStorage, boutons Accepter/Refuser.

---

## 12. SEO & Analytics

### 12.1 SEO Component

`SEO.tsx` met à jour dynamiquement :
- `<title>` du document
- Meta tags : `description`, `keywords`
- Open Graph : `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- Twitter : `twitter:title`, `twitter:description`, `twitter:image`, `twitter:url`
- Balise canonique `<link rel="canonical">`

**Usage :**
```tsx
<SEO
  title="Titre personnalisé | MP GROUP"
  description="Description SEO"
  image="https://mpgroup.africa/image.jpg"
/>
```

### 12.2 Schema.org

`SchemaOrg.tsx` injecte des données structurées JSON-LD :
- Schema `Organization` par défaut (avec logo, adresse, contact, notes)
- Fonctions helpers : `createBreadcrumbSchema()`, `createEventSchema()`, `createArticleSchema()`

**Usage :**
```tsx
<SchemaOrg type="Organization" />
// ou avec données personnalisées
<SchemaOrg type="Event" data={createEventSchema({...})} />
```

### 12.3 Analytics

`useAnalytics.tsx` hook personnalisé pour Google Analytics 4 :
- Track automatique des pages vues sur changement de route
- Fonctions : `trackEvent()`, `trackButtonClick()`, `trackFormSubmit()`, `trackDownload()`, `trackOutboundLink()`, `trackServiceView()`, `trackPortfolioView()`
- HOC `withAnalytics()` pour wrapper des composants

### 12.4 Sitemap

`sitemap.xml` statique (généré par script `generate-sitemap.cjs`) listant 10 URLs.

### 12.5 index.html

Contient tous les meta tags essentiels (Open Graph, Twitter, Geo, theme-color, GA4).

---

## 13. Thème & Design System

### 13.1 Charte Graphique

| Aspect | Valeur |
|---|---|
| **Couleur primaire** | `#001A4D` (bleu marine foncé) |
| **Couleur secondaire** | `#EAB12D` (or/doré) |
| **Police headings** | `TT Travels` (sans-serif) |
| **Police body** | `Manrope` (sans-serif) |
| **Radii** | `0rem` (angles droits) |
| **Ombre premium** | Douce, bleutée |

### 13.2 Polices (fichiers locaux)

- **TT Travels Next** : Bold (700), DemiBold (600) — dans `src/assets/tt_travels_next/`
- **Manrope** : Regular (400), Medium (500), SemiBold (600), Bold (700) — dans `src/assets/Manrope/`

### 13.3 Variables CSS personnalisées

Définies dans `index.css` avec le préfixe `--` :
- `--font-heading`, `--font-body`
- `--shadow-premium`, `--shadow-premium-hover`
- Couleurs : `--primary`, `--secondary`, `--background`, etc. (format HSL)
- Mode sombre : classe `.dark` avec couleurs inversées

### 13.4 Animations

- `fade-in`, `slide-up` (framer-motion)
- `accordion-down`, `accordion-up` (Radix)
- `shimmer` (effet brillant sur boutons)
- `spin` (loader)

### 13.5 Breakpoints (Tailwind)

- `sm`: 640px, `md`: 768px, `lg`: 1024px, `xl`: 1280px, `2xl`: 1536px
- Mobile : `<768px` (hook `useIsMobile`)

---

## 14. Fonctionnement des Formulaires

### 14.1 Formulaire de Contact

- **Endpoint** : POST `/api/contact`
- **Champs** : nom, prenom, email, telephone, entreprise (opt), sujet, message
- **Comportement** : Envoi email à `mpgroupcompany1@gmail.com` + sauvegarde en DB
- **Retour** : Message de confirmation toast

### 14.2 Formulaire de Devis (`Quote.tsx`)

- **Endpoint** : POST `/api/quotes`
- **5 sections** : Coordonnées, Événement, Besoins, Budget, Informations complémentaires
- **Particularités** :
  - **Sauvegarde locale** : Les données sont persistées dans `localStorage('quote_form_data')` à chaque changement (prévention perte de données)
  - **Nettoyage** : localStorage effacé après soumission réussie ou via bouton "Vider le formulaire"
  - **Découverte** : Boutons cliquables avec animation pour "Comment avez-vous connu MP GROUP ?"
  - **Mapping** : Les champs du formulaire sont mappés vers le format attendu par l'API (`QuoteFormData`)
  - **Validation** : Backend validation Laravel avec messages d'erreur personnalisés

### 14.3 Upload d'image (News admin)

- POST `/api/news/upload` (multipart/form-data)
- Accepte : jpeg, png, jpg, gif (max 2MB)
- Stockage : `storage/app/public/news/`
- Retour : URL complète de l'image

---

## 15. Emails & Notifications

### 15.1 Mailables

| Mailable | Usage | Destinataire |
|---|---|---|
| `ContactMessage` | Nouveau message de contact | `mpgroupcompany1@gmail.com` |
| `QuoteMessage` | Nouvelle demande de devis | `mpgroupcompany1@gmail.com` |
| `ContactFormMail` | Alternative pour contact | `mpgroupcompany1@gmail.com` |

### 15.2 Templates Email

Situés dans `backend/resources/views/emails/` :
- `contact-message.blade.php` : Design responsive avec détails du contact + message
- `quote-message.blade.php` : Design premium avec sections (coordonnées, événement, budget, découverte)

Les deux templates incluent :
- En-tête avec logo MP GROUP et dégradé bleu
- Badge "Nouveau" / "Nouvelle demande"
- Mise en page avec bordures dorées
- Pied de page avec coordonnées de contact

### 15.3 Jobs Queue

`SendContactEmail` job (implements `ShouldQueue`) pour l'envoi d'email en file d'attente (base de données).

### 15.4 Configuration Mail

- **Driver** : Configurable via `.env` (défaut: `log` en dev)
- **SMTP** : Supporté via config `mail.mailers.smtp`
- **Resend** : Service email recommandé pour la production

---

## 16. Déploiement

### 16.1 Frontend (Vercel)

- **Fichier** : `frontend/vercel.json`
- **Build** : `npm run build` (Vite)
- **Variables d'environnement** : `VITE_API_URL` pointe vers le backend

### 16.2 Backend (Serveur mutualisé)

- **Base URL** : `https://mpgroupbackend...[longue].org`
- **Configuration** : `.env` avec `APP_URL`, `DB_*`, `MAIL_*`, etc.
- **Stockage** : Lien symbolique `public/storage → storage/app/public`

### 16.3 Scripts de développement

**Backend** (Laravel avec Vite + Queue + Logs) :
```bash
composer run dev
# Lance simultanément : php artisan serve, php artisan queue:listen, php artisan pail, npm run dev
```

**Frontend** (Standalone) :
```bash
npm run dev    # Vite dev server sur port 3000
npm run build  # Production build
```

---

## 17. Bonnes Pratiques pour l'Ajout de Features

### 17.1 Ajouter une nouvelle page publique

1. Créer le fichier dans `frontend/src/pages/NouvellePage.tsx`
2. Importer le composant dans `App.tsx`
3. Définir une nouvelle route avec `createRoute`
4. Ajouter à `routeTree`
5. Ajouter la traduction dans `LanguageContext.tsx`
6. Ajouter le lien dans la Navbar et Footer
7. Optionnel : Ajouter au sitemap.xml

### 17.2 Ajouter un nouveau endpoint API

1. Créer/modifier un contrôleur dans `backend/app/Http/Controllers/`
2. Ajouter la route dans `backend/routes/api.php`
3. Optionnel : Créer un FormRequest pour la validation
4. Ajouter la méthode dans `frontend/src/services/api.ts`

### 17.3 Ajouter une nouvelle table

1. Créer une migration : `php artisan make:migration create_ma_table`
2. Définir le schéma dans `up()`
3. Créer le Model Eloquent
4. Optionnel : Factory + Seeder
5. Ajouter les routes API
6. Ajouter le typage TypeScript dans `api.ts`

### 17.4 Ajouter une nouvelle langue

1. Ajouter les traductions dans `translations` dans `LanguageContext.tsx`
2. Utiliser `t('nouvelle.clef')` dans les composants

### 17.5 Pour ajouter un champ à un formulaire existant

**Côté frontend :**
1. Ajouter le champ dans l'interface TypeScript (`api.ts`)
2. Ajouter l'input dans le composant avec `FormField`
3. Ajouter la gestion dans `formData` state
4. Ajouter la traduction dans `LanguageContext.tsx`
5. Mettre à jour le mapping dans `handleSubmit`

**Côté backend :**
1. Ajouter une migration pour la nouvelle colonne
2. Ajouter le champ dans `$fillable` du Model
3. Ajouter la règle de validation dans le contrôleur
4. Mettre à jour le template email si nécessaire

### 17.6 Messages Toast

```tsx
import toast from 'react-hot-toast'

toast.success('Message de succès', {
  style: { background: '#001A4D', color: '#EAB12D', borderRadius: '0px' }
})
toast.error("Message d'erreur", {
  style: { background: '#dc2626', color: '#ffffff', borderRadius: '0px' }
})
```

### 17.7 Animations (Framer Motion)

```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
  viewport={{ once: true, margin: "-100px" }}
>
  Contenu animé
</motion.div>
```

### 17.8 Icônes

```tsx
import { Send, Loader2, Check } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
```

---

## 📝 Notes Techniques Importantes

### `api.ts` — Bug à corriger
L'interface `QuoteFormData` a une typo : `type_evenement: stringsole` au lieu de `string`. Corriger si une nouvelle feature touche à ce type.

### Alias `@/`
Configuré dans `vite.config.ts` et `tsconfig.json` pour importer depuis `src/` :
```tsx
import { Button } from '@/components/ui/button'
```

### Styles
Le projet utilise **TailwindCSS v3.3.5** (pas v4). Les composants utilisent `cn()` de `tailwind-merge` pour combiner les classes.

### Pas de librairie i18n externe
Le système de traduction maison dans `LanguageContext.tsx` est simple mais fonctionnel. Pour ajouter une 3e langue, il faudra étendre l'objet `translations`.

### Authentification
**Sanctum** gère l'authentification API avec des tokens. Il n'y a pas de système de rafraîchissement automatique des tokens — si le token expire, l'utilisateur doit se reconnecter.

### Gestion d'erreurs API
```tsx
try {
  const result = await apiService.someMethod()
} catch (error: any) {
  const message = error.message || 'Erreur inconnue'
  toast.error(message)
}
```

---

> **Document généré le 2026-04-12** — Utilisez ce guide comme référence unique pour comprendre et étendre le projet MP GROUP.


import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet, notFound } from '@tanstack/react-router'
import { useEffect } from 'react'
import { MainLayout } from './components/layout/MainLayout'
import Home from './pages/Home'
import Group from './pages/Group'
import Expertises from './pages/Expertises'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Founder from './pages/Founder'
import News from './pages/News'
import ArticleDetail from './pages/ArticleDetail'
import Contact from './pages/Contact'
import Quote from './pages/Quote'
import Avis from './pages/Avis'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import NotFound from './pages/NotFound'
import { AdminLayout } from './components/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Login from './pages/admin/Login'
import ManageNews from './pages/admin/ManageNews'
import ManageMessages from './pages/admin/ManageMessages'
import Quotes from './pages/admin/Quotes'
import CreateNews from './pages/admin/CreateNews'
import EditNews from './pages/admin/EditNews'
import ForgotPassword from './pages/admin/ForgotPassword'
import ResetLinkSent from './pages/admin/ResetLinkSent'
import ResetPassword from './pages/admin/ResetPassword'
import { Toaster } from 'react-hot-toast'
import { LanguageProvider } from './contexts/LanguageContext'
import { AuthProvider } from './contexts/AuthContext'
import { ArticlesProvider } from './contexts/ArticlesContext'
import { ProtectedRoute, PublicOnlyRoute } from './components/auth/ProtectedRoute'
import { CookieConsent } from './components/ui/CookieConsent'
import ManageAvis from './pages/admin/ManageAvis'
import ManageEvenements from './pages/admin/ManageEvenements'
import SeanceEntrepreneuriale from "@/pages/SeanceEntrepreneuriale";


// Scroll to top component
function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return null
}

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <AuthProvider>
      <LanguageProvider>
        <ArticlesProvider>
          <MainLayout />
          <CookieConsent />
          <Toaster position="bottom-right" />
        </ArticlesProvider>
      </LanguageProvider>
    </AuthProvider>
  ),
  notFoundComponent: () => <NotFound />,
})

// Index route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <>
      <ScrollToTop />
      <Home />
    </>
  ),
})

// Group route
const groupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/group',
  component: () => (
    <>
      <ScrollToTop />
      <Group />
    </>
  ),
})

// Expertises route
const expertisesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/expertises',
  component: () => (
    <>
      <ScrollToTop />
      <Expertises />
    </>
  ),
})

// Services route
const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services',
  component: () => (
    <>
      <ScrollToTop />
      <Services />
    </>
  ),
})

// Portfolio route
const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/portfolio',
  component: () => (
    <>
      <ScrollToTop />
      <Portfolio />
    </>
  ),
})

// Founder route
const founderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/founder',
  component: () => (
    <>
      <ScrollToTop />
      <Founder />
    </>
  ),
})

// News route
const newsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/news',
  component: () => (
    <>
      <ScrollToTop />
      <News />
    </>
  ),
})

// Article Detail route
const articleDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/news/$id',
  component: () => (
    <>
      <ScrollToTop />
      <ArticleDetail />
    </>
  ),
})

// Contact route
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: () => (
    <>
      <ScrollToTop />
      <Contact />
    </>
  ),
})

// Quote route
const quoteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/devis',
  component: () => (
    <>
      <ScrollToTop />
      <Quote />
    </>
  ),
})

// Privacy Policy route
const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy-policy',
  component: () => (
    <>
      <ScrollToTop />
      <PrivacyPolicy />
    </>
  ),
})

// Terms of Service route
const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms-of-service',
  component: () => (
    <>
      <ScrollToTop />
      <TermsOfService />
    </>
  ),
})

// 404 Not Found route
const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/404',
  component: () => (
    <>
      <ScrollToTop />
      <NotFound />
    </>
  ),
})

// Admin routes - Routes de connexion (publiques pour les non-connectés)
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/login',
  component: () => (
    <PublicOnlyRoute>
      <ScrollToTop />
      <Login />
    </PublicOnlyRoute>
  ),
})

const adminForgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/forgot-password',
  component: () => (
    <PublicOnlyRoute>
      <ScrollToTop />
      <ForgotPassword />
    </PublicOnlyRoute>
  ),
})

const adminResetLinkSentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/reset-link-sent',
  component: () => (
    <>
      <ScrollToTop />
      <ResetLinkSent />
    </>
  ),
})

const adminResetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/reset-password',
  component: () => (
    <>
      <ScrollToTop />
      <ResetPassword />
    </>
  ),
})

// Admin routes - Routes protégées (nécessitent une authentification)
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/dashboard',
  component: () => (
    <ProtectedRoute>
      <AdminLayout>
        <ScrollToTop />
        <Dashboard />
      </AdminLayout>
    </ProtectedRoute>
  ),
})

const adminMessagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/messages',
  component: () => (
    <ProtectedRoute>
      <AdminLayout>
        <ScrollToTop />
        <ManageMessages />
      </AdminLayout>
    </ProtectedRoute>
  ),
})

const adminQuotesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/quotes',
  component: () => (
    <ProtectedRoute>
      <AdminLayout>
        <ScrollToTop />
        <Quotes />
      </AdminLayout>
    </ProtectedRoute>
  ),
})

const adminNewsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/news',
  component: () => (
    <ProtectedRoute>
      <AdminLayout>
        <ScrollToTop />
        <ManageNews />
      </AdminLayout>
    </ProtectedRoute>
  ),
})

const adminNewsCreateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/news/new',
  component: () => (
    <ProtectedRoute>
      <AdminLayout>
        <ScrollToTop />
        <CreateNews />
      </AdminLayout>
    </ProtectedRoute>
  ),
})

const adminNewsEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/news/$id/edit',
  component: () => (
    <ProtectedRoute>
      <AdminLayout>
        <ScrollToTop />
        <EditNews />
      </AdminLayout>
    </ProtectedRoute>
  ),
})

// Avis route (publique)
const avisRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/avis',
  validateSearch: (search: Record<string, unknown>) => ({
    evenement: search.evenement ? Number(search.evenement) : undefined,
  }),
  component: () => (
    <>
      <ScrollToTop />
      <Avis />
    </>
  ),
})

// Avis Manage route (admin, protégée)
const avisManagerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/avis',
  component: () => (
    <ProtectedRoute>
      <AdminLayout>
        <ScrollToTop />
        <ManageAvis />
      </AdminLayout>
    </ProtectedRoute>
  ),
})

const adminEvenementsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/evenements',
  component: () => (
    <ProtectedRoute>
      <AdminLayout>
        <ScrollToTop />
        <ManageEvenements />
      </AdminLayout>
    </ProtectedRoute>
  ),
})


const SeanceEntrepreneurialeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/Seance-Entrepreneuriale",
  component: SeanceEntrepreneuriale,
});

// Create route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  groupRoute,
  expertisesRoute,
  servicesRoute,
  portfolioRoute,
  founderRoute,
  newsRoute,
  articleDetailRoute,
  contactRoute,
  quoteRoute,
  avisRoute,
  privacyRoute,
  termsRoute,
  notFoundRoute,
  adminLoginRoute,
  adminForgotPasswordRoute,
  adminResetLinkSentRoute,
  adminResetPasswordRoute,
  adminRoute,
  adminMessagesRoute,
  adminQuotesRoute,
  adminNewsRoute,
  adminNewsCreateRoute,
  adminNewsEditRoute,
  avisManagerRoute,
  adminEvenementsRoute,
  SeanceEntrepreneurialeRoute,
])

// Create router
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  return <RouterProvider router={router} />
}

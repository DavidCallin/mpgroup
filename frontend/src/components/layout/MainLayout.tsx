import { Outlet, useLocation } from '@tanstack/react-router'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton'

export function MainLayout() {
  const location = useLocation()
  const isArticleDetail = location.pathname.startsWith('/news/') && location.pathname !== '/news'

  return (
    <div className="flex flex-col min-h-screen">
      {!isArticleDetail && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}

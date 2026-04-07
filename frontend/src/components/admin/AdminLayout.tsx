import { ReactNode, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Inbox, LayoutDashboard, LogOut, Menu, X, FileText, ChevronLeft, ChevronRight, Globe, FileBarChart } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'react-hot-toast'
import logo from '@/assets/mp_group_logo1.png'

interface AdminLayoutProps {
    children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
    const { t } = useLanguage()
    const { logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('adminSidebarCollapsed')
            return saved ? JSON.parse(saved) : false
        }
        return false
    })

    const handleLogout = async () => {
        try {
            await logout()
            toast.success('Déconnexion réussie', {
                style: {
                    background: '#001A4D',
                    color: '#EAB12D',
                    borderRadius: '0px',
                }
            })
            navigate({ to: '/admin/login' })
        } catch (error) {
            console.error('Logout error:', error)
            toast.error('Erreur lors de la déconnexion', {
                style: {
                    background: '#dc2626',
                    color: '#ffffff',
                    borderRadius: '0px',
                }
            })
        }
    }

    const handleReturnToSite = async () => {
        try {
            await logout()
            toast.success('Déconnexion automatique - Retour au site', {
                style: {
                    background: '#001A4D',
                    color: '#EAB12D',
                    borderRadius: '0px',
                }
            })
            // Redirection vers la page d'accueil du site
            window.location.href = '/'
        } catch (error) {
            console.error('Logout error:', error)
            // Même en cas d'erreur, on redirige vers le site
            window.location.href = '/'
        }
    }

    // Handle scroll for mobile header styling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Persist collapsed state
    useEffect(() => {
        localStorage.setItem('adminSidebarCollapsed', JSON.stringify(isCollapsed))
    }, [isCollapsed])

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [location.pathname])

    const navigation = [
        { name: 'Tableau de bord', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Messages', href: '/admin/messages', icon: Inbox },
        { name: 'Devis', href: '/admin/quotes', icon: FileBarChart },
        { name: 'Actualités', href: '/admin/news', icon: FileText },
    ]

    const SidebarContent = ({ forceExpand = false }: { forceExpand?: boolean }) => {
        const effectiveCollapsed = isCollapsed && !forceExpand

        return (
            <div className="flex flex-col h-full bg-primary text-white relative">
                {/* Desktop Collapse Toggle */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden md:flex absolute -right-4 top-10 items-center justify-center w-8 h-8 bg-secondary text-primary rounded-full hover:scale-110 transition-all shadow-md z-50 ring-4 ring-[#f8f9fb]"
                    title={effectiveCollapsed ? "Agrandir le menu" : "Réduire le menu"}
                >
                    {effectiveCollapsed ? <ChevronRight size={18} className="ml-0.5" /> : <ChevronLeft size={18} className="mr-0.5" />}
                </button>

                {/* Mobile Close Button */}
                {isMobileMenuOpen && (
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="md:hidden absolute top-4 right-4 text-white/70 hover:text-white p-2 bg-white/5 rounded-full z-10"
                    >
                        <X size={24} />
                    </button>
                )}

                {/* Navigation */}
                <div className="flex-1 pt-20 md:pt-12 pb-8 px-4 sm:px-6 space-y-2 overflow-y-auto">
                    {!effectiveCollapsed && <p className="px-4 text-xs font-bold text-secondary uppercase tracking-[0.2em] mb-4">Navigation</p>}
                    <div className="space-y-1">
                        {navigation.map((item) => {
                            const isActive = location.pathname === item.href || (item.href !== '/admin' && location.pathname.startsWith(item.href))
                            return (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    title={effectiveCollapsed ? item.name : undefined}
                                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                        ? 'bg-secondary/20 text-secondary font-medium shadow-inner'
                                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                                        } ${effectiveCollapsed ? 'justify-center' : ''}`}
                                >
                                    <item.icon size={20} className={`shrink-0 ${isActive ? 'text-secondary' : 'opacity-70'}`} />
                                    {!effectiveCollapsed && <span className="truncate">{item.name}</span>}
                                </Link>
                            )
                        })}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t border-white/10 space-y-1">
                    <button
                        onClick={handleReturnToSite}
                        title={effectiveCollapsed ? "Retour au site" : undefined}
                        className={`flex items-center gap-4 px-4 py-3 text-white/50 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 ${effectiveCollapsed ? 'justify-center' : ''}`}
                    >
                        <Globe size={20} className="opacity-70 shrink-0" />
                        {!effectiveCollapsed && <span className="truncate">Retour au site</span>}
                    </button>
                    <button
                        onClick={handleLogout}
                        title={effectiveCollapsed ? "Déconnexion" : undefined}
                        className={`flex items-center gap-4 px-4 py-3 text-red-400/70 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-300 ${effectiveCollapsed ? 'justify-center' : ''}`}
                    >
                        <LogOut size={20} className="shrink-0" />
                        {!effectiveCollapsed && <span className="truncate font-medium">Déconnexion</span>}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#f8f9fb]">
            {/* Mobile Header */}
            <div
                className={`md:hidden sticky top-0 z-40 bg-primary text-white transition-all duration-300 ${isScrolled ? 'shadow-premium py-3' : 'py-5'
                    } px-4 sm:px-6 flex items-center justify-between`}
            >
                <Link to="/" className="flex items-center h-9 mt-7">
                    <span className="font-heading font-bold text-lg tracking-widest uppercase truncate ml-2">Administration</span>
                </Link>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-white hover:text-secondary transition-colors p-2 -mr-2"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="md:hidden fixed inset-0 bg-primary/80 backdrop-blur-sm z-40"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="md:hidden fixed inset-y-0 left-0 w-[280px] bg-primary z-50 shadow-2xl"
                        >
                            <SidebarContent forceExpand={true} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <div className={`hidden md:block fixed inset-y-0 left-0 z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-300 ease-in-out ${isCollapsed ? 'w-[100px]' : 'w-[280px] lg:w-[320px]'}`}>
                <SidebarContent />
            </div>

            {/* Main Content Area */}
            <div className={`transition-all duration-300 ease-in-out pb-24 md:pb-0 ${isCollapsed ? 'md:ml-[100px]' : 'md:ml-[280px] lg:ml-[320px]'}`}>
                <main className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    )
}

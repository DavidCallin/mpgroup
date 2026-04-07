import { useState } from 'react'
import { useNavigate, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useAuth } from '../../contexts/AuthContext'

export default function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            await login(email, password)
            
            toast.success('Connexion réussie !', {
                style: {
                    background: '#001A4D',
                    color: '#EAB12D',
                    borderRadius: '0px',
                }
            })
            
            // Redirection vers le dashboard admin
            navigate({ to: '/admin/dashboard' })
        } catch (error) {
            console.error('Login error:', error)
            setError('Identifiants incorrects. Veuillez réessayer.')
            toast.error('Échec de la connexion', {
                style: {
                    background: '#dc2626',
                    color: '#ffffff',
                    borderRadius: '0px',
                }
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#f8f9fb] flex flex-col justify-start sm:justify-center pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[80%] sm:w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl opacity-50 sm:opacity-100" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[80%] sm:w-[40%] h-[40%] bg-secondary/10 rounded-full blur-3xl opacity-50 sm:opacity-100" />
            </div>

            <div className="mx-auto w-full max-w-md relative z-10">
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-6 text-center text-2xl sm:text-3xl font-heading font-extrabold text-primary tracking-tight"
                >
                    Accès Sécurisé
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-2 text-center text-xs sm:text-sm text-gray-500 font-light px-4"
                >
                    Espace réservé à l'administration MP GROUP
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 mx-auto w-full max-w-md relative z-10"
            >
                <div className="bg-white py-8 px-5 sm:px-10 shadow-premium hover:shadow-premium-hover transition-shadow duration-500 rounded-2xl border border-gray-100/50 backdrop-blur-sm mx-auto">
                    <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-red-700 text-sm"
                            >
                                <AlertCircle size={16} />
                                {error}
                            </motion.div>
                        )}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 font-heading mb-1.5">
                                Adresse e-mail
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-secondary focus:border-secondary transition-colors bg-gray-50/50 text-sm"
                                    placeholder="admin@mpgroup.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 font-heading mb-1.5">
                                Mot de passe
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-secondary focus:border-secondary transition-colors bg-gray-50/50 text-sm"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-500">
                                    Se souvenir de moi
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link to="/admin/forgot-password" title="Mot de passe oublié ?" className="font-medium text-secondary hover:text-primary transition-colors">
                                    Mot de passe oublié ?
                                </Link>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-primary bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg overflow-hidden"
                            >
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform ease-out" />
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <ShieldCheck className="animate-pulse" size={18} />
                                        Authentification...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Se connecter <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center">
                        <Link to="/" className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center justify-center gap-2">
                            <ArrowRight size={14} className="rotate-180" /> Retour au site
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

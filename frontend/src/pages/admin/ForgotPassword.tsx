import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react'
import { apiService } from '../../services/api'

export default function ForgotPassword() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            await apiService.forgotPassword(email)
        } catch (_) {
            // On redirige quoi qu'il arrive pour ne pas révéler si l'email existe
        } finally {
            setIsLoading(false)
            navigate({ to: '/admin/reset-link-sent' })
        }
    }

    return (
        <div className="min-h-screen bg-[#f8f9fb] flex flex-col justify-start sm:justify-center pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
                    Réinitialisation
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-2 text-center text-xs sm:text-sm text-gray-500 font-light px-4"
                >
                    Saisissez votre e-mail pour recevoir un lien de récupération
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 mx-auto w-full max-w-md relative z-10"
            >
                <div className="bg-white py-8 px-5 sm:px-10 shadow-premium hover:shadow-premium-hover transition-shadow duration-500 rounded-2xl border border-gray-100/50 backdrop-blur-sm mx-auto">
                    <form className="space-y-6" onSubmit={handleSubmit}>
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
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-secondary focus:border-secondary transition-colors bg-gray-50/50 text-sm"
                                    placeholder="admin@mpgroup.bj"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-primary bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg overflow-hidden"
                            >
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform ease-out" />
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <ShieldCheck className="animate-pulse" size={18} />
                                        Envoi en cours...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Envoyer le lien <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center">
                        <Link to="/admin/login" className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center justify-center gap-2">
                            <ArrowLeft size={14} /> Retour à la connexion
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowLeft } from 'lucide-react'

export default function ResetLinkSent() {
    return (
        <div className="min-h-screen bg-[#f8f9fb] flex flex-col justify-start sm:justify-center pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[80%] sm:w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl opacity-50 sm:opacity-100" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[80%] sm:w-[40%] h-[40%] bg-secondary/10 rounded-full blur-3xl opacity-50 sm:opacity-100" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mx-auto w-full max-w-md relative z-10"
            >
                <div className="bg-white py-12 px-8 shadow-premium rounded-2xl border border-gray-100/50 backdrop-blur-sm text-center">
                    <div className="flex justify-center mb-6">
                        <div className="bg-green-50 p-4 rounded-full">
                            <CheckCircle2 className="h-12 w-12 text-green-500" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-heading font-extrabold text-primary mb-4">
                        Vérifiez votre boîte mail
                    </h2>

                    <p className="text-gray-500 mb-8 leading-relaxed">
                        Si un compte est associé à cette adresse e-mail, vous recevrez un lien de réinitialisation.
                        Pensez à vérifier vos spams.
                    </p>

                    <Link
                        to="/admin/login"
                        className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors py-2"
                    >
                        <ArrowLeft size={14} /> Retour à la connexion
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}

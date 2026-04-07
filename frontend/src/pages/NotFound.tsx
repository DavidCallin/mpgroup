import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4 py-8">
            <div className="max-w-4xl mx-auto text-center">
                {/* Illustration SVG moderne */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <svg
                        className="w-full max-w-md mx-auto h-auto"
                        viewBox="0 0 400 300"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Background elements */}
                        <motion.circle
                            cx="320"
                            cy="80"
                            r="60"
                            fill="#001A4D"
                            opacity="0.05"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        />
                        <motion.circle
                            cx="80"
                            cy="220"
                            r="40"
                            fill="#eab12d"
                            opacity="0.1"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        />
                        
                        {/* Main illustration - Person with magnifying glass */}
                        <motion.g
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            {/* Person body */}
                            <ellipse cx="200" cy="240" rx="25" ry="8" fill="#001A4D" opacity="0.1" />
                            <rect x="190" y="180" width="20" height="60" rx="10" fill="#001A4D" />
                            
                            {/* Person head */}
                            <circle cx="200" cy="160" r="15" fill="#eab12d" opacity="0.8" />
                            
                            {/* Arms */}
                            <rect x="175" y="185" width="15" height="4" rx="2" fill="#001A4D" transform="rotate(-20 182.5 187)" />
                            <rect x="210" y="185" width="15" height="4" rx="2" fill="#001A4D" transform="rotate(20 217.5 187)" />
                            
                            {/* Legs */}
                            <rect x="192" y="235" width="6" height="20" rx="3" fill="#001A4D" />
                            <rect x="202" y="235" width="6" height="20" rx="3" fill="#001A4D" />
                        </motion.g>
                        
                        {/* Magnifying glass */}
                        <motion.g
                            initial={{ opacity: 0, rotate: -45 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                        >
                            <circle cx="250" cy="140" r="25" stroke="#001A4D" strokeWidth="4" fill="none" />
                            <line x1="270" y1="160" x2="285" y2="175" stroke="#001A4D" strokeWidth="4" strokeLinecap="round" />
                            
                            {/* Question mark inside magnifying glass */}
                            <motion.text
                                x="250"
                                y="150"
                                textAnchor="middle"
                                fontSize="20"
                                fontWeight="bold"
                                fill="#eab12d"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2, duration: 0.5 }}
                            >
                                ?
                            </motion.text>
                        </motion.g>
                        
                        {/* Floating elements */}
                        <motion.circle
                            cx="120"
                            cy="100"
                            r="3"
                            fill="#eab12d"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 0.6, y: 0 }}
                            transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                        />
                        <motion.circle
                            cx="300"
                            cy="200"
                            r="2"
                            fill="#001A4D"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 0.4, y: 0 }}
                            transition={{ delay: 1.2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                        />
                        <motion.circle
                            cx="150"
                            cy="50"
                            r="2.5"
                            fill="#eab12d"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 0.5, y: 0 }}
                            transition={{ delay: 1.4, duration: 0.9, repeat: Infinity, repeatType: "reverse" }}
                        />
                        
                        {/* 404 Numbers integrated in design */}
                        <motion.text
                            x="80"
                            y="180"
                            fontSize="48"
                            fontWeight="bold"
                            fill="#001A4D"
                            opacity="0.1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                        >
                            4
                        </motion.text>
                        <motion.text
                            x="320"
                            y="120"
                            fontSize="48"
                            fontWeight="bold"
                            fill="#eab12d"
                            opacity="0.15"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.15 }}
                            transition={{ delay: 0.7, duration: 1 }}
                        >
                            0
                        </motion.text>
                        <motion.text
                            x="50"
                            y="260"
                            fontSize="48"
                            fontWeight="bold"
                            fill="#001A4D"
                            opacity="0.1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.1 }}
                            transition={{ delay: 0.9, duration: 1 }}
                        >
                            4
                        </motion.text>
                    </svg>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="space-y-6"
                >
                    {/* 404 Title */}
                    <div className="space-y-2">
                        <motion.h1
                            className="text-6xl sm:text-8xl font-heading font-bold text-primary tracking-tight"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6, duration: 0.8, type: "spring", bounce: 0.3 }}
                        >
                            404
                        </motion.h1>
                        <motion.div
                            className="w-24 h-1 bg-gradient-to-r from-secondary to-primary mx-auto rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: 96 }}
                            transition={{ delay: 1, duration: 0.8 }}
                        />
                    </div>

                    {/* Main message */}
                    <motion.h2
                        className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                    >
                        Page introuvable
                    </motion.h2>

                    <motion.p
                        className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                    >
                        Oups ! Il semble que la page que vous recherchez n'existe pas ou a été déplacée. 
                        Ne vous inquiétez pas, nous sommes là pour vous aider à retrouver votre chemin.
                    </motion.p>
                </motion.div>

                {/* Action buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                >
                    <Link
                        to="/"
                        className="group flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium"
                    >
                        <Home size={20} className="group-hover:scale-110 transition-transform" />
                        Retour à l'accueil
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="group flex items-center gap-3 px-8 py-4 bg-white text-primary border-2 border-primary rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium"
                    >
                        <ArrowLeft size={20} className="group-hover:scale-110 transition-transform" />
                        Page précédente
                    </button>
                </motion.div>

                {/* Additional actions */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 pt-8 border-t border-gray-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                >
                    <Link
                        to="/contact"
                        className="group flex items-center gap-2 text-gray-600 hover:text-secondary transition-colors font-medium"
                    >
                        <Search size={18} className="group-hover:scale-110 transition-transform" />
                        Besoin d'aide ? Contactez-nous
                    </Link>
                </motion.div>

                {/* Decorative elements */}
                <motion.div
                    className="absolute top-10 left-10 w-20 h-20 bg-secondary/5 rounded-full blur-xl"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                />
                <motion.div
                    className="absolute bottom-10 right-10 w-32 h-32 bg-primary/5 rounded-full blur-xl"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.2, duration: 1 }}
                />
            </div>
        </div>
    )
}
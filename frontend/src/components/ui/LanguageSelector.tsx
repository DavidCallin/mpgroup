import { useLanguage } from '@/contexts/LanguageContext'
import { Globe } from 'lucide-react'

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
      <Globe className="w-4 h-4 text-white/80" />
      <div className="flex items-center gap-1">
        <button
          onClick={() => setLanguage('fr')}
          className={`px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 ${
            language === 'fr' 
              ? 'bg-secondary text-primary shadow-sm' 
              : 'text-white/90 hover:text-white hover:bg-white/10'
          }`}
        >
          FR
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 ${
            language === 'en' 
              ? 'bg-secondary text-primary shadow-sm' 
              : 'text-white/90 hover:text-white hover:bg-white/10'
          }`}
        >
          EN
        </button>
      </div>
    </div>
  )
}
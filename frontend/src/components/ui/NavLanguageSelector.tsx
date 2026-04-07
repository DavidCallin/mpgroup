import { useLanguage } from '@/contexts/LanguageContext'
import { Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavLanguageSelectorProps {
  scrolled: boolean
}

export function NavLanguageSelector({ scrolled }: NavLanguageSelectorProps) {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-4 px-3 py-1.5 transition-all duration-300">
      <Globe className={cn(
        "w-3.5 h-3.5 transition-colors",
        scrolled ? "text-primary/60" : "text-white/60"
      )} />
      <div className="flex items-center gap-3">
        <button
          onClick={() => setLanguage('fr')}
          className={cn(
            "text-[10px] font-bold tracking-widest transition-all duration-300 uppercase",
            language === 'fr' 
              ? "text-secondary underline underline-offset-4 decoration-2" 
              : scrolled
                ? "text-primary/40 hover:text-primary"
                : "text-white/40 hover:text-white"
          )}
        >
          FR
        </button>
        <div className={cn("w-[1px] h-3", scrolled ? "bg-primary/10" : "bg-white/10")} />
        <button
          onClick={() => setLanguage('en')}
          className={cn(
            "text-[10px] font-bold tracking-widest transition-all duration-300 uppercase",
            language === 'en' 
              ? "text-secondary underline underline-offset-4 decoration-2" 
              : scrolled
                ? "text-primary/40 hover:text-primary"
                : "text-white/40 hover:text-white"
          )}
        >
          EN
        </button>
      </div>
    </div>
  )
}
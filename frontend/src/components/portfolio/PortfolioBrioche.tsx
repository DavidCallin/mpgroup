import { useLanguage } from '@/contexts/LanguageContext'
import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import p10 from '@/assets/portfolio_asset/portfolio-10.jpeg'

export default function PortfolioBrioche() {
  const { t } = useLanguage()

  return (
    <section className="py-20 sm:py-32 px-6 bg-muted relative overflow-hidden">
      <div className="absolute -right-20 -top-20 w-64 h-64 sm:w-96 sm:h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />
      <div className="max-w-7xl mx-auto">
        <div className="bg-primary flex flex-col lg:flex-row items-stretch">
          <div className="lg:w-1/2 p-10 sm:p-14 lg:p-20 text-white flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-8">
              <Badge className="bg-secondary text-primary border-none rounded-none px-4 py-1 text-[10px] tracking-widest font-black">{t('portfolio.brioche.badge')}</Badge>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold mb-10 italic leading-tight">MP <span className="text-secondary NOT-italic font-light">Brioche</span></h2>
            <p className="text-base sm:text-lg text-white/60 mb-10 sm:mb-12 font-light leading-relaxed italic">
              "{t('portfolio.eco.brioche.desc')}"
            </p>
            <div className="space-y-4 mb-10 sm:mb-12">
              {[
                t('portfolio.brioche.communication'),
                t('portfolio.brioche.partnerships'),
                t('portfolio.brioche.customerService'),
                t('portfolio.brioche.globalManagement')
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full group-hover:scale-150 transition-transform" />
                  <span className="text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase text-white/70">{item}</span>
                </div>
              ))}
            </div>
            <Button asChild size="lg" variant="outline" className="border-white/10 text-white hover:bg-white hover:text-primary transition-all rounded-none px-10 py-8 bg-transparent">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 font-bold tracking-widest text-xs">
                {t('portfolio.brioche.button')} <ExternalLink size={14} />
              </a>
            </Button>
          </div>
          <div className="lg:w-1/2 min-h-[350px] sm:min-h-[500px] relative">
            <img
              src={p10}
              className="w-full h-full object-cover grayscale"
              alt="MP Brioche Concept"
            />
            <div className="absolute inset-0 bg-primary/30" />
          </div>
        </div>
      </div>
    </section>
  )
}

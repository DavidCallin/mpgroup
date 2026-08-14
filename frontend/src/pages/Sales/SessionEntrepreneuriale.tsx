import React from 'react'
import SEO from '@/components/SEO'
import { Button } from '@/components/ui/button'

const MAKETOU_LINK = import.meta.env.VITE_MAKETOU_URL || 'https://maketou.example/checkout'

export default function SessionEntrepreneuriale() {
  return (
    <>
      <SEO
        title="Séance Entrepreneuriale — D'ICI LÀ | MP GROUP"
        description="Atelier intensif de 3 heures pour structurer ton idée et repartir avec un plan d'action concret."
      />

      <main className="container mx-auto px-4 py-12">
        <section className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-[#EAB12D]">Séance Entrepreneuriale</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-[#001A4D]">D'ICI LÀ</h1>
          <h2 className="mt-2 text-lg text-gray-700">Du début au projet</h2>

          <p className="mt-6 text-base text-gray-600 leading-7">
            Il y a l'idée que tu portes depuis des mois. Il y a le projet qu'elle peut devenir. D'ici là, il ne manque qu'une chose : <strong>COMMENCER</strong>.
          </p>

          <div className="mt-8">
            <a href={MAKETOU_LINK} target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#001A4D] hover:bg-[#003366] text-white px-6 py-3">
                Réserver ma place — 5 500 FCFA
              </Button>
            </a>
          </div>
        </section>

        <section className="mt-12 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-[#001A4D]">Ce que c'est</h3>
          <p className="mt-4 text-gray-700 leading-7">
            Un atelier intensif de 3 heures, en petit groupe de 20 personnes maximum, pour structurer ton idée et repartir avec un plan d'action concret.
            Nous t'aidons à surpasser tes peurs, à clarifier ta pensée, et à mieux comprendre ce que ton idée peut vraiment devenir.
            Ce n'est pas une conférence où tu écoutes passivement. C'est un espace de travail où tu construis, avec un accompagnement direct et personnalisé, la première version solide de ton projet.
          </p>
        </section>

        <section className="mt-10 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-[#001A4D]">Pourquoi ce format fonctionne</h3>
          <ul className="mt-4 list-disc pl-5 space-y-3 text-gray-700">
            <li><strong>Un groupe volontairement restreint.</strong> À 20 personnes maximum, tu n'es pas un visage anonyme — tu es écoutée, guidée, et challengée individuellement pendant les 3 heures.</li>
            <li><strong>Un format court et efficace.</strong> Un après-midi suffit pour poser les fondations solides de ton projet et sortir avec une direction claire.</li>
            <li><strong>Un résultat concret, pas de la théorie.</strong> Chaque participant repart avec un document de travail rempli, une idée reformulée, et un plan d'action pour les 30 jours suivants.</li>
            <li><strong>Un accompagnement par une professionnelle expérimentée.</strong> La séance est animée par Marveen Promise, fondatrice de MP GROUP.</li>
          </ul>
        </section>

        <section className="mt-10 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-[#001A4D]">Pour qui</h3>
          <p className="mt-4 text-gray-700">Si tu portes une idée de projet sans savoir par où commencer, cette séance est pour toi. Elle s'adresse aux entrepreneurs en devenir, aux jeunes actifs et à tout porteur de projet qui veut transformer une intuition en démarche structurée.</p>
        </section>

        <section className="mt-10 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-[#001A4D]">Ce que tu repars avec</h3>
          <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700">
            <li>Ton idée formulée clairement et sans ambiguïté.</li>
            <li>Ton premier marché ou client cible identifié.</li>
            <li>Un plan d'action concret pour les 30 prochains jours.</li>
          </ul>
        </section>

        <section className="mt-10 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-[#001A4D]">Informations pratiques</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <div>
              <p className="font-semibold">Durée</p>
              <p>3 heures</p>
            </div>
            <div>
              <p className="font-semibold">Places</p>
              <p>20 personnes maximum</p>
            </div>
            <div>
              <p className="font-semibold">Tarif</p>
              <p>5 500 FCFA</p>
            </div>
            <div>
              <p className="font-semibold">Animé par</p>
              <p>Marveen Promise</p>
            </div>
            <div className="sm:col-span-2">
              <p className="font-semibold">Prochaine session</p>
              <p>9 Septembre</p>
            </div>
          </div>

          <div className="mt-8">
            <a href={MAKETOU_LINK} target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#001A4D] hover:bg-[#003366] text-white px-6 py-3">
                Réserver ma place — 5 500 FCFA
              </Button>
            </a>
          </div>

          <p className="mt-6 text-sm text-gray-500">Les places sont limitées à 20 participants pour garantir un accompagnement de qualité. Réserve la tienne dès maintenant.</p>
        </section>
      </main>
    </>
  )
}

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock3, Users, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

// ============================================================
// Liste des activités - ajoute un objet ici pour chaque nouvelle
// formation / conférence / atelier organisé par MP GROUP.
// ============================================================
type ActivityStatus = "a_venir" | "complet" | "termine";

interface Activity {
  slug: string; // utilisé pour construire le lien
  route: string; // chemin complet de la page dédiée
  title: string;
  category: string; // ex: "Atelier", "Conférence", "Formation"
  description: string;
  date: string;
  duration: string;
  capacity: string;
  location?: string;
  status: ActivityStatus;
}

const activities: Activity[] = [
  {
    slug: "seance-entrepreneuriale",
    route: "/seance-entrepreneuriale",
    title: "D'ici là - Séance Entrepreneuriale",
    category: "Atelier",
    description:
      "Un atelier intensif de 3 heures, en petit groupe, pour structurer ton idée et repartir avec un plan d'action concret.",
    date: "10 Septembre",
    duration: "3 heures",
    capacity: "20 personnes max",
    status: "a_venir",
  },
  {
    slug: "promise-lab",
    route: "/promise-lab",
    title: "Promise Lab - Bureautique Essentielle",
    category: "Formation",
    description:
      "Quatre séances pour maîtriser Mail, Drive, Docs et Excel - le minimum administratif pour démarrer un projet avec crédibilité.",
    date: "Prochaine cohorte : Octobre",
    duration: "1h30 / séance, 4 semaines",
    capacity: "15 personnes max",
    status: "a_venir",
  },
  // Prochaine activité à ajouter : duplique l'objet ci-dessus,
  // change le slug/route/title/etc., et elle apparaîtra
  // automatiquement dans la grille ci-dessous.
];

const statusConfig: Record<ActivityStatus, { label: string; bg: string; text: string }> = {
  a_venir: { label: "Places disponibles", bg: "rgba(234,177,45,0.12)", text: "#EAB12D" },
  complet: { label: "Complet", bg: "rgba(234,177,45,0.12)", text: "#EAB12D" },
  termine: { label: "Terminé", bg: "rgba(107,114,128,0.12)", text: "#6B7280" },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function ActivityCard({ activity }: { activity: Activity }) {
  const status = statusConfig[activity.status];

  return (
    <motion.div variants={fadeUp} className="group h-full">
      <Link
        to={activity.route}
        className="flex h-full flex-col border transition-all duration-300 hover:-translate-y-1"
        style={{ borderColor: "rgba(0,26,77,0.12)" }}
      >
        {/* Bandeau supérieur */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ backgroundColor: "#001A4D" }}
        >
          <span
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: "#EAB12D" }}
          >
            {activity.category}
          </span>
          <span
            className="px-3 py-1 text-xs font-bold uppercase tracking-wider"
            style={{ backgroundColor: status.bg, color: status.text }}
          >
            {status.label}
          </span>
        </div>

        {/* Corps de la carte */}
        <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
          <div>
            <h3
              className="text-2xl font-bold leading-tight md:text-3xl"
              style={{ color: "#001A4D", fontFamily: "var(--font-heading)" }}
            >
              {activity.title}
            </h3>
            <p className="mt-4 leading-7" style={{ color: "#667085" }}>
              {activity.description}
            </p>
          </div>

          <div className="mt-8 space-y-2.5 text-sm" style={{ color: "#374151" }}>
            <div className="flex items-center gap-2.5">
              <Calendar size={15} style={{ color: "#EAB12D" }} />
              {activity.date}
            </div>
            <div className="flex items-center gap-2.5">
              <Clock3 size={15} style={{ color: "#EAB12D" }} />
              {activity.duration}
            </div>
            <div className="flex items-center gap-2.5">
              <Users size={15} style={{ color: "#EAB12D" }} />
              {activity.capacity}
            </div>
            {activity.location && (
              <div className="flex items-center gap-2.5">
                <MapPin size={15} style={{ color: "#EAB12D" }} />
                {activity.location}
              </div>
            )}
          </div>

          <div
            className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
            style={{ color: "#001A4D" }}
          >
            Découvrir
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Activites() {
  const { t } = useLanguage();

  return (
    <>
      <SEO
        title="Activités & Formations | MP GROUP"
        description="Découvrez les ateliers, formations et conférences organisés par MP GROUP pour les entrepreneurs et porteurs de projets."
      />

      <main>
        {/* Hero */}
        <section className="py-24 md:py-32" style={{ backgroundColor: "#001A4D" }}>
          <div className="container mx-auto px-6 md:px-10 lg:px-16">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-3xl"
            >
              <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3">
                <span className="h-px w-10" style={{ backgroundColor: "#EAB12D" }} />
                <span
                  className="text-xs font-bold uppercase tracking-[0.25em]"
                  style={{ color: "#EAB12D" }}
                >
                  Activités
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
                style={{ fontFamily: "var(--font-heading)", color: "#FFFFFF" }}
              >
                Ateliers & Conférences
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-2xl text-base leading-8 md:text-lg"
                style={{ color: "rgba(255,255,255,0.72)" }}
              >
                Des formats courts et concrets, animés par MP GROUP, pour aider les
                entrepreneurs et porteurs de projets à passer à l'action.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Grille des activités */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 md:px-10 lg:px-16">
            {activities.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-lg" style={{ color: "#667085" }}>
                  Aucune activité programmée pour le moment. Revenez bientôt !
                </p>
              </div>
            ) : (
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="grid gap-8 md:grid-cols-2"
              >
                {activities.map((activity) => (
                  <ActivityCard key={activity.slug} activity={activity} />
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
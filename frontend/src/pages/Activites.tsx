import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock3, Users, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import seancesData from "@/data/seances-entrepreneuriale.json";

// ============================================================
// Activités statiques (hors sessions multi-dates gérées par JSON)
// Ajoute un objet ici pour chaque nouvelle formation/conférence
// qui n'a qu'une seule occurrence.
// ============================================================
type ActivityStatus = "a_venir" | "complet" | "termine";

interface StaticActivity {
  slug: string;
  route: string;
  titleKey: string;
  categoryKey: string;
  descriptionKey: string;
  dateKey: string;
  durationKey: string;
  capacityKey: string;
  status: ActivityStatus;
  visible: boolean;
}

interface Seance {
  id: string;
  date: string;
  etat: "en_cours" | "sold_out";
  heure: string;
  places_disponibles: number;
  places_totales: number;
  lien_inscription: string;
  visible: boolean;
}

const seances = seancesData as Seance[];

const staticActivities: StaticActivity[] = [
  {
    slug: "BureautiqueEssentielle",
    route: "/BureautiqueEssentielle",
    titleKey: "activites.BureautiqueEssentielle.title",
    categoryKey: "activites.category.formation",
    descriptionKey: "activites.BureautiqueEssentielle.description",
    dateKey: "activites.BureautiqueEssentielle.date",
    durationKey: "activites.BureautiqueEssentielle.duration",
    capacityKey: "activites.BureautiqueEssentielle.capacity",
    status: "a_venir",
    visible: true,
  },
  // Prochaine activité (hors séance entrepreneuriale) à ajouter ici.
];

const statusConfig: Record<ActivityStatus, { labelKey: string; bg: string; text: string }> = {
  a_venir: { labelKey: "activites.status.available", bg: "rgba(234,177,45,0.12)", text: "#EAB12D" },
  complet: { labelKey: "activites.status.full", bg: "rgba(234,177,45,0.12)", text: "#EAB12D" },
  termine: { labelKey: "activites.status.ended", bg: "rgba(107,114,128,0.12)", text: "#6B7280" },
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

function ActivityCardShell({
  to,
  category,
  statusLabel,
  statusBg,
  statusText,
  title,
  description,
  infoRows,
  discoverLabel,
}: {
  to: string;
  category: string;
  statusLabel: string;
  statusBg: string;
  statusText: string;
  title: string;
  description: string;
  infoRows: { icon: React.ElementType; text: string }[];
  discoverLabel: string;
}) {
  return (
    <motion.div variants={fadeUp} className="group h-full">
      <Link
        to={to}
        className="flex h-full flex-col border transition-all duration-300 hover:-translate-y-1"
        style={{ borderColor: "rgba(0,26,77,0.12)" }}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ backgroundColor: "#001A4D" }}
        >
          <span
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: "#EAB12D" }}
          >
            {category}
          </span>
          <span
            className="px-3 py-1 text-xs font-bold uppercase tracking-wider"
            style={{ backgroundColor: statusBg, color: statusText }}
          >
            {statusLabel}
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
          <div>
            <h3
              className="text-2xl font-bold leading-tight md:text-3xl"
              style={{ color: "#001A4D", fontFamily: "var(--font-heading)" }}
            >
              {title}
            </h3>
            <p className="mt-4 leading-7" style={{ color: "#667085" }}>
              {description}
            </p>
          </div>

          <div className="mt-8 space-y-2.5 text-sm" style={{ color: "#374151" }}>
            {infoRows.map((row, i) => {
              const Icon = row.icon;
              return (
                <div key={i} className="flex items-center gap-2.5">
                  <Icon size={15} style={{ color: "#EAB12D" }} />
                  {row.text}
                </div>
              );
            })}
          </div>

          <div
            className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
            style={{ color: "#001A4D" }}
          >
            {discoverLabel}
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
        title={t("activites.seo.title")}
        description={t("activites.seo.description")}
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
                  {t("activites.hero.eyebrow")}
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
                style={{ fontFamily: "var(--font-heading)", color: "#FFFFFF" }}
              >
                {t("activites.hero.title")}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-2xl text-base leading-8 md:text-lg"
                style={{ color: "rgba(255,255,255,0.72)" }}
              >
                {t("activites.hero.description")}
              </motion.p>
              
            </motion.div>
          </div>
        </section>

        {/* Grille des activités */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 md:px-10 lg:px-16">
            {seances.filter((s) => s.visible).length === 0 &&
            staticActivities.filter((a) => a.visible).length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-lg" style={{ color: "#667085" }}>
                  {t("activites.empty")} 
                  
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
                {/* Une carte par session de la Séance Entrepreneuriale */}
                {seances.filter((s) => s.visible).map((seance) => {
                  const status = seance.etat === "sold_out" ? statusConfig.complet : statusConfig.a_venir;
                  return (
                    <ActivityCardShell
                      key={seance.id}
                      to={`/seance-entrepreneuriale?session=${seance.id}`}
                      category={t("activites.category.atelier")}
                      statusLabel={t(status.labelKey)}
                      statusBg={status.bg}
                      statusText={status.text}
                      title={t("activites.seanceEntrepreneuriale.title")}
                      description={t("activites.seanceEntrepreneuriale.description")+" "+t("activites.seanceEntrepreneuriale.kit")}
                      discoverLabel={t("activites.discover")}
                      infoRows={[
                        { icon: Calendar, text: seance.date },
                        { icon: Clock3, text: seance.heure },
                        {
                          icon: Users,
                          text:
                            seance.etat === "sold_out"
                              ? t("activites.status.full")
                              : `${seance.places_disponibles} / ${seance.places_totales} ${t("activites.seats")}`,
                        },
                      ]}
                    />
                  );
                })}

                {/* Activités statiques (une seule occurrence) */}
                {staticActivities.filter((a) => a.visible).map((activity) => {
                  const status = statusConfig[activity.status];
                  return (
                    <ActivityCardShell
                      key={activity.slug}
                      to={activity.route}
                      category={t(activity.categoryKey)}
                      statusLabel={t(status.labelKey)}
                      statusBg={status.bg}
                      statusText={status.text}
                      title={t(activity.titleKey)}
                      description={t(activity.descriptionKey)}
                      discoverLabel={t("activites.discover")}
                      infoRows={[
                        { icon: Calendar, text: t(activity.dateKey) },
                        { icon: Clock3, text: t(activity.durationKey) },
                        { icon: Users, text: t(activity.capacityKey) },
                      ]}
                    />
                  );
                })}
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
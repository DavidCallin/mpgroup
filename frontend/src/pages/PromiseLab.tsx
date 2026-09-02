import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock3, Users, ArrowRight } from "lucide-react";

import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

// Remplace par le numéro WhatsApp réel de Promise Services (format international sans +, ex: 22901672706)
// Laisser vide ouvre le sélecteur de contact WhatsApp standard.
const WHATSAPP_NUMBER = "22967270636";

const TOTAL_SEATS = 15;
const TAKEN_SEATS = 7;

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
  visible: { transition: { staggerChildren: 0.1 } },
};

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span
        className="text-xs font-bold uppercase tracking-[0.18em]"
        style={{ color: "#EAB12D", fontFamily: "IBM Plex Mono, monospace" }}
      >
        {children}
      </span>
    </div>
  );
}

export default function PromiseLab() {
  const { t } = useLanguage();
  const [calendarView, setCalendarView] = useState<"continu" | "cohortes">("continu");
  const [formData, setFormData] = useState({ nom: "", whatsapp: "", formule: "seance" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formuleLabel =
      formData.formule === "seance"
        ? `${t("promiseLab.pricing.session.title")} (10 000 FCFA)`
        : `${t("promiseLab.pricing.subscription.title")} (35 000 FCFA)`;

    const message = `Bonjour Promise Services, je suis ${formData.nom} (WhatsApp : ${formData.whatsapp}). Je souhaite réserver ma place pour Bureautique Essentielle - Promise Lab, formule : ${formuleLabel}.`;

    const url = WHATSAPP_NUMBER
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const programme = [
    { n: "1", title: t("promiseLab.programme.week1.title"), text: t("promiseLab.programme.week1.text") },
    { n: "2", title: t("promiseLab.programme.week2.title"), text: t("promiseLab.programme.week2.text") },
    { n: "3", title: t("promiseLab.programme.week3.title"), text: t("promiseLab.programme.week3.text") },
    { n: "4", title: t("promiseLab.programme.week4.title"), text: t("promiseLab.programme.week4.text") },
  ];

  const problems = [
    { n: "01", title: t("promiseLab.problem.card1.title"), text: t("promiseLab.problem.card1.text") },
    { n: "02", title: t("promiseLab.problem.card2.title"), text: t("promiseLab.problem.card2.text") },
    { n: "03", title: t("promiseLab.problem.card3.title"), text: t("promiseLab.problem.card3.text") },
  ];

  const calendarMonths = {
    continu: [
      { m: "Octobre", s: t("promiseLab.calendar.cohort") + " 1", on: true },
      { m: "Novembre", s: t("promiseLab.calendar.cohort") + " 2", on: true },
      { m: "Déc. – Jan.", s: t("promiseLab.calendar.break"), on: false },
      { m: "Février", s: t("promiseLab.calendar.cohort") + " 3", on: true },
      { m: "Mars", s: t("promiseLab.calendar.cohort") + " 4", on: true },
      { m: "Avril", s: t("promiseLab.calendar.cohort") + " 5", on: true },
    ],
    cohortes: [
      { m: "Octobre", s: t("promiseLab.calendar.cohort") + " 1", on: true },
      { m: "Novembre", s: t("promiseLab.calendar.pause"), on: false },
      { m: "Déc. – Jan.", s: t("promiseLab.calendar.break"), on: false },
      { m: "Février", s: t("promiseLab.calendar.cohort") + " 2", on: true },
      { m: "Mars", s: t("promiseLab.calendar.cohort") + " 3", on: true },
      { m: "Avril", s: t("promiseLab.calendar.review"), on: false },
    ],
  };

  return (
    <>
      <SEO
        title={t("promiseLab.seo.title")}
        description={t("promiseLab.seo.description")}
      />

      <main style={{ fontFamily: "IBM Plex Sans, sans-serif" }}>
        {/* =========================
            HERO
        ========================= */}
        <section
          className="relative overflow-hidden py-24 md:py-32"
          style={{
            background: "linear-gradient(180deg, #001A4D 0%, #10254D 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full opacity-10"
            style={{ backgroundColor: "#EAB12D" }}
          />

          <div className="container relative z-10 mx-auto px-6 md:px-10 lg:px-16">
            <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
              <motion.div initial="hidden" animate="visible" variants={stagger}>
                <motion.div
                  variants={fadeUp}
                  className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em]"
                  style={{ color: "#EAB12D", fontFamily: "IBM Plex Mono, monospace" }}
                >
                  <span className="inline-block h-px w-6" style={{ backgroundColor: "#EAB12D" }} />
                  {t("promiseLab.hero.eyebrow")}
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  className="text-4xl font-bold leading-[1.1] md:text-5xl lg:text-6xl"
                  style={{ fontFamily: "Space Grotesk, sans-serif", color: "#FFFFFF" }}
                >
                  {t("promiseLab.hero.title1")}
                  <br />
                  <span style={{ color: "#EAB12D" }}>{t("promiseLab.hero.title2")}</span>
                  <br />
                  {t("promiseLab.hero.title3")}
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="mt-6 max-w-lg text-base leading-8 md:text-lg"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  {t("promiseLab.hero.description")}
                </motion.p>

                <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#inscription"
                    className="inline-block px-6 py-3.5 text-sm font-bold uppercase tracking-wider transition-transform duration-200 hover:-translate-y-0.5"
                    style={{ backgroundColor: "#EAB12D", color: "#001A4D" }}
                  >
                    {t("promiseLab.hero.cta.primary")}
                  </a>
                  <a
                    href="#programme"
                    className="inline-block border px-6 py-3.5 text-sm font-medium"
                    style={{ borderColor: "rgba(255,255,255,0.2)", color: "#FFFFFF" }}
                  >
                    {t("promiseLab.hero.cta.secondary")}
                  </a>
                </motion.div>
              </motion.div>

              {/* Seat grid - élément signature */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="border p-6"
                style={{
                  borderColor: "rgba(255,255,255,0.14)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                }}
              >
                <div
                  className="mb-4 text-xs uppercase tracking-wider opacity-70"
                  style={{ fontFamily: "IBM Plex Mono, monospace", color: "#FFFFFF" }}
                >
                  {t("promiseLab.hero.seats.label")}
                </div>
                <div className="mb-4 grid grid-cols-5 gap-2">
                  {Array.from({ length: TOTAL_SEATS }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-sm border"
                      style={
                        i < TAKEN_SEATS
                          ? { backgroundColor: "#EAB12D", borderColor: "#EAB12D" }
                          : { backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.16)" }
                      }
                    />
                  ))}
                </div>
                <div className="text-sm" style={{ color: "#FFFFFF", fontFamily: "Space Grotesk, sans-serif" }}>
                  <b className="text-xl" style={{ color: "#EAB12D" }}>
                    {TOTAL_SEATS - TAKEN_SEATS}
                  </b>{" "}
                  / {TOTAL_SEATS} {t("promiseLab.hero.seats.available")}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================
            CONSTAT
        ========================= */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-10 lg:px-16">
            <Kicker>{t("promiseLab.problem.kicker")}</Kicker>
            <h2
              className="text-3xl font-bold md:text-4xl"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#001A4D" }}
            >
              {t("promiseLab.problem.title")}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 md:text-base" style={{ color: "#667085" }}>
              {t("promiseLab.problem.description")}
            </p>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="mt-12 grid gap-5 md:grid-cols-3"
            >
              {problems.map((p) => (
                <motion.div
                  key={p.n}
                  variants={fadeUp}
                  className="border-l-4 bg-white p-6"
                  style={{ borderColor: "#EAB12D", boxShadow: "0 1px 2px rgba(0,26,77,0.05)" }}
                >
                  <div
                    className="mb-2 text-xs"
                    style={{ color: "#001A4D", fontFamily: "IBM Plex Mono, monospace" }}
                  >
                    {p.n}
                  </div>
                  <h3 className="mb-2 text-base font-bold leading-snug" style={{ color: "#001A4D" }}>
                    {p.title}
                  </h3>
                  <p className="text-sm leading-7" style={{ color: "#667085" }}>
                    {p.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* =========================
            FORMAT
        ========================= */}
        <section id="format" className="py-20 md:py-28" style={{ backgroundColor: "#F6F7F9" }}>
          <div className="container mx-auto px-6 md:px-10 lg:px-16">
            <Kicker>{t("promiseLab.format.kicker")}</Kicker>
            <h2
              className="text-3xl font-bold md:text-4xl"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#001A4D" }}
            >
              {t("promiseLab.format.title")}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 md:text-base" style={{ color: "#667085" }}>
              {t("promiseLab.format.description")}
            </p>

            <div className="mt-12 grid gap-px overflow-hidden border md:grid-cols-3" style={{ borderColor: "rgba(0,26,77,0.1)", backgroundColor: "rgba(0,26,77,0.1)" }}>
              {[
                { num: "15", label: t("promiseLab.format.stat1") },
                { num: "1h30", label: t("promiseLab.format.stat2") },
                { num: "80%", label: t("promiseLab.format.stat3") },
              ].map((s) => (
                <div key={s.label} className="bg-white p-8">
                  <div
                    className="text-3xl font-bold"
                    style={{ fontFamily: "IBM Plex Mono, monospace", color: "#001A4D" }}
                  >
                    {s.num}
                  </div>
                  <div className="mt-2 text-sm" style={{ color: "#667085" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================
            PROGRAMME
        ========================= */}
        <section id="programme" className="py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-10 lg:px-16">
            <Kicker>{t("promiseLab.programme.kicker")}</Kicker>
            <h2
              className="text-3xl font-bold md:text-4xl"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#001A4D" }}
            >
              {t("promiseLab.programme.title")}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 md:text-base" style={{ color: "#667085" }}>
              {t("promiseLab.programme.description")}
            </p>

            <div className="mt-12 ml-3.5 border-l-2 pl-8" style={{ borderColor: "#EAB12D" }}>
              {programme.map((item, i) => (
                <div key={item.n} className={`relative ${i !== programme.length - 1 ? "pb-9" : ""}`}>
                  <span
                    className="absolute -left-[42px] flex h-7 w-7 items-center justify-center rounded-full text-xs"
                    style={{ backgroundColor: "#001A4D", color: "#EAB12D", fontFamily: "IBM Plex Mono, monospace" }}
                  >
                    {item.n}
                  </span>
                  <h3 className="mb-1.5 text-lg font-bold" style={{ color: "#001A4D" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-7" style={{ color: "#667085" }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================
            TARIFS
        ========================= */}
        <section id="tarifs" className="py-20 md:py-28" style={{ backgroundColor: "#F6F7F9" }}>
          <div className="container mx-auto px-6 md:px-10 lg:px-16">
            <Kicker>{t("promiseLab.pricing.kicker")}</Kicker>
            <h2
              className="text-3xl font-bold md:text-4xl"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#001A4D" }}
            >
              {t("promiseLab.pricing.title")}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 md:text-base" style={{ color: "#667085" }}>
              {t("promiseLab.pricing.description")}
            </p>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              <div className="p-8" style={{ backgroundColor: "#001A4D", color: "#FFFFFF" }}>
                <h3 className="text-sm font-semibold uppercase tracking-wider opacity-75">
                  {t("promiseLab.pricing.session.title")}
                </h3>
                <div className="mt-4 text-4xl" style={{ fontFamily: "IBM Plex Mono, monospace", color: "#EAB12D" }}>
                  10 000<span className="text-sm opacity-60"> FCFA</span>
                </div>
                <ul className="mt-6 space-y-2.5">
                  {[
                    t("promiseLab.pricing.session.item1"),
                    t("promiseLab.pricing.session.item2"),
                    t("promiseLab.pricing.session.item3"),
                  ].map((li) => (
                    <li key={li} className="relative pl-5 text-sm opacity-85">
                      <span className="absolute left-0" style={{ color: "#EAB12D" }}>-</span>
                      {li}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="relative p-8"
                style={{
                  background: "linear-gradient(160deg, #001A4D 0%, #1A3566 100%)",
                  color: "#FFFFFF",
                  border: "1px solid #EAB12D",
                }}
              >
                <div
                  className="absolute -top-3 right-6 px-3 py-1 text-xs font-semibold"
                  style={{ backgroundColor: "#EAB12D", color: "#001A4D" }}
                >
                  {t("promiseLab.pricing.recommended")}
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-wider opacity-75">
                  {t("promiseLab.pricing.subscription.title")}
                </h3>
                <div className="mt-4 text-4xl" style={{ fontFamily: "IBM Plex Mono, monospace", color: "#EAB12D" }}>
                  35 000<span className="text-sm opacity-60"> FCFA</span>
                </div>
                <ul className="mt-6 space-y-2.5">
                  {[
                    t("promiseLab.pricing.subscription.item1"),
                    t("promiseLab.pricing.subscription.item2"),
                    t("promiseLab.pricing.subscription.item3"),
                  ].map((li) => (
                    <li key={li} className="relative pl-5 text-sm opacity-85">
                      <span className="absolute left-0" style={{ color: "#EAB12D" }}>-</span>
                      {li}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 text-xs" style={{ color: "#EAB12D", fontFamily: "IBM Plex Mono, monospace" }}>
                  - {t("promiseLab.pricing.savings")}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            CALENDRIER
        ========================= */}
        <section id="calendrier" className="py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-10 lg:px-16">
            <Kicker>{t("promiseLab.calendar.kicker")}</Kicker>
            <h2
              className="text-3xl font-bold md:text-4xl"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#001A4D" }}
            >
              {t("promiseLab.calendar.title")}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 md:text-base" style={{ color: "#667085" }}>
              {t("promiseLab.calendar.description")}
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              <button
                onClick={() => setCalendarView("continu")}
                className="px-4.5 py-2.5 text-xs font-medium transition-colors"
                style={{
                  fontFamily: "IBM Plex Mono, monospace",
                  border: "1px solid #001A4D",
                  backgroundColor: calendarView === "continu" ? "#001A4D" : "transparent",
                  color: calendarView === "continu" ? "#FFFFFF" : "#001A4D",
                }}
              >
                {t("promiseLab.calendar.toggle.continuous")}
              </button>
              <button
                onClick={() => setCalendarView("cohortes")}
                className="px-4.5 py-2.5 text-xs font-medium transition-colors"
                style={{
                  fontFamily: "IBM Plex Mono, monospace",
                  border: "1px solid #001A4D",
                  backgroundColor: calendarView === "cohortes" ? "#001A4D" : "transparent",
                  color: calendarView === "cohortes" ? "#FFFFFF" : "#001A4D",
                }}
              >
                {t("promiseLab.calendar.toggle.spaced")}
              </button>
            </div>

            <div className="mt-7 grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}>
              {calendarMonths[calendarView].map((c) => (
                <div
                  key={c.m}
                  className="border bg-white p-4"
                  style={
                    c.on
                      ? { borderColor: "#EAB12D", boxShadow: "0 0 0 1px #EAB12D inset" }
                      : { borderColor: "#E5E7EB" }
                  }
                >
                  <span
                    className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: c.on ? "#001A4D" : "#C9C2AA" }}
                  />
                  <div className="mt-1 text-sm font-semibold" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#001A4D" }}>
                    {c.m}
                  </div>
                  <div className="mt-1 text-xs opacity-70" style={{ color: "#667085" }}>
                    {c.s}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================
            INSCRIPTION
        ========================= */}
        <section id="inscription" className="py-20 md:py-28" style={{ backgroundColor: "#F6F7F9" }}>
          <div className="container mx-auto px-6 md:px-10 lg:px-16">
            <div className="grid gap-10 p-8 md:grid-cols-2 md:p-12" style={{ backgroundColor: "#001A4D" }}>
              <div>
                <h2
                  className="text-2xl font-bold md:text-3xl"
                  style={{ fontFamily: "Space Grotesk, sans-serif", color: "#FFFFFF" }}
                >
                  {t("promiseLab.signup.title")}
                </h2>
                <p className="mt-3 text-sm leading-7" style={{ color: "rgba(255,255,255,0.75)" }}>
                  {t("promiseLab.signup.description")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-wider opacity-70" style={{ color: "#FFFFFF" }}>
                    {t("promiseLab.signup.form.name")}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t("promiseLab.signup.form.name.placeholder")}
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    className="w-full px-3.5 py-3 text-sm"
                    style={{
                      border: "1px solid rgba(255,255,255,0.14)",
                      backgroundColor: "rgba(255,255,255,0.06)",
                      color: "#FFFFFF",
                    }}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-wider opacity-70" style={{ color: "#FFFFFF" }}>
                    {t("promiseLab.signup.form.whatsapp")}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={t("promiseLab.signup.form.whatsapp.placeholder")}
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-3.5 py-3 text-sm"
                    style={{
                      border: "1px solid rgba(255,255,255,0.14)",
                      backgroundColor: "rgba(255,255,255,0.06)",
                      color: "#FFFFFF",
                    }}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-wider opacity-70" style={{ color: "#FFFFFF" }}>
                    {t("promiseLab.signup.form.formula")}
                  </label>
                  <select
                    value={formData.formule}
                    onChange={(e) => setFormData({ ...formData, formule: e.target.value })}
                    className="w-full px-3.5 py-3 text-sm"
                    style={{
                      border: "1px solid rgba(255,255,255,0.14)",
                      backgroundColor: "rgba(255,255,255,0.06)",
                      color: "#FFFFFF",
                    }}
                  >
                    <option value="seance" style={{ color: "#111" }}>
                      {t("promiseLab.pricing.session.title")} - 10 000 FCFA
                    </option>
                    <option value="abonnement" style={{ color: "#111" }}>
                      {t("promiseLab.pricing.subscription.title")} - 35 000 FCFA
                    </option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="mt-1.5 flex items-center justify-center gap-2 py-3.5 text-sm font-bold uppercase tracking-wider transition-colors"
                  style={{ backgroundColor: "#EAB12D", color: "#001A4D" }}
                >
                  {t("promiseLab.signup.submit")}
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
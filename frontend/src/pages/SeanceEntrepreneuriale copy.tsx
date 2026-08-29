import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock3,
  Users,
  Target,
  Lightbulb,
  CalendarDays,
  Sparkles,
  MoveRight,
} from "lucide-react";

import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const MAKETOU_URL = "";
// https://marveen-promise.mymaketou.shop/fr/products/soutenir-mpbrioche/checkout 

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

function PrimaryButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <a
      href={MAKETOU_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center justify-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-[0.12em] transition-all duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: "#EAB12D",
        color: "#001A4D",
        boxShadow: "0 12px 30px rgba(0, 26, 77, 0.18)",
      }}
    >
      {children}
      <ArrowRight
        size={18}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </a>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="max-w-3xl"
    >
      <div className="mb-5 flex items-center gap-3">
        <span
          className="h-px w-10"
          style={{ backgroundColor: "#EAB12D" }}
        />

        <span
          className="text-xs font-bold uppercase tracking-[0.25em]"
          style={{ color: "#EAB12D" }}
        >
          {eyebrow}
        </span>
      </div>

      <h2
        className="text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl"
        style={{
          fontFamily: "var(--font-heading)",
          color: light ? "#FFFFFF" : "#001A4D",
        }}
      >
        {title}
      </h2>

      {description && (
        <p
          className="mt-6 text-base leading-8 md:text-lg"
          style={{
            color: light
              ? "rgba(255,255,255,0.72)"
              : "#5B6472",
          }}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

export default function SeanceEntrepreneuriale() {
  const { t } = useLanguage();

  const features = [
    {
      number: "01",
      icon: Users,
      title: t("seanceEntrepreneuriale.why.group.title"),
      text: t("seanceEntrepreneuriale.why.group.text"),
    },
    {
      number: "02",
      icon: Clock3,
      title: t("seanceEntrepreneuriale.why.duration.title"),
      text: t("seanceEntrepreneuriale.why.duration.text"),
    },
    {
      number: "03",
      icon: Target,
      title: t("seanceEntrepreneuriale.why.result.title"),
      text: t("seanceEntrepreneuriale.why.result.text"),
    },
    {
      number: "04",
      icon: Lightbulb,
      title: t("seanceEntrepreneuriale.why.experience.title"),
      text: t("seanceEntrepreneuriale.why.experience.text"),
    },
  ];

  const audience = [
    t("seanceEntrepreneuriale.audience.entrepreneurs"),
    t("seanceEntrepreneuriale.audience.active"),
    t("seanceEntrepreneuriale.audience.project"),
    t("seanceEntrepreneuriale.audience.idea"),
  ];

  const results = [
    {
      number: "01",
      title: t("seanceEntrepreneuriale.results.idea.title"),
      text: t("seanceEntrepreneuriale.results.idea.text"),
    },
    {
      number: "02",
      title: t("seanceEntrepreneuriale.results.market.title"),
      text: t("seanceEntrepreneuriale.results.market.text"),
    },
    {
      number: "03",
      title: t("seanceEntrepreneuriale.results.plan.title"),
      text: t("seanceEntrepreneuriale.results.plan.text"),
    },
  ];

  return (
    <>
      <SEO
        title={t("seanceEntrepreneuriale.seo.title")}
        description={t("seanceEntrepreneuriale.seo.description")}
      />

      <main className="overflow-hidden">

        {/* =========================
            HERO
        ========================= */}

        <section
          className="relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden"
          style={{ backgroundColor: "#001A4D" }}
        >
          <div
            className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-10"
            style={{ backgroundColor: "#EAB12D" }}
          />

          <div className="container relative z-10 mx-auto px-6 py-24 md:px-10 lg:px-16 lg:py-32">
            <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">

              <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
              >
                <motion.div variants={fadeUp}>
                  <span
                    className="inline-flex items-center gap-2 border px-4 py-2 text-xs font-bold uppercase tracking-[0.22em]"
                    style={{
                      borderColor: "rgba(234,177,45,0.5)",
                      color: "#EAB12D",
                    }}
                  >
                    <Sparkles size={14} />
                    {t("seanceEntrepreneuriale.hero.badge")}
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  className="mt-8 text-6xl font-bold leading-[0.9] tracking-[-0.04em] md:text-8xl lg:text-[9rem]"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "#FFFFFF",
                  }}
                >
                  {t("seanceEntrepreneuriale.hero.title1")}
                  <br />
                  <span style={{ color: "#EAB12D" }}>{t("seanceEntrepreneuriale.hero.title2")}</span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="mt-6 text-xl font-semibold md:text-2xl"
                  style={{
                    color: "#FFFFFF",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {t("seanceEntrepreneuriale.hero.subtitle")}
                </motion.p>

                <motion.p
                  variants={fadeUp}
                  className="mt-6 max-w-2xl text-base leading-8 md:text-lg"
                  style={{ color: "rgba(255,255,255,0.72)" }}
                >
                  {t("seanceEntrepreneuriale.hero.description")}
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  className="mt-10 flex flex-wrap gap-3"
                >
                  <div className="flex items-center gap-2 border px-4 py-3 text-sm text-white">
                    <CalendarDays
                      size={17}
                      style={{ color: "#EAB12D" }}
                    />
                    {t("seanceEntrepreneuriale.info.date")}
                  </div>

                  <div className="flex items-center gap-2 border px-4 py-3 text-sm text-white">
                    <Clock3
                      size={17}
                      style={{ color: "#EAB12D" }}
                    />
                    {t("seanceEntrepreneuriale.info.duration")}
                  </div>

                  <div className="flex items-center gap-2 border px-4 py-3 text-sm text-white">
                    <Users
                      size={17}
                      style={{ color: "#EAB12D" }}
                    />
                    {t("seanceEntrepreneuriale.info.places")}
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="mt-10">
                  <PrimaryButton>
                    {t("seanceEntrepreneuriale.cta.reservePrice")}
                  </PrimaryButton>
                </motion.div>
              </motion.div>

              {/* Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative hidden lg:block"
              >
                <div
                  className="relative ml-auto aspect-[4/5] max-w-md border"
                  style={{
                    borderColor: "rgba(234,177,45,0.35)",
                    background:
                      "linear-gradient(145deg, rgba(234,177,45,0.12), rgba(255,255,255,0.03))",
                  }}
                >
                  <div className="absolute inset-8 border border-white/10" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
                    <span
                      className="text-[7rem] font-bold leading-none"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: "#EAB12D",
                      }}
                    >
                      03
                    </span>

                    <span
                      className="mt-3 text-xl font-bold uppercase tracking-[0.2em]"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: "#FFFFFF",
                      }}
                    >
                      {t("seanceEntrepreneuriale.hero.hours")}
                    </span>

                    <div
                      className="my-8 h-px w-20"
                      style={{ backgroundColor: "#EAB12D" }}
                    />

                    <p
                      className="max-w-xs text-sm leading-7"
                      style={{
                        color: "rgba(255,255,255,0.65)",
                      }}
                    >
                      {t("seanceEntrepreneuriale.hero.description")}
                    </p>
                  </div>
                </div>

                <div
                  className="absolute -bottom-6 -left-6 px-6 py-5"
                  style={{
                    backgroundColor: "#EAB12D",
                    color: "#001A4D",
                  }}
                >
                  <span className="block text-xs font-bold uppercase tracking-widest">
                    {t("seanceEntrepreneuriale.info.price.label")}
                  </span>

                  <span
                    className="block text-3xl font-bold"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    SOLD OUT
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================
            CE QUE C'EST
        ========================= */}

        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 md:px-10 lg:px-16">
            <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">

              <SectionTitle
                eyebrow={t("seanceEntrepreneuriale.about.eyebrow")}
                title={t("seanceEntrepreneuriale.about.title")}
                description={t("seanceEntrepreneuriale.about.subtitle")}
              />

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-lg leading-9"
                style={{ color: "#4B5563" }}
              >
                <p>{t("seanceEntrepreneuriale.about.description1")}</p>

                <p className="mt-7">
                  {t("seanceEntrepreneuriale.about.description2")}
                </p>

                <div
                  className="mt-10 border-l-4 pl-6"
                  style={{ borderColor: "#EAB12D" }}
                >
                  <p
                    className="text-xl font-semibold leading-8"
                    style={{
                      color: "#001A4D",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {t("seanceEntrepreneuriale.about.highlight.title")}
                  </p>

                  <p className="mt-3 text-base leading-7">
                    {t("seanceEntrepreneuriale.about.highlight.text")}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================
            POURQUOI
        ========================= */}

        <section
          className="py-24 md:py-32"
          style={{ backgroundColor: "#F6F7F9" }}
        >
          <div className="container mx-auto px-6 md:px-10 lg:px-16">

            <SectionTitle
              eyebrow={t("seanceEntrepreneuriale.why.eyebrow")}
              title={t("seanceEntrepreneuriale.why.title")}
              description={t("seanceEntrepreneuriale.why.description")}
            />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-16 grid gap-px bg-[#001A4D]/10 md:grid-cols-2"
            >
              {features.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.number}
                    variants={fadeUp}
                    className="group bg-white p-8 md:p-10 lg:p-12"
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className="flex h-12 w-12 items-center justify-center"
                        style={{
                          backgroundColor: "#001A4D",
                          color: "#EAB12D",
                        }}
                      >
                        <Icon size={21} />
                      </div>

                      <span
                        className="text-5xl font-bold opacity-10"
                        style={{
                          color: "#001A4D",
                          fontFamily: "var(--font-heading)",
                        }}
                      >
                        {item.number}
                      </span>
                    </div>

                    <h3
                      className="mt-8 text-2xl font-bold"
                      style={{
                        color: "#001A4D",
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      className="mt-5 leading-8"
                      style={{ color: "#667085" }}
                    >
                      {item.text}
                    </p>

                    <div
                      className="mt-8 h-px w-10 transition-all duration-500 group-hover:w-20"
                      style={{ backgroundColor: "#EAB12D" }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
            <center>
                <motion.div variants={fadeUp} className="mt-10">
                  <PrimaryButton>
                    {t("seanceEntrepreneuriale.cta.reservePrice")}
                  </PrimaryButton>
                </motion.div>
            </center>
                
          </div>
        </section>

        {/* =========================
            POUR QUI
        ========================= */}

        <section
          className="py-24 md:py-32"
          style={{ backgroundColor: "#001A4D" }}
        >
          <div className="container mx-auto px-6 md:px-10 lg:px-16">
            <div className="grid items-center gap-16 lg:grid-cols-2">

              <SectionTitle
                eyebrow={t("seanceEntrepreneuriale.audience.eyebrow")}
                title={t("seanceEntrepreneuriale.audience.title")}
                light
              />

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {audience.map((item) => (
                  <motion.div
                    key={item}
                    variants={fadeUp}
                    className="flex items-center gap-5 border p-5"
                    style={{
                      borderColor: "rgba(255,255,255,0.12)",
                    }}
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center"
                      style={{
                        backgroundColor: "#EAB12D",
                        color: "#001A4D",
                      }}
                    >
                      <Check size={18} strokeWidth={3} />
                    </span>

                    <span className="text-base font-medium text-white">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

            </div>
          </div>
        </section>

        {/* =========================
            RÉSULTATS
        ========================= */}

        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 md:px-10 lg:px-16">

            <SectionTitle
              eyebrow={t("seanceEntrepreneuriale.results.eyebrow")}
              title={t("seanceEntrepreneuriale.results.title")}
              description={t("seanceEntrepreneuriale.results.description")}
            />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-16 grid gap-6 md:grid-cols-3"
            >
              {results.map((item) => (
                <motion.div
                  key={item.number}
                  variants={fadeUp}
                  className="border p-8 md:p-10"
                  style={{
                    borderColor: "rgba(0,26,77,0.12)",
                  }}
                >
                  <span
                    className="text-6xl font-bold"
                    style={{
                      color: "#EAB12D",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {item.number}
                  </span>

                  <h3
                    className="mt-8 text-2xl font-bold leading-tight"
                    style={{
                      color: "#001A4D",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="mt-5 leading-8"
                    style={{ color: "#667085" }}
                  >
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
            <center>
                <motion.div variants={fadeUp} className="mt-10">
                  <PrimaryButton>
                    {t("seanceEntrepreneuriale.cta.reservePrice")}
                  </PrimaryButton>
                </motion.div>
            </center>
          </div>
        </section>

        {/* =========================
            POURQUOI MAINTENANT
        ========================= */}

        <section
          className="py-24 md:py-32"
          style={{ backgroundColor: "#F6F7F9" }}
        >
          <div className="container mx-auto px-6 md:px-10 lg:px-16">
            <div className="mx-auto max-w-4xl text-center">

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span
                  className="text-xs font-bold uppercase tracking-[0.25em]"
                  style={{ color: "#EAB12D" }}
                >
                  {t("seanceEntrepreneuriale.whyNow.eyebrow")}
                </span>

                <h2
                  className="mt-6 text-4xl font-bold leading-tight md:text-6xl"
                  style={{
                    color: "#001A4D",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {t("seanceEntrepreneuriale.whyNow.title")}
                </h2>

                <p
                  className="mx-auto mt-8 max-w-2xl text-lg leading-9"
                  style={{ color: "#667085" }}
                >
                  {t("seanceEntrepreneuriale.whyNow.description")}
                </p>

                <p
                  className="mt-8 text-2xl font-bold md:text-3xl"
                  style={{
                    color: "#001A4D",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {t("seanceEntrepreneuriale.whyNow.highlight")}
                </p>
              </motion.div>

            </div>
          </div>
        </section>

        {/* =========================
            INFORMATIONS
        ========================= */}

        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 md:px-10 lg:px-16">

            <SectionTitle
              eyebrow={t("seanceEntrepreneuriale.practical.eyebrow")}
              title={t("seanceEntrepreneuriale.practical.title")}
            />

            <div className="mt-14 grid border md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  label: t("seanceEntrepreneuriale.practical.duration"),
                  value: t("seanceEntrepreneuriale.info.duration"),
                  icon: Clock3,
                },
                {
                  label: t("seanceEntrepreneuriale.practical.places"),
                  value: t("seanceEntrepreneuriale.info.places"),
                  icon: Users,
                },
                {
                  label: t("seanceEntrepreneuriale.practical.price"),
                  value: "SOLD OUT",
                  icon: Sparkles,
                },
                {
                  label: t("seanceEntrepreneuriale.practical.nextSession"),
                  value: t("seanceEntrepreneuriale.info.date"),
                  icon: CalendarDays,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="border-b p-8 md:p-10 lg:border-b-0 lg:border-r"
                    style={{
                      borderColor: "rgba(0,26,77,0.12)",
                    }}
                  >
                    <Icon
                      size={22}
                      style={{ color: "#EAB12D" }}
                    />

                    <span
                      className="mt-6 block text-xs font-bold uppercase tracking-[0.2em]"
                      style={{ color: "#667085" }}
                    >
                      {item.label}
                    </span>

                    <span
                      className="mt-2 block text-xl font-bold"
                      style={{
                        color: "#001A4D",
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {item.value}
                    </span>
                  </div>
                );
              })}
            </div>

            <div
              className="mt-6 border p-8 md:p-10"
              style={{
                borderColor: "rgba(0,26,77,0.12)",
                backgroundColor: "#F6F7F9",
              }}
            >
              <span
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: "#EAB12D" }}
              >
                {t("seanceEntrepreneuriale.practical.hostedBy")}
              </span>

              <h3
                className="mt-3 text-2xl font-bold"
                style={{
                  color: "#001A4D",
                  fontFamily: "var(--font-heading)",
                }}
              >
                Marveen Promise
              </h3>

              <p
                className="mt-3 max-w-3xl leading-7"
                style={{ color: "#667085" }}
              >
                {t("seanceEntrepreneuriale.practical.hostDescription")}
              </p>
            </div>
          </div>
        </section>

        {/* =========================
            CTA FINAL
        ========================= */}

        <section
          className="relative overflow-hidden py-24 md:py-32"
          style={{ backgroundColor: "#001A4D" }}
        >
          <div className="container relative z-10 mx-auto px-6 text-center md:px-10 lg:px-16">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-4xl"
            >
              <span
                className="text-xs font-bold uppercase tracking-[0.3em]"
                style={{ color: "#EAB12D" }}
              >
                {t("seanceEntrepreneuriale.final.places")}
              </span>

              <h2
                className="mt-6 text-5xl font-bold leading-[0.95] md:text-7xl"
                style={{
                  color: "#FFFFFF",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {t("seanceEntrepreneuriale.final.title")}
              </h2>

              <p
                className="mx-auto mt-8 max-w-2xl text-lg leading-8"
                style={{ color: "rgba(255,255,255,0.68)" }}
              >
                {t("seanceEntrepreneuriale.final.description")}
              </p>

              <div className="mt-10 flex flex-col items-center gap-5">
                <PrimaryButton>
                  {t("seanceEntrepreneuriale.cta.reservePrice")}
                </PrimaryButton>

                <span
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {t("seanceEntrepreneuriale.cta.payment")}
                </span>
              </div>
            </motion.div>

          </div>
        </section>

      </main>
    </>
  );
}
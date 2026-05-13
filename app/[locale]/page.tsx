import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "../_components/navbar";
import { Reveal } from "../_components/motion";
import { BookCallButton } from "../_components/book-call-modal";
import { StatsStrip } from "../_components/stats-strip";
import { OciCerts } from "../_components/oci-certs";
import { SpotlightCard } from "../_components/spotlight-card";
import { BackToTop } from "../_components/back-to-top";
import { TechIcon } from "../_components/tech-icon";
import { TechMarquee } from "../_components/tech-marquee";
import { Typewriter } from "../_components/typewriter";
import { siteConfig } from "../_data/site";
import { projects, type Project } from "../_data/projects";
import { ImageLightbox } from "../_components/image-lightbox";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased selection:bg-orange-500/30 selection:text-orange-200">
      {/* Dot-matrix background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(var(--dot-color) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Soft orange glow accents */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-40 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[120px]"
      />

      <Navbar />

      <main className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Hero />
        <OciCerts />
        <FeaturedProjects />
        <Services />
        <Publications />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  const t = useTranslations("hero");
  const tNav = useTranslations("nav");
  const phrases = t.raw("phrases") as string[];
  const stack = [
    "AWS",
    "Oracle Cloud",
    "Docker",
    "Kubernetes",
    "NestJS",
    "Next.js",
    "React",
    "Django",
    "PostgreSQL",
    "TypeScript",
    "Linux",
    "Nginx",
    "GitHub Actions",
    "Strapi",
  ];
  return (
    <section
      id="about"
      className="flex flex-col items-center pt-20 pb-24 text-center sm:pt-28 sm:pb-32"
    >
      <span
        className="fade-up inline-flex items-center gap-2 rounded-full border border-border-default bg-card/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
        style={{ ["--fade-delay" as string]: "0ms" } as React.CSSProperties}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        {t("available")}
      </span>

      <h1
        className="fade-up mt-7 max-w-4xl text-balance text-4xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl [&:lang(ar)]:leading-[1.35]"
        style={{ ["--fade-delay" as string]: "100ms" } as React.CSSProperties}
      >
        {t("headlinePrefix")} <Typewriter phrases={phrases} />
      </h1>

      <p
        className="fade-up mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg"
        style={{ ["--fade-delay" as string]: "200ms" } as React.CSSProperties}
      >
        {t("subhead")}
      </p>

      <div
        className="fade-up mt-9 flex flex-col items-center gap-3 sm:flex-row"
        style={{ ["--fade-delay" as string]: "300ms" } as React.CSSProperties}
      >
        <a
          href="#works"
          className="group inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-neutral-950 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_30px_-6px_rgba(249,115,22,0.55)] transition-all hover:bg-orange-400 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_12px_40px_-6px_rgba(249,115,22,0.7)]"
        >
          {t("cta")}
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
        <a
          href={siteConfig.links.cv}
          download
          className="group inline-flex items-center gap-2 rounded-full border border-border-strong bg-card/60 px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-orange-500/60 hover:text-orange-400"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
          {tNav("downloadCv")}
        </a>
      </div>

      {/* Tech-stack marquee */}
      <div
        className="fade-up mt-16 w-full"
        style={{ ["--fade-delay" as string]: "400ms" } as React.CSSProperties}
      >
        <p className="text-center text-xs uppercase tracking-[0.2em] text-subtle">
          {t("techStack")}
        </p>
        <div className="mt-5">
          <TechMarquee items={stack} />
        </div>
      </div>

      <StatsStrip />
    </section>
  );
}

/* ---------------- Services (Bento) ---------------- */
function Services() {
  const t = useTranslations("services");
  const tNav = useTranslations("nav");
  return (
    <section id="services" className="py-16 sm:py-24">
      <Reveal>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} />
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
          {t("intro")}
        </p>
      </Reveal>

      <div className="mt-12 grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-4 sm:gap-5 md:grid-cols-6 lg:grid-cols-12">
        {/* 1. Cloud Architecture — wide */}
        <BentoCard
          className="md:col-span-6 lg:col-span-7"
          title={t("items.cloud.title")}
          description={t("items.cloud.desc")}
          tags={["AWS", "OCI", "Terraform", "VPC"]}
          visual={<CloudVisual />}
        />

        {/* 2. Backend & API — square */}
        <BentoCard
          className="md:col-span-6 lg:col-span-5"
          title={t("items.backend.title")}
          description={t("items.backend.desc")}
          tags={["NestJS", "Django", "Strapi"]}
          visual={<ApiVisual />}
        />

        {/* 3. DevOps & CI/CD — wide */}
        <BentoCard
          className="md:col-span-6 lg:col-span-8"
          title={t("items.devops.title")}
          description={t("items.devops.desc")}
          tags={["Docker", "GitHub Actions", "Jenkins"]}
          visual={<PipelineVisual />}
        />

        {/* 4. AI / LLM — tall, spans 2 rows */}
        <BentoCard
          className="md:col-span-6 lg:col-span-4 lg:row-span-2"
          title={t("items.ai.title")}
          description={t("items.ai.desc")}
          tags={["LLMs", "RAG", "Arabic NLP"]}
          visual={<AiVisual />}
          tall
        />

        {/* 5. Workflow Automation */}
        <BentoCard
          className="md:col-span-3 lg:col-span-4"
          title={t("items.automation.title")}
          description={t("items.automation.desc")}
          tags={["n8n", "Webhooks"]}
          visual={<AutomationVisual />}
        />

        {/* 6. Linux Infra & Backup */}
        <BentoCard
          className="md:col-span-3 lg:col-span-4"
          title={t("items.linux.title")}
          description={t("items.linux.desc")}
          tags={["Linux", "Nginx", "Veeam"]}
          visual={<BackupVisual />}
        />
      </div>

      {/* CTA strip */}
      <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-border-default bg-card/40 p-5 sm:flex-row sm:items-center sm:p-6">
        <div>
          <h3 className="text-base font-semibold text-foreground sm:text-lg">
            {t("ctaTitle")}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("ctaSubtitle")}
          </p>
        </div>
        <BookCallButton variant="primary">
          {tNav("bookCall")}
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </BookCallButton>
      </div>
    </section>
  );
}

function BentoCard({
  className = "",
  title,
  description,
  tags,
  visual,
  tall = false,
}: {
  className?: string;
  title: string;
  description: string;
  tags?: string[];
  visual: React.ReactNode;
  tall?: boolean;
}) {
  return (
    <SpotlightCard
      as="article"
      className={`group flex flex-col overflow-hidden rounded-2xl border border-border-default bg-card/40 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_0_0_1px_rgba(249,115,22,0.18),0_24px_60px_-24px_rgba(249,115,22,0.35)] ${className}`}
    >
      {/* dot bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(var(--dot-color) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      {/* visual */}
      <div
        className={`relative flex items-center justify-center overflow-hidden border-b border-border-default/80 bg-gradient-to-b from-card/60 to-background/40 ${
          tall ? "min-h-[260px] flex-1" : "min-h-[180px]"
        }`}
      >
        {visual}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 left-1/2 h-40 w-3/4 -translate-x-1/2 rounded-full bg-orange-500/0 blur-3xl transition-colors duration-500 group-hover:bg-orange-500/15"
        />
      </div>
      {/* body */}
      <div className="relative flex flex-col gap-2.5 p-5">
        <h3 className="text-base font-semibold text-foreground sm:text-lg">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        {tags && (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border-default bg-background/60 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </SpotlightCard>
  );
}

/* ---------- Bento Visuals (pure CSS mocks) ---------- */

function CloudVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center px-6 py-6">
      {/* mini architecture diagram */}
      <div className="flex w-full max-w-sm items-center justify-between gap-3">
        <DiagramNode label="Client" />
        <DiagramArrow />
        <DiagramNode label="API GW" highlight />
        <DiagramArrow />
        <div className="flex flex-col gap-2">
          <DiagramNode label="OCI" small />
          <DiagramNode label="AWS" small />
        </div>
      </div>
    </div>
  );
}

function DiagramNode({
  label,
  highlight,
  small,
}: {
  label: string;
  highlight?: boolean;
  small?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg border font-mono text-[10px] tracking-wide ${
        small ? "h-7 w-14" : "h-10 w-16"
      } ${
        highlight
          ? "border-orange-500/50 bg-orange-500/10 text-orange-300"
          : "border-border-strong bg-card text-muted-foreground"
      }`}
    >
      {label}
    </div>
  );
}

function DiagramArrow() {
  return (
    <div className="flex flex-1 items-center">
      <div className="h-px flex-1 bg-gradient-to-r from-border-strong to-orange-500/60" />
      <svg
        className="h-2.5 w-2.5 text-orange-500"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M8 4l8 8-8 8z" />
      </svg>
    </div>
  );
}

function ApiVisual() {
  return (
    <div className="w-full max-w-[260px] px-5 py-5">
      <div className="overflow-hidden rounded-lg border border-border-default bg-background/80 font-mono text-[11px] shadow-lg">
        <div className="flex items-center gap-1.5 border-b border-border-default px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-border-strong" />
          <span className="h-2 w-2 rounded-full bg-border-strong" />
          <span className="h-2 w-2 rounded-full bg-border-strong" />
          <span className="ml-2 text-[10px] text-subtle">api.ts</span>
        </div>
        <pre className="px-3 py-3 leading-relaxed text-muted-foreground">
          {`POST `}
          <span className="text-orange-400">/v1/orders</span>
          {`
`}
          <span className="text-subtle">200 OK · 38ms</span>
          {`

`}
          <span className="text-subtle">// NestJS · JWT · Postgres</span>
          {`
@`}
          <span className="text-orange-400">Controller</span>
          {`('orders')
class `}
          <span className="text-foreground">OrdersService</span>
          {` { ... }`}
        </pre>
      </div>
    </div>
  );
}

function PipelineVisual() {
  const steps = ["Push", "Build", "Test", "Deploy"];
  return (
    <div className="w-full px-6 py-6">
      <div className="flex items-center justify-between gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border font-mono text-[10px] ${
                  i === steps.length - 1
                    ? "border-orange-500/60 bg-orange-500/15 text-orange-300"
                    : "border-border-strong bg-card text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
              <span className="text-[10px] text-muted-foreground">{s}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="mx-1 h-px flex-1 bg-gradient-to-r from-border-strong to-border-strong/40 sm:mx-2" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-[10px] font-medium text-emerald-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Deployed · main@a3f9e2
      </div>
    </div>
  );
}

function AiVisual() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-6 py-8">
      {/* prompt bubble */}
      <div className="w-full rounded-xl border border-border-default bg-background/70 p-3 text-[11px] text-muted-foreground">
        <span className="text-subtle">{">"} </span>
        Summarize Q3 revenue from invoices…
      </div>
      {/* center neuron */}
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/5">
        <div className="absolute inset-2 animate-pulse rounded-full bg-orange-500/10" />
        <span className="relative font-mono text-xs font-semibold text-orange-400">
          LLM
        </span>
      </div>
      {/* response */}
      <div className="w-full rounded-xl border border-orange-500/30 bg-orange-500/[0.06] p-3 text-[11px] text-foreground">
        Q3 revenue grew{" "}
        <span className="font-semibold text-orange-300">+18%</span> vs Q2…
      </div>
    </div>
  );
}

function AutomationVisual() {
  return (
    <div className="relative w-full px-6 py-6">
      <div className="flex items-center justify-between">
        {["API", "n8n", "DB"].map((label, i) => (
          <div
            key={label}
            className={`flex h-12 w-12 items-center justify-center rounded-xl border font-mono text-[10px] ${
              i === 1
                ? "border-orange-500/50 bg-orange-500/10 text-orange-300"
                : "border-border-strong bg-card text-muted-foreground"
            }`}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-1.5">
        {["trigger · webhook", "transform · merge", "sync · 142 rows"].map(
          (t) => (
            <div
              key={t}
              className="flex items-center gap-2 rounded-md border border-border-default bg-background/60 px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              {t}
            </div>
          ),
        )}
      </div>
    </div>
  );
}

function BackupVisual() {
  return (
    <div className="w-full px-6 py-6">
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className={`h-7 rounded-md border ${
              [0, 4, 6, 8].includes(i)
                ? "border-orange-500/40 bg-orange-500/10"
                : "border-border-default bg-card"
            }`}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between rounded-lg border border-border-default bg-background/60 px-3 py-2 text-[11px]">
        <span className="font-mono text-muted-foreground">backup.tar.gz</span>
        <span className="font-mono text-emerald-400">✓ 99.9%</span>
      </div>
    </div>
  );
}

/* ---------------- Featured Projects ---------------- */
function FeaturedProjects() {
  const t = useTranslations("works");
  const systemsItems = [
    {
      title: "UNIX Command Interpreter (Simple Shell)",
      description:
        "Engineered a custom command-line interpreter in C, demonstrating deep knowledge of Linux kernel interactions, process execution, and memory management.",
      glyph: "$_",
    },
    {
      title: "High-Availability Web Infrastructure",
      description:
        "Architected a fault-tolerant web infrastructure using Linux, Nginx, and HAProxy for efficient load balancing and continuous availability.",
      glyph: "⇄",
    },
  ];

  return (
    <section id="works" className="py-16 sm:py-24">
      <Reveal>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 80}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>

      {/* Systems Engineering sub-section */}
      <div className="mt-20">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-orange-500/60" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-orange-400">
              {t("systems.eyebrow")}
            </span>
          </div>
          <h3 className="mt-3 max-w-2xl text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {t("systems.title")}
          </h3>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {systemsItems.map((it, i) => (
            <Reveal
              key={it.title}
              delay={i * 100}
              className="group relative overflow-hidden rounded-2xl border border-border-default bg-card/40 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:bg-card/70"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border-default bg-background font-mono text-orange-400">
                {it.glyph}
              </div>
              <h4
                dir="ltr"
                className="mt-5 text-lg font-semibold text-foreground"
              >
                {it.title}
              </h4>
              <p
                dir="ltr"
                className="mt-2 text-sm leading-relaxed text-muted-foreground"
              >
                {it.description}
              </p>
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-orange-500/0 blur-2xl transition-colors duration-500 group-hover:bg-orange-500/10"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("works");
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border-default bg-card/40 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_0_0_1px_rgba(249,115,22,0.15),0_20px_50px_-20px_rgba(249,115,22,0.25)]">
      {/* Cover image — sits OUTSIDE the Link so clicks don't navigate */}
      {project.coverImage && (
        <div className="px-5 pt-5">
          <ImageLightbox
            src={project.coverImage}
            alt={project.title}
            width={800}
            height={500}
            className="group/img relative flex aspect-video w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-xl border border-border-default bg-card/60 p-3"
            imgClassName="max-h-full max-w-full object-contain"
          />
        </div>
      )}

      {/* Body — the whole body block is the Link */}
      <Link href={`/works/${project.slug}`} className="block p-5">
        <div className="flex flex-col gap-3 px-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 dir="ltr" className="text-lg font-semibold text-foreground">
              {project.title}
            </h3>
            {project.status && (
              <span
                dir="ltr"
                className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-0.5 text-[11px] font-medium text-orange-400"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                {project.status}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {project.tags.map((tag) => (
              <TechIcon key={tag} name={tag} size="md" />
            ))}
          </div>

          <p
            dir="ltr"
            className="text-sm leading-relaxed text-muted-foreground"
          >
            {project.summary}
          </p>

          <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-orange-400 transition-all group-hover:gap-2.5">
            {t("readCaseStudy")}
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    </div>
  );
}

/* ---------------- Publications ---------------- */
function Publications() {
  const t = useTranslations("research");
  const pubs = [
    {
      title:
        "Athar at QIAS2025: LLM-based Question Answering Systems for Islamic Inheritance",
      venue: "ArabicNLP 2025",
    },
    {
      title:
        "Zero-Shot and Fine-Tuned Evaluation of Generative LLMs for Arabic Word Sense Disambiguation",
      venue: "ArabicNLP 2025",
    },
  ];

  return (
    <section id="research" className="py-16 sm:py-24">
      <Reveal>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} />
      </Reveal>

      <ul className="mt-10 divide-y divide-border-default overflow-hidden rounded-2xl border border-border-default bg-card/30">
        {pubs.map((pub, i) => (
          <li
            key={pub.title}
            className="group flex flex-col gap-2 px-5 py-6 transition-colors hover:bg-card/70 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-7"
          >
            <div className="flex items-start gap-4">
              <span className="mt-0.5 font-mono text-xs text-subtle">
                0{i + 1}
              </span>
              <h3
                dir="ltr"
                className="text-base font-medium text-foreground sm:text-lg"
              >
                {pub.title}
              </h3>
            </div>
            <span className="ml-9 inline-flex shrink-0 items-center gap-2 rounded-full border border-border-default bg-background px-3 py-1 text-xs text-muted-foreground sm:ml-0">
              {pub.venue}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------- Contact ---------------- */
function Contact() {
  const t = useTranslations("contact");
  return (
    <section id="contact" className="py-16 sm:py-24">
      <Reveal>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} />
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-5">
        {/* Primary card */}
        <Reveal className="relative overflow-hidden rounded-3xl border border-border-default bg-card/40 p-7 sm:p-9 lg:col-span-3">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange-500/15 blur-3xl"
          />
          <div className="relative flex flex-col gap-6">
            <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("blurb")}
            </p>

            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-subtle">
                {t("emailLabel")}
              </span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="group inline-flex w-fit items-center gap-2 text-xl font-medium text-foreground transition-colors hover:text-orange-400 sm:text-2xl"
              >
                {siteConfig.email}
                <svg
                  className="h-5 w-5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={siteConfig.links.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-400"
              >
                {/* WhatsApp icon */}
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.854L.057 23.885a.75.75 0 0 0 .921.921l6.079-1.463A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.706 9.706 0 0 1-4.92-1.334l-.354-.21-3.644.877.892-3.587-.229-.368A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
                </svg>
                {t("whatsappCta")}
              </a>
              <BookCallButton variant="outline">
                {t("bookCallCta")}
              </BookCallButton>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-orange-500/60 hover:text-orange-400"
              >
                LinkedIn
              </a>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-orange-500/60 hover:text-orange-400"
              >
                GitHub
              </a>
            </div>
          </div>
        </Reveal>

        {/* Side card: availability */}
        <Reveal
          delay={120}
          className="relative flex flex-col justify-between gap-6 rounded-3xl border border-border-default bg-card/40 p-7 lg:col-span-2"
        >
          <div className="flex flex-col gap-4">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {t("available")}
            </div>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("availableBody")}
            </p>
          </div>

          <ul className="flex flex-col gap-2 text-sm">
            <li className="flex items-center justify-between border-b border-border-default pb-2">
              <span className="text-subtle">{t("basedIn")}</span>
              <span className="text-foreground">{siteConfig.location}</span>
            </li>
            <li className="flex items-center justify-between border-b border-border-default pb-2">
              <span className="text-subtle">{t("engagements")}</span>
              <span className="text-foreground">{t("engagementsValue")}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-subtle">{t("stackLabel")}</span>
              <span className="text-foreground">{t("stackValue")}</span>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Section Header ---------------- */
function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="inline-flex w-fit items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-orange-400">
        <span className="h-px w-6 bg-orange-500/60" />
        {eyebrow}
      </span>
      <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
        {title}
      </h2>
    </div>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const linkClass =
    "rounded-full border border-border-default bg-card/40 px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-orange-500/60 hover:text-orange-400";
  return (
    <footer className="mt-16 border-t border-border-default bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-5 py-10 sm:flex-row sm:items-center sm:px-8">
        <div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.fullName}. {t("rights")}
          </p>
          <p className="mt-1 text-xs text-subtle">
            {t("based", { location: siteConfig.location })}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className={linkClass}
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={linkClass}
          >
            GitHub
          </a>
          <a href={`mailto:${siteConfig.email}`} className={linkClass}>
            Email
          </a>
          <a href={siteConfig.links.cv} download className={linkClass}>
            {tNav("downloadCv")}
          </a>
        </div>
      </div>
    </footer>
  );
}

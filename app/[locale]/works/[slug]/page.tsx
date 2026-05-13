import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "../../../_components/navbar";
import { Reveal } from "../../../_components/motion";
import { BookCallButton } from "../../../_components/book-call-modal";
import { BackToTop } from "../../../_components/back-to-top";
import { TechIcon } from "../../../_components/tech-icon";
import { projects, getProject } from "../../../_data/projects";
import { siteConfig } from "../../../_data/site";
import { routing } from "../../../../i18n/routing";

type Params = { slug: string; locale: string };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const path = `/works/${project.slug}`;
  const canonical =
    locale === routing.defaultLocale ? path : `/${locale}${path}`;
  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          l === routing.defaultLocale ? path : `/${l}${path}`,
        ]),
      ),
    },
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.summary,
      url: `${siteConfig.url}${canonical}`,
      locale: locale === "ar" ? "ar_SA" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Case Study`,
      description: project.summary,
    },
  };
}

export default async function WorkDetail({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();

  return <WorkDetailView project={project} locale={locale} />;
}

function WorkDetailView({
  project,
  locale,
}: {
  project: NonNullable<ReturnType<typeof getProject>>;
  locale: string;
}) {
  const t = useTranslations("works");
  const tNav = useTranslations("nav");
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];
  const home = locale === "en" ? "/" : `/${locale}`;
  const worksHref = `${home}#works`;
  const nextHref =
    locale === "en" ? `/works/${next.slug}` : `/${locale}/works/${next.slug}`;

  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased selection:bg-orange-500/30 selection:text-orange-200">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(var(--dot-color) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -top-40 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[120px]"
      />

      <Navbar />

      <main className="mx-auto w-full max-w-4xl px-5 sm:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mt-12 flex items-center gap-2 text-xs text-subtle"
        >
          <Link
            href={worksHref}
            className="transition-colors hover:text-orange-400"
          >
            {t("breadcrumbWorks")}
          </Link>
          <span aria-hidden>/</span>
          <span dir="ltr" className="text-muted-foreground">
            {project.title}
          </span>
        </nav>

        {/* Hero */}
        <header className="mt-6 border-b border-border-default pb-10">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2">
              {project.status && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-0.5 text-[11px] font-medium text-orange-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  {project.status}
                </span>
              )}
              <span className="font-mono text-xs text-subtle">
                {project.year}
              </span>
            </div>
            <h1
              dir="ltr"
              className="mt-4 text-balance text-4xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-5xl [&:lang(ar)]:leading-[1.35]"
            >
              {project.title}
            </h1>
            <p
              dir="ltr"
              className="mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg"
            >
              {project.summary}
            </p>
          </Reveal>
        </header>

        {/* Overview grid */}
        <section className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <Reveal>
              <SectionTitle>{t("challenge")}</SectionTitle>
              <div
                dir="ltr"
                className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground"
              >
                {project.challenge.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <SectionTitle>{t("solution")}</SectionTitle>
              <div
                dir="ltr"
                className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground"
              >
                {project.solution.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Sticky info card */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl border border-border-default bg-card/40 p-5">
              <dl className="space-y-4 text-sm">
                <InfoRow label={t("role")} value={project.role} />
                {project.client && (
                  <InfoRow label={t("client")} value={project.client} />
                )}
                <InfoRow label={t("year")} value={project.year} />
                {project.liveUrl && (
                  <div>
                    <dt className="text-[11px] font-medium uppercase tracking-[0.15em] text-subtle">
                      {t("live")}
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-orange-400 hover:underline"
                      >
                        {t("visitSite")} →
                      </a>
                    </dd>
                  </div>
                )}
              </dl>

              <div className="mt-6 border-t border-border-default pt-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-subtle">
                  {t("stack")}
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  {project.stack.map((s) => (
                    <TechIcon key={s} name={s} size="md" showLabel />
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </section>

        {/* Outcomes */}
        <section className="mt-16">
          <Reveal>
            <SectionTitle>{t("outcomes")}</SectionTitle>
          </Reveal>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {project.outcomes.map((o, i) => (
              <Reveal
                key={o.label}
                delay={i * 80}
                className="rounded-2xl border border-border-default bg-card/40 p-5"
              >
                <div className="font-mono text-3xl font-semibold text-orange-400">
                  {o.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {o.label}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="my-20 rounded-2xl border border-border-default bg-card/40 p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
                {t("similarChallenge")}
              </h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                {t("similarChallengeBody")}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <BookCallButton variant="primary">
                {tNav("bookCall")}
              </BookCallButton>
              <Link
                href={nextHref}
                className="group inline-flex items-center gap-2 rounded-full border border-border-strong bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-orange-500/60 hover:text-orange-400"
              >
                {t("nextProject")}
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
              </Link>
            </div>
          </div>
        </section>
      </main>
      <BackToTop />
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-6 bg-orange-500/60" />
      <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-orange-400">
        {children}
      </h2>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-medium uppercase tracking-[0.15em] text-subtle">
        {label}
      </dt>
      <dd className="mt-1 text-foreground">{value}</dd>
    </div>
  );
}

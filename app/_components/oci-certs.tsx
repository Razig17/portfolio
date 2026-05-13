import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reveal } from "./motion";

const certs = [
  {
    title: "OCI Multicloud Architect",
    level: "Professional",
    year: "2025",
    badge: "/badges/oci-multicloud-architect-professional.png",
  },
  {
    title: "OCI Certified Architect",
    level: "Associate",
    year: "2025",
    badge: "/badges/oci-architect-associate.png",
  },
  {
    title: "OCI AI Foundations",
    level: "Associate",
    year: "2025",
    badge: "/badges/oci-ai-foundations-associate.png",
  },
  {
    title: "OCI Certified Foundations",
    level: "Associate",
    year: "2025",
    badge: "/badges/oci-foundations-associate.png",
  },
];

export function OciCerts() {
  const t = useTranslations("oci");
  return (
    <section className="py-12 sm:py-16">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="h-px w-6 bg-orange-500/60" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-orange-400">
            {t("eyebrow")}
          </span>
        </div>
        <h2 className="mt-3 max-w-2xl text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {t("title")}
        </h2>
      </Reveal>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {certs.map((c, i) => (
          <Reveal
            key={c.title}
            delay={i * 80}
            className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-border-default bg-background p-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_0_0_1px_rgba(249,115,22,0.15),0_18px_50px_-20px_rgba(249,115,22,0.3)]"
          >
            {/* Badge image — fills the card width */}
            <div className="relative w-full aspect-square">
              <Image
                src={c.badge}
                alt={`${c.title} ${c.level} badge`}
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 15vw"
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                loading={i < 2 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
              />
            </div>
            <h3
              dir="ltr"
              className="mt-3 text-sm font-semibold text-foreground leading-snug"
            >
              {c.title}
            </h3>
            <p className="mt-1 font-mono text-xs text-subtle">{c.year}</p>
            <div
              aria-hidden
              className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-orange-500/0 blur-2xl transition-colors duration-500 group-hover:bg-orange-500/10"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

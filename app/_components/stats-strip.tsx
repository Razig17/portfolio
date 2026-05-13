import { useTranslations } from "next-intl";
import { Reveal } from "./motion";

export function StatsStrip() {
  const t = useTranslations("stats");
  const stats = [
    { value: "4×", label: t("ociCertified") },
    { value: "12+", label: t("deploys") },
    { value: "2", label: t("papers") },
    { value: "MENA", label: t("remote") },
  ];
  return (
    <Reveal className="mt-12 w-full">
      <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border-default bg-card/40 p-4 sm:grid-cols-4 sm:gap-6 sm:p-6">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center text-center">
            <span className="font-mono text-2xl font-semibold text-orange-400 sm:text-3xl">
              {s.value}
            </span>
            <span className="mt-1 text-[11px] uppercase tracking-[0.15em] text-subtle sm:text-xs">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

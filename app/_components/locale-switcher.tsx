"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "../../i18n/navigation";

/**
 * Toggles between EN and AR. Uses next-intl's locale-aware
 * navigation so the URL is rewritten correctly for the
 * localePrefix: "as-needed" config.
 */
export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname(); // already locale-stripped
  const router = useRouter();
  const next = locale === "en" ? "ar" : "en";
  const label = next === "ar" ? "العربية" : "EN";

  const onClick = () => {
    router.replace(pathname, { locale: next });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={next === "ar" ? "التبديل إلى العربية" : "Switch to English"}
      className="flex h-9 items-center justify-center rounded-full border border-border-default bg-card/60 px-3 text-xs font-medium text-muted-foreground transition-colors hover:border-orange-500/60 hover:text-orange-500"
    >
      {label}
    </button>
  );
}

import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  // Don't prefix the default locale: "/" stays English, "/ar" is Arabic.
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

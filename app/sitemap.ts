import type { MetadataRoute } from "next";
import { siteConfig } from "./_data/site";
import { projects } from "./_data/projects";
import { routing } from "../i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = siteConfig.url.replace(/\/$/, "");
  const localePath = (locale: string, path: string) =>
    locale === routing.defaultLocale
      ? `${base}${path}`
      : `${base}/${locale}${path}`;

  const home = routing.locales.map((locale) => ({
    url: localePath(locale, "/"),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: {
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [l, localePath(l, "/")]),
        ),
        "x-default": localePath(routing.defaultLocale, "/"),
      },
    },
  }));

  const works = routing.locales.flatMap((locale) =>
    projects.map((p) => ({
      url: localePath(locale, `/works/${p.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((l) => [l, localePath(l, `/works/${p.slug}`)]),
          ),
          "x-default": localePath(routing.defaultLocale, `/works/${p.slug}`),
        },
      },
    })),
  );

  return [...home, ...works];
}

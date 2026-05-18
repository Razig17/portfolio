import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { siteConfig } from "../_data/site";
import { routing } from "../../i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ogLocale = locale === "ar" ? "ar_SA" : "en_US";
  const role = locale === "ar" ? siteConfig.roleAr : siteConfig.role;
  const description =
    locale === "ar" ? siteConfig.descriptionAr : siteConfig.description;
  const keywords =
    locale === "ar" ? siteConfig.keywordsAr : siteConfig.keywords;
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} — ${role}`,
      template: `%s — ${siteConfig.name}`,
    },
    description,
    keywords,
    authors: [{ name: siteConfig.fullName, url: siteConfig.url }],
    creator: siteConfig.fullName,
    alternates: {
      canonical: locale === "en" ? "/" : `/${locale}`,
      languages: {
        en: "/",
        ar: "/ar",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_SA"],
      url: locale === "en" ? siteConfig.url : `${siteConfig.url}/${locale}`,
      siteName: siteConfig.name,
      title: `${siteConfig.name} — ${role}`,
      description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${role}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} — ${role}`,
      description,
      images: ["/opengraph-image"],
    },
    robots: { index: true, follow: true },
  };
}

function getPersonJsonLd(locale: string) {
  const isArabic = locale === "ar";
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.fullName,
    givenName: "Abdelrazig",
    familyName: "Sharif",
    jobTitle: isArabic ? siteConfig.roleAr : siteConfig.role,
    email: `mailto:${siteConfig.email}`,
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: isArabic ? "الرياض" : "Riyadh",
      addressCountry: "SA",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Khartoum",
    },
    knowsAbout: isArabic ? siteConfig.keywordsAr : siteConfig.keywords,
    sameAs: [siteConfig.links.linkedin, siteConfig.links.github],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const personJsonLd = getPersonJsonLd(locale);

  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </>
  );
}

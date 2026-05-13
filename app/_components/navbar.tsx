"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useActiveSection } from "./motion";
import { BookCallButton } from "./book-call-modal";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitcher } from "./locale-switcher";
import { siteConfig } from "../_data/site";

const linkIds = ["about", "services", "works", "research", "contact"] as const;

export function Navbar() {
  const pathname = usePathname();
  const locale = useLocale();
  const tNav = useTranslations("nav");
  // Strip the locale prefix to detect the home page (e.g. "/ar" → "/")
  const stripped =
    pathname.replace(new RegExp(`^/${locale}(?=/|$)`), "") || "/";
  const isHome = stripped === "/";
  const active = useActiveSection(isHome ? [...linkIds] : []);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 8);
        if (!mobileOpen && y > 120) {
          setHidden(y > lastY);
        } else {
          setHidden(false);
        }
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Build href that works whether on home or any subpage, with locale prefix.
  const home = locale === "en" ? "/" : `/${locale}`;
  const linkHref = (id: string) => (isHome ? `#${id}` : `${home}#${id}`);

  return (
    <header
      className={`sticky top-4 z-50 mx-auto w-full max-w-6xl px-4 transition-transform duration-300 sm:px-6 ${
        hidden ? "-translate-y-[140%]" : "translate-y-0"
      }`}
    >
      <nav
        className={`relative flex items-center justify-between gap-4 rounded-2xl border border-border-default bg-card/60 px-3 py-2.5 backdrop-blur-xl supports-[backdrop-filter]:bg-card/40 transition-all duration-300 ${
          scrolled ? "shadow-lg shadow-black/5 dark:shadow-black/30" : ""
        }`}
      >
        <Link href={home} className="flex items-center gap-3">
          <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 ring-1 ring-orange-500/30" />
          <span className="hidden text-sm font-medium text-foreground sm:block">
            {siteConfig.name}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 rounded-full border border-border-default bg-card/60 px-1.5 py-1 text-sm text-muted-foreground md:flex">
          {linkIds.map((id) => {
            const isActive = isHome && active === id;
            return (
              <li key={id}>
                <Link
                  href={linkHref(id)}
                  className={`relative rounded-full px-3 py-1.5 transition-colors duration-300 ${
                    isActive
                      ? "text-foreground"
                      : "hover:bg-card/80 hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-0 rounded-full bg-card/80 ring-1 ring-orange-500/30"
                    />
                  )}
                  <span className="relative z-10">{tNav(id)}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LocaleSwitcher />
          <div className="hidden md:block">
            <BookCallButton variant="outline">
              {tNav("bookCall")}
            </BookCallButton>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? tNav("closeMenu") : tNav("openMenu")}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border-default bg-card/60 text-muted-foreground transition-colors hover:border-orange-500/60 hover:text-orange-500 md:hidden"
          >
            <span className="sr-only">Toggle menu</span>
            <span
              aria-hidden
              className={`absolute h-0.5 w-4 rounded bg-current transition-all duration-300 ${
                mobileOpen ? "rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              aria-hidden
              className={`absolute h-0.5 w-4 rounded bg-current transition-all duration-300 ${
                mobileOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              aria-hidden
              className={`absolute h-0.5 w-4 rounded bg-current transition-all duration-300 ${
                mobileOpen ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="mt-2 rounded-2xl border border-border-default bg-card/80 p-3 backdrop-blur-xl">
          <ul className="flex flex-col">
            {linkIds.map((id) => {
              const isActive = isHome && active === id;
              return (
                <li key={id}>
                  <Link
                    href={linkHref(id)}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-colors ${
                      isActive
                        ? "bg-card text-foreground ring-1 ring-orange-500/30"
                        : "text-muted-foreground hover:bg-card/60 hover:text-foreground"
                    }`}
                  >
                    <span>{tNav(id)}</span>
                    <svg
                      className="h-4 w-4 text-subtle"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-3 flex flex-col gap-2 border-t border-border-default pt-3">
            <BookCallButton variant="primary" className="w-full justify-center">
              {tNav("bookCall")}
            </BookCallButton>
            <a
              href={siteConfig.links.cv}
              download
              onClick={() => setMobileOpen(false)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border-strong bg-card/60 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-orange-500/60 hover:text-orange-500"
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
        </div>
      </div>
    </header>
  );
}

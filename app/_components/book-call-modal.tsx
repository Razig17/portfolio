"use client";

import { useEffect, useState, useRef, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import Cal from "@calcom/embed-react";
import { siteConfig } from "../_data/site";

type Ctx = { open: () => void; close: () => void; isOpen: boolean };
const BookCallContext = createContext<Ctx | null>(null);

export function BookCallProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <BookCallContext.Provider value={{ open, close, isOpen }}>
      {children}
      {isOpen && <BookCallModal onClose={close} />}
    </BookCallContext.Provider>
  );
}

function BookCallModal({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("nav");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  if (!mounted) return null;

  // Cal.com auto-detects the user's language from their browser's
  // Accept-Language header. There is no supported way to override this
  // from an embed (we tested URL paths, query params, and cookies
  // — only the Accept-Language header changes the rendered locale).
  // A real Saudi visitor with `ar` in their browser will see Arabic
  // automatically; an English-locale browser will see English even
  // when viewing the AR version of this site. That's correct UX.
  const calLink = `${siteConfig.calcom.username}/${siteConfig.calcom.eventSlug}`;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("bookCallModalTitle")}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 bg-background/80 backdrop-blur-md animate-[fadeIn_200ms_ease-out]"
      />

      {/* Dialog — always ltr so Cal.com's internal layout isn't mirrored
          by the page's RTL context. Cal handles its own RTL internally. */}
      <div
        dir="ltr"
        ref={dialogRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full max-h-[800px] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border-default bg-background shadow-[0_20px_80px_-20px_rgba(249,115,22,0.25)] animate-[scaleIn_220ms_cubic-bezier(0.22,1,0.36,1)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-default px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <h2 className="text-sm font-medium text-foreground">
              {t("bookCallModalTitle")}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("bookCallModalClose")}
            className="rounded-full border border-border-default bg-card p-1.5 text-muted-foreground transition-colors hover:border-orange-500/60 hover:text-orange-400"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Cal.com embed — includes its own loading spinner.
            Force ltr on the wrapper so our RTL layout doesn't mirror
            Cal's internal layout (Cal handles its own RTL internally). */}
        <div dir="ltr" style={{ flex: 1, overflow: "hidden", display: "flex" }}>
          <Cal
            calLink={calLink}
            config={{
              theme: "dark",
              hideEventTypeDetails: "false",
            }}
            style={{ width: "100%", height: "100%", flex: 1, overflow: "auto" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn {
          from { opacity: 0; transform: translateY(8px) scale(0.98) }
          to   { opacity: 1; transform: translateY(0) scale(1) }
        }
      `}</style>
    </div>,
    document.body,
  );
}

/** Hook to open the booking modal from anywhere in the tree. */
export function useBookCall() {
  const ctx = useContext(BookCallContext);
  if (!ctx)
    throw new Error("useBookCall must be used inside <BookCallProvider>");
  return ctx;
}

/* ---------------- Trigger button variants ---------------- */

export function BookCallButton({
  variant = "primary",
  className = "",
  children = "Book a call",
}: {
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  children?: React.ReactNode;
}) {
  const { open } = useBookCall();

  const variants: Record<string, string> = {
    primary:
      "rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-neutral-950 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_30px_-6px_rgba(249,115,22,0.55)] hover:bg-orange-400 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_12px_40px_-6px_rgba(249,115,22,0.7)]",
    outline:
      "rounded-full border border-border-strong bg-card/60 px-4 py-2 text-sm font-medium text-foreground hover:border-orange-500/60 hover:text-orange-400",
    ghost: "text-sm text-muted-foreground hover:text-orange-400",
  };

  return (
    <button
      type="button"
      onClick={open}
      className={`group inline-flex items-center gap-2 transition-all duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

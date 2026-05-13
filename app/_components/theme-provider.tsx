"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type React from "react";

type ResolvedTheme = "light" | "dark";
type Theme = ResolvedTheme | "system";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (t: Theme) => void;
}

const ThemeCtx = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "theme";

function getSystemPref(): ResolvedTheme {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolve(t: Theme): ResolvedTheme {
  return t === "system" ? getSystemPref() : t;
}

function applyTheme(resolved: ResolvedTheme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
  // Keep a cookie so the server can pre-apply the class on next visit.
  try {
    document.cookie = `${STORAGE_KEY}=${resolved};path=/;max-age=31536000;SameSite=Lax`;
  } catch {}
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("dark");

  useEffect(() => {
    // The beforeInteractive script already applied the class, so we just sync
    // React state with what's actually in the DOM / localStorage.
    let stored: Theme;
    try {
      stored = (localStorage.getItem(STORAGE_KEY) as Theme) ?? "dark";
    } catch {
      stored = "dark";
    }
    const resolved = resolve(stored);
    setThemeState(stored);
    setResolvedTheme(resolved);
    applyTheme(resolved);

    // React to system preference changes when theme is "system".
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      let current: Theme;
      try {
        current = (localStorage.getItem(STORAGE_KEY) as Theme) ?? "dark";
      } catch {
        current = "dark";
      }
      if (current === "system") {
        const r = mq.matches ? "dark" : "light";
        setResolvedTheme(r);
        applyTheme(r);
      }
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {}
    const resolved = resolve(t);
    setResolvedTheme(resolved);
    applyTheme(resolved);
  }, []);

  return (
    <ThemeCtx.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}

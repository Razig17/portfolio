"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Subtle custom cursor: a small dot that follows precisely + a softer ring
 * that lags behind. Scales up over interactive elements (a, button, [role=button]).
 * Hidden on touch devices and respects prefers-reduced-motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fineMQ = window.matchMedia("(pointer: fine)");
    const reducedMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fineMQ.matches || reducedMQ.matches) return;
    setEnabled(true);

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;
    let firstMove = true;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (firstMove) {
        ringX = mouseX;
        ringY = mouseY;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        firstMove = false;
      }
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]',
      );
      ring.dataset.hover = interactive ? "true" : "false";
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onEnter = () => {
      if (firstMove) return;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };
    const onDown = () => {
      ring.dataset.down = "true";
    };
    const onUp = () => {
      ring.dataset.down = "false";
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-orange-500 opacity-0 transition-opacity duration-200 will-change-transform"
        style={{ mixBlendMode: "difference" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        data-hover="false"
        data-down="false"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8 rounded-full border border-orange-500/50 opacity-0 transition-[width,height,opacity,background-color,border-color] duration-200 will-change-transform data-[hover=true]:h-12 data-[hover=true]:w-12 data-[hover=true]:border-orange-500/80 data-[hover=true]:bg-orange-500/10 data-[down=true]:scale-90"
      />
    </>
  );
}

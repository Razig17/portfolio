"use client";

import {
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * SpotlightCard — a wrapper that renders a soft orange radial gradient that
 * follows the cursor on hover. Pure CSS via custom properties; respects
 * prefers-reduced-motion globally via globals.css.
 */
export function SpotlightCard({
  as: Tag = "div",
  className = "",
  children,
  style,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const Component = Tag as ElementType;
  return (
    <Component
      ref={ref}
      onMouseMove={onMouseMove}
      style={style}
      className={`spotlight relative ${className}`}
    >
      {children}
    </Component>
  );
}

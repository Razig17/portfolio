"use client";

import dynamic from "next/dynamic";

// Defer custom cursor: pointer-fine only, never affects LCP/CLS, so we can
// load it after hydration to keep it off the critical path.
const CustomCursor = dynamic(
  () => import("./custom-cursor").then((m) => m.CustomCursor),
  { ssr: false },
);

export function CustomCursorMount() {
  return <CustomCursor />;
}

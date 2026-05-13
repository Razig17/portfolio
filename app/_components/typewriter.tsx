"use client";

import { useEffect, useState } from "react";

type TypewriterProps = {
  /** Phrases to cycle through. */
  phrases: string[];
  /** ms between typed characters */
  typeSpeed?: number;
  /** ms between deleted characters */
  deleteSpeed?: number;
  /** ms to pause when a phrase is fully typed */
  holdMs?: number;
  className?: string;
};

/**
 * Typewriter effect that cycles through phrases. Renders the current phrase
 * with a blinking caret. Server-renders the first phrase to avoid CLS.
 */
export function Typewriter({
  phrases,
  typeSpeed = 60,
  deleteSpeed = 35,
  holdMs = 1600,
  className = "",
}: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(phrases[0] ?? "");
  const [phase, setPhase] = useState<"hold" | "delete" | "type">("hold");

  useEffect(() => {
    if (phrases.length <= 1) return;
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "hold") {
      timer = setTimeout(() => setPhase("delete"), holdMs);
    } else if (phase === "delete") {
      if (text.length === 0) {
        const next = (index + 1) % phrases.length;
        setIndex(next);
        setPhase("type");
      } else {
        timer = setTimeout(() => setText((t) => t.slice(0, -1)), deleteSpeed);
      }
    } else if (phase === "type") {
      const target = phrases[index];
      if (text === target) {
        setPhase("hold");
      } else {
        timer = setTimeout(
          () => setText(target.slice(0, text.length + 1)),
          typeSpeed,
        );
      }
    }
    return () => clearTimeout(timer);
  }, [phase, text, index, phrases, typeSpeed, deleteSpeed, holdMs]);

  return (
    <span className={`relative inline-grid align-baseline ${className}`}>
      {/* Invisible ghost: reserves width of the visually-widest phrase so the
          headline never reflows as text changes length. We render every phrase
          and let the grid pick the max width. */}
      {phrases.map((p, i) => (
        <span
          key={i}
          aria-hidden
          className="invisible col-start-1 row-start-1 whitespace-nowrap"
        >
          {p}
        </span>
      ))}
      <span className="col-start-1 row-start-1 whitespace-nowrap bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
        {text}
        <span
          aria-hidden
          className="ml-0.5 inline-block h-[0.9em] w-[3px] -mb-[0.1em] animate-[blink_1s_steps(2,start)_infinite] bg-orange-500 align-middle"
        />
      </span>
    </span>
  );
}

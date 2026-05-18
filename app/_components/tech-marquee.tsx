import { TechIcon } from "./tech-icon";

type Props = {
  items: string[];
  /** Speed in seconds for one full loop */
  duration?: number;
  className?: string;
};

/**
 * Infinite horizontal marquee that loops a list of tech icons.
 * Pure CSS animation, paused on hover, fades on edges.
 */
export function TechMarquee({ items, duration = 30, className = "" }: Props) {
  const loop = [...items, ...items]; // duplicate for seamless loop
  return (
    <div
      dir="ltr"
      className={`group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className}`}
    >
      <div
        dir="ltr"
        className="flex w-max animate-[marquee_var(--marquee-duration)_linear_infinite] items-center gap-12 group-hover:[animation-play-state:paused]"
        style={
          { ["--marquee-duration"]: `${duration}s` } as React.CSSProperties
        }
      >
        {loop.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex shrink-0 items-center gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <TechIcon name={name} size="lg" />
            <span className="text-sm font-medium">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

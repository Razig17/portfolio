/**
 * Tech name → devicon class mapping.
 * Devicon class format: "devicon-<slug>-plain" or "devicon-<slug>-original".
 * Use "colored" suffix to keep brand colors.
 */
const ICON_MAP: Record<string, string> = {
  // Languages
  typescript: "devicon-typescript-plain colored",
  javascript: "devicon-javascript-plain colored",
  python: "devicon-python-plain colored",
  c: "devicon-c-plain colored",

  // Frontend
  "next.js": "devicon-nextjs-plain",
  nextjs: "devicon-nextjs-plain",
  react: "devicon-react-original colored",
  tailwindcss: "devicon-tailwindcss-plain colored",
  tailwind: "devicon-tailwindcss-plain colored",

  // Backend
  nestjs: "devicon-nestjs-plain colored",
  django: "devicon-django-plain",
  "node.js": "devicon-nodejs-plain colored",
  nodejs: "devicon-nodejs-plain colored",
  strapi: "devicon-strapi-original colored",
  express: "devicon-express-original",

  // DBs
  postgresql: "devicon-postgresql-plain colored",
  postgres: "devicon-postgresql-plain colored",
  mongodb: "devicon-mongodb-plain colored",
  redis: "devicon-redis-plain colored",
  mysql: "devicon-mysql-plain colored",

  // Cloud / infra
  aws: "devicon-amazonwebservices-plain-wordmark colored",
  "oracle cloud": "devicon-oracle-original colored",
  oci: "devicon-oracle-original colored",
  oracle: "devicon-oracle-original colored",
  docker: "devicon-docker-plain colored",
  kubernetes: "devicon-kubernetes-plain colored",
  nginx: "devicon-nginx-original colored",
  linux: "devicon-linux-plain colored",
  ubuntu: "devicon-ubuntu-plain colored",

  // CI/CD & tools
  "github actions": "devicon-githubactions-plain colored",
  jenkins: "devicon-jenkins-line colored",
  github: "devicon-github-original",
  git: "devicon-git-plain colored",
};

/** Returns the devicon class for a tech name, or null if unmapped. */
export function getTechIcon(name: string): string | null {
  const key = name.toLowerCase().trim();
  return ICON_MAP[key] ?? null;
}

type TechIconProps = {
  name: string;
  className?: string;
  /** Show text label after the icon */
  showLabel?: boolean;
  /** Size in tailwind text class (controls icon size) */
  size?: "sm" | "md" | "lg" | "xl";
};

const SIZE_CLASS: Record<NonNullable<TechIconProps["size"]>, string> = {
  sm: "text-base", // 16px
  md: "text-2xl", // 24px
  lg: "text-3xl", // 30px
  xl: "text-5xl", // 48px
};

/**
 * Renders a colored devicon for a tech name. Falls back to a styled text
 * pill if the icon isn't in the map.
 */
export function TechIcon({
  name,
  className = "",
  showLabel = false,
  size = "md",
}: TechIconProps) {
  const iconClass = getTechIcon(name);
  const sizeClass = SIZE_CLASS[size];

  if (!iconClass) {
    return (
      <span
        className={`inline-flex items-center rounded-full border border-border-default bg-card/60 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground ${className}`}
        title={name}
      >
        {name}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
      title={name}
    >
      <i
        className={`${iconClass} ${sizeClass} leading-none`}
        aria-label={name}
      />
      {showLabel && (
        <span className="text-sm text-muted-foreground">{name}</span>
      )}
    </span>
  );
}

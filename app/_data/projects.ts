export type Project = {
  slug: string;
  title: string;
  status?: string;
  year: string;
  role: string;
  client?: string;
  liveUrl?: string;
  coverImage?: string;
  tags: string[];
  /** 1-line teaser for cards */
  summary: string;
  /** 2–3 paragraphs of context */
  challenge: string[];
  /** 2–3 paragraphs of architecture / approach */
  solution: string[];
  /** Tech stack chips (full list) */
  stack: string[];
  /** Headline outcomes/metrics */
  outcomes: { value: string; label: string }[];
};

export const projects: Project[] = [
  {
    slug: "saeerha",
    title: "Saeerha",
    status: "Live",
    year: "2025",
    role: "Backend Support Engineer",
    client: "Saeerha",
    coverImage: "/works/sarha.webp",
    tags: ["Django", "Next.js", "Performance"],
    summary:
      "Improved a photo-based product pricing platform by overhauling the core pricing algorithm and cutting notification latency by over 90%.",
    challenge: [
      "Saeerha lets users photograph a product and instantly receive its price. The core pricing algorithm was too slow and expensive to run at scale, hurting both response times and operating costs.",
      "Push notifications were also sluggish — a critical issue for a product where the whole value proposition is instant answers. The client needed speed without sacrificing a moderate level of accuracy.",
    ],
    solution: [
      "Refactored the pricing algorithm to be faster and cheaper to execute while keeping accuracy within the threshold the client defined as acceptable. This involved profiling the hot paths and replacing expensive operations with lighter-weight equivalents.",
      "Redesigned the notification pipeline, eliminating the bottlenecks that were adding latency. The result was a notification delivery time reduced by more than 90%.",
    ],
    stack: ["Django", "Next.js", "React", "PostgreSQL"],
    outcomes: [
      { value: ">90%", label: "Notification speed-up" },
      { value: "Lower", label: "Algorithm cost" },
      { value: "Live", label: "In production" },
    ],
  },
  {
    slug: "secure-payment-tracker",
    title: "Secure Payment Tracker",
    year: "2025",
    role: "Full-Stack Engineer",
    client: "QAST",
    coverImage: "/works/payment.png",
    tags: ["NestJS", "Next.js", "OCI"],
    summary:
      "Built a payment-stage tracking dashboard for QAST that replaced a fragile Excel-based workflow with a structured, cloud-deployed system.",
    challenge: [
      "QAST's finance team was tracking client payments in Excel spreadsheets. As the number of clients grew, keeping track of which payments were at which stage — purchase order issued, invoice sent, partially paid, fully paid — became error-prone and hard to audit.",
      "The team needed a clear, shared view of every payment's lifecycle so nothing slipped through the cracks.",
    ],
    solution: [
      "Designed the payment stage model — mapping out each state in the lifecycle and the valid transitions between them — then built the backend API in NestJS with PostgreSQL to persist and enforce those states.",
      "Built the front-end dashboard in Next.js so the team could view, filter, and update payment records in one place. Deployed the full stack on OCI.",
    ],
    stack: ["NestJS", "Next.js", "PostgreSQL", "OCI", "TypeScript"],
    outcomes: [
      { value: "Replaced", label: "Excel workflow" },
      { value: "Structured", label: "Payment lifecycle" },
      { value: "OCI", label: "Cloud deployed" },
    ],
  },
  {
    slug: "bdg-qast-platforms",
    title: "BDG & QAST Corporate Platforms",
    year: "2025",
    role: "Full-Stack Engineer",
    coverImage: "/works/BDG.webp",
    tags: ["Next.js", "Strapi", "OCI"],
    summary:
      "Built the corporate websites for BDG and QAST — including job application flows — using Next.js and Strapi so non-technical staff can manage content independently.",
    challenge: [
      "Both companies needed public-facing websites that presented the company, listed open roles, and accepted job applications. The key requirement was that non-technical staff should be able to update content — news, job listings, team members — without needing a developer.",
      "Choosing the right CMS was the central architectural decision: it had to be easy for editors to use, flexible enough to model different content types, and self-hostable on OCI.",
    ],
    solution: [
      "Selected Strapi as the headless CMS after evaluating the options. Its admin panel is intuitive for non-technical users, its content types are flexible, and it can be self-hosted on any server.",
      "Built the front-end for both sites in Next.js, consuming Strapi's REST API. Deployed everything on OCI, giving both companies full ownership of their data and infrastructure.",
    ],
    stack: ["Next.js", "Strapi", "PostgreSQL", "OCI", "TypeScript"],
    outcomes: [
      { value: "2 sites", label: "Delivered" },
      { value: "Self-hosted", label: "CMS on OCI" },
      { value: "No-code", label: "Content updates" },
    ],
  },
  {
    slug: "automated-pricing-engine",
    title: "Automated Competitor Pricing Engine",
    status: "PoC",
    year: "2025",
    role: "Automation Engineer",
    coverImage: "/works/N8n-logo-new.svg.webp",
    tags: ["n8n", "API Integration", "Workflow Automation"],
    summary:
      "Built a proof-of-concept n8n workflow that automatically searches the web and scrapes competitor prices for any given product.",
    challenge: [
      "A client wanted to stop manually checking competitor prices and instead have a system that could do it automatically on demand. The core difficulty is that searching Google and scraping e-commerce sites reliably at scale is notoriously hard — sites block bots, layouts change, and results are inconsistent.",
    ],
    solution: [
      "Rather than building fragile scrapers from scratch, I integrated third-party APIs that are purpose-built for web search and e-commerce data extraction. This gave the workflow reliable, structured data without the maintenance burden of custom scrapers.",
      "Assembled the full flow in n8n: product search → competitor price lookup via APIs → result aggregation → output to the client. Delivered as a working PoC the client could evaluate and extend.",
    ],
    stack: ["n8n", "Third-party APIs", "JSON", "Webhooks"],
    outcomes: [
      { value: "PoC", label: "Delivered" },
      { value: "API-first", label: "Reliable data" },
      { value: "Extensible", label: "n8n workflow" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

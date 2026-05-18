/**
 * Central site config — single source of truth for personal details, links,
 * and external services. Update values here when you have real ones.
 */

export const siteConfig = {
  name: "Abdelrazig Sharif",
  fullName: "Abdelrazig Mohamed Sharif",
  role: "DevOps & Backend Engineer",
  roleAr: "مهندس DevOps وبنية سحابية",
  location: "Riyadh, Saudi Arabia",
  locationAr: "الرياض، المملكة العربية السعودية",
  email: "Abdelrazig.sharif1@gmail.com",
  url: "https://abdelrazig.me",
  description:
    "Scalable backend systems, cloud architecture on AWS & OCI, and applied AI research. Based in Riyadh, available for freelance & full-time.",
  descriptionAr:
    "أنظمة خلفية قابلة للتوسع، بنية سحابية على AWS و OCI، وأبحاث ذكاء اصطناعي تطبيقي. مقيم في الرياض، متاح للعمل الحر والدوام الكامل.",

  links: {
    linkedin: "https://www.linkedin.com/in/abdelrazig-sharif",
    github: "https://github.com/Razig17",
    cv: "/abdelrazig-sharif-cv.pdf",
    whatsapp: "https://wa.me/966502862410",
  },

  // Cal.com booking — placeholder username, swap with real one when ready
  calcom: {
    username: "abdelrazig",
    eventSlug: "30min", // Cal.com default; change to your event slug
  },

  keywords: [
    "Cloud-Native Backend Engineer",
    "Full Stack Developer",
    "Software Engineer",
    "OCI Architect",
    "AWS",
    "Oracle Cloud",
    "NestJS",
    "Next.js",
    "DevOps",
    "MENA",
    "Saudi Arabia",
    "Riyadh",
    "Digital Transformation",
    "Enterprise Solutions",
  ],
  keywordsAr: [
    "مهندس نظم سحابية",
    "مطور فل ستاك",
    "مهندس برمجيات",
    "مطور برمجيات",
    "حلول تقنية للمؤسسات",
    "التحول الرقمي في السعودية",
    "تطوير برمجيات للشركات السعودية",
    "بنية تحتية رقمية",
    "خدمات سحابية في الرياض",
    "تكامل الذكاء الاصطناعي",
    "أتمتة DevOps",
    "استشارات تقنية المعلومات",
    "تطوير واجهات برمجية API",
    "Oracle Cloud السعودية",
    "AWS المملكة العربية السعودية",
    "خدمات تقنية للمؤسسات السعودية",
    "حلول الأعمال الرقمية",
    "دعم التحول الرقمي",
  ],
};

export type SiteConfig = typeof siteConfig;

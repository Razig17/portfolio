/**
 * Central site config — single source of truth for personal details, links,
 * and external services. Update values here when you have real ones.
 */

export const siteConfig = {
  name: "Abdelrazig Sharif",
  fullName: "Abdelrazig Mohamed Sharif",
  role: "Cloud-Native Backend Engineer, Full Stack & Software Engineer, OCI Architect",
  roleAr:
    "مهندس نظم سحابية، مطور برمجيات، مهندس برمجيات، مطور فل ستاك، وخبير حلول تقنية للمؤسسات السعودية",
  location: "Riyadh, Saudi Arabia",
  locationAr: "الرياض، المملكة العربية السعودية",
  email: "Abdelrazig.sharif1@gmail.com",
  url: "https://abdelrazig.me",
  description:
    "I architect scalable backends, build robust cloud infrastructure, and deliver full stack and software engineering solutions. Bridging API development, secure cloud, and applied AI research.",
  descriptionAr:
    "خبير في تطوير الأنظمة السحابية، البنية التحتية الرقمية، هندسة البرمجيات، وتطوير الفل ستاك للشركات السعودية. متخصص في بناء واجهات برمجية قوية، أتمتة DevOps، وتكامل الذكاء الاصطناعي لخدمة الأعمال في المملكة.",

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

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all paths except API/static/Next internals, files with extensions,
  // and Next.js image convention routes (opengraph-image, twitter-image, icon, sitemap, robots).
  matcher: [
    "/((?!api|_next|_vercel|opengraph-image|twitter-image|icon|sitemap\\.xml|robots\\.txt|.*\\..*).*)",
  ],
};

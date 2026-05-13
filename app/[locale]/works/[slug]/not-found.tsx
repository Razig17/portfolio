import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="flex max-w-md flex-col items-start gap-4 px-6 text-left">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-orange-400">
          404
        </span>
        <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("body")}</p>
        <Link
          href="/#works"
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition-all hover:bg-orange-400"
        >
          {t("back")}
        </Link>
      </div>
    </div>
  );
}

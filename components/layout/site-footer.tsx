"use client";

import Link from "next/link";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import { site, telLink, whatsappLink } from "@/lib/site-config";
import { useT } from "@/lib/i18n/use-t";

/** Warm, helpful footer. Phone and WhatsApp are the largest items. */
export function SiteFooter() {
  const { t } = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-border bg-muted/50">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground">
              <span
                aria-hidden
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground"
              >
                🚗
              </span>
              {site.name}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {site.description}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {t.footer.needHelp}
            </p>
            <div className="mt-3 flex flex-col gap-3">
              <a
                href={telLink()}
                className="inline-flex items-center gap-3 rounded-2xl bg-card px-4 py-3 text-base font-semibold text-foreground shadow-sm ring-1 ring-border transition-transform hover:-translate-y-0.5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone className="h-4 w-4" aria-hidden />
                </span>
                {site.phoneDisplay}
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-2xl bg-card px-4 py-3 text-base font-semibold text-foreground shadow-sm ring-1 ring-border transition-transform hover:-translate-y-0.5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                  <MessageCircle className="h-4 w-4" aria-hidden />
                </span>
                {t.footer.whatsappCta}
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {t.footer.findUs}
            </p>
            <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              {t.footer.findUsCopy}
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <Link href="/fleet" className="hover:text-foreground">
                {t.footer.linkCars}
              </Link>
              <Link href="/dashboard" className="hover:text-foreground">
                {t.footer.linkTrips}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {year} {site.name} · {t.footer.legal}
      </div>
    </footer>
  );
}

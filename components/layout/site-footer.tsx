"use client";

import Link from "next/link";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import { site, telLink, whatsappLink } from "@/lib/site-config";
import { useT } from "@/lib/i18n/use-t";

const CITIES = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Fès",
  "Tanger",
  "Agadir",
  "Tétouan",
  "Essaouira",
  "El Jadida",
  "Oujda",
  "Meknès",
  "Chefchaouen",
];

/**
 * Editorial footer — opens with a wordmark + city marquee, then settles into
 * a three-column layout with phone / WhatsApp as the primary actions.
 */
export function SiteFooter() {
  const { t } = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16 border-t border-border bg-background-soft/60">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />

      {/* City marquee */}
      <div className="relative overflow-hidden border-b border-border/60 py-6">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap text-[clamp(1.25rem,3vw,2rem)] font-display italic text-foreground/30">
          {[...CITIES, ...CITIES].map((c, i) => (
            <span key={`${c}-${i}`} className="inline-flex items-center gap-8">
              {c}
              <span aria-hidden className="text-primary">
                ✦
              </span>
            </span>
          ))}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 start-0 w-24 bg-gradient-to-e from-background-soft to-transparent"
          style={{
            background:
              "linear-gradient(to right, var(--background-soft), transparent)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 end-0 w-24"
          style={{
            background:
              "linear-gradient(to left, var(--background-soft), transparent)",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="flex items-center gap-2.5 text-lg tracking-tight text-foreground">
              <span
                aria-hidden
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-soft font-display italic text-primary-foreground shadow-md shadow-primary/30 ring-1 ring-primary/30"
              >
                m
              </span>
              <span className="font-semibold">
                {site.name.split(" ")[0]}{" "}
                <span className="font-display italic font-normal text-primary">
                  {site.name.split(" ").slice(1).join(" ")}
                </span>
              </span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {site.description}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {t.footer.needHelp}
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={telLink()}
                className="group inline-flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-base font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-border-strong hover:shadow-md"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-accent/15 text-primary ring-1 ring-primary/15">
                  <Phone className="h-4 w-4" aria-hidden />
                </span>
                <span className="tabular-nums">{site.phoneDisplay}</span>
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-base font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-border-strong hover:shadow-md"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/12 text-emerald-600 ring-1 ring-emerald-500/15 dark:text-emerald-400">
                  <MessageCircle className="h-4 w-4" aria-hidden />
                </span>
                {t.footer.whatsappCta}
              </a>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {t.footer.findUs}
            </p>
            <p className="mt-4 flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                aria-hidden
              />
              {t.footer.findUsCopy}
            </p>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <Link
                href="/fleet"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {t.footer.linkCars}
              </Link>
              <Link
                href="/dashboard"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
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

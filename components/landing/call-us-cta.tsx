"use client";

import { Phone, MessageCircle } from "lucide-react";
import { site, telLink, whatsappLink } from "@/lib/site-config";
import { useT } from "@/lib/i18n/use-t";

export function CallUsCta() {
  const { t } = useT();
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-ink p-8 shadow-2xl shadow-foreground/15 ring-1 ring-foreground/5 sm:p-12 lg:p-14">
        {/* Halos */}
        <div
          aria-hidden
          className="pointer-events-none absolute -end-16 -top-20 h-72 w-72 rounded-full bg-primary/35 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -start-12 -bottom-16 h-72 w-72 rounded-full bg-accent/25 blur-3xl"
        />
        {/* Faint grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-soft">
              {t.cta.eyebrow}
            </p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.04] tracking-tight text-ink-foreground">
              {t.cta.title.replace("☎️", "").trim()}{" "}
              <span className="font-display italic font-normal text-accent-soft">
                ☎️
              </span>
            </h2>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ink-muted">
              {t.cta.subtitle}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <a
              href={telLink()}
              className="group inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-base font-semibold text-foreground shadow-lg shadow-black/20 transition-transform hover:-translate-y-0.5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/12 text-primary">
                <Phone className="h-4 w-4" aria-hidden />
              </span>
              <span>
                {t.cta.call}{" "}
                <span className="tabular-nums">{site.phoneDisplay}</span>
              </span>
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white/8 px-6 py-4 text-base font-semibold text-ink-foreground ring-1 ring-white/15 backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/12"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                <MessageCircle className="h-4 w-4" aria-hidden />
              </span>
              {t.cta.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

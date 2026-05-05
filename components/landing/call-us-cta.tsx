"use client";

import { Phone, MessageCircle } from "lucide-react";
import { site, telLink, whatsappLink } from "@/lib/site-config";
import { useT } from "@/lib/i18n/use-t";

export function CallUsCta() {
  const { t } = useT();
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-primary to-accent p-8 text-primary-foreground shadow-xl shadow-primary/20 sm:p-12">
        <div
          aria-hidden
          className="absolute -end-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        />
        <div className="relative grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-90">
              {t.cta.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.cta.title}
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed opacity-90">
              {t.cta.subtitle}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <a
              href={telLink()}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-base font-semibold text-primary shadow-md transition-transform hover:-translate-y-0.5"
            >
              <Phone className="h-5 w-5" aria-hidden />
              {t.cta.call} {site.phoneDisplay}
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-black/20 px-6 py-4 text-base font-semibold text-white ring-1 ring-white/20 backdrop-blur transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              {t.cta.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Quote, Star } from "lucide-react";
import { useT } from "@/lib/i18n/use-t";

const EMOJIS = ["👩", "🧔", "👩‍🦱"] as const;

export function Testimonials() {
  const { t } = useT();

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow justify-center">{t.testimonials.eyebrow}</p>
        <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight text-foreground">
          {(() => {
            const parts = t.testimonials.title.split(" ");
            const last = parts.pop() ?? "";
            return (
              <>
                {parts.join(" ")}{" "}
                <span className="font-display italic font-normal text-flame">
                  {last}
                </span>
              </>
            );
          })()}
        </h2>
      </div>

      <ul className="mt-14 grid gap-6 stagger md:grid-cols-3">
        {t.testimonials.items.map((review, idx) => (
          <li
            key={review.name}
            className="surface-card group relative flex flex-col gap-4 p-7 transition-all hover:-translate-y-1 hover:border-border-strong"
          >
            <Quote
              className="absolute end-6 top-6 h-10 w-10 text-primary/15 transition-colors group-hover:text-primary/30"
              aria-hidden
              strokeWidth={1.4}
            />

            <div className="flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
              ))}
            </div>

            <p className="text-[16px] leading-relaxed text-foreground">
              <span className="font-display text-2xl italic text-primary/70">
                “
              </span>
              {review.body}
              <span className="font-display text-2xl italic text-primary/70">
                ”
              </span>
            </p>

            <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
              <span
                aria-hidden
                className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary/12 to-accent/15 text-xl ring-1 ring-primary/15"
              >
                {EMOJIS[idx] ?? "🙂"}
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {review.name}
                </p>
                <p className="text-xs text-muted-foreground">{review.city}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

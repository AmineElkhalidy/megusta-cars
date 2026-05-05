"use client";

import { Star } from "lucide-react";
import { useT } from "@/lib/i18n/use-t";

const EMOJIS = ["👩", "🧔", "👩‍🦱"] as const;

export function Testimonials() {
  const { t } = useT();

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {t.testimonials.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {t.testimonials.title}
        </h2>
      </div>

      <ul className="mt-12 grid gap-5 md:grid-cols-3">
        {t.testimonials.items.map((review, idx) => (
          <li
            key={review.name}
            className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="flex items-center gap-1 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
              ))}
            </div>
            <p className="text-[15px] leading-relaxed text-foreground">
              “{review.body}”
            </p>
            <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
              <span
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xl"
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

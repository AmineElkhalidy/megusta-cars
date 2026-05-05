"use client";

import { useT } from "@/lib/i18n/use-t";

/**
 * Editorial stats band — deep ink background with warm radial highlights and
 * vertical dividers between values. Replaces the flat orange ribbon for a
 * more confident, magazine-style feel.
 */
export function StatsBand() {
  const { t } = useT();
  return (
    <section className="relative isolate overflow-hidden">
      <div className="bg-ink relative">
        {/* Decorative glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_15%_120%,color-mix(in_oklab,var(--primary)_30%,transparent),transparent_55%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_85%_-20%,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_55%)]"
        />
        {/* Soft grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--ink-foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--ink-foreground) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-4 py-16 sm:grid-cols-4 sm:px-6 lg:px-8 lg:py-20">
          {t.stats.items.map((s, i) => (
            <div
              key={s.label}
              className={`relative px-2 text-center sm:px-6 ${
                i > 0 ? "sm:border-s sm:border-ink-foreground/10" : ""
              }`}
            >
              <p className="font-display text-[clamp(2.5rem,5vw,4rem)] italic leading-none tracking-tight text-ink-foreground">
                {s.value}
              </p>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

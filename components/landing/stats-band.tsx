"use client";

import { useT } from "@/lib/i18n/use-t";

export function StatsBand() {
  const { t } = useT();
  return (
    <section className="relative overflow-hidden border-y border-border bg-primary text-primary-foreground">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_0%_0%,rgba(255,255,255,0.18),transparent_50%)]"
      />
      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-4 py-12 text-center sm:grid-cols-4 sm:px-6 lg:px-8 lg:py-16">
        {t.stats.items.map((s) => (
          <div key={s.label}>
            <p className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {s.value}
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] opacity-85">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useT } from "@/lib/i18n/use-t";

const EMOJIS = ["📅", "🚗", "🗝️"] as const;

export function HowItWorks() {
  const { t } = useT();
  return (
    <section
      id="how-it-works"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {t.steps.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {t.steps.title}
        </h2>
        <p className="mt-4 text-[17px] text-muted-foreground">
          {t.steps.subtitle}
        </p>
      </div>

      <ol className="relative mt-14 grid gap-6 sm:grid-cols-3">
        <div
          aria-hidden
          className="absolute start-[12%] end-[12%] top-[3.25rem] hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent sm:block"
        />

        {t.steps.items.map((step, index) => (
          <li
            key={step.title}
            className="relative rounded-3xl border border-border bg-card p-7 text-center shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-3xl">
              <span aria-hidden>{EMOJIS[index]}</span>
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {t.steps.stepLabel} {index + 1}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-foreground">
              {step.title}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

"use client";

import { CalendarHeart, CarFront, KeyRound, type LucideIcon } from "lucide-react";
import { useT } from "@/lib/i18n/use-t";

const ICONS: LucideIcon[] = [CalendarHeart, CarFront, KeyRound];

export function HowItWorks() {
  const { t } = useT();
  return (
    <section
      id="how-it-works"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-64 bg-dots opacity-30"
      />
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow justify-center">{t.steps.eyebrow}</p>
        <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight text-foreground">
          {t.steps.title.split(".")[0]}
          <span className="font-display italic font-normal text-flame">
            .
          </span>{" "}
          <span className="font-display italic font-normal text-flame">
            {t.steps.title.split(".")[1]?.trim() || ""}
          </span>
        </h2>
        <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">
          {t.steps.subtitle}
        </p>
      </div>

      <ol className="relative mt-14 grid gap-6 stagger sm:grid-cols-3">
        <div
          aria-hidden
          className="absolute start-[15%] end-[15%] top-[3.75rem] hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent sm:block"
        />

        {t.steps.items.map((step, index) => {
          const Icon = ICONS[index] ?? CarFront;
          return (
            <li
              key={step.title}
              className="surface-card group relative p-7 text-center transition-all hover:-translate-y-1.5 hover:border-border-strong"
            >
              {/* Soft hover spotlight */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 opacity-0 transition-opacity group-hover:from-primary/4 group-hover:to-accent/4 group-hover:opacity-100"
              />
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/15 ring-1 ring-primary/15 text-primary">
                <Icon className="h-7 w-7" aria-hidden strokeWidth={1.6} />
                <span
                  aria-hidden
                  className="absolute -end-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-soft font-display text-sm italic text-primary-foreground shadow-md shadow-primary/30 ring-2 ring-background"
                >
                  {index + 1}
                </span>
              </div>
              <p className="relative mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                {t.steps.stepLabel} {index + 1}
              </p>
              <h3 className="relative mt-2 text-xl font-semibold tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="relative mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

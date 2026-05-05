"use client";

import { CarFront, SlidersHorizontal } from "lucide-react";
import { useT } from "@/lib/i18n/use-t";

type FleetHeaderProps = {
  count: number;
};

export function FleetHeader({ count }: FleetHeaderProps) {
  const { t } = useT();
  return (
    <div className="mb-10 animate-fade-up">
      <p className="eyebrow">{t.cars.stepLabel}</p>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-[clamp(2.25rem,4.5vw,3.5rem)] font-semibold leading-[1.04] tracking-tight text-foreground">
          {t.cars.title.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="font-display italic font-normal text-flame">
            {t.cars.title.split(" ").slice(-1)}
          </span>
        </h1>
        <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-card/80 px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur">
          <SlidersHorizontal className="h-3.5 w-3.5 text-primary" aria-hidden />
          {t.cars.countAvailable(count)}
        </span>
      </div>
    </div>
  );
}

export function FleetEmptyState() {
  const { t } = useT();
  return (
    <div className="surface-card flex flex-col items-center justify-center border-dashed p-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/12 to-accent/15 text-primary ring-1 ring-primary/15">
        <CarFront className="h-6 w-6" aria-hidden />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-foreground">
        {t.cars.emptyTitle}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {t.cars.emptySubtitle}
      </p>
    </div>
  );
}

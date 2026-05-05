"use client";

import { CarFront } from "lucide-react";
import { useT } from "@/lib/i18n/use-t";

type FleetHeaderProps = {
  count: number;
};

/** Translated headline above the filter bar. Client-only so it can read locale. */
export function FleetHeader({ count }: FleetHeaderProps) {
  const { t } = useT();
  return (
    <div className="mb-8 animate-fade-up">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        {t.cars.stepLabel}
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {t.cars.title}
      </h1>
      <p className="mt-3 text-[15px] text-muted-foreground">
        {t.cars.countAvailable(count)}
      </p>
    </div>
  );
}

export function FleetEmptyState() {
  const { t } = useT();
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-muted/30 p-14 text-center">
      <CarFront className="h-10 w-10 text-muted-foreground" aria-hidden />
      <h3 className="mt-5 text-lg font-semibold text-foreground">
        {t.cars.emptyTitle}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {t.cars.emptySubtitle}
      </p>
    </div>
  );
}

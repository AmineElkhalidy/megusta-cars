"use client";

import Image from "next/image";
import { CheckCircle2, CalendarDays, MapPinned } from "lucide-react";
import type { Car } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/booking-utils";
import { useT } from "@/lib/i18n/use-t";

type CheckoutSummaryProps = {
  car: Car;
  pickup: string;
  dropoff: string;
  from: string;
  to: string;
  days: number;
  total: number;
};

export function CheckoutSummary({
  car,
  pickup,
  dropoff,
  from,
  to,
  days,
  total,
}: CheckoutSummaryProps) {
  const { t } = useT();
  const typeLabel = t.cars.options.type[car.type] ?? car.type;

  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6 lg:p-7">
      <h2 className="text-lg font-semibold text-foreground">
        {t.checkout.summaryTitle}
      </h2>

      <div className="mt-5 flex items-center gap-4 border-b border-border pb-5">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl bg-muted">
          <Image
            src={car.imageUrl}
            alt={`${car.make} ${car.model}`}
            fill
            className="object-cover"
            sizes="112px"
          />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">
            {car.make} {car.model}
          </h3>
          <p className="text-sm text-muted-foreground">{typeLabel} · {car.year}</p>
        </div>
      </div>

      <dl className="mt-5 space-y-4 text-sm">
        <div className="flex items-start gap-3">
          <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
          <div>
            <dt className="font-semibold text-foreground">{t.checkout.datesLabel}</dt>
            <dd className="text-muted-foreground">
              {formatDate(from)} → {formatDate(to)}
            </dd>
            <dd className="text-xs text-muted-foreground">
              {t.checkout.dayCount(days)}
            </dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPinned className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
          <div>
            <dt className="font-semibold text-foreground">
              {t.checkout.locationsLabel}
            </dt>
            <dd className="text-muted-foreground">{pickup}</dd>
            {dropoff !== pickup ? (
              <dd className="text-muted-foreground">
                {t.checkout.returnLabel}: {dropoff}
              </dd>
            ) : null}
          </div>
        </div>
      </dl>

      <div className="mt-6 rounded-2xl bg-muted/70 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {formatCurrency(car.pricePerDay)} × {t.checkout.dayCount(days)}
          </span>
          <span className="font-medium text-foreground">
            {formatCurrency(total)}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
          <span className="text-base font-semibold text-foreground">
            {t.checkout.payLabel}
          </span>
          <span className="text-2xl font-semibold tracking-tight text-foreground">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-700 dark:text-emerald-300">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        <p>{t.checkout.noCardBanner}</p>
      </div>
    </div>
  );
}

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
    <div className="surface-card-elevated relative overflow-hidden p-5 sm:p-6 lg:p-7">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />

      <h2 className="text-lg font-semibold tracking-tight text-foreground">
        {t.checkout.summaryTitle}
      </h2>

      <div className="mt-5 flex items-center gap-4 border-b border-border pb-5">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl bg-muted ring-1 ring-border">
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
            {car.make}{" "}
            <span className="font-display italic font-normal">
              {car.model}
            </span>
          </h3>
          <p className="text-sm text-muted-foreground">
            {typeLabel} · {car.year}
          </p>
        </div>
      </div>

      <dl className="mt-5 space-y-5 text-sm">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
            <CalendarDays className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <dt className="font-semibold text-foreground">
              {t.checkout.datesLabel}
            </dt>
            <dd className="text-muted-foreground">
              {formatDate(from)} → {formatDate(to)}
            </dd>
            <dd className="text-xs text-muted-foreground">
              {t.checkout.dayCount(days)}
            </dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
            <MapPinned className="h-4 w-4" aria-hidden />
          </span>
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

      <div className="mt-6 rounded-2xl border border-border bg-muted/60 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {formatCurrency(car.pricePerDay)} × {t.checkout.dayCount(days)}
          </span>
          <span className="font-medium tabular-nums text-foreground">
            {formatCurrency(total)}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
          <span className="text-base font-semibold text-foreground">
            {t.checkout.payLabel}
          </span>
          <span className="text-2xl font-semibold tracking-tight tabular-nums text-foreground">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-success/20 bg-success/10 p-4 text-sm">
        <CheckCircle2
          className="mt-0.5 h-4 w-4 shrink-0 text-success"
          aria-hidden
        />
        <p className="text-foreground/85">{t.checkout.noCardBanner}</p>
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { CalendarDays, MapPin, Phone, ShieldCheck } from "lucide-react";
import { rentalLocations, site, telLink } from "@/lib/site-config";
import { diffInDays, formatCurrency } from "@/lib/booking-utils";
import { addCalendarDays, formatDateInputValue } from "@/lib/date-utils";
import { useT } from "@/lib/i18n/use-t";

type InlineBookingFormProps = {
  carId: string;
  pricePerDay: number;
  initialPickup?: string;
  initialFrom?: string;
  initialTo?: string;
};

export function InlineBookingForm({
  carId,
  pricePerDay,
  initialPickup,
  initialFrom,
  initialTo,
}: InlineBookingFormProps) {
  const router = useRouter();
  const { t } = useT();
  const today = useMemo(() => formatDateInputValue(new Date()), []);
  const tomorrow = useMemo(
    () => formatDateInputValue(addCalendarDays(new Date(), 3)),
    []
  );

  const [pickup, setPickup] = useState(initialPickup ?? rentalLocations[0]);
  const [from, setFrom] = useState(initialFrom ?? today);
  const [to, setTo] = useState(initialTo ?? tomorrow);

  const days = diffInDays(from, to);
  const total = pricePerDay * days;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams({ pickup, dropoff: pickup, from, to });
    router.push(`/checkout/${carId}?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6"
    >
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-4xl font-semibold tracking-tight text-foreground">
            {formatCurrency(pricePerDay)}
          </p>
          <p className="text-sm text-muted-foreground">{t.carDetails.perDay}</p>
        </div>
        <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
          {t.carDetails.available}
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <label className="flex flex-col gap-2">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" aria-hidden />
            {t.carDetails.bookingWhere}
          </span>
          <select
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="h-14 rounded-2xl border border-border bg-background px-4 text-base font-medium text-foreground outline-none ring-primary/30 focus:ring-2"
          >
            {rentalLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-2">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <CalendarDays className="h-4 w-4 text-primary" aria-hidden />
              {t.carDetails.bookingFrom}
            </span>
            <input
              type="date"
              required
              min={today}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="h-14 rounded-2xl border border-border bg-background px-4 text-base font-medium text-foreground outline-none ring-primary/30 focus:ring-2"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <CalendarDays className="h-4 w-4 text-primary" aria-hidden />
              {t.carDetails.bookingUntil}
            </span>
            <input
              type="date"
              required
              min={from}
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="h-14 rounded-2xl border border-border bg-background px-4 text-base font-medium text-foreground outline-none ring-primary/30 focus:ring-2"
            />
          </label>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-muted/70 p-4 text-sm">
        <div className="flex items-center justify-between text-muted-foreground">
          <span>
            {formatCurrency(pricePerDay)} × {t.carDetails.dayCount(days)}
          </span>
          <span className="font-medium text-foreground">
            {formatCurrency(total)}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-border/60 pt-2 text-base font-semibold text-foreground">
          <span>{t.carDetails.youPay}</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <button
        type="submit"
        className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-transform hover:-translate-y-0.5"
      >
        {t.carDetails.bookThisCar}
      </button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
        {t.carDetails.noCard}
      </p>

      <a
        href={telLink()}
        className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card text-sm font-semibold text-foreground transition-colors hover:bg-muted"
      >
        <Phone className="h-4 w-4" aria-hidden />
        {t.carDetails.orCall} {site.phoneDisplay}
      </a>
    </form>
  );
}

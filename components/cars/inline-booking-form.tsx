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
      className="surface-card-elevated relative overflow-hidden p-5 sm:p-6"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />

      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-[clamp(2rem,4.5vw,2.5rem)] font-semibold tracking-tight text-foreground">
            {formatCurrency(pricePerDay)}
          </p>
          <p className="text-sm text-muted-foreground">{t.carDetails.perDay}</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1.5 text-xs font-semibold text-success ring-1 ring-success/20">
          <span
            aria-hidden
            className="relative flex h-2 w-2 rounded-full bg-success animate-pulse-ring"
          />
          {t.carDetails.available}
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <FieldLabel
          icon={<MapPin className="h-3.5 w-3.5" aria-hidden />}
          label={t.carDetails.bookingWhere}
        >
          <select
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="h-14 w-full rounded-2xl border border-border-strong bg-background px-4 text-base font-semibold text-foreground outline-none transition-shadow focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
          >
            {rentalLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </FieldLabel>

        <div className="grid grid-cols-2 gap-3">
          <FieldLabel
            icon={<CalendarDays className="h-3.5 w-3.5" aria-hidden />}
            label={t.carDetails.bookingFrom}
          >
            <input
              type="date"
              required
              min={today}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="h-14 w-full rounded-2xl border border-border-strong bg-background px-4 text-base font-semibold text-foreground outline-none transition-shadow focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
            />
          </FieldLabel>

          <FieldLabel
            icon={<CalendarDays className="h-3.5 w-3.5" aria-hidden />}
            label={t.carDetails.bookingUntil}
          >
            <input
              type="date"
              required
              min={from}
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="h-14 w-full rounded-2xl border border-border-strong bg-background px-4 text-base font-semibold text-foreground outline-none transition-shadow focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
            />
          </FieldLabel>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-muted/60 p-4 text-sm">
        <div className="flex items-center justify-between text-muted-foreground">
          <span>
            {formatCurrency(pricePerDay)} × {t.carDetails.dayCount(days)}
          </span>
          <span className="font-medium tabular-nums text-foreground">
            {formatCurrency(total)}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3 text-base font-semibold text-foreground">
          <span>{t.carDetails.youPay}</span>
          <span className="text-xl tabular-nums">{formatCurrency(total)}</span>
        </div>
      </div>

      <button type="submit" className="btn-primary mt-5 h-14 w-full text-base">
        {t.carDetails.bookThisCar}
      </button>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5 text-success" aria-hidden />
        {t.carDetails.noCard}
      </p>

      <a
        href={telLink()}
        className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-border-strong bg-card text-sm font-semibold text-foreground transition-colors hover:bg-muted/50"
      >
        <Phone className="h-4 w-4 text-primary" aria-hidden />
        {t.carDetails.orCall} {site.phoneDisplay}
      </a>
    </form>
  );
}

function FieldLabel({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </span>
      {children}
    </label>
  );
}

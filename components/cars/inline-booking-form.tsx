"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { ArrowRight, CalendarDays, MapPinned, ShieldCheck } from "lucide-react";
import { rentalLocations } from "@/lib/site-config";
import { diffInDays, formatCurrency } from "@/lib/booking-utils";
import { addCalendarDays, formatDateInputValue } from "@/lib/date-utils";

type InlineBookingFormProps = {
  carId: string;
  pricePerDay: number;
  initialPickup?: string;
  initialDropoff?: string;
  initialFrom?: string;
  initialTo?: string;
};

/**
 * Sticky booking widget on the Car Details page.
 * Captures location + dates, shows a live price preview, then forwards to checkout.
 */
export function InlineBookingForm({
  carId,
  pricePerDay,
  initialPickup,
  initialDropoff,
  initialFrom,
  initialTo,
}: InlineBookingFormProps) {
  const router = useRouter();
  const today = useMemo(() => formatDateInputValue(new Date()), []);
  const tomorrow = useMemo(
    () => formatDateInputValue(addCalendarDays(new Date(), 3)),
    []
  );

  const [pickup, setPickup] = useState(initialPickup ?? rentalLocations[0]);
  const [dropoff, setDropoff] = useState(initialDropoff ?? rentalLocations[0]);
  const [from, setFrom] = useState(initialFrom ?? today);
  const [to, setTo] = useState(initialTo ?? tomorrow);

  const days = diffInDays(from, to);
  const total = pricePerDay * days;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams({ pickup, dropoff, from, to });
    router.push(`/checkout/${carId}?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-5 sm:p-6"
    >
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-3xl font-semibold tracking-tight text-foreground">
            {formatCurrency(pricePerDay)}
          </p>
          <p className="text-sm text-muted-foreground">per day</p>
        </div>
        <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Available
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="flex items-center gap-1.5 font-medium text-foreground">
            <MapPinned className="h-4 w-4 text-muted-foreground" aria-hidden />
            Pick-up
          </span>
          <select
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="h-11 rounded-xl border border-border bg-background px-3 text-[15px] text-foreground outline-none ring-primary/30 focus:ring-2"
          >
            {rentalLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="flex items-center gap-1.5 font-medium text-foreground">
            <MapPinned className="h-4 w-4 text-muted-foreground" aria-hidden />
            Drop-off
          </span>
          <select
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            className="h-11 rounded-xl border border-border bg-background px-3 text-[15px] text-foreground outline-none ring-primary/30 focus:ring-2"
          >
            {rentalLocations.map((loc) => (
              <option key={`drop-${loc}`} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <CalendarDays className="h-4 w-4 text-muted-foreground" aria-hidden />
              From
            </span>
            <input
              type="date"
              required
              min={today}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="h-11 rounded-xl border border-border bg-background px-3 text-[15px] text-foreground outline-none ring-primary/30 focus:ring-2"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <CalendarDays className="h-4 w-4 text-muted-foreground" aria-hidden />
              Until
            </span>
            <input
              type="date"
              required
              min={from}
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="h-11 rounded-xl border border-border bg-background px-3 text-[15px] text-foreground outline-none ring-primary/30 focus:ring-2"
            />
          </label>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-muted/60 p-4 text-sm">
        <div className="flex items-center justify-between text-muted-foreground">
          <span>
            {formatCurrency(pricePerDay)} × {days} {days === 1 ? "day" : "days"}
          </span>
          <span className="font-medium text-foreground">{formatCurrency(total)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-border/50 pt-2 font-semibold text-foreground">
          <span>Total</span>
          <span className="text-base">{formatCurrency(total)}</span>
        </div>
      </div>

      <button
        type="submit"
        className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-[15px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        Continue to reserve
        <ArrowRight className="h-4 w-4" aria-hidden />
      </button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
        No card required · pay at pick-up
      </p>
    </form>
  );
}

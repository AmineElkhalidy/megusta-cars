"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";
import { CalendarDays, MapPinned } from "lucide-react";
import { rentalLocations } from "@/lib/site-config";

export type QuickBookingDefaults = {
  pickupDate: string;
  returnDate: string;
};

type QuickBookingWidgetProps = {
  defaults: QuickBookingDefaults;
};

/**
 * Step 1 of the rental journey: capture where and when, then continue to fleet listing.
 * Uses native date inputs for accessibility and zero extra bundle weight.
 */
export function QuickBookingWidget({ defaults }: QuickBookingWidgetProps) {
  const router = useRouter();
  const [pickup, setPickup] = useState(rentalLocations[0]);
  const [dropoff, setDropoff] = useState(rentalLocations[0]);
  const [pickupDate, setPickupDate] = useState(defaults.pickupDate);
  const [returnDate, setReturnDate] = useState(defaults.returnDate);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams({
      pickup,
      dropoff,
      from: pickupDate,
      to: returnDate,
    });
    router.push(`/fleet?${params.toString()}`);
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-muted-foreground">
        <MapPinned className="h-4 w-4 shrink-0 text-primary" aria-hidden />
        <span>Quick book — locations & dates</span>
      </div>

      <form
        className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3"
        onSubmit={handleSubmit}
      >
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-foreground">Pick-up</span>
          <select
            value={pickup}
            onChange={(ev) => setPickup(ev.target.value)}
            className="h-11 rounded-xl border border-border bg-background px-3 text-[15px] text-foreground outline-none ring-primary/30 transition-shadow focus:ring-2"
          >
            {rentalLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-foreground">Drop-off</span>
          <select
            value={dropoff}
            onChange={(ev) => setDropoff(ev.target.value)}
            className="h-11 rounded-xl border border-border bg-background px-3 text-[15px] text-foreground outline-none ring-primary/30 transition-shadow focus:ring-2"
          >
            {rentalLocations.map((loc) => (
              <option key={`drop-${loc}`} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="flex items-center gap-1.5 font-medium text-foreground">
            <CalendarDays className="h-4 w-4 text-muted-foreground" aria-hidden />
            From
          </span>
          <input
            type="date"
            required
            value={pickupDate}
            min={defaults.pickupDate}
            onChange={(ev) => setPickupDate(ev.target.value)}
            className="h-11 rounded-xl border border-border bg-background px-3 text-[15px] text-foreground outline-none ring-primary/30 transition-shadow focus:ring-2"
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
            value={returnDate}
            min={pickupDate}
            onChange={(ev) => setReturnDate(ev.target.value)}
            className="h-11 rounded-xl border border-border bg-background px-3 text-[15px] text-foreground outline-none ring-primary/30 transition-shadow focus:ring-2"
          />
        </label>

        <div className="sm:col-span-2 lg:col-span-4 lg:flex lg:justify-end">
          <button
            type="submit"
            className="h-12 w-full rounded-full bg-primary px-8 text-[15px] font-semibold text-primary-foreground transition-opacity hover:opacity-90 lg:w-auto"
          >
            See available cars
          </button>
        </div>
      </form>
    </div>
  );
}

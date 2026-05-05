"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";
import { CalendarDays, MapPin, Search } from "lucide-react";
import { rentalLocations } from "@/lib/site-config";
import { useT } from "@/lib/i18n/use-t";

export type QuickBookingDefaults = {
  pickupDate: string;
  returnDate: string;
};

type QuickBookingWidgetProps = {
  defaults: QuickBookingDefaults;
};

export function QuickBookingWidget({ defaults }: QuickBookingWidgetProps) {
  const router = useRouter();
  const { t } = useT();
  const [pickup, setPickup] = useState(rentalLocations[0]);
  const [pickupDate, setPickupDate] = useState(defaults.pickupDate);
  const [returnDate, setReturnDate] = useState(defaults.returnDate);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams({
      pickup,
      dropoff: pickup,
      from: pickupDate,
      to: returnDate,
    });
    router.push(`/fleet?${params.toString()}`);
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-4 shadow-xl shadow-primary/5 sm:p-6 lg:p-7">
      <form
        className="grid gap-3 sm:gap-4 md:grid-cols-[1.3fr_1fr_1fr_auto] md:items-end"
        onSubmit={handleSubmit}
      >
        <label className="flex flex-col gap-2">
          <span className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" aria-hidden />
            {t.quickBook.where}
          </span>
          <select
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="h-14 rounded-2xl border border-border bg-background px-4 text-base font-medium text-foreground outline-none ring-primary/30 transition-shadow focus:ring-2"
          >
            {rentalLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
            <CalendarDays className="h-4 w-4 text-primary" aria-hidden />
            {t.quickBook.from}
          </span>
          <input
            type="date"
            required
            value={pickupDate}
            min={defaults.pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="h-14 rounded-2xl border border-border bg-background px-4 text-base font-medium text-foreground outline-none ring-primary/30 transition-shadow focus:ring-2"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
            <CalendarDays className="h-4 w-4 text-primary" aria-hidden />
            {t.quickBook.until}
          </span>
          <input
            type="date"
            required
            value={returnDate}
            min={pickupDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="h-14 rounded-2xl border border-border bg-background px-4 text-base font-medium text-foreground outline-none ring-primary/30 transition-shadow focus:ring-2"
          />
        </label>

        <button
          type="submit"
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-transform hover:-translate-y-0.5 md:w-auto md:px-8"
        >
          <Search className="h-5 w-5" aria-hidden />
          {t.quickBook.findMyCar}
        </button>
      </form>
    </div>
  );
}

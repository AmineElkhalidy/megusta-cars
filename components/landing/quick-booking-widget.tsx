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

/**
 * Premium-feeling search bar — fields share one rounded surface with thin
 * dividers. The submit button is rendered inside the bar on desktop and
 * full-width on mobile so it always feels like the primary action.
 */
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
    <div className="surface-card-elevated relative overflow-hidden p-2 sm:p-3">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
      />
      <form
        onSubmit={handleSubmit}
        className="grid gap-2 md:grid-cols-[1.3fr_1fr_1fr_auto] md:items-stretch md:gap-0 md:divide-x md:divide-border"
      >
        <Field
          icon={<MapPin className="h-4 w-4" aria-hidden />}
          label={t.quickBook.where}
          className="md:rounded-r-none rtl:md:rounded-l-none rtl:md:rounded-r-2xl"
        >
          <select
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full bg-transparent text-base font-semibold text-foreground outline-none"
          >
            {rentalLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </Field>

        <Field
          icon={<CalendarDays className="h-4 w-4" aria-hidden />}
          label={t.quickBook.from}
          className="md:rounded-none"
        >
          <input
            type="date"
            required
            value={pickupDate}
            min={defaults.pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="w-full bg-transparent text-base font-semibold text-foreground outline-none"
          />
        </Field>

        <Field
          icon={<CalendarDays className="h-4 w-4" aria-hidden />}
          label={t.quickBook.until}
          className="md:rounded-none"
        >
          <input
            type="date"
            required
            value={returnDate}
            min={pickupDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full bg-transparent text-base font-semibold text-foreground outline-none"
          />
        </Field>

        <button
          type="submit"
          className="btn-primary group h-14 w-full shrink-0 px-6 text-base sm:h-16 md:my-1 md:me-1 md:w-auto md:px-7 md:text-[15px]"
        >
          <Search className="h-5 w-5" aria-hidden />
          {t.quickBook.findMyCar}
        </button>
      </form>
    </div>
  );
}

type FieldProps = {
  icon: React.ReactNode;
  label: string;
  className?: string;
  children: React.ReactNode;
};

function Field({ icon, label, className = "", children }: FieldProps) {
  return (
    <label
      className={`group flex cursor-pointer flex-col gap-1 rounded-2xl px-4 py-3 transition-colors hover:bg-muted/60 sm:px-5 ${className}`}
    >
      <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </span>
      <span className="flex items-center">{children}</span>
    </label>
  );
}

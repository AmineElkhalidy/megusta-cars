"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarRange, MapPin, Ticket, Trash2 } from "lucide-react";
import { useBookingStore, useStoreHydration } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/booking-utils";
import { StatusBadge } from "@/components/bookings/status-badge";
import { useT } from "@/lib/i18n/use-t";

export function BookingsList() {
  const { t } = useT();
  const hydrated = useStoreHydration();
  const bookings = useBookingStore((s) => s.bookings);
  const cancelBooking = useBookingStore((s) => s.cancelBooking);

  if (!hydrated) {
    return (
      <div className="rounded-2xl border border-border bg-card p-12 text-center text-sm text-muted-foreground">
        {t.dashboard.loading}
      </div>
    );
  }

  if (bookings.length === 0) {
    return <EmptyState />;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const activeStatuses = new Set(["pending", "approved"]);
  const upcoming = bookings
    .filter(
      (b) =>
        activeStatuses.has(b.status) && new Date(b.endDate) >= today
    )
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  const past = bookings.filter((b) => !upcoming.includes(b));

  return (
    <div className="space-y-10">
      {upcoming.length > 0 ? (
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t.dashboard.upcoming}
          </h2>
          <ul className="mt-4 space-y-4">
            {upcoming.map((booking) => (
              <BookingRow
                key={booking.id}
                booking={booking}
                onCancel={() => cancelBooking(booking.id)}
              />
            ))}
          </ul>
        </section>
      ) : null}

      {past.length > 0 ? (
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t.dashboard.past}
          </h2>
          <ul className="mt-4 space-y-4">
            {past.map((booking) => (
              <BookingRow key={booking.id} booking={booking} />
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

type BookingRowProps = {
  booking: ReturnType<typeof useBookingStore.getState>["bookings"][number];
  onCancel?: () => void;
};

function BookingRow({ booking, onCancel }: BookingRowProps) {
  const { t } = useT();
  return (
    <li className="overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md">
      <div className="flex flex-col sm:flex-row">
        <Link
          href={`/cars/${booking.carId}`}
          className="relative aspect-[4/3] w-full sm:w-48 sm:shrink-0"
        >
          <Image
            src={booking.carImage}
            alt={booking.carLabel}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 192px"
          />
        </Link>

        <div className="flex flex-1 flex-col gap-4 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <Link
                href={`/cars/${booking.carId}`}
                className="text-base font-semibold text-foreground hover:underline"
              >
                {booking.carLabel}
              </Link>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                #{booking.id.slice(-8)}
              </p>
            </div>
            <StatusBadge status={booking.status} />
          </div>

          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div className="flex items-start gap-2">
              <CalendarRange
                className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                aria-hidden
              />
              <div>
                <dt className="font-medium text-foreground">
                  {t.dashboard.datesLabel}
                </dt>
                <dd className="text-muted-foreground">
                  {formatDate(booking.startDate)} → {formatDate(booking.endDate)}
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                aria-hidden
              />
              <div>
                <dt className="font-medium text-foreground">
                  {t.dashboard.locationsLabel}
                </dt>
                <dd className="text-muted-foreground">
                  {booking.pickupLocation} → {booking.dropoffLocation}
                </dd>
              </div>
            </div>
          </dl>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-sm">
            <div>
              <span className="text-muted-foreground">
                {t.dashboard.totalLabel} ·{" "}
              </span>
              <span className="font-semibold text-foreground">
                {formatCurrency(booking.totalAmount)}
              </span>
              <span className="text-muted-foreground"> · {t.dashboard.payAtPickup}</span>
            </div>
            {onCancel ? (
              <button
                type="button"
                onClick={onCancel}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-red-500/40 hover:text-red-600 dark:hover:text-red-400"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden />
                {t.dashboard.cancel}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
}

function EmptyState() {
  const { t } = useT();
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center">
      <Ticket className="h-8 w-8 text-muted-foreground" aria-hidden />
      <h3 className="mt-4 text-base font-semibold text-foreground">
        {t.dashboard.emptyTitle}
      </h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {t.dashboard.emptySubtitle}
      </p>
      <Link
        href="/fleet"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        {t.dashboard.emptyCta}
      </Link>
    </div>
  );
}

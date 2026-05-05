"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarRange, MapPin, Ticket, Trash2 } from "lucide-react";
import { useBookingStore } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/booking-utils";
import { StatusBadge } from "@/components/bookings/status-badge";
import { useT } from "@/lib/i18n/use-t";
import { useUserBookings } from "@/lib/firebase/use-bookings";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { cancelBooking as cancelBookingFirestore } from "@/lib/firebase/bookings";
import type { Booking } from "@/lib/types";

export function BookingsList() {
  const { t } = useT();
  const { bookings, loading } = useUserBookings();
  const cancelBookingLocal = useBookingStore((s) => s.cancelBooking);

  async function handleCancel(id: string) {
    if (isFirebaseConfigured) {
      try {
        await cancelBookingFirestore(id);
      } catch (err) {
        console.error("Cancel booking failed:", err);
      }
      return;
    }
    cancelBookingLocal(id);
  }

  if (loading) {
    return (
      <div className="surface-card p-12 text-center text-sm text-muted-foreground">
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
      (b) => activeStatuses.has(b.status) && new Date(b.endDate) >= today
    )
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  const past = bookings.filter((b) => !upcoming.includes(b));

  return (
    <div className="space-y-12">
      {upcoming.length > 0 ? (
        <section>
          <SectionHeader label={t.dashboard.upcoming} count={upcoming.length} />
          <ul className="mt-5 space-y-4 stagger">
            {upcoming.map((booking) => (
              <BookingRow
                key={booking.id}
                booking={booking}
                onCancel={() => handleCancel(booking.id)}
              />
            ))}
          </ul>
        </section>
      ) : null}

      {past.length > 0 ? (
        <section>
          <SectionHeader label={t.dashboard.past} count={past.length} />
          <ul className="mt-5 space-y-4 stagger">
            {past.map((booking) => (
              <BookingRow key={booking.id} booking={booking} />
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function SectionHeader({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex items-baseline gap-3">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </h2>
      <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-muted px-2 text-[11px] font-semibold text-foreground">
        {count}
      </span>
      <span
        aria-hidden
        className="h-px flex-1 bg-gradient-to-r from-border via-border/50 to-transparent"
      />
    </div>
  );
}

type BookingRowProps = {
  booking: Booking;
  onCancel?: () => void;
};

function BookingRow({ booking, onCancel }: BookingRowProps) {
  const { t } = useT();
  return (
    <li className="surface-card overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex flex-col sm:flex-row">
        <Link
          href={`/cars/${booking.carId}`}
          className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-auto sm:w-52 sm:shrink-0"
        >
          <Image
            src={booking.carImage}
            alt={booking.carLabel}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 100vw, 208px"
          />
        </Link>

        <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <Link
                href={`/cars/${booking.carId}`}
                className="text-base font-semibold text-foreground transition-colors hover:text-primary"
              >
                {booking.carLabel}
              </Link>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                #{booking.id.slice(-8)}
              </p>
            </div>
            <StatusBadge status={booking.status} />
          </div>

          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div className="flex items-start gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                <CalendarRange className="h-3.5 w-3.5" aria-hidden />
              </span>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {t.dashboard.datesLabel}
                </dt>
                <dd className="mt-0.5 font-medium text-foreground">
                  {formatDate(booking.startDate)} →{" "}
                  {formatDate(booking.endDate)}
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
              </span>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {t.dashboard.locationsLabel}
                </dt>
                <dd className="mt-0.5 font-medium text-foreground">
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
              <span className="font-semibold tabular-nums text-foreground">
                {formatCurrency(booking.totalAmount)}
              </span>
              <span className="text-muted-foreground">
                {" "}
                · {t.dashboard.payAtPickup}
              </span>
            </div>
            {onCancel ? (
              <button
                type="button"
                onClick={onCancel}
                className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-red-500/40 hover:text-red-600 dark:hover:text-red-400"
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
    <div className="surface-card flex flex-col items-center justify-center border-dashed p-14 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/12 to-accent/15 text-primary ring-1 ring-primary/15">
        <Ticket className="h-6 w-6" aria-hidden />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-foreground">
        {t.dashboard.emptyTitle}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {t.dashboard.emptySubtitle}
      </p>
      <Link href="/fleet" className="btn-primary mt-7 h-12 px-6 text-sm">
        {t.dashboard.emptyCta}
      </Link>
    </div>
  );
}

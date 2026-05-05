"use client";

import Link from "next/link";
import { ClipboardList, Car, DollarSign, ShieldCheck, ArrowRight } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/booking-utils";
import { StatCard } from "@/components/admin/stat-card";
import { StatusBadge } from "@/components/bookings/status-badge";
import { useAllBookings } from "@/lib/firebase/use-bookings";
import { useCars } from "@/lib/firebase/use-cars";

export function AdminOverview() {
  const { bookings, loading: bookingsLoading } = useAllBookings();
  const { cars, loading: carsLoading } = useCars();

  if (bookingsLoading || carsLoading) {
    return (
      <div className="surface-card p-8 text-sm text-muted-foreground">
        Loading dashboard…
      </div>
    );
  }

  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const approvedRevenue = bookings
    .filter((b) => b.status === "approved" || b.status === "completed")
    .reduce((sum, b) => sum + b.totalAmount, 0);
  const activeCars = cars.filter((c) => c.status === "available").length;
  const recent = bookings.slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 stagger sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total bookings"
          value={String(bookings.length)}
          hint="All-time reservations"
          icon={ClipboardList}
        />
        <StatCard
          label="Pending review"
          value={String(pendingCount)}
          hint="Awaiting your approval"
          icon={ShieldCheck}
        />
        <StatCard
          label="Confirmed revenue"
          value={formatCurrency(approvedRevenue)}
          hint="Approved + completed"
          icon={DollarSign}
        />
        <StatCard
          label="Active cars"
          value={`${activeCars} / ${cars.length}`}
          hint="Available right now"
          icon={Car}
        />
      </div>

      <section className="surface-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            Recent reservations
          </h2>
          <Link
            href="/admin/bookings"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-soft"
          >
            View all
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl-flip"
              aria-hidden
            />
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-muted-foreground">
            No reservations yet — incoming bookings will appear here.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {recent.map((b) => (
              <li
                key={b.id}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-sm transition-colors hover:bg-muted/40 sm:px-6"
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold text-foreground">
                    {b.customerName || "Guest"} ·{" "}
                    <span className="font-display italic font-normal">
                      {b.carLabel}
                    </span>
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {formatDate(b.startDate)} → {formatDate(b.endDate)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold tabular-nums text-foreground">
                    {formatCurrency(b.totalAmount)}
                  </span>
                  <StatusBadge status={b.status} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

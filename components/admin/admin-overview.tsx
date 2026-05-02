"use client";

import Link from "next/link";
import { ClipboardList, Car, DollarSign, ShieldCheck } from "lucide-react";
import { useBookingStore, useFleetStore, useStoreHydration } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/booking-utils";
import { StatCard } from "@/components/admin/stat-card";
import { StatusBadge } from "@/components/bookings/status-badge";

export function AdminOverview() {
  const hydrated = useStoreHydration();
  const bookings = useBookingStore((s) => s.bookings);
  const cars = useFleetStore((s) => s.cars);

  if (!hydrated) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      <section className="rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-base font-semibold text-foreground">
            Recent reservations
          </h2>
          <Link
            href="/admin/bookings"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-muted-foreground">
            No reservations yet — incoming bookings will appear here.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {recent.map((b) => (
              <li
                key={b.id}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-sm"
              >
                <div>
                  <p className="font-medium text-foreground">
                    {b.customerName || "Guest"} · {b.carLabel}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(b.startDate)} → {formatDate(b.endDate)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-foreground">
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

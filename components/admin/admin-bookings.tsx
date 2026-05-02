"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Check, X, ClipboardList, CheckCircle2 } from "lucide-react";
import { useBookingStore, useStoreHydration } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/booking-utils";
import { StatusBadge } from "@/components/bookings/status-badge";
import type { BookingStatus } from "@/lib/types";

const STATUS_FILTERS: { id: BookingStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "completed", label: "Completed" },
  { id: "rejected", label: "Rejected" },
  { id: "cancelled", label: "Cancelled" },
];

export function AdminBookings() {
  const hydrated = useStoreHydration();
  const bookings = useBookingStore((s) => s.bookings);
  const updateStatus = useBookingStore((s) => s.updateBookingStatus);
  const [filter, setFilter] = useState<BookingStatus | "all">("all");

  const filtered = useMemo(() => {
    if (filter === "all") return bookings;
    return bookings.filter((b) => b.status === filter);
  }, [bookings, filter]);

  if (!hydrated) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">
        Loading bookings…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="overflow-x-auto">
        <div className="flex w-max gap-2 sm:w-full">
          {STATUS_FILTERS.map((tab) => {
            const active = filter === tab.id;
            const count =
              tab.id === "all"
                ? bookings.length
                : bookings.filter((b) => b.status === tab.id).length;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                aria-pressed={active}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    active
                      ? "bg-white/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center">
          <ClipboardList className="h-8 w-8 text-muted-foreground" aria-hidden />
          <h3 className="mt-4 text-base font-semibold text-foreground">
            No bookings in this view
          </h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Try a different filter or check back when new reservations arrive.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {filtered.map((b) => (
            <li
              key={b.id}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="relative aspect-[16/10] w-full sm:aspect-auto sm:w-44 sm:shrink-0">
                  <Image
                    src={b.carImage}
                    alt={b.carLabel}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 176px"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-4 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold text-foreground">
                        {b.customerName || "Guest"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {b.carLabel} · #{b.id.slice(-8)}
                      </p>
                    </div>
                    <StatusBadge status={b.status} />
                  </div>

                  <dl className="grid gap-2 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-xs font-medium uppercase text-muted-foreground">
                        Contact
                      </dt>
                      <dd className="text-foreground">{b.customerEmail}</dd>
                      <dd className="text-muted-foreground">{b.customerPhone}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium uppercase text-muted-foreground">
                        Trip
                      </dt>
                      <dd className="text-foreground">
                        {formatDate(b.startDate)} → {formatDate(b.endDate)}
                      </dd>
                      <dd className="text-muted-foreground">
                        {b.pickupLocation} → {b.dropoffLocation}
                      </dd>
                    </div>
                  </dl>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Total · </span>
                      <span className="font-semibold text-foreground">
                        {formatCurrency(b.totalAmount)}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {b.status === "pending" ? (
                        <>
                          <button
                            type="button"
                            onClick={() => updateStatus(b.id, "approved")}
                            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-500/20 dark:text-emerald-300"
                          >
                            <Check className="h-3.5 w-3.5" aria-hidden />
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => updateStatus(b.id, "rejected")}
                            className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-500/20 dark:text-red-300"
                          >
                            <X className="h-3.5 w-3.5" aria-hidden />
                            Reject
                          </button>
                        </>
                      ) : null}
                      {b.status === "approved" ? (
                        <button
                          type="button"
                          onClick={() => updateStatus(b.id, "completed")}
                          className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-500/20 dark:text-blue-300"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                          Mark completed
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

"use client";

import type { BookingStatus } from "@/lib/types";
import { useT } from "@/lib/i18n/use-t";

const STATUS_STYLES: Record<BookingStatus, string> = {
  pending:
    "bg-amber-500/10 text-amber-700 dark:text-amber-300 ring-amber-500/20",
  approved:
    "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-emerald-500/20",
  rejected: "bg-red-500/10 text-red-700 dark:text-red-300 ring-red-500/20",
  completed:
    "bg-blue-500/10 text-blue-700 dark:text-blue-300 ring-blue-500/20",
  cancelled:
    "bg-zinc-500/10 text-zinc-700 dark:text-zinc-300 ring-zinc-500/20",
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  const { t } = useT();
  const label = t.status[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${STATUS_STYLES[status]}`}
    >
      {label}
    </span>
  );
}

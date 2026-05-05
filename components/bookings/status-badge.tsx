"use client";

import type { BookingStatus } from "@/lib/types";
import { useT } from "@/lib/i18n/use-t";

const STATUS_STYLES: Record<BookingStatus, { dot: string; pill: string }> = {
  pending: {
    dot: "bg-amber-500",
    pill: "bg-amber-500/10 text-amber-700 dark:text-amber-300 ring-amber-500/25",
  },
  approved: {
    dot: "bg-emerald-500",
    pill: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-emerald-500/25",
  },
  rejected: {
    dot: "bg-red-500",
    pill: "bg-red-500/10 text-red-700 dark:text-red-300 ring-red-500/25",
  },
  completed: {
    dot: "bg-blue-500",
    pill: "bg-blue-500/10 text-blue-700 dark:text-blue-300 ring-blue-500/25",
  },
  cancelled: {
    dot: "bg-zinc-400",
    pill: "bg-zinc-500/10 text-zinc-700 dark:text-zinc-300 ring-zinc-500/25",
  },
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  const { t } = useT();
  const label = t.status[status];
  const styles = STATUS_STYLES[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${styles.pill}`}
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${styles.dot}`}
      />
      {label}
    </span>
  );
}

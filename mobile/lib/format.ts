/** Lightweight formatters used across the mobile screens. */

export function formatCurrency(value: number): string {
  if (Number.isNaN(value) || value === null || value === undefined) return "$0";
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

/** Format a YYYY-MM-DD date string into a friendly "Mon 5 May" label. */
export function formatDate(input: string | undefined | null): string {
  if (!input) return "—";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    weekday: "short",
  });
}

/** Whole-day diff between two YYYY-MM-DD strings. Always >= 1. */
export function diffInDays(from: string, to: string): number {
  const a = new Date(from);
  const b = new Date(to);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return 1;
  const ms = b.getTime() - a.getTime();
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)));
}

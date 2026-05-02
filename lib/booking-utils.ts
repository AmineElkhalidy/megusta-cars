/** Compute calendar-day count between two YYYY-MM-DD dates (minimum 1). */
export function diffInDays(from: string, to: string): number {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const ms = Math.abs(toDate.getTime() - fromDate.getTime());
  return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

/** Pretty-print a YYYY-MM-DD date with the user's locale. */
export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Format USD currency (whole-dollar precision is fine for daily-rate display). */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

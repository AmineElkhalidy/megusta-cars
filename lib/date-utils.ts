/** Format a Date as `YYYY-MM-DD` for native `<input type="date">` values. */
export function formatDateInputValue(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Returns a new calendar date shifted by `days` from `from`. */
export function addCalendarDays(from: Date, days: number): Date {
  const next = new Date(from);
  next.setDate(next.getDate() + days);
  return next;
}

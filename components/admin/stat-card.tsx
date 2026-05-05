import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
};

export function StatCard({ label, value, hint, icon: Icon }: StatCardProps) {
  return (
    <div className="surface-card group relative overflow-hidden p-5 transition-all hover:-translate-y-1 hover:border-border-strong hover:shadow-lg">
      <span
        aria-hidden
        className="pointer-events-none absolute -end-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100"
      />
      <div className="relative flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/12 to-accent/15 text-primary ring-1 ring-primary/15 transition-transform group-hover:-rotate-6">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
      </div>
      <p className="relative mt-4 text-2xl font-semibold tracking-tight tabular-nums text-foreground">
        {value}
      </p>
      {hint ? (
        <p className="relative mt-1 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

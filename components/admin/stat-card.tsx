import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
};

export function StatCard({ label, value, hint, icon: Icon }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
      </div>
      <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
        {value}
      </p>
      {hint ? (
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

"use client";

import { useT } from "@/lib/i18n/use-t";

export function DashboardHeader() {
  const { t } = useT();
  return (
    <div className="mb-10 animate-fade-up">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        {t.dashboard.hello}
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {t.dashboard.title}
      </h1>
      <p className="mt-3 text-[15px] text-muted-foreground">
        {t.dashboard.subtitle}
      </p>
    </div>
  );
}

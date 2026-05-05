"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { useT } from "@/lib/i18n/use-t";

/**
 * Horizontal pill filters. Values written to URL remain in English (canonical)
 * so filtering works across languages, but the labels are localised.
 */
const GROUPS = [
  { key: "type", emoji: "🚗", options: ["Sedan", "SUV", "Coupe", "Hatchback"] },
  { key: "transmission", emoji: "⚙️", options: ["Automatic", "Manual"] },
  {
    key: "fuel",
    emoji: "⛽",
    options: ["Gasoline", "Diesel", "Electric", "Hybrid"],
  },
] as const;

export function FleetFilterBar() {
  const { t } = useT();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const toggle = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      const current = next.getAll(key);
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      next.delete(key);
      updated.forEach((v) => next.append(key, v));
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [params, pathname, router]
  );

  const clearAll = () => {
    const next = new URLSearchParams(params.toString());
    GROUPS.forEach((g) => next.delete(g.key));
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const activeCount = GROUPS.reduce(
    (acc, g) => acc + params.getAll(g.key).length,
    0
  );

  return (
    <div className="space-y-5">
      {GROUPS.map((group) => {
        const selected = params.getAll(group.key);
        const groupLabel =
          group.key === "type"
            ? t.cars.filterLabels.type
            : group.key === "transmission"
              ? t.cars.filterLabels.transmission
              : t.cars.filterLabels.fuel;
        const optionLabels =
          group.key === "type"
            ? t.cars.options.type
            : group.key === "transmission"
              ? t.cars.options.transmission
              : t.cars.options.fuel;

        return (
          <div key={group.key}>
            <p className="mb-2.5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <span aria-hidden>{group.emoji}</span>
              {groupLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.options.map((option) => {
                const active = selected.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggle(group.key, option)}
                    aria-pressed={active}
                    className={`inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-semibold transition-all ${
                      active
                        ? "bg-gradient-to-br from-primary to-primary-soft text-primary-foreground shadow-md shadow-primary/30 ring-1 ring-primary/30"
                        : "border border-border-strong bg-card text-foreground hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-sm"
                    }`}
                  >
                    {optionLabels[option] ?? option}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {activeCount > 0 ? (
        <button
          type="button"
          onClick={clearAll}
          className="inline-flex items-center gap-1.5 rounded-full border border-transparent px-2 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" aria-hidden />
          {t.cars.clearFilters(activeCount)}
        </button>
      ) : null}
    </div>
  );
}

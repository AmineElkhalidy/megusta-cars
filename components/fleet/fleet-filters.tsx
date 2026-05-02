"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { useCallback, useMemo } from "react";

const VEHICLE_TYPES = ["Sedan", "SUV", "Coupe", "Hatchback"] as const;
const TRANSMISSIONS = ["Automatic", "Manual"] as const;
const FUELS = ["Gasoline", "Diesel", "Electric", "Hybrid"] as const;
const SEATS = [2, 4, 5, 7] as const;

/**
 * URL-driven filter sidebar. Each control writes its selection back to the route's
 * search params so deep-linking and back/forward navigation just work.
 */
export function FleetFilters({ priceCap = 200 }: { priceCap?: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const setMulti = useCallback(
    (key: string, value: string, checked: boolean) => {
      const next = new URLSearchParams(params.toString());
      const existing = next.getAll(key);
      const updated = checked
        ? Array.from(new Set([...existing, value]))
        : existing.filter((v) => v !== value);
      next.delete(key);
      updated.forEach((v) => next.append(key, v));
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [params, pathname, router]
  );

  const setSingle = useCallback(
    (key: string, value: string | null) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [params, pathname, router]
  );

  const types = params.getAll("type");
  const trans = params.getAll("transmission");
  const fuels = params.getAll("fuel");
  const seats = params.get("seats");
  const maxPrice = params.get("maxPrice");

  const hasActiveFilters = useMemo(
    () =>
      types.length > 0 ||
      trans.length > 0 ||
      fuels.length > 0 ||
      Boolean(seats) ||
      Boolean(maxPrice),
    [types.length, trans.length, fuels.length, seats, maxPrice]
  );

  const clearFilters = () => {
    const next = new URLSearchParams(params.toString());
    ["type", "transmission", "fuel", "seats", "maxPrice"].forEach((k) =>
      next.delete(k)
    );
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-2 text-sm font-medium text-foreground">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" aria-hidden />
          <h2>Filters</h2>
        </div>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-3 w-3" aria-hidden />
            Clear
          </button>
        ) : null}
      </div>

      <div className="mt-6 space-y-7">
        <FilterGroup
          legend="Vehicle Type"
          options={VEHICLE_TYPES}
          selected={types}
          onToggle={(v, c) => setMulti("type", v, c)}
        />
        <FilterGroup
          legend="Transmission"
          options={TRANSMISSIONS}
          selected={trans}
          onToggle={(v, c) => setMulti("transmission", v, c)}
        />
        <FilterGroup
          legend="Fuel"
          options={FUELS}
          selected={fuels}
          onToggle={(v, c) => setMulti("fuel", v, c)}
        />

        <fieldset>
          <legend className="text-sm font-medium text-foreground">Seats</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {SEATS.map((n) => {
              const value = String(n);
              const active = seats === value;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setSingle("seats", active ? null : value)}
                  aria-pressed={active}
                  className={`inline-flex h-9 min-w-12 items-center justify-center rounded-full border px-3 text-sm transition-colors ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {n}+
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="flex items-baseline justify-between text-sm font-medium text-foreground">
            <span>Max price / day</span>
            <span className="text-xs font-normal text-muted-foreground">
              ${maxPrice ?? priceCap}
            </span>
          </legend>
          <input
            type="range"
            min={50}
            max={priceCap}
            step={5}
            value={maxPrice ?? priceCap}
            onChange={(e) =>
              setSingle(
                "maxPrice",
                e.target.value === String(priceCap) ? null : e.target.value
              )
            }
            className="mt-3 w-full accent-primary"
          />
        </fieldset>
      </div>
    </div>
  );
}

type FilterGroupProps = {
  legend: string;
  options: readonly string[];
  selected: string[];
  onToggle: (value: string, checked: boolean) => void;
};

function FilterGroup({ legend, options, selected, onToggle }: FilterGroupProps) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-foreground">{legend}</legend>
      <div className="mt-3 space-y-2.5">
        {options.map((option) => {
          const checked = selected.includes(option);
          return (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onToggle(option, e.target.checked)}
                className="h-4 w-4 rounded border-border accent-primary focus:ring-primary/30"
              />
              {option}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

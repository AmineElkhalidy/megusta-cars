"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { FleetFilterBar } from "@/components/fleet/fleet-filter-bar";
import { FleetHeader, FleetEmptyState } from "@/components/fleet/fleet-header";
import { CarCard } from "@/components/fleet/car-card";
import { useCars } from "@/lib/firebase/use-cars";

export function FleetView() {
  const { cars, loading } = useCars();
  const searchParams = useSearchParams();

  const types = searchParams.getAll("type");
  const transmissions = searchParams.getAll("transmission");
  const fuels = searchParams.getAll("fuel");

  const filteredCars = useMemo(
    () =>
      cars.filter((car) => {
        if (types.length && !types.includes(car.type)) return false;
        if (transmissions.length && !transmissions.includes(car.transmission))
          return false;
        if (fuels.length && !fuels.includes(car.fuel)) return false;
        return true;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cars, searchParams.toString()]
  );

  const passthrough = new URLSearchParams();
  for (const key of ["pickup", "dropoff", "from", "to"] as const) {
    const v = searchParams.get(key);
    if (v) passthrough.set(key, v);
  }
  const searchParamsString = passthrough.toString();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <FleetHeader count={filteredCars.length} />

      <div className="surface-card mb-12 p-5 sm:p-7">
        <FleetFilterBar />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-96 animate-pulse rounded-3xl border border-border bg-card"
            />
          ))}
        </div>
      ) : filteredCars.length === 0 ? (
        <FleetEmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-6 stagger sm:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              searchParamsString={searchParamsString}
            />
          ))}
        </div>
      )}
    </div>
  );
}

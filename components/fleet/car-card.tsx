"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, Fuel, Cog } from "lucide-react";
import type { Car } from "@/lib/types";
import { formatCurrency } from "@/lib/booking-utils";
import { useT } from "@/lib/i18n/use-t";

type CarCardProps = {
  car: Car;
  searchParamsString: string;
};

/** Translated car card. Type / transmission / fuel labels swap by locale. */
export function CarCard({ car, searchParamsString }: CarCardProps) {
  const { t } = useT();
  const detailsHref = searchParamsString
    ? `/cars/${car.id}?${searchParamsString}`
    : `/cars/${car.id}`;

  const typeLabel = t.cars.options.type[car.type] ?? car.type;
  const transmissionLabel =
    t.cars.options.transmission[car.transmission] ?? car.transmission;
  const fuelLabel = t.cars.options.fuel[car.fuel] ?? car.fuel;

  return (
    <Link
      href={detailsHref}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Image
          src={car.imageUrl}
          alt={`${car.make} ${car.model}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="absolute start-4 top-4 rounded-full bg-background/95 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-foreground shadow-sm backdrop-blur">
          {typeLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {car.make} {car.model}
          </h3>
          <p className="text-sm text-muted-foreground">{car.year}</p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-4 w-4" aria-hidden />
            {car.seats}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Cog className="h-4 w-4" aria-hidden />
            {transmissionLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Fuel className="h-4 w-4" aria-hidden />
            {fuelLabel}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
          <div>
            <p className="text-2xl font-semibold tracking-tight text-foreground">
              {formatCurrency(car.pricePerDay)}
              <span className="ms-1 text-sm font-normal text-muted-foreground">
                {t.hero.priceUnit}
              </span>
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-transform group-hover:-translate-y-0.5">
            {t.cars.bookNow}
          </span>
        </div>
      </div>
    </Link>
  );
}

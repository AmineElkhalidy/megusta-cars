"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, Fuel, Cog, ArrowUpRight } from "lucide-react";
import type { Car } from "@/lib/types";
import { formatCurrency } from "@/lib/booking-utils";
import { useT } from "@/lib/i18n/use-t";

type CarCardProps = {
  car: Car;
  searchParamsString: string;
};

/**
 * Editorial car card. The price floats over the photo as a glass chip and the
 * meta row stays compact below the title. Hover reveals an arrow and zooms the
 * image gently — feels alive without being noisy.
 */
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
      className="group surface-card relative isolate flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-border-strong hover:shadow-2xl hover:shadow-foreground/10"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Image
          src={car.imageUrl}
          alt={`${car.make} ${car.model}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Bottom gradient veil for chip readability */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        {/* Type chip — top start */}
        <span className="absolute start-4 top-4 inline-flex items-center rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground shadow-md backdrop-blur">
          {typeLabel}
        </span>

        {/* Hover arrow — top end */}
        <span
          aria-hidden
          className="absolute end-4 top-4 flex h-10 w-10 -translate-y-1 items-center justify-center rounded-full bg-white/95 text-foreground opacity-0 shadow-md backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>

        {/* Price chip — bottom end, floats over the image */}
        <div className="absolute end-4 bottom-4 inline-flex items-baseline gap-1 rounded-full bg-white/95 px-4 py-2 shadow-lg ring-1 ring-foreground/5 backdrop-blur">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {t.hero.priceFrom}
          </span>
          <span className="text-base font-semibold tracking-tight text-foreground">
            {formatCurrency(car.pricePerDay)}
          </span>
          <span className="text-xs text-muted-foreground">
            {t.hero.priceUnit}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div>
          <h3 className="text-[1.15rem] font-semibold tracking-tight text-foreground">
            {car.make}{" "}
            <span className="font-display italic font-normal text-foreground/85">
              {car.model}
            </span>
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{car.year}</p>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-4 w-4 text-primary/70" aria-hidden />
            {car.seats}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Cog className="h-4 w-4 text-primary/70" aria-hidden />
            {transmissionLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Fuel className="h-4 w-4 text-primary/70" aria-hidden />
            {fuelLabel}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
          <span className="text-sm font-medium text-muted-foreground">
            {t.cars.bookNow}
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background transition-all group-hover:bg-primary"
            aria-hidden
          >
            {t.cars.bookNow}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

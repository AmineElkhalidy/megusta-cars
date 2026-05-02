import Image from "next/image";
import Link from "next/link";
import { Users, Fuel, Cog, ArrowRight } from "lucide-react";
import type { Car } from "@/lib/types";
import { formatCurrency } from "@/lib/booking-utils";

type CarCardProps = {
  car: Car;
  searchParamsString: string;
};

/** Polished car summary card for the fleet grid. Routes to the Car Details page. */
export function CarCard({ car, searchParamsString }: CarCardProps) {
  const detailsHref = searchParamsString
    ? `/cars/${car.id}?${searchParamsString}`
    : `/cars/${car.id}`;

  return (
    <Link
      href={detailsHref}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Image
          src={car.imageUrl}
          alt={`${car.make} ${car.model}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-foreground backdrop-blur">
          {car.type}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-foreground">
              {car.make} {car.model}
            </h3>
            <p className="text-sm text-muted-foreground">{car.year}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-foreground">
              {formatCurrency(car.pricePerDay)}
            </p>
            <p className="text-xs text-muted-foreground">/ day</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" aria-hidden />
            <span>{car.seats} seats</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cog className="h-3.5 w-3.5" aria-hidden />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel className="h-3.5 w-3.5" aria-hidden />
            <span>{car.fuel}</span>
          </div>
        </div>

        <div className="mt-auto pt-6">
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
            View details
            <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}

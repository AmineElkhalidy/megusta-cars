import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CarCard } from "@/components/fleet/car-card";
import { mockCars } from "@/lib/mock-data";

/** Curated three-up showcase that links into the full fleet. */
export function FeaturedCars() {
  const featured = mockCars.slice(0, 3);

  return (
    <section className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Hand-picked
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Featured for this season
            </h2>
          </div>
          <Link
            href="/fleet"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-all hover:gap-2.5"
          >
            View full fleet
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} searchParamsString="" />
          ))}
        </div>
      </div>
    </section>
  );
}

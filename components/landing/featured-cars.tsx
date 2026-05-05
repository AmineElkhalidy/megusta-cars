"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CarCard } from "@/components/fleet/car-card";
import { useCars } from "@/lib/firebase/use-cars";
import { useT } from "@/lib/i18n/use-t";

export function FeaturedCars() {
  const { t } = useT();
  const { cars } = useCars();
  const featured = cars.slice(0, 3);

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {t.featured.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t.featured.title}
          </h2>
          <p className="mt-3 max-w-md text-[15px] text-muted-foreground">
            {t.featured.subtitle}
          </p>
        </div>
        <Link
          href="/fleet"
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5"
        >
          {t.featured.seeAll}
          <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((car) => (
          <CarCard key={car.id} car={car} searchParamsString="" />
        ))}
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CarCard } from "@/components/fleet/car-card";
import { useCars } from "@/lib/firebase/use-cars";
import { useT } from "@/lib/i18n/use-t";

export function FeaturedCars() {
  const { t } = useT();
  const { cars, loading } = useCars();
  const featured = cars.slice(0, 3);

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">{t.featured.eyebrow}</p>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight text-foreground">
            {t.featured.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="font-display italic font-normal text-flame">
              {t.featured.title.split(" ").slice(-1)}
            </span>
          </h2>
          <p className="mt-4 max-w-md text-[16px] leading-relaxed text-muted-foreground">
            {t.featured.subtitle}
          </p>
        </div>
        <Link
          href="/fleet"
          className="group inline-flex items-center gap-2 rounded-full border border-border-strong bg-card/80 px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md"
        >
          {t.featured.seeAll}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl-flip"
            aria-hidden
          />
        </Link>
      </div>

      <div className="mt-12 grid gap-6 stagger sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-96 animate-pulse rounded-3xl border border-border bg-card"
              />
            ))
          : featured.map((car) => (
              <CarCard key={car.id} car={car} searchParamsString="" />
            ))}
      </div>
    </section>
  );
}

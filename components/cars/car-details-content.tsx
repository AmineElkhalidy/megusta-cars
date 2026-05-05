"use client";

import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import type { Car } from "@/lib/types";
import { ImageGallery } from "@/components/cars/image-gallery";
import { CarSpecs } from "@/components/cars/car-specs";
import { InlineBookingForm } from "@/components/cars/inline-booking-form";
import { StepIndicator } from "@/components/shared/step-indicator";
import { useT } from "@/lib/i18n/use-t";

type CarDetailsContentProps = {
  car: Car;
  initialPickup?: string;
  initialFrom?: string;
  initialTo?: string;
};

/** Client wrapper so the entire details page can read translations from the store. */
export function CarDetailsContent({
  car,
  initialPickup,
  initialFrom,
  initialTo,
}: CarDetailsContentProps) {
  const { t } = useT();
  const galleryImages = car.images?.length ? car.images : [car.imageUrl];
  const typeLabel = t.cars.options.type[car.type] ?? car.type;
  const steps = [
    t.steps.items[1].title, // "Choose your car"
    t.steps.items[0].title, // "Pick your dates" — already done in widget
    t.steps.items[2].title, // "Come pick it up"
  ] as const;
  // Simpler: use the three localized steps in order with current=1 (we're still on car details).

  const STEPS = [
    t.steps.items[0].title,
    t.steps.items[1].title,
    t.steps.items[2].title,
  ] as const;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/fleet"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
        {t.carDetails.back}
      </Link>

      <div className="mt-6">
        <StepIndicator steps={STEPS} current={2} />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7 animate-fade-up">
          <ImageGallery images={galleryImages} alt={`${car.make} ${car.model}`} />

          <div className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {typeLabel} · {car.year}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {car.make} {car.model}
            </h1>
            {car.description ? (
              <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
                {car.description}
              </p>
            ) : null}
          </div>

          <section className="mt-10">
            <h2 className="text-lg font-semibold text-foreground">
              {t.carDetails.goodToKnow}
            </h2>
            <div className="mt-4">
              <CarSpecs car={car} />
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-lg font-semibold text-foreground">
              {t.carDetails.whatsIncluded}
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {car.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-foreground"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-4 w-4" aria-hidden />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="lg:col-span-5 lg:sticky lg:top-24">
          <InlineBookingForm
            carId={car.id}
            pricePerDay={car.pricePerDay}
            initialPickup={initialPickup}
            initialFrom={initialFrom}
            initialTo={initialTo}
          />
        </aside>
      </div>
    </div>
  );
}

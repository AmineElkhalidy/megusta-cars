"use client";

import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { ImageGallery } from "@/components/cars/image-gallery";
import { CarSpecs } from "@/components/cars/car-specs";
import { InlineBookingForm } from "@/components/cars/inline-booking-form";
import { StepIndicator } from "@/components/shared/step-indicator";
import { useT } from "@/lib/i18n/use-t";
import { useCar } from "@/lib/firebase/use-cars";

type CarDetailsContentProps = {
  carId: string;
  initialPickup?: string;
  initialFrom?: string;
  initialTo?: string;
};

export function CarDetailsContent({
  carId,
  initialPickup,
  initialFrom,
  initialTo,
}: CarDetailsContentProps) {
  const { t } = useT();
  const { car, loading } = useCar(carId);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="h-6 w-32 animate-pulse rounded-full bg-muted" />
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="h-[420px] animate-pulse rounded-3xl bg-muted lg:col-span-7" />
          <div className="h-[420px] animate-pulse rounded-3xl bg-muted lg:col-span-5" />
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-foreground">
          {t.carDetails.back}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This car is no longer available.
        </p>
        <Link href="/fleet" className="btn-primary mt-6 h-12 px-6 text-sm">
          {t.dashboard.emptyCta}
        </Link>
      </div>
    );
  }
  const galleryImages = car.images?.length ? car.images : [car.imageUrl];
  const typeLabel = t.cars.options.type[car.type] ?? car.type;

  const STEPS = [
    t.steps.items[0].title,
    t.steps.items[1].title,
    t.steps.items[2].title,
  ] as const;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/fleet"
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft
          className="h-4 w-4 transition-transform group-hover:-translate-x-1 rtl-flip"
          aria-hidden
        />
        {t.carDetails.back}
      </Link>

      <div className="mt-6">
        <StepIndicator steps={STEPS} current={2} />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7 animate-fade-up">
          <ImageGallery
            images={galleryImages}
            alt={`${car.make} ${car.model}`}
          />

          <div className="mt-12">
            <p className="eyebrow">
              {typeLabel} · {car.year}
            </p>
            <h1 className="mt-4 text-[clamp(2.25rem,4.6vw,3.5rem)] font-semibold leading-[1.04] tracking-tight text-foreground">
              {car.make}{" "}
              <span className="font-display italic font-normal text-flame">
                {car.model}
              </span>
            </h1>
            {car.description ? (
              <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
                {car.description}
              </p>
            ) : null}
          </div>

          <section className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              {t.carDetails.goodToKnow}
            </h2>
            <div className="mt-5">
              <CarSpecs car={car} />
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              {t.carDetails.whatsIncluded}
            </h2>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {car.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card/70 px-4 py-3 text-sm text-foreground transition-colors hover:bg-card"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-success/10 text-success ring-1 ring-success/20">
                    <Check className="h-3.5 w-3.5" aria-hidden strokeWidth={3} />
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

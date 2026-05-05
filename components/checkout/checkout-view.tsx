"use client";

import Link from "next/link";
import { CheckoutSummary } from "@/components/checkout/checkout-summary";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { CheckoutHeader } from "@/components/checkout/checkout-header";
import { useCar } from "@/lib/firebase/use-cars";
import { diffInDays } from "@/lib/booking-utils";
import { addCalendarDays, formatDateInputValue } from "@/lib/date-utils";
import { useT } from "@/lib/i18n/use-t";

type CheckoutViewProps = {
  carId: string;
  initialPickup?: string;
  initialDropoff?: string;
  initialFrom?: string;
  initialTo?: string;
};

export function CheckoutView({
  carId,
  initialPickup,
  initialDropoff,
  initialFrom,
  initialTo,
}: CheckoutViewProps) {
  const { car, loading } = useCar(carId);
  const { t } = useT();

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="h-10 w-48 animate-pulse rounded-full bg-muted" />
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
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
        <Link
          href="/fleet"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
        >
          {t.dashboard.emptyCta}
        </Link>
      </div>
    );
  }

  const pickup = initialPickup ?? "City center desk";
  const dropoff = initialDropoff ?? pickup;

  const today = new Date();
  const from = initialFrom ?? formatDateInputValue(today);
  const to = initialTo ?? formatDateInputValue(addCalendarDays(today, 3));

  const days = diffInDays(from, to);
  const total = car.pricePerDay * days;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <CheckoutHeader />

      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">
          <CheckoutForm
            carId={car.id}
            carLabel={`${car.make} ${car.model}`}
            carImage={car.imageUrl}
            pickup={pickup}
            dropoff={dropoff}
            from={from}
            to={to}
            total={total}
          />
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <CheckoutSummary
            car={car}
            pickup={pickup}
            dropoff={dropoff}
            from={from}
            to={to}
            days={days}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}

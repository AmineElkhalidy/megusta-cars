import { notFound } from "next/navigation";
import { CheckoutSummary } from "@/components/checkout/checkout-summary";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { CheckoutHeader } from "@/components/checkout/checkout-header";
import { mockCars } from "@/lib/mock-data";
import { diffInDays } from "@/lib/booking-utils";
import { addCalendarDays, formatDateInputValue } from "@/lib/date-utils";

type CheckoutPageProps = {
  params: Promise<{ carId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CheckoutPage({
  params,
  searchParams,
}: CheckoutPageProps) {
  const { carId } = await params;
  const q = await searchParams;

  const car = mockCars.find((c) => c.id === carId);
  if (!car) notFound();

  const pickup = typeof q.pickup === "string" ? q.pickup : "City center desk";
  const dropoff = typeof q.dropoff === "string" ? q.dropoff : pickup;

  const today = new Date();
  const from =
    typeof q.from === "string" ? q.from : formatDateInputValue(today);
  const to =
    typeof q.to === "string"
      ? q.to
      : formatDateInputValue(addCalendarDays(today, 3));

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

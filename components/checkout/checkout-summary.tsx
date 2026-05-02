import Image from "next/image";
import { CheckCircle2, CalendarDays, MapPinned, User } from "lucide-react";
import type { Car } from "@/lib/types";

type CheckoutSummaryProps = {
  car: Car;
  pickup: string;
  dropoff: string;
  from: string;
  to: string;
  days: number;
  total: number;
};

export function CheckoutSummary({
  car,
  pickup,
  dropoff,
  from,
  to,
  days,
  total,
}: CheckoutSummaryProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 lg:p-8">
      <h2 className="text-lg font-semibold text-foreground">Reservation Summary</h2>
      
      {/* Car details */}
      <div className="mt-6 flex items-center gap-4 border-b border-border pb-6">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-muted">
          <Image
            src={car.imageUrl}
            alt={`${car.make} ${car.model}`}
            fill
            className="object-cover"
            sizes="112px"
          />
        </div>
        <div>
          <h3 className="font-medium text-foreground">
            {car.make} {car.model}
          </h3>
          <p className="text-sm text-muted-foreground">{car.type}</p>
        </div>
      </div>

      {/* Trip details */}
      <dl className="mt-6 space-y-4 text-sm">
        <div className="flex items-start gap-3">
          <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          <div>
            <dt className="font-medium text-foreground">Dates</dt>
            <dd className="text-muted-foreground">
              {from} to {to} ({days} {days === 1 ? "day" : "days"})
            </dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPinned className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          <div>
            <dt className="font-medium text-foreground">Locations</dt>
            <dd className="text-muted-foreground">
              Pick-up: {pickup} <br />
              Drop-off: {dropoff}
            </dd>
          </div>
        </div>
      </dl>

      {/* Pricing */}
      <div className="mt-6 rounded-xl bg-muted/50 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            ${car.pricePerDay} x {days} {days === 1 ? "day" : "days"}
          </span>
          <span className="font-medium text-foreground">${total}</span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-3">
          <span className="font-semibold text-foreground">Total</span>
          <span className="text-lg font-semibold text-foreground">${total}</span>
        </div>
      </div>

      {/* Trust marker */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-primary">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        <p>
          <strong className="font-semibold">No credit card required.</strong> Pay when you pick up the car at the agency.
        </p>
      </div>
    </div>
  );
}

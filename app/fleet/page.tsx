import { CarFront } from "lucide-react";
import { FleetFilters } from "@/components/fleet/fleet-filters";
import { CarCard } from "@/components/fleet/car-card";
import { mockCars } from "@/lib/mock-data";

type FleetPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/** Helper for picking arrays of values out of Next's searchParams shape. */
function asArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export default async function FleetPage({ searchParams }: FleetPageProps) {
  const q = await searchParams;

  const types = asArray(q.type);
  const transmissions = asArray(q.transmission);
  const fuels = asArray(q.fuel);
  const seats = typeof q.seats === "string" ? Number(q.seats) : null;
  const maxPrice = typeof q.maxPrice === "string" ? Number(q.maxPrice) : null;

  const cars = mockCars.filter((car) => {
    if (types.length && !types.includes(car.type)) return false;
    if (transmissions.length && !transmissions.includes(car.transmission)) return false;
    if (fuels.length && !fuels.includes(car.fuel)) return false;
    if (seats !== null && car.seats < seats) return false;
    if (maxPrice !== null && car.pricePerDay > maxPrice) return false;
    return true;
  });

  // Forward booking context to the car details page on each card.
  const params = new URLSearchParams();
  if (typeof q.pickup === "string") params.set("pickup", q.pickup);
  if (typeof q.dropoff === "string") params.set("dropoff", q.dropoff);
  if (typeof q.from === "string") params.set("from", q.from);
  if (typeof q.to === "string") params.set("to", q.to);
  const searchParamsString = params.toString();

  const hasQuickBook = q.pickup && q.dropoff && q.from && q.to;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Choose your car
        </h1>
        {hasQuickBook ? (
          <p className="mt-2 text-[15px] text-muted-foreground">
            Showing vehicles for{" "}
            <strong className="font-medium text-foreground">{q.pickup as string}</strong>{" "}
            → {" "}
            <strong className="font-medium text-foreground">{q.dropoff as string}</strong>{" "}
            ({q.from as string} → {q.to as string}).
          </p>
        ) : (
          <p className="mt-2 text-[15px] text-muted-foreground">
            {cars.length} {cars.length === 1 ? "car" : "cars"} available right now.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <aside className="w-full shrink-0 md:w-64">
          <div className="md:sticky md:top-24">
            <FleetFilters />
          </div>
        </aside>

        <main className="flex-1">
          {cars.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  searchParamsString={searchParamsString}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center">
      <CarFront className="h-8 w-8 text-muted-foreground" aria-hidden />
      <h3 className="mt-4 text-base font-semibold text-foreground">
        No cars match those filters
      </h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Try clearing a few filters — there's something in the fleet for almost every trip.
      </p>
    </div>
  );
}

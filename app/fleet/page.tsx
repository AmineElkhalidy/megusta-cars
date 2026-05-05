import { FleetFilterBar } from "@/components/fleet/fleet-filter-bar";
import { FleetHeader, FleetEmptyState } from "@/components/fleet/fleet-header";
import { CarCard } from "@/components/fleet/car-card";
import { mockCars } from "@/lib/mock-data";

type FleetPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function asArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export default async function FleetPage({ searchParams }: FleetPageProps) {
  const q = await searchParams;

  const types = asArray(q.type);
  const transmissions = asArray(q.transmission);
  const fuels = asArray(q.fuel);

  const cars = mockCars.filter((car) => {
    if (types.length && !types.includes(car.type)) return false;
    if (transmissions.length && !transmissions.includes(car.transmission)) return false;
    if (fuels.length && !fuels.includes(car.fuel)) return false;
    return true;
  });

  const params = new URLSearchParams();
  if (typeof q.pickup === "string") params.set("pickup", q.pickup);
  if (typeof q.dropoff === "string") params.set("dropoff", q.dropoff);
  if (typeof q.from === "string") params.set("from", q.from);
  if (typeof q.to === "string") params.set("to", q.to);
  const searchParamsString = params.toString();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <FleetHeader count={cars.length} />

      <div className="mb-10 rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <FleetFilterBar />
      </div>

      {cars.length === 0 ? (
        <FleetEmptyState />
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
    </div>
  );
}

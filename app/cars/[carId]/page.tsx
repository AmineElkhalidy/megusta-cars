import { CarDetailsContent } from "@/components/cars/car-details-content";
import { mockCars } from "@/lib/mock-data";

type CarDetailsPageProps = {
  params: Promise<{ carId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

// Pre-render the demo cars. Firestore-backed ids render dynamically via the
// default `dynamicParams = true` behaviour.
export async function generateStaticParams() {
  return mockCars.map((car) => ({ carId: car.id }));
}

export default async function CarDetailsPage({
  params,
  searchParams,
}: CarDetailsPageProps) {
  const { carId } = await params;
  const q = await searchParams;

  return (
    <CarDetailsContent
      carId={carId}
      initialPickup={typeof q.pickup === "string" ? q.pickup : undefined}
      initialFrom={typeof q.from === "string" ? q.from : undefined}
      initialTo={typeof q.to === "string" ? q.to : undefined}
    />
  );
}

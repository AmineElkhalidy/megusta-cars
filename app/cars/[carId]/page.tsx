import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { ImageGallery } from "@/components/cars/image-gallery";
import { CarSpecs } from "@/components/cars/car-specs";
import { InlineBookingForm } from "@/components/cars/inline-booking-form";
import { mockCars } from "@/lib/mock-data";

type CarDetailsPageProps = {
  params: Promise<{ carId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateStaticParams() {
  return mockCars.map((car) => ({ carId: car.id }));
}

export default async function CarDetailsPage({
  params,
  searchParams,
}: CarDetailsPageProps) {
  const { carId } = await params;
  const q = await searchParams;

  const car = mockCars.find((c) => c.id === carId);
  if (!car) notFound();

  const initialPickup = typeof q.pickup === "string" ? q.pickup : undefined;
  const initialDropoff = typeof q.dropoff === "string" ? q.dropoff : undefined;
  const initialFrom = typeof q.from === "string" ? q.from : undefined;
  const initialTo = typeof q.to === "string" ? q.to : undefined;

  const galleryImages = car.images?.length ? car.images : [car.imageUrl];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/fleet"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to fleet
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">
          <ImageGallery
            images={galleryImages}
            alt={`${car.make} ${car.model}`}
          />

          <div className="mt-10">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              {car.type} · {car.year}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {car.make} {car.model}
            </h1>
            {car.description ? (
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                {car.description}
              </p>
            ) : null}
          </div>

          <section className="mt-10">
            <h2 className="text-lg font-semibold text-foreground">Specifications</h2>
            <div className="mt-4">
              <CarSpecs car={car} />
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-lg font-semibold text-foreground">Features</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {car.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-foreground"
                >
                  <Check
                    className="h-4 w-4 shrink-0 text-primary"
                    aria-hidden
                  />
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
            initialDropoff={initialDropoff}
            initialFrom={initialFrom}
            initialTo={initialTo}
          />
        </aside>
      </div>
    </div>
  );
}

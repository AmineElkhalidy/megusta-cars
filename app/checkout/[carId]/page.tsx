import { CheckoutView } from "@/components/checkout/checkout-view";

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

  return (
    <CheckoutView
      carId={carId}
      initialPickup={typeof q.pickup === "string" ? q.pickup : undefined}
      initialDropoff={typeof q.dropoff === "string" ? q.dropoff : undefined}
      initialFrom={typeof q.from === "string" ? q.from : undefined}
      initialTo={typeof q.to === "string" ? q.to : undefined}
    />
  );
}

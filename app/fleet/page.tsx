import { Suspense } from "react";
import { FleetView } from "@/components/fleet/fleet-view";

export default function FleetPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="h-10 w-48 animate-pulse rounded-full bg-muted" />
        </div>
      }
    >
      <FleetView />
    </Suspense>
  );
}

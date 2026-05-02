import { BookingsList } from "@/components/bookings/bookings-list";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          My bookings
        </h1>
        <p className="mt-2 text-[15px] text-muted-foreground">
          Upcoming trips, past reservations, and quick cancellations — all in one place.
        </p>
      </div>

      <BookingsList />
    </div>
  );
}

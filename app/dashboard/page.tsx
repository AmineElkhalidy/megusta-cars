import { BookingsList } from "@/components/bookings/bookings-list";
import { DashboardHeader } from "@/components/bookings/dashboard-header";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <DashboardHeader />
      <BookingsList />
    </div>
  );
}

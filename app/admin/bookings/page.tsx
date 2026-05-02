import { AdminBookings } from "@/components/admin/admin-bookings";

export default function AdminBookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Bookings
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Review, approve, and track customer reservations.
        </p>
      </div>
      <AdminBookings />
    </div>
  );
}

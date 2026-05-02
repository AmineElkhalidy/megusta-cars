import { AdminOverview } from "@/components/admin/admin-overview";

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Overview
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Snapshot of bookings, revenue, and fleet status.
        </p>
      </div>
      <AdminOverview />
    </div>
  );
}

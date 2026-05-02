import { AdminFleet } from "@/components/admin/admin-fleet";

export default function AdminFleetPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Fleet
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add new cars, update status, and edit listings.
        </p>
      </div>
      <AdminFleet />
    </div>
  );
}

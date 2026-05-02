import { AdminSidebar } from "@/components/admin/admin-sidebar";

/**
 * Admin layout. In production this would be wrapped in an auth guard
 * (`getCurrentUser()` -> redirect to /login if not admin).
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Agency control panel
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
          Admin
        </h1>
      </div>

      <div className="grid gap-8 md:grid-cols-[220px_1fr]">
        <AdminSidebar />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, ShieldAlert } from "lucide-react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { useAdminAuth } from "@/lib/firebase/admin-auth";
import { isFirebaseConfigured } from "@/lib/firebase/config";

/**
 * Wraps every route under /admin.
 *  - /admin/login renders the bare children (no guard, no chrome).
 *  - Any other /admin/* path requires an authenticated admin. Non-admins are
 *    redirected to /admin/login with a `?from=` return path.
 *  - When Firebase isn't configured we skip the guard so the UI is still
 *    navigable in dev — but mutations continue to hit the local fallback.
 */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const { user, isAdmin, loading } = useAdminAuth();

  const isLoginRoute = pathname.startsWith("/admin/login");

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    if (isLoginRoute) return;
    if (loading) return;
    if (!user || !isAdmin) {
      const target = pathname && pathname !== "/admin/login" ? pathname : "/admin";
      router.replace(`/admin/login?from=${encodeURIComponent(target)}`);
    }
  }, [isLoginRoute, loading, user, isAdmin, pathname, router]);

  if (isLoginRoute) {
    return <>{children}</>;
  }

  // Dev mode: Firebase not configured → render the admin chrome unguarded.
  if (!isFirebaseConfigured) {
    return <AdminChrome>{children}</AdminChrome>;
  }

  if (loading) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center px-4">
        <div className="flex flex-col items-center text-center">
          <Loader2
            className="h-6 w-6 animate-spin text-muted-foreground"
            aria-hidden
          />
          <p className="mt-3 text-sm text-muted-foreground">
            Checking your admin access…
          </p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center px-4">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20 dark:text-amber-300">
            <ShieldAlert className="h-6 w-6" aria-hidden />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-foreground">
            Admin access required
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Redirecting you to the sign-in page…
          </p>
          <Link href="/admin/login" className="btn-primary mt-5 h-10 px-5 text-sm">
            Go to sign-in
          </Link>
        </div>
      </div>
    );
  }

  return <AdminChrome>{children}</AdminChrome>;
}

function AdminChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 animate-fade-up">
        <p className="eyebrow">Agency control panel</p>
        <h1 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.04] tracking-tight text-foreground">
          Admin{" "}
          <span className="font-display italic font-normal text-flame">
            console
          </span>
        </h1>
      </div>

      <div className="grid gap-8 md:grid-cols-[230px_1fr]">
        <AdminSidebar />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}

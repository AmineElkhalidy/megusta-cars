"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Car,
  ClipboardList,
  ArrowLeft,
  LogOut,
  Loader2,
} from "lucide-react";
import { signOutAdmin, useAdminAuth } from "@/lib/firebase/admin-auth";
import { isFirebaseConfigured } from "@/lib/firebase/config";

const adminNav = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Bookings", href: "/admin/bookings", icon: ClipboardList },
  { label: "Fleet", href: "/admin/fleet", icon: Car },
];

/** Persistent admin nav with active-route highlighting, sign-out, and return link to the storefront. */
export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAdminAuth();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await signOutAdmin();
      router.replace("/admin/login");
    } catch (err) {
      console.error("Sign-out failed:", err);
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <aside className="md:sticky md:top-24">
      <nav
        className="rounded-2xl border border-border bg-card p-2"
        aria-label="Admin"
      >
        <ul className="space-y-0.5">
          {adminNav.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname?.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" aria-hidden />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {isFirebaseConfigured && user ? (
        <div className="mt-3 rounded-2xl border border-border bg-card p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Signed in as
          </p>
          <p
            className="mt-1 truncate text-sm font-medium text-foreground"
            title={user.email ?? undefined}
          >
            {user.email ?? "Admin"}
          </p>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="mt-3 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-full border border-border text-xs font-semibold text-muted-foreground transition-colors hover:border-red-500/40 hover:text-red-600 disabled:opacity-60 dark:hover:text-red-400"
          >
            {signingOut ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
            ) : (
              <LogOut className="h-3.5 w-3.5" aria-hidden />
            )}
            Sign out
          </button>
        </div>
      ) : null}

      <Link
        href="/"
        className="mt-3 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
        Back to site
      </Link>
    </aside>
  );
}

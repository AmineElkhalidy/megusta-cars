"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Car, ClipboardList, ArrowLeft } from "lucide-react";

const adminNav = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Bookings", href: "/admin/bookings", icon: ClipboardList },
  { label: "Fleet", href: "/admin/fleet", icon: Car },
];

/** Persistent admin nav with active-route highlighting and a return link to the storefront. */
export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="md:sticky md:top-24">
      <nav className="rounded-2xl border border-border bg-card p-2" aria-label="Admin">
        <ul className="space-y-0.5">
          {adminNav.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
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

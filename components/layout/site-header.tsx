"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { mainNav, site } from "@/lib/site-config";

/**
 * Global header: minimal branding, primary routes, and an accessible mobile drawer.
 */
export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-[17px] font-semibold tracking-tight text-foreground transition-opacity hover:opacity-70"
          onClick={() => setMobileOpen(false)}
        >
          {site.name}
        </Link>

        {/* Desktop navigation */}
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/fleet"
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Book a car
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile slide-down panel */}
      {mobileOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-border bg-background px-4 py-4 md:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile primary">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-3 text-[15px] font-medium text-foreground hover:bg-muted"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/fleet"
              className="mt-2 rounded-xl bg-primary px-3 py-3 text-center text-[15px] font-medium text-primary-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Book a car
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

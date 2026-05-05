"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { site, telLink } from "@/lib/site-config";
import { useT } from "@/lib/i18n/use-t";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

/**
 * Friendly header:
 *  - Plain-language labels (translated)
 *  - Always-visible Call button
 *  - Language switcher on the end
 *  - Mobile drawer with large tap targets
 */
export function SiteHeader() {
  const { t } = useT();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: t.nav.cars, href: "/fleet" },
    { label: t.nav.myTrips, href: "/dashboard" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-[18px] font-semibold tracking-tight text-foreground"
          onClick={() => setMobileOpen(false)}
        >
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm"
          >
            <span className="text-lg">🚗</span>
          </span>
          <span>
            Me Gusta <span className="text-primary">Cars</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />

          <a
            href={telLink()}
            aria-label={`${t.nav.callUs} ${site.phoneDisplay}`}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-primary ps-3 pe-4 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md"
          >
            <Phone className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">{t.nav.callUs}</span>
          </a>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-border bg-background px-4 py-4 md:hidden"
        >
          <nav className="flex flex-col gap-1.5" aria-label="Mobile primary">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-4 text-[17px] font-semibold text-foreground hover:bg-muted"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={telLink()}
              className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-4 text-[17px] font-semibold text-primary-foreground"
              onClick={() => setMobileOpen(false)}
            >
              <Phone className="h-4 w-4" aria-hidden />
              {t.nav.callUs} · {site.phoneDisplay}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

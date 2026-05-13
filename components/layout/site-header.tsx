"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site, telLink } from "@/lib/site-config";
import { useT } from "@/lib/i18n/use-t";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";

/**
 * Sticky header with a scroll-aware backdrop:
 *  - Glass blur intensifies after the first scroll, keeping the hero clean at top
 *  - Active-route underline on desktop nav
 *  - Polished mobile drawer with large tap targets
 */
export function SiteHeader() {
  const { t } = useT();
  const pathname = usePathname() ?? "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navItems = [
    { label: t.nav.cars, href: "/fleet" },
    { label: t.nav.myTrips, href: "/dashboard" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65"
          : "border-b border-transparent bg-background/40 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-[18px] tracking-tight text-foreground"
          onClick={() => setMobileOpen(false)}
        >
          <span
            aria-hidden
            className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary-soft text-primary-foreground shadow-md shadow-primary/30 ring-1 ring-primary/30 transition-transform group-hover:-rotate-3"
          >
            <span className="font-display text-[1.15rem] italic leading-none">
              m
            </span>
            <span
              aria-hidden
              className="absolute inset-x-0 -top-1 h-2 bg-white/30 blur-md"
            />
          </span>
          <span className="font-semibold">
            Megusta{" "}
            <span className="font-display italic font-normal text-primary">
              Cars
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary"
        >
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {active ? (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-primary to-accent"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeSwitcher />

          <a
            href={telLink()}
            aria-label={`${t.nav.callUs} ${site.phoneDisplay}`}
            className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary-soft ps-3 pe-4 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 ring-1 ring-primary/30 transition-transform hover:-translate-y-0.5 hover:shadow-lg"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
              <Phone className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="hidden sm:inline">{t.nav.callUs}</span>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -inset-x-12 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
          </a>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-card text-foreground shadow-sm md:hidden"
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
        <>
          <div
            aria-hidden
            className="fixed inset-0 top-16 bg-foreground/30 backdrop-blur-sm md:hidden sm:top-[72px]"
            onClick={() => setMobileOpen(false)}
          />
          <div
            id="mobile-nav"
            className="absolute inset-x-0 z-10 border-t border-border bg-background/95 px-4 py-5 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1.5" aria-label="Mobile primary">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-2xl px-4 py-4 text-[17px] font-semibold transition-colors ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <a
                href={telLink()}
                className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-primary to-primary-soft px-4 py-4 text-[17px] font-semibold text-primary-foreground shadow-lg shadow-primary/25"
                onClick={() => setMobileOpen(false)}
              >
                <Phone className="h-4 w-4" aria-hidden />
                {t.nav.callUs} · {site.phoneDisplay}
              </a>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}

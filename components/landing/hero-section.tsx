"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, ShieldCheck, Sparkles } from "lucide-react";
import type { QuickBookingDefaults } from "@/components/landing/quick-booking-widget";
import { QuickBookingWidget } from "@/components/landing/quick-booking-widget";
import { site, telLink } from "@/lib/site-config";
import { useT } from "@/lib/i18n/use-t";
import { formatCurrency } from "@/lib/booking-utils";
import { useCars } from "@/lib/firebase/use-cars";

type HeroSectionProps = {
  bookingDefaults: QuickBookingDefaults;
};

export function HeroSection({ bookingDefaults }: HeroSectionProps) {
  const { t } = useT();
  const { cars } = useCars();
  /** Lowest price in the fleet — shown on the floating chip over the hero photo. */
  const lowestPrice = cars.length
    ? Math.min(...cars.map((c) => c.pricePerDay))
    : 0;

  return (
    <section className="relative overflow-hidden border-b border-border bg-warm-glow">
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-12 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:px-8 lg:pb-20 lg:pt-24">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            {t.hero.tagline}
          </span>

          <h1 className="mt-5 text-[clamp(2.25rem,5.2vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-foreground">
            {t.hero.headlineBefore}{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t.hero.headlineAccent}
            </span>{" "}
            {t.hero.headlineAfter}
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {t.hero.subtitle}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/fleet"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-transform hover:-translate-y-0.5"
            >
              {t.hero.seeCars}
              <ArrowRight className="h-5 w-5 rtl:-scale-x-100" aria-hidden />
            </Link>
            <a
              href={telLink()}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-border bg-card px-7 text-base font-semibold text-foreground shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <Phone className="h-5 w-5" aria-hidden />
              {t.hero.callLabel} {site.phoneDisplay}
            </a>
          </div>

          <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden />
            {t.hero.noCard}
          </p>
        </div>

        <div className="relative animate-fade-up">
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-primary/15 ring-1 ring-border">
            <Image
              src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop"
              alt="A lovely car waiting for you"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          <div className="absolute -start-3 bottom-6 hidden animate-float items-center gap-3 rounded-2xl bg-card/95 px-4 py-3 shadow-lg ring-1 ring-border backdrop-blur sm:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-lg">
              ⭐
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t.hero.priceFrom}
              </p>
              <p className="text-lg font-semibold text-foreground">
                {formatCurrency(lowestPrice)}
                <span className="text-muted-foreground"> {t.hero.priceUnit}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto -mb-10 max-w-5xl px-4 sm:px-6 lg:-mb-14 lg:px-8">
        <div className="animate-fade-up">
          <QuickBookingWidget defaults={bookingDefaults} />
        </div>
      </div>
      <div className="h-12 lg:h-20" />
    </section>
  );
}

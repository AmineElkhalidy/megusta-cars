"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, ShieldCheck, Sparkles, Star } from "lucide-react";
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
    <section className="relative isolate overflow-hidden bg-warm-glow">
      {/* Decorative orbs — float behind the layout. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 start-[-12%] h-[26rem] w-[26rem] rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 end-[-8%] h-72 w-72 rounded-full bg-accent/20 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-12 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-8 lg:pb-20 lg:pt-24">
        <div className="animate-fade-up">
          <span className="chip-glass border border-border/60 text-[12px] font-semibold tracking-wide">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Sparkles className="h-3 w-3" aria-hidden />
            </span>
            <span className="text-foreground/80 dark:text-black">
              {t.hero.tagline}
            </span>
          </span>

          <h1 className="mt-6 text-[clamp(2.5rem,5.6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-foreground">
            {t.hero.headlineBefore}{" "}
            <span className="font-display italic font-normal text-flame">
              {t.hero.headlineAccent}
            </span>{" "}
            {t.hero.headlineAfter}
          </h1>

          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
            {t.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/fleet" className="btn-primary h-14 px-7 text-base">
              {t.hero.seeCars}
              <ArrowRight
                className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl-flip"
                aria-hidden
              />
            </Link>
            <a href={telLink()} className="btn-ghost h-14 px-7 text-base">
              <Phone className="h-5 w-5 text-primary" aria-hidden />
              {t.hero.callLabel} {site.phoneDisplay}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-success" aria-hidden />
              {t.hero.noCard}
            </span>
            <span
              aria-hidden
              className="hidden h-1 w-1 rounded-full bg-border-strong sm:inline-block"
            />
            <span className="inline-flex items-center gap-2">
              <span className="flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-current"
                    aria-hidden
                  />
                ))}
              </span>
              <span className="font-semibold text-foreground">4.9</span>
              <span>· 1,200+ trips</span>
            </span>
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:0.1s]">
          {/* Soft halo behind image */}
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-2xl"
          />

          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[2.25rem] shadow-2xl shadow-primary/20 ring-1 ring-border-strong">
            <Image
              src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop"
              alt="A lovely car waiting for you"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Top vignette for chip readability */}
            <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/30 to-transparent" />
            {/* Bottom vignette */}
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

            {/* Live availability chip — top */}
            <div className="absolute start-4 top-4 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur-md ring-1 ring-white/15">
              <span
                aria-hidden
                className="relative flex h-2 w-2 rounded-full bg-success-soft animate-pulse-ring"
              />
              Available now
            </div>
          </div>

          {/* Floating "from price" chip — flips to dark glass in dark mode
              so `text-foreground`/`text-muted-foreground` stay readable. */}
          <div className="absolute -start-3 bottom-6 hidden animate-float items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-2xl shadow-foreground/10 ring-1 ring-border backdrop-blur-md dark:bg-card/90 dark:ring-border-strong sm:flex">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 text-lg">
              ⭐
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {t.hero.priceFrom}
              </p>
              <p className="text-lg font-semibold tracking-tight text-foreground">
                {formatCurrency(lowestPrice)}
                <span className="text-sm font-normal text-muted-foreground">
                  {" "}
                  {t.hero.priceUnit}
                </span>
              </p>
            </div>
          </div>

          {/* Floating "trips" chip — top end */}
          <div className="absolute -end-2 top-10 hidden animate-float items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-2xl shadow-foreground/10 ring-1 ring-border backdrop-blur-md dark:bg-card/90 dark:ring-border-strong [animation-delay:1s] md:flex">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-success/10 text-lg">
              🛣️
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Happy trips
              </p>
              <p className="text-lg font-semibold tracking-tight text-foreground">
                12,000+
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto -mb-10 max-w-5xl px-4 sm:px-6 lg:-mb-14 lg:px-8">
        <div className="animate-fade-up [animation-delay:0.18s]">
          <QuickBookingWidget defaults={bookingDefaults} />
        </div>
      </div>
      <div className="h-12 lg:h-20" />
    </section>
  );
}

import Link from "next/link";
import type { QuickBookingDefaults } from "@/components/landing/quick-booking-widget";
import { QuickBookingWidget } from "@/components/landing/quick-booking-widget";
import { site } from "@/lib/site-config";

type HeroSectionProps = {
  bookingDefaults: QuickBookingDefaults;
};

/** Landing hero: headline, supporting copy, primary CTA, and embedded quick booking. */
export function HeroSection({ bookingDefaults }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-muted/40 via-background to-background">
      <div className="pointer-events-none absolute inset-x-0 -top-24 flex justify-center opacity-40 blur-3xl">
        <div className="h-64 w-[42rem] rounded-full bg-primary/25" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {site.tagline}
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-center text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
          Drive something you actually want.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-[17px] leading-relaxed text-muted-foreground">
          Curated fleet, all-inclusive daily rates, and a booking flow designed for
          speed — browse, choose your dates, confirm.
        </p>

        <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/fleet"
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-[15px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Explore fleet
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-8 text-[15px] font-semibold text-foreground transition-colors hover:bg-muted"
          >
            How it works
          </Link>
        </div>

        <div className="mx-auto mt-14 max-w-4xl">
          <QuickBookingWidget defaults={bookingDefaults} />
        </div>
      </div>
    </section>
  );
}

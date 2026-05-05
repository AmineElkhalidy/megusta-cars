import { HeroSection } from "@/components/landing/hero-section";
import { TrustStrip } from "@/components/landing/trust-strip";
import { HowItWorks } from "@/components/landing/how-it-works";
import { FeaturedCars } from "@/components/landing/featured-cars";
import { StatsBand } from "@/components/landing/stats-band";
import { Testimonials } from "@/components/landing/testimonials";
import { CallUsCta } from "@/components/landing/call-us-cta";
import { addCalendarDays, formatDateInputValue } from "@/lib/date-utils";

/** Friendly, scroll-worthy home: hero → trust → featured → how → stats → reviews → call us. */
export default function HomePage() {
  const today = new Date();
  const bookingDefaults = {
    pickupDate: formatDateInputValue(today),
    returnDate: formatDateInputValue(addCalendarDays(today, 3)),
  };

  return (
    <>
      <HeroSection bookingDefaults={bookingDefaults} />
      <TrustStrip />
      <HowItWorks />
      <FeaturedCars />
      <StatsBand />
      <Testimonials />
      <CallUsCta />
    </>
  );
}

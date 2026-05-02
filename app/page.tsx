import { HeroSection } from "@/components/landing/hero-section";
import { TrustStrip } from "@/components/landing/trust-strip";
import { HowItWorks } from "@/components/landing/how-it-works";
import { FeaturedCars } from "@/components/landing/featured-cars";
import { addCalendarDays, formatDateInputValue } from "@/lib/date-utils";

/** Marketing home: hero -> trust -> featured cars -> how it works. */
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
      <FeaturedCars />
      <HowItWorks />
    </>
  );
}

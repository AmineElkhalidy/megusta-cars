"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { useBookingStore } from "@/lib/store";

type CheckoutFormProps = {
  carId: string;
  carLabel: string;
  carImage: string;
  pickup: string;
  dropoff: string;
  from: string;
  to: string;
  total: number;
};

export function CheckoutForm({
  carId,
  carLabel,
  carImage,
  pickup,
  dropoff,
  from,
  to,
  total,
}: CheckoutFormProps) {
  const router = useRouter();
  const addBooking = useBookingStore((s) => s.addBooking);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const customerName = String(formData.get("fullName") ?? "");
    const customerEmail = String(formData.get("email") ?? "");
    const customerPhone = String(formData.get("phone") ?? "");

    try {
      // TODO: when Firebase env vars are in place:
      // await addDoc(collection(db, "bookings"), { ...payload });
      await new Promise((resolve) => setTimeout(resolve, 900));

      const newBooking = addBooking({
        carId,
        carLabel,
        carImage,
        customerName,
        customerEmail,
        customerPhone,
        pickupLocation: pickup,
        dropoffLocation: dropoff,
        startDate: from,
        endDate: to,
        totalAmount: total,
        status: "pending",
      });
      setBookingId(newBooking.id);
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (bookingId) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-8 text-center sm:p-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-8 w-8" aria-hidden />
        </div>
        <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
          Reservation confirmed!
        </h2>
        <p className="mt-3 max-w-md text-[15px] text-muted-foreground">
          We've held your vehicle. Our team will contact you shortly. Bring your driver's
          license to the desk and pay the full amount on pick-up.
        </p>
        <p className="mt-4 rounded-full bg-muted px-4 py-1.5 font-mono text-xs text-muted-foreground">
          Reference · {bookingId}
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-primary px-6 text-[15px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            View my bookings
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <button
            onClick={() => router.push("/fleet")}
            className="inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-[15px] font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Browse more cars
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-5 sm:p-6 lg:p-8"
    >
      <h2 className="text-lg font-semibold text-foreground">Your details</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Just the essentials to secure your booking.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
          <span className="font-medium text-foreground">Full name</span>
          <input
            type="text"
            name="fullName"
            required
            placeholder="John Doe"
            className="h-11 rounded-xl border border-border bg-background px-3 text-[15px] text-foreground outline-none ring-primary/30 transition-shadow focus:ring-2"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-foreground">Email address</span>
          <input
            type="email"
            name="email"
            required
            placeholder="john@example.com"
            className="h-11 rounded-xl border border-border bg-background px-3 text-[15px] text-foreground outline-none ring-primary/30 transition-shadow focus:ring-2"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-foreground">Phone number</span>
          <input
            type="tel"
            name="phone"
            required
            placeholder="+1 (555) 000-0000"
            className="h-11 rounded-xl border border-border bg-background px-3 text-[15px] text-foreground outline-none ring-primary/30 transition-shadow focus:ring-2"
          />
        </label>
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-8 text-[15px] font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Securing reservation...
            </>
          ) : (
            "Reserve now, pay at pick-up"
          )}
        </button>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          By clicking reserve you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </form>
  );
}

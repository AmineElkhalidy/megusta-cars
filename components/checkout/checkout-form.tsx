"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Phone, ArrowRight, MessageCircle } from "lucide-react";
import { useBookingStore } from "@/lib/store";
import { telLink, whatsappLink } from "@/lib/site-config";
import { useT } from "@/lib/i18n/use-t";

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
  const { t } = useT();
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
      alert(t.success.error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (bookingId) {
    return (
      <div className="animate-fade-up flex flex-col items-center justify-center rounded-3xl border border-border bg-card p-8 text-center shadow-sm sm:p-12">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-4xl">
          🎉
        </div>
        <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {t.success.title}
        </h2>
        <p className="mt-3 max-w-md text-[16px] leading-relaxed text-muted-foreground">
          {t.success.body}
        </p>
        <p className="mt-5 rounded-full bg-muted px-4 py-1.5 font-mono text-xs text-muted-foreground">
          {t.success.referenceLabel} · {bookingId}
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard"
            className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-transform hover:-translate-y-0.5"
          >
            {t.success.seeTrip}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
          </Link>
          <button
            onClick={() => router.push("/fleet")}
            className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-card px-6 text-base font-semibold text-foreground transition-colors hover:bg-muted"
          >
            {t.success.browseMore}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6 lg:p-8"
    >
      <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
        {t.checkout.formTitle}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {t.checkout.formSubtitle}
      </p>

      <div className="mt-6 space-y-4">
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
            {t.checkout.nameLabel}
          </span>
          <input
            type="text"
            name="fullName"
            required
            placeholder={t.checkout.namePlaceholder}
            className="h-14 rounded-2xl border border-border bg-background px-4 text-base font-medium text-foreground outline-none ring-primary/30 focus:ring-2"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span className="text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
            {t.checkout.phoneLabel}
          </span>
          <input
            type="tel"
            name="phone"
            required
            placeholder="+212 6 00 00 00 00"
            className="h-14 rounded-2xl border border-border bg-background px-4 text-base font-medium text-foreground outline-none ring-primary/30 focus:ring-2"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span className="text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
            {t.checkout.emailLabel}
          </span>
          <input
            type="email"
            name="email"
            required
            placeholder={t.checkout.emailPlaceholder}
            className="h-14 rounded-2xl border border-border bg-background px-4 text-base font-medium text-foreground outline-none ring-primary/30 focus:ring-2"
          />
        </label>
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-8 text-base font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              {t.checkout.submitting}
            </>
          ) : (
            <>
              <CheckCircle2 className="h-5 w-5" aria-hidden />
              {t.checkout.confirmButton}
            </>
          )}
        </button>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          {t.checkout.disclaimer}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-2 rounded-2xl bg-muted/50 p-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-start">
        <p className="text-sm text-muted-foreground">
          {t.checkout.alternativeLabel}
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <a
            href={telLink()}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-card px-4 py-2 text-sm font-semibold text-foreground ring-1 ring-border transition-colors hover:bg-background"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {t.checkout.callButton}
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            {t.checkout.whatsappButton}
          </a>
        </div>
      </div>
    </form>
  );
}

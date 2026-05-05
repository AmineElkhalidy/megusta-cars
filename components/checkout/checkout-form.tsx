"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Loader2,
  Phone,
  ArrowRight,
  MessageCircle,
  User,
  Mail,
} from "lucide-react";
import { useBookingStore } from "@/lib/store";
import { telLink, whatsappLink } from "@/lib/site-config";
import { useT } from "@/lib/i18n/use-t";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { createBooking } from "@/lib/firebase/bookings";
import { useCurrentUserId } from "@/lib/firebase/auth";

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
  const { uid } = useCurrentUserId();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const customerName = String(formData.get("fullName") ?? "");
    const customerEmail = String(formData.get("email") ?? "");
    const customerPhone = String(formData.get("phone") ?? "");

    const basePayload = {
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
      status: "pending" as const,
    };

    try {
      if (isFirebaseConfigured) {
        const effectiveUid = uid ?? "anonymous";
        const id = await createBooking({
          ...basePayload,
          userId: effectiveUid,
        });
        setBookingId(id);
      } else {
        // Dev fallback — persist locally so the dashboard still shows something.
        await new Promise((resolve) => setTimeout(resolve, 600));
        const newBooking = addBooking({
          ...basePayload,
          userId: uid ?? "local",
        });
        setBookingId(newBooking.id);
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert(t.success.error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (bookingId) {
    return (
      <div className="surface-card-elevated relative animate-fade-in flex flex-col items-center justify-center overflow-hidden p-8 text-center sm:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -end-20 h-64 w-64 rounded-full bg-success/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -start-12 h-56 w-56 rounded-full bg-primary/15 blur-3xl"
        />
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-success/15 to-success/25 text-4xl ring-1 ring-success/30">
            🎉
          </div>
          <h2 className="mt-6 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-[1.05] tracking-tight text-foreground">
            {t.success.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="font-display italic font-normal text-flame">
              {t.success.title.split(" ").slice(-1)}
            </span>
          </h2>
          <p className="mt-4 max-w-md text-[16px] leading-relaxed text-muted-foreground">
            {t.success.body}
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 font-mono text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
            {t.success.referenceLabel} · {bookingId}
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard"
              className="btn-primary group h-12 px-6 text-sm"
            >
              {t.success.seeTrip}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl-flip"
                aria-hidden
              />
            </Link>
            <button
              onClick={() => router.push("/fleet")}
              className="btn-ghost h-12 px-6 text-sm"
            >
              {t.success.browseMore}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="surface-card-elevated p-5 sm:p-6 lg:p-8"
    >
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        {t.checkout.formTitle}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {t.checkout.formSubtitle}
      </p>

      <div className="mt-6 space-y-4">
        <FieldLabel
          icon={<User className="h-3.5 w-3.5" aria-hidden />}
          label={t.checkout.nameLabel}
        >
          <input
            type="text"
            name="fullName"
            required
            placeholder={t.checkout.namePlaceholder}
            className="h-14 w-full rounded-2xl border border-border-strong bg-background px-4 text-base font-medium text-foreground outline-none transition-shadow placeholder:text-muted-foreground/70 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
          />
        </FieldLabel>

        <FieldLabel
          icon={<Phone className="h-3.5 w-3.5" aria-hidden />}
          label={t.checkout.phoneLabel}
        >
          <input
            type="tel"
            name="phone"
            required
            placeholder="+212 6 00 00 00 00"
            className="h-14 w-full rounded-2xl border border-border-strong bg-background px-4 text-base font-medium text-foreground outline-none transition-shadow placeholder:text-muted-foreground/70 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
          />
        </FieldLabel>

        <FieldLabel
          icon={<Mail className="h-3.5 w-3.5" aria-hidden />}
          label={t.checkout.emailLabel}
        >
          <input
            type="email"
            name="email"
            required
            placeholder={t.checkout.emailPlaceholder}
            className="h-14 w-full rounded-2xl border border-border-strong bg-background px-4 text-base font-medium text-foreground outline-none transition-shadow placeholder:text-muted-foreground/70 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
          />
        </FieldLabel>
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary h-14 w-full text-base disabled:cursor-not-allowed disabled:opacity-70"
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

      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-border bg-muted/50 p-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-start">
        <p className="text-sm text-muted-foreground">
          {t.checkout.alternativeLabel}
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <a
            href={telLink()}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border-strong bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-background"
          >
            <Phone className="h-4 w-4 text-primary" aria-hidden />
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

function FieldLabel({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </span>
      {children}
    </label>
  );
}

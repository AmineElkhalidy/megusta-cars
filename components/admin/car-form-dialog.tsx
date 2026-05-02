"use client";

import { X } from "lucide-react";
import { useEffect, type FormEvent } from "react";
import type { Car, CarStatus, FuelType, Transmission } from "@/lib/types";

type CarFormDialogProps = {
  open: boolean;
  initial?: Car | null;
  onClose: () => void;
  onSubmit: (car: Omit<Car, "id">) => void;
};

const TRANSMISSIONS: Transmission[] = ["Automatic", "Manual"];
const FUELS: FuelType[] = ["Gasoline", "Diesel", "Electric", "Hybrid"];
const STATUSES: CarStatus[] = ["available", "rented", "maintenance"];

/** Modal form for adding & editing cars in the admin fleet management page. */
export function CarFormDialog({
  open,
  initial,
  onClose,
  onSubmit,
}: CarFormDialogProps) {
  // Lock body scroll while open and close on escape key for keyboard users.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const features = String(fd.get("features") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const car: Omit<Car, "id"> = {
      make: String(fd.get("make")),
      model: String(fd.get("model")),
      year: Number(fd.get("year")),
      type: String(fd.get("type")),
      transmission: String(fd.get("transmission")) as Transmission,
      fuel: String(fd.get("fuel")) as FuelType,
      seats: Number(fd.get("seats")),
      doors: Number(fd.get("doors")),
      airConditioning: fd.get("ac") === "on",
      pricePerDay: Number(fd.get("pricePerDay")),
      imageUrl: String(fd.get("imageUrl")),
      features,
      description: String(fd.get("description") ?? "") || undefined,
      status: String(fd.get("status")) as CarStatus,
    };
    onSubmit(car);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h3 className="text-base font-semibold text-foreground">
            {initial ? "Edit car" : "Add car"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-h-[70vh] overflow-y-auto p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Make" name="make" defaultValue={initial?.make} required />
            <Field
              label="Model"
              name="model"
              defaultValue={initial?.model}
              required
            />
            <Field
              label="Year"
              name="year"
              type="number"
              defaultValue={initial?.year ?? new Date().getFullYear()}
              required
            />
            <Field
              label="Type"
              name="type"
              defaultValue={initial?.type ?? "Sedan"}
              required
              placeholder="Sedan, SUV, Coupe, Hatchback"
            />

            <Select
              label="Transmission"
              name="transmission"
              options={TRANSMISSIONS}
              defaultValue={initial?.transmission ?? "Automatic"}
            />
            <Select
              label="Fuel"
              name="fuel"
              options={FUELS}
              defaultValue={initial?.fuel ?? "Gasoline"}
            />

            <Field
              label="Seats"
              name="seats"
              type="number"
              defaultValue={initial?.seats ?? 5}
              required
            />
            <Field
              label="Doors"
              name="doors"
              type="number"
              defaultValue={initial?.doors ?? 4}
              required
            />

            <Field
              label="Price per day (USD)"
              name="pricePerDay"
              type="number"
              defaultValue={initial?.pricePerDay ?? 80}
              required
            />
            <Select
              label="Status"
              name="status"
              options={STATUSES}
              defaultValue={initial?.status ?? "available"}
            />

            <Field
              label="Image URL"
              name="imageUrl"
              defaultValue={initial?.imageUrl}
              required
              placeholder="https://images.unsplash.com/…"
              className="sm:col-span-2"
            />

            <Field
              label="Features (comma separated)"
              name="features"
              defaultValue={initial?.features.join(", ")}
              placeholder="AWD, Sunroof, Apple CarPlay"
              className="sm:col-span-2"
            />

            <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
              <span className="font-medium text-foreground">Description</span>
              <textarea
                name="description"
                rows={3}
                defaultValue={initial?.description ?? ""}
                placeholder="A short blurb shown on the details page."
                className="rounded-xl border border-border bg-background px-3 py-2 text-[15px] text-foreground outline-none ring-primary/30 transition-shadow focus:ring-2"
              />
            </label>

            <label className="flex items-center gap-2 text-sm sm:col-span-2">
              <input
                type="checkbox"
                name="ac"
                defaultChecked={initial?.airConditioning ?? true}
                className="h-4 w-4 rounded border-border accent-primary"
              />
              <span className="text-foreground">Air conditioning</span>
            </label>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 items-center justify-center rounded-full border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {initial ? "Save changes" : "Add car"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  required?: boolean;
  placeholder?: string;
  className?: string;
};

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
  placeholder,
  className,
}: FieldProps) {
  return (
    <label className={`flex flex-col gap-1.5 text-sm ${className ?? ""}`}>
      <span className="font-medium text-foreground">{label}</span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="h-11 rounded-xl border border-border bg-background px-3 text-[15px] text-foreground outline-none ring-primary/30 transition-shadow focus:ring-2"
      />
    </label>
  );
}

type SelectProps = {
  label: string;
  name: string;
  options: readonly string[];
  defaultValue?: string;
};

function Select({ label, name, options, defaultValue }: SelectProps) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-foreground">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="h-11 rounded-xl border border-border bg-background px-3 text-[15px] text-foreground outline-none ring-primary/30 transition-shadow focus:ring-2"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

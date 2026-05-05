"use client";

import { ImagePlus, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import type { Car, CarStatus, FuelType, Transmission } from "@/lib/types";

export type CarFormSubmitPayload = {
  car: Omit<Car, "id">;
  /** New files to upload (Firebase). First file becomes cover after upload. */
  imageFiles: File[];
};

type CarFormDialogProps = {
  open: boolean;
  initial?: Car | null;
  onClose: () => void;
  onSubmit: (payload: CarFormSubmitPayload) => void | Promise<void>;
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
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setImageFiles([]);
  }, [open, initial?.id]);

  useEffect(() => {
    const urls = imageFiles.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [imageFiles]);

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

  function onPickFiles(files: FileList | null) {
    if (!files?.length) return;
    setImageFiles((prev) => [...prev, ...Array.from(files)]);
  }

  function removePickedFile(index: number) {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const features = String(fd.get("features") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const imageUrlRaw = String(fd.get("imageUrl") ?? "").trim();
    const galleryUrls = String(fd.get("galleryUrls") ?? "")
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean);

    const hasCover =
      Boolean(imageUrlRaw) ||
      Boolean(initial?.imageUrl) ||
      imageFiles.length > 0;

    if (!hasCover) {
      window.alert(
        "Add a cover image: paste an image URL or upload at least one photo."
      );
      return;
    }

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
      imageUrl: imageUrlRaw || initial?.imageUrl || "",
      images: galleryUrls.length ? galleryUrls : initial?.images,
      features,
      description: String(fd.get("description") ?? "") || undefined,
      status: String(fd.get("status")) as CarStatus,
    };

    setSaving(true);
    try {
      await Promise.resolve(onSubmit({ car, imageFiles }));
    } finally {
      setSaving(false);
    }
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
              label="Price per day (DH)"
              name="pricePerDay"
              type="number"
              defaultValue={initial?.pricePerDay ?? 800}
              required
            />
            <Select
              label="Status"
              name="status"
              options={STATUSES}
              defaultValue={initial?.status ?? "available"}
            />

            <div className="sm:col-span-2">
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium text-foreground">
                  Cover image URL{" "}
                  <span className="font-normal text-muted-foreground">
                    (optional if you upload photos below)
                  </span>
                </span>
                <input
                  type="url"
                  name="imageUrl"
                  defaultValue={initial?.imageUrl}
                  placeholder="https://…"
                  className="h-11 rounded-xl border border-border bg-background px-3 text-[15px] text-foreground outline-none ring-primary/30 transition-shadow focus:ring-2"
                />
              </label>
            </div>

            <div className="rounded-xl border border-border bg-muted/30 p-4 sm:col-span-2">
              <p className="text-sm font-medium text-foreground">
                Upload photos
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                First photo becomes the cover. Max 5 MB each — JPG, PNG, WebP,
                or GIF. Requires Firebase and admin sign-in.
              </p>
              <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
                <ImagePlus className="h-4 w-4" aria-hidden />
                Choose files
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  multiple
                  className="sr-only"
                  onChange={(ev) => {
                    onPickFiles(ev.target.files);
                    ev.target.value = "";
                  }}
                />
              </label>
              {previews.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-3">
                  {previews.map((src, i) => (
                    <li
                      key={`${src}-${i}`}
                      className="relative h-20 w-28 overflow-hidden rounded-lg border border-border bg-background"
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="112px"
                        unoptimized
                      />
                      <button
                        type="button"
                        onClick={() => removePickedFile(i)}
                        className="absolute end-1 top-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
                        aria-label="Remove photo"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                      {i === 0 ? (
                        <span className="absolute start-1 bottom-1 rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                          Cover
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
              <span className="font-medium text-foreground">
                Extra gallery URLs{" "}
                <span className="font-normal text-muted-foreground">
                  (optional, one per line)
                </span>
              </span>
              <textarea
                name="galleryUrls"
                rows={2}
                defaultValue={initial?.images?.join("\n") ?? ""}
                placeholder="https://…"
                className="rounded-xl border border-border bg-background px-3 py-2 text-[15px] text-foreground outline-none ring-primary/30 transition-shadow focus:ring-2"
              />
            </label>

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
              disabled={saving}
              className="inline-flex h-11 items-center justify-center rounded-full border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:bg-muted disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-70"
            >
              {saving ? "Saving…" : initial ? "Save changes" : "Add car"}
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

"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useFleetStore, useStoreHydration } from "@/lib/store";
import { formatCurrency } from "@/lib/booking-utils";
import { CarFormDialog } from "@/components/admin/car-form-dialog";
import type { Car, CarStatus } from "@/lib/types";

const STATUS_TONE: Record<CarStatus, string> = {
  available: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  rented: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  maintenance: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
};

const STATUS_OPTIONS: CarStatus[] = ["available", "rented", "maintenance"];

export function AdminFleet() {
  const hydrated = useStoreHydration();
  const cars = useFleetStore((s) => s.cars);
  const addCar = useFleetStore((s) => s.addCar);
  const updateCar = useFleetStore((s) => s.updateCar);
  const removeCar = useFleetStore((s) => s.removeCar);
  const setStatus = useFleetStore((s) => s.setStatus);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Car | null>(null);

  if (!hydrated) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">
        Loading fleet…
      </div>
    );
  }

  function openAdd() {
    setEditing(null);
    setDialogOpen(true);
  }
  function openEdit(car: Car) {
    setEditing(car);
    setDialogOpen(true);
  }

  function handleSubmit(payload: Omit<Car, "id">) {
    if (editing) {
      updateCar(editing.id, payload);
    } else {
      addCar(payload);
    }
    setDialogOpen(false);
    setEditing(null);
  }

  function handleRemove(car: Car) {
    if (
      typeof window !== "undefined" &&
      window.confirm(`Remove ${car.make} ${car.model} from the fleet?`)
    ) {
      removeCar(car.id);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {cars.length} {cars.length === 1 ? "car" : "cars"} in the fleet
        </p>
        <button
          type="button"
          onClick={openAdd}
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" aria-hidden />
          Add car
        </button>
      </div>

      {cars.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center text-sm text-muted-foreground">
          Your fleet is empty — add your first car to start accepting bookings.
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cars.map((car) => (
            <li
              key={car.id}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={car.imageUrl}
                  alt={`${car.make} ${car.model}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
                <span
                  className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${STATUS_TONE[car.status]}`}
                >
                  {car.status}
                </span>
              </div>

              <div className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-foreground">
                      {car.make} {car.model}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {car.year} · {car.type}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {formatCurrency(car.pricePerDay)}
                    <span className="font-normal text-muted-foreground"> / day</span>
                  </p>
                </div>

                <label className="flex flex-col gap-1.5 text-xs">
                  <span className="font-medium text-muted-foreground">Status</span>
                  <select
                    value={car.status}
                    onChange={(e) =>
                      setStatus(car.id, e.target.value as CarStatus)
                    }
                    className="h-9 rounded-lg border border-border bg-background px-2.5 text-sm text-foreground outline-none ring-primary/30 focus:ring-2"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => openEdit(car)}
                    className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full border border-border text-xs font-semibold text-foreground transition-colors hover:bg-muted"
                  >
                    <Pencil className="h-3.5 w-3.5" aria-hidden />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(car)}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-border px-3 text-xs font-semibold text-muted-foreground transition-colors hover:border-red-500/40 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden />
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <CarFormDialog
        open={dialogOpen}
        initial={editing}
        onClose={() => {
          setDialogOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

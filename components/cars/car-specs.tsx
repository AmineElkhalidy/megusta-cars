"use client";

import {
  Cog,
  Fuel,
  Users,
  DoorOpen,
  Snowflake,
  CalendarDays,
  type LucideIcon,
} from "lucide-react";
import type { Car } from "@/lib/types";
import { useT } from "@/lib/i18n/use-t";

type Spec = { icon: LucideIcon; label: string; value: string };

export function CarSpecs({ car }: { car: Car }) {
  const { t } = useT();
  const transmissionLabel =
    t.cars.options.transmission[car.transmission] ?? car.transmission;
  const fuelLabel = t.cars.options.fuel[car.fuel] ?? car.fuel;

  const specs: Spec[] = [
    { icon: Cog, label: t.carDetails.specs.transmission, value: transmissionLabel },
    { icon: Fuel, label: t.carDetails.specs.fuel, value: fuelLabel },
    { icon: Users, label: t.carDetails.specs.seats, value: `${car.seats}` },
    { icon: DoorOpen, label: t.carDetails.specs.doors, value: `${car.doors}` },
    {
      icon: Snowflake,
      label: t.carDetails.specs.climate,
      value: car.airConditioning
        ? t.carDetails.specs.ac
        : t.carDetails.specs.noAc,
    },
    { icon: CalendarDays, label: t.carDetails.specs.year, value: `${car.year}` },
  ];

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {specs.map((spec) => (
        <li
          key={spec.label}
          className="rounded-2xl border border-border bg-card p-4"
        >
          <spec.icon className="h-5 w-5 text-muted-foreground" aria-hidden />
          <p className="mt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {spec.label}
          </p>
          <p className="mt-1 text-sm font-medium text-foreground">{spec.value}</p>
        </li>
      ))}
    </ul>
  );
}

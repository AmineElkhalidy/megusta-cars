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

type Spec = { icon: LucideIcon; label: string; value: string };

/** Compact icon grid summarizing the key specs of a car. */
export function CarSpecs({ car }: { car: Car }) {
  const specs: Spec[] = [
    { icon: Cog, label: "Transmission", value: car.transmission },
    { icon: Fuel, label: "Fuel", value: car.fuel },
    { icon: Users, label: "Seats", value: `${car.seats}` },
    { icon: DoorOpen, label: "Doors", value: `${car.doors}` },
    {
      icon: Snowflake,
      label: "Climate",
      value: car.airConditioning ? "Air Conditioning" : "Manual",
    },
    { icon: CalendarDays, label: "Year", value: `${car.year}` },
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

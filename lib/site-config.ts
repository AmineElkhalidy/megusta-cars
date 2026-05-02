/**
 * Central copy and navigation used across marketing layout components.
 * Keeps URLs and labels consistent as the app grows.
 */

export const site = {
  name: "Me Gusta Cars",
  tagline: "Rent in three taps.",
  description:
    "Premium cars, transparent pricing, and booking that stays out of your way.",
} as const;

export type NavItem = { label: string; href: string };

/** Primary navigation shown in the header (desktop + mobile). */
export const mainNav: NavItem[] = [
  { label: "Fleet", href: "/fleet" },
  { label: "My bookings", href: "/dashboard" },
  { label: "Admin", href: "/admin" },
];

/** Pick-up / drop-off options for the quick booking widget. Replace with API data later. */
export const rentalLocations: readonly string[] = [
  "City center desk",
  "Airport terminal",
  "Train station",
];

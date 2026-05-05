/**
 * Central copy and navigation shared across the marketing + dashboard shell.
 * Labels are intentionally plain so non-technical users instantly understand them.
 */

export const site = {
  name: "Megusta Cars",
  tagline: "Rent a car in three easy steps.",
  description:
    "Friendly car rental. Simple prices. No credit card needed — just pay when you pick up.",
  /** Business phone number. Use digits only (international format) for tel:/WhatsApp. */
  phone: "+212600000000",
  phoneDisplay: "+212 600 000 000",
  whatsappMessage: "Hi! I'd like to rent a car.",
} as const;

export type NavItem = { label: string; href: string };

/** Public navigation shown in the header. Admin intentionally stays out of main nav. */
export const mainNav: NavItem[] = [
  { label: "Cars", href: "/fleet" },
  { label: "My trips", href: "/dashboard" },
];

/** Pick-up / drop-off options for the quick booking widget. */
export const rentalLocations: readonly string[] = [
  "City center desk",
  "Airport terminal",
  "Train station",
];

/** Generate the WhatsApp deep-link used by Call/Chat buttons. */
export function whatsappLink(message: string = site.whatsappMessage): string {
  const number = site.phone.replace(/[^\d]/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Generate a `tel:` link for one-tap dialling on mobile. */
export function telLink(): string {
  return `tel:${site.phone}`;
}

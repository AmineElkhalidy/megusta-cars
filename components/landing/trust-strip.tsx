import { ShieldCheck, Wallet, Clock4, MapPin } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Insured fleet" },
  { icon: Wallet, label: "No card required" },
  { icon: Clock4, label: "24/7 support" },
  { icon: MapPin, label: "City + airport pick-up" },
] as const;

/** Quick reassurance row beneath the hero. */
export function TrustStrip() {
  return (
    <section className="border-y border-border bg-background">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden bg-border md:grid-cols-4">
        {items.map((item) => (
          <li
            key={item.label}
            className="flex items-center justify-center gap-2 bg-background px-4 py-5 text-sm text-muted-foreground"
          >
            <item.icon className="h-4 w-4 text-primary" aria-hidden />
            <span className="font-medium">{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

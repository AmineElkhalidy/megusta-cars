"use client";

import {
  ShieldCheck,
  Wallet,
  Clock4,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";
import { useT } from "@/lib/i18n/use-t";

const ICONS: LucideIcon[] = [Wallet, ShieldCheck, Clock4, HeartHandshake];

/**
 * Pill-row of trust signals — sits below the hero. Hovering each pill lifts
 * the card slightly and bumps the icon, adding a tactile "alive" feel without
 * being noisy.
 */
export function TrustStrip() {
  const { t } = useT();

  return (
    <section className="border-y border-border/60 bg-background/40">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {t.trust.items.map((item, idx) => {
            const Icon = ICONS[idx] ?? ShieldCheck;
            return (
              <li
                key={item.label}
                className="group flex items-center gap-3 rounded-2xl border border-border bg-card/70 px-4 py-3 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-border-strong hover:shadow-md hover:shadow-foreground/5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/12 to-accent/15 text-primary ring-1 ring-primary/15 transition-transform group-hover:-rotate-6">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    {item.label}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {item.hint}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

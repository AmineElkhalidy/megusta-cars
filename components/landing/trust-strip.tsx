"use client";

import { ShieldCheck, Wallet, Clock4, HeartHandshake, type LucideIcon } from "lucide-react";
import { useT } from "@/lib/i18n/use-t";

const ICONS: LucideIcon[] = [Wallet, ShieldCheck, Clock4, HeartHandshake];

export function TrustStrip() {
  const { t } = useT();

  return (
    <section className="border-t border-border bg-background">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden bg-border md:grid-cols-4">
        {t.trust.items.map((item, idx) => {
          const Icon = ICONS[idx] ?? ShieldCheck;
          return (
            <li
              key={item.label}
              className="flex items-center gap-3 bg-background px-5 py-5 sm:py-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground">{item.hint}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

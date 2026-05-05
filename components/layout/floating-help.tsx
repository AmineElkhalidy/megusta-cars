"use client";

import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site-config";
import { useT } from "@/lib/i18n/use-t";

/**
 * Persistent WhatsApp help button. Positioned with logical properties so it
 * automatically swaps to the left side in RTL (Darija) without extra code.
 */
export function FloatingHelp() {
  const { t } = useT();
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.floatingHelp.chat}
      className="group fixed bottom-5 end-5 z-40 flex items-center gap-2 overflow-hidden rounded-full bg-emerald-500 ps-4 pe-5 py-3 text-sm font-semibold text-white shadow-xl shadow-emerald-500/30 ring-1 ring-emerald-400/40 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-emerald-500/40 sm:bottom-6 sm:end-6"
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/30">
        <MessageCircle className="h-4 w-4" aria-hidden />
        <span
          aria-hidden
          className="absolute inset-0 rounded-full animate-pulse-ring"
        />
      </span>
      <span className="hidden sm:inline">{t.floatingHelp.chat}</span>
      <span className="sm:hidden">{t.floatingHelp.short}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -inset-x-12 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
    </a>
  );
}

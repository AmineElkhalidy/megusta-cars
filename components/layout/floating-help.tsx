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
      className="group fixed bottom-5 end-5 z-40 flex items-center gap-2 rounded-full bg-emerald-500 ps-4 pe-5 py-3 text-sm font-semibold text-white shadow-xl shadow-emerald-500/30 transition-all hover:-translate-y-0.5 hover:shadow-2xl sm:bottom-6 sm:end-6"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
        <MessageCircle className="h-4 w-4" aria-hidden />
      </span>
      <span className="hidden sm:inline">{t.floatingHelp.chat}</span>
      <span className="sm:hidden">{t.floatingHelp.short}</span>
      <span
        aria-hidden
        className="absolute -end-0.5 -top-0.5 flex h-3 w-3 animate-float rounded-full bg-accent ring-2 ring-white"
      />
    </a>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Globe } from "lucide-react";
import { useT } from "@/lib/i18n/use-t";
import { LOCALES, LOCALE_META, type Locale } from "@/lib/i18n/types";

/**
 * Compact language dropdown. Shows the current locale's short code on the button
 * and native names in the menu so speakers instantly recognise their language.
 */
export function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const { locale, setLocale, t } = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = LOCALE_META[locale];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        aria-label={t.language.choose}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-sm font-semibold text-foreground shadow-sm transition-transform hover:-translate-y-0.5"
      >
        <Globe className="h-4 w-4" aria-hidden />
        <span className="tabular-nums">{current.short}</span>
      </button>

      {open ? (
        <ul
          role="menu"
          className="absolute end-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-border bg-card p-1 shadow-xl"
        >
          {LOCALES.map((code) => {
            const meta = LOCALE_META[code];
            const active = code === locale;
            return (
              <li key={code}>
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => {
                    setLocale(code as Locale);
                    setOpen(false);
                  }}
                  lang={meta.htmlLang}
                  dir={meta.dir}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-start text-sm transition-colors ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <span className="font-medium">{meta.nativeName}</span>
                  {active ? (
                    <Check className="h-4 w-4" aria-hidden />
                  ) : (
                    <span className="text-xs text-muted-foreground">{meta.short}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

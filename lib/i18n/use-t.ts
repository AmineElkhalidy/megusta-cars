"use client";

import { useLocaleStore } from "./store";
import { translations, type Dictionary } from "./translations";
import type { Locale } from "./types";

type UseTResult = {
  /** Full dictionary for the current locale. Access fields directly: `t.nav.cars`. */
  t: Dictionary;
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

/**
 * Single access point for copy + locale from any client component.
 * Returns the full dictionary (not a getter function) so TypeScript helps
 * authors avoid typos: `t.hero.seeCars` is autocompleted, `t.hero.foo` errors.
 */
export function useT(): UseTResult {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);
  return { t: translations[locale], locale, setLocale };
}

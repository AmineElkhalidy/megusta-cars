import { useLocaleContext } from "./store";
import { translations, type Dictionary } from "./translations";
import type { Locale } from "./types";

type UseTResult = {
  /** Full dictionary for the current locale. Access fields directly: `t.fleet.eyebrow`. */
  t: Dictionary;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** True for Arabic Darija. Use to nudge text alignment in mixed views. */
  isRtl: boolean;
};

/**
 * Single access point for copy + locale from any screen. Returning the full
 * dictionary (not a getter) lets TypeScript catch typos: `t.fleet.eyebrow` is
 * autocompleted, `t.fleet.foo` errors at compile time.
 */
export function useT(): UseTResult {
  const { locale, setLocale } = useLocaleContext();
  return {
    t: translations[locale],
    locale,
    setLocale,
    isRtl: locale === "ar",
  };
}

export type Locale = "ar" | "fr" | "en";

/**
 * Display metadata for each supported locale. Mirrors the web app so the brand
 * speaks the same way on both surfaces — Darija comes first because most of
 * our customers in Morocco read it natively.
 */
export const LOCALE_META: Record<
  Locale,
  {
    code: Locale;
    /** Name written in the locale's own script (e.g. "العربية"). */
    nativeName: string;
    /** Short tag shown in the compact switcher. */
    short: string;
    /** Writing direction — used to nudge text alignment in mixed surfaces. */
    dir: "ltr" | "rtl";
  }
> = {
  ar: { code: "ar", nativeName: "الدارجة", short: "AR", dir: "rtl" },
  fr: { code: "fr", nativeName: "Français", short: "FR", dir: "ltr" },
  en: { code: "en", nativeName: "English", short: "EN", dir: "ltr" },
};

/** Display order in the language switcher — Darija first by design. */
export const LOCALES: readonly Locale[] = ["ar", "fr", "en"];

/** App-wide default. Matches Megusta's primary audience. */
export const DEFAULT_LOCALE: Locale = "ar";

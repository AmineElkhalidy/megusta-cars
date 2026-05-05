export type Locale = "en" | "fr" | "ar";

/** Display metadata for each supported locale. */
export const LOCALE_META: Record<
  Locale,
  {
    code: Locale;
    /** Name written in the locale's own script (e.g. "العربية"). */
    nativeName: string;
    /** Short tag shown in the compact switcher. */
    short: string;
    /** Writing direction for the <html> element. */
    dir: "ltr" | "rtl";
    /** Used when setting `document.documentElement.lang`. */
    htmlLang: string;
  }
> = {
  en: { code: "en", nativeName: "English", short: "EN", dir: "ltr", htmlLang: "en" },
  fr: { code: "fr", nativeName: "Français", short: "FR", dir: "ltr", htmlLang: "fr" },
  ar: { code: "ar", nativeName: "الدارجة", short: "AR", dir: "rtl", htmlLang: "ar-MA" },
};

export const LOCALES: readonly Locale[] = ["en", "fr", "ar"];

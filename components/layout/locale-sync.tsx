"use client";

import { useEffect } from "react";
import { useLocaleStore } from "@/lib/i18n/store";
import { LOCALE_META } from "@/lib/i18n/types";

/**
 * Keeps `<html lang>` and `<html dir>` in sync with the selected locale
 * after every switch. The initial values are set by the inline script in
 * `app/layout.tsx` so there is no flash between SSR and hydration.
 */
export function LocaleSync() {
  const locale = useLocaleStore((s) => s.locale);

  useEffect(() => {
    const meta = LOCALE_META[locale];
    document.documentElement.lang = meta.htmlLang;
    document.documentElement.dir = meta.dir;
  }, [locale]);

  return null;
}

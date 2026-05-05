"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locale } from "./types";

type LocaleStore = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

/**
 * Persisted locale preference. Stored in localStorage so the user's language
 * survives page reloads and is picked up by the early `<html dir>` script.
 */
export const useLocaleStore = create<LocaleStore>()(
  persist(
    (set) => ({
      locale: "en",
      setLocale: (locale) => set({ locale }),
    }),
    { name: "megusta-locale" }
  )
);

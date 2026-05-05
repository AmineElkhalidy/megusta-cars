import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { I18nManager, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";
import { DEFAULT_LOCALE, type Locale } from "./types";

type LocaleContextValue = {
  locale: Locale;
  /** Persists the choice and reloads the app if writing direction must flip. */
  setLocale: (locale: Locale) => Promise<void>;
  /** True until AsyncStorage has been read once at startup. */
  hydrated: boolean;
  /** True while the app is rebooting to apply a direction change. */
  switching: boolean;
};

const STORAGE_KEY = "megusta-locale";

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: async () => {},
  hydrated: false,
  switching: false,
});

function isLocale(value: unknown): value is Locale {
  return value === "ar" || value === "fr" || value === "en";
}

function isRtlLocale(locale: Locale): boolean {
  return locale === "ar";
}

/**
 * Aligns RN's I18nManager direction with the given locale. `forceRTL` is a
 * native flag that only takes effect on next mount, so when the direction
 * actually has to change we kick the JS bundle with `Updates.reloadAsync()`.
 *
 * Returns true when a reload was triggered — callers can stop further work,
 * the app is about to bounce.
 */
async function syncDirection(locale: Locale): Promise<boolean> {
  // Only native surfaces have an `I18nManager` flag worth flipping. On web,
  // Arabic text already flows RTL inside its containers; full layout mirroring
  // is the browser's job, not ours.
  if (Platform.OS === "web") return false;

  const needsRtl = isRtlLocale(locale);
  if (I18nManager.isRTL === needsRtl) return false;

  I18nManager.allowRTL(needsRtl);
  I18nManager.forceRTL(needsRtl);

  try {
    await Updates.reloadAsync();
    return true;
  } catch {
    // Last-ditch fallback for dev clients where expo-updates can't reload.
    try {
      const RN = require("react-native") as typeof import("react-native");
      RN.DevSettings?.reload?.();
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Persists the user's language choice across launches via AsyncStorage and
 * keeps RN's writing direction in lockstep. Default is Darija (`ar`) because
 * Megusta's primary audience reads Arabic natively; users can switch to French
 * or English from the Profile screen and the app will reload to flip layouts.
 */
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [hydrated, setHydrated] = useState(false);
  const [switching, setSwitching] = useState(false);
  const reloadedOnceRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      let stored: Locale | null = null;
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (isLocale(raw)) stored = raw;
      } catch {
        // AsyncStorage failures are non-fatal — fall back to the default.
      }

      if (cancelled) return;

      const next = stored ?? DEFAULT_LOCALE;
      setLocaleState(next);

      // If the device's current direction doesn't match this locale, kick off
      // a one-shot reload so layouts come back mirrored. We guard with a ref
      // so we never loop if `forceRTL` silently fails.
      const needsReload =
        Platform.OS !== "web" &&
        isRtlLocale(next) !== I18nManager.isRTL &&
        !reloadedOnceRef.current;

      if (needsReload) {
        reloadedOnceRef.current = true;
        setSwitching(true);
        await syncDirection(next);
        if (!cancelled) {
          // Reached only if reload actually failed; let the UI keep going.
          setSwitching(false);
          setHydrated(true);
        }
      } else {
        setHydrated(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const setLocale = useCallback(async (next: Locale) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Best-effort persistence — still update state and direction.
    }

    const directionWillChange =
      Platform.OS !== "web" && isRtlLocale(next) !== I18nManager.isRTL;

    if (directionWillChange) {
      setSwitching(true);
      // `syncDirection` triggers a reload that never resolves on success;
      // anything after it only runs if the reload mechanism failed.
      const reloaded = await syncDirection(next);
      if (!reloaded) {
        setSwitching(false);
        setLocaleState(next);
      }
    } else {
      setLocaleState(next);
    }
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, hydrated, switching }),
    [locale, setLocale, hydrated, switching]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  return useContext(LocaleContext);
}

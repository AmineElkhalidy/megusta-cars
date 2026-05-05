import { Platform, type TextStyle, type ViewStyle } from "react-native";

/**
 * Megusta Cars mobile design tokens. Mirrors the web app's flame palette so
 * the brand feels like one product across surfaces.
 *
 * Use the `theme` export everywhere instead of hard-coding hex values.
 */

const palette = {
  // Surfaces
  background: "#fbf7f1",
  backgroundSoft: "#f5ede1",
  card: "#ffffff",
  cardElevated: "#ffffff",
  muted: "#f1e9dc",
  mutedSoft: "#f7f0e2",

  // Text
  foreground: "#15110d",
  foregroundSoft: "#2b231c",
  mutedForeground: "#756859",

  // Borders (solid hex equivalents of the web rgba tokens)
  border: "#e7dfd1",
  borderStrong: "#d4c8b3",

  // Brand
  primary: "#dc4a13",
  primarySoft: "#fb6f3d",
  primaryForeground: "#ffffff",
  primaryTint: "#fee9dc",
  accent: "#f59e0b",
  accentSoft: "#fbbf24",
  accentTint: "#fef3c7",
  rose: "#f472b6",

  // Ink (deep dark sections — overview, CTA panels)
  ink: "#14100c",
  inkSoft: "#1f1812",
  inkForeground: "#f5ede0",
  inkMuted: "#b6a896",

  // States
  success: "#059669",
  successSoft: "#34d399",
  successTint: "#d1fae5",
  warning: "#d97706",
  warningTint: "#fef3c7",
  danger: "#dc2626",
  dangerSoft: "#ef4444",
  dangerTint: "#fee2e2",
  info: "#2563eb",
  infoTint: "#dbeafe",

  // Pure
  white: "#ffffff",
  black: "#000000",
  transparent: "transparent",
} as const;

const fontFamily = {
  body: Platform.select({
    ios: "System",
    android: "sans-serif",
    default: "System",
  }),
  /** Editorial serif used for italic accents — matches the web's Instrument Serif. */
  display: Platform.select({
    ios: "Georgia",
    android: "serif",
    default: "Georgia",
  }),
  mono: Platform.select({
    ios: "Menlo",
    android: "monospace",
    default: "monospace",
  }),
} as const;

const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
  "4xl": 56,
  "5xl": 72,
} as const;

const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 28,
  full: 9999,
} as const;

const fontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 28,
  "4xl": 34,
  "5xl": 44,
} as const;

const fontWeight: Record<string, TextStyle["fontWeight"]> = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
};

const shadows: Record<"sm" | "md" | "lg" | "xl" | "primary", ViewStyle> = {
  sm: {
    shadowColor: "#15110d",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#15110d",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  lg: {
    shadowColor: "#15110d",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.12,
    shadowRadius: 26,
    elevation: 8,
  },
  xl: {
    shadowColor: "#15110d",
    shadowOffset: { width: 0, height: 22 },
    shadowOpacity: 0.18,
    shadowRadius: 38,
    elevation: 14,
  },
  primary: {
    shadowColor: "#dc4a13",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.32,
    shadowRadius: 22,
    elevation: 8,
  },
};

export const theme = {
  colors: palette,
  spacing,
  radii,
  fontFamily,
  fontSize,
  fontWeight,
  shadows,
} as const;

export type Theme = typeof theme;

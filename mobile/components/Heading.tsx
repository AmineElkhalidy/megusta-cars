import { StyleSheet, Text, View, type TextStyle } from "react-native";
import { theme } from "../lib/theme";
import { useT } from "../lib/i18n/use-t";

type HeadingProps = {
  /** Text shown in the body face. */
  children: string;
  /** Optional last word rendered in italic display serif (the brand accent). */
  accent?: string;
  size?: "lg" | "xl" | "2xl";
  tone?: "default" | "ink";
  style?: TextStyle;
};

/**
 * Editorial heading — pairs the body sans-serif with an italic display serif
 * "accent" word to give every screen a hint of magazine-style polish, mirroring
 * the web app's headline treatment.
 */
export function Heading({
  children,
  accent,
  size = "xl",
  tone = "default",
  style,
}: HeadingProps) {
  const { isRtl } = useT();
  const sizes =
    size === "2xl"
      ? styles.size2xl
      : size === "lg"
        ? styles.sizeLg
        : styles.sizeXl;
  const color =
    tone === "ink" ? theme.colors.inkForeground : theme.colors.foreground;
  // Latin italic display serif looks brand-right for ltr scripts; Arabic doesn't
  // have a true italic, so we drop the italic + serif fallback for Darija and
  // keep the colored body face — preserves the accent emphasis without the
  // awkward fallback rendering.
  const accentStyle = isRtl ? styles.accentRtl : styles.accent;
  return (
    <View style={styles.wrap}>
      <Text style={[styles.body, sizes, { color }, style]}>
        {children}
        {accent ? " " : ""}
        {accent ? (
          <Text style={[styles.body, sizes, accentStyle]}>{accent}</Text>
        ) : null}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  body: {
    fontFamily: theme.fontFamily.body,
    fontWeight: theme.fontWeight.bold,
    letterSpacing: -0.5,
  },
  sizeLg: {
    fontSize: theme.fontSize["3xl"],
    lineHeight: 34,
  },
  sizeXl: {
    fontSize: theme.fontSize["4xl"],
    lineHeight: 38,
  },
  size2xl: {
    fontSize: theme.fontSize["5xl"],
    lineHeight: 48,
  },
  accent: {
    fontFamily: theme.fontFamily.display,
    fontStyle: "italic",
    fontWeight: theme.fontWeight.regular,
    color: theme.colors.primary,
  },
  accentRtl: {
    color: theme.colors.primary,
  },
});

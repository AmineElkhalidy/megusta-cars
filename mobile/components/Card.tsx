import type { ReactNode } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import { theme } from "../lib/theme";

type CardProps = {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
  elevation?: "none" | "sm" | "md" | "lg";
  padded?: boolean;
};

/** Base elevated surface used across the app. */
export function Card({
  children,
  style,
  elevation = "sm",
  padded = true,
}: CardProps) {
  const shadow =
    elevation === "none"
      ? undefined
      : elevation === "lg"
        ? theme.shadows.lg
        : elevation === "md"
          ? theme.shadows.md
          : theme.shadows.sm;
  return (
    <View
      style={[styles.card, padded && styles.padded, shadow, style as ViewStyle]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radii["2xl"],
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  padded: {
    padding: theme.spacing.lg,
  },
});

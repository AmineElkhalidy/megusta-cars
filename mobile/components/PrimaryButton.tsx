import type { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from "react-native";
import { theme } from "../lib/theme";

type Variant = "primary" | "ghost" | "ink" | "danger";

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: "md" | "lg";
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
};

/** Branded button. Defaults to the flame primary; supports ghost/ink/danger. */
export function PrimaryButton({
  label,
  onPress,
  variant = "primary",
  size = "lg",
  iconStart,
  iconEnd,
  loading = false,
  disabled = false,
  style,
  accessibilityLabel,
}: PrimaryButtonProps) {
  const isInactive = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isInactive}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      style={({ pressed }) => [
        styles.base,
        size === "md" ? styles.sizeMd : styles.sizeLg,
        variantStyles[variant].container,
        variant === "primary" ? theme.shadows.primary : theme.shadows.sm,
        pressed && !isInactive && styles.pressed,
        isInactive && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles[variant].label.color} />
      ) : (
        <View style={styles.row}>
          {iconStart ? <View style={styles.iconStart}>{iconStart}</View> : null}
          <Text
            style={[styles.label, variantStyles[variant].label]}
            numberOfLines={1}
          >
            {label}
          </Text>
          {iconEnd ? <View style={styles.iconEnd}>{iconEnd}</View> : null}
        </View>
      )}
    </Pressable>
  );
}

const variantStyles: Record<
  Variant,
  { container: ViewStyle; label: { color: string } }
> = {
  primary: {
    container: {
      backgroundColor: theme.colors.primary,
    },
    label: { color: theme.colors.primaryForeground },
  },
  ghost: {
    container: {
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
    },
    label: { color: theme.colors.foreground },
  },
  ink: {
    container: {
      backgroundColor: theme.colors.ink,
    },
    label: { color: theme.colors.inkForeground },
  },
  danger: {
    container: {
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.dangerSoft,
    },
    label: { color: theme.colors.danger },
  },
};

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.radii.full,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.xl,
  },
  sizeLg: {
    height: 56,
  },
  sizeMd: {
    height: 46,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconStart: {
    marginEnd: theme.spacing.sm,
  },
  iconEnd: {
    marginStart: theme.spacing.sm,
  },
  label: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    letterSpacing: -0.1,
  },
  pressed: {
    transform: [{ translateY: 1 }],
    opacity: 0.96,
  },
  disabled: {
    opacity: 0.6,
  },
});

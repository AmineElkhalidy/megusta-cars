import { StyleSheet, Text, View } from "react-native";
import type { LucideIcon } from "lucide-react-native";
import { theme } from "../lib/theme";

type StatTileProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "primary" | "ink";
};

/** Compact stat card used on the admin overview. */
export function StatTile({
  icon: Icon,
  label,
  value,
  hint,
  tone = "default",
}: StatTileProps) {
  const isInk = tone === "ink";
  return (
    <View style={[styles.wrap, isInk && styles.wrapInk]}>
      <View style={styles.headerRow}>
        <Text style={[styles.label, isInk && styles.labelInk]}>{label}</Text>
        <View style={[styles.iconWrap, isInk && styles.iconWrapInk]}>
          <Icon
            size={16}
            color={isInk ? theme.colors.accentSoft : theme.colors.primary}
            strokeWidth={2}
          />
        </View>
      </View>
      <Text style={[styles.value, isInk && styles.valueInk]}>{value}</Text>
      {hint ? (
        <Text style={[styles.hint, isInk && styles.hintInk]}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    minWidth: 150,
    padding: theme.spacing.lg,
    borderRadius: theme.radii["2xl"],
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  wrapInk: {
    backgroundColor: theme.colors.inkSoft,
    borderColor: "rgba(245,237,224,0.08)",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: theme.colors.mutedForeground,
  },
  labelInk: {
    color: theme.colors.inkMuted,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primaryTint,
    borderWidth: 1,
    borderColor: "rgba(220, 74, 19, 0.18)",
  },
  iconWrapInk: {
    backgroundColor: "rgba(245, 158, 11, 0.18)",
    borderColor: "rgba(245, 158, 11, 0.30)",
  },
  value: {
    marginTop: theme.spacing.base,
    fontSize: theme.fontSize["3xl"],
    fontWeight: theme.fontWeight.bold,
    letterSpacing: -0.6,
    color: theme.colors.foreground,
  },
  valueInk: {
    color: theme.colors.inkForeground,
  },
  hint: {
    marginTop: 4,
    fontSize: theme.fontSize.xs,
    color: theme.colors.mutedForeground,
  },
  hintInk: {
    color: theme.colors.inkMuted,
  },
});

import { StyleSheet, Text, View } from "react-native";
import { theme } from "../lib/theme";
import { useT } from "../lib/i18n/use-t";
import type { BookingStatus } from "../types";

type StatusPillProps = {
  status: BookingStatus;
};

const STATUS_PALETTE: Record<
  BookingStatus,
  { bg: string; fg: string; dot: string }
> = {
  pending: {
    bg: "rgba(217, 119, 6, 0.10)",
    fg: "#a55a02",
    dot: theme.colors.warning,
  },
  approved: {
    bg: "rgba(5, 150, 105, 0.10)",
    fg: "#047857",
    dot: theme.colors.success,
  },
  rejected: {
    bg: "rgba(220, 38, 38, 0.10)",
    fg: "#b91c1c",
    dot: theme.colors.danger,
  },
  completed: {
    bg: "rgba(37, 99, 235, 0.10)",
    fg: "#1d4ed8",
    dot: theme.colors.info,
  },
  cancelled: {
    bg: "rgba(113, 113, 122, 0.10)",
    fg: "#3f3f46",
    dot: "#71717a",
  },
};

/** Visual badge representing booking state, with a leading colored dot. */
export function StatusPill({ status }: StatusPillProps) {
  const { t } = useT();
  const palette = STATUS_PALETTE[status];
  const label = t.status[status];
  return (
    <View style={[styles.pill, { backgroundColor: palette.bg }]}>
      <View style={[styles.dot, { backgroundColor: palette.dot }]} />
      <Text style={[styles.label, { color: palette.fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 5,
    borderRadius: theme.radii.full,
    gap: 6,
    alignSelf: "flex-start",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
    letterSpacing: 0.2,
  },
});

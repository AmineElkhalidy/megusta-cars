import { StyleSheet, Text, View, type TextStyle } from "react-native";
import { theme } from "../lib/theme";

type EyebrowProps = {
  children: string;
  tone?: "primary" | "muted" | "ink";
  /** Position the eyebrow in its parent. Defaults to logical-start (left in
   *  LTR, right in RTL) so it lines up with body content; pass `"center"`
   *  when sitting above a centered title. */
  align?: "start" | "center";
  style?: TextStyle;
};

/** Small uppercase tracked label that sits above section titles. */
export function Eyebrow({
  children,
  tone = "primary",
  align = "start",
  style,
}: EyebrowProps) {
  const color =
    tone === "muted"
      ? theme.colors.mutedForeground
      : tone === "ink"
        ? theme.colors.inkMuted
        : theme.colors.primary;
  return (
    <View style={[styles.wrap, align === "center" && styles.wrapCenter]}>
      <View style={[styles.dash, { backgroundColor: color, opacity: 0.6 }]} />
      <Text style={[styles.text, { color }, style]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  wrapCenter: {
    alignSelf: "center",
  },
  dash: {
    width: 18,
    height: 1,
    marginEnd: theme.spacing.sm,
  },
  text: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
});

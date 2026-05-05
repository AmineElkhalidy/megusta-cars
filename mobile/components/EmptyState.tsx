import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { LucideIcon } from "lucide-react-native";
import { theme } from "../lib/theme";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  body?: string;
  action?: ReactNode;
};

/** Branded empty placeholder used across screens with no data yet. */
export function EmptyState({ icon: Icon, title, body, action }: EmptyStateProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.iconWrap}>
        <Icon size={26} color={theme.colors.primary} strokeWidth={1.6} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {body ? <Text style={styles.body}>{body}</Text> : null}
      {action ? <View style={styles.action}>{action}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing["3xl"],
    backgroundColor: theme.colors.card,
    borderRadius: theme.radii["2xl"],
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderStyle: "dashed",
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: theme.radii.xl,
    backgroundColor: theme.colors.primaryTint,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(220, 74, 19, 0.18)",
  },
  title: {
    marginTop: theme.spacing.lg,
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.foreground,
    letterSpacing: -0.3,
  },
  body: {
    marginTop: theme.spacing.sm,
    maxWidth: 320,
    fontSize: theme.fontSize.sm,
    lineHeight: 20,
    color: theme.colors.mutedForeground,
    textAlign: "center",
  },
  action: {
    marginTop: theme.spacing.xl,
    width: "100%",
  },
});

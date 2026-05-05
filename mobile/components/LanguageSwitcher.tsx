import { Pressable, StyleSheet, Text, View } from "react-native";
import { Check, Globe } from "lucide-react-native";
import { useT } from "../lib/i18n/use-t";
import { LOCALES, LOCALE_META, type Locale } from "../lib/i18n/types";
import { theme } from "../lib/theme";

/**
 * Language picker tuned for mobile: a labeled card with three large pill
 * targets — much faster to tap than a dropdown when the user is on the go.
 *
 * Lives on the Profile screen, mirroring how settings sit in the web app's
 * site header but adapted for the mobile pattern.
 */
export function LanguageSwitcher() {
  const { locale, setLocale, t } = useT();

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.iconWrap}>
          <Globe size={18} color={theme.colors.primary} strokeWidth={2} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>{t.profile.languageLabel}</Text>
          <Text style={styles.subtitle}>{t.profile.languageSubtitle}</Text>
        </View>
      </View>

      <View style={styles.options}>
        {LOCALES.map((code) => {
          const meta = LOCALE_META[code];
          const active = code === locale;
          return (
            <Pressable
              key={code}
              onPress={() => setLocale(code as Locale)}
              accessibilityRole="radio"
              accessibilityState={{ selected: active }}
              accessibilityLabel={meta.nativeName}
              android_ripple={{ color: "rgba(220, 74, 19, 0.08)" }}
              style={({ pressed }) => [
                styles.option,
                active && styles.optionActive,
                pressed && !active && styles.optionPressed,
              ]}
            >
              <View style={styles.optionTextWrap}>
                <Text
                  style={[
                    styles.optionShort,
                    active && styles.optionShortActive,
                  ]}
                >
                  {meta.short}
                </Text>
                <Text
                  style={[
                    styles.optionNative,
                    active && styles.optionNativeActive,
                  ]}
                  numberOfLines={1}
                >
                  {meta.nativeName}
                </Text>
              </View>
              {active ? (
                <View style={styles.check}>
                  <Check
                    size={12}
                    color={theme.colors.primaryForeground}
                    strokeWidth={3}
                  />
                </View>
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radii["2xl"],
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    gap: theme.spacing.base,
    ...theme.shadows.sm,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: theme.radii.lg,
    backgroundColor: theme.colors.primaryTint,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(220, 74, 19, 0.18)",
  },
  label: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: theme.colors.mutedForeground,
  },
  subtitle: {
    marginTop: 2,
    fontSize: theme.fontSize.sm,
    color: theme.colors.foreground,
    fontWeight: theme.fontWeight.medium,
  },
  options: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  option: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radii.lg,
    backgroundColor: theme.colors.background,
    borderWidth: 1.5,
    borderColor: theme.colors.borderStrong,
  },
  optionActive: {
    backgroundColor: theme.colors.primaryTint,
    borderColor: theme.colors.primary,
  },
  optionPressed: {
    opacity: 0.85,
  },
  optionTextWrap: {
    alignItems: "center",
    flexShrink: 1,
  },
  optionShort: {
    fontSize: 10,
    fontWeight: theme.fontWeight.bold,
    letterSpacing: 1.5,
    color: theme.colors.mutedForeground,
  },
  optionShortActive: {
    color: theme.colors.primary,
  },
  optionNative: {
    marginTop: 2,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.foreground,
  },
  optionNativeActive: {
    color: theme.colors.primary,
  },
  check: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});

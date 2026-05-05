import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import {
  LogOut,
  ShieldCheck,
  Sparkles,
  UserCircle2,
} from "lucide-react-native";
import { useAuth } from "../../lib/auth";
import { auth } from "../../lib/firebase";
import { theme } from "../../lib/theme";
import { useT } from "../../lib/i18n/use-t";
import { Screen } from "../../components/Screen";
import { Eyebrow } from "../../components/Eyebrow";
import { Heading } from "../../components/Heading";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";
import { PrimaryButton } from "../../components/PrimaryButton";
import { TAB_BAR_HEIGHT } from "../../components/AppTabBar";

export default function ProfileScreen() {
  const { user } = useAuth();
  const { t } = useT();
  const router = useRouter();

  const handleAdminSignIn = () => {
    router.push("/(auth)/login");
  };

  const handleResetSession = async () => {
    await auth?.signOut();
  };

  const accountStatus = user?.isAnonymous
    ? t.profile.anonymousCustomer
    : user?.email ?? t.profile.signedIn;

  return (
    <Screen
      ambient
      scroll
      contentContainerStyle={{
        paddingTop: theme.spacing.xl,
        paddingHorizontal: theme.spacing.base,
        paddingBottom: TAB_BAR_HEIGHT + theme.spacing["2xl"],
        gap: theme.spacing.lg,
      }}
    >
      <View style={styles.header}>
        <Eyebrow>{t.profile.eyebrow}</Eyebrow>
        <Heading accent={t.profile.headingAccent}>
          {t.profile.headingBody}
        </Heading>
        <Text style={styles.subtitle}>{t.profile.subtitle}</Text>
      </View>

      <View style={styles.identityCard}>
        <View style={styles.identityHeader}>
          <View style={styles.avatar}>
            <UserCircle2 size={28} color={theme.colors.primary} strokeWidth={1.6} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.identityName} numberOfLines={1}>
              {user?.email ?? t.profile.guestDriver}
            </Text>
            <Text style={styles.identityStatus} numberOfLines={1}>
              {accountStatus}
            </Text>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>{t.profile.accountIdLabel}</Text>
          <Text style={styles.fieldValue} numberOfLines={1}>
            {user?.uid ?? "—"}
          </Text>
        </View>

        <View style={styles.benefits}>
          <View style={styles.benefitRow}>
            <Sparkles size={16} color={theme.colors.success} strokeWidth={2} />
            <Text style={styles.benefitText}>{t.profile.benefitNoCard}</Text>
          </View>
          <View style={styles.benefitRow}>
            <Sparkles size={16} color={theme.colors.success} strokeWidth={2} />
            <Text style={styles.benefitText}>
              {t.profile.benefitFriendly}
            </Text>
          </View>
        </View>
      </View>

      <LanguageSwitcher />

      <PrimaryButton
        label={t.profile.signInAdmin}
        onPress={handleAdminSignIn}
        variant="ink"
        iconStart={
          <ShieldCheck size={18} color={theme.colors.inkForeground} />
        }
      />

      <PrimaryButton
        label={t.profile.resetSession}
        onPress={handleResetSession}
        variant="danger"
        size="md"
        iconStart={<LogOut size={16} color={theme.colors.danger} />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: theme.spacing.sm,
  },
  subtitle: {
    marginTop: theme.spacing.md,
    fontSize: theme.fontSize.md,
    lineHeight: 22,
    color: theme.colors.mutedForeground,
  },
  identityCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radii["2xl"],
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: "hidden",
    ...theme.shadows.sm,
  },
  identityHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.base,
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: theme.radii.xl,
    backgroundColor: theme.colors.primaryTint,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(220, 74, 19, 0.18)",
  },
  identityName: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.foreground,
    letterSpacing: -0.2,
  },
  identityStatus: {
    marginTop: 2,
    fontSize: theme.fontSize.sm,
    color: theme.colors.mutedForeground,
  },
  field: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.base,
    paddingBottom: theme.spacing.sm,
  },
  fieldLabel: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: theme.colors.mutedForeground,
  },
  fieldValue: {
    marginTop: 4,
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fontFamily.mono,
    color: theme.colors.foreground,
  },
  benefits: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  benefitText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.foreground,
  },
});

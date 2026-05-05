import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  AlertTriangle,
  ArrowLeft,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react-native";
import { auth, db } from "../../lib/firebase";
import { theme } from "../../lib/theme";
import { Screen } from "../../components/Screen";
import { Eyebrow } from "../../components/Eyebrow";
import { Heading } from "../../components/Heading";
import { PrimaryButton } from "../../components/PrimaryButton";

/** Map cryptic Firebase auth codes to plain-English messages staff can act on. */
function friendlyAuthError(code: string | undefined): string {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Email or password is incorrect.";
    case "auth/invalid-email":
      return "That email address looks invalid.";
    case "auth/too-many-requests":
      return "Too many attempts. Try again in a minute.";
    case "auth/network-request-failed":
      return "No internet connection. Check your network and retry.";
    case "auth/operation-not-allowed":
      return "Email/password sign-in is disabled for this project.";
    default:
      return "Sign in failed. Please try again.";
  }
}

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdminLogin = async () => {
    if (!auth || !db) {
      setError("Firebase is not configured. Add your credentials to .env first.");
      return;
    }
    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const cred = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const adminDoc = await getDoc(doc(db, "admins", cred.user.uid));
      if (!adminDoc.exists()) {
        await auth.signOut();
        setError("This account isn't authorized for admin access.");
        return;
      }
    } catch (e: unknown) {
      const code =
        typeof e === "object" && e && "code" in e
          ? (e as { code?: string }).code
          : undefined;
      setError(friendlyAuthError(code));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.replace("/(customer)");
  };

  return (
    <Screen ambient edgeToEdge>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scroll,
            {
              paddingTop: insets.top + theme.spacing.sm,
              paddingBottom:
                (insets.bottom || theme.spacing.lg) + theme.spacing.lg,
            },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <Pressable
            onPress={handleCancel}
            style={({ pressed }) => [
              styles.backBtn,
              pressed && { opacity: 0.7 },
            ]}
            accessibilityRole="button"
          >
            <ArrowLeft size={18} color={theme.colors.foreground} />
            <Text style={styles.backText}>Back to fleet</Text>
          </Pressable>

          <View style={styles.intro}>
            <View style={styles.badge}>
              <ShieldCheck size={20} color={theme.colors.primary} strokeWidth={2} />
            </View>
            <Eyebrow>Staff only</Eyebrow>
            <Heading accent="sign-in" size="2xl">
              Admin
            </Heading>
            <Text style={styles.subtitle}>
              For Megusta Cars staff. Customers can browse without signing in.
            </Text>
          </View>

          <View style={styles.form}>
            {error ? (
              <View style={styles.errorBox}>
                <AlertTriangle
                  size={16}
                  color={theme.colors.danger}
                  strokeWidth={2.2}
                />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <Field
              label="Email"
              icon={<Mail size={16} color={theme.colors.primary} strokeWidth={2} />}
            >
              <TextInput
                value={email}
                onChangeText={setEmail}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                placeholder="staff@megusta.cars"
                placeholderTextColor={theme.colors.mutedForeground}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                // Email is always latin — lock writing direction so the
                // placeholder stays flush-start and the cursor doesn't
                // jump when the app is running in Arabic (RTL) mode.
                textAlign="left"
                style={[styles.input, emailFocused && styles.inputFocused]}
              />
            </Field>

            <Field
              label="Password"
              icon={<Lock size={16} color={theme.colors.primary} strokeWidth={2} />}
            >
              <TextInput
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                placeholder="••••••••"
                placeholderTextColor={theme.colors.mutedForeground}
                secureTextEntry
                autoCapitalize="none"
                textAlign="left"
                style={[styles.input, passwordFocused && styles.inputFocused]}
              />
            </Field>

            <PrimaryButton
              label="Sign in"
              onPress={handleAdminLogin}
              loading={loading}
              style={{ marginTop: theme.spacing.sm }}
              iconStart={
                <ShieldCheck
                  size={18}
                  color={theme.colors.primaryForeground}
                  strokeWidth={2}
                />
              }
            />

            <Text style={styles.footnote}>
              Customers don&rsquo;t need an account · Anonymous browsing is
              the default front door.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View style={fieldStyles.wrap}>
      <View style={fieldStyles.labelRow}>
        {icon}
        <Text style={fieldStyles.label}>{label}</Text>
      </View>
      {children}
    </View>
  );
}

const fieldStyles = StyleSheet.create({
  wrap: {
    gap: theme.spacing.sm,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  label: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
    textTransform: "uppercase",
    letterSpacing: 1.6,
    color: theme.colors.mutedForeground,
  },
});

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    paddingVertical: theme.spacing.sm,
  },
  backText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.foreground,
  },
  intro: {
    marginTop: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  badge: {
    width: 56,
    height: 56,
    borderRadius: theme.radii.xl,
    backgroundColor: theme.colors.primaryTint,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(220, 74, 19, 0.18)",
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    lineHeight: 22,
    color: theme.colors.mutedForeground,
  },
  form: {
    marginTop: theme.spacing.xl,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radii["2xl"],
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    gap: theme.spacing.base,
    ...theme.shadows.md,
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: theme.spacing.sm,
    padding: theme.spacing.md,
    borderRadius: theme.radii.lg,
    backgroundColor: theme.colors.dangerTint,
    borderWidth: 1,
    borderColor: "rgba(220, 38, 38, 0.18)",
  },
  errorText: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    color: theme.colors.danger,
    fontWeight: theme.fontWeight.medium,
    lineHeight: 18,
  },
  input: {
    height: 52,
    backgroundColor: theme.colors.background,
    borderRadius: theme.radii.lg,
    paddingHorizontal: theme.spacing.base,
    fontSize: theme.fontSize.md,
    color: theme.colors.foreground,
    borderWidth: 1.5,
    borderColor: theme.colors.borderStrong,
  },
  inputFocused: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.card,
  },
  footnote: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.mutedForeground,
    textAlign: "center",
    lineHeight: 18,
    marginTop: theme.spacing.xs,
  },
});

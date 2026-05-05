import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../lib/auth";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

/**
 * Drives navigation based on auth state. Rules:
 * - Admins are *always* kept inside the (admin) group.
 * - Non-admins (anonymous customers or non-admin email accounts) are kept out
 *   of the (admin) group.
 * - The (auth)/login screen is only reached on demand from the Profile tab —
 *   never auto-redirected to. This keeps the customer flow as the default.
 */
function RootNavigation() {
  const { isAdmin, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAdminGroup = segments[0] === "(admin)";
    const inAuthGroup = segments[0] === "(auth)";

    if (isAdmin && !inAdminGroup && !inAuthGroup) {
      router.replace("/(admin)");
      return;
    }

    if (!isAdmin && inAdminGroup) {
      router.replace("/(customer)");
      return;
    }
  }, [isAdmin, loading, segments, router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(customer)" />
      <Stack.Screen name="(admin)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootNavigation />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

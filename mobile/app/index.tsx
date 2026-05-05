import { View, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "../lib/auth";

/**
 * Entry redirect.
 * Customer (anonymous) is the default — the AuthProvider silently signs the
 * user in anonymously on first launch. Admins land in the admin group.
 */
export default function Index() {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isAdmin) {
    return <Redirect href="/(admin)" />;
  }

  return <Redirect href="/(customer)" />;
}

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "../../lib/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "expo-router";
import { ShieldCheck, LogOut } from "lucide-react-native";

export default function ProfileScreen() {
  const { user } = useAuth();
  const router = useRouter();

  const handleAdminSignIn = () => {
    router.push("/(auth)/login");
  };

  const handleResetSession = async () => {
    // Sign out current anonymous session — AuthProvider will immediately
    // create a fresh one. Useful for testing or clearing local trip history.
    await auth?.signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Account ID</Text>
        <Text style={styles.value} numberOfLines={1}>
          {user?.uid ?? "—"}
        </Text>
        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>
          {user?.isAnonymous ? "Anonymous customer" : "Signed in"}
        </Text>
      </View>

      <TouchableOpacity style={styles.adminButton} onPress={handleAdminSignIn}>
        <ShieldCheck size={20} color="#fff" />
        <Text style={styles.adminButtonText}>Sign in as Admin</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={handleResetSession}>
        <LogOut size={18} color="#d32f2f" />
        <Text style={styles.secondaryButtonText}>Reset session</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 32,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  label: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    marginBottom: 16,
    color: "#000",
  },
  adminButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    gap: 8,
  },
  adminButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d32f2f",
    gap: 8,
  },
  secondaryButtonText: {
    color: "#d32f2f",
    fontWeight: "600",
    fontSize: 15,
  },
});

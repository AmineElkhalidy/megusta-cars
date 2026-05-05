import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "../../lib/auth";
import { auth } from "../../lib/firebase";
import { LogOut } from "lucide-react-native";

export default function AdminOverviewScreen() {
  const { user } = useAuth();

  const handleSignOut = async () => {
    // Sign out the admin. The AuthProvider auto-signs the device back in
    // anonymously, sending the user to the customer flow.
    await auth?.signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Overview</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Admin Account</Text>
        <Text style={styles.value}>{user?.email ?? "—"}</Text>
      </View>

      {/* TODO: Stats cards for active bookings, fleet status, etc. */}

      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <LogOut size={18} color="#fff" />
        <Text style={styles.buttonText}>Sign out admin</Text>
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
    fontSize: 16,
    marginBottom: 16,
    color: "#000",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

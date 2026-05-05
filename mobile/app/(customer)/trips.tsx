import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../../lib/auth";

export default function TripsScreen() {
  const { user } = useAuth();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Trips</Text>
      <Text>User: {user?.uid}</Text>
      {/* TODO: Fetch and render user's bookings from Firestore */}
      <Text style={styles.emptyText}>You have no upcoming trips.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginTop: 32,
    textAlign: "center",
  }
});

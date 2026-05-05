import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Booking } from "../../types";

export default function AdminBookingsScreen() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Booking[];
      setBookings(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Bookings</Text>
      {loading ? (
        <Text>Loading bookings...</Text>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.customerName}>{item.customerName}</Text>
              <Text style={styles.carDetails}>{item.carLabel}</Text>
              <Text style={styles.dates}>
                {item.startDate} to {item.endDate}
              </Text>
              <View style={styles.footerRow}>
                <Text style={styles.status}>Status: {item.status}</Text>
                <Text style={styles.total}>${item.totalAmount}</Text>
              </View>
            </View>
          )}
        />
      )}
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
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  customerName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  carDetails: {
    fontSize: 16,
    marginBottom: 8,
  },
  dates: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 12,
  },
  status: {
    fontSize: 14,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
  }
});

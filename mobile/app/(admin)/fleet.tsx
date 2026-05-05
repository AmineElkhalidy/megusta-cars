import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Car } from "../../types";

export default function AdminFleetScreen() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "cars"), orderBy("make"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Car[];
      setCars(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fleet Management</Text>
      {loading ? (
        <Text>Loading cars...</Text>
      ) : (
        <FlatList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.carTitle}>{item.make} {item.model}</Text>
              <Text style={styles.status}>Status: {item.status}</Text>
              <Text style={styles.price}>${item.pricePerDay}/day</Text>
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
  carTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    textTransform: "capitalize",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  }
});

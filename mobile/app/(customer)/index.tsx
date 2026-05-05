import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from "../../lib/auth";
import { collection, onSnapshot, query, orderBy, where } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Car } from "../../types";

export default function FleetScreen() {
  const { user } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) return;
    // Customers only see available cars
    const q = query(
      collection(db, "cars"), 
      where("status", "==", "available"),
      orderBy("make")
    );
    
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
      <Text style={styles.title}>Available Cars</Text>
      
      {loading ? (
        <Text>Loading cars...</Text>
      ) : (
        <FlatList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {item.imageUrl ? (
                <Image 
                  source={{ uri: item.imageUrl }} 
                  style={styles.image}
                  resizeMode="cover"
                />
              ) : (
                <View style={[styles.image, styles.placeholderImage]}>
                  <Text style={styles.placeholderText}>No Image</Text>
                </View>
              )}
              
              <View style={styles.details}>
                <Text style={styles.carTitle}>{item.make} {item.model}</Text>
                <Text style={styles.infoText}>
                  {item.year} • {item.transmission} • {item.fuel}
                </Text>
                <Text style={styles.price}>${item.pricePerDay} / day</Text>
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
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  image: {
    width: "100%",
    height: 200,
  },
  placeholderImage: {
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#666",
  },
  details: {
    padding: 16,
  },
  carTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  }
});

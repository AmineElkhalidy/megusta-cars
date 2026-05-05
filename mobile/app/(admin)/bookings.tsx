import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { ClipboardList } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { db } from "../../lib/firebase";
import { theme } from "../../lib/theme";
import type { Booking, BookingStatus } from "../../types";
import { Screen } from "../../components/Screen";
import { Eyebrow } from "../../components/Eyebrow";
import { Heading } from "../../components/Heading";
import { BookingCard } from "../../components/BookingCard";
import { EmptyState } from "../../components/EmptyState";
import { TAB_BAR_HEIGHT } from "../../components/AppTabBar";

const FILTERS: Array<{ id: "all" | BookingStatus; label: string }> = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

export default function AdminBookingsScreen() {
  const insets = useSafeAreaInsets();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(() => Boolean(db));
  const [filter, setFilter] = useState<"all" | BookingStatus>("all");

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

  const visible =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <Screen background="soft">
      <FlatList
        data={visible}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingTop: insets.top + theme.spacing.xl,
          paddingBottom: TAB_BAR_HEIGHT + theme.spacing["2xl"],
          paddingHorizontal: theme.spacing.base,
          gap: theme.spacing.md,
        }}
        ListHeaderComponent={
          <View style={styles.header}>
            <Eyebrow>Reservations</Eyebrow>
            <Heading accent="bookings">All</Heading>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={FILTERS}
              keyExtractor={(f) => f.id}
              style={styles.filtersRow}
              contentContainerStyle={{ gap: theme.spacing.sm }}
              renderItem={({ item }) => {
                const active = filter === item.id;
                const count =
                  item.id === "all"
                    ? bookings.length
                    : bookings.filter((b) => b.status === item.id).length;
                return (
                  <Pressable
                    onPress={() => setFilter(item.id)}
                    accessibilityRole="button"
                    style={({ pressed }) => [
                      styles.filterPill,
                      active && styles.filterPillActive,
                      pressed && !active && { opacity: 0.85 },
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterLabel,
                        active && styles.filterLabelActive,
                      ]}
                    >
                      {item.label}
                    </Text>
                    <View
                      style={[
                        styles.filterCount,
                        active && styles.filterCountActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.filterCountText,
                          active && styles.filterCountTextActive,
                        ]}
                      >
                        {count}
                      </Text>
                    </View>
                  </Pressable>
                );
              }}
            />
          </View>
        }
        renderItem={({ item }) => (
          <BookingCard booking={item} showCustomer />
        )}
        ListEmptyComponent={
          loading ? (
            <View style={styles.loaderWrap}>
              <ActivityIndicator color={theme.colors.primary} />
              <Text style={styles.loaderText}>Loading reservations…</Text>
            </View>
          ) : (
            <EmptyState
              icon={ClipboardList}
              title={
                filter === "all"
                  ? "No reservations yet"
                  : `No ${filter} reservations`
              }
              body={
                filter === "all"
                  ? "Bookings will appear here as customers submit them from the web or mobile app."
                  : "Try a different filter to see other reservations."
              }
            />
          )
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: theme.spacing.lg,
  },
  filtersRow: {
    marginTop: theme.spacing.lg,
    marginHorizontal: -theme.spacing.base,
    paddingHorizontal: theme.spacing.base,
    flexGrow: 0,
  },
  filterPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: theme.spacing.base,
    paddingVertical: 8,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
  },
  filterPillActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.foreground,
  },
  filterLabelActive: {
    color: theme.colors.primaryForeground,
  },
  filterCount: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.muted,
  },
  filterCountActive: {
    backgroundColor: "rgba(255, 255, 255, 0.22)",
  },
  filterCountText: {
    fontSize: 11,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.foreground,
  },
  filterCountTextActive: {
    color: theme.colors.primaryForeground,
  },
  loaderWrap: {
    paddingVertical: theme.spacing["3xl"],
    alignItems: "center",
    gap: theme.spacing.md,
  },
  loaderText: {
    color: theme.colors.mutedForeground,
    fontSize: theme.fontSize.sm,
  },
});

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { Ticket } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { db } from "../../lib/firebase";
import { theme } from "../../lib/theme";
import { useAuth } from "../../lib/auth";
import { useT } from "../../lib/i18n/use-t";
import type { Booking } from "../../types";
import { Screen } from "../../components/Screen";
import { Eyebrow } from "../../components/Eyebrow";
import { Heading } from "../../components/Heading";
import { BookingCard } from "../../components/BookingCard";
import { EmptyState } from "../../components/EmptyState";
import { PrimaryButton } from "../../components/PrimaryButton";
import { TAB_BAR_HEIGHT } from "../../components/AppTabBar";

export default function TripsScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { t } = useT();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(() =>
    Boolean(db && user?.uid)
  );

  useEffect(() => {
    if (!db || !user?.uid) return;
    const q = query(
      collection(db, "bookings"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Booking[];
        setBookings(data);
        setLoading(false);
      },
      () => setLoading(false)
    );
    return () => unsub();
  }, [user?.uid]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const activeStatuses = new Set(["pending", "approved"]);
  const upcoming = bookings.filter(
    (b) => activeStatuses.has(b.status) && new Date(b.endDate) >= today
  );
  const past = bookings.filter((b) => !upcoming.includes(b));

  const sections: Array<{ title: string; data: Booking[] }> = [];
  if (upcoming.length) sections.push({ title: t.trips.upcoming, data: upcoming });
  if (past.length) sections.push({ title: t.trips.past, data: past });

  // Flatten sections into a list of items so we can use a single FlatList.
  type Item =
    | { kind: "section"; title: string; count: number }
    | { kind: "booking"; booking: Booking };
  const items: Item[] = sections.flatMap(({ title, data }) => [
    { kind: "section" as const, title, count: data.length },
    ...data.map((b) => ({ kind: "booking" as const, booking: b })),
  ]);

  return (
    <Screen ambient>
      <FlatList
        data={items}
        keyExtractor={(item, i) =>
          item.kind === "section" ? `s-${item.title}` : item.booking.id + i
        }
        contentContainerStyle={{
          paddingTop: insets.top + theme.spacing.xl,
          paddingBottom: TAB_BAR_HEIGHT + theme.spacing["2xl"],
          paddingHorizontal: theme.spacing.base,
          gap: theme.spacing.md,
        }}
        ListHeaderComponent={
          <View style={styles.header}>
            <Eyebrow>{t.trips.eyebrow}</Eyebrow>
            <Heading accent={t.trips.headingAccent}>
              {t.trips.headingBody}
            </Heading>
            <Text style={styles.subtitle}>{t.trips.subtitle}</Text>
          </View>
        }
        renderItem={({ item }) => {
          if (item.kind === "section") {
            return (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{item.title}</Text>
                <View style={styles.sectionCount}>
                  <Text style={styles.sectionCountText}>{item.count}</Text>
                </View>
                <View style={styles.sectionRule} />
              </View>
            );
          }
          return <BookingCard booking={item.booking} />;
        }}
        ListEmptyComponent={
          loading ? (
            <View style={styles.loaderWrap}>
              <ActivityIndicator color={theme.colors.primary} />
              <Text style={styles.loaderText}>{t.trips.loading}</Text>
            </View>
          ) : (
            <EmptyState
              icon={Ticket}
              title={t.trips.emptyTitle}
              body={t.trips.emptyBody}
              action={
                <PrimaryButton
                  label={t.trips.browse}
                  onPress={() => router.push("/(customer)")}
                />
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
    paddingBottom: theme.spacing.xl,
  },
  subtitle: {
    marginTop: theme.spacing.md,
    fontSize: theme.fontSize.md,
    lineHeight: 22,
    color: theme.colors.mutedForeground,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xs,
  },
  sectionTitle: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
    textTransform: "uppercase",
    letterSpacing: 2,
    color: theme.colors.mutedForeground,
  },
  sectionCount: {
    minWidth: 22,
    height: 22,
    paddingHorizontal: 6,
    borderRadius: 11,
    backgroundColor: theme.colors.muted,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionCountText: {
    fontSize: 11,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.foreground,
  },
  sectionRule: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
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

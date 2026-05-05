import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { CarFront } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { db } from "../../lib/firebase";
import { theme } from "../../lib/theme";
import type { Car } from "../../types";
import { Screen } from "../../components/Screen";
import { Eyebrow } from "../../components/Eyebrow";
import { Heading } from "../../components/Heading";
import { CarCard } from "../../components/CarCard";
import { EmptyState } from "../../components/EmptyState";
import { TAB_BAR_HEIGHT } from "../../components/AppTabBar";

export default function AdminFleetScreen() {
  const insets = useSafeAreaInsets();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(() => Boolean(db));

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

  const summary = cars.reduce(
    (acc, c) => {
      acc[c.status] = (acc[c.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <Screen background="soft">
      <FlatList
        data={cars}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingTop: insets.top + theme.spacing.xl,
          paddingBottom: TAB_BAR_HEIGHT + theme.spacing["2xl"],
          paddingHorizontal: theme.spacing.base,
          gap: theme.spacing.base,
        }}
        ListHeaderComponent={
          <View style={styles.header}>
            <Eyebrow>Fleet management</Eyebrow>
            <Heading accent="fleet">Manage the</Heading>

            <View style={styles.summaryRow}>
              <SummaryPill
                label="Available"
                value={summary.available ?? 0}
                tone="success"
              />
              <SummaryPill
                label="Rented"
                value={summary.rented ?? 0}
                tone="info"
              />
              <SummaryPill
                label="Maintenance"
                value={summary.maintenance ?? 0}
                tone="warning"
              />
            </View>
          </View>
        }
        renderItem={({ item }) => <CarCard car={item} compact />}
        ListEmptyComponent={
          loading ? (
            <View style={styles.loaderWrap}>
              <ActivityIndicator color={theme.colors.primary} />
              <Text style={styles.loaderText}>Loading fleet…</Text>
            </View>
          ) : (
            <EmptyState
              icon={CarFront}
              title="No cars in the fleet"
              body="Add your first car from the admin web console — it'll appear here instantly."
            />
          )
        }
      />
    </Screen>
  );
}

function SummaryPill({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "success" | "info" | "warning";
}) {
  const palette =
    tone === "success"
      ? { bg: theme.colors.successTint, fg: "#047857", dot: theme.colors.success }
      : tone === "info"
        ? { bg: theme.colors.infoTint, fg: "#1d4ed8", dot: theme.colors.info }
        : { bg: theme.colors.warningTint, fg: "#a55a02", dot: theme.colors.warning };
  return (
    <View style={[styles.pill, { backgroundColor: palette.bg }]}>
      <View style={[styles.pillDot, { backgroundColor: palette.dot }]} />
      <Text style={[styles.pillValue, { color: palette.fg }]}>{value}</Text>
      <Text style={[styles.pillLabel, { color: palette.fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: theme.spacing.xl,
  },
  summaryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
    marginTop: theme.spacing.lg,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radii.full,
    gap: 6,
  },
  pillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  pillValue: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
  },
  pillLabel: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
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

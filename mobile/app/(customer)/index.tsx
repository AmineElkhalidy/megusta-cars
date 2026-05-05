import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { CarFront, Sparkles } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { db } from "../../lib/firebase";
import { theme } from "../../lib/theme";
import { useT } from "../../lib/i18n/use-t";
import type { Car } from "../../types";
import { Screen } from "../../components/Screen";
import { Eyebrow } from "../../components/Eyebrow";
import { Heading } from "../../components/Heading";
import { CarCard } from "../../components/CarCard";
import { EmptyState } from "../../components/EmptyState";
import { TAB_BAR_HEIGHT } from "../../components/AppTabBar";

export default function FleetScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useT();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(() => Boolean(db));

  useEffect(() => {
    if (!db) return;
    // Filter server-side; sort client-side to avoid needing a composite index.
    const q = query(collection(db, "cars"), where("status", "==", "available"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }) as Car)
        .sort((a, b) => a.make.localeCompare(b.make));
      setCars(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const lowestPrice = cars.length
    ? Math.min(...cars.map((c) => c.pricePerDay))
    : 0;

  return (
    <Screen ambient>
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
            <Eyebrow>{t.fleet.eyebrow}</Eyebrow>
            <Heading accent={t.fleet.headingAccent}>
              {t.fleet.headingBody}
            </Heading>
            <Text style={styles.subtitle}>{t.fleet.subtitle}</Text>

            <View style={styles.statsRow}>
              <View style={styles.statPill}>
                <Sparkles size={14} color={theme.colors.primary} />
                <Text style={styles.statValue}>{cars.length}</Text>
                <Text style={styles.statLabel}>{t.fleet.available}</Text>
              </View>
              {lowestPrice > 0 ? (
                <View style={styles.statPill}>
                  <Text style={styles.statValue}>
                    {t.fleet.priceFromLabel} ${lowestPrice}
                  </Text>
                  <Text style={styles.statLabel}>{t.fleet.priceUnit}</Text>
                </View>
              ) : null}
            </View>
          </View>
        }
        renderItem={({ item }) => <CarCard car={item} />}
        ListEmptyComponent={
          loading ? (
            <View style={styles.loaderWrap}>
              <ActivityIndicator color={theme.colors.primary} />
              <Text style={styles.loaderText}>{t.fleet.loading}</Text>
            </View>
          ) : (
            <EmptyState
              icon={CarFront}
              title={t.fleet.emptyTitle}
              body={t.fleet.emptyBody}
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
  statsRow: {
    marginTop: theme.spacing.lg,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
  },
  statPill: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: theme.spacing.base,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radii.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  statValue: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.foreground,
  },
  statLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.mutedForeground,
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

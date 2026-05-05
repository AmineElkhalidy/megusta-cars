import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import {
  Car,
  ClipboardList,
  DollarSign,
  LogOut,
  ShieldCheck,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../../lib/auth";
import { auth, db } from "../../lib/firebase";
import { theme } from "../../lib/theme";
import { formatCurrency, formatDate } from "../../lib/format";
import type { Booking, Car as CarType } from "../../types";
import { Eyebrow } from "../../components/Eyebrow";
import { Heading } from "../../components/Heading";
import { Screen } from "../../components/Screen";
import { StatTile } from "../../components/StatTile";
import { StatusPill } from "../../components/StatusPill";
import { PrimaryButton } from "../../components/PrimaryButton";
import { TAB_BAR_HEIGHT } from "../../components/AppTabBar";

export default function AdminOverviewScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [cars, setCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState<boolean>(() => Boolean(db));

  useEffect(() => {
    if (!db) return;
    const unsubBookings = onSnapshot(
      query(collection(db, "bookings"), orderBy("createdAt", "desc")),
      (snap) => {
        setBookings(
          snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Booking[]
        );
        setLoading(false);
      }
    );
    const unsubCars = onSnapshot(
      query(collection(db, "cars"), orderBy("make")),
      (snap) => {
        setCars(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as CarType[]);
      }
    );
    return () => {
      unsubBookings();
      unsubCars();
    };
  }, []);

  const stats = useMemo(() => {
    const pending = bookings.filter((b) => b.status === "pending").length;
    const revenue = bookings
      .filter((b) => b.status === "approved" || b.status === "completed")
      .reduce((sum, b) => sum + b.totalAmount, 0);
    const active = cars.filter((c) => c.status === "available").length;
    return { pending, revenue, active };
  }, [bookings, cars]);

  const recent = bookings.slice(0, 5);

  const handleSignOut = async () => {
    await auth?.signOut();
  };

  return (
    <Screen background="soft">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + theme.spacing.xl,
          paddingHorizontal: theme.spacing.base,
          paddingBottom: TAB_BAR_HEIGHT + theme.spacing["2xl"],
        }}
      >
        <View style={styles.header}>
          <Eyebrow>Agency control panel</Eyebrow>
          <Heading accent="console">Admin</Heading>
          <Text style={styles.email} numberOfLines={1}>
            Signed in as {user?.email ?? "—"}
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <StatTile
            icon={ClipboardList}
            label="Total bookings"
            value={String(bookings.length)}
            hint="All-time"
          />
          <StatTile
            icon={ShieldCheck}
            label="Pending"
            value={String(stats.pending)}
            hint="Awaiting review"
          />
          <StatTile
            icon={DollarSign}
            label="Revenue"
            value={formatCurrency(stats.revenue)}
            hint="Approved + completed"
          />
          <StatTile
            icon={Car}
            label="Active cars"
            value={`${stats.active} / ${cars.length}`}
            hint="Available now"
          />
        </View>

        <View style={styles.recentCard}>
          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}>Recent reservations</Text>
            <Text style={styles.recentCount}>
              {bookings.length} total
            </Text>
          </View>

          {loading ? (
            <View style={styles.loaderRow}>
              <ActivityIndicator color={theme.colors.primary} />
              <Text style={styles.loaderText}>Loading…</Text>
            </View>
          ) : recent.length === 0 ? (
            <Text style={styles.emptyText}>
              No reservations yet. Incoming bookings will appear here.
            </Text>
          ) : (
            recent.map((b, idx) => (
              <View
                key={b.id}
                style={[
                  styles.recentRow,
                  idx < recent.length - 1 && styles.recentRowBorder,
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.recentName} numberOfLines={1}>
                    <Text style={{ fontWeight: theme.fontWeight.bold }}>
                      {b.customerName || "Guest"}
                    </Text>
                    {" · "}
                    <Text
                      style={{
                        fontFamily: theme.fontFamily.display,
                        fontStyle: "italic",
                      }}
                    >
                      {b.carLabel}
                    </Text>
                  </Text>
                  <Text style={styles.recentDates}>
                    {formatDate(b.startDate)} → {formatDate(b.endDate)}
                  </Text>
                </View>
                <View style={styles.recentRight}>
                  <Text style={styles.recentAmount}>
                    {formatCurrency(b.totalAmount)}
                  </Text>
                  <StatusPill status={b.status} />
                </View>
              </View>
            ))
          )}
        </View>

        <PrimaryButton
          label="Sign out admin"
          onPress={handleSignOut}
          variant="ink"
          iconStart={<LogOut size={18} color={theme.colors.inkForeground} />}
          style={{ marginTop: theme.spacing.xl }}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: theme.spacing.xl,
  },
  email: {
    marginTop: theme.spacing.md,
    fontSize: theme.fontSize.sm,
    color: theme.colors.mutedForeground,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  recentCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radii["2xl"],
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: "hidden",
    ...theme.shadows.sm,
  },
  recentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  recentTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.foreground,
    letterSpacing: -0.2,
  },
  recentCount: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.mutedForeground,
    textTransform: "uppercase",
    letterSpacing: 1.4,
  },
  recentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  recentRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  recentName: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.foreground,
    letterSpacing: -0.1,
  },
  recentDates: {
    marginTop: 4,
    fontSize: theme.fontSize.xs,
    color: theme.colors.mutedForeground,
  },
  recentRight: {
    alignItems: "flex-end",
    gap: 4,
  },
  recentAmount: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.foreground,
  },
  loaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    padding: theme.spacing.xl,
    justifyContent: "center",
  },
  loaderText: {
    color: theme.colors.mutedForeground,
    fontSize: theme.fontSize.sm,
  },
  emptyText: {
    padding: theme.spacing.xl,
    textAlign: "center",
    color: theme.colors.mutedForeground,
    fontSize: theme.fontSize.sm,
  },
});

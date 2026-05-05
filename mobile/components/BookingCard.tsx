import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { CalendarRange, MapPin } from "lucide-react-native";
import { theme } from "../lib/theme";
import { useT } from "../lib/i18n/use-t";
import { formatCurrency, formatDate } from "../lib/format";
import { StatusPill } from "./StatusPill";
import type { Booking } from "../types";

type BookingCardProps = {
  booking: Booking;
  /** Show the customer's name above the car (admin view). */
  showCustomer?: boolean;
};

const PLACEHOLDER_BLURHASH = "L6PZfSi_.AyE_3t7t7R**0o#DgR4";

/** Editorial booking card used in customer trips and admin bookings. */
export function BookingCard({ booking, showCustomer = false }: BookingCardProps) {
  const { t } = useT();
  const carName = booking.carLabel.split(" ");
  const make = carName[0];
  const model = carName.slice(1).join(" ") || "";

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <View style={styles.imageWrap}>
          {booking.carImage ? (
            <Image
              source={{ uri: booking.carImage }}
              style={styles.image}
              contentFit="cover"
              transition={150}
              placeholder={PLACEHOLDER_BLURHASH}
              alt={booking.carLabel}
              accessibilityLabel={booking.carLabel}
            />
          ) : (
            <View style={[styles.image, styles.imagePlaceholder]} />
          )}
        </View>

        <View style={styles.body}>
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              {showCustomer ? (
                <Text style={styles.customer} numberOfLines={1}>
                  {booking.customerName || t.profile.guestDriver}
                </Text>
              ) : null}
              <Text style={styles.title} numberOfLines={1}>
                <Text style={styles.titleMake}>{make} </Text>
                <Text style={styles.titleModel}>{model}</Text>
              </Text>
              <Text style={styles.ref}>
                #{booking.id.slice(-8).toUpperCase()}
              </Text>
            </View>
            <StatusPill status={booking.status} />
          </View>
        </View>
      </View>

      <View style={styles.meta}>
        <View style={styles.metaItem}>
          <View style={styles.metaIcon}>
            <CalendarRange size={14} color={theme.colors.primary} strokeWidth={2} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.metaLabel}>{t.bookingCard.datesLabel}</Text>
            <Text style={styles.metaValue} numberOfLines={1}>
              {formatDate(booking.startDate)} → {formatDate(booking.endDate)}
            </Text>
          </View>
        </View>
        <View style={styles.metaItem}>
          <View style={styles.metaIcon}>
            <MapPin size={14} color={theme.colors.primary} strokeWidth={2} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.metaLabel}>{t.bookingCard.pickupLabel}</Text>
            <Text style={styles.metaValue} numberOfLines={1}>
              {booking.pickupLocation}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerLabel}>{t.bookingCard.totalLabel}</Text>
        <Text style={styles.footerValue}>
          {formatCurrency(booking.totalAmount)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radii["2xl"],
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: "hidden",
    ...theme.shadows.sm,
  },
  row: {
    flexDirection: "row",
    gap: theme.spacing.base,
    padding: theme.spacing.base,
  },
  imageWrap: {
    width: 96,
    height: 96,
    borderRadius: theme.radii.lg,
    overflow: "hidden",
    backgroundColor: theme.colors.muted,
  },
  image: { width: "100%", height: "100%" },
  imagePlaceholder: { backgroundColor: theme.colors.muted },
  body: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: theme.spacing.sm,
  },
  customer: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: theme.colors.primary,
    marginBottom: 2,
  },
  title: {
    fontSize: theme.fontSize.md,
    color: theme.colors.foreground,
    letterSpacing: -0.2,
  },
  titleMake: {
    fontWeight: theme.fontWeight.bold,
  },
  titleModel: {
    fontFamily: theme.fontFamily.display,
    fontStyle: "italic",
  },
  ref: {
    marginTop: 4,
    fontSize: 11,
    fontFamily: theme.fontFamily.mono,
    color: theme.colors.mutedForeground,
    letterSpacing: 1,
  },
  meta: {
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.base,
    gap: theme.spacing.md,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  metaIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: theme.colors.primaryTint,
    alignItems: "center",
    justifyContent: "center",
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: theme.fontWeight.bold,
    textTransform: "uppercase",
    letterSpacing: 1.4,
    color: theme.colors.mutedForeground,
  },
  metaValue: {
    marginTop: 2,
    fontSize: theme.fontSize.sm,
    color: theme.colors.foreground,
    fontWeight: theme.fontWeight.semibold,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.mutedSoft,
  },
  footerLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.mutedForeground,
  },
  footerValue: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.foreground,
    letterSpacing: -0.3,
  },
});

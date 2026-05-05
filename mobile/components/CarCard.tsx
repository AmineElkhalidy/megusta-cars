import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { ArrowUpRight, Cog, Fuel, Users } from "lucide-react-native";
import { theme } from "../lib/theme";
import { useT } from "../lib/i18n/use-t";
import type { Car } from "../types";

type CarCardProps = {
  car: Car;
  onPress?: () => void;
  /** When true, renders a wider compact admin variant with status. */
  compact?: boolean;
};

const PLACEHOLDER_BLURHASH = "L6PZfSi_.AyE_3t7t7R**0o#DgR4";

/** Editorial car card. Image hero with a glass price chip and meta row. */
export function CarCard({ car, onPress, compact = false }: CarCardProps) {
  const { t } = useT();
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "rgba(15,17,13,0.04)" }}
      style={({ pressed }) => [
        styles.wrap,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.imageWrap}>
        {car.imageUrl ? (
          <Image
            source={{ uri: car.imageUrl }}
            style={styles.image}
            contentFit="cover"
            transition={200}
            placeholder={PLACEHOLDER_BLURHASH}
            alt={`${car.make} ${car.model}`}
            accessibilityLabel={`${car.make} ${car.model}`}
          />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]}>
            <Text style={styles.imagePlaceholderText}>No image</Text>
          </View>
        )}

        {/* Bottom veil for chip readability */}
        <View pointerEvents="none" style={styles.imageVeil} />

        {/* Type chip */}
        <View style={styles.typeChip}>
          <Text style={styles.typeChipText}>
            {car.type ?? t.carCard.typeFallback}
          </Text>
        </View>

        {/* Price chip — bottom right */}
        <View style={styles.priceChip}>
          <Text style={styles.priceChipFrom}>{t.carCard.priceFromLabel}</Text>
          <Text style={styles.priceChipValue}>${car.pricePerDay}</Text>
          <Text style={styles.priceChipUnit}>{t.carCard.priceUnit}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title} numberOfLines={1}>
              <Text style={styles.titleMake}>{car.make} </Text>
              <Text style={styles.titleModel}>{car.model}</Text>
            </Text>
            <Text style={styles.year}>{car.year}</Text>
          </View>

          {compact ? (
            <View
              style={[
                styles.statusChip,
                car.status === "available"
                  ? styles.statusAvailable
                  : car.status === "rented"
                    ? styles.statusRented
                    : styles.statusMaintenance,
              ]}
            >
              <View
                style={[
                  styles.statusDot,
                  car.status === "available"
                    ? styles.dotAvailable
                    : car.status === "rented"
                      ? styles.dotRented
                      : styles.dotMaintenance,
                ]}
              />
              <Text
                style={[
                  styles.statusText,
                  car.status === "available"
                    ? styles.textAvailable
                    : car.status === "rented"
                      ? styles.textRented
                      : styles.textMaintenance,
                ]}
              >
                {car.status}
              </Text>
            </View>
          ) : null}
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Users size={14} color={theme.colors.primary} strokeWidth={2} />
            <Text style={styles.metaText}>{car.seats}</Text>
          </View>
          <View style={styles.metaItem}>
            <Cog size={14} color={theme.colors.primary} strokeWidth={2} />
            <Text style={styles.metaText}>{car.transmission}</Text>
          </View>
          <View style={styles.metaItem}>
            <Fuel size={14} color={theme.colors.primary} strokeWidth={2} />
            <Text style={styles.metaText}>{car.fuel}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerLabel}>{t.carCard.tapToView}</Text>
          <View style={styles.footerArrow}>
            <ArrowUpRight
              size={14}
              color={theme.colors.background}
              strokeWidth={2.4}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radii["3xl"],
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: "hidden",
    ...theme.shadows.md,
  },
  pressed: {
    transform: [{ translateY: 1 }],
    opacity: 0.97,
  },
  imageWrap: {
    height: 200,
    width: "100%",
    backgroundColor: theme.colors.muted,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholderText: {
    color: theme.colors.mutedForeground,
    fontSize: theme.fontSize.sm,
  },
  imageVeil: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "55%",
    backgroundColor: "rgba(0, 0, 0, 0.32)",
  },
  typeChip: {
    position: "absolute",
    start: theme.spacing.base,
    top: theme.spacing.base,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: theme.radii.full,
  },
  typeChipText: {
    fontSize: 10,
    fontWeight: theme.fontWeight.bold,
    textTransform: "uppercase",
    letterSpacing: 1.6,
    color: theme.colors.foreground,
  },
  priceChip: {
    position: "absolute",
    end: theme.spacing.base,
    bottom: theme.spacing.base,
    flexDirection: "row",
    alignItems: "baseline",
    paddingHorizontal: theme.spacing.base,
    paddingVertical: 8,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: theme.radii.full,
    gap: 4,
  },
  priceChipFrom: {
    fontSize: 10,
    fontWeight: theme.fontWeight.bold,
    textTransform: "uppercase",
    letterSpacing: 1.4,
    color: theme.colors.mutedForeground,
  },
  priceChipValue: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.foreground,
    letterSpacing: -0.3,
  },
  priceChipUnit: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.mutedForeground,
  },
  body: {
    padding: theme.spacing.lg,
    gap: theme.spacing.base,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.foreground,
    letterSpacing: -0.3,
  },
  titleMake: {
    fontWeight: theme.fontWeight.bold,
  },
  titleModel: {
    fontFamily: theme.fontFamily.display,
    fontStyle: "italic",
    fontWeight: theme.fontWeight.regular,
  },
  year: {
    marginTop: 2,
    fontSize: theme.fontSize.sm,
    color: theme.colors.mutedForeground,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.base,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.mutedForeground,
    fontWeight: theme.fontWeight.medium,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.md,
  },
  footerLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.mutedForeground,
    fontWeight: theme.fontWeight.medium,
  },
  footerArrow: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.colors.foreground,
    alignItems: "center",
    justifyContent: "center",
  },
  // Status chips
  statusChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 5,
    borderRadius: theme.radii.full,
    gap: 6,
  },
  statusAvailable: { backgroundColor: theme.colors.successTint },
  statusRented: { backgroundColor: theme.colors.infoTint },
  statusMaintenance: { backgroundColor: theme.colors.warningTint },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotAvailable: { backgroundColor: theme.colors.success },
  dotRented: { backgroundColor: theme.colors.info },
  dotMaintenance: { backgroundColor: theme.colors.warning },
  statusText: {
    fontSize: 10,
    fontWeight: theme.fontWeight.bold,
    textTransform: "uppercase",
    letterSpacing: 1.4,
  },
  textAvailable: { color: "#047857" },
  textRented: { color: "#1d4ed8" },
  textMaintenance: { color: "#a55a02" },
});

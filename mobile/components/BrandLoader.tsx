import { useEffect, useState } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { theme } from "../lib/theme";

/** Full-screen branded loader shown during initial auth resolution. */
export function BrandLoader() {
  // Lazy initializers keep the same Animated.Value across renders without
  // touching a ref's `.current` during render (which triggers react-hooks/refs).
  const [spin] = useState(() => new Animated.Value(0));
  const [pulse] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 1400,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1100,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1100,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulse, spin]);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  const ringScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.18],
  });
  const ringOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.25, 0],
  });

  return (
    <View style={styles.wrap}>
      <View style={styles.markRow}>
        <View style={styles.markStack}>
          <Animated.View
            style={[
              styles.ring,
              {
                opacity: ringOpacity,
                transform: [{ scale: ringScale }],
              },
            ]}
          />
          <View style={styles.mark}>
            <Animated.View
              style={[styles.spinner, { transform: [{ rotate }] }]}
            />
            <Text style={styles.markText}>M</Text>
          </View>
        </View>
        <Text style={styles.brand}>
          <Text style={styles.brandBold}>Megusta </Text>
          <Text style={styles.brandItalic}>Cars</Text>
        </Text>
      </View>
      <Text style={styles.subtitle}>Warming up your ride…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.md,
  },
  markRow: {
    alignItems: "center",
    gap: theme.spacing.base,
  },
  markStack: {
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  ring: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: theme.colors.primary,
  },
  mark: {
    width: 64,
    height: 64,
    borderRadius: theme.radii.xl,
    backgroundColor: theme.colors.foreground,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    ...theme.shadows.lg,
  },
  spinner: {
    position: "absolute",
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderWidth: 2,
    borderColor: "transparent",
    borderTopColor: theme.colors.primary,
    borderRightColor: theme.colors.accent,
    borderRadius: 60,
  },
  markText: {
    fontSize: 26,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.background,
    fontFamily: theme.fontFamily.display,
    fontStyle: "italic",
  },
  brand: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.foreground,
  },
  brandBold: {
    fontWeight: theme.fontWeight.bold,
    letterSpacing: -0.4,
  },
  brandItalic: {
    fontFamily: theme.fontFamily.display,
    fontStyle: "italic",
    color: theme.colors.primary,
  },
  subtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.mutedForeground,
  },
});

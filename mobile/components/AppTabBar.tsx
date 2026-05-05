import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { theme } from "../lib/theme";

/**
 * Branded floating tab bar — soft cream surface, gradient pill highlight on
 * the active tab, dot indicator, gentle shadow. Replaces the default UIKit
 * tab bar to match the editorial feel of the rest of the app.
 */
export function AppTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.outer,
        {
          paddingBottom: insets.bottom > 0 ? insets.bottom : theme.spacing.md,
        },
      ]}
    >
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const focused = state.index === index;
          const label =
            (typeof options.tabBarLabel === "string"
              ? options.tabBarLabel
              : options.title) ?? route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };
          const onLongPress = () => {
            navigation.emit({ type: "tabLongPress", target: route.key });
          };

          const renderIcon =
            typeof options.tabBarIcon === "function"
              ? options.tabBarIcon
              : null;
          const tint = focused
            ? theme.colors.primary
            : theme.colors.mutedForeground;

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              onLongPress={onLongPress}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              android_ripple={{ color: "rgba(220, 74, 19, 0.08)", borderless: true }}
              style={({ pressed }) => [
                styles.item,
                focused && styles.itemActive,
                pressed && !focused && styles.itemPressed,
              ]}
            >
              {renderIcon
                ? renderIcon({ focused, color: tint, size: 22 })
                : null}
              <Text
                numberOfLines={1}
                style={[
                  styles.label,
                  focused ? styles.labelActive : styles.labelInactive,
                ]}
              >
                {label}
              </Text>
              {focused ? (
                <View pointerEvents="none" style={styles.activeDot} />
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: theme.spacing.base,
    paddingTop: theme.spacing.sm,
    backgroundColor: "transparent",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: theme.colors.card,
    borderRadius: theme.radii.full,
    padding: 6,
    gap: 4,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.lg,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 12,
    borderRadius: theme.radii.full,
    position: "relative",
  },
  itemActive: {
    backgroundColor: theme.colors.primaryTint,
  },
  itemPressed: {
    opacity: 0.7,
  },
  label: {
    fontSize: 12,
    fontWeight: theme.fontWeight.semibold,
    letterSpacing: -0.1,
  },
  labelActive: {
    color: theme.colors.primary,
  },
  labelInactive: {
    color: theme.colors.mutedForeground,
  },
  activeDot: {
    // Logical `start` + `marginStart` keep the indicator centered under each
    // tab in both LTR and RTL. Using `left`/`marginLeft` relied on RN's
    // implicit RTL swap, which is correct today but brittle if anyone ever
    // flips `I18nManager.swapLeftAndRightInRTL`.
    position: "absolute",
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.primary,
    start: "50%",
    marginStart: -2,
  },
});

/** Height + safe-area padding the bar consumes; use to pad scroll content. */
export const TAB_BAR_HEIGHT = 70;

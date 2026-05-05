import { ReactNode } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  type ScrollViewProps,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";
import { theme } from "../lib/theme";

type ScreenProps = {
  children: ReactNode;
  /** Pad the top by the safe area insets (default true). Set false for screens
   *  that own their own header (e.g. tab screens with a hero band). */
  edgeToEdge?: boolean;
  scroll?: boolean;
  /** Adds a soft warm radial mesh behind the content. */
  ambient?: boolean;
  /** When the screen lives inside a tab bar, leave room at the bottom. */
  bottomInset?: number;
  contentContainerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  scrollProps?: Omit<ScrollViewProps, "contentContainerStyle" | "children">;
  background?: "default" | "soft" | "ink";
};

export function Screen({
  children,
  edgeToEdge = false,
  scroll = false,
  ambient = false,
  bottomInset = 0,
  contentContainerStyle,
  contentStyle,
  scrollProps,
  background = "default",
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  const bg =
    background === "ink"
      ? theme.colors.ink
      : background === "soft"
        ? theme.colors.backgroundSoft
        : theme.colors.background;

  const topPad = edgeToEdge ? 0 : insets.top;
  const bottomPad = bottomInset
    ? bottomInset
    : insets.bottom > 0
      ? insets.bottom
      : 0;

  const Inner = scroll ? ScrollView : View;
  const innerProps = scroll
    ? {
        ...scrollProps,
        showsVerticalScrollIndicator: false,
        contentContainerStyle: [
          styles.scrollContent,
          {
            paddingTop: topPad,
            paddingBottom: bottomPad,
          },
          contentContainerStyle,
        ],
      }
    : {
        style: [
          styles.flex,
          {
            paddingTop: topPad,
            paddingBottom: bottomPad,
          },
          contentStyle,
        ],
      };

  return (
    <View style={[styles.flex, { backgroundColor: bg }]}>
      <StatusBar
        barStyle={background === "ink" ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />
      {ambient && background !== "ink" ? <AmbientMesh /> : null}
      <Inner {...(innerProps as object)}>{children}</Inner>
    </View>
  );
}

/** Soft warm radial mesh that drifts behind the screen. */
function AmbientMesh() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="g1" cx="15%" cy="0%" r="60%">
            <Stop offset="0%" stopColor={theme.colors.primary} stopOpacity="0.18" />
            <Stop offset="100%" stopColor={theme.colors.primary} stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="g2" cx="100%" cy="40%" r="60%">
            <Stop offset="0%" stopColor={theme.colors.accent} stopOpacity="0.16" />
            <Stop offset="100%" stopColor={theme.colors.accent} stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width="100%" height="100%" fill="url(#g1)" />
        <Rect x={0} y={0} width="100%" height="100%" fill="url(#g2)" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

import { Tabs } from "expo-router";
import { CalendarDays, Car, User } from "lucide-react-native";
import { AppTabBar } from "../../components/AppTabBar";
import { useT } from "../../lib/i18n/use-t";

export default function CustomerLayout() {
  const { t } = useT();
  return (
    <Tabs
      tabBar={(props) => <AppTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: "transparent" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t.tabs.fleet,
          tabBarIcon: ({ color, focused }) => (
            <Car
              size={20}
              color={color}
              strokeWidth={focused ? 2.4 : 1.8}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          title: t.tabs.trips,
          tabBarIcon: ({ color, focused }) => (
            <CalendarDays
              size={20}
              color={color}
              strokeWidth={focused ? 2.4 : 1.8}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t.tabs.profile,
          tabBarIcon: ({ color, focused }) => (
            <User
              size={20}
              color={color}
              strokeWidth={focused ? 2.4 : 1.8}
            />
          ),
        }}
      />
    </Tabs>
  );
}

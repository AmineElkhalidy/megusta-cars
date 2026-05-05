import { Tabs } from "expo-router";
import { Car, User, CalendarDays } from "lucide-react-native";

export default function CustomerLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#000" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Fleet",
          tabBarIcon: ({ color }) => <Car color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          title: "My Trips",
          tabBarIcon: ({ color }) => <CalendarDays color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <User color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}

import { Tabs } from "expo-router";
import { LayoutDashboard, Car, CalendarCheck } from "lucide-react-native";

export default function AdminLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#000" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Overview",
          tabBarIcon: ({ color }) => <LayoutDashboard color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="fleet"
        options={{
          title: "Manage Fleet",
          tabBarIcon: ({ color }) => <Car color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: "Bookings",
          tabBarIcon: ({ color }) => <CalendarCheck color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}

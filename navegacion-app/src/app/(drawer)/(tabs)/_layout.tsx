import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "indigo" }}>
      <Tabs.Screen
        name="(stack)"
        options={{
          title: "Stack",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="person-add-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="home-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart/index"
        options={{
          title: "Carrito",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="cart" color={color} />
          ),
        }}
      />
    </Tabs>
    
  );
};

export default TabsLayout;

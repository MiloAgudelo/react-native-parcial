import { Tabs } from "expo-router/js-tabs";
import { SymbolView, type SymbolViewProps } from "expo-symbols";
import type { ColorValue } from "react-native";

import { colors } from "@/constants/colors";

type TabIconProps = {
  name: SymbolViewProps["name"];
  color: ColorValue;
  size: number;
};

function TabIcon({ name, color, size }: TabIconProps) {
  return <SymbolView name={name} tintColor={color} size={size} />;
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSubtle,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <TabIcon
              name={{ ios: "house.fill", android: "home", web: "home" }}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Buscar",
          tabBarIcon: ({ color, size }) => (
            <TabIcon
              name={{ ios: "magnifyingglass", android: "search", web: "search" }}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color, size }) => (
            <TabIcon
              name={{ ios: "heart.fill", android: "favorite", web: "favorite" }}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}

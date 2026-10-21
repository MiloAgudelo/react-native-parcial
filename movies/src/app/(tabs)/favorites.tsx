import { Text, View } from "react-native";

import { Screen } from "@/components/ui/Screen";

export default function FavoritesScreen() {
  return (
    <Screen>
      <View className="flex-1 items-center justify-center px-8">
        <Text className="text-2xl font-bold text-white">Favoritos</Text>
        <Text className="mt-2 text-center text-zinc-400">
          Pantalla preparada para el siguiente módulo: persistencia local.
        </Text>
      </View>
    </Screen>
  );
}

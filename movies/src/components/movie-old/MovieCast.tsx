import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { ActorCard } from "@/components/movie-old/ActorCard";
import { colors } from "@/constants/colors";
import type { CastMember } from "@/types/movie";

type Props = {
  cast: CastMember[];
  isLoading?: boolean;
};

export function MovieCast({ cast, isLoading = false }: Props) {
  return (
    <View className="mt-6">
      <Text className="mb-3 px-5 text-lg font-semibold text-white">Reparto</Text>
      {isLoading ? (
        <ActivityIndicator color={colors.accent} />
      ) : (
        <FlatList
          horizontal
          data={cast}
          keyExtractor={(item) => String(item.id)}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12 }}
          renderItem={({ item }) => <ActorCard actor={item} />}
          ListEmptyComponent={
            <Text className="px-2 text-zinc-400">Sin información de reparto.</Text>
          }
        />
      )}
    </View>
  );
}

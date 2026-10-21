import { useRouter } from "expo-router";
import { FlatList, Text, View } from "react-native";

import { MoviePoster } from "@/components/movies/MoviePoster";
import type { Movie } from "@/types/movie";

type Props = {
  title: string;
  movies: Movie[];
};

export function MovieHorizontalList({ title, movies }: Props) {
  const router = useRouter();

  if (!movies.length) return null;

  return (
    <View className="mb-6">
      <Text className="mb-3 px-4 text-2xl font-bold text-white">{title}</Text>
      <FlatList
        horizontal
        data={movies}
        keyExtractor={(item) => String(item.id)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8 }}
        renderItem={({ item }) => (
          <MoviePoster
            movie={item}
            smallPoster
            onPress={() => router.push(`/movie/${item.id}`)}
          />
        )}
      />
    </View>
  );
}

import { useRouter } from "expo-router";
import { FlatList, useWindowDimensions, View } from "react-native";

import { MoviePoster } from "@/components/movies/MoviePoster";
import type { Movie } from "@/types/movie";

// Ancho del póster grande (170) más el padding horizontal de MoviePoster (8 + 8).
const ITEM_WIDTH = 186;

type Props = {
  movies: Movie[];
};

export function MainSlideshow({ movies }: Props) {
  const router = useRouter();
  const { width } = useWindowDimensions();

  if (!movies.length) return null;

  const sidePadding = Math.max((width - ITEM_WIDTH) / 2, 0);

  return (
    <View className="mb-5 w-full">
      <FlatList
        horizontal
        data={movies.slice(0, 8)}
        keyExtractor={(item) => String(item.id)}
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: sidePadding }}
        renderItem={({ item }) => (
          <MoviePoster
            movie={item}
            onPress={() => router.push(`/movie/${item.id}`)}
          />
        )}
      />
    </View>
  );
}

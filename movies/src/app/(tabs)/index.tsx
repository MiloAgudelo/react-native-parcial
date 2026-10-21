import { ActivityIndicator, Text, View } from "react-native";

import { MainSlideshow } from "@/components/movies/MainSlideshow";
import { MovieHorizontalList } from "@/components/movies/MovieHorizontalList";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";
import { useMovies } from "@/features/movies/hooks/useMovies";

export default function HomeScreen() {
  const { nowPlayingQuery, popularQuery, topRatedQuery, upcomingQuery } =
    useMovies();

  if (nowPlayingQuery.isPending) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.accent} />
          <Text className="mt-3 text-zinc-400">Cargando películas...</Text>
        </View>
      </Screen>
    );
  }

  if (nowPlayingQuery.isError) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-center text-lg text-white">
            No pudimos cargar las películas.
          </Text>
          <Text className="mt-2 text-center text-zinc-400">
            Revisa tu conexión y la configuración de TMDB.
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <Text className="mb-2 mt-5 px-4 text-3xl font-bold text-white">
        Películas App
      </Text>
      <MainSlideshow movies={nowPlayingQuery.data} />
      <MovieHorizontalList title="Populares" movies={popularQuery.data ?? []} />
      <MovieHorizontalList
        title="Mejor calificadas"
        movies={topRatedQuery.data ?? []}
      />
      <MovieHorizontalList
        title="Próximamente"
        movies={upcomingQuery.data ?? []}
      />
    </Screen>
  );
}

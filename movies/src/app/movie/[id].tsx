import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MovieCast } from "@/components/movie-old/MovieCast";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";
import { useMovie } from "@/features/movies/hooks/useMovie";
import { formatCurrency, formatDuration } from "@/utils/formatter";

export default function MovieDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { movieQuery, castQuery } = useMovie(Number(id));
  const { data: movie, isPending, isError } = movieQuery;

  if (isPending) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      </Screen>
    );
  }

  if (isError || !movie) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-center text-white">
            No se pudo cargar la película
          </Text>
          <Pressable
            onPress={() => router.back()}
            className="mt-5 rounded-xl bg-purple-600 px-5 py-3"
          >
            <Text className="font-semibold text-white">Volver</Text>
          </Pressable>
        </View>
      </Screen>
    );
  }

  // new Date("AAAA-MM-DD") queda en UTC; getFullYear() en Colombia daría el año anterior el 1 de enero.
  const year = movie.releaseDate?.getUTCFullYear();
  const details = [
    year,
    movie.duration ? formatDuration(movie.duration) : null,
    movie.genres.join(", "),
  ].filter(Boolean);

  return (
    <ScrollView
      className="flex-1 bg-zinc-950"
      contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="relative bg-zinc-800">
        <Image
          source={movie.backdrop || movie.poster}
          contentFit="cover"
          transition={250}
          style={{ width: "100%", height: 250 }}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Volver"
          onPress={() => router.back()}
          className="absolute left-4 rounded-full bg-black/60 p-2"
          style={{ top: insets.top + 8 }}
        >
          <SymbolView
            name={{ ios: "chevron.left", android: "arrow_back", web: "arrow_back" }}
            tintColor="white"
            size={24}
          />
        </Pressable>
      </View>

      <View className="-mt-16 px-5">
        <View className="overflow-hidden rounded-2xl bg-zinc-800 self-start">
          <Image
            source={movie.poster}
            contentFit="cover"
            transition={250}
            style={{ width: 120, height: 180 }}
          />
        </View>
        <Text className="mt-4 text-3xl font-bold text-white">
          {movie.title}
        </Text>
        {movie.originalTitle !== movie.title && (
          <Text className="mt-1 text-zinc-400">{movie.originalTitle}</Text>
        )}
        <Text className="mt-2 text-purple-400">
          ★ {movie.rating.toFixed(1)}
        </Text>
        {details.length > 0 && (
          <Text className="mt-1 text-zinc-400">{details.join(" · ")}</Text>
        )}

        <Text className="mt-5 text-lg font-semibold text-white">Sinopsis</Text>
        <Text className="mt-2 leading-6 text-zinc-300">
          {movie.description}
        </Text>

        {movie.budget > 0 && (
          <>
            <Text className="mt-5 text-lg font-semibold text-white">
              Presupuesto
            </Text>
            <Text className="mt-2 text-zinc-300">
              {formatCurrency(movie.budget)}
            </Text>
          </>
        )}

        {movie.productionCompanies.length > 0 && (
          <>
            <Text className="mt-5 text-lg font-semibold text-white">
              Productoras
            </Text>
            <Text className="mt-2 leading-6 text-zinc-300">
              {movie.productionCompanies.join(", ")}
            </Text>
          </>
        )}
      </View>

      {!castQuery.isError && (
        <MovieCast cast={castQuery.data ?? []} isLoading={castQuery.isPending} />
      )}
    </ScrollView>
  );
}

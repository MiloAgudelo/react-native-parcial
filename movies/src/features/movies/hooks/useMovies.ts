import { useQuery } from "@tanstack/react-query";

import { getMoviesByCategory, type MovieCategory } from "../api/movies.api";

const STALE_TIME = 1000 * 60 * 60;

function useMovieCategory(category: MovieCategory) {
  return useQuery({
    queryKey: ["movies", category],
    queryFn: () => getMoviesByCategory(category),
    staleTime: STALE_TIME,
  });
}

export function useMovies() {
  return {
    nowPlayingQuery: useMovieCategory("now_playing"),
    popularQuery: useMovieCategory("popular"),
    topRatedQuery: useMovieCategory("top_rated"),
    upcomingQuery: useMovieCategory("upcoming"),
  };
}

import { useQuery } from "@tanstack/react-query";

import { getMovieById, getMovieCast } from "../api/movies.api";

const STALE_TIME = 1000 * 60 * 60;

export function useMovie(id: number) {
  const enabled = Number.isInteger(id) && id > 0;

  const movieQuery = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieById(id),
    enabled,
    staleTime: STALE_TIME,
  });

  const castQuery = useQuery({
    queryKey: ["movie", id, "cast"],
    queryFn: () => getMovieCast(id),
    enabled,
    staleTime: STALE_TIME,
  });

  return { movieQuery, castQuery };
}

import { movieApi } from "@/services/api/movie-api";
import type { CastMember, CompleteMovie, Movie } from "@/types/movie";
import type {
  TMDBCreditsResponse,
  TMDBMovieDetail,
  TMDBMoviesResponse,
} from "@/features/movies/types/tmdb";
import {
  mapTMDBCastMember,
  mapTMDBMovie,
  mapTMDBMovieDetail,
} from "./movie.mapper";

export type MovieCategory = "now_playing" | "popular" | "top_rated" | "upcoming";

export const getMoviesByCategory = async (
  category: MovieCategory,
): Promise<Movie[]> => {
  const { data } = await movieApi.get<TMDBMoviesResponse>(`/${category}`, {
    params: { language: "es-MX" },
  });
  return data.results.map(mapTMDBMovie);
};

export const getMovieById = async (id: number): Promise<CompleteMovie> => {
  const { data } = await movieApi.get<TMDBMovieDetail>(`/${id}`, {
    params: { language: "es-MX" },
  });
  return mapTMDBMovieDetail(data);
};

export const getMovieCast = async (id: number): Promise<CastMember[]> => {
  const { data } = await movieApi.get<TMDBCreditsResponse>(`/${id}/credits`, {
    params: { language: "es-MX" },
  });
  return data.cast
    .slice()
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .slice(0, 20)
    .map(mapTMDBCastMember);
};

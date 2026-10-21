import type { CastMember, CompleteMovie, Movie } from "@/types/movie";
import type {
  TMDBCastMember,
  TMDBMovie,
  TMDBMovieDetail,
} from "@/features/movies/types/tmdb";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const imageUrl = (path: string | null, size: "w500" | "w780" = "w500") =>
  path ? `${IMAGE_BASE_URL}/${size}${path}` : "";

// TMDB devuelve "" cuando no hay traducción de la sinopsis, por eso `||` y no `??`.
export const mapTMDBMovie = (movie: TMDBMovie): Movie => ({
  id: movie.id,
  title: movie.title,
  description: movie.overview || "Sin descripción disponible.",
  releaseDate: movie.release_date ? new Date(movie.release_date) : null,
  poster: imageUrl(movie.poster_path),
  backdrop: imageUrl(movie.backdrop_path, "w780"),
  rating: movie.vote_average,
});

export const mapTMDBMovieDetail = (movie: TMDBMovieDetail): CompleteMovie => ({
  id: movie.id,
  title: movie.title,
  originalTitle: movie.original_title,
  description: movie.overview || "Sin descripción disponible.",
  releaseDate: movie.release_date ? new Date(movie.release_date) : null,
  poster: imageUrl(movie.poster_path),
  backdrop: imageUrl(movie.backdrop_path, "w780"),
  rating: movie.vote_average,
  budget: movie.budget ?? 0,
  duration: movie.runtime ?? 0,
  genres: movie.genres.map((genre) => genre.name),
  productionCompanies: movie.production_companies.map((company) => company.name),
});

export const mapTMDBCastMember = (actor: TMDBCastMember): CastMember => ({
  id: actor.id,
  name: actor.name,
  character: actor.character || "Personaje no disponible",
  avatar: imageUrl(actor.profile_path),
});

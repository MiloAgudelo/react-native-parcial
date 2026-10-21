export interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string | null;
  release_date: string;
  vote_average: number;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface TMDBMovieDetail extends TMDBMovie {
  budget: number | null;
  runtime: number | null;
  genres: { id: number; name: string }[];
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];
}

export interface TMDBCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface TMDBCreditsResponse {
  id: number;
  cast: TMDBCastMember[];
}

export interface TMDBMoviesResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

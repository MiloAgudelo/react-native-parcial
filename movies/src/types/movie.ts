export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: Date | null;
  poster: string;
  backdrop: string;
  rating: number;
}

export interface CompleteMovie extends Movie {
  originalTitle: string;
  budget: number;
  duration: number;
  genres: string[];
  productionCompanies: string[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  avatar: string;
}

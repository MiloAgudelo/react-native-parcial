import axios from "axios";

export const movieApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_MOVIE_DB_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_DB_TOKEN}`,
  },
});

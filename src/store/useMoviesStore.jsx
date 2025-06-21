import axios from "axios";
import { create } from "zustand";
import { API_KEY } from "../api/api";
import { Recommend } from "@mui/icons-material";

export const useMoviesStore = create((set) => ({
  movies: [],
  moviesTrending: [],
  moviesRated: [],
  topCast: [],
  detailsItem: [],
  loader: false,
  trailer: [],
  actorsBio: [],
  actorMovies: [],
  similarMovies: [],
  recommendMovies: [],

  getTrending: async (timeWindow = "day") => {
    set({ loader: true });
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/${timeWindow}?api_key=${API_KEY}`
      );
      set({ moviesTrending: data.results, loader: false });
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      set({ loader: false });
    }
  },

  getPopular: async (mediaType = "movie") => {
    set({ loader: true });
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      set({ movies: data.results, loader: false });
    } catch (error) {
      console.error("Error fetching popular popular:", error);
      set({ loader: false });
    }
  },

  getTopRated: async (mediaType = "movie") => {
    set({ loader: true });
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );
      set({ moviesRated: data.results, loader: false });
    } catch (error) {
      console.error("Error fetching top rated topRated:", error);
      set({ loader: false });
    }
  },

  getDetailsItems: async (movieId) => {
    set({ loader: true });
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
      );
      set({ detailsItem: data, loader: false });
    } catch (error) {
      console.error("Error fetching movie details:", error);
      set({ loader: false });
    }
  },

  getTopCast: async (actorId) => {
    set({ loader: true });
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${actorId}/credits?api_key=${API_KEY}&language=en-US`
      );
      set({ topCast: data.cast, loader: false });
    } catch (error) {
      console.error("Error fetching cast:", error);
      set({ loader: false });
    }
  },

  getTrailer: async (trailerId) => {
    set({ loader: true });
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${trailerId}/videos?api_key=${API_KEY}&language=en-US`
      );
      set({ trailer: data.results, loader: false });
    } catch (error) {
      console.error("Error fetching trailer:", error);
      set({ loader: false });
    }
  },

  getActorBio: async (personId) => {
    set({ loader: true });
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/person/${personId}?api_key=${API_KEY}&language=en-US`
      );
      set({ actorsBio: data, loader: false });
    } catch (error) {
      console.error("Error fetching actor bio:", error);
      set({ loader: false });
    }
  },

  getActorsMovies: async (actorId) => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${API_KEY}&language=en-US`
      );
      set({ actorMovies: data.cast, loader: false });
    } catch (error) {
      console.error("Error fetching Actor movies:", error);
      set({ loader: false });
    }
  },

  getSimilarMovies: async (movieId) => {
    set({ loader: true });
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`
      );
      set({ similarMovies: data.results, loader: false });
    } catch (error) {
      console.error("Error fetching similar movies:", error);
      set({ loader: false });
    }
  },

  getRecomendMovies: async (movieId) => {
    set({ loader: true });
    try {
      let { data } =
        await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US&page=1
`);
      set({ recommendMovies: data.results, loader: false });
    } catch (error) {
      console.error("Error fetching similar movies:", error);
      set({ loader: false });
    }
  },
}));

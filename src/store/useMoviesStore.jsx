import axios from "axios";
import { create } from "zustand";
import { API_KEY } from "../api/api";

export const useMoviesStore = create((set, get) => ({
  moviesPopular: [],
  moviesTrending: [],
  moviesRated: [],
  topCast: [],
  detailsItem: [],
  trailer: [],
  officialVideos: [],
  actorsBio: [],
  actorMovies: [],
  similarMovies: [],
  recommendMovies: [],
  movies: [],
  searchPage: 1,
  More: true,
  loader: false,
  genre: [],
  tvGenre: [],
  TvShows: [],
  results: [],
  page: 1,

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
      const url = `https://api.themoviedb.org/3/${mediaType}/popular?api_key=${API_KEY}&language=en-US&page=1`;
      const { data } = await axios.get(url);
      set({ moviesPopular: data.results, loader: false });
    } catch (error) {
      console.error("Error fetching moviesPopular:", error);
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
      console.error("Error fetching top rated:", error);
      set({ loader: false });
    }
  },

  getDetailsItems: async (id, type = "movie") => {
    set({ loader: true });
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=en-US`
      );
      set({ detailsItem: data, loader: false });
    } catch (error) {
      console.error("Error fetching details:", error);
      set({ loader: false });
    }
  },

  getTopCast: async (id, type = "movie") => {
    set({ loader: true });
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${API_KEY}&language=en-US`
      );
      set({ topCast: data.cast, loader: false });
    } catch (error) {
      console.error("Error fetching cast:", error);
      set({ loader: false });
    }
  },

  getTrailer: async (id, type = "movie") => {
    set({ loader: true });
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      const trailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      set({ trailer, loader: false });
    } catch (error) {
      console.error("Error fetching trailer:", error);
      set({ loader: false });
    }
  },

  getOfficialVideos: async (id, type = "movie") => {
    set({ loader: true });
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      set({ officialVideos: data.results, loader: false });
    } catch (error) {
      console.error("Error fetching officialVideos:", error);
      set({ loader: false });
    }
  },

  getSimilarMovies: async (id, type = "movie") => {
    set({ loader: true });
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
      );
      set({ similarMovies: data.results, loader: false });
    } catch (error) {
      console.error("Error fetching similar movies:", error);
      set({ loader: false });
    }
  },

  getRecomendMovies: async (id, type = "movie") => {
    set({ loader: true });
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
      );
      set({ recommendMovies: data.results, loader: false });
    } catch (error) {
      console.error("Error fetching recommended movies:", error);
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
      console.error("Error fetching actor movies:", error);
      set({ loader: false });
    }
  },

  getSortedMovies: async (
    selectedGenre = "",
    selectedSort = "",
    reset = false
  ) => {
    const { page, movies } = get();
    const nextPage = reset ? 1 : page;
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${nextPage}`;

    if (selectedGenre) url += `&with_genres=${selectedGenre}`;
    if (selectedSort) url += `&sort_by=${selectedSort}`;

    try {
      const res = await axios.get(url);
      const newMovies = res.data.results;
      set({
        movies: reset ? newMovies : [...movies, ...newMovies],
        page: nextPage + 1,
        More: newMovies.length > 0,
      });
    } catch (err) {
      console.error("Error loading movies", err);
    } finally {
      set({ loader: false });
    }
  },

  getGenres: async () => {
    set({ loader: true });
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      set({ genre: data.genres, loader: false });
    } catch (error) {
      console.log("Error fetching genres", error);
      set({ loader: false });
    }
  },

  getSortedTvShows: async (
    selectedGenre = "",
    selectedSort = "",
    reset = false
  ) => {
    const { page, TvShows } = get();
    const nextPage = reset ? 1 : page;
    let url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&page=${nextPage}`;

    if (selectedGenre) url += `&with_genres=${selectedGenre}`;
    if (selectedSort) url += `&sort_by=${selectedSort}`;

    try {
      const res = await axios.get(url);
      const newShows = res.data.results;
      set({
        TvShows: reset ? newShows : [...TvShows, ...newShows],
        page: nextPage + 1,
        More: newShows.length > 0,
      });
    } catch (err) {
      console.error("Error loading TV shows", err);
    } finally {
      set({ loader: false });
    }
  },

  getTvGenres: async () => {
    set({ loader: true });
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`
      );
      set({ tvGenre: data.genres, loader: false });
    } catch (error) {
      console.log("Error fetching TV genres", error);
      set({ loader: false });
    }
  },

  searchMovies: async (query, page = 1, reset = false) => {
    if (!query) return;
    set({ loader: true });
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/multi`,
        {
          params: {
            api_key: API_KEY,
            query,
            language: "en-US",
            page,
          },
        }
      );
      set((state) => ({
        results: reset ? data.results : [...state.results, ...data.results],
        searchPage: page + 1,
        loader: false,
      }));
    } catch (error) {
      set({ error: error.message, loader: false });
    }
  },
}));

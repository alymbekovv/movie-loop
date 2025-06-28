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
  page: 1,
  More: true,
  loader: false,
  genre: [],

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
      const url =
        mediaType === "tv"
          ? `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}&language=en-US&page=1`
          : `https://api.themoviedb.org/3/${mediaType}/popular?api_key=${API_KEY}&language=en-US&page=1`;

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

  getTrailer: async (movieId) => {
    set({ loader: true });
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
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

  getOfficialVideos: async (officialVideosId) => {
    set({ loader: true });
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${officialVideosId}/videos?api_key=${API_KEY}&language=en-US`
      );
      set({ officialVideos: data.results, loader: false });
    } catch (error) {
      console.error("Error fetching officialVideos:", error);
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

  getSortedMovies: async (
    selectedGenre = "",
    selectedSort = "",
    reset = false
  ) => {
    const { page, movies } = get();
    const nextPage = reset ? 1 : page;

    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${nextPage}`;

    if (selectedGenre) {
      url += `&with_genres=${selectedGenre}`;
    }

    if (selectedSort) {
      url += `&sort_by=${selectedSort}`;
    }

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
      console.log("Error fetching", error);
      console.log({ loader: false });
    }
  },
}));

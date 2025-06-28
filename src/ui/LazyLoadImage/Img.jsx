import React, { useEffect, useMemo } from "react";
import { useMoviesStore } from "../../store/useMoviesStore";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Img = () => {
  const { moviesPopular, getPopular } = useMoviesStore();

  useEffect(() => {
    getPopular();
  }, []);

  const imageBaseURL = "https://image.tmdb.org/t/p/original";

  const randomMovie = useMemo(() => {
    if (moviesPopular.length === 0) return null;
    const index = Math.floor(Math.random() * moviesPopular.length);
    return moviesPopular[index];
  }, [moviesPopular]);

  if (!randomMovie?.backdrop_path) return null;

  const imageUrl = `${imageBaseURL}${randomMovie.backdrop_path}`;

  return (
    <LazyLoadImage
      style={{ objectFit: "cover", backgroundPosition: "center" }}
      alt=""
      height="600px"
      src={imageUrl}
      width="100%"
    />
  );
};

export default Img;

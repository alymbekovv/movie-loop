import React, { useEffect, useMemo, useState } from "react";
import { useMoviesStore } from "../../store/useMoviesStore";
import { LazyLoadImage } from "react-lazy-load-image-component";
import scss from "./img.module.scss";

const Img = () => {
  const { moviesPopular, getPopular } = useMoviesStore();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getPopular();
  }, [getPopular]);

  const imageBaseURL = "https://image.tmdb.org/t/p/original";

  const randomMovie = useMemo(() => {
    if (moviesPopular.length === 0) return null;
    const index = Math.floor(Math.random() * moviesPopular.length);
    return moviesPopular[index];
  }, [moviesPopular]);

  if (!randomMovie?.backdrop_path) return null;

  const imageUrl = `${imageBaseURL}${randomMovie.backdrop_path}`;

  return (
    <div className={`${scss.imageWrapper} ${loaded ? scss.loaded : ""}`}>
      <LazyLoadImage
        afterLoad={() => setLoaded(true)}
        alt={randomMovie.title || "Movie"}
        height="660px"
        src={imageUrl}
        width="100%"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default Img;

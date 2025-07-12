import React, { useEffect } from "react";
import { useMoviesStore } from "../../../../../store/useMoviesStore";
import Carousel from "../../../../../ui/Carousel/Carousel";

const SimilarMovies = ({ movieId, type }) => {
  const { getSimilarMovies, similarMovies } = useMoviesStore();

  useEffect(() => {
    if (movieId && type) {
      getSimilarMovies(movieId, type);
    }
  }, [movieId, type]);
  return (
    <div className="carouselSection">
      <div className="container">
        <div className="tabs">
          <span className="carouselTitle">Similar Movies</span>
        </div>
      </div>
      <Carousel data={similarMovies} mediaType={type} />
    </div>
  );
};

export default SimilarMovies;

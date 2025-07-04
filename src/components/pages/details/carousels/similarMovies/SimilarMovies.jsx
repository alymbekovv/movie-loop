import React, { useEffect } from "react";
import { useMoviesStore } from "../../../../../store/useMoviesStore";
import Carousel from "../../../../../ui/Carousel/Carousel";

const SimilarMovies = ({ movieId }) => {
  const { getSimilarMovies, similarMovies } = useMoviesStore();

  useEffect(() => {
    if (movieId) {
      getSimilarMovies(movieId);
    }
  }, [movieId]);
  return (
    <div className="carouselSection">
      <div className="container">
        <div className="tabs">
          <span className="carouselTitle">Similar Movies</span>
        </div>
      </div>
      <Carousel data={similarMovies} />
    </div>
  );
};

export default SimilarMovies;

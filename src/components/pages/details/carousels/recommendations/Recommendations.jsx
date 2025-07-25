import React, { useEffect } from "react";
import { useMoviesStore } from "../../../../../store/useMoviesStore";
import Carousel from "../../../../../ui/Carousel/Carousel";

const Recommendations = ({ movieId, type }) => {
  const { recommendMovies, getRecomendMovies } = useMoviesStore();

  useEffect(() => {
    if (movieId && type) {
      getRecomendMovies(movieId, type);
    }
  }, [movieId, type]);
  return (
    <div className="carouselSection">
      <div className="container">
        <div className="tabs">
          <span className="carouselTitle">Recommendations</span>
        </div>
      </div>
      <Carousel data={recommendMovies} />
    </div>
  );
};

export default Recommendations;

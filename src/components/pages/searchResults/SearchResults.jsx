import React, { useEffect, useState } from "react";
import scss from "./searchResults.module.scss";
import { Link, useParams } from "react-router-dom";
import { useMoviesStore } from "../../../store/useMoviesStore";
import notImg from "../../../assets/Снимок экрана 2025-06-21 в 15.28.03.png";

const SearchResults = () => {
  const { query } = useParams();
  const { searchMovies, results, searchPage } = useMoviesStore();

  const [visibleCount, setVisibleCount] = useState(5);
  const visibleMovies = results.slice(0, visibleCount);

  useEffect(() => {
    if (query) {
      searchMovies(query, 1, true);
      setVisibleCount(5);
    }
  }, [query]);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

      if (nearBottom) {
        searchMovies(query, searchPage);

        setVisibleCount((prev) => prev + 5);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [query, searchPage]);

  const getColor = (rating) => {
    if (rating >= 7) return "#21d07a";
    if (rating >= 5) return "#ff9800";
    return "#f44336";
  };

  return (
    <div className={scss.searchContainer}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.list}>
            {visibleMovies.map((item) => {
              const rating = item.vote_average?.toFixed(1) || 0;
              const percentage = rating * 10;
              const angle = percentage * 3.6;
              const circleColor = getColor(rating);

              return (
                <Link
                  to={`/details/${item.id}`}
                  key={item.id}
                  style={{ textDecoration: "none" }}
                >
                  <div className={scss.card}>
                    <img
                      className={scss.poster}
                      src={
                        item.poster_path
                          ? `https://media.themoviedb.org/t/p/w440_and_h660_face${item.poster_path}`
                          : notImg
                      }
                      alt={item.title}
                    />
                    <div className={scss.info}>
                      <div className={scss.rating}>
                        <div
                          className={scss.ratingCircle}
                          style={{
                            background: `conic-gradient(${circleColor} ${angle}deg, #e0e0e0 0deg)`,
                          }}
                        >
                          <span className={scss.text}>{rating}</span>
                        </div>
                      </div>
                      <div className={scss.title}>
                        {item.title || item.name}
                      </div>
                      <div className={scss.date}>
                        {item.release_date || item.first_air_date}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>  
      </div>
    </div>
  );
};

export default SearchResults;

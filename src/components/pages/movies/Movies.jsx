import React, { useEffect, useState } from "react";
import scss from "./movies.module.scss";
import { useMoviesStore } from "../../../store/useMoviesStore";
import { Link } from "react-router-dom";
import notImg from "../../../assets/Снимок экрана 2025-06-21 в 15.28.03.png";

const Movies = () => {
  const { movies, getSortedMovies, genre, getGenres } = useMoviesStore();
  const [visibleCount, setVisibleCount] = useState(5);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const visibleMovies = movies.slice(0, visibleCount);

  useEffect(() => {
    getGenres();
    getSortedMovies();
  }, []);

  useEffect(() => {
    getSortedMovies(selectedGenre, selectedSort, true);
    setVisibleCount(5);
  }, [selectedGenre, selectedSort]);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

      if (nearBottom) {
        setVisibleCount((prev) => prev + 5);
        if (visibleCount >= movies.length) {
          getSortedMovies(selectedGenre, selectedSort);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleCount, movies.length, selectedGenre, selectedSort]);

  return (
    <div className={scss.moviesContainer}>
      <div className="container">
        <div className={scss.explore}>
          <h4>Explore Movies</h4>
          <div className={scss.select_content}>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="">Select genres</option>
              {genre.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>

            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
            >
              <option value="">sort by</option>
              <option value="popularity.desc">Popularity ↓</option>
              <option value="popularity.asc">Popularity ↑</option>
              <option value="vote_average.desc">Rating ↓</option>
              <option value="vote_average.asc">Rating ↑</option>
              <option value="release_date.desc">Release Date ↓</option>
              <option value="release_date.asc">Release Date ↑</option>
            </select>
          </div>
        </div>
        <div className={scss.content}>
          <div className={scss.list}>
            {visibleMovies.map((item) => {
              const rating = item.vote_average?.toFixed(1) || 0;
              const percentage = rating * 10;
              const angle = percentage * 3.6;

              const getColor = (rating) => {
                if (rating >= 7) return "#21d07a";
                if (rating >= 5) return "#ff9800";
                return "#f44336";
              };
              const circleColor = getColor(rating);

              return (
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/details/${item.id}`}
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

export default Movies;

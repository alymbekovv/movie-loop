import React from "react";
import scss from "./MoviesCart.module.scss";
import { Link } from "react-router-dom";
import notImg from "../assets/Снимок экрана 2025-06-21 в 15.28.03.png";

const MoviesCart = ({ item }) => {
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
    <Link style={{ textDecoration: "none" }} to={`/details/${item.id}`}>
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
          <div className={scss.title}>{item.title || item.name}</div>
          <div className={scss.date}>
            {item.release_date || item.first_air_date}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MoviesCart;

import React, { useEffect } from "react";
import scss from "./cast.module.scss";
import { useMoviesStore } from "../../../../store/useMoviesStore";
import { Link } from "react-router-dom";

const Cast = ({ actorId, api_key, type }) => {
  const { topCast, getTopCast } = useMoviesStore();

  useEffect(() => {
    getTopCast(actorId, type);
  }, [actorId, api_key]);

  return (
    <div className={scss.cast_container}>
      <div className="container">
        <h2 className={scss.title}>Top Cast</h2>
        <div className={scss.scrollWrapper}>
          <div className={scss.cast_list}>
            {topCast.map((item, index) => (
              <Link
                key={index}
                className={scss.link}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
                to={`/actorsDetails/${item.id}`}
              >
                <img
                  src={
                    item.profile_path
                      ? `https://media.themoviedb.org/t/p/w276_and_h350_face/${item.profile_path}`
                      : `https://shortstoryproject.com/wp-content/webp-express/webp-images/uploads/2021/10/placeholder_card-1.jpg.webp`
                  }
                  alt={item.name}
                />
                <h4>{item.name}</h4>
                <p>{item.character}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cast;

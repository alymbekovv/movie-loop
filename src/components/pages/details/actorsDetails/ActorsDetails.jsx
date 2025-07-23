import React, { useEffect, useState } from "react";
import scss from "./actorsDetails.module.scss";
import { Link, useParams } from "react-router-dom";
import { useMoviesStore } from "../../../../store/useMoviesStore";
import notImg from "../../../../assets/Снимок экрана 2025-06-21 в 15.28.03.png";

const ActorsDetails = () => {
  const { actorsBio, getActorBio, getActorsMovies, actorMovies } =
    useMoviesStore();
  const { id, type } = useParams();
  const [showFullBio, setShowFullBio] = useState(false);

  const biographyWords = actorsBio.biography?.split("") || [];
  const longBio = biographyWords.length > 390;
  const shortBio = biographyWords.slice(0, 390).join("") + "...";

  useEffect(() => {
    if (id) getActorBio(id);
    getActorsMovies(id, type);
  }, [id]);

  return (
    <div className={scss.actors_container}>
      <div className="container">
        <div className={scss.actors_content}>
          <div className={scss.actor_img}>
            <img
              src={`https://image.tmdb.org/t/p/original/${actorsBio.profile_path}`}
              alt=""
            />
          </div>
          <div className={scss.Actor_bio}>
            <h2>{actorsBio.name}</h2>
            <div className={scss.overview}>
              <h4>Biography</h4>
              <div className={scss.bio_text}>
                <p style={{ display: "inline" }}>
                  {showFullBio || !longBio ? actorsBio.biography : shortBio}
                  {longBio && (
                    <button
                      onClick={() => setShowFullBio(!showFullBio)}
                      style={{
                        background: "none",
                        color: "#21d07a",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        fontSize: "inherit",
                        fontFamily: "inherit",
                      }}
                    >
                      {showFullBio ? " Show less" : " Show more"}
                    </button>
                  )}
                </p>
              </div>
            </div>
            <h2 className={scss.title}>Fame for</h2>
            <div className={scss.scrollWrapper}>
              <div className={scss.fameFor_list}>
                {actorMovies.map((item) => (
                  <div key={item.id}>
                    <Link
                      to={`/details/${item.media_type || "movie"}/${item.id}`}
                    >
                      <img
                        src={
                          item.backdrop_path
                            ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2//${item.backdrop_path}`
                            : `${notImg}`
                        }
                        alt=""
                      />
                    </Link>
                    <h4>{item.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={scss.personal_info}>
          <h1>Personal information</h1>
          <div className={scss.info_table}>
            <div className={scss.info}>
              <div className={scss.name}>
                <h2>Name</h2>
                <p>{actorsBio.name}</p>
              </div>
              <div className={scss.fame}>
                <h2>Fame for</h2>
                <p>{actorsBio.known_for_department}</p>
              </div>{" "}
              <div className={scss.birth}>
                <h2>Date of birth</h2>
                <p>{actorsBio.birthday}</p>
              </div>
              <div className={scss.place}>
                <h2>Place of birth</h2>
                <p>{actorsBio.place_of_birth}</p>
              </div>{" "}
              <div className={scss.also_known_as}>
                <h2>Also known as</h2>
                <p>{actorsBio.also_known_as}</p>
              </div>
              <div className={scss.rating_popular}>
                <h2>Rating</h2>
                <p>{actorsBio.popularity}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorsDetails;

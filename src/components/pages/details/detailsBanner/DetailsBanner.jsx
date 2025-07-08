import React, { useEffect, useState } from "react";
import scss from "./detailsBanner.module.scss";
import { useMoviesStore } from "../../../../store/useMoviesStore";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DetailsBanner = () => {
  const { id, type } = useParams();
  const { detailsItem, getDetailsItems, loader, trailer, getTrailer } =
    useMoviesStore();

  console.log(detailsItem);

  const [openWindow, setOpenWindow] = useState(false);
  const [vidoeKey, setVideoKey] = useState("");

  const openModal = (key) => {
    setVideoKey(key);
    setOpenWindow(true);
  };

  useEffect(() => {
    getDetailsItems(id, type);
    getTrailer(id, type);
  }, [id]);

  const rating = detailsItem.vote_average?.toFixed(1) || 0;
  const percentage = rating * 10;
  const angle = percentage * 3.6;

  const getColor = (rating) => {
    if (rating >= 7) return "#21d07a";
    if (rating >= 5) return "#ff9800";
    return "#f44336";
  };
  const circleColor = getColor(rating);

  if (loader) {
    return (
      <div className={scss.details_container} style={{ paddingTop: "120px" }}>
        <div className="container">
          <div className={scss.content}>
            <div className={scss.detailsImg}>
              <Skeleton
                height={530}
                width={350}
                style={{ borderRadius: "20px", background: "#2d2d2q" }}
              />
            </div>
            <div className={scss.details_text}>
              <h1 className={scss.title}>
                <Skeleton width={500} height={20} />
              </h1>
              <p className={scss.tagline}>
                <Skeleton width={200} height={20} />
              </p>
              <div className={scss.genres}>
                <Skeleton width={60} height={15} />
                <Skeleton width={60} height={15} />
              </div>
              <div className={scss.rating_trailer}>
                <Skeleton circle width={80} height={80} />
                <Skeleton circle width={80} height={80} style={""} />
                <Skeleton width={100} height={20} />
              </div>
              <div className={scss.overview}>
                <h4>
                  <Skeleton width={100} />
                </h4>
                <Skeleton count={4} />
              </div>
              <div className={scss.info}>
                <Skeleton count={3} height={30} width={700} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={scss.details_container} style={{ paddingTop: "120px" }}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.detailsImg}>
            <img
              src={`https://image.tmdb.org/t/p/original${detailsItem.poster_path}`}
              alt="The Amateur"
            />
          </div>
          <img
            className={scss.backdrop_img}
            src={`https://image.tmdb.org/t/p/original/${detailsItem.backdrop_path}`}
            alt=""
          />
          <div className={scss.backdrop_overlay}></div>
          <div className={scss.details_text}>
            <h1 className={scss.title}>
              {detailsItem.title || detailsItem.name}
            </h1>
            <p className={scss.tagline}>{detailsItem.tagline}</p>

            <div className={scss.genres}>
              <span>Thriller</span>
              <span>Action</span>
            </div>

            <div className={scss.rating_trailer}>
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
              <div
                className={scss.playbtn}
                onClick={() => openModal(trailer.key)}
              >
                <svg viewBox="0 0 213.7 213.7">
                  <polygon
                    className={scss.triangle}
                    points="73.5,62.5 148.5,105.8 73.5,149.1"
                  />
                  <circle
                    className={scss.circle}
                    cx="106.8"
                    cy="106.8"
                    r="103.3"
                  />
                </svg>

                <span className={scss.textTriler}>Watch Trailer</span>
              </div>
            </div>

            <div className={scss.overview}>
              <h4>Overview</h4>
              <p>{detailsItem.overview}</p>
            </div>

            <div className={scss.info}>
              <div className={scss.info_item_parent}>
                <div className={scss.info_item}>
                  <h6>Status: </h6>
                  <p>{detailsItem.status}</p>
                </div>
                <div className={scss.info_item}>
                  <h6>Release Date: </h6>
                  <p>{detailsItem.release_date}</p>
                </div>
                <div className={scss.info_item}>
                  <h6>Runtime: </h6>
                  <p>{`${detailsItem.runtime}m`}</p>
                </div>
              </div>
              <div className={scss.info_bottom}>
                <div className={scss.info_bottom_items}>
                  <h6>Director:</h6>
                  <p>Madeline Sharafian, Domee Shi, Adrian Molina</p>
                </div>
                <div className={scss.info_bottom_items}>
                  <h6>Writer:</h6>
                  <p>
                    Julia Cho, Mark Hammer, Mike Jones, Julia Cho, Adrian
                    Molina, Domee Shi, Madeline Sharafian
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openWindow && (
        <div className={scss.modalOverlay} onClick={() => setOpenWindow(false)}>
          <div className={scss.modalContent}>
            <iframe
              src={`https://www.youtube.com/embed/${vidoeKey}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;

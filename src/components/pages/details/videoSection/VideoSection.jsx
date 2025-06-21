import React, { useEffect, useState } from "react";
import scss from "./videoSection.module.scss";
import { useMoviesStore } from "../../../../store/useMoviesStore";

const VideoSection = ({ trailerId, api_key }) => {
  const { trailer, getTrailer } = useMoviesStore();

  const [openWindow, setOpenWindow] = useState(false);
  const [vidoeKey, setVideoKey] = useState("");

  const openModal = (key) => {
    setVideoKey(key);
    setOpenWindow(true);
  };

  useEffect(() => {
    getTrailer(trailerId);
  }, [trailerId, api_key]);

  return (
    <div className={scss.trailer_container}>
      <div className="container">
        <h2 className={scss.title}>Official Videos</h2>
        <div className={scss.scrollWrapper}>
          <div className={scss.trailer_list}>
            {trailer.map((item) => (
              <div key={item.id}>
                <img
                  src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`}
                  alt={item.name}
                />
                <h4>{item.name}</h4>
                <div
                  onClick={() => openModal(item.key)}
                  className={scss.playbtn}
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {openWindow && (
        <div className={scss.modalOverlay} onClick={() => setOpenWindow(false)}>
          <div
            className={scss.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
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

export default VideoSection;

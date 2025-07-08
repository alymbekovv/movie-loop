import React, { useState } from "react";
import scss from "./HomeBanner.module.scss";
import Img from "../../ui/LazyLoadImage/Img";
import TextWriteWelcome from "../../ui/TextWriteWelcome/TextWriteWelcome";
import { useNavigate } from "react-router-dom";

const HomeBanner = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/search/${query.trim()}`);
  };

  setTimeout(() => {
    setIsImageLoaded(true);
  }, 100);

  return (
    <div className={scss.homeBanner}>
      <Img />
      {isImageLoaded && <div className={scss.overlay}></div>}
      <div className={scss.content}>
        <span className={scss.title}>
          <TextWriteWelcome />
        </span>
        <p> Открой для себя лучшие фильмы и шоу — всё в одном месте!</p>

        <div className={scss.searchBlock}>
          <input
            type="text"
            className={scss.searchInput}
            placeholder="Найти фильм, сериал или персону…"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <button className={scss.searchButton} onClick={handleSearch}>
            Поиск
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;

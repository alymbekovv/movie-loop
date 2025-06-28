import React, { useEffect, useState } from "react";
import { useMoviesStore } from "../../store/useMoviesStore";
import Carousel from "../../ui/Carousel/Carousel";
import SwitchTabs from "../../ui/SwitchTabs/SwitchTabs";

const Popular = () => {
  const { getPopular, movies } = useMoviesStore();

  const [mediaType, setMediaType] = useState("movie");

  useEffect(() => {
    getPopular(mediaType);
  }, [mediaType]);

  const tabData = ["Movies", "TV Shows"];
  const handleTabChange = (tab) => {
    setMediaType(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="carouselSection">
      <div className="container">
        <div className="tabs">
          <span className="carouselTitle">What's Popular</span>
          <SwitchTabs data={tabData} onTabChange={handleTabChange} />
        </div>
      </div>
      <Carousel data={movies} mediaType={mediaType} />
    </div>
  );
};

export default Popular;

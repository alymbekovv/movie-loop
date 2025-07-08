import React, { useEffect, useState } from "react";
import { useMoviesStore } from "../../store/useMoviesStore";
import SwitchTabs from "../../ui/SwitchTabs/SwitchTabs";
import Carousel from "../../ui/Carousel/Carousel";

const TopRated = () => {
  const { getTopRated, moviesRated } = useMoviesStore();

  const [mediaType, setMediaType] = useState("movie");

  useEffect(() => {
    getTopRated(mediaType);
  }, [mediaType]);

  const tabData = ["Movies", "TV Shows"];
  const handleTabChange = (tab) => {
    setMediaType(tab === "Movies" ? "movie" : "tv");
  };
  console.log(mediaType);

  return (
    <div className="carouselSection">
      <div className="container">
        <div className="tabs">
          <span className="carouselTitle">Top Rated</span>
          <SwitchTabs data={tabData} onTabChange={handleTabChange} />
        </div>
      </div>
      <Carousel data={moviesRated} mediaType={mediaType} />
    </div>
  );
};

export default TopRated;

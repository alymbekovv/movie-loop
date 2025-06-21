import React, { useEffect, useState } from "react";
import { useMoviesStore } from "../../store/useMoviesStore";
import SwitchTabs from "../../ui/SwitchTabs/SwitchTabs";
import Carousel from "../../ui/Carousel/Carousel";

const Trending = () => {
  const { getTrending, moviesTrending } = useMoviesStore();

  const [timeWindow, setTimeWindow] = useState("day");

  useEffect(() => {
    getTrending(timeWindow);
  }, [timeWindow]);

  const tabData = ["Day", "Week"];
  const handleTabChange = (tab) => {
    setTimeWindow(tab.toLowerCase());
  };

  return (
    <div className="carouselSection">
      <div className="container">
        <div className="tabs">
          <span className="carouselTitle">Trending</span>
          <SwitchTabs data={tabData} onTabChange={handleTabChange} />
        </div>
      </div>
      <Carousel data={moviesTrending} />
    </div>
  );
};

export default Trending;

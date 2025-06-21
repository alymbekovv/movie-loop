import React from "react";
import HomeBanner from "./HomeBanner/HomeBanner";
import Popular from "./Popular/Popular";
import Trending from "./Trending/Trending";
import TopRated from "./topRated/TopRated";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;

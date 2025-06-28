import React from "react";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideoSection from "./videoSection/VideoSection";
import { useMoviesStore } from "../../../store/useMoviesStore";
import { API_KEY } from "../../../api/api";
import SimilarMovies from "./carousels/similarMovies/SimilarMovies";
import { Recommend } from "@mui/icons-material";
import Recommendations from "./carousels/recommendations/Recommendations";

const Details = () => {
  const { detailsItem } = useMoviesStore();
  console.log(detailsItem);

  return (
    <div>
      <DetailsBanner />
      <Cast actorId={detailsItem.id} api_key={API_KEY} />
      <VideoSection officialVideosId={detailsItem.id} api_key={API_KEY} />
      <SimilarMovies movieId={detailsItem.id} />
      <Recommendations movieId={detailsItem.id} />
    </div>
  );
};

export default Details;

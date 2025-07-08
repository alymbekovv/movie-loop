import React from "react";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideoSection from "./videoSection/VideoSection";
import { useMoviesStore } from "../../../store/useMoviesStore";
import { API_KEY } from "../../../api/api";
import SimilarMovies from "./carousels/similarMovies/SimilarMovies";
import { Recommend } from "@mui/icons-material";
import Recommendations from "./carousels/recommendations/Recommendations";
import { useParams } from "react-router-dom";

const Details = () => {
  const { detailsItem } = useMoviesStore();
  const { type } = useParams();

  return (
    <div>
      <DetailsBanner />
      <Cast actorId={detailsItem.id} type={type} api_key={API_KEY} />
      <VideoSection officialVideosId={detailsItem.id} type={type} api_key={API_KEY} />
      <SimilarMovies movieId={detailsItem.id} type={type} />
      <Recommendations movieId={detailsItem.id} type={type} />
    </div>
  );
};

export default Details;

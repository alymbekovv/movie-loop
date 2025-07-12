import React, { useEffect } from "react";
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
  const { detailsItem, getDetailsItems } = useMoviesStore();

  const { id, type } = useParams();

  useEffect(() => {
    if (!id || !type) return;

    if (type !== "movie" && type !== "tv") return;

    getDetailsItems(id, type);
  }, [id, type]);

  console.log("DETAILS ID:", detailsItem.id);

  return (
    <div>
      <DetailsBanner />
      {detailsItem?.id && (
        <>
          <Cast actorId={detailsItem.id} type={type} api_key={API_KEY} />
          <VideoSection
            officialVideosId={detailsItem.id}
            type={type}
            api_key={API_KEY}
          />
          <SimilarMovies movieId={detailsItem.id} type={type} />
          <Recommendations movieId={detailsItem.id} type={type} />
        </>
      )}
    </div>
  );
};

export default Details;

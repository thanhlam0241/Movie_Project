import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
import DetailsBanner from "./detailsBanner/DetailsBanner";

import { useDispatch } from "react-redux";
import { setMovieInfo } from "@/store/movieInfoSlice";

import MoreInfo from "./MoreInfo";

import movieApi from "@/api/moviedb/movieApi.js";
import apiCredit from "@/api/movie/creditApi.js";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const fetchData = async () => {
    const dataVideo = await movieApi.getMovieDetailVideoOfficials(id);
    const dataCredit = await movieApi.getMovieDetailCredits(id);
    dispatch(setMovieInfo({ credits: dataCredit, videosOfficial: dataVideo }));
    apiCredit.getById(id);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div>
      <DetailsBanner />
      <MoreInfo />
    </div>
  );
};

export default Details;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { convertToYYYYMMDD } from "@/utils/validate";

import "./style.scss";

import ContentWrapper from "@/components/contentWrapper/ContentWrapper";
import Genres from "@/components/genres/Genres";
import CircleRating from "@/components/circleRating/CircleRating";
import Img from "@/components/lazyLoadImage/Img.jsx";
import PosterFallback from "@/assets/no-poster.png";
import { PlayIcon } from "../Playbtn";
import VideoPopup from "@/components/videoPopup/VideoPopup";

import { toast } from "react-toastify";

import useFetchApi from "@/hooks/useFetchApi";
// import useFetch from "@/hooks/useFetch";
import movieApi from "@/api/movie/movieApi.js";
import { useDispatch } from "react-redux";
import { setMovieInfo } from "@/store/movieInfoSlice";

const DetailsBanner = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const dispatch = useDispatch();

  const { isLogin } = useSelector((state) => state.auth);
  const { id } = useParams();
  // const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const { data, loading } = useFetchApi(async (movieId) => {
    const data = await movieApi.getById(movieId);
    if (data) {
      dispatch(setMovieInfo({ data: data }));
      return data;
    }
  }, id);

  const { credits } = useSelector((state) => state.movieInfo);

  const _genres = data?.genres?.map((g) => g.id);

  const director = credits?.crew?.filter((f) => f.job === "Director");
  const writer = credits?.crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const onWatchMovie = () => {
    if (!isLogin) {
      toast.info("You need to login to watch movie");
      return;
    }
    navigate(`/watch/${id}`);
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={data.backdrop_path} />
              </div>
              {/* <div className="opacity-layer"></div> */}
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img className="posterImg" src={data.poster_path} />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">{`${data.name || data.title}`}</div>
                    <div className="subtitle">{data.tagline}</div>

                    <Genres data={_genres} />

                    <div className="row">
                      <CircleRating
                        rating={
                          data?.vote_average ? data.vote_average.toFixed(1) : 0
                        }
                      />
                      <div className="playbtn" onClick={onWatchMovie}>
                        <PlayIcon />
                        <span className="text">Watch movie</span>
                      </div>
                    </div>

                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>

                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status: </span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date: </span>
                          <span className="text">
                            {convertToYYYYMMDD(data.release_date)}
                          </span>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime: </span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director: </span>
                        <span className="text">
                          {director?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {director.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer: </span>
                        <span className="text">
                          {writer?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {writer.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creator: </span>
                        <span className="text">
                          {data?.created_by?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {data?.created_by.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;

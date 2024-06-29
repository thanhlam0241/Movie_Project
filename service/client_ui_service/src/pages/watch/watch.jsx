import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "@/components/contentWrapper/ContentWrapper";
import ReactPlayer from "react-player/lazy";
import MovieCard from "@/components/movieCard/MovieCard";
import Spinner from "@/components/spinner/Spinner";
import Button from "@mui/material/Button";

import CommentContainer from "../../components/commentContainer/comment";
import RelateContent from "../../components/relateVideo/ralate";
import Rating from "@mui/material/Rating";

import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { useSelector, useDispatch } from "react-redux";
import ratingApi from "@/api/communication/ratingApi";
import movieApi from "@/api/moviedb/movieApi.js";
import movieApiS from "@/api/movie/movieApi.js";
import { setMovieInfo } from "@/store/movieInfoSlice";
import { toast } from "react-toastify";

const WatchMovie = () => {
  const { id } = useParams();
  const [url, setUrl] = useState(null);
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth);
  const { videosOfficial, data } = useSelector((state) => state.movieInfo);

  const [ratingFilm, setValueRatingFilm] = React.useState({
    rating: 0,
    my_rating: 0,
    numberRatings: 0,
  });
  const maxRating = 10;

  const fetchDetail = () => {
    if (!data || data.id !== id) {
      movieApiS.getById(id).then((detail) => {
        dispatch(setMovieInfo({ data: detail }));
      });
    }
  };

  const onStart = () => {
    movieApiS.addHistory(auth.id, id);
  };

  const fetchData = () => {
    const dataVideo = null;
    if (dataVideo) {
      setUrl(url);
    } else {
      if (
        videosOfficial &&
        videosOfficial.results &&
        videosOfficial.results.length > 0 &&
        videosOfficial.id === id
      ) {
        const firstVideo = videosOfficial?.results[0];
        if (firstVideo) {
          const key = firstVideo?.key ?? "aDm5WZ3QiIE";
          setUrl(`https://www.youtube.com/watch?v=${key}`);
        }
      } else {
        movieApi.getMovieDetailVideoOfficials(id).then((data) => {
          const firstVideo = data?.results[0];
          if (firstVideo) {
            const key = firstVideo?.key ?? "aDm5WZ3QiIE";
            setUrl(`https://www.youtube.com/watch?v=${key}`);
          }
        });
      }
    }
  };

  const fetchRating = async () => {
    const dataRating = await ratingApi.getRating(auth.id, id);
    if (dataRating) {
      setValueRatingFilm(() => ({
        rating: parseFloat(dataRating.data.description ?? 0).toFixed(2),
        my_rating: (dataRating.data.rating ?? 0) / 2,
        numberRatings: dataRating.data.total ?? 0,
      }));
    }
  };

  const addFavorite = () => {
    movieApiS
      .addFavorite(auth.id, id)
      .then(() => {
        toast.success("Add movie to list favorite successfully");
      })
      .catch((ex) => {
        toast.info(ex?.response?.data?.message || "Fail");
      });
  };

  const onChangeRating = (event, newValue) => {
    const newRating = newValue ? newValue * 2 : 0;
    const ratingChange = newRating - ratingFilm.my_rating * 2;
    const totalRating =
      ratingFilm.my_rating > 0
        ? ratingFilm.numberRatings
        : ratingFilm.numberRatings + 1;
    const newTotalRating =
      ratingFilm.rating * ratingFilm.numberRatings + ratingChange;
    const average = parseFloat(newTotalRating / totalRating).toFixed(2);
    ratingApi.rateMovie(auth.id, id, newRating).then(() => {
      setValueRatingFilm(() => ({
        rating: newTotalRating,
        my_rating: newRating / 2,
        numberRatings: totalRating,
      }));
    });
    movieApiS.update(id, {
      vote_average: average,
      vote_count: totalRating,
    });
  };

  useEffect(() => {
    fetchData();
    fetchRating();
    fetchDetail();
  }, []);

  return (
    <div className="explorePage">
      <div className="content-left">
        <ContentWrapper>
          <div className="pageHeader">
            <div className="pageTitle">Watch movie</div>
          </div>
          <div className="movie-container">
            <ReactPlayer
              onStart={onStart}
              width="100%"
              height="400px"
              controls
              url={url}
            />
          </div>
          <div className="video-more-action">
            <Button
              sx={{ height: 25, lineHeight: 25, fontSize: 12 }}
              variant="outlined"
              startIcon={<RemoveRedEyeRoundedIcon />}
            >
              12.002
            </Button>
            <Button
              onClick={addFavorite}
              sx={{ height: 25, lineHeight: 25, fontSize: 12 }}
              variant="outlined"
              startIcon={<FavoriteRoundedIcon />}
            >
              Favorite
            </Button>
          </div>
          <div className="video-information">
            <div className="video-information-left">
              <p className="movie-name">{data.title}</p>
            </div>
            <div className="video-information-right">
              <div className="rating-description">
                <span className="rating">{ratingFilm.rating}</span>
                <span className="description">
                  / {maxRating} ({ratingFilm.numberRatings} votes)
                </span>
              </div>
              <Rating
                name="half-rating"
                value={ratingFilm.my_rating}
                precision={0.5}
                onChange={onChangeRating}
              />
            </div>
          </div>
          <CommentContainer movieId={id} />
        </ContentWrapper>
      </div>
      <div className="content-right">
        <RelateContent />
      </div>
    </div>
  );
};

export default WatchMovie;

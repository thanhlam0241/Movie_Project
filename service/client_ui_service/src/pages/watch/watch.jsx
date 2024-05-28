import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchDataFromApi } from "@/utils/api";
import ContentWrapper from "@/components/contentWrapper/ContentWrapper";
import ReactPlayer from "react-player/lazy";
import MovieCard from "@/components/movieCard/MovieCard";
import Spinner from "@/components/spinner/Spinner";
import Button from "@mui/material/Button";

import CommentContainer from "../../components/commentContainer/comment";
import RelateContent from "../../components/relateVideo/ralate";
import Rating from "@mui/material/Rating";

import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import BookmarkAddRoundedIcon from "@mui/icons-material/BookmarkAddRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

let filters = {};

const WatchMovie = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);

  const [valueRating, setValueRating] = React.useState(2);

  const [ratingFilm, setValueRatingFilm] = React.useState({
    rating: 7.6,
    maxRating: 10,
    numberRatings: 1000000,
  });

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/discover/movie`, filters).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/discover/movie?page=${pageNum}`, filters).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data?.results, ...res.results],
        });
      } else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    });
  };

  useEffect(() => {
    filters = {};
    setData(null);
    setPageNum(1);
    fetchInitialData();
  }, []);

  return (
    <div className="explorePage">
      <div class="content-left">
        <ContentWrapper>
          <div className="pageHeader">
            <div className="pageTitle">Watch movie</div>
          </div>
          <div class="movie-container">
            <ReactPlayer
              width="100%"
              height="400px"
              controls
              url="https://muiplayer.js.org/media/media.mp4"
            />
          </div>
          <div class="video-more-action">
            <Button
              sx={{ height: 25, lineHeight: 25, fontSize: 12 }}
              variant="outlined"
              startIcon={<RemoveRedEyeRoundedIcon />}
            >
              12.002
            </Button>
            <Button
              sx={{ height: 25, lineHeight: 25, fontSize: 12 }}
              variant="outlined"
              startIcon={<BookmarkAddRoundedIcon />}
            >
              Bookmark
            </Button>
            <Button
              sx={{ height: 25, lineHeight: 25, fontSize: 12 }}
              variant="outlined"
              startIcon={<FavoriteRoundedIcon />}
            >
              Favorite
            </Button>
          </div>
          <div class="video-information">
            <div class="video-information-left">
              <p class="movie-name">
                The Money of Soul and Possibility Control Vietsub - HD
              </p>
            </div>
            <div class="video-information-right">
              <div class="rating-description">
                <span class="rating">{ratingFilm.rating}</span>
                <span class="description">
                  / {ratingFilm.maxRating} ({ratingFilm.numberRatings} votes)
                </span>
              </div>
              <Rating name="half-rating" defaultValue={0} precision={0.5} />
            </div>
          </div>
          <CommentContainer />
        </ContentWrapper>
      </div>
      <div class="content-right">
        <RelateContent />
      </div>
    </div>
  );
};

export default WatchMovie;

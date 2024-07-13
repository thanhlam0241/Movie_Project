import React, { useState, Fragment, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import ContentWrapper from "@/components/contentWrapper/ContentWrapper";
import MovieCard from "@/components/movieCard/MovieCard";
import Spinner from "@/components/spinner/Spinner";
import { useSelector, useDispatch } from "react-redux";
import movieAPI from "../../api/movie/movieAPI";

import { setRecommend } from "@/store/recommendSlice";

const Recommend = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const { id } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.recommend);

  const fetchInitialData = () => {
    if (!items || !items.length) setLoading(true);
    movieAPI
      .getRecommendation(id)
      .then((dataRecommend) => {
        if (dataRecommend) {
          console.log(dataRecommend);
          dispatch(setRecommend({ data: dataRecommend.data }));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (items && items.length) {
      setData({
        results: items,
        total_pages: 1,
        total_results: items.length,
      });
    }
  }, [items]);

  const fetchNextPageData = () => {};

  useEffect(() => {
    setData(null);
    setPageNum(1);
    fetchInitialData();
  }, []);

  return (
    <div className="explorePage">
      <ContentWrapper>
        <div className="pageHeader">
          <div className="pageTitle">Recommendation for you</div>
        </div>
        {loading && <Spinner initial={true} />}
        {!loading && (
          <>
            {data?.results?.length > 0 ? (
              <InfiniteScroll
                className="content"
                dataLength={data?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum < 1}
                loader={<Spinner />}
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} mediaType="movie" />
                  );
                })}
              </InfiniteScroll>
            ) : (
              <span className="resultNotFound">Sorry, Results not found!</span>
            )}
          </>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Recommend;

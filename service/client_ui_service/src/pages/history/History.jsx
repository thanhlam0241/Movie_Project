import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";

import { useSelector } from "react-redux";
import movieAPI from "../../api/movie/movieAPI";

const History = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);

  const { id } = useSelector((state) => state.auth);

  const fetchInitialData = () => {
    setLoading(true);
    movieAPI
      .getHistory(id, pageNum)
      .then((res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        console.log(res);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchNextPageData = () => {
    setLoading(true);
    if (pageNum > pageMax) return;
    movieAPI
      .getHistory(id, pageNum)
      .then((res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setData(null);
    setPageNum(1);
    fetchInitialData();
  }, []);

  return (
    <div className="explorePage">
      <ContentWrapper>
        <div className="pageHeader">
          <div className="pageTitle">Favorite</div>
        </div>
        {loading && <Spinner initial={true} />}
        {!loading && (
          <>
            {data?.results?.length > 0 ? (
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
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

export default History;

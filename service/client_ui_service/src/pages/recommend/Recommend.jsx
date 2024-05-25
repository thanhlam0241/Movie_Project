import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchDataFromApi } from "@/utils/api";
import ContentWrapper from "@/components/contentWrapper/ContentWrapper";
import MovieCard from "@/components/movieCard/MovieCard";
import Spinner from "@/components/spinner/Spinner";

let filters = {};

const Recommend = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);

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

export default Recommend;

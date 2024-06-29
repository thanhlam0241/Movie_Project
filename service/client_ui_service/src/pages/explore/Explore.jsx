import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";

import "./style.scss";

import useFetch from "../../hooks/useFetch";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";

import movieAPI from "../../api/movie/movieAPI";

const sortbyData = [
  {
    value: 1,
    field: "vote_average",
    order: "desc",
    label: "Rating Descending",
  },
  { value: 2, field: "vote_average", order: "asc", label: "Rating Ascending" },
  {
    value: 3,
    field: "release_date",
    order: "desc",
    label: "Release Date Descending",
  },
  {
    value: 4,
    field: "release_date",
    order: "asc",
    label: "Release Date Ascending",
  },
  { value: 5, field: "original_title", order: "desc", label: "Title (A-Z)" },
];

const Explore = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);
  const [genres, setGenres] = useState([]);

  const { data: genresData } = useFetch(`/genre/movie/list`);

  const fetchInitialData = () => {
    setLoading(true);
    movieAPI
      .filter(
        genres,
        pageNum,
        sortby ? sortby.field : null,
        sortby ? sortby.order : null
      )
      .then((res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      });
  };

  const fetchNextPageData = () => {
    movieAPI
      .filter(
        genres,
        pageNum,
        sortby ? sortby.field : null,
        sortby ? sortby.order : null
      )
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
      });
  };

  const onChange = (selectedItems, action) => {
    if (action.name === "sortby") {
      setSortby(selectedItems);
    } else if (action.name === "genres") {
      setGenre(selectedItems);
      if (action.action !== "clear") {
        let genreIds = selectedItems.map((g) => g.id);
        setGenres(genreIds);
      } else {
        delete setGenres([]);
      }
    }

    setPageNum(1);
    fetchInitialData();
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
          <div className="pageTitle">Movies</div>
          <div className="filters">
            <Select
              isMulti
              name="genres"
              value={genre}
              closeMenuOnSelect={false}
              options={genresData?.genres}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={onChange}
              placeholder="Select genres"
              className="react-select-container genresDD"
              classNamePrefix="react-select"
            />
            <Select
              name="sortby"
              value={sortby}
              options={sortbyData}
              onChange={onChange}
              isClearable={true}
              placeholder="Sort by"
              className="react-select-container sortbyDD"
              classNamePrefix="react-select"
            />
          </div>
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

export default Explore;

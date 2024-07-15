import React, { useState, useEffect } from "react";

import Carousel from "@/components/carousel/Carousel";
import ContentWrapper from "@/components/contentWrapper/ContentWrapper";
import SwitchTabs from "@/components/switchTabs/SwitchTabs";
import movieAPI from "@/api/movie/movieAPI";
import { useSelector, useDispatch } from "react-redux";

import { setRecommend } from "@/store/recommendSlice";

const Recommend = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [endpoint, setEndpoint] = useState("movie");
  const dispatch = useDispatch();

  const { id } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.recommend);

  const fetchInitialData = () => {
    if (!items || !items.length) setLoading(true);
    movieAPI
      .getRecommendation(id)
      .then((dataRecommend) => {
        if (dataRecommend) dispatch(setRecommend({ data: dataRecommend.data }));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setData({
      results: items,
    });
  }, [items]);

  useEffect(() => {
    setData([]);
    fetchInitialData();
  }, []);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div style={{ marginTop: 10 }} className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Recommend for you</span>
        <SwitchTabs data={["Movies"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default Recommend;

import React, { useState, useEffect } from "react";

import Carousel from "@/components/carousel/Carousel";
import ContentWrapper from "@/components/contentWrapper/ContentWrapper";
import SwitchTabs from "@/components/switchTabs/SwitchTabs";
import movieAPI from "@/api/movie/movieAPI";

const Latest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [endpoint, setEndpoint] = useState("movie");

  const fetchInitialData = () => {
    setLoading(true);
    movieAPI
      .getTopRate()
      .then((res) => {
        if (res)
          setData({
            results: res.data,
          });
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
        <span className="carouselTitle">Top rating movie</span>
        <SwitchTabs data={["Movies"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default Latest;
